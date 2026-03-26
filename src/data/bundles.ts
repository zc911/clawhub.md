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
  examples?: string[];  // what to say to your agent after installing
}

export interface ScenarioBundle {
  scenario: true;
  slug: string;
  name: string;
  description: string;
  goal: string;     // "What are you trying to do?" label
  outcome: string;  // "After installing, your agent can..."
  skillsWithReason: SkillWithReason[];
  installAll?: string;    // single command to install all skills in bundle
  configSnippet?: string; // optional CLAUDE.md configuration snippet
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
    name: 'Review, QA & Ship',
    description: 'catch bugs, QA before merge, and ship with a full changelog — the complete dev workflow',
    goal: 'Review, QA & ship code',
    outcome: 'Catch bugs before they land, QA before merge, and ship with tests run, changelog written, and PR created — all in one workflow.',
    skillsWithReason: [
      {
        slug: 'gstack/review',
        reason: 'Pre-landing PR review. Catches SQL safety, LLM trust boundary violations, conditional side effects, and structural bugs that manual review misses.',
        order: 1,
        examples: [
          'Review my current PR',
          'Check this diff for security issues',
          'Do a pre-landing review on this branch',
        ],
      },
      {
        slug: 'gstack/qa',
        reason: 'Full QA pass before merge. Finds visual and functional bugs that unit tests don\'t catch.',
        order: 2,
        examples: [
          'QA the checkout page before I merge',
          'Find visual bugs on this branch',
          'Run a full QA pass on /dashboard',
        ],
      },
      {
        slug: 'gstack/ship',
        reason: 'Merges base branch, runs tests, bumps VERSION, writes CHANGELOG, creates PR. The full ship workflow in one command.',
        order: 3,
        examples: [
          '/ship',
          'Ship my current branch',
          'Create a PR for these changes',
        ],
      },
    ],
    installAll: '/install gstack/review gstack/qa gstack/ship',
    curator: 'clawhub',
    created: '2026-03-25',
  },
  {
    scenario: true,
    slug: 'meeting-prep',
    name: 'Run Better Meetings',
    description: 'walk in prepared and walk out with notes sent — automatically',
    goal: 'Prep & follow up on meetings',
    outcome: 'Brief before every call, clean notes after. Your agent pulls the context, captures decisions, and sends the follow-ups — so you can focus on the conversation.',
    skillsWithReason: [
      {
        slug: 'openclaw/gog',
        reason: 'Check your calendar for upcoming meetings, pull relevant emails for context, and send follow-up emails when the call is done.',
        order: 1,
        examples: [
          'What meetings do I have today?',
          'Pull emails from Alice about the Q2 project',
          'Send a follow-up to everyone on today\'s 3pm call',
        ],
      },
      {
        slug: 'openclaw/summarize',
        reason: 'Summarize a doc, slide deck, or past meeting recording before the call so you\'re never walking in cold.',
        order: 2,
        examples: [
          'Summarize this proposal PDF before my 2pm',
          'TL;DR the last 3 emails in this thread',
          'Summarize the recording from last week\'s kickoff',
        ],
      },
      {
        slug: 'openclaw/notion',
        reason: 'Store meeting notes, decisions, and action items in Notion so nothing gets lost after the call.',
        order: 3,
        examples: [
          'Create a meeting note in Notion for today\'s standup',
          'Add these action items to my Notion tasks',
          'Log the decisions from this call to the project page',
        ],
      },
    ],
    installAll: '/install openclaw/gog openclaw/summarize openclaw/notion',
    curator: 'clawhub',
    created: '2026-03-26',
  },
  {
    scenario: true,
    slug: 'stay-connected',
    name: 'Stay Connected',
    description: 'manage your inbox, calendar, and team channels without leaving the terminal',
    goal: 'Manage email & comms',
    outcome: 'Control Gmail, Slack, and X from your agent — read, send, and organize without switching apps.',
    skillsWithReason: [
      {
        slug: 'openclaw/gog',
        reason: 'Read, send, and organize Gmail. Check your calendar, share Drive files, and update Sheets — all from your agent.',
        order: 1,
        examples: [
          'Check my inbox for anything urgent',
          'Schedule a meeting tomorrow at 2pm with Alice',
          'Share this file with my team on Drive',
        ],
      },
      {
        slug: 'openclaw/slack',
        reason: 'Post to channels, read threads, and manage your Slack workspace directly from the terminal.',
        order: 2,
        examples: [
          'Post to #general: deployment is live',
          'What\'s new in #engineering today?',
          'Send a DM to Alice about the PR',
        ],
      },
      {
        slug: 'openclaw/xurl',
        reason: 'Monitor X (Twitter) mentions, post updates, and search trends via the authenticated API.',
        order: 3,
        examples: [
          'Check my X mentions from today',
          'Post a tweet: just shipped v2.0',
          'Search X for "openclaw" trends',
        ],
      },
    ],
    installAll: '/install openclaw/gog openclaw/slack openclaw/xurl',
    curator: 'clawhub',
    created: '2026-03-25',
  },
  {
    scenario: true,
    slug: 'research-and-notes',
    name: 'Research & Notes',
    description: 'summarize anything and save insights straight to your knowledge base',
    goal: 'Research & take notes',
    outcome: 'Summarize any URL, PDF, or video and save the insights to Obsidian or Notion — in seconds.',
    skillsWithReason: [
      {
        slug: 'openclaw/summarize',
        reason: 'Paste a URL, file, or YouTube link — get a clean summary in seconds.',
        order: 1,
        examples: [
          'Summarize this URL: https://...',
          'TL;DR this PDF',
          'Summarize this YouTube video',
        ],
      },
      {
        slug: 'openclaw/obsidian',
        reason: 'Save summaries and notes directly into your Obsidian vault with automatic linking.',
        order: 2,
        examples: [
          'Save this summary to my Obsidian vault',
          'Create a note about today\'s meeting',
          'Add this to my research folder in Obsidian',
        ],
      },
      {
        slug: 'openclaw/notion',
        reason: 'Alternatively, push research notes into Notion pages or databases.',
        order: 3,
        examples: [
          'Add this to my Notion research database',
          'Create a Notion page with these notes',
          'Update my reading list in Notion',
        ],
      },
    ],
    installAll: '/install openclaw/summarize openclaw/obsidian openclaw/notion',
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
