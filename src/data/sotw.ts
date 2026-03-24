export interface SOTW {
  skill: string;   // "author/slug"
  reason: string;  // one sentence, shown in #8b949e
  picked: string;  // ISO date
}

// Set to null to fall back to most recently added skill
export const sotw: SOTW | null = {
  skill: 'gstack/review',
  reason: 'Catches SQL injection, LLM trust boundary violations, and conditional side effects before they land.',
  picked: '2026-03-24',
};
