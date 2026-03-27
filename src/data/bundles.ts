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
];

export function getExpert(slug: string): Expert | undefined {
  return experts.find(e => e.slug === slug);
}

export function getExperts(): Expert[] {
  return experts;
}
