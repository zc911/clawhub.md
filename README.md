# clawhub.md

**Let your agent handle it.**

clawhub.md is the skill registry for [OpenClaw](https://openclaw.ai) — curated Expert bundles that tell your agent what to install, how to configure it, and what it can do. Pick an Expert for your role, say one sentence to your agent, and it handles the setup.

---

## How it works

**① Pick an Expert and say this to your agent:**

```
Read https://clawhub.md/expert/dev-expert.md and set me up as Dev Expert
```

Your agent reads the Expert file, installs the skills, and configures everything.

**② Then just talk to it:**

```
Review my open PRs for anything blocking
Create an issue: login page crashes on Safari
What's the CI status on my current branch?
```

Works on OpenClaw, Claude Code, Telegram, Feishu, and any agent interface.

---

## Experts

Each Expert is a curated skill set built around a real workflow.

| Expert | What you can say to your agent |
|--------|-------------------------------|
| [Dev Expert](https://clawhub.md/expert/dev-expert) | "Review my open PRs" · "Check CI status" · "Triage my issues" |
| [AI Builder Expert](https://clawhub.md/expert/ai-builder-expert) | "Build a streaming app with Claude API" · "Create an MCP server for my API" |
| [Indie Dev Expert](https://clawhub.md/expert/indie-dev-expert) | "Delegate writing tests to an agent" · "Post my release announcement" |
| [Founder Expert](https://clawhub.md/expert/founder-expert) | "Draft my investor update" · "What's blocking the engineering team?" |
| [PM Expert](https://clawhub.md/expert/pm-expert) | "Draft a PRD for this feature" · "Summarize this user research report" |
| [Writing Expert](https://clawhub.md/expert/writing-expert) | "Save this article to my vault" · "Draft a blog post about this topic" |
| [Research Expert](https://clawhub.md/expert/research-expert) | "Summarize this paper" · "Search my notes for 'product strategy'" |
| [Comms Expert](https://clawhub.md/expert/comms-expert) | "Summarize my unread emails" · "Post the update to #general" |
| [Creator Expert](https://clawhub.md/expert/creator-expert) | "Turn this video into a Twitter thread" · "Add this to my content calendar" |
| [Social Media Expert](https://clawhub.md/expert/social-media-expert) | "Check my X mentions" · "Post the launch announcement" |
| [Meeting Expert](https://clawhub.md/expert/meeting-expert) | "Prepare materials for my 3pm call" · "Draft minutes from what we discussed" |
| [Open Source Expert](https://clawhub.md/expert/open-source-expert) | "List issues with the most thumbs-up" · "Post the v2.0 release thread" |
| [Daily Briefing](https://clawhub.md/expert/daily-briefing) | "Give me my morning briefing" · "What's on my calendar today?" |
| [Personal Expert](https://clawhub.md/expert/personal-expert) | "Save this idea to my vault" · "What's the weather this weekend?" |
| [Student Expert](https://clawhub.md/expert/student-expert) | "Summarize this paper into key findings" · "Add my exam dates to Calendar" |
| [Feishu Assistant](https://clawhub.md/expert/feishu-expert) | "Summarize today's unread Feishu messages" · "What's on my Feishu calendar?" |
| [DingTalk Assistant](https://clawhub.md/expert/dingtalk-expert) | "Prepare materials for my DingTalk meeting" · "Draft and send the minutes" |
| [WeCom Assistant](https://clawhub.md/expert/wecom-expert) | "Summarize unanswered customer messages" · "Draft a reply to this inquiry" |
| [Chinese Enterprise Ops](https://clawhub.md/expert/ops-cn-expert) | "What's pending across Feishu, DingTalk, and WeCom today?" |
| [Dev Expert (CN)](https://clawhub.md/expert/dev-expert-cn) | "Review my PRs and sync progress to Feishu" |

→ **[See all experts](https://clawhub.md/experts)**

---

## Browse Skills

Skills are the building blocks inside each Expert. You can also install them individually.

→ **[Browse all skills](https://clawhub.md/browse)**

**openclaw** — Gmail, GitHub, Slack, Notion, Obsidian, X, weather, summarize, coding-agent, clawhub
**anthropics** — PDF, MCP builder, skill creator, Claude API
**gstack** — ship, review, investigate, QA, design-review, retro

> Feishu, DingTalk, and WeCom skills are referenced by Chinese Enterprise experts and will be added to the registry shortly.

---

## Agentic setup

Every Expert has a machine-readable `.md` file at `/expert/[slug].md`. Your agent reads it and follows the setup steps inside — no manual configuration.

```
https://clawhub.md/expert/pm-expert.md
```

---

## Contributing

Want to submit a skill or propose an Expert? See [CONTRIBUTING.md](CONTRIBUTING.md) or open an issue with the **[Add a skill](https://github.com/zc911/clawhub.md/issues/new?template=add-skill.yml)** or **[Propose an expert](https://github.com/zc911/clawhub.md/issues/new?template=propose-expert.yml)** template.

---

## Development

```bash
npm install
npm run dev    # http://localhost:4321
npm test
npm run build
```

**GitHub token (optional but recommended):** Without a token the GitHub API rate limit is 60 req/hr. Set `GITHUB_TOKEN` in your `.env` or Cloudflare Workers secrets to raise it to 5000 req/hr.

Stack: Astro · TypeScript · Cloudflare Workers · Cloudflare KV
