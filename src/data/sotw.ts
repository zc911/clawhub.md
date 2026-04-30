export interface SOTW {
  expert: string;  // expert slug
  reason: string;  // one sentence editorial note, shown on homepage
  picked: string;  // ISO date
}

// Set to null to fall back to the first expert in the list
export const sotw: SOTW | null = {
  expert: 'agent-security-expert',
  reason: 'A security audit found 30 community skills silently enrolling agents into crypto swarms. Install Agent Sentinel to set up permission boundaries and injection detection — before your agents go to production.',
  picked: '2026-04-30',
};
