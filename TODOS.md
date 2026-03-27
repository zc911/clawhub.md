# TODOS

## Deferred from Eng Review (2026-03-25)

- **bundles ↔ guide migration path** — The discriminated union (RegularBundle | ScenarioBundle) assumes these routes are disjoint forever. When content grows, a bundle may need to appear in both /bundles (power-user browse) and /guide (newcomer scenario). Current type system blocks this — a bundle can't be both. **Context:** Evaluate adding a `featuredInGuide` optional field to RegularBundle, or dropping the union in favor of optional fields at Phase 2. Start: bundles.ts type redesign. Effort: XS (CC: ~5min). Priority: P3. Depends on: scenario count >4.

- **'What is OpenClaw?' default state** — Currently planned as collapsed by default. The outside voice argues newcomers (primary audience) shouldn't have to click to see the answer to their primary question. **Context:** Flip to `<details open>` (expanded by default). 1-line change but warrants design review to assess visual weight. Run /plan-design-review before deciding. Effort: XS. Priority: P2.

- **Homepage rollback procedure** — No explicit rollback stated for the homepage UX pivot. If bounce rate increases post-launch, recovery is: `git revert 6104f85` (redesign commit) + redeploy via Cloudflare Pages (10 min). **Context:** Establish bounce rate baseline in Week 1 via Cloudflare Analytics. If bounce rate > 70% at Week 2, trigger rollback review. Priority: P2.

## Deferred from CEO Review (2026-03-24)

- **Stars / community reactions** — GitHub-style reactions on skill pages. Needs user accounts. Build after OAuth claim page.
- **Author OAuth claim page** — GitHub OAuth login; author can manage their skill list, see install counts. Build once clawhub.md has organic traffic.
- **Self-serve bundle creation UI** — No user-facing bundle creation at launch; curator creates bundles manually via YAML in `/bundles/`. Build after public traction.
- **Enterprise private org** ($99/team/month) — `clawhub.md/org/name` private skill registry. Target Month 6+ if public product shows traction.
- **Analytics dashboard** — install counts per skill, visible to authors. Depends on: Author OAuth claim page.

## Critical: From CEO Review (2026-03-24) — Fix Before Next Traffic

- **Unhandled exceptions in SSR pages** — `kv.get()`, `JSON.parse()`, `unified().process()`, and `fetchSkill()` can throw; errors propagate unrescued → 500 in production with no graceful fallback. Wrap each in try/catch, return error page. Effort: S (CC: ~20 min). Fix immediately.

- **XSS risk in /r/ renderer** — Markdown from arbitrary GitHub repos is rendered via `rehype-raw` with no sanitization. A malicious skill file could inject `<script>` tags. Add `rehype-sanitize` to the unified pipeline. Effort: S (CC: ~10 min). Fix before promoting /r/ route.

- ~~**No CDN caching on SSR responses**~~ ✅ Fixed — `Cache-Control: s-maxage=3600, stale-while-revalidate=86400` added to `/r/[...path].astro`.

- ~~**Structured error logging**~~ ✅ Fixed — `console.error()` added to `fetchSkill.ts` for KV get/put failures and GitHub fetch errors.

- ~~**prepare-pages.mjs fragility**~~ ✅ Fixed — try/catch + `process.exit(1)` added.

- **GITHUB_TOKEN setup** — Without a token, GitHub API rate limit is 60 req/hr. Document the setup runbook in README. Effort: XS (documentation only).

## Phase 2 Accepted Scope (from CEO Review 2026-03-24)

- **sitemap.xml** — Add `@astrojs/sitemap` integration. Free SEO signal. 15 min. Submit to Google Search Console.

- **Open Graph meta tags** — Add OG tags on skill pages: `og:title`, `og:description`, `og:url`. Twitter/Slack unfurl for sharing. Effort: S.

- ~~**?refresh=1 UI hint**~~ ✅ Done — stale banner in `SkillRenderer.astro` already shows `?refresh=1` hint.

## Deferred from CEO Review (2026-03-27)

- **Cache-Control TTL for agent `.md` files** — `/expert/[slug].md` currently returns `Cache-Control: public, max-age=3600`. Agents execute these files once — the 1h TTL is optimized for repeat page visitors, not agent consumers. Reduce to `max-age=60` or `no-store` for the `.md` endpoint. **Context:** `src/pages/expert/[slug].md.ts` line 18. Effort: XS (CC: ~5 min). Priority: P3.

- **Rename `bundles.ts` → `experts.ts`** — The concept was renamed from Bundles to Experts but the primary data file is still `bundles.ts`. New developers get a broken mental model on their first file open. **Context:** Rename `src/data/bundles.ts`, update all imports across `src/pages/`. Run `grep -r "from '@/data/bundles'"` to find all callers. Effort: S (CC: ~10 min). Priority: P3.

- **Document Expert lineup selection rationale** — No documented rationale for why these 6 Experts were chosen. Without it, there is no basis for prioritizing what to add/remove next. **Context:** Add a comment block at the top of `src/data/bundles.ts` explaining the selection criteria. Effort: XS. Priority: P4.

## P1: From autoplan Review (2026-03-26)

- **fetchSkill.ts: 0% test coverage** — The core caching/fetching logic has no tests. Critical gap: any refactor of KV cache logic, branch fallback (main→master), or stale-serve behavior can silently regress with no test catching it. **Context:** Write `src/lib/fetchSkill.test.ts` covering 8 paths: fresh cache hit, stale+fresh, stale+error fallback, not_found, branch fallback, forceRefresh, KV write-through, concurrent. Use Vitest with a mock `KVStore`. Effort: S (human: ~3h / CC: ~30 min). Priority: P1. Start: `src/lib/fetchSkill.test.ts`.

- **Thundering herd on /r/ cold cache** — Multiple concurrent requests for a cold-cache `/r/` URL each trigger their own GitHub API call with no deduplication. At 60 unauthenticated req/hr, 2-3 simultaneous first-visitors can burn the rate limit. **Context:** Add a `Map<string, Promise<GitHubResult>>` in `fetchFromGitHub` to deduplicate in-flight fetches by URL. Monitor: if Cloudflare Analytics shows rate-limit 429s in error logs, prioritize immediately. Effort: S (CC: ~20 min). Priority: P2 (revisit at meaningful traffic).

## Deferred from Eng Review (2026-03-24)

- **Webhook-based cache invalidation** — GitHub webhook → immediate KV cache bust when skill file is pushed. Current fallback: `?refresh=1`. Effort: M (human: ~2 days / CC: ~30 min). Start: add a `/webhooks/github` Pages Function that validates the HMAC signature and deletes the KV key for the changed file path.

- **Install click analytics** — Track copy-button clicks as a proxy for installs. More valuable than page views for understanding what resonates. Effort: S (human: ~4 hrs / CC: ~15 min). Options: Cloudflare Analytics Engine (free, no third-party), or a simple KV counter per skill slug. Build once the core renderer ships.

- **GitHub App token rotation automation** — Annual rotation is currently manual. Document rotation procedure in a runbook. Optionally: GitHub Actions scheduled workflow that creates a reminder issue 30 days before expiry. Effort: S (human: ~2 hrs / CC: ~10 min).
