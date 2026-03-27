export interface SOTW {
  skill: string;   // "author/slug"
  reason: string;  // one sentence, shown in #8b949e
  picked: string;  // ISO date
}

// Set to null to fall back to most recently added skill
export const sotw: SOTW | null = {
  skill: 'openclaw/github',
  reason: 'Review PRs, triage issues, and check CI — all from your agent. The fastest way to stay on top of your GitHub workflow without touching the browser.',
  picked: '2026-03-27',
};
