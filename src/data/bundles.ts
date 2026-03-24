export interface Bundle {
  slug: string;
  name: string;
  description: string;
  skills: string[];  // "author/slug" references
  curator: string;
  created: string;   // ISO date
}

export const bundles: Bundle[] = [
  {
    slug: 'starter',
    name: 'Starter Pack',
    description: 'Essential skills for every Claude Code workflow',
    skills: ['gstack/review', 'gstack/ship', 'gstack/qa'],
    curator: 'clawhub',
    created: '2026-03-24',
  },
  {
    slug: 'quality',
    name: 'Quality & Testing',
    description: 'Ship with confidence — QA, debugging, and design review',
    skills: ['gstack/qa', 'gstack/investigate', 'gstack/design-review'],
    curator: 'clawhub',
    created: '2026-03-24',
  },
];

export function getBundle(slug: string): Bundle | undefined {
  return bundles.find(b => b.slug === slug);
}
