export interface SkillWithReason {
  slug: string;     // "author/slug" reference
  reason: string;
  order?: number;   // reserved, unused in Phase 1
  examples?: string[];  // what to say to your agent after installing
}

export interface Expert {
  slug: string;
  name: string;
  description: string;
  goal: string;     // headline on the expert page
  outcome: string;  // "After installing, your agent can..."
  skillsWithReason: SkillWithReason[];
  installAll?: string;    // single command to install all skills
  configSnippet?: string; // optional CLAUDE.md configuration snippet
  curator: string;
  created: string;  // ISO date
}

export const experts: Expert[] = [
  {
    slug: 'dev-expert',
    name: 'Dev Expert',
    description: 'review PRs, track issues, and delegate coding tasks — without leaving the terminal',
    goal: 'Code, review & ship faster',
    outcome: 'Manage your GitHub workflow and delegate coding tasks to AI agents — all from your agent, with no context switching.',
    skillsWithReason: [
      {
        slug: 'openclaw/github',
        reason: 'Review open PRs, triage issues, check CI status, and create new issues — all via the gh CLI without opening a browser.',
        order: 1,
        examples: [
          'Review my open PRs for anything blocking',
          'Create an issue: login page crashes on Safari',
          'What\'s the CI status on my current branch?',
          'List all open issues assigned to me',
        ],
      },
      {
        slug: 'openclaw/coding-agent',
        reason: 'Delegate a refactor, background task, or code review to Claude Code or Codex while you stay focused on the bigger picture.',
        order: 2,
        examples: [
          'Delegate this refactor to a coding agent',
          'Have Codex review this function for edge cases',
          'Run this migration script in a background agent',
        ],
      },
    ],
    installAll: 'clawhub install openclaw/github openclaw/coding-agent',
    curator: 'clawhub',
    created: '2026-03-27',
  },
  {
    slug: 'daily-briefing',
    name: 'Daily Briefing',
    description: 'inbox highlights, calendar, and weather — before you open a single app',
    goal: 'Start your day in 30 seconds',
    outcome: 'One command. Today\'s weather, inbox highlights, and what\'s on your calendar — so you know what matters before the day starts.',
    skillsWithReason: [
      {
        slug: 'openclaw/gog',
        reason: 'Pull urgent emails and check today\'s calendar — get the full picture of your day without opening Gmail.',
        order: 1,
        examples: [
          'What\'s urgent in my inbox today?',
          'What meetings do I have this afternoon?',
          'Any emails from my team since yesterday?',
        ],
      },
      {
        slug: 'openclaw/weather',
        reason: 'Get the weather for your location so you can plan your day — commute, lunch, travel, whatever.',
        order: 2,
        examples: [
          'What\'s the weather today in my city?',
          'Will it rain this afternoon in London?',
          '5-day forecast for this week',
        ],
      },
      {
        slug: 'openclaw/summarize',
        reason: 'TL;DR a long email thread, article, or doc when you only have 2 minutes to get up to speed.',
        order: 3,
        examples: [
          'TL;DR the last 5 emails in this thread',
          'Summarize this article before my 9am',
          'Give me the key points from this document',
        ],
      },
    ],
    installAll: 'clawhub install openclaw/gog openclaw/weather openclaw/summarize',
    curator: 'clawhub',
    created: '2026-03-27',
  },
  {
    slug: 'creator-expert',
    name: 'Creator Expert',
    description: 'research, draft, and publish to X — all from the terminal',
    goal: 'Write, publish & grow an audience',
    outcome: 'Summarize source material, draft in Notion, publish to X, and track engagement — without switching between five different apps.',
    skillsWithReason: [
      {
        slug: 'openclaw/summarize',
        reason: 'Quickly digest articles, papers, and videos to extract the ideas worth writing about.',
        order: 1,
        examples: [
          'Summarize this article into key points I can write about',
          'TL;DR this research paper in plain English',
          'What are the most interesting ideas in this YouTube talk?',
        ],
      },
      {
        slug: 'openclaw/notion',
        reason: 'Draft and organize your content in Notion — keep a writing queue, outline posts, and store your ideas in one place.',
        order: 2,
        examples: [
          'Create a Notion draft for a post about AI agents',
          'Add this idea to my content queue in Notion',
          'What\'s in my writing backlog?',
        ],
      },
      {
        slug: 'openclaw/xurl',
        reason: 'Publish threads, check mentions, and monitor how your posts are doing — without opening the app.',
        order: 3,
        examples: [
          'Post this thread to X',
          'Check my mentions and replies from today',
          'What\'s my most-engaged post this week?',
        ],
      },
    ],
    installAll: 'clawhub install openclaw/summarize openclaw/notion openclaw/xurl',
    curator: 'clawhub',
    created: '2026-03-27',
  },
  {
    slug: 'meeting-expert',
    name: 'Meeting Expert',
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
    installAll: 'clawhub install openclaw/gog openclaw/summarize openclaw/notion',
    curator: 'clawhub',
    created: '2026-03-26',
  },
  {
    slug: 'comms-expert',
    name: 'Comms Expert',
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
    installAll: 'clawhub install openclaw/gog openclaw/slack openclaw/xurl',
    curator: 'clawhub',
    created: '2026-03-25',
  },
  {
    slug: 'research-expert',
    name: 'Research Expert',
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
    installAll: 'clawhub install openclaw/summarize openclaw/obsidian openclaw/notion',
    curator: 'clawhub',
    created: '2026-03-25',
  },
];

export function getExpert(slug: string): Expert | undefined {
  return experts.find(e => e.slug === slug);
}

export function getExperts(): Expert[] {
  return experts;
}
