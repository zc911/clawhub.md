# TODOS

## Deferred from CEO Review (2026-03-24)

- **Stars / community reactions** — GitHub-style reactions on skill pages. Needs user accounts. Build after OAuth claim page.
- **Author OAuth claim page** — GitHub OAuth login; author can manage their skill list, see install counts. Build once clawhub.md has organic traffic.
- **Self-serve bundle creation UI** — No user-facing bundle creation at launch; curator creates bundles manually via YAML in `/bundles/`. Build after public traction.
- **Enterprise private org** ($99/team/month) — `clawhub.md/org/name` private skill registry. Target Month 6+ if public product shows traction.
- **Analytics dashboard** — install counts per skill, visible to authors. Depends on: Author OAuth claim page.

## Critical: From CEO Review (2026-03-24) — Fix Before Next Traffic

- **Unhandled exceptions in SSR pages** — `kv.get()`, `JSON.parse()`, `unified().process()`, and `fetchSkill()` can throw; errors propagate unrescued → 500 in production with no graceful fallback. Wrap each in try/catch, return error page. Effort: S (CC: ~20 min). Fix immediately.

- **XSS risk in /r/ renderer** — Markdown from arbitrary GitHub repos is rendered via `rehype-raw` with no sanitization. A malicious skill file could inject `<script>` tags. Add `rehype-sanitize` to the unified pipeline. Effort: S (CC: ~10 min). Fix before promoting /r/ route.

- **No CDN caching on SSR responses** — Every Worker invocation hits KV (fast, but burns edge compute). Add `Cache-Control: s-maxage=3600, stale-while-revalidate=86400` header on skill page responses. Effort: S (CC: ~10 min).

- **Structured error logging** — Zero visibility if pages 500 in production. Add `console.error()` calls in `fetchSkill.ts` on KV errors and render errors. Effort: XS (CC: ~5 min).

- **prepare-pages.mjs fragility** — No error handling; silent failure leaves broken `dist/`. Add try/catch + `process.exit(1)` on failure. Effort: XS (CC: ~5 min).

- **GITHUB_TOKEN setup** — Without a token, GitHub API rate limit is 60 req/hr. Document the setup runbook in README. Effort: XS (documentation only).

## Phase 2 Accepted Scope (from CEO Review 2026-03-24)

- **sitemap.xml** — Add `@astrojs/sitemap` integration. Free SEO signal. 15 min. Submit to Google Search Console.

- **Open Graph meta tags** — Add OG tags on skill pages: `og:title`, `og:description`, `og:url`. Twitter/Slack unfurl for sharing. Effort: S.

- **?refresh=1 UI hint** — Stale cache banner (already in DESIGN.md) should show "Add ?refresh=1 to force a fresh fetch". Effort: XS.

## Deferred from Eng Review (2026-03-24)

- **Webhook-based cache invalidation** — GitHub webhook → immediate KV cache bust when skill file is pushed. Current fallback: `?refresh=1`. Effort: M (human: ~2 days / CC: ~30 min). Start: add a `/webhooks/github` Pages Function that validates the HMAC signature and deletes the KV key for the changed file path.

- **Install click analytics** — Track copy-button clicks as a proxy for installs. More valuable than page views for understanding what resonates. Effort: S (human: ~4 hrs / CC: ~15 min). Options: Cloudflare Analytics Engine (free, no third-party), or a simple KV counter per skill slug. Build once the core renderer ships.

- **GitHub App token rotation automation** — Annual rotation is currently manual. Document rotation procedure in a runbook. Optionally: GitHub Actions scheduled workflow that creates a reminder issue 30 days before expiry. Effort: S (human: ~2 hrs / CC: ~10 min).
