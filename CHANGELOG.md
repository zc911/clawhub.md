# Changelog

All notable changes to clawhub.md are documented here.

## [1.2.1] - 2026-03-27

### Changed
- **Expert page redesign**: removed manual Install / Configure / Use sections — Agentic Install is now the sole primary action
- **Markdown preview**: added collapsed `<details>` section on each Expert page that renders the full `.md` file content — for power users who want to inspect what the agent will execute
- **`InstallBox`**: added optional `label` prop (defaults to "Install") — Expert page uses "Say to your agent"
- **Shared utility**: extracted `generateExpertMarkdown()` into `src/utils/expertMarkdown.ts`, used by both the `.md` endpoint and the page renderer

## [1.2.0] - 2026-03-27

### Added
- **Agentic install** — each Expert now has a machine-readable `.md` file at `/expert/[slug].md`, designed for AI agents to read and execute. Users on any interface (OpenClaw UI, Telegram, Feishu) can simply say: *"Read https://clawhub.md/expert/meeting-expert.md and set me up"*
- **`setupSteps`** field on `Skill` — per-skill configuration instructions (OAuth flows, API keys, env vars) baked into the generated `.md` files
- **Agentic install callout** on every Expert page — prominent block showing the one-liner prompt to send to your agent
- **Expert page back-link** changed from "← Home" to "← Experts" for better navigation

## [1.1.1] - 2026-03-27

### Changed
- **Site slogan**: "Give your agent the right skills." → **"Let your agent handle it."** — lifestyle/aspiration framing over feature framing
- **Homepage order**: Featured Expert now appears first (above the grid), then "What are you trying to do?"
- **Top pick → Expert pick**: `sotw.ts` now references an Expert slug instead of a skill slug; homepage featured block shows the Expert goal, outcome, install command, and example prompts
- **Meta descriptions**: updated default and homepage description to match new slogan
- **Homepage footer links**: added "All experts →" alongside "Browse all skills →"

## [1.1.0] - 2026-03-27

### Added
- **Creator Expert** (`/expert/creator-expert`): content creation workflow — research with summarize, draft in Notion, publish to X and track engagement

### Changed
- **Top pick this week**: updated to `openclaw/github` — more relevant for the developer audience

## [1.0.9] - 2026-03-27

### Added
- **Dev Expert** (`/expert/dev-expert`): skill set for developers — GitHub ops (PRs, issues, CI) + AI coding agent delegation
- **Daily Briefing Expert** (`/expert/daily-briefing`): morning workflow — inbox highlights, calendar, weather, and quick summaries in one session
- **Tests**: updated integrity tests to cover new experts and allow `>= 3` count

## [1.0.8] - 2026-03-27

### Added
- **`/experts` listing page**: new page showing all experts with goal, description, and skill inventory — now navigable without going through the homepage
- **"Experts" nav link**: added to site nav and footer so experts are always reachable from any page

### Fixed
- **Browse page footer**: replaced stale "Bundles →" link with "Experts →"

## [1.0.7] - 2026-03-26

### Changed
- **Hero copy**: H1 updated from "OpenClaw skills, curated and ready." to "Give your agent the right skills." — more actionable, user-directed framing
- **Meta descriptions**: removed "Claude Code" references from default description and homepage description; now exclusively OpenClaw-focused
- **Navigation**: removed stale "Bundles" nav link; nav now shows Browse / Any skill / clawhub.ai only
- **Expert page**: "← Back" back-link clarified to "← Home"
- **CSS cleanup**: removed unused `.bundle-*`, `.guide-skill-*`, and `.day1-block` CSS classes (leftover from pre-Expert refactor)

## [1.0.6] - 2026-03-26

### Changed
- **Expert concept replaces Bundles + Guide**: dropped `RegularBundle` type and all 4 regular bundles; dropped `code-review` scenario (Claude Code workflow); renamed remaining scenarios to "Meeting Expert", "Comms Expert", "Research Expert"
- **New URL structure**: `/expert/[slug]` replaces `/guide/[slug]`; old URLs redirect 301
- **OpenClaw focus**: all experts use only `openclaw/*` skills — site now targets OpenClaw community exclusively
- **`ScenarioBundle` → `Expert`**: simplified to a single unified type; removed discriminated union, `isScenario()`, `getBundle()`, `getRegularBundles()`
- **Homepage**: removed Bundles link; "What are you trying to do?" section now links to `/expert/*`
- **Tests**: updated to `Expert` type and `getExpert()` / `getExperts()` functions; added OpenClaw-only integrity check

