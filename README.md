# clawhub.md

**The skill registry for Claude Code agents.**

clawhub.md is a curated registry of [AgentSkills](https://github.com/anthropics/skills) — pre-built capabilities you install into your Claude Code agent with one command. Browse by skill or pick an Expert bundle tuned for your role.

```bash
clawhub install openclaw/github
```

→ **[clawhub.md](https://clawhub.md)**

---

## What is an AgentSkill?

An AgentSkill is a `SKILL.md` file that teaches your Claude Code agent how to use a tool, API, or workflow. Once installed, your agent understands the skill's capabilities natively — no prompt engineering required.

```bash
# Install a skill
clawhub install openclaw/gog

# Your agent now knows how to use Google Workspace
"Check my inbox and summarize anything urgent"
"Schedule a meeting tomorrow at 2pm with Alice"
```

---

## Expert Bundles

Experts are curated skill bundles for specific roles. Install everything you need in one command.

| Expert | Role | Skills |
|--------|------|--------|
| [Dev Expert](https://clawhub.md/expert/dev-expert) | Developer | github + coding-agent |
| [AI Builder Expert](https://clawhub.md/expert/ai-builder-expert) | AI developer | claude-api + mcp-builder + skill-creator + coding-agent |
| [Indie Dev Expert](https://clawhub.md/expert/indie-dev-expert) | Solo developer | github + coding-agent + xurl + skill-creator |
| [Founder Expert](https://clawhub.md/expert/founder-expert) | Startup founder | gog + github + slack + notion + summarize |
| [PM Expert](https://clawhub.md/expert/pm-expert) | Product manager | gog + notion + slack + summarize |
| [Writing Expert](https://clawhub.md/expert/writing-expert) | Writer / docs | obsidian + notion + summarize + pdf |
| [Research Expert](https://clawhub.md/expert/research-expert) | Researcher | summarize + obsidian + notion |
| [Comms Expert](https://clawhub.md/expert/comms-expert) | Communications | gog + slack + xurl |
| [Creator Expert](https://clawhub.md/expert/creator-expert) | Content creator | summarize + notion + xurl |
| [Social Media Expert](https://clawhub.md/expert/social-media-expert) | Social media | xurl + summarize + slack |
| [Meeting Expert](https://clawhub.md/expert/meeting-expert) | Meeting-heavy roles | gog + summarize + notion |
| [Open Source Expert](https://clawhub.md/expert/open-source-expert) | OSS maintainer | github + xurl + slack + summarize |
| [Daily Briefing](https://clawhub.md/expert/daily-briefing) | Everyone | gog + weather + summarize |
| [Personal Expert](https://clawhub.md/expert/personal-expert) | Personal productivity | gog + weather + obsidian + clawhub |
| [Student Expert](https://clawhub.md/expert/student-expert) | Student / academic | summarize + obsidian + pdf + gog |
| [Feishu Assistant](https://clawhub.md/expert/feishu-expert) | Feishu teams | feishu |
| [DingTalk Assistant](https://clawhub.md/expert/dingtalk-expert) | DingTalk teams | dingtalk |
| [WeCom Assistant](https://clawhub.md/expert/wecom-expert) | WeCom customer service | wecom |
| [Chinese Enterprise Ops](https://clawhub.md/expert/ops-cn-expert) | Chinese enterprise | feishu + dingtalk + wecom |
| [Dev Expert (CN)](https://clawhub.md/expert/dev-expert-cn) | Chinese dev teams | github + feishu + coding-agent |

---

## Browse Skills

The registry currently includes skills from three namespaces:

**[openclaw](https://clawhub.md/browse?author=openclaw)** — productivity and integration skills
gog · github · summarize · obsidian · xurl · slack · notion · weather · clawhub · coding-agent · feishu · dingtalk · wecom

**[anthropics](https://clawhub.md/browse?author=anthropics)** — official Anthropic skills
pdf · mcp-builder · skill-creator · claude-api

**[gstack](https://clawhub.md/browse?author=gstack)** — Claude Code workflow skills by Garry Tan
review · ship · investigate · qa · design-review · retro

---

## Agentic Setup Files

Every expert page generates a machine-readable `.md` file at `/expert/[slug].md`. Share the URL with your agent and it will set everything up automatically:

```
https://clawhub.md/expert/dev-expert.md
```

---

## Contributing

Want to add a skill or expert to the registry? See [CONTRIBUTING.md](CONTRIBUTING.md).

The registry is curated — we prioritize skills that are:
- **Immediately useful** — works out of the box or with minimal setup
- **Well-documented** — the SKILL.md explains every capability clearly
- **Reliable** — backed by a maintained repository

---

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build
npm run build
```

**Stack:** Astro · TypeScript · Cloudflare Workers · Cloudflare KV

The site is deployed to Cloudflare Workers on every push to `master`.

---

## License

MIT
