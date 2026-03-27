import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchSkill, parseSkillPath } from './fetchSkill';

// ---------------------------------------------------------------------------
// Mock KVStore helpers
// ---------------------------------------------------------------------------

function makeKV(entries: Record<string, unknown> = {}): {
  get: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
} {
  const store = new Map(Object.entries(entries));
  return {
    get: vi.fn(async (key: string) => store.get(key) ?? null),
    put: vi.fn(async (key: string, value: string) => {
      store.set(key, JSON.parse(value));
    }),
  };
}

const NOW = 1_700_000_000_000; // fixed "now" for deterministic time tests

// ---------------------------------------------------------------------------
// parseSkillPath
// ---------------------------------------------------------------------------

describe('parseSkillPath', () => {
  it('parses a valid 3-segment path', () => {
    expect(parseSkillPath('owner/repo/file.md')).toEqual({
      owner: 'owner',
      repo: 'repo',
      filepath: 'file.md',
    });
  });

  it('parses a deep filepath', () => {
    expect(parseSkillPath('owner/repo/dir/sub/file.md')).toEqual({
      owner: 'owner',
      repo: 'repo',
      filepath: 'dir/sub/file.md',
    });
  });

  it('strips leading slashes', () => {
    expect(parseSkillPath('///owner/repo/file.md')).toEqual({
      owner: 'owner',
      repo: 'repo',
      filepath: 'file.md',
    });
  });

  it('returns null for too-short paths', () => {
    expect(parseSkillPath('owner/repo')).toBeNull();
    expect(parseSkillPath('owner')).toBeNull();
    expect(parseSkillPath('')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// fetchSkill — cache and GitHub interactions
// ---------------------------------------------------------------------------

describe('fetchSkill', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('1. fresh cache hit — returns cached content without calling GitHub', async () => {
    const cached = { content: '# Cached skill', fetchedAt: NOW - 1000 }; // 1s old
    const kv = makeKV({ 'raw:owner/repo/file.md': cached });
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const result = await fetchSkill('owner', 'repo', 'file.md', kv);

    expect(result.raw).toBe('# Cached skill');
    expect(result.status).toBe('ok');
    expect(result.fromCache).toBe(true);
    expect(result.cachedAt).toBe(NOW - 1000);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('2. stale cache + GitHub OK — fetches from GitHub, writes through, returns ok', async () => {
    const STALE_AGE = 2 * 60 * 60 * 1000; // 2h — past the 1h threshold
    const cached = { content: '# Old content', fetchedAt: NOW - STALE_AGE };
    const kv = makeKV({ 'raw:owner/repo/file.md': cached });

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('# Fresh content', { status: 200 }),
    );

    const result = await fetchSkill('owner', 'repo', 'file.md', kv);

    expect(result.raw).toBe('# Fresh content');
    expect(result.status).toBe('ok');
    expect(result.fromCache).toBe(false);
    expect(kv.put).toHaveBeenCalledOnce();
  });

  it('3. stale cache + GitHub error — serves stale, status stale', async () => {
    const STALE_AGE = 2 * 60 * 60 * 1000;
    const cached = { content: '# Stale content', fetchedAt: NOW - STALE_AGE };
    const kv = makeKV({ 'raw:owner/repo/file.md': cached });

    // Both branches fail with 500
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 500 }),
    );

    const result = await fetchSkill('owner', 'repo', 'file.md', kv);

    expect(result.raw).toBe('# Stale content');
    expect(result.status).toBe('stale');
    expect(result.fromCache).toBe(true);
  });

  it('4. no cache + GitHub OK — writes through, returns ok', async () => {
    const kv = makeKV(); // empty cache

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('# Fresh skill', { status: 200 }),
    );

    const result = await fetchSkill('owner', 'repo', 'file.md', kv);

    expect(result.raw).toBe('# Fresh skill');
    expect(result.status).toBe('ok');
    expect(result.fromCache).toBe(false);
    expect(kv.put).toHaveBeenCalledOnce();
  });

  it('5. no cache + both branches 404 — returns not_found', async () => {
    const kv = makeKV();

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 404 }),
    );

    const result = await fetchSkill('owner', 'repo', 'file.md', kv);

    expect(result.raw).toBe('');
    expect(result.status).toBe('not_found');
    expect(result.fromCache).toBe(false);
  });

  it('6. no cache + GitHub non-404 error — returns error', async () => {
    const kv = makeKV();

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 429 }),
    );

    const result = await fetchSkill('owner', 'repo', 'file.md', kv);

    expect(result.raw).toBe('');
    expect(result.status).toBe('error');
    expect(result.fromCache).toBe(false);
  });

  it('7. forceRefresh=true — skips fresh cache, fetches from GitHub', async () => {
    const cached = { content: '# Cached skill', fetchedAt: NOW - 1000 }; // fresh
    const kv = makeKV({ 'raw:owner/repo/file.md': cached });

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('# Refreshed content', { status: 200 }),
    );

    const result = await fetchSkill('owner', 'repo', 'file.md', kv, undefined, true);

    expect(result.raw).toBe('# Refreshed content');
    expect(result.status).toBe('ok');
    expect(result.fromCache).toBe(false);
  });

  it('8. KV.get throws — logs error, continues to GitHub', async () => {
    const kv = makeKV();
    kv.get.mockRejectedValueOnce(new Error('KV unavailable'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('# GitHub content', { status: 200 }),
    );

    const result = await fetchSkill('owner', 'repo', 'file.md', kv);

    expect(consoleSpy).toHaveBeenCalledWith(
      '[fetchSkill] KV get failed',
      expect.objectContaining({ cacheKey: 'raw:owner/repo/file.md' }),
    );
    expect(result.raw).toBe('# GitHub content');
    expect(result.status).toBe('ok');
  });

  it('9. branch fallback — main 404, master OK — returns master content', async () => {
    const kv = makeKV();

    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(null, { status: 404 })) // main → 404
      .mockResolvedValueOnce(new Response('# From master', { status: 200 })); // master → ok

    const result = await fetchSkill('owner', 'repo', 'file.md', kv);

    expect(result.raw).toBe('# From master');
    expect(result.status).toBe('ok');
    expect(result.fromCache).toBe(false);
  });

  it('10. kv=null — no KV reads/writes, still fetches from GitHub', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('# No KV', { status: 200 }),
    );

    const result = await fetchSkill('owner', 'repo', 'file.md', null);

    expect(result.raw).toBe('# No KV');
    expect(result.status).toBe('ok');
    expect(result.fromCache).toBe(false);
  });

  it('11. fetch() throws network error — returns error', async () => {
    const kv = makeKV();

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network down'));

    const result = await fetchSkill('owner', 'repo', 'file.md', kv);

    expect(result.status).toBe('error');
    expect(result.fromCache).toBe(false);
  });
});