## [1.0.5] - 2026-03-26

### Changed
- **Guide page redesign**: `/guide/[slug]` pages now use a problem-first three-section layout — **Install** (one command), **Configure** (if needed), **Use** (all examples grouped by capability) — replacing the old tool-centric per-skill listing with individual install boxes

## [1.0.4] - 2026-03-26

### Fixed
- **`installAll` command format standardized**: all scenario bundles now use `clawhub install ...` (matching individual skill format) instead of `/install ...` — eliminates the two-format confusion on guide pages

## [1.0.3] - 2026-03-26

### Added
- **`meeting-prep` scenario**: "Run Better Meetings" — prep with calendar/email context, summarize docs before the call, save notes to Notion
- **`installAll` on all scenarios**: `stay-connected` and `research-and-notes` now have one-command install

### Changed
- **`code-review` scenario expanded to full dev lifecycle**: renamed "Review, QA & Ship", added `gstack/ship` as 3rd skill, updated `installAll` to include all three
- **`ship-and-deploy` scenario replaced** by `meeting-prep` — the dev lifecycle is now consolidated under `code-review`

## [1.0.2] - 2026-03-26

### Added
- **`installAll` field on ScenarioBundle**: single `/install` command to install all skills in a scenario bundle at once — shown as "Install everything at once" on `/guide/[slug]` pages
- **`configSnippet` field on ScenarioBundle**: optional CLAUDE.md snippet rendered at bottom of guide pages
- **Adaptive subtitle**: guide pages show "Or install N skills individually" when `installAll` is present, vs "Install N skills to get started" when absent
- **Tests**: 2 new tests covering `installAll` command format validation and optional field types on `ScenarioBundle`

## [1.0.1] - 2026-03-25

### Added
- **Onboarding Layer Pivot**: restructured homepage as a newcomer guide ("The OpenClaw Starter Guide") with a Day 1 section and scenario-based navigation
- **Scenario bundles**: new `ScenarioBundle` type with `goal` + `skillsWithReason` fields — accessible at `/guide/[slug]`
- **`/guide/[slug]` pages**: step-by-step scenario guides with numbered skills, reasons, and install boxes
- **Scenario grid on homepage**: "What are you trying to do?" cards linking to `/guide/code-review` and `/guide/ship-and-deploy`
- **Two curated scenarios**: Code Review & Quality, Ship & Deploy
- **Day 1 block**: hardcoded "install these skills first" section with `gstack/review`, `gstack/ship`, `gstack/qa`
- **CSS classes**: `.scenario-grid`, `.scenario-item`, `.guide-skill-list`, `.guide-skill-item`, `.day1-block`, `.empty-state` — all responsive with mobile breakpoint at 640px

### Changed
- `bundles.ts`: refactored to discriminated union `RegularBundle | ScenarioBundle`; `getBundle()` now excludes scenarios; new exports `getScenario()`, `getScenarios()`, `getRegularBundles()`
- `/bundles` and `/bundles/[slug]` now filtered to regular (non-scenario) bundles only
- Homepage section order: hero → Day 1 → scenario paths → OpenClaw explainer → SOTW → recent skills

### Fixed
- **InstallBox copy buttons**: replaced `id="copy-btn"` + `getElementById` with `querySelectorAll('.copy-btn')` so every copy button works on pages with multiple InstallBox instances (homepage has 4, guide pages have 2)

## [1.0.0] - 2026-03-24

### Added
- Initial release: curated SKILL.md registry for OpenClaw and Claude Code
- Browse all skills at `/browse`
- Individual skill pages at `/[author]/[slug]`
- Live skill renderer at `/r/[github-path]`
- Bundle pages at `/bundles` and `/bundles/[slug]`
- OpenClaw-aligned visual identity: Bricolage Grotesque + Manrope + IBM Plex Mono, warm dark palette
