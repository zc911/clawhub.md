export interface SOTW {
  skill: string;   // "author/slug"
  reason: string;  // one sentence, shown in #8b949e
  picked: string;  // ISO date
}

// Set to null to fall back to most recently added skill
export const sotw: SOTW | null = {
  skill: 'openclaw/gog',
  reason: 'The most-downloaded OpenClaw skill. Control Gmail, Calendar, Drive, and Sheets from your terminal — without leaving the agent.',
  picked: '2026-03-25',
};
