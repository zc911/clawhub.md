export interface Skill {
  author: string;    // clawhub namespace (e.g. "gstack")
  slug: string;      // skill name (e.g. "commit")
  name: string;      // display name
  description: string; // max 60 chars
  repo: string;      // "owner/repo" on GitHub
  path: string;      // path to skill.md within repo
  install: string;   // full install command
  added: string;     // ISO date
}

export const skills: Skill[] = [
  {
    author: 'gstack',
    slug: 'review',
    name: 'review',
    description: 'Pre-landing PR review for SQL safety, LLM trust boundary violations',
    repo: 'garrytan/gstack',
    path: 'review/SKILL.md',
    install: 'claude install gstack/review',
    added: '2026-03-24',
  },
  {
    author: 'gstack',
    slug: 'ship',
    name: 'ship',
    description: 'Ship workflow: merge base, run tests, bump VERSION, create PR',
    repo: 'garrytan/gstack',
    path: 'ship/SKILL.md',
    install: 'claude install gstack/ship',
    added: '2026-03-24',
  },
  {
    author: 'gstack',
    slug: 'investigate',
    name: 'investigate',
    description: 'Systematic debugging with root cause investigation, four phases',
    repo: 'garrytan/gstack',
    path: 'investigate/SKILL.md',
    install: 'claude install gstack/investigate',
    added: '2026-03-24',
  },
  {
    author: 'gstack',
    slug: 'qa',
    name: 'qa',
    description: 'Systematically QA test a web application and fix bugs found',
    repo: 'garrytan/gstack',
    path: 'qa/SKILL.md',
    install: 'claude install gstack/qa',
    added: '2026-03-24',
  },
  {
    author: 'gstack',
    slug: 'design-review',
    name: 'design-review',
    description: "Designer's eye QA: visual inconsistency, spacing, hierarchy problems",
    repo: 'garrytan/gstack',
    path: 'design-review/SKILL.md',
    install: 'claude install gstack/design-review',
    added: '2026-03-24',
  },
  {
    author: 'gstack',
    slug: 'retro',
    name: 'retro',
    description: 'Weekly engineering retrospective with trend tracking',
    repo: 'garrytan/gstack',
    path: 'retro/SKILL.md',
    install: 'claude install gstack/retro',
    added: '2026-03-24',
  },
];

export function getSkill(author: string, slug: string): Skill | undefined {
  return skills.find(s => s.author === author && s.slug === slug);
}

export function getRecentSkills(limit = 20): Skill[] {
  return [...skills]
    .sort((a, b) => b.added.localeCompare(a.added))
    .slice(0, limit);
}
