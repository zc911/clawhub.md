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

  // ── Chinese-focused Experts ──────────────────────────────────────────────
  {
    slug: 'feishu-expert',
    name: '飞书助理',
    description: '飞书消息、文档、日历一站式管理，不错过任何重要信息',
    goal: '飞书消息与文档自动整理',
    outcome: '让你的 Agent 汇总飞书未读消息、摘要文档、整理会议记录——无需手动切换应用。',
    skillsWithReason: [
      {
        slug: 'openclaw/feishu',
        reason: '读取飞书消息、文档和日历，让 Agent 帮你过滤重要内容，省去手动翻找的时间。',
        examples: [
          '帮我汇总今天的飞书未读消息',
          '摘要这份飞书文档的重点',
          '整理今天会议的 action items 到飞书文档',
          '我的飞书日历今天有哪些安排？',
        ],
      },
    ],
    installAll: 'clawhub install openclaw/feishu',
    curator: 'clawhub',
    created: '2026-03-27',
  },
  {
    slug: 'dingtalk-expert',
    name: '钉钉会议助理',
    description: '会前准备、会后纪要、跟进发送，全程交给 Agent',
    goal: '钉钉会议全程自动化',
    outcome: '会前拉取议程和相关资料，会后自动整理会议纪要并发送给参会者。',
    skillsWithReason: [
      {
        slug: 'openclaw/dingtalk',
        reason: '读取钉钉日历、群消息和待办，让 Agent 帮你准备会议资料、整理纪要、发送跟进。',
        examples: [
          '帮我准备下午 3 点会议的背景资料',
          '把刚才的会议要点整理成纪要',
          '把会议纪要通过钉钉发给所有参会人',
          '今天钉钉有哪些未处理的待办？',
        ],
      },
    ],
    installAll: 'clawhub install openclaw/dingtalk',
    curator: 'clawhub',
    created: '2026-03-27',
  },
  {
    slug: 'wecom-expert',
    name: '企业微信客服助理',
    description: '客户消息跟进、回复草稿、待办提醒，不让客户等太久',
    goal: '企业微信客户跟进',
    outcome: '自动汇总待回复客户消息，生成回复草稿，标记跟进状态——让客户响应速度提升一个量级。',
    skillsWithReason: [
      {
        slug: 'openclaw/wecom',
        reason: '读取企业微信客户消息，生成回复草稿，追踪跟进状态，让你不遗漏任何一个客户。',
        examples: [
          '汇总今天所有未回复的客户消息',
          '帮我起草回复这条询价消息',
          '列出本周需要跟进的客户清单',
          '把这个客户标记为"已跟进"',
        ],
      },
    ],
    installAll: 'clawhub install openclaw/wecom',
    curator: 'clawhub',
    created: '2026-03-27',
  },
  {
    slug: 'dev-expert-cn',
    name: '开发者助理（中文团队）',
    description: 'GitHub 工作流 + 飞书通知 + AI coding agent，中文开发团队专属',
    goal: '中文团队开发提效',
    outcome: '用 Agent 管理 GitHub PR 和 Issue，同步进展到飞书，把重复性编码任务交给 AI——无需离开终端。',
    skillsWithReason: [
      {
        slug: 'openclaw/github',
        reason: '通过 gh CLI 查看 PR、处理 Issue、检查 CI 状态，不用打开浏览器。',
        examples: [
          '检查我的 PR 有没有需要处理的 review',
          '创建一个 issue：登录页面在 Safari 崩溃',
          '当前分支的 CI 状态怎么样？',
        ],
      },
      {
        slug: 'openclaw/feishu',
        reason: '把 GitHub 事件和开发进展同步到飞书群，让团队实时了解项目状态。',
        examples: [
          '把这个 PR 合并的消息发到飞书 #engineering 群',
          '今天有哪些飞书消息和开发相关？',
        ],
      },
      {
        slug: 'openclaw/coding-agent',
        reason: '把重构、代码审查、迁移脚本等任务委托给 coding agent，自己专注更重要的事。',
        examples: [
          '把这个重构任务交给 coding agent 处理',
          '让 Codex 检查这个函数的边界情况',
        ],
      },
    ],
    installAll: 'clawhub install openclaw/github openclaw/feishu openclaw/coding-agent',
    curator: 'clawhub',
    created: '2026-03-27',
  },
];

export function getExpert(slug: string): Expert | undefined {
  return experts.find(e => e.slug === slug);
}

export function getExperts(): Expert[] {
  return experts;
}
