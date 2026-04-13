/** Bilingual string: English + Chinese */
export type L = { en: string; zh: string };

/** Resolve a bilingual field to a plain string for the given locale. */
export function t(field: L, locale: string): string {
  return locale === 'zh' ? field.zh : field.en;
}

export interface SkillWithReason {
  slug: string;     // "author/slug" reference
  reason: L;
  order?: number;   // reserved, unused in Phase 1
  examples?: { en: string[]; zh: string[] };  // what to say to your agent after installing
}

export type Division = 'Engineering' | 'Product' | 'Content' | 'Productivity' | 'Mentors' | '中文专区';

export interface Expert {
  slug: string;
  name: L;
  description: L;
  goal: L;          // headline on the expert page
  outcome: L;       // "After installing, your agent can..."
  division: Division;
  skillsWithReason: SkillWithReason[];
  installAll?: string;    // single command to install all skills
  configSnippet?: string; // optional CLAUDE.md configuration snippet
  curator: string;
  created: string;  // ISO date
}

export const experts: Expert[] = [
  {
    slug: 'dev-expert',
    name: { en: 'Ship Expert', zh: '开发者助理' },
    division: 'Engineering',
    description: {
      en: 'review PRs, track issues, and delegate coding tasks — without leaving the terminal',
      zh: '不离开终端，完成 PR 审查、Issue 追踪和代码任务委派',
    },
    goal: { en: 'Code, review & ship faster', zh: '编码、审查、更快交付' },
    outcome: {
      en: 'Manage your GitHub workflow and delegate coding tasks to AI agents — all from your agent, with no context switching.',
      zh: '通过 Agent 管理 GitHub 工作流并把编码任务委派给 AI——全程无需切换上下文。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/github',
        reason: {
          en: 'Review open PRs, triage issues, check CI status, and create new issues — all via the gh CLI without opening a browser.',
          zh: '通过 gh CLI 审查 PR、处理 Issue、检查 CI 状态、创建新 Issue——全程无需打开浏览器。',
        },
        order: 1,
        examples: {
          en: [
            'Review my open PRs for anything blocking',
            'Create an issue: login page crashes on Safari',
            "What's the CI status on my current branch?",
            'List all open issues assigned to me',
          ],
          zh: [
            '检查我的开放 PR 有没有 blocking 问题',
            '创建一个 issue：登录页面在 Safari 崩溃',
            '当前分支的 CI 状态怎么样？',
            '列出所有分配给我的未关闭 Issue',
          ],
        },
      },
      {
        slug: 'openclaw/coding-agent',
        reason: {
          en: 'Delegate a refactor, background task, or code review to Claude Code or Codex while you stay focused on the bigger picture.',
          zh: '把重构、后台任务或代码审查委托给 Claude Code 或 Codex，自己专注于更重要的事。',
        },
        order: 2,
        examples: {
          en: [
            'Delegate this refactor to a coding agent',
            'Have Codex review this function for edge cases',
            'Run this migration script in a background agent',
          ],
          zh: [
            '把这个重构任务交给 coding agent 处理',
            '让 Codex 检查这个函数的边界情况',
            '在后台 agent 中运行这个迁移脚本',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/github openclaw/coding-agent',
    curator: 'clawhub',
    created: '2026-03-27',
  },
  {
    slug: 'daily-briefing',
    name: { en: 'Morning Intel', zh: '每日简报' },
    division: 'Productivity',
    description: {
      en: 'inbox highlights, calendar, and weather — before you open a single app',
      zh: '打开任何应用之前，先把收件箱重点、日历和天气一次搞定',
    },
    goal: { en: 'Start your day in 30 seconds', zh: '30 秒开启高效的一天' },
    outcome: {
      en: "One command. Today's weather, inbox highlights, and what's on your calendar — so you know what matters before the day starts.",
      zh: '一条命令，搞定今日天气、收件箱重点和日程安排——让你在一天开始前就掌握全局。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/gog',
        reason: {
          en: "Pull urgent emails and check today's calendar — get the full picture of your day without opening Gmail.",
          zh: '拉取紧急邮件并查看今日日历——无需打开 Gmail 就能掌握全天计划。',
        },
        order: 1,
        examples: {
          en: [
            "What's urgent in my inbox today?",
            'What meetings do I have this afternoon?',
            'Any emails from my team since yesterday?',
          ],
          zh: [
            '今天我的收件箱里有什么紧急邮件？',
            '我今天下午有哪些会议？',
            '昨天以来团队有没有发邮件给我？',
          ],
        },
      },
      {
        slug: 'openclaw/weather',
        reason: {
          en: 'Get the weather for your location so you can plan your day — commute, lunch, travel, whatever.',
          zh: '获取当地天气，提前规划通勤、午餐、出行等日常安排。',
        },
        order: 2,
        examples: {
          en: [
            "What's the weather today in my city?",
            'Will it rain this afternoon in London?',
            '5-day forecast for this week',
          ],
          zh: [
            '我所在城市今天天气怎么样？',
            '伦敦今天下午会下雨吗？',
            '本周五天天气预报',
          ],
        },
      },
      {
        slug: 'openclaw/summarize',
        reason: {
          en: "TL;DR a long email thread, article, or doc when you only have 2 minutes to get up to speed.",
          zh: '只有 2 分钟时，用 TL;DR 快速消化长邮件、文章或文档。',
        },
        order: 3,
        examples: {
          en: [
            'TL;DR the last 5 emails in this thread',
            'Summarize this article before my 9am',
            'Give me the key points from this document',
          ],
          zh: [
            'TL;DR 这个邮件串最后 5 封邮件',
            '在我 9 点会议前摘要这篇文章',
            '提炼这份文档的核心要点',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/gog openclaw/weather openclaw/summarize',
    curator: 'clawhub',
    created: '2026-03-27',
  },
  {
    slug: 'creator-expert',
    name: { en: 'Content Machine', zh: '内容创作助理' },
    division: 'Content',
    description: {
      en: 'research, draft, and publish to X — all from the terminal',
      zh: '从终端完成素材研究、内容起草和发布',
    },
    goal: { en: 'Write, publish & grow an audience', zh: '创作、发布、持续积累受众' },
    outcome: {
      en: 'Summarize source material, draft in Notion, publish to X, and track engagement — without switching between five different apps.',
      zh: '摘要素材、在 Notion 起稿、发布到 X 并追踪互动数据——无需在五款应用之间反复切换。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/summarize',
        reason: {
          en: 'Quickly digest articles, papers, and videos to extract the ideas worth writing about.',
          zh: '快速消化文章、论文和视频，提炼出值得写作的核心观点。',
        },
        order: 1,
        examples: {
          en: [
            'Summarize this article into key points I can write about',
            'TL;DR this research paper in plain English',
            'What are the most interesting ideas in this YouTube talk?',
          ],
          zh: [
            '把这篇文章摘要成我可以写作的要点',
            '用通俗语言 TL;DR 这篇研究论文',
            '这个 YouTube 演讲中最有趣的观点是什么？',
          ],
        },
      },
      {
        slug: 'openclaw/notion',
        reason: {
          en: 'Draft and organize your content in Notion — keep a writing queue, outline posts, and store your ideas in one place.',
          zh: '在 Notion 起草和整理内容——维护写作队列、文章大纲，把所有想法存在一处。',
        },
        order: 2,
        examples: {
          en: [
            'Create a Notion draft for a post about AI agents',
            'Add this idea to my content queue in Notion',
            "What's in my writing backlog?",
          ],
          zh: [
            '在 Notion 中为一篇关于 AI Agent 的文章创建草稿',
            '把这个想法加入我的 Notion 内容队列',
            '我的写作待办列表里有什么？',
          ],
        },
      },
      {
        slug: 'openclaw/xurl',
        reason: {
          en: 'Publish threads, check mentions, and monitor how your posts are doing — without opening the app.',
          zh: '发布推文串、查看提及、监控帖子表现——无需打开应用。',
        },
        order: 3,
        examples: {
          en: [
            'Post this thread to X',
            'Check my mentions and replies from today',
            "What's my most-engaged post this week?",
          ],
          zh: [
            '把这个推文串发到 X',
            '查看我今天的提及和回复',
            '本周互动量最高的帖子是哪条？',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/summarize openclaw/notion openclaw/xurl',
    curator: 'clawhub',
    created: '2026-03-27',
  },
  {
    slug: 'meeting-expert',
    name: { en: 'Meeting Ninja', zh: '会议助理' },
    division: 'Productivity',
    description: {
      en: 'walk in prepared and walk out with notes sent — automatically',
      zh: '带着准备进会，带着自动发出的纪要离场',
    },
    goal: { en: 'Prep & follow up on meetings', zh: '会前准备与会后跟进' },
    outcome: {
      en: 'Brief before every call, clean notes after. Your agent pulls the context, captures decisions, and sends the follow-ups — so you can focus on the conversation.',
      zh: '每次通话前自动准备摘要，通话后整理纪要。Agent 拉取上下文、记录决策、发送跟进邮件——让你专注于对话本身。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/gog',
        reason: {
          en: 'Check your calendar for upcoming meetings, pull relevant emails for context, and send follow-up emails when the call is done.',
          zh: '查看即将到来的会议日历，拉取相关邮件作为上下文，会议结束后发送跟进邮件。',
        },
        order: 1,
        examples: {
          en: [
            'What meetings do I have today?',
            'Pull emails from Alice about the Q2 project',
            "Send a follow-up to everyone on today's 3pm call",
          ],
          zh: [
            '我今天有哪些会议？',
            '拉取 Alice 关于 Q2 项目的邮件',
            '给今天下午 3 点会议的所有人发跟进邮件',
          ],
        },
      },
      {
        slug: 'openclaw/summarize',
        reason: {
          en: "Summarize a doc, slide deck, or past meeting recording before the call so you're never walking in cold.",
          zh: '通话前摘要文档、幻灯片或过往会议录音，让你永远有备而来。',
        },
        order: 2,
        examples: {
          en: [
            'Summarize this proposal PDF before my 2pm',
            'TL;DR the last 3 emails in this thread',
            "Summarize the recording from last week's kickoff",
          ],
          zh: [
            '在我下午 2 点会议前摘要这份提案 PDF',
            'TL;DR 这个邮件串最后 3 封邮件',
            '摘要上周启动会的录音',
          ],
        },
      },
      {
        slug: 'openclaw/notion',
        reason: {
          en: "Store meeting notes, decisions, and action items in Notion so nothing gets lost after the call.",
          zh: '把会议记录、决策和行动项保存到 Notion，确保通话结束后没有任何遗漏。',
        },
        order: 3,
        examples: {
          en: [
            "Create a meeting note in Notion for today's standup",
            'Add these action items to my Notion tasks',
            'Log the decisions from this call to the project page',
          ],
          zh: [
            '为今天的站会在 Notion 创建会议记录',
            '把这些行动项加入我的 Notion 任务',
            '把这次通话的决策记录到项目页面',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/gog openclaw/summarize openclaw/notion',
    curator: 'clawhub',
    created: '2026-03-26',
  },
  {
    slug: 'comms-expert',
    name: { en: 'Inbox Zero', zh: '沟通助理' },
    division: 'Productivity',
    description: {
      en: 'manage your inbox, calendar, and team channels without leaving the terminal',
      zh: '不离开终端，管理收件箱、日历和团队频道',
    },
    goal: { en: 'Manage email & comms', zh: '统一管理邮件与沟通' },
    outcome: {
      en: 'Control Gmail, Slack, and X from your agent — read, send, and organize without switching apps.',
      zh: '通过 Agent 操控 Gmail、Slack 和 X——阅读、发送、整理，无需切换应用。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/gog',
        reason: {
          en: 'Read, send, and organize Gmail. Check your calendar, share Drive files, and update Sheets — all from your agent.',
          zh: '阅读、发送和整理 Gmail，查看日历、共享 Drive 文件、更新 Sheets——全部通过 Agent 完成。',
        },
        order: 1,
        examples: {
          en: [
            'Check my inbox for anything urgent',
            'Schedule a meeting tomorrow at 2pm with Alice',
            'Share this file with my team on Drive',
          ],
          zh: [
            '查看我的收件箱有没有紧急邮件',
            '明天下午 2 点和 Alice 安排一个会议',
            '在 Drive 上把这个文件分享给我的团队',
          ],
        },
      },
      {
        slug: 'openclaw/slack',
        reason: {
          en: 'Post to channels, read threads, and manage your Slack workspace directly from the terminal.',
          zh: '直接从终端向频道发帖、阅读话题串、管理 Slack 工作区。',
        },
        order: 2,
        examples: {
          en: [
            'Post to #general: deployment is live',
            "What's new in #engineering today?",
            'Send a DM to Alice about the PR',
          ],
          zh: [
            '在 #general 发帖：部署已上线',
            '#engineering 今天有什么新动态？',
            '给 Alice 发一条关于 PR 的私信',
          ],
        },
      },
      {
        slug: 'openclaw/xurl',
        reason: {
          en: 'Monitor X (Twitter) mentions, post updates, and search trends via the authenticated API.',
          zh: '通过已认证的 API 监控 X（Twitter）提及、发布更新并搜索趋势。',
        },
        order: 3,
        examples: {
          en: [
            'Check my X mentions from today',
            'Post a tweet: just shipped v2.0',
            'Search X for "openclaw" trends',
          ],
          zh: [
            '查看我今天的 X 提及',
            '发一条推文：刚发布了 v2.0',
            '在 X 上搜索"openclaw"相关趋势',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/gog openclaw/slack openclaw/xurl',
    curator: 'clawhub',
    created: '2026-03-25',
  },
  {
    slug: 'research-expert',
    name: { en: 'Deep Dive', zh: '研究助理' },
    division: 'Productivity',
    description: {
      en: 'summarize anything and save insights straight to your knowledge base',
      zh: '摘要任何内容，直接保存洞察到你的知识库',
    },
    goal: { en: 'Research & take notes', zh: '高效研究与笔记整理' },
    outcome: {
      en: 'Summarize any URL, PDF, or video and save the insights to Obsidian or Notion — in seconds.',
      zh: '摘要任意 URL、PDF 或视频内容，并在几秒内保存到 Obsidian 或 Notion。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/summarize',
        reason: {
          en: 'Paste a URL, file, or YouTube link — get a clean summary in seconds.',
          zh: '粘贴 URL、文件或 YouTube 链接——几秒内获得简洁摘要。',
        },
        order: 1,
        examples: {
          en: [
            'Summarize this URL: https://...',
            'TL;DR this PDF',
            'Summarize this YouTube video',
          ],
          zh: [
            '摘要这个 URL：https://...',
            'TL;DR 这份 PDF',
            '摘要这个 YouTube 视频',
          ],
        },
      },
      {
        slug: 'openclaw/obsidian',
        reason: {
          en: 'Save summaries and notes directly into your Obsidian vault with automatic linking.',
          zh: '将摘要和笔记直接保存到 Obsidian 仓库，并自动建立链接。',
        },
        order: 2,
        examples: {
          en: [
            'Save this summary to my Obsidian vault',
            "Create a note about today's meeting",
            'Add this to my research folder in Obsidian',
          ],
          zh: [
            '把这个摘要保存到我的 Obsidian 仓库',
            '创建一条关于今天会议的笔记',
            '把这个添加到我 Obsidian 的研究文件夹',
          ],
        },
      },
      {
        slug: 'openclaw/notion',
        reason: {
          en: 'Alternatively, push research notes into Notion pages or databases.',
          zh: '或者，将研究笔记推送到 Notion 页面或数据库。',
        },
        order: 3,
        examples: {
          en: [
            'Add this to my Notion research database',
            'Create a Notion page with these notes',
            'Update my reading list in Notion',
          ],
          zh: [
            '把这个添加到我的 Notion 研究数据库',
            '用这些笔记创建一个 Notion 页面',
            '更新我在 Notion 中的阅读清单',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/summarize openclaw/obsidian openclaw/notion',
    curator: 'clawhub',
    created: '2026-03-25',
  },

  // ── Chinese-focused Experts ──────────────────────────────────────────────
  {
    slug: 'feishu-expert',
    name: { en: 'Feishu Assistant', zh: '飞书助理' },
    division: '中文专区',
    description: {
      en: 'manage Feishu messages, docs, and calendar — all in one place',
      zh: '飞书消息、文档、日历一站式管理，不错过任何重要信息',
    },
    goal: { en: 'Auto-organize Feishu messages & docs', zh: '飞书消息与文档自动整理' },
    outcome: {
      en: 'Let your Agent summarize unread Feishu messages, digest docs, and organize meeting notes — no manual app-switching required.',
      zh: '让你的 Agent 汇总飞书未读消息、摘要文档、整理会议记录——无需手动切换应用。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/feishu',
        reason: {
          en: 'Read Feishu messages, docs, and calendar — let your Agent filter what matters and save you the manual searching.',
          zh: '读取飞书消息、文档和日历，让 Agent 帮你过滤重要内容，省去手动翻找的时间。',
        },
        examples: {
          en: [
            "Summarize today's unread Feishu messages",
            'Digest the key points of this Feishu doc',
            "Organize today's meeting action items into a Feishu doc",
            "What's on my Feishu calendar today?",
          ],
          zh: [
            '帮我汇总今天的飞书未读消息',
            '摘要这份飞书文档的重点',
            '整理今天会议的 action items 到飞书文档',
            '我的飞书日历今天有哪些安排？',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/feishu',
    curator: 'clawhub',
    created: '2026-03-27',
  },
  {
    slug: 'dingtalk-expert',
    name: { en: 'DingTalk Meeting Assistant', zh: '钉钉会议助理' },
    division: '中文专区',
    description: {
      en: 'pre-meeting prep, post-meeting minutes, follow-up delivery — all via Agent',
      zh: '会前准备、会后纪要、跟进发送，全程交给 Agent',
    },
    goal: { en: 'Automate DingTalk meetings end-to-end', zh: '钉钉会议全程自动化' },
    outcome: {
      en: 'Pull meeting agenda and materials before the call, then auto-generate minutes and send them to all attendees.',
      zh: '会前拉取议程和相关资料，会后自动整理会议纪要并发送给参会者。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/dingtalk',
        reason: {
          en: 'Read DingTalk calendar, group messages, and todos — let your Agent prep materials, draft minutes, and send follow-ups.',
          zh: '读取钉钉日历、群消息和待办，让 Agent 帮你准备会议资料、整理纪要、发送跟进。',
        },
        examples: {
          en: [
            'Prepare background materials for my 3pm meeting',
            'Draft meeting minutes from what we just discussed',
            'Send the minutes to all attendees via DingTalk',
            'What pending todos do I have in DingTalk today?',
          ],
          zh: [
            '帮我准备下午 3 点会议的背景资料',
            '把刚才的会议要点整理成纪要',
            '把会议纪要通过钉钉发给所有参会人',
            '今天钉钉有哪些未处理的待办？',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/dingtalk',
    curator: 'clawhub',
    created: '2026-03-27',
  },
  {
    slug: 'wecom-expert',
    name: { en: 'WeCom Customer Service Assistant', zh: '企业微信客服助理' },
    division: '中文专区',
    description: {
      en: 'track customer messages, draft replies, and send reminders — never keep clients waiting',
      zh: '客户消息跟进、回复草稿、待办提醒，不让客户等太久',
    },
    goal: { en: 'WeCom customer follow-up', zh: '企业微信客户跟进' },
    outcome: {
      en: 'Auto-summarize pending customer messages, generate reply drafts, and mark follow-up status — so your response speed improves by an order of magnitude.',
      zh: '自动汇总待回复客户消息，生成回复草稿，标记跟进状态——让客户响应速度提升一个量级。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/wecom',
        reason: {
          en: 'Read WeCom customer messages, generate reply drafts, and track follow-up status — so no customer slips through the cracks.',
          zh: '读取企业微信客户消息，生成回复草稿，追踪跟进状态，让你不遗漏任何一个客户。',
        },
        examples: {
          en: [
            "Summarize all unanswered customer messages from today",
            'Draft a reply to this inquiry message',
            'List the customers I need to follow up with this week',
            'Mark this customer as "followed up"',
          ],
          zh: [
            '汇总今天所有未回复的客户消息',
            '帮我起草回复这条询价消息',
            '列出本周需要跟进的客户清单',
            '把这个客户标记为"已跟进"',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/wecom',
    curator: 'clawhub',
    created: '2026-03-27',
  },
  {
    slug: 'dev-expert-cn',
    name: { en: 'Dev Assistant (Chinese Teams)', zh: '开发者助理（中文团队）' },
    division: '中文专区',
    description: {
      en: 'GitHub workflow + Feishu notifications + AI coding agent — built for Chinese dev teams',
      zh: 'GitHub 工作流 + 飞书通知 + AI coding agent，中文开发团队专属',
    },
    goal: { en: 'Boost dev team productivity', zh: '中文团队开发提效' },
    outcome: {
      en: 'Manage GitHub PRs and Issues with your Agent, sync progress to Feishu, and delegate repetitive coding tasks to AI — all without leaving the terminal.',
      zh: '用 Agent 管理 GitHub PR 和 Issue，同步进展到飞书，把重复性编码任务交给 AI——无需离开终端。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/github',
        reason: {
          en: 'Review PRs, handle Issues, and check CI status via the gh CLI — no browser needed.',
          zh: '通过 gh CLI 查看 PR、处理 Issue、检查 CI 状态，不用打开浏览器。',
        },
        examples: {
          en: [
            'Check if any of my PRs need attention',
            'Create an issue: login page crashes on Safari',
            "What's the CI status on my current branch?",
          ],
          zh: [
            '检查我的 PR 有没有需要处理的 review',
            '创建一个 issue：登录页面在 Safari 崩溃',
            '当前分支的 CI 状态怎么样？',
          ],
        },
      },
      {
        slug: 'openclaw/feishu',
        reason: {
          en: 'Sync GitHub events and dev progress to Feishu groups so the team stays in the loop in real time.',
          zh: '把 GitHub 事件和开发进展同步到飞书群，让团队实时了解项目状态。',
        },
        examples: {
          en: [
            'Post the PR merge notification to the #engineering Feishu group',
            'What Feishu messages are related to development today?',
          ],
          zh: [
            '把这个 PR 合并的消息发到飞书 #engineering 群',
            '今天有哪些飞书消息和开发相关？',
          ],
        },
      },
      {
        slug: 'openclaw/coding-agent',
        reason: {
          en: 'Delegate refactors, code reviews, and migration scripts to a coding agent so you can focus on what matters.',
          zh: '把重构、代码审查、迁移脚本等任务委托给 coding agent，自己专注更重要的事。',
        },
        examples: {
          en: [
            'Hand this refactor off to a coding agent',
            'Have Codex check this function for edge cases',
          ],
          zh: [
            '把这个重构任务交给 coding agent 处理',
            '让 Codex 检查这个函数的边界情况',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/github openclaw/feishu openclaw/coding-agent',
    curator: 'clawhub',
    created: '2026-03-27',
  },

  // ── New Experts (11–20) ───────────────────────────────────────────────────
  {
    slug: 'ai-builder-expert',
    name: { en: 'Agent Builder', zh: 'AI 应用开发者' },
    division: 'Engineering',
    description: {
      en: 'build Claude-powered apps, MCP servers, and reusable skills — end to end',
      zh: '构建 Claude 应用、MCP Server 和可复用 Skill，全链路搞定',
    },
    goal: { en: 'Build AI apps and agent skills faster', zh: '快速构建 AI 应用与 Agent Skill' },
    outcome: {
      en: 'Scaffold Claude API apps, build MCP servers that give LLMs new capabilities, package workflows as reusable skills, and delegate coding grunt work to an agent.',
      zh: '快速搭建 Claude API 应用、构建 MCP Server 赋予 LLM 新能力、把工作流打包成可复用 Skill，并把重复编码任务委托给 Agent。',
    },
    skillsWithReason: [
      {
        slug: 'anthropics/claude-api',
        reason: {
          en: 'Build streaming chat apps, implement tool use, and integrate Claude into any product — with Anthropic SDK examples you can run immediately.',
          zh: '构建流式对话应用、实现 tool use、把 Claude 集成进任意产品——配有可立即运行的 Anthropic SDK 示例。',
        },
        order: 1,
        examples: {
          en: [
            'Build a streaming chat app with the Claude API',
            'Add tool use to my existing Claude integration',
            'Show me how to implement multi-turn conversations',
          ],
          zh: [
            '用 Claude API 构建一个流式对话应用',
            '给我现有的 Claude 集成加上 tool use',
            '演示如何实现多轮对话',
          ],
        },
      },
      {
        slug: 'anthropics/mcp-builder',
        reason: {
          en: 'Build MCP servers that let LLMs call your APIs, read databases, or trigger workflows — a first-class integration layer for AI agents.',
          zh: '构建 MCP Server，让 LLM 调用你的 API、读取数据库或触发工作流——AI Agent 的标准集成层。',
        },
        order: 2,
        examples: {
          en: [
            'Build an MCP server for my REST API',
            'Add a database read tool to my MCP server',
            'Create a new MCP server from scratch',
          ],
          zh: [
            '为我的 REST API 构建 MCP Server',
            '给 MCP Server 添加数据库读取工具',
            '从零开始创建一个 MCP Server',
          ],
        },
      },
      {
        slug: 'anthropics/skill-creator',
        reason: {
          en: 'Turn any repeatable workflow into a shareable AgentSkill — with proper SKILL.md structure, tool declarations, and audit-ready output.',
          zh: '把任何可重复的工作流打包成可分享的 AgentSkill——包含规范的 SKILL.md 结构、工具声明和审计友好的输出。',
        },
        order: 3,
        examples: {
          en: [
            'Package this workflow as a reusable skill',
            'Audit my SKILL.md for best practices',
            'Create a new skill that wraps this API',
          ],
          zh: [
            '把这个工作流打包成可复用的 Skill',
            '审查我的 SKILL.md 是否符合最佳实践',
            '创建一个封装这个 API 的新 Skill',
          ],
        },
      },
      {
        slug: 'openclaw/coding-agent',
        reason: {
          en: 'Delegate boilerplate, test generation, and refactors to Claude Code or Codex — so you stay in flow on architecture and product.',
          zh: '把样板代码、测试生成和重构任务委托给 Claude Code 或 Codex——自己专注于架构和产品。',
        },
        order: 4,
        examples: {
          en: [
            'Delegate writing tests for this module to an agent',
            'Have Claude Code scaffold the boilerplate for this feature',
          ],
          zh: [
            '让 Agent 为这个模块生成测试',
            '让 Claude Code 生成这个功能的脚手架',
          ],
        },
      },
    ],
    installAll: 'clawhub install anthropics/claude-api anthropics/mcp-builder anthropics/skill-creator openclaw/coding-agent',
    curator: 'clawhub',
    created: '2026-03-28',
  },
  {
    slug: 'indie-dev-expert',
    name: { en: 'Solo Founder Dev', zh: '独立开发者助理' },
    division: 'Engineering',
    description: {
      en: 'build in public, ship frequently, and grow an audience — the solo dev who does it all',
      zh: '公开构建、频繁发布、积累受众——一人搞定所有事的独立开发者',
    },
    goal: { en: 'Build, ship, and grow as a solo developer', zh: '独立开发：构建、发布、增长' },
    outcome: {
      en: 'Manage GitHub from the terminal, delegate boilerplate and tests to a coding agent, announce releases on X to build an audience, and package your best workflows into reusable skills — so each project makes you faster than the last.',
      zh: '从终端管理 GitHub，把样板代码和测试委托给 coding agent，在 X 上发布版本动态积累受众，把最好的工作流打包成可复用 Skill——让每个项目都比上一个更高效。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/github',
        reason: {
          en: 'Manage PRs, Issues, and CI from the terminal — stay close to the code without context switching.',
          zh: '从终端管理 PR、Issue 和 CI——贴近代码，无需切换上下文。',
        },
        order: 1,
        examples: {
          en: [
            'List my open PRs and flag anything blocking',
            "What's the CI status on my current branch?",
            'Create an issue for the bug I just found',
          ],
          zh: [
            '列出我的开放 PR，标出有 blocking 的',
            '当前分支的 CI 状态怎么样？',
            '为我刚发现的 bug 创建一个 issue',
          ],
        },
      },
      {
        slug: 'openclaw/coding-agent',
        reason: {
          en: 'Delegate test generation, boilerplate, and repetitive refactors to Claude Code or Codex — stay in flow on the parts only you can do.',
          zh: '把测试生成、样板代码和重复性重构委托给 Claude Code 或 Codex——专注于只有你能做的部分。',
        },
        order: 2,
        examples: {
          en: [
            'Delegate writing tests for this module to Claude Code',
            'Have Codex scaffold the API routes for this feature',
            'Run this refactor in a background agent',
          ],
          zh: [
            '让 Claude Code 为这个模块生成测试',
            '让 Codex 生成这个功能的 API 路由脚手架',
            '在后台 agent 中执行这个重构',
          ],
        },
      },
      {
        slug: 'openclaw/xurl',
        reason: {
          en: 'Announce releases, share what you\'re building, and engage with users who reply — building in public is how indie devs grow.',
          zh: '发布版本公告、分享构建过程、回应用户——公开构建是独立开发者增长的方式。',
        },
        order: 3,
        examples: {
          en: [
            'Post the v1.0 launch announcement',
            'Check my X mentions since yesterday',
            'Search for people asking about this type of tool',
          ],
          zh: [
            '发布 v1.0 上线公告',
            '检查昨天以来的 X 提及',
            '搜索在问这类工具的人',
          ],
        },
      },
      {
        slug: 'anthropics/skill-creator',
        reason: {
          en: 'Package your best repeatable workflows into AgentSkills you can reuse across projects or share with the community.',
          zh: '把你最好的可重复工作流打包成 AgentSkill，跨项目复用或分享给社区。',
        },
        order: 4,
        examples: {
          en: [
            'Package this deploy workflow as a reusable skill',
            'Create a skill that automates my release checklist',
            'Audit my SKILL.md for best practices',
          ],
          zh: [
            '把这个部署工作流打包成可复用 Skill',
            '创建一个自动执行我发布检查清单的 Skill',
            '审查我的 SKILL.md 是否符合最佳实践',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/github openclaw/coding-agent openclaw/xurl anthropics/skill-creator',
    curator: 'clawhub',
    created: '2026-03-28',
  },
  {
    slug: 'pm-expert',
    name: { en: 'Product Mind', zh: '产品经理助理' },
    division: 'Product',
    description: {
      en: 'write specs, track decisions, run stakeholder comms — all from your agent',
      zh: 'PRD 撰写、决策追踪、利益相关方沟通，全部交给 Agent',
    },
    goal: { en: 'Stay on top of product and stakeholder work', zh: '产品管理与干系人沟通提效' },
    outcome: {
      en: 'Draft PRDs and specs in Notion, summarize meeting outputs, keep your inbox under control, and coordinate with engineering and design via Slack — without context switching.',
      zh: '在 Notion 起草 PRD 和规格文档，汇总会议产出，控制邮件收件箱，通过 Slack 与研发和设计协作——无需切换上下文。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/gog',
        reason: {
          en: 'Manage your Gmail inbox, schedule stakeholder syncs on Google Calendar, and pull research from Drive — the core communication layer for most PMs.',
          zh: '管理 Gmail 收件箱、在 Google Calendar 安排干系人同步、从 Drive 拉取研究资料——大多数 PM 的核心沟通层。',
        },
        order: 1,
        examples: {
          en: [
            'Summarize my unread emails and flag anything urgent',
            'Schedule a 30-min sync with the eng team tomorrow',
            'Find the Q2 roadmap doc in my Drive',
          ],
          zh: [
            '汇总我的未读邮件并标记紧急项',
            '明天和研发团队安排一个 30 分钟同步',
            '在我的 Drive 中找 Q2 路线图文档',
          ],
        },
      },
      {
        slug: 'openclaw/notion',
        reason: {
          en: 'Write PRDs, track feature decisions, and maintain your product wiki — Notion is where PM work lives.',
          zh: '撰写 PRD、追踪功能决策、维护产品 Wiki——Notion 是 PM 工作的核心阵地。',
        },
        order: 2,
        examples: {
          en: [
            'Draft a PRD for this feature in Notion',
            'Add these meeting decisions to the product wiki',
            'Create a new spec page for the onboarding redesign',
          ],
          zh: [
            '在 Notion 起草这个功能的 PRD',
            '把这些会议决策添加到产品 Wiki',
            '为改版新手引导创建一个规格文档页',
          ],
        },
      },
      {
        slug: 'openclaw/slack',
        reason: {
          en: 'Post sprint updates, coordinate cross-functional work, and stay on top of engineering blockers — Slack is where the real-time product work happens.',
          zh: '发布迭代更新、协调跨职能工作、跟进研发 blocking——Slack 是实时产品协作的地方。',
        },
        order: 3,
        examples: {
          en: [
            "Post this week's sprint update to #product",
            'What are the current engineering blockers in #eng?',
            'DM the design lead about the deadline change',
          ],
          zh: [
            '把本周迭代更新发到 #product 频道',
            '#eng 频道当前有哪些研发 blocking？',
            '给设计负责人发 DM 说明截止日期变更',
          ],
        },
      },
      {
        slug: 'openclaw/summarize',
        reason: {
          en: 'Digest competitor articles, user research reports, and long design docs in seconds — so you always have context before any meeting.',
          zh: '几秒内消化竞品文章、用研报告和长篇设计文档——确保你在任何会议前都有足够的背景信息。',
        },
        order: 4,
        examples: {
          en: [
            'Summarize this user research report',
            'TL;DR this competitor product announcement',
            'Digest the key points of this 50-page spec',
          ],
          zh: [
            '汇总这份用研报告',
            '总结这篇竞品发布公告的要点',
            '摘要这份 50 页规格文档的核心内容',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/gog openclaw/notion openclaw/slack openclaw/summarize',
    curator: 'clawhub',
    created: '2026-03-28',
  },
  {
    slug: 'writing-expert',
    name: { en: 'Word Surgeon', zh: '写作与文档助理' },
    division: 'Content',
    description: {
      en: 'draft blog posts, maintain docs, and build a personal knowledge base — all in flow',
      zh: '撰写博客、维护文档、构建个人知识库，保持心流状态',
    },
    goal: { en: 'Write, document, and capture knowledge faster', zh: '写作、文档与知识沉淀提速' },
    outcome: {
      en: 'Summarize sources into Obsidian notes, draft and publish to Notion, extract key insights from PDFs, and maintain a living knowledge base that grows with every article you read.',
      zh: '把资料汇总进 Obsidian 笔记，在 Notion 起草并发布内容，从 PDF 提取核心洞察，构建一个随每篇文章阅读不断生长的知识库。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/obsidian',
        reason: {
          en: 'Your second brain — search, create, and link notes in your local Obsidian vault so ideas connect across everything you\'ve read.',
          zh: '你的第二大脑——在本地 Obsidian vault 中搜索、创建和关联笔记，让想法跨越所有阅读材料相互连接。',
        },
        order: 1,
        examples: {
          en: [
            'Save this article summary to my Obsidian vault',
            'Search my notes for ideas about "product-led growth"',
            'Create a note connecting these two concepts',
          ],
          zh: [
            '把这篇文章摘要存入 Obsidian vault',
            '在我的笔记中搜索关于「产品驱动增长」的想法',
            '创建一条笔记连接这两个概念',
          ],
        },
      },
      {
        slug: 'openclaw/notion',
        reason: {
          en: 'Draft long-form posts, maintain a content calendar, and publish finalized pieces to your Notion workspace.',
          zh: '起草长篇文章、维护内容日历，把定稿发布到 Notion 工作区。',
        },
        order: 2,
        examples: {
          en: [
            'Draft a blog post about this topic in Notion',
            'Add this idea to my content calendar',
            'Publish these notes as a Notion page',
          ],
          zh: [
            '在 Notion 起草一篇关于这个主题的博客',
            '把这个想法加入内容日历',
            '把这些笔记发布为 Notion 页面',
          ],
        },
      },
      {
        slug: 'openclaw/summarize',
        reason: {
          en: 'Turn any URL, PDF, or YouTube link into a concise summary — the fastest way to absorb sources and capture the key points worth keeping.',
          zh: '把任意 URL、PDF 或 YouTube 链接转为简洁摘要——吸收素材、提炼值得保留要点的最快方式。',
        },
        order: 3,
        examples: {
          en: [
            'Summarize this article and save to Obsidian',
            'TL;DR this research paper',
            'Summarize this YouTube talk into bullet points',
          ],
          zh: [
            '摘要这篇文章并存入 Obsidian',
            '给这篇研究论文写一个 TL;DR',
            '把这个 YouTube 演讲总结成要点',
          ],
        },
      },
      {
        slug: 'anthropics/pdf',
        reason: {
          en: 'Extract text from academic papers, merge reference documents, and turn scanned PDFs into searchable content — essential for serious research and writing.',
          zh: '从学术论文提取文本、合并参考文档、把扫描件变成可搜索内容——深度研究和写作的必备工具。',
        },
        order: 4,
        examples: {
          en: [
            'Extract the key findings from this paper PDF',
            'Merge these three reference docs into one',
            'Pull the methodology section from this report',
          ],
          zh: [
            '从这篇论文 PDF 中提取核心发现',
            '把这三份参考文档合并成一份',
            '从这份报告中提取方法论章节',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/obsidian openclaw/notion openclaw/summarize anthropics/pdf',
    curator: 'clawhub',
    created: '2026-03-28',
  },
  {
    slug: 'social-media-expert',
    name: { en: 'Growth Hacker', zh: '社媒运营助理' },
    division: 'Content',
    description: {
      en: 'post consistently, monitor mentions, and engage your audience — without the time sink',
      zh: '保持稳定发布、监控提及、互动受众，不再陷入时间黑洞',
    },
    goal: { en: 'Grow and engage your social presence', zh: '社媒增长与互动提效' },
    outcome: {
      en: 'Summarize industry news into post ideas, publish to X with proper formatting, monitor mentions and trending topics, and coordinate team announcements via Slack — all without context switching.',
      zh: '把行业资讯提炼成发帖素材，按格式发布到 X，监控提及和热点话题，通过 Slack 协调团队公告——无需切换上下文。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/xurl',
        reason: {
          en: 'Post, search, and monitor X from your agent — check mentions, find trending topics, and publish without opening the app.',
          zh: '从 Agent 发帖、搜索和监控 X——检查提及、发现热点话题、发布内容无需打开 App。',
        },
        order: 1,
        examples: {
          en: [
            "Post: just shipped v2.0 — here's what changed",
            'Check my X mentions from the past 24 hours',
            'Search X for "Claude Code" discussions today',
          ],
          zh: [
            '发推：刚发布了 v2.0——这是更新内容',
            '检查过去 24 小时的 X 提及',
            '搜索今天 X 上关于「Claude Code」的讨论',
          ],
        },
      },
      {
        slug: 'openclaw/summarize',
        reason: {
          en: 'Turn articles, threads, and YouTube talks into tight post-ready summaries — so you always have something worth sharing.',
          zh: '把文章、帖子和 YouTube 演讲提炼成简洁的发帖素材——让你永远有值得分享的内容。',
        },
        order: 2,
        examples: {
          en: [
            'Summarize this article into a tweet thread idea',
            'Give me 3 post angles from this research paper',
            'TL;DR this product launch for a social post',
          ],
          zh: [
            '把这篇文章概括成一个推文串思路',
            '从这篇研究论文给我提炼 3 个发帖角度',
            '给这次产品发布写一个适合社媒的 TL;DR',
          ],
        },
      },
      {
        slug: 'openclaw/slack',
        reason: {
          en: 'Coordinate launches, get copy approvals, and sync the team on what\'s going live — Slack keeps everyone aligned before you post.',
          zh: '协调发布、获得文案审批、同步团队发布内容——Slack 确保发帖前人人都对齐。',
        },
        order: 3,
        examples: {
          en: [
            'Post the launch announcement draft to #marketing for review',
            'What did the team decide about the campaign in #marketing?',
            'Remind the team in #social to engage with today\'s post',
          ],
          zh: [
            '把发布公告草稿发到 #marketing 审阅',
            '团队在 #marketing 频道怎么决定这次活动的？',
            '提醒 #social 频道的团队互动今天的帖子',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/xurl openclaw/summarize openclaw/slack',
    curator: 'clawhub',
    created: '2026-03-28',
  },
  {
    slug: 'founder-expert',
    name: { en: 'Founder Mode', zh: '创业者助理' },
    division: 'Product',
    description: {
      en: 'manage investors, team, and product all from one place — the founder\'s command center',
      zh: '投资人、团队、产品全部从一个地方管理——创业者的指挥中心',
    },
    goal: { en: 'Run your startup from your agent', zh: '用 Agent 驱动创业日常' },
    outcome: {
      en: 'Triage your inbox and investor updates via Gmail, review your engineers\' PRs from the terminal, coordinate the team on Slack, keep your product roadmap in Notion, and stay on top of market signals — all from a single workflow.',
      zh: '通过 Gmail 处理收件箱和投资人更新，从终端 review 工程师的 PR，在 Slack 协调团队，在 Notion 维护产品路线图，持续关注市场信号——全部在一个工作流中完成。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/gog',
        reason: {
          en: 'Investor updates, customer emails, and board scheduling all live in Gmail and Calendar — your Agent handles the triage so you focus on the signal.',
          zh: '投资人更新、客户邮件、董事会日程全都在 Gmail 和 Calendar 里——Agent 处理分拣，你专注核心信号。',
        },
        order: 1,
        examples: {
          en: [
            'Draft my monthly investor update email',
            'Summarize my unread emails and flag anything from customers',
            'Schedule a board call for next week',
          ],
          zh: [
            '起草本月的投资人更新邮件',
            '汇总未读邮件并标记来自客户的',
            '安排下周的董事会电话',
          ],
        },
      },
      {
        slug: 'openclaw/github',
        reason: {
          en: 'Stay close to the code without context switching — review PRs, check CI, and unblock engineers from the terminal.',
          zh: '不切换上下文地贴近代码——从终端 review PR、检查 CI、解除工程师 blocking。',
        },
        order: 2,
        examples: {
          en: [
            'What PRs need my review today?',
            'Is the CI passing on the release branch?',
            'Create an issue: customer reported login failure on mobile',
          ],
          zh: [
            '今天有哪些 PR 需要我 review？',
            '发布分支的 CI 通过了吗？',
            '创建 issue：客户反映移动端登录失败',
          ],
        },
      },
      {
        slug: 'openclaw/slack',
        reason: {
          en: 'Team standups, launch announcements, and customer escalations all happen in Slack — your Agent keeps you in the loop without reading every message.',
          zh: '团队站会、发布公告、客户升级都在 Slack 发生——Agent 让你保持同步，而无需阅读每条消息。',
        },
        order: 3,
        examples: {
          en: [
            "What's the latest in #engineering today?",
            'Post the launch announcement to #general',
            'Alert the team about the production incident',
          ],
          zh: [
            '今天 #engineering 频道有什么最新动态？',
            '把发布公告发到 #general',
            '通知团队生产事故',
          ],
        },
      },
      {
        slug: 'openclaw/notion',
        reason: {
          en: 'Your product roadmap, hiring tracker, and OKR docs all live in Notion — your Agent keeps them up to date so you\'re never working from stale info.',
          zh: '产品路线图、招聘追踪器和 OKR 文档都在 Notion 里——Agent 保持它们更新，让你不再依赖过时信息。',
        },
        order: 4,
        examples: {
          en: [
            'Update the Q2 roadmap with this new priority',
            'Add this candidate to the hiring tracker',
            'Draft the Q2 OKRs in Notion',
          ],
          zh: [
            '把这个新优先级更新到 Q2 路线图',
            '把这个候选人添加到招聘追踪器',
            '在 Notion 起草 Q2 OKRs',
          ],
        },
      },
      {
        slug: 'openclaw/summarize',
        reason: {
          en: 'Digest competitor launches, investor memos, and market reports in seconds — so you always have context, never preparation time.',
          zh: '几秒内消化竞品发布、投资人备忘录和市场报告——永远有背景，不再花时间准备。',
        },
        order: 5,
        examples: {
          en: [
            'Summarize this competitor\'s product launch post',
            'TL;DR this VC memo on the AI market',
            'Digest the key trends in this industry report',
          ],
          zh: [
            '总结这篇竞品发布文章',
            '给这份 VC 备忘录写 TL;DR',
            '提炼这份行业报告中的核心趋势',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/gog openclaw/github openclaw/slack openclaw/notion openclaw/summarize',
    curator: 'clawhub',
    created: '2026-03-28',
  },
  {
    slug: 'ops-cn-expert',
    name: { en: 'Chinese Enterprise Ops Expert', zh: '中国企业运营助理' },
    division: '中文专区',
    description: {
      en: 'manage Feishu, DingTalk, and WeCom all at once — the all-in-one ops stack for Chinese teams',
      zh: '同时管理飞书、钉钉、企业微信——中国团队的一站式运营平台',
    },
    goal: { en: 'Unify Feishu + DingTalk + WeCom ops', zh: '飞书 + 钉钉 + 企业微信统一管理' },
    outcome: {
      en: 'Monitor messages and todos across all three platforms from one Agent, draft cross-channel announcements, keep customer follow-ups current, and never miss a meeting or client message again.',
      zh: '用一个 Agent 监控三个平台的消息和待办，起草跨渠道公告，保持客户跟进不落地，再也不错过会议或客户消息。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/feishu',
        reason: {
          en: 'Your primary internal collaboration channel — summarize unread messages, digest docs, and track Feishu calendar without switching apps.',
          zh: '主要内部协作渠道——汇总未读消息、摘要文档、追踪飞书日历，无需切换应用。',
        },
        order: 1,
        examples: {
          en: [
            'Summarize today\'s unread Feishu messages',
            'What\'s on my Feishu calendar this week?',
            'Draft an announcement for the Feishu team group',
          ],
          zh: [
            '汇总今天飞书未读消息',
            '本周飞书日历有哪些安排？',
            '为飞书团队群起草一则公告',
          ],
        },
      },
      {
        slug: 'openclaw/dingtalk',
        reason: {
          en: 'Keep on top of DingTalk meetings and group todos — auto-prepare materials before calls and send minutes after.',
          zh: '跟上钉钉会议和群待办——会前自动准备资料，会后发送纪要。',
        },
        order: 2,
        examples: {
          en: [
            'Prepare materials for my 3pm DingTalk meeting',
            'Draft minutes from the last DingTalk call',
            'What DingTalk todos are due today?',
          ],
          zh: [
            '准备下午 3 点钉钉会议的资料',
            '整理上次钉钉会议的纪要',
            '今天有哪些钉钉待办到期？',
          ],
        },
      },
      {
        slug: 'openclaw/wecom',
        reason: {
          en: 'Never leave a customer waiting — summarize WeCom customer messages, generate reply drafts, and track follow-up status automatically.',
          zh: '不让客户等待——汇总企业微信客户消息，生成回复草稿，自动追踪跟进状态。',
        },
        order: 3,
        examples: {
          en: [
            "Summarize today's unanswered WeCom customer messages",
            'Draft a reply to this customer inquiry',
            'Which customers need follow-up this week?',
          ],
          zh: [
            '汇总今天企业微信未回复的客户消息',
            '帮我起草回复这条客户询价',
            '本周哪些客户需要跟进？',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/feishu openclaw/dingtalk openclaw/wecom',
    curator: 'clawhub',
    created: '2026-03-28',
  },
  {
    slug: 'student-expert',
    name: { en: 'Study Buddy', zh: '学习与科研助理' },
    division: 'Productivity',
    description: {
      en: 'read faster, take better notes, and retain what matters — built for students and researchers',
      zh: '读得更快、记得更好、留住重点——为学生和研究者量身打造',
    },
    goal: { en: 'Learn and research more efficiently', zh: '高效学习与科研' },
    outcome: {
      en: 'Summarize papers and lectures in seconds, extract text and citations from PDFs, save insights directly to your Obsidian vault, and keep your study calendar organized via Google — all in one workflow.',
      zh: '几秒内摘要论文和课程，从 PDF 提取文本和引用，把洞察直接存入 Obsidian vault，用 Google 整理学习日历——全部在一个工作流里完成。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/summarize',
        reason: {
          en: 'Summarize academic papers, lecture videos, and reading list articles in seconds — compress hours of reading into minutes.',
          zh: '几秒内摘要学术论文、课程视频和阅读清单文章——把数小时阅读压缩成数分钟。',
        },
        order: 1,
        examples: {
          en: [
            'Summarize this research paper into key findings',
            'TL;DR this YouTube lecture on machine learning',
            'Give me the main argument of this article',
          ],
          zh: [
            '把这篇研究论文总结成核心发现',
            '给这个机器学习 YouTube 课程写 TL;DR',
            '给我这篇文章的核心论点',
          ],
        },
      },
      {
        slug: 'openclaw/obsidian',
        reason: {
          en: 'Build a connected note system in your Obsidian vault — save summaries, link concepts, and search across everything you\'ve studied.',
          zh: '在 Obsidian vault 构建关联笔记系统——保存摘要、关联概念、搜索所有学过的内容。',
        },
        order: 2,
        examples: {
          en: [
            'Save this paper summary to my Obsidian vault',
            'Search my notes for "transformer architecture"',
            'Create a note linking these two theories',
          ],
          zh: [
            '把这篇论文摘要存入 Obsidian vault',
            '在我的笔记中搜索「transformer 架构」',
            '创建一条笔记关联这两个理论',
          ],
        },
      },
      {
        slug: 'anthropics/pdf',
        reason: {
          en: 'Extract text, pull citations, and merge multiple papers into one searchable document — essential for literature reviews and thesis work.',
          zh: '提取文本、获取引用、把多篇论文合并成一份可搜索的文档——文献综述和论文写作的必备工具。',
        },
        order: 3,
        examples: {
          en: [
            'Extract all citations from this PDF paper',
            'Pull the abstract and conclusions from these 5 papers',
            'Merge my annotated PDFs into one document',
          ],
          zh: [
            '从这篇 PDF 论文中提取所有引用',
            '从这 5 篇论文中提取摘要和结论',
            '把我的注释 PDF 合并成一份文档',
          ],
        },
      },
      {
        slug: 'openclaw/gog',
        reason: {
          en: 'Keep your study schedule and assignment deadlines in Google Calendar, and save research notes to Drive — the backbone of your academic workflow.',
          zh: '在 Google Calendar 管理学习计划和作业截止日期，把研究笔记存入 Drive——学术工作流的骨架。',
        },
        order: 4,
        examples: {
          en: [
            'Add my exam dates to Google Calendar',
            'Schedule study blocks for the next two weeks',
            'Save this research summary to my Drive folder',
          ],
          zh: [
            '把考试日期添加到 Google Calendar',
            '为接下来两周安排学习时间块',
            '把这份研究摘要存入我的 Drive 文件夹',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/summarize openclaw/obsidian anthropics/pdf openclaw/gog',
    curator: 'clawhub',
    created: '2026-03-28',
  },
  {
    slug: 'open-source-expert',
    name: { en: 'OSS Maintainer', zh: '开源维护者助理' },
    division: 'Engineering',
    description: {
      en: 'triage issues, engage contributors, and announce releases — without the burnout',
      zh: '处理 Issue、激活贡献者、发布公告——不再精疲力竭',
    },
    goal: { en: 'Maintain your OSS project without burning out', zh: '可持续地维护开源项目' },
    outcome: {
      en: 'Triage GitHub issues and PRs from the terminal, post release announcements to X, keep your community synced via Slack, and summarize incoming issues and discussions so you always know what the community needs.',
      zh: '从终端处理 GitHub Issue 和 PR，在 X 发布版本公告，通过 Slack 保持社区同步，汇总收到的 Issue 和讨论，始终了解社区需求。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/github',
        reason: {
          en: 'Triage issues, review community PRs, check CI on contributor branches, and create release issues — the core of OSS maintenance.',
          zh: '处理 Issue、review 社区 PR、检查贡献者分支的 CI、创建版本 Issue——开源维护的核心工作。',
        },
        order: 1,
        examples: {
          en: [
            'List all open issues with more than 5 thumbs-up',
            'Review this community PR for quality',
            'Create a release checklist issue for v2.0',
          ],
          zh: [
            '列出所有超过 5 个大拇指的开放 Issue',
            '检查这个社区 PR 的质量',
            '为 v2.0 创建一个版本检查清单 Issue',
          ],
        },
      },
      {
        slug: 'openclaw/xurl',
        reason: {
          en: 'Announce releases, engage with users who mention your project, and share what the community is building — social visibility for OSS.',
          zh: '发布版本公告，回应提及你项目的用户，分享社区正在构建的内容——开源的社媒曝光度。',
        },
        order: 2,
        examples: {
          en: [
            'Post the v2.0 release announcement thread',
            'Check X for mentions of my project this week',
            'Search for users asking questions about this library',
          ],
          zh: [
            '发布 v2.0 版本公告推文串',
            '检查本周 X 上对我项目的提及',
            '搜索在问这个库相关问题的用户',
          ],
        },
      },
      {
        slug: 'openclaw/slack',
        reason: {
          en: 'Keep your contributor community engaged in Slack — share roadmap updates, answer questions, and announce breaking changes before they hit.',
          zh: '在 Slack 保持贡献者社区的活跃——分享路线图更新，回答问题，提前公告重大变更。',
        },
        order: 3,
        examples: {
          en: [
            'Post the release notes to #announcements',
            'What are contributors discussing in #contributors today?',
            'Announce the breaking change to #general',
          ],
          zh: [
            '把版本说明发到 #announcements',
            '今天 #contributors 频道贡献者在讨论什么？',
            '向 #general 公告这次重大变更',
          ],
        },
      },
      {
        slug: 'openclaw/summarize',
        reason: {
          en: 'Summarize long issue threads, PRs with 50+ comments, and community discussions so you can respond with context — not noise.',
          zh: '汇总长 Issue 线程、50+ 评论的 PR 和社区讨论，让你带着背景做回应——而不是被噪音淹没。',
        },
        order: 4,
        examples: {
          en: [
            'Summarize this 80-comment issue thread',
            'TL;DR this PR discussion and tell me the sticking point',
            'What are the top 5 feature requests from issues this month?',
          ],
          zh: [
            '汇总这个 80 条评论的 Issue 线程',
            '给这个 PR 讨论写 TL;DR 并告诉我分歧点',
            '本月 Issue 中排名前 5 的功能请求是什么？',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/github openclaw/xurl openclaw/slack openclaw/summarize',
    curator: 'clawhub',
    created: '2026-03-28',
  },
  {
    slug: 'personal-expert',
    name: { en: 'Life Admin', zh: '个人效率助理' },
    division: 'Productivity',
    description: {
      en: 'organize your day, capture ideas, and stay ahead of your schedule — your AI personal assistant',
      zh: '整理你的一天、捕捉想法、掌控日程——你的 AI 个人助理',
    },
    goal: { en: 'Own your day and capture everything', zh: '掌控每一天，留住每个想法' },
    outcome: {
      en: 'Start every morning with a Gmail digest and calendar briefing, check the weather before you commit to plans, capture stray ideas directly into your Obsidian vault, and discover new skills to extend your Agent as your needs evolve.',
      zh: '每天早晨以 Gmail 摘要和日历简报开始，制定计划前先查天气，把零散想法直接存入 Obsidian vault，随着需求演进发现新 Skill 扩展你的 Agent。',
    },
    skillsWithReason: [
      {
        slug: 'openclaw/gog',
        reason: {
          en: 'Your day starts with email and calendar — let your Agent triage the inbox, flag what needs a response, and surface what\'s on your schedule.',
          zh: '你的一天从邮件和日历开始——让 Agent 处理收件箱分拣，标记需要回复的，呈现你的日程安排。',
        },
        order: 1,
        examples: {
          en: [
            'Give me my morning briefing: emails + calendar',
            'Flag any emails that need a reply today',
            "What's on my calendar this week?",
          ],
          zh: [
            '给我早间简报：邮件 + 日历',
            '标出今天需要回复的邮件',
            '本周日历有哪些安排？',
          ],
        },
      },
      {
        slug: 'openclaw/weather',
        reason: {
          en: 'Check the forecast before you plan outdoor activities, commute decisions, or travel — no app-switching needed.',
          zh: '在安排户外活动、通勤决策或出行前查天气预报——无需切换应用。',
        },
        order: 2,
        examples: {
          en: [
            "What's the weather this weekend?",
            'Will it rain during my commute tomorrow?',
            '7-day forecast for my city',
          ],
          zh: [
            '这个周末天气怎么样？',
            '明天通勤时会下雨吗？',
            '我所在城市的 7 天天气预报',
          ],
        },
      },
      {
        slug: 'openclaw/obsidian',
        reason: {
          en: 'Capture every idea, bookmark, and stray thought directly into your Obsidian vault — before it slips away.',
          zh: '把每一个想法、书签和随机念头直接存入 Obsidian vault——在它消失之前。',
        },
        order: 3,
        examples: {
          en: [
            'Save this idea to my Obsidian vault',
            'Search my notes for the book recommendation I saved last week',
            'Create a note: things to do before the move',
          ],
          zh: [
            '把这个想法存入 Obsidian vault',
            '搜索我上周保存的书单推荐',
            '创建笔记：搬家前要做的事',
          ],
        },
      },
      {
        slug: 'openclaw/clawhub',
        reason: {
          en: 'Discover and install new skills as your needs grow — your Agent gets smarter every time you expand it.',
          zh: '随着需求增长发现和安装新 Skill——每次扩展都让你的 Agent 更智能。',
        },
        order: 4,
        examples: {
          en: [
            'Search clawhub for a skill that can read Slack',
            'Install the gog skill for Google Workspace',
            'What skills are trending on clawhub this week?',
          ],
          zh: [
            '在 clawhub 搜索能读取 Slack 的 Skill',
            '安装 gog skill 连接 Google Workspace',
            '本周 clawhub 上有哪些热门 Skill？',
          ],
        },
      },
    ],
    installAll: 'clawhub install openclaw/gog openclaw/weather openclaw/obsidian openclaw/clawhub',
    curator: 'clawhub',
    created: '2026-03-28',
  },
  // ── Mentors ──────────────────────────────────────────────────────────────
  {
    slug: 'feynman-expert',
    name: { en: 'Feynman Explainer', zh: '费曼解释者' },
    division: 'Mentors',
    description: {
      en: 'explain any complex idea simply, teach from first principles',
      zh: '把任何复杂概念说清楚，从第一性原理出发',
    },
    goal: { en: 'Explain anything simply', zh: '把任何事情讲清楚' },
    outcome: {
      en: 'Apply Feynman\'s explanation methodology to papers, code, or ideas — if you can\'t explain it simply, you don\'t understand it yet.',
      zh: '用费曼的解释方法处理论文、代码或想法——如果你说不清楚，说明还没真正理解。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/feynman-skill',
        reason: {
          en: 'Distilled Feynman teaching methodology: first principles, analogy-first explanations, and the "no jargon" rule.',
          zh: '蒸馏自费曼教学法：第一性原理、类比优先的解释方式，以及"禁用行话"原则。',
        },
        examples: {
          en: ['Explain this paper like Feynman would', 'Break down quantum computing from scratch', 'Find the simplest mental model for this concept'],
          zh: ['像费曼一样解释这篇论文', '从零讲清楚量子计算', '为这个概念找到最简洁的心智模型'],
        },
      },
      {
        slug: 'openclaw/summarize',
        reason: {
          en: 'Feed any paper or doc to the Feynman skill — summarize first, then explain.',
          zh: '把任意论文或文档喂给费曼 skill——先摘要，再解释。',
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/feynman-skill openclaw/summarize',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'jobs-expert',
    name: { en: 'Jobs Product Eye', zh: '乔布斯产品眼' },
    division: 'Mentors',
    description: {
      en: 'review products through Jobs\' obsession with simplicity and craft',
      zh: '以乔布斯对简洁与工艺的执念审视产品',
    },
    goal: { en: 'Design and critique products like Jobs', zh: '像乔布斯一样设计和审视产品' },
    outcome: {
      en: 'Apply Jobs\' product thinking: ruthless simplification, user obsession, and the "one more thing" instinct for what matters most.',
      zh: '运用乔布斯的产品思维：无情简化、用户执念，以及对最重要事物的本能直觉。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/steve-jobs-skill',
        reason: {
          en: 'Distilled Jobs: product simplicity doctrine, "real artists ship" instinct, and the reality distortion field.',
          zh: '蒸馏自乔布斯：产品简洁信条、"真正的艺术家会发货"的本能，以及现实扭曲力场。',
        },
        examples: {
          en: ['Review this product spec from Jobs\' perspective', 'What would Jobs cut from this feature list?', 'Write a product narrative in Jobs\' style'],
          zh: ['从乔布斯视角审查这个产品规格', '乔布斯会砍掉功能列表里的哪些？', '用乔布斯的风格写一段产品叙事'],
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/steve-jobs-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'musk-expert',
    name: { en: 'Musk First Principles', zh: '马斯克第一性原理' },
    division: 'Mentors',
    description: {
      en: 'challenge assumptions and design for 10x outcomes, not 10%',
      zh: '打破假设，以10倍而非10%的目标来设计方案',
    },
    goal: { en: 'Think and build at 10x scale', zh: '以10倍规模思考和构建' },
    outcome: {
      en: 'Apply Musk\'s first-principles method: decompose any problem to its physical limits, question every constraint, and build toward what\'s actually possible.',
      zh: '运用马斯克的第一性原理方法：把任何问题分解到物理极限，质疑每一个约束，向真正可能的方向构建。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/elon-musk-skill',
        reason: {
          en: 'Distilled Musk: first-principles decomposition, "physics as the only constraint" thinking, and 10x ambition framing.',
          zh: '蒸馏自马斯克：第一性原理分解、"物理学是唯一约束"思维，以及10倍雄心框架。',
        },
        examples: {
          en: ['Apply first-principles to this engineering constraint', 'What would Musk eliminate from this process?', 'Challenge every assumption in this plan'],
          zh: ['对这个工程约束用第一性原理分析', '马斯克会从这个流程中去掉什么？', '质疑这个计划里的所有假设'],
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/elon-musk-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'pg-expert',
    name: { en: 'Paul Graham Advisor', zh: 'PG 创业顾问' },
    division: 'Mentors',
    description: {
      en: 'startup advice, clear writing, and contrarian market insight from PG',
      zh: '创业建议、清晰写作和 PG 式反共识市场洞察',
    },
    goal: { en: 'Think clearer about startups and writing', zh: '更清晰地思考创业与写作' },
    outcome: {
      en: 'Get PG\'s perspective on your startup, market, or essay — direct feedback on what\'s actually hard and what\'s a distraction.',
      zh: '获得 PG 对你的创业、市场或文章的视角——关于什么才是真正难题、什么是干扰的直接反馈。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/paul-graham-skill',
        reason: {
          en: 'Distilled PG: "do things that don\'t scale" instinct, contrarian market take, and the relentless clarity doctrine in writing.',
          zh: '蒸馏自 PG：做那些无法规模化的事情的本能、反共识市场判断，以及写作中毫不妥协的清晰原则。',
        },
        examples: {
          en: ['Review my startup idea through PG\'s lens', 'What would PG say about this market?', 'Edit this essay to be clearer and more direct'],
          zh: ['用 PG 的视角审查我的创业想法', 'PG 会怎么看这个市场？', '把这篇文章改得更清晰更直接'],
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/paul-graham-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'naval-expert',
    name: { en: 'Naval Wisdom', zh: '纳瓦尔智慧' },
    division: 'Mentors',
    description: {
      en: 'build wealth through specific knowledge, leverage, and long-term thinking',
      zh: '通过专有知识、杠杆和长线思维积累财富',
    },
    goal: { en: 'Build wealth with specific knowledge', zh: '用专有知识创造财富' },
    outcome: {
      en: 'Apply Naval\'s frameworks: identify your specific knowledge, find the right leverage, and make decisions that compound over decades.',
      zh: '运用纳瓦尔的框架：识别你的专有知识，找到合适的杠杆，做复利增长的决策。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/naval-skill',
        reason: {
          en: 'Distilled Naval: specific knowledge identification, leverage types (code/media/capital), and the "long-term game" philosophy.',
          zh: '蒸馏自纳瓦尔：专有知识识别、杠杆类型（代码/媒体/资本）和"长线游戏"哲学。',
        },
        examples: {
          en: ['What is my specific knowledge?', 'Apply Naval\'s leverage framework to my situation', 'How would Naval approach this career decision?'],
          zh: ['我的专有知识是什么？', '用纳瓦尔的杠杆框架分析我的处境', '纳瓦尔会怎么看待这个职业决策？'],
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/naval-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'taleb-expert',
    name: { en: 'Taleb Risk Lens', zh: '塔勒布风险思维' },
    division: 'Mentors',
    description: {
      en: 'find hidden tail risks and design antifragile systems',
      zh: '发现隐藏的尾部风险，设计反脆弱系统',
    },
    goal: { en: 'Spot fragility and build antifragile systems', zh: '识别脆弱性，构建反脆弱系统' },
    outcome: {
      en: 'Apply Taleb\'s risk philosophy: identify hidden exposures, eliminate fragility, and structure systems that gain from disorder.',
      zh: '运用塔勒布的风险哲学：识别隐性风险敞口，消除脆弱性，构建从无序中获益的系统。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/taleb-skill',
        reason: {
          en: 'Distilled Taleb: fat-tail thinking, "skin in the game" test, and antifragility design heuristics.',
          zh: '蒸馏自塔勒布：肥尾思维、"切肤之痛"检验，以及反脆弱设计启发法。',
        },
        examples: {
          en: ['Identify hidden tail risks in this plan', 'Apply the skin-in-the-game test to this decision', 'Make this system more antifragile'],
          zh: ['找出这个方案中的隐性尾部风险', '对这个决策做切肤之痛检验', '让这个系统更具反脆弱性'],
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/taleb-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'karpathy-expert',
    name: { en: 'Karpathy AI Engineer', zh: 'Karpathy AI 工程师' },
    division: 'Mentors',
    description: {
      en: 'deep learning intuition, model debugging, and AI engineering taste',
      zh: '深度学习直觉、模型调试和 AI 工程品味',
    },
    goal: { en: 'Debug and build ML systems with expert intuition', zh: '以专家直觉调试和构建 ML 系统' },
    outcome: {
      en: 'Apply Karpathy\'s AI engineering mindset: measure everything, understand your loss curves, and build intuition through hands-on experimentation.',
      zh: '运用 Karpathy 的 AI 工程思维：量化一切，理解你的损失曲线，通过实践积累直觉。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/karpathy-skill',
        reason: {
          en: 'Distilled Karpathy: "implement from scratch to understand", loss curve intuition, and AI engineering taste.',
          zh: '蒸馏自 Karpathy："从零实现才能真正理解"、损失曲线直觉，以及 AI 工程品味。',
        },
        examples: {
          en: ['Debug this training run like Karpathy would', 'What metrics actually matter here?', 'Explain what\'s happening inside this model'],
          zh: ['像 Karpathy 一样调试这次训练', '这里真正重要的指标是什么？', '解释这个模型内部发生了什么'],
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/karpathy-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'ilya-expert',
    name: { en: 'Ilya Research Taste', zh: 'Ilya 研究品味' },
    division: 'Mentors',
    description: {
      en: 'AI scaling intuition and research direction judgment from Ilya Sutskever',
      zh: 'Ilya Sutskever 的 AI Scaling 直觉与研究方向判断',
    },
    goal: { en: 'Develop AI research intuition and taste', zh: '培养 AI 研究直觉与品味' },
    outcome: {
      en: 'Apply Ilya\'s research perspective: what scaling properties matter, which bets are worth making, and how to reason about emergent capabilities.',
      zh: '运用 Ilya 的研究视角：哪些 Scaling 属性重要，哪些赌注值得押，如何推理涌现能力。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/ilya-sutskever-skill',
        reason: {
          en: 'Distilled Ilya: scaling laws intuition, emergent capabilities reasoning, and long-bet AI research philosophy.',
          zh: '蒸馏自 Ilya：Scaling 定律直觉、涌现能力推理，以及长期押注的 AI 研究哲学。',
        },
        examples: {
          en: ['Think through this research direction with Ilya\'s lens', 'What scaling properties matter most for this problem?', 'Review this experiment design for blind spots'],
          zh: ['用 Ilya 的视角思考这个研究方向', '对于这个问题，哪些 Scaling 属性最重要？', '审查这个实验设计的盲点'],
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/ilya-sutskever-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'rob-pike-expert',
    name: { en: 'Rob Pike Systems Mind', zh: 'Rob Pike 系统思维' },
    division: 'Mentors',
    description: {
      en: 'Unix philosophy, Go design principles, and "less is more" engineering',
      zh: 'Unix 哲学、Go 设计原则与"少即是多"工程思维',
    },
    goal: { en: 'Design simpler, cleaner systems', zh: '设计更简洁的系统' },
    outcome: {
      en: 'Apply Rob Pike\'s design philosophy: question complexity, prefer composition over inheritance, and write code that reads like prose.',
      zh: '运用 Rob Pike 的设计哲学：质疑复杂性，偏好组合而非继承，写出像散文一样可读的代码。',
    },
    skillsWithReason: [
      {
        slug: 'smallnest/rob-pike-skill',
        reason: {
          en: 'Distilled Rob Pike: Unix design rules, Go idioms, and the "clarity over cleverness" doctrine.',
          zh: '蒸馏自 Rob Pike：Unix 设计规则、Go 惯用法，以及"清晰胜于聪明"原则。',
        },
        examples: {
          en: ['Review this API design for simplicity', 'Apply Rob Pike\'s rules to this system', 'What would Rob Pike remove from this interface?'],
          zh: ['审查这个 API 设计的简洁性', '把 Rob Pike 的规则应用到这个系统', 'Rob Pike 会去掉这个接口里的什么？'],
        },
      },
    ],
    installAll: 'clawhub install smallnest/rob-pike-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'design-masters-expert',
    name: { en: 'Design Masters Council', zh: '设计大师议事会' },
    division: 'Mentors',
    description: {
      en: 'Rams, Vignelli, Bass, Scher, Carson — graphic design critique across 7 masters',
      zh: 'Rams、Vignelli、Bass 等7位大师联合评审你的设计',
    },
    goal: { en: 'Get world-class design critique', zh: '获得世界级设计评审' },
    outcome: {
      en: 'Run your visual design past seven graphic design masters — Dieter Rams on function, Vignelli on grid, Saul Bass on concept, and more.',
      zh: '让七位平面设计大师评审你的视觉设计——Dieter Rams 谈功能，Vignelli 谈网格，Saul Bass 谈概念。',
    },
    skillsWithReason: [
      {
        slug: 'HermeticOrmus/design-mastery',
        reason: {
          en: 'Seven masters in one skill: Rams (less is more), Vignelli (grid systems), Bass (concept), Scher (typography), Brockmann, Carson, and Rand.',
          zh: '七位大师合一：Rams（少即是多）、Vignelli（网格系统）、Bass（概念）、Scher（排版）、Brockmann、Carson、Rand。',
        },
        examples: {
          en: ['Critique this logo design across all seven masters', 'What would Dieter Rams remove from this UI?', 'Review this typography through Vignelli\'s lens'],
          zh: ['让七位大师评审这个 Logo 设计', 'Dieter Rams 会去掉这个 UI 里的什么？', '用 Vignelli 的视角评审这段排版'],
        },
      },
    ],
    installAll: 'clawhub install HermeticOrmus/design-mastery',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'mrbeast-expert',
    name: { en: 'MrBeast Content Engine', zh: '野兽先生内容引擎' },
    division: 'Mentors',
    description: {
      en: 'virality, retention, and attention engineering from the world\'s top creator',
      zh: '来自全球顶级创作者的病毒传播、留存和注意力工程',
    },
    goal: { en: 'Engineer viral content and maximum retention', zh: '打造病毒内容与最大留存率' },
    outcome: {
      en: 'Apply MrBeast\'s content methodology: hook in 3 seconds, maintain tension throughout, and optimize every frame for retention.',
      zh: '运用野兽先生的内容方法论：3秒内抓住注意力，全程保持张力，对每一帧做留存优化。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/mrbeast-skill',
        reason: {
          en: 'Distilled MrBeast: the hook formula, tension maintenance, thumbnail psychology, and the reinvestment mindset.',
          zh: '蒸馏自野兽先生：钩子公式、张力维持、缩略图心理学，以及再投入心态。',
        },
        examples: {
          en: ['Rework this video hook for maximum retention', 'What would MrBeast change about this thumbnail?', 'Apply the MrBeast content loop to this idea'],
          zh: ['为最大留存率重写这个视频钩子', '野兽先生会怎么改这个缩略图？', '把野兽先生的内容循环应用到这个想法'],
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/mrbeast-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'x-creator-expert',
    name: { en: 'X Creator Growth', zh: 'X 创作者增长' },
    division: 'Mentors',
    description: {
      en: 'write for engagement and growth on X — distilled from top creators',
      zh: '在 X 上写出高互动内容，提炼自顶级创作者经验',
    },
    goal: { en: 'Grow on X with creator-tested writing', zh: '用经过验证的写作方法在 X 上增长' },
    outcome: {
      en: 'Apply the X creator playbook: thread structure, hook writing, engagement loops, and the cadence that top accounts use to compound their audience.',
      zh: '运用 X 创作者剧本：Thread 结构、钩子写作、互动循环，以及顶级账号用于复利增长粉丝的节奏。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/x-mentor-skill',
        reason: {
          en: 'Distilled from Cole, Bush, Welsh, Hormozi and other top X creators — writing patterns that drive engagement and follower growth.',
          zh: '提炼自 Cole、Bush、Welsh、Hormozi 等顶级 X 创作者——驱动互动和粉丝增长的写作模式。',
        },
        examples: {
          en: ['Rewrite this thread for maximum engagement', 'Turn this idea into a viral X post', 'Critique my X content strategy'],
          zh: ['为最大互动重写这个 Thread', '把这个想法变成病毒式 X 帖子', '评审我的 X 内容策略'],
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/x-mentor-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'buffett-expert',
    name: { en: 'Buffett Investor', zh: '巴菲特投资人' },
    division: 'Mentors',
    description: {
      en: 'value investing with Buffett\'s 6 mental models and 8 decision heuristics',
      zh: '以巴菲特6大心智模型和8条决策启发进行价值投资',
    },
    goal: { en: 'Invest with Buffett\'s mental models', zh: '用巴菲特的心智模型做投资' },
    outcome: {
      en: 'Apply Buffett\'s owner mindset: economic moat analysis, circle of competence check, and Mr. Market patience — before every investment decision.',
      zh: '运用巴菲特的所有者心态：经济护城河分析、能力圈检查，以及在每次投资决策前的市场先生耐心。',
    },
    skillsWithReason: [
      {
        slug: 'will2025btc/buffett-perspective',
        reason: {
          en: 'Six mental models (moat, circle of competence, Mr. Market, compounding, institutional imperative, owner mindset) + 8 decision heuristics.',
          zh: '六大心智模型（护城河、能力圈、市场先生、复利、机构强制性、所有者心态）+ 8条决策启发。',
        },
        examples: {
          en: ['Analyze this company through Buffett\'s lens', 'Is this within my circle of competence?', 'What\'s the economic moat here?'],
          zh: ['用巴菲特的视角分析这家公司', '这在我的能力圈范围内吗？', '这里的经济护城河是什么？'],
        },
      },
      {
        slug: 'openclaw/summarize',
        reason: {
          en: 'Read annual reports and financial filings — feed them to the Buffett skill for analysis.',
          zh: '阅读年报和财务文件，喂给巴菲特 skill 进行分析。',
        },
      },
    ],
    installAll: 'clawhub install will2025btc/buffett-perspective openclaw/summarize',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'investor-council-expert',
    name: { en: 'Investor Council', zh: '投资大师团' },
    division: 'Mentors',
    description: {
      en: '12 investor personas: Buffett, Munger, Lynch, Graham, Burry, and more',
      zh: '12位投资大师：巴菲特、芒格、林奇、格雷厄姆、伯里等',
    },
    goal: { en: 'Analyze investments across 12 legendary perspectives', zh: '从12位传奇视角分析投资' },
    outcome: {
      en: 'Run any investment thesis past 12 legendary investors simultaneously — from Graham\'s safety margin to Cathie Wood\'s disruption lens.',
      zh: '同时让12位传奇投资人审视你的投资论点——从格雷厄姆的安全边际到 Cathie Wood 的颠覆视角。',
    },
    skillsWithReason: [
      {
        slug: 'ancs21/ai-sub-invest',
        reason: {
          en: '12 investor personas in one skill: Buffett, Munger, Ben Graham, Peter Lynch, Phil Fisher, Michael Burry, Pabrai, Ackman, Cathie Wood, Druckenmiller, Jhunjhunwala, Damodaran.',
          zh: '一个 skill 包含12位投资人视角：巴菲特、芒格、格雷厄姆、林奇、费雪、伯里、帕布莱、阿克曼、木头姐、德鲁肯米勒、拉克什、达摩达兰。',
        },
        examples: {
          en: ['Run this investment thesis past all 12 investors', 'What would Peter Lynch think of this growth stock?', 'Apply Ben Graham\'s margin of safety here'],
          zh: ['让12位投资人审视这个投资论点', '彼得·林奇会怎么看这支成长股？', '在这里应用本·格雷厄姆的安全边际'],
        },
      },
    ],
    installAll: 'clawhub install ancs21/ai-sub-invest',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'nuwa-expert',
    name: { en: 'Nuwa Persona Forge', zh: '女娲人格蒸馏器' },
    division: 'Mentors',
    description: {
      en: 'distill any public figure into an installable agent skill in minutes',
      zh: '几分钟内把任何公众人物蒸馏成可安装的 Agent Skill',
    },
    goal: { en: 'Build your own mentor skill from any public figure', zh: '为任何人物创建专属导师 Skill' },
    outcome: {
      en: 'Use 6 parallel research agents to distill any public figure\'s mental models, decision patterns, and communication style into a reusable SKILL.md.',
      zh: '用6个并行研究 Agent 把任何公众人物的心智模型、决策模式和表达风格蒸馏成可复用的 SKILL.md。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/nuwa-skill',
        reason: {
          en: 'The generator: 6 parallel research agents that distill any person into SKILL.md. Produces installable skills like the ones in this Mentors section.',
          zh: '生成器本身：6个并行研究 Agent 把任何人物蒸馏成 SKILL.md。生产出像本 Mentors 区里那些可安装的 Skill。',
        },
        examples: {
          en: ['Distill Charlie Munger into a skill', 'Create a Jensen Huang leadership skill', 'Generate a Confucius wisdom skill'],
          zh: ['把查理·芒格蒸馏成一个 Skill', '创建一个黄仁勋领导力 Skill', '生成一个孔子智慧 Skill'],
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/nuwa-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'council-expert',
    name: { en: 'Council of 18 Minds', zh: '18位智者议事会' },
    division: 'Mentors',
    description: {
      en: 'Aristotle, Feynman, Lao Tzu, Turing, Munger — 18 great minds deliberate your problem',
      zh: '亚里士多德、费曼、老子、图灵、芒格——18位伟大思想家共同审议你的问题',
    },
    goal: { en: 'Get 18 great minds to deliberate your hardest problems', zh: '让18位伟大思想家共同审议你最难的问题' },
    outcome: {
      en: 'Invoke a cross-examination council spanning philosophy (Aristotle, Socrates, Lao Tzu, Marcus Aurelius), design (Dieter Rams), risk (Taleb), AI (Karpathy, Ilya), systems (Meadows), and more.',
      zh: '召集跨领域审议团：哲学（亚里士多德、苏格拉底、老子、Marcus Aurelius）、设计（Dieter Rams）、风险（塔勒布）、AI（Karpathy、Ilya）、系统思维（Meadows）等。',
    },
    skillsWithReason: [
      {
        slug: '0xNyk/council-of-high-intelligence',
        reason: {
          en: '18 persona agents in one skill: Aristotle, Socrates, Sun Tzu, Marcus Aurelius, Machiavelli, Lao Tzu, Ada Lovelace, Feynman, Linus Torvalds, Musashi, Alan Watts, Karpathy, Ilya, Kahneman, Meadows, Dieter Rams, Taleb, Munger.',
          zh: '18个人格 Agent：亚里士多德、苏格拉底、孙子、Marcus Aurelius、马基雅维利、老子、Ada Lovelace、费曼、Linus、宫本武藏、Alan Watts、Karpathy、Ilya、卡尼曼、Meadows、Dieter Rams、塔勒布、芒格。',
        },
        examples: {
          en: ['Council, deliberate the ethics of this AI decision', 'What do all 18 minds think about this strategy?', 'Cross-examine my startup thesis with the full council'],
          zh: ['议事会，审议这个 AI 决策的伦理', '18位思想家怎么看这个策略？', '让完整议事会交叉审查我的创业论点'],
        },
      },
    ],
    installAll: 'clawhub install 0xNyk/council-of-high-intelligence',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  // Chinese Mentors → 中文专区
  {
    slug: 'zhang-yiming-expert',
    name: { en: 'Zhang Yiming Strategist', zh: '张一鸣产品战略家' },
    division: '中文专区',
    description: {
      en: 'ByteDance product strategy and scale-first thinking from Zhang Yiming',
      zh: '字节跳动式产品战略与规模优先思维',
    },
    goal: { en: 'Build products with ByteDance-scale thinking', zh: '用字节跳动规模思维做产品' },
    outcome: {
      en: 'Apply Zhang Yiming\'s product methodology: data-driven iteration, algorithm-first distribution, and ruthless prioritization for scale.',
      zh: '运用张一鸣的产品方法论：数据驱动迭代、算法优先分发，以及针对规模的无情优先级排序。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/zhang-yiming-skill',
        reason: {
          en: 'Distilled Zhang Yiming: recommendation algorithm thinking, product metrics culture, and the ByteDance organizational philosophy.',
          zh: '蒸馏自张一鸣：推荐算法思维、产品数据文化，以及字节跳动的组织哲学。',
        },
        examples: {
          en: ['Evaluate this product strategy with Zhang Yiming\'s lens', 'How would ByteDance approach this growth problem?', 'What metrics would Zhang Yiming track first?'],
          zh: ['从张一鸣的视角评估这个产品策略', '字节跳动会怎么解决这个增长问题？', '张一鸣会先追踪哪些指标？'],
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/zhang-yiming-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
  {
    slug: 'zhangxuefeng-expert',
    name: { en: 'Zhang Xuefeng Career Advisor', zh: '张雪峰志愿填报顾问' },
    division: '中文专区',
    description: {
      en: 'Chinese college application and career planning with Zhang Xuefeng\'s direct style',
      zh: '张雪峰式的高考志愿填报与职业规划直接建议',
    },
    goal: { en: 'Navigate Chinese college applications and career', zh: '搞定高考志愿与职业规划' },
    outcome: {
      en: 'Get Zhang Xuefeng\'s no-nonsense advice on college major selection, career prospects, and the realities of the Chinese job market.',
      zh: '获得张雪峰式的直接建议：专业选择、就业前景，以及中国就业市场的现实。',
    },
    skillsWithReason: [
      {
        slug: 'alchaincyf/zhangxuefeng-skill',
        reason: {
          en: 'Distilled Zhang Xuefeng: blunt college major ranking, regional job market realities, and "don\'t choose based on passion, choose based on prospects."',
          zh: '蒸馏自张雪峰：直白的专业排名、各地就业市场现实，以及"不要凭兴趣选，要凭前景选"原则。',
        },
        examples: {
          en: ['Which major should a science student choose?', 'Analyze the risks in this college application combination', 'What\'s the job market like for this major in this city?'],
          zh: ['理科生应该填报什么专业？', '分析这个志愿组合的风险', '这个城市这个专业的就业情况怎么样？'],
        },
      },
    ],
    installAll: 'clawhub install alchaincyf/zhangxuefeng-skill',
    curator: 'clawhub',
    created: '2026-04-13',
  },
];

export function getExpert(slug: string): Expert | undefined {
  return experts.find(e => e.slug === slug);
}

export function getExperts(): Expert[] {
  return experts;
}
