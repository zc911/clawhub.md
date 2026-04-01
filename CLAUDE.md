# gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

Available gstack skills:
- `/office-hours` - Office hours session
- `/plan-ceo-review` - CEO review planning
- `/plan-eng-review` - Engineering review planning
- `/plan-design-review` - Design review planning
- `/design-consultation` - Design consultation
- `/review` - Code review
- `/ship` - Ship a change
- `/land-and-deploy` - Land and deploy
- `/canary` - Canary deployment
- `/benchmark` - Benchmarking
- `/browse` - Web browsing (use this for ALL web browsing)
- `/qa` - QA testing
- `/qa-only` - QA only
- `/design-review` - Design review
- `/setup-browser-cookies` - Setup browser cookies
- `/setup-deploy` - Setup deployment
- `/retro` - Retrospective
- `/investigate` - Investigation
- `/document-release` - Document a release
- `/codex` - Codex
- `/cso` - CSO
- `/careful` - Careful mode
- `/freeze` - Freeze
- `/guard` - Guard
- `/unfreeze` - Unfreeze
- `/gstack-upgrade` - Upgrade gstack

If gstack skills aren't working, run `cd .claude/skills/gstack && ./setup` to build the binary and register skills.

# Product Positioning

**clawhub.md** 卖的是**专家（Expert）**——Dev Expert、Founder Expert、Creator Expert 等。技能（skill）只是专家能力的载体，用户感知到的是"我有了一个专家"。这是核心叙事单位，不要用"skill 注册表"来描述产品。

**Core tagline:** "Let your agent handle it."

**核心机制：** 用户对 agent 说一句话，如 `Read https://clawhub.md/expert/dev-expert.md and set me up as Dev Expert`，agent 自动读取、安装技能、完成配置。域名 `.md` 后缀本身是产品机制的一部分——每个 Expert 有机器可读的 `.md` 端点。

**目标用户：** 开发者和知识工作者（代码原生审美，深色模式）。包含专门的中国市场版本（飞书/钉钉/企微 Expert）。

**产品结构：**
- `/experts` — 按角色打包的技能集（Expert bundles）
- `/browse` — 按 namespace 组织的技能注册表（openclaw / anthropics / gstack）
- `/expert/[slug].md` — 机器可读端点，供 agent 直接 fetch

**设计反模式（不要做）：** 紫色渐变、Vercel 风格 SaaS 营销页、通用卡片网格。
