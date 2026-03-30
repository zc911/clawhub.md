# clawhub.md — X/Twitter Content

Ready-to-post content. Copy, adjust tone/timing, post.

---

## Launch / Milestone Posts

### 20 Experts milestone

```
clawhub.md now has 20 expert bundles.

One install command. Everything your agent needs for your role.

New today:
→ AI Builder — claude-api + mcp-builder + skill-creator
→ Indie Dev — ship in public, grow an audience
→ Founder — investor email, team, product, all from one agent
→ Open Source Maintainer — triage issues, announce releases
→ Chinese Enterprise Ops — Feishu + DingTalk + WeCom unified

clawhub.md/experts
```

---

### What is clawhub (intro thread)

**Tweet 1/5**
```
clawhub.md — a skill registry for Claude Code agents.

You install a skill. Your agent learns a new capability.

That's the whole idea.
```

**Tweet 2/5**
```
Here's how it works:

clawhub install openclaw/github

Now your agent can review PRs, check CI status, triage issues — all from the terminal.

No prompt engineering. No copy-paste system prompts. Just install and use.
```

**Tweet 3/5**
```
The registry has 22 skills across 3 namespaces:

@openclaw — Google Workspace, GitHub, Slack, Notion, Obsidian, X, Feishu, DingTalk, WeCom
@anthropics — PDF, MCP builder, skill creator, Claude API
@garrytan/gstack — ship, review, investigate, QA, retro

clawhub.md/browse
```

**Tweet 4/5**
```
Experts are the fast path.

Instead of picking skills one by one, you grab a bundle tuned for your role.

PM Expert: gog + notion + slack + summarize
One install. Your agent handles specs, meeting notes, and stakeholder emails.

clawhub.md/experts
```

**Tweet 5/5**
```
Everything is open.

The skill registry is just GitHub repos.
The expert bundles are open source.
The site is MIT.

If you build a skill worth sharing, open an issue and we'll add it.

github.com/zc911/clawhub.md
```

---

## Expert Spotlight Posts

### AI Builder Expert
```
If you're building with the Claude API, this is the setup.

AI Builder Expert for Claude Code:
→ anthropics/claude-api — scaffold apps, implement tool use, add streaming
→ anthropics/mcp-builder — build MCP servers that give LLMs new capabilities
→ anthropics/skill-creator — package your workflows as reusable skills
→ openclaw/coding-agent — delegate boilerplate to Claude Code or Codex

clawhub install anthropics/claude-api anthropics/mcp-builder anthropics/skill-creator openclaw/coding-agent

clawhub.md/expert/ai-builder-expert
```

### Indie Dev Expert
```
The indie dev stack for Claude Code:

clawhub install openclaw/github openclaw/coding-agent openclaw/xurl anthropics/skill-creator

What you get:
- Manage PRs + CI from the terminal
- Delegate tests and boilerplate to an agent
- Post release announcements to X
- Package your best workflows as reusable skills

Build, ship, announce. Repeat.

clawhub.md/expert/indie-dev-expert
```

### Open Source Expert
```
Maintaining an OSS project is mostly communication work.

The Open Source Expert makes it faster:
→ github — triage issues, review community PRs, check CI
→ xurl — announce releases, engage users who mention you
→ slack — keep contributors synced
→ summarize — digest 80-comment issue threads in seconds

clawhub.md/expert/open-source-expert
```

### Founder Expert
```
The founder's agent command center:

clawhub install openclaw/gog openclaw/github openclaw/slack openclaw/notion openclaw/summarize

One agent handles:
→ Investor updates via Gmail
→ Reviewing engineer PRs from the terminal
→ Team coordination via Slack
→ Product roadmap in Notion
→ Competitor research via summarize

Everything a founder touches, one workflow.

clawhub.md/expert/founder-expert
```

### ops-cn-expert (Chinese)
```
飞书、钉钉、企业微信——三个平台，一个 Agent。

中国企业运营助理：
→ 汇总飞书未读消息
→ 自动整理钉钉会议纪要
→ 跟进企业微信客户消息

clawhub install openclaw/feishu openclaw/dingtalk openclaw/wecom

clawhub.md/expert/ops-cn-expert
```

---

## Engagement / Use Case Posts

### The agentic setup file idea
```
Every expert page generates a machine-readable setup file.

Share this URL with your agent:
clawhub.md/expert/pm-expert.md

It reads the file, installs the skills, and configures itself.

This is what "agentic" should mean — the agent does the setup, not you.
```

### GitHub token tip
```
Quick tip if you're using clawhub with GitHub skills:

Set GITHUB_TOKEN in your environment.

Without it: 60 API req/hr (rate limit hits fast)
With it: 5,000 req/hr

Takes 30 seconds. Worth it.
```

### Daily briefing use case
```
My Claude Code morning routine:

clawhub install openclaw/gog openclaw/weather openclaw/summarize

Then every morning:
"Give me my briefing — emails, calendar, weather, anything urgent"

Takes 10 seconds to read. Saves 20 minutes of inbox triage.

clawhub.md/expert/daily-briefing
```

---

## Weekly Content Calendar Template

**Monday** — Use case / how-to (concrete example of a skill in action)
**Wednesday** — Expert spotlight (one expert, 3-4 bullet points, install command)
**Friday** — Community / meta (new skills, contributor shoutouts, product updates)

Aim for 3 posts/week. Quality over volume. Every post should include:
- The install command (copyable)
- A link to the expert or skill page
- At least one concrete example

---

## Hashtags to use

Primary: `#ClaudeCode` `#AgentSkills` `#AIAgents`
Secondary: `#Claude` `#Anthropic` `#BuildingInPublic`
For Chinese content: `#Claude` `#AI助手` `#效率工具`
