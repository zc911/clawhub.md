---
name: openclaw-best-practices
description: OpenClaw best practices — make your agent smarter, more reliable, and truly yours. Covers workspace setup, persona, memory, models, channels, heartbeat, security, and automation.
---

# OpenClaw Best Practices

> Make your OpenClaw agent smarter, more reliable, and truly yours.
> Source: clawhub.md — the skill registry for AI agents.

## Quick Wins (Do These First)

### 1. Give Your Agent a Soul

Edit `~/.openclaw/workspace/SOUL.md` — this is who your agent *is*.

```markdown
# SOUL.md

## Identity
- Name: Atlas
- Role: Personal assistant and coding partner
- Style: Direct, concise, occasionally witty. Never robotic.

## Principles
- Act first, ask only when truly stuck.
- Be honest — say "I don't know" when you don't.
- Respect privacy — never share personal data externally.

## Boundaries
- Ask before sending emails, tweets, or anything public.
- Never run destructive commands without confirmation.
- In group chats, participate — don't dominate.
```

**Why it matters:** Without SOUL.md, your agent is a generic chatbot. With it, your agent has personality, boundaries, and consistent behavior across sessions.

### 2. Tell Your Agent About You

Edit `~/.openclaw/workspace/USER.md`:

```markdown
# USER.md

- Name: Alex
- Call me: Alex
- Timezone: America/New_York
- Preferences: Brief answers by default. Detailed when I ask.
- Work: Software engineer, mainly Python/TypeScript
- Notes: I prefer trash over rm. Always use git branches.
```

**Why it matters:** Your agent reads this every session. The more context you give, the less you repeat yourself.

### 3. Set Up a Good Model Stack

In `~/.openclaw/openclaw.json`:

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-sonnet-4-5",
        fallbacks: ["anthropic/claude-opus-4-6", "openai/gpt-5.2"],
      },
      models: {
        "anthropic/claude-sonnet-4-5": { alias: "sonnet" },
        "anthropic/claude-opus-4-6": { alias: "opus" },
        "openai/gpt-5.2": { alias: "gpt" },
      },
    },
  },
}
```

**Tips:**
- Use `sonnet` as your daily driver (fast + capable). Switch to `opus` for complex tasks with `/model opus`.
- Always set fallbacks — if one provider has an outage, your agent keeps working.
- Define aliases so you can switch models quickly in chat.

## Workspace Mastery

### Memory That Actually Works

Your agent wakes up fresh every session. These files are its continuity:

**Daily logs** (`memory/YYYY-MM-DD.md`):
- Raw notes of what happened each day
- Your agent should create these automatically

**Long-term memory** (`MEMORY.md`):
- Curated insights, not raw logs
- Decisions made, lessons learned, preferences discovered
- Review and prune periodically — this file is injected every turn and costs tokens

**Pro tip:** Add this to your `AGENTS.md`:
```markdown
## Memory Rules
- Write daily logs to memory/YYYY-MM-DD.md
- Review MEMORY.md weekly, remove outdated items
- Never store secrets in memory files
- Keep MEMORY.md under 3000 words to manage token costs
```

### AGENTS.md — Your Agent's Operating Manual

This is the most powerful file. Use it to set behavioral rules:

```markdown
# AGENTS.md

## Session Startup
1. Read SOUL.md, USER.md
2. Check memory/today.md and memory/yesterday.md
3. Read MEMORY.md (main session only)

## Work Style
- Explore before asking. Read files, check context, search first.
- For coding: always run tests after changes.
- For writing: match my tone from previous examples.

