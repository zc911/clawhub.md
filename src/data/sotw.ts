export interface SOTW {
  expert: string;  // expert slug
  reason: string;  // one sentence editorial note, shown on homepage
  picked: string;  // ISO date
}

// Set to null to fall back to daily rotation
export const sotw: SOTW | null = null;
