# Changelog

All notable changes to clawhub.md are documented here.

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

## [1.0.0] - 2026-03-24

### Added
- Initial release: curated SKILL.md registry for OpenClaw and Claude Code
- Browse all skills at `/browse`
- Individual skill pages at `/[author]/[slug]`
- Live skill renderer at `/r/[github-path]`
- Bundle pages at `/bundles` and `/bundles/[slug]`
- OpenClaw-aligned visual identity: Bricolage Grotesque + Manrope + IBM Plex Mono, warm dark palette