## Safety
- trash > rm (always recoverable)
- git commit before major refactors
- Ask before any external action (email, API calls, posts)
```

## Channel Configuration

### Single Channel (Simplest)

```json5
{
  channels: {
    telegram: {
      enabled: true,
      botToken: "YOUR_BOT_TOKEN",
      allowFrom: ["YOUR_TELEGRAM_ID"],
    },
  },
}
```

### Multi-Channel Setup

```json5
{
  channels: {
    whatsapp: {
      dmPolicy: "pairing",
      allowFrom: ["+1234567890"],
      groups: { "*": { requireMention: true } },
    },
    telegram: {
      enabled: true,
      botToken: "BOT_TOKEN",
      allowFrom: ["123456789"],
      groups: { "*": { requireMention: true } },
    },
    discord: {
      enabled: true,
      token: "BOT_TOKEN",
      dm: { enabled: true, allowFrom: ["USER_ID"] },
      guilds: {
        "GUILD_ID": {
          requireMention: false,
          channels: {
            general: { allow: true },
          },
        },
      },
    },
  },
}
```

**Best practice:** Always set `requireMention: true` in groups to prevent your agent from responding to every message.

### Multi-User Security

If multiple people DM your bot, enable session isolation:

```json5
{
  session: {
    dmScope: "per-channel-peer",
  },
}
```

This ensures each user gets their own conversation context — no data leaks between users.

## Automation

### Heartbeat — Your Agent's Pulse

The heartbeat lets your agent check in periodically without being asked:

```json5
{
  agents: {
    defaults: {
      heartbeat: {
        every: "30m",
        target: "last",
      },
    },
  },
}
```

Create `~/.openclaw/workspace/HEARTBEAT.md` with periodic tasks:

```markdown
# HEARTBEAT.md
- Check for urgent unread emails
- Note any calendar events in the next 2 hours
```

**Tips:**
- Keep HEARTBEAT.md tiny — each check costs tokens
- Use `target: "last"` to send alerts to whichever channel you used last
- Set a longer interval (2h+) if you want to save costs

### Cron Jobs — Scheduled Tasks

For precise timing, use cron instead of heartbeat:

```
/cron add --name "morning-brief" --schedule "0 8 * * *" --tz "America/New_York" --task "Check my email, calendar, and weather. Send me a morning briefing."
```

**When to use heartbeat vs cron:**
- **Heartbeat**: Batch multiple checks, timing can drift, needs conversation context
- **Cron**: Exact timing, isolated execution, standalone tasks

## Skills — Extend Your Agent

### Install Useful Skills

```bash
# Search for skills
clawhub search "web search"

# Install
clawhub install tavily-search

# Update all
clawhub update --all
```

### Recommended Starter Skills

| Skill | What It Does |
|-------|-------------|
| `tavily-search` | AI-optimized web search |
| `summarize` | Summarize URLs, PDFs, videos |
| `github` | GitHub operations via gh CLI |
| `gog` | Google Workspace (Gmail, Calendar, Drive) |
| `self-improving-agent` | Learn from mistakes automatically |
| `humanizer` | Remove AI-sounding patterns from writing |

### Security: Vet Before Installing

Third-party skills are **untrusted code**. Read the SKILL.md before enabling. If you have the `skill-vetter` skill installed, use it:

```
/skill-vetter check <skill-name>
```

## Security Best Practices

### Lock Down Access

```json5
{
  channels: {
    whatsapp: {
      dmPolicy: "allowlist",        // only approved contacts
      allowFrom: ["+1234567890"],
    },
  },
  tools: {
    elevated: {
      enabled: true,
      allowFrom: {
        whatsapp: ["+1234567890"],  // only you can run elevated commands
      },
    },
  },
}
```

### Use Sandboxing for Untrusted Work

```json5
{
  agents: {
    defaults: {
      sandbox: {
        mode: "non-main",  // sandbox sub-agents, keep main session on host
      },
    },
  },
}
```

### Environment Variables — Keep Secrets Out of Config

```json5
{
  env: {
    OPENAI_API_KEY: "sk-...",
    vars: {
      CUSTOM_KEY: "value",
    },
  },
}
```

Or better — use `~/.openclaw/.env`:
```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

## Performance Tips

### Session Resets

Prevent infinite context growth:

```json5
{
  session: {
    reset: {
      mode: "daily",
      atHour: 4,          // reset at 4 AM
      idleMinutes: 120,   // also reset after 2h idle
    },
  },
}
```

### Keep Bootstrap Files Lean

Every workspace file (AGENTS.md, SOUL.md, USER.md, TOOLS.md, MEMORY.md, HEARTBEAT.md) is injected into every turn. Keep them concise:

- **MEMORY.md**: Under 3000 words. Prune regularly.
- **AGENTS.md**: Rules only, no essays.
- **HEARTBEAT.md**: 3-5 lines max.

Use `/context list` to see how much each file contributes to your context window.

### Git Backup Your Workspace

```bash
cd ~/.openclaw/workspace
git init
git add .
git commit -m "Initial workspace"
gh repo create openclaw-workspace --private --source . --push
```

Your workspace is your agent's brain. Back it up.

## Common Mistakes to Avoid

1. **No SOUL.md** → Generic, personality-less agent
2. **Huge MEMORY.md** → Token waste, slow responses, frequent compaction
3. **No fallback models** → Agent dies when a provider has issues
4. **Open DM policy** → Anyone can talk to your agent
5. **No session resets** → Context grows forever, quality degrades
6. **Installing skills without reading them** → Potential security risk
7. **Heartbeat too frequent** → Unnecessary API costs
8. **Secrets in workspace files** → Risk of exposure via git or context

## Next Steps

- **Explore skills**: `clawhub search "<what you need>"`
- **Read the docs**: https://docs.openclaw.ai
- **Join the community**: https://discord.com/invite/clawd
- **Find more skills**: https://clawhub.com
- **This skill**: https://clawhub.md

---

*Built with care by clawhub.md — making every .md count.*
