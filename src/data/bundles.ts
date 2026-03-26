export interface SkillWithReason {
  slug: string;     // "author/slug" reference
  reason: string;
  order: number;    // reserved, unused in Phase 1
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
