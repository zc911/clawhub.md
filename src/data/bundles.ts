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

export interface Expert {
  slug: string;
  name: L;
  description: L;
  goal: L;          // headline on the expert page
  outcome: L;       // "After installing, your agent can..."
  skillsWithReason: SkillWithReason[];
  installAll?: string;    // single command to install all skills
  configSnippet?: string; // optional CLAUDE.md configuration snippet
  curator: string;
  created: string;  // ISO date
}

export const experts: Expert[] = [
  {
    slug: 'dev-expert',
    name: { en: 'Dev Expert', zh: '开发者助理' },
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
    name: { en: 'Daily Briefing', zh: '每日简报' },
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
    name: { en: 'Creator Expert', zh: '内容创作助理' },
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
    name: { en: 'Meeting Expert', zh: '会议助理' },
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
    name: { en: 'Comms Expert', zh: '沟通助理' },
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
    name: { en: 'Research Expert', zh: '研究助理' },
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
    name: { en: 'AI Builder Expert', zh: 'AI 应用开发者' },
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
    name: { en: 'Indie Dev Expert', zh: '独立开发者助理' },
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
    name: { en: 'Product Manager Expert', zh: '产品经理助理' },
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
    name: { en: 'Writing & Docs Expert', zh: '写作与文档助理' },
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
    name: { en: 'Social Media Expert', zh: '社媒运营助理' },
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
    name: { en: 'Startup Founder Expert', zh: '创业者助理' },
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
    name: { en: 'Student & Academic Expert', zh: '学习与科研助理' },
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
    name: { en: 'Open Source Maintainer Expert', zh: '开源维护者助理' },
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
    name: { en: 'Personal Productivity Expert', zh: '个人效率助理' },
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
];

export function getExpert(slug: string): Expert | undefined {
  return experts.find(e => e.slug === slug);
}

export function getExperts(): Expert[] {
  return experts;
}
