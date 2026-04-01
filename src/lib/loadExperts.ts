/**
 * Remote-first expert loader.
 *
 * At build time, fetches expert + skill data from the community experts repo
 * (clawhub/experts on GitHub). Falls back to the local bundled data if the
 * remote fetch fails (e.g. during local development without network, or CI
 * before the remote repo exists).
 *
 * To point at a different repo or branch, set:
 *   EXPERTS_REPO_URL=https://raw.githubusercontent.com/clawhub/experts/main
 */

import { experts as localExperts, skills as localSkills } from '@/data/bundles';
import type { Expert } from '@/data/bundles';
import type { Skill } from '@/data/skills';

const REMOTE_BASE =
  import.meta.env.EXPERTS_REPO_URL ??
  'https://raw.githubusercontent.com/zc911/clawhub.md-experts/main';

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
  const remote = await fetchRemote<Expert[]>('index/experts.json');
  if (remote && remote.length > 0) return remote;
  return localExperts;
}

export async function loadSkills(): Promise<Skill[]> {
  const remote = await fetchRemote<Skill[]>('index/skills.json');
  if (remote && remote.length > 0) return remote;
  return localSkills;
}
