/**
 * Remote-first expert loader.
 * Fetches expert data from clawhub/experts repo at build time.
 * Falls back to local bundled data if the remote fetch fails.
 */

import { experts as localExperts, t } from '@/data/bundles';
import { skills as localSkills } from '@/data/skills';
import type { Expert } from '@/data/bundles';
import type { Skill } from '@/data/skills';

const REMOTE_BASE =
  import.meta.env.EXPERTS_REPO_URL ??
  'https://raw.githubusercontent.com/zc911/clawhub.md-experts/main';

// Cache so multiple pages in one build only fetch once
let _cachedExperts: Expert[] | null = null;

async function fetchRemote<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${REMOTE_BASE}/${path}`);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function loadExperts(): Promise<Expert[]> {
  if (_cachedExperts) return _cachedExperts;
  const remote = await fetchRemote<Expert[]>('index/experts.json');
  _cachedExperts = (remote && remote.length > 0) ? remote : localExperts;
  return _cachedExperts;
}

export async function loadSkills(): Promise<Skill[]> {
  const remote = await fetchRemote<Skill[]>('index/skills.json');
  return (remote && remote.length > 0) ? remote : localSkills;
}

export function findExpert(experts: Expert[], slug: string): Expert | undefined {
  return experts.find(e => e.slug === slug);
}

export { t };
