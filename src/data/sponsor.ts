export type Sponsor = {
  name: string;
  tagline: string;
  url: string;
  active: boolean;
};

export const currentSponsor: Sponsor | null = null;
