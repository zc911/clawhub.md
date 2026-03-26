export interface Skill {
  author: string;    // clawhub namespace (e.g. "openclaw", "gstack", "anthropics")
  slug: string;      // skill name (e.g. "gog")
  name: string;      // display name
  description: string; // max 60 chars
  repo: string;      // "owner/repo" on GitHub
  path: string;      // path to skill.md within repo
  install: string;   // full install command
  added: string;     // ISO date
  examples?: string[]; // what to say to your agent after installing
}

export const skills: Skill[] = [
  // ── OpenClaw Official Skills (openclaw/openclaw) ────────────────────────
  {
    author: 'openclaw',
    slug: 'gog',
    name: 'gog',
    description: 'Google Workspace CLI — Gmail, Calendar, Drive, Sheets, Docs',
    repo: 'openclaw/openclaw',
    path: 'skills/gog/SKILL.md',
    install: 'clawhub install openclaw/gog',
    added: '2026-03-25',
    examples: [
      'Check my inbox and summarize anything urgent',
      'Schedule a meeting tomorrow at 2pm with Alice',
      'Share this Drive file with my team',
      'Add today\'s tasks to my Sheets tracker',
    ],
  },
  {
    author: 'openclaw',
    slug: 'github',
    name: 'github',
    description: 'GitHub ops via gh CLI — PRs, issues, CI runs, code review',
    repo: 'openclaw/openclaw',
    path: 'skills/github/SKILL.md',
    install: 'clawhub install openclaw/github',
    added: '2026-03-25',
    examples: [
      'Review my current PR for issues',
      'Create an issue: login page crashes on mobile',
      'What\'s the CI status on my branch?',
    ],
  },
  {
    author: 'openclaw',
    slug: 'summarize',
    name: 'summarize',
    description: 'Summarize URLs, local files, and YouTube links instantly',
    repo: 'openclaw/openclaw',
    path: 'skills/summarize/SKILL.md',
    install: 'clawhub install openclaw/summarize',
    added: '2026-03-25',
    examples: [
      'Summarize this article: [URL]',
      'TL;DR this PDF',
      'Summarize this YouTube video',
    ],
  },
  {
    author: 'openclaw',
    slug: 'obsidian',
    name: 'obsidian',
    description: 'Search, create, and manage Obsidian vault notes via CLI',
    repo: 'openclaw/openclaw',
    path: 'skills/obsidian/SKILL.md',
    install: 'clawhub install openclaw/obsidian',
    added: '2026-03-25',
    examples: [
      'Save this summary to my Obsidian vault',
      'Search my notes for "product strategy"',
      'Create a note about today\'s meeting',
    ],
  },
  {
    author: 'openclaw',
    slug: 'xurl',
    name: 'xurl',
    description: 'Post, search, and manage X (Twitter) via authenticated API',
    repo: 'openclaw/openclaw',
    path: 'skills/xurl/SKILL.md',
    install: 'clawhub install openclaw/xurl',
    added: '2026-03-25',
    examples: [
      'Check my X mentions from today',
      'Post: just shipped v2.0',
      'Search X for "Claude Code" trends',
    ],
  },
  {
    author: 'openclaw',
    slug: 'slack',
    name: 'slack',
    description: 'Send messages and manage Slack workspaces and channels',
    repo: 'openclaw/openclaw',
    path: 'skills/slack/SKILL.md',
    install: 'clawhub install openclaw/slack',
    added: '2026-03-25',
    examples: [
      'Post to #general: deployment is live',
      'What\'s new in #engineering today?',
      'Send a DM to Alice about the PR',
    ],
  },
  {
    author: 'openclaw',
    slug: 'notion',
    name: 'notion',
    description: 'Read, create, and update Notion pages and databases',
    repo: 'openclaw/openclaw',
    path: 'skills/notion/SKILL.md',
    install: 'clawhub install openclaw/notion',
    added: '2026-03-25',
    examples: [
      'Add this to my Notion research database',
      'Create a Notion page with these meeting notes',
      'Update my reading list in Notion',
    ],
  },
  {
    author: 'openclaw',
    slug: 'weather',
    name: 'weather',
    description: 'Current weather and forecasts via wttr.in and Open-Meteo',
    repo: 'openclaw/openclaw',
    path: 'skills/weather/SKILL.md',
    install: 'clawhub install openclaw/weather',
    added: '2026-03-25',
    examples: [
      'What\'s the weather in San Francisco today?',
      'Will it rain this weekend in New York?',
      '5-day forecast for London',
    ],
  },
  {
    author: 'openclaw',
    slug: 'clawhub',
    name: 'clawhub',
    description: 'Discover, install, and manage skills from the clawhub registry',
    repo: 'openclaw/openclaw',
    path: 'skills/clawhub/SKILL.md',
    install: 'clawhub install openclaw/clawhub',
    added: '2026-03-25',
    examples: [
      'Search clawhub for GitHub skills',
      'Install the gstack/ship skill',
      'List all installed skills',
    ],
  },
  {
    author: 'openclaw',
    slug: 'coding-agent',
    name: 'coding-agent',
    description: 'Delegate coding tasks to Claude Code, Codex, or OpenCode agents',
    repo: 'openclaw/openclaw',
    path: 'skills/coding-agent/SKILL.md',
    install: 'clawhub install openclaw/coding-agent',
    added: '2026-03-25',
    examples: [
      'Delegate this refactor to Claude Code',
      'Have Codex review this function',
      'Run this task in a background coding agent',
    ],
  },
  // ── Anthropic Official Skills (anthropics/skills) ────────────────────────
  {
    author: 'anthropics',
    slug: 'pdf',
    name: 'pdf',
    description: 'Extract, merge, create, and handle PDF documents and forms',
    repo: 'anthropics/skills',
    path: 'skills/pdf/SKILL.md',
    install: 'clawhub install anthropics/pdf',
    added: '2026-03-25',
    examples: [
      'Extract text from this PDF',
      'Merge these two PDF files into one',
      'Create a PDF from this markdown document',
    ],
  },
  {
    author: 'anthropics',
    slug: 'mcp-builder',
    name: 'mcp-builder',
    description: 'Build MCP servers that let LLMs interact with external services',
    repo: 'anthropics/skills',
    path: 'skills/mcp-builder/SKILL.md',
    install: 'clawhub install anthropics/mcp-builder',
    added: '2026-03-25',
    examples: [
      'Build an MCP server for my REST API',
      'Add a tool that reads from my database',
      'Create a new MCP server from scratch',
    ],
  },
  {
    author: 'anthropics',
    slug: 'skill-creator',
    name: 'skill-creator',
    description: 'Create, edit, and audit AgentSkills packages from scratch',
    repo: 'anthropics/skills',
    path: 'skills/skill-creator/SKILL.md',
    install: 'clawhub install anthropics/skill-creator',
    added: '2026-03-25',
    examples: [
      'Create a new skill for this workflow',
      'Audit my SKILL.md for best practices',
      'Package this prompt into a reusable skill',
    ],
  },
  {
    author: 'anthropics',
    slug: 'claude-api',
    name: 'claude-api',
    description: 'Build apps with the Claude API and Anthropic SDK',
    repo: 'anthropics/skills',
    path: 'skills/claude-api/SKILL.md',
    install: 'clawhub install anthropics/claude-api',
    added: '2026-03-25',
    examples: [
      'Build a chat app using the Claude API',
      'Add streaming responses to my Node.js app',
      'Implement tool use with the Anthropic SDK',
    ],
  },
  // ── gstack — Claude Code Workflow (garrytan/gstack) ─────────────────────
  {
    author: 'gstack',
    slug: 'review',
    name: 'review',
    description: 'Pre-landing PR review for SQL safety, LLM trust boundary violations',
    repo: 'garrytan/gstack',
    path: 'review/SKILL.md',
    install: 'clawhub install gstack/review',
    added: '2026-03-24',
    examples: [
      'Review my current PR',
      'Check this diff for security issues',
      'Do a pre-landing review on this branch',
    ],
  },
  {
    author: 'gstack',
    slug: 'ship',
    name: 'ship',
    description: 'Ship workflow: merge base, run tests, bump VERSION, create PR',
    repo: 'garrytan/gstack',
    path: 'ship/SKILL.md',
    install: 'clawhub install gstack/ship',
    added: '2026-03-24',
    examples: [
      '/ship',
      'Ship my current branch',
      'Create a PR for these changes',
    ],
  },
  {
    author: 'gstack',
    slug: 'investigate',
    name: 'investigate',
    description: 'Systematic debugging with root cause investigation, four phases',
    repo: 'garrytan/gstack',
    path: 'investigate/SKILL.md',
    install: 'clawhub install gstack/investigate',
    added: '2026-03-24',
    examples: [
      'Why is this test failing?',
      'Investigate the root cause of this bug',
      'Debug why the API keeps returning 500',
    ],
  },
  {
    author: 'gstack',
    slug: 'qa',
    name: 'qa',
    description: 'Systematically QA test a web application and fix bugs found',
    repo: 'garrytan/gstack',
    path: 'qa/SKILL.md',
    install: 'clawhub install gstack/qa',
    added: '2026-03-24',
    examples: [
      'QA the checkout page before I merge',
      'Find visual bugs on this branch',
      'Run a full QA pass on /dashboard',
    ],
  },
  {
    author: 'gstack',
    slug: 'design-review',
    name: 'design-review',
    description: "Designer's eye QA: visual inconsistency, spacing, hierarchy problems",
    repo: 'garrytan/gstack',
    path: 'design-review/SKILL.md',
    install: 'clawhub install gstack/design-review',
    added: '2026-03-24',
    examples: [
      'Do a design review on my homepage',
      'Check this UI for visual inconsistencies',
      'Find spacing issues on the settings page',
    ],
  },
  {
    author: 'gstack',
    slug: 'retro',
    name: 'retro',
    description: 'Weekly engineering retrospective with trend tracking',
    repo: 'garrytan/gstack',
    path: 'retro/SKILL.md',
    install: 'clawhub install gstack/retro',
    added: '2026-03-24',
    examples: [
      '/retro',
      'Run a weekly retrospective',
      'What did we ship this week?',
    ],
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
