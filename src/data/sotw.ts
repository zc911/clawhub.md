export interface SOTW {
  expert: string;  // expert slug
  reason: string;  // one sentence editorial note, shown on homepage
  picked: string;  // ISO date
}

// Set to null to fall back to the first expert in the list
export const sotw: SOTW | null = {
  expert: 'agent-orchestrator',
  reason: 'A2A hit v1.0, MCP Registry is in API freeze, and Claude Code shipped Routines + Computer Use — the agent infrastructure stack is production-ready.',
  picked: '2026-04-30',
};
