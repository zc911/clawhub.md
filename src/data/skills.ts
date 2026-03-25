export interface Skill {
  author: string;    // clawhub namespace (e.g. "openclaw", "gstack", "anthropics")
  slug: string;      // skill name (e.g. "gog")
  name: string;      // display name
  description: string; // max 60 chars
  repo: string;      // "owner/repo" on GitHub
  path: string;      // path to skill.md within repo
  install: string;   // full install command
  added: string;     // ISO date
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
