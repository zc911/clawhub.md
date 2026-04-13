export interface SOTW {
  expert: string;  // expert slug
  reason: string;  // one sentence editorial note, shown on homepage
  picked: string;  // ISO date
}

// Set to null to fall back to the first expert in the list
export const sotw: SOTW | null = {
  expert: 'ai-builder-expert',
  reason: 'MCP crossed 97M monthly SDK downloads and the three-layer agent protocol stack (MCP + A2A + AG-UI) has stabilized — the best time to build on top of it is now.',
  picked: '2026-04-13',
};
