export interface RegularBundle {
  scenario?: false;
  slug: string;
  name: string;
  description: string;
  skills: string[];  // "author/slug" references
  curator: string;
  created: string;   // ISO date
}

export interface SkillWithReason {
  slug: string;     // "author/slug" reference
  reason: string;
  order: number;    // reserved, unused in Phase 1
}

export interface ScenarioBundle {
  scenario: true;
  slug: string;
  name: string;
  description: string;
  goal: string;     // "What are you trying to do?" label
  skillsWithReason: SkillWithReason[];
  curator: string;
  created: string;  // ISO date
}

export type Bundle = RegularBundle | ScenarioBundle;

export function isScenario(b: Bundle): b is ScenarioBundle {
  return b.scenario === true;
}

export const bundles: Bundle[] = [
  // Regular bundles
  {
    slug: 'openclaw-essentials',
    name: 'OpenClaw Essentials',
    description: 'Must-have skills for any OpenClaw agent setup',
    skills: ['openclaw/gog', 'openclaw/github', 'openclaw/summarize', 'openclaw/clawhub'],
    curator: 'clawhub',
    created: '2026-03-25',
  },
  {
    slug: 'connected-workspace',
    name: 'Connected Workspace',
    description: 'Connect your agent to Gmail, Slack, GitHub, and Notion',
    skills: ['openclaw/gog', 'openclaw/slack', 'openclaw/github', 'openclaw/notion'],
    curator: 'clawhub',
    created: '2026-03-25',
  },
  {
    slug: 'starter',
    name: 'Claude Code Starter',
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
  // Scenario bundles — only accessible at /guide/[slug]
  {
    scenario: true,
    slug: 'code-review',
    name: 'Code Review with AI Agents',
    description: 'catch bugs, trust issues, and structural problems before they land',
    goal: 'Code review & quality',
    skillsWithReason: [
      {
        slug: 'gstack/review',
        reason: 'Pre-landing PR review. Catches SQL safety, LLM trust boundary violations, conditional side effects, and structural bugs that manual review misses.',
        order: 1,
      },
      {
        slug: 'gstack/qa',
        reason: 'Full QA pass before merge. Finds visual and functional bugs that unit tests don\'t catch.',
        order: 2,
      },
    ],
    curator: 'clawhub',
    created: '2026-03-25',
  },
  {
    scenario: true,
    slug: 'ship-and-deploy',
    name: 'Ship & Deploy',
    description: 'go from local changes to a merged PR with confidence',
    goal: 'Ship & deploy faster',
    skillsWithReason: [
      {
        slug: 'gstack/review',
        reason: 'Run a pre-landing review first — catches issues before they\'re in main.',
        order: 1,
      },
      {
        slug: 'gstack/ship',
        reason: 'Merges base branch, runs tests, bumps VERSION, writes CHANGELOG, creates PR. The full ship workflow in one command.',
        order: 2,
      },
    ],
    curator: 'clawhub',
    created: '2026-03-25',
  },
  {
    scenario: true,
    slug: 'stay-connected',
    name: 'Stay Connected',
    description: 'manage your inbox, calendar, and team channels without leaving the terminal',
    goal: 'Manage email & comms',
    skillsWithReason: [
      {
        slug: 'openclaw/gog',
        reason: 'Read, send, and organize Gmail. Check your calendar, share Drive files, and update Sheets — all from your agent.',
        order: 1,
      },
      {
        slug: 'openclaw/slack',
        reason: 'Post to channels, read threads, and manage your Slack workspace directly from the terminal.',
        order: 2,
      },
      {
        slug: 'openclaw/xurl',
        reason: 'Monitor X (Twitter) mentions, post updates, and search trends via the authenticated API.',
        order: 3,
      },
    ],
    curator: 'clawhub',
    created: '2026-03-25',
  },
  {
    scenario: true,
    slug: 'research-and-notes',
    name: 'Research & Notes',
    description: 'summarize anything and save insights straight to your knowledge base',
    goal: 'Research & take notes',
    skillsWithReason: [
      {
        slug: 'openclaw/summarize',
        reason: 'Paste a URL, file, or YouTube link — get a clean summary in seconds.',
        order: 1,
      },
      {
        slug: 'openclaw/obsidian',
        reason: 'Save summaries and notes directly into your Obsidian vault with automatic linking.',
        order: 2,
      },
      {
        slug: 'openclaw/notion',
        reason: 'Alternatively, push research notes into Notion pages or databases.',
        order: 3,
      },
    ],
    curator: 'clawhub',
    created: '2026-03-25',
  },
];

export function getBundle(slug: string): RegularBundle | undefined {
  const b = bundles.find(b => b.slug === slug);
  return b && !isScenario(b) ? b : undefined;
}

export function getScenario(slug: string): ScenarioBundle | undefined {
  const b = bundles.find(b => b.slug === slug);
  return b && isScenario(b) ? b : undefined;
}

export function getScenarios(): ScenarioBundle[] {
  return bundles.filter(isScenario);
}

export function getRegularBundles(): RegularBundle[] {
  return bundles.filter((b): b is RegularBundle => !isScenario(b));
}
