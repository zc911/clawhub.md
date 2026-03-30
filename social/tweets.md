# clawhub.md — X/Twitter Content

Ready-to-post. Each post leads with a concrete moment of delegation, not a feature list.

---

## What is clawhub / Intro Posts

### One-liner intro
```
clawhub.md — skill registry for OpenClaw agents.

Pick an Expert for your role.
Say one sentence to your agent.
It handles the setup and the work.

clawhub.md
```

### The core interaction (show don't tell)
```
The whole thing is two steps:

① Say to your agent:
"Read https://clawhub.md/expert/dev-expert.md and set me up as Dev Expert"

② Then:
"Review my open PRs for anything blocking"
"Check CI status on my current branch"
"Triage my issues by priority"

Your agent handles it. You get on with your day.
```

### Intro thread (5 tweets)

**1/5**
```
Most people use Claude for questions.

A small number use it for delegation — giving their agent a skill set and saying "handle it."

clawhub.md is built for the second group.
```

**2/5**
```
Here's how it works:

Say this to your agent:
"Read https://clawhub.md/expert/meeting-expert.md and set me up as Meeting Expert"

Your agent reads the file. Installs the skills. Configures itself.

Then: "Prepare background materials for my 3pm call."

Done.
```

**3/5**
```
Experts are curated skill sets built around real workflows.

PM Expert → draft PRDs, manage inbox, coordinate Slack
Founder Expert → investor updates, team, product — one agent
Open Source Expert → triage issues, announce releases, engage contributors

20 experts. Pick yours at https://clawhub.md/experts
```

**4/5**
```
The setup is a URL.

Every Expert has a machine-readable file:
https://clawhub.md/expert/founder-expert.md

Your agent reads it and follows the setup steps inside.
No copy-paste prompts. No manual config. The agent does it.
```

**5/5**
```
Works on OpenClaw, Claude Code, Telegram, Feishu — any agent interface.

The skills are open. The experts are open.
If you build a workflow worth sharing, open an issue.

github.com/zc911/clawhub.md
```

---

## Expert Spotlight Posts

### Founder Expert
```
The founder's agent:

Say: "Read https://clawhub.md/expert/founder-expert.md and set me up as Founder Expert"

Then:
→ "Draft my monthly investor update"
→ "What PRs need my review today?"
→ "What's the latest blocking issue in #engineering?"
→ "Update the Q2 roadmap with this new priority"

Gmail, GitHub, Slack, Notion — one agent covers it.

https://clawhub.md/expert/founder-expert
```

### Meeting Expert
```
Before: open calendar, find the doc, prep notes, take minutes, send follow-up.

After:
"Prepare background materials for my 3pm call"
"Draft minutes from what we just discussed"
"Send the minutes to all attendees"

Meeting Expert for OpenClaw.

https://clawhub.md/expert/meeting-expert
```

### Feishu / DingTalk / WeCom (Chinese)
```
三个平台，一个 Agent。

说：「Read https://clawhub.md/expert/ops-cn-expert.md and set me up as Chinese Enterprise Ops Expert」

然后：
→「汇总今天飞书未读消息」
→「整理钉钉会议纪要并发给参会人」
→「有哪些企业微信客户消息还没回？」

https://clawhub.md/expert/ops-cn-expert
```

### Open Source Expert
```
Maintaining an OSS project means a lot of reading and writing, not coding.

Open Source Expert:
→ "List issues with more than 10 thumbs-up"
→ "Summarize this 60-comment issue thread"
→ "Post the v2.0 release announcement"
→ "What are contributors discussing today?"

https://clawhub.md/expert/open-source-expert
```

### Daily Briefing
```
Every morning:

"Give me my briefing"

→ Unread emails, flagged urgent
→ Today's calendar
→ Weather
→ Anything that needs a reply

One sentence. 30 seconds to read. Day starts clear.

https://clawhub.md/expert/daily-briefing
```

### PM Expert
```
PM work is mostly reading, writing, and coordination.

PM Expert:
→ "Summarize this user research report"
→ "Draft a PRD for this feature in Notion"
→ "What are the current blockers in #engineering?"
→ "Schedule a stakeholder sync for next week"

https://clawhub.md/expert/pm-expert
```

---

## Milestone Post (20 experts)

```
clawhub.md now has 20 Expert bundles.

New this week:
→ AI Builder — build Claude apps, MCP servers, reusable skills
→ Founder — investor email, team, product from one agent
→ Open Source Maintainer — triage, announce, engage
→ Chinese Enterprise Ops — Feishu + DingTalk + WeCom unified
→ Indie Dev — build in public, ship, grow an audience

Pick an Expert. Say one sentence. Let your agent handle it.

https://clawhub.md/experts
```

---

## Content Principles

Every post should:
- Show a **concrete moment** of delegation ("I said X, my agent did Y")
- Include the **actual sentence** to say to your agent, or a real example prompt
- Link to the **specific expert page**, not just the homepage
- Be usable without any prior knowledge of OpenClaw or clawhub

Avoid:
- Feature lists without context ("supports 22 skills")
- Developer-tool framing ("install via CLI", "open source")
- Vague AI hype ("your AI-powered workflow")

---

## Cadence

3 posts/week:
- **Monday** — Expert spotlight (one expert, 2-3 concrete prompts, link)
- **Wednesday** — Use case moment (before/after, one specific delegation)
- **Friday** — Community / update (new experts, contributor work, product news)

## Hashtags

`#OpenClaw` `#ClaudeCode` `#AIAgents`
For Chinese: `#OpenClaw` `#AI助手` `#效率工具`
