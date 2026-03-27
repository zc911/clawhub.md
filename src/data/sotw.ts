export interface SOTW {
  expert: string;  // expert slug
  reason: string;  // one sentence editorial note, shown on homepage
  picked: string;  // ISO date
}

// Set to null to fall back to the first expert in the list
export const sotw: SOTW | null = {
  expert: 'dev-expert',
  reason: 'The fastest way to stay on top of your GitHub workflow — review PRs, triage issues, and delegate to AI agents without leaving the terminal.',
  picked: '2026-03-27',
};
