// Minimal KV interface — compatible with Cloudflare KVNamespace
interface KVStore {
  get<T = unknown>(key: string, type: 'json'): Promise<T | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface CacheEntry {
  content: string;
  fetchedAt: number; // Unix ms
}

export type SkillStatus = 'ok' | 'stale' | 'not_found' | 'error';

export interface SkillFetchResult {
  raw: string;
  status: SkillStatus;
  fromCache: boolean;
  cachedAt?: number; // Unix ms — present when fromCache is true
}

const FRESH_THRESHOLD_MS = 60 * 60 * 1000; // 1 hour
const KV_TTL_SECONDS = 86400;              // 24 hours max KV lifespan

type GitHubResult =
  | { kind: 'ok'; content: string }
  | { kind: 'not_found' }
  | { kind: 'error'; statusCode: number };

async function fetchFromGitHub(
  owner: string,
  repo: string,
  filepath: string,
  token?: string,
): Promise<GitHubResult> {
  const headers: Record<string, string> = { 'User-Agent': 'clawhub.md/1.0' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  for (const branch of ['main', 'master']) {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filepath}`;
    let res: Response;
    try {
      res = await fetch(url, { headers });
    } catch {
      return { kind: 'error', statusCode: 0 };
    }
    if (res.ok) return { kind: 'ok', content: await res.text() };
    if (res.status === 404) continue;
    return { kind: 'error', statusCode: res.status };
  }

  return { kind: 'not_found' };
}

export async function fetchSkill(
  owner: string,
  repo: string,
  filepath: string,
  kv: KVStore | null,
  githubToken?: string,
  forceRefresh = false,
): Promise<SkillFetchResult> {
  const cacheKey = `raw:${owner}/${repo}/${filepath}`;
  let cached: CacheEntry | null = null;

  if (kv && !forceRefresh) {
    try {
      cached = await kv.get<CacheEntry>(cacheKey, 'json');
    } catch (err) {
      console.error('[fetchSkill] KV get failed', { cacheKey, error: String(err) });
    }
  }

  // Serve fresh cache without hitting GitHub
  if (cached && Date.now() - cached.fetchedAt < FRESH_THRESHOLD_MS) {
    return {
      raw: cached.content,
      status: 'ok',
      fromCache: true,
      cachedAt: cached.fetchedAt,
    };
  }

  // Fetch from GitHub
  const result = await fetchFromGitHub(owner, repo, filepath, githubToken);

  if (result.kind === 'ok') {
    if (kv) {
      try {
        const entry: CacheEntry = { content: result.content, fetchedAt: Date.now() };
        await kv.put(cacheKey, JSON.stringify(entry), { expirationTtl: KV_TTL_SECONDS });
      } catch (err) {
        console.error('[fetchSkill] KV put failed', { cacheKey, error: String(err) });
      }
    }
    return { raw: result.content, status: 'ok', fromCache: false };
  }

  // GitHub failed — log and serve stale if available
  console.error('[fetchSkill] GitHub fetch failed', {
    owner, repo, filepath,
    kind: result.kind,
    statusCode: result.kind === 'error' ? result.statusCode : undefined,
  });

  if (cached) {
    return {
      raw: cached.content,
      status: 'stale',
      fromCache: true,
      cachedAt: cached.fetchedAt,
    };
  }

  return {
    raw: '',
    status: result.kind === 'not_found' ? 'not_found' : 'error',
    fromCache: false,
  };
}

/** Parse "/r/owner/repo/path/to/file.md" params.path into parts */
export function parseSkillPath(rawPath: string): {
  owner: string;
  repo: string;
  filepath: string;
} | null {
  const parts = rawPath.replace(/^\/+/, '').split('/');
  if (parts.length < 3) return null;
  const [owner, repo, ...rest] = parts;
  return { owner, repo, filepath: rest.join('/') };
}
