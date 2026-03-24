# TODOS

## Deferred from CEO Review (2026-03-24)

- **Stars / community reactions** — GitHub-style reactions on skill pages. Needs user accounts. Build after OAuth claim page.
- **Author OAuth claim page** — GitHub OAuth login; author can manage their skill list, see install counts. Build once clawhub.md has organic traffic.
- **Self-serve bundle creation UI** — No user-facing bundle creation at launch; curator creates bundles manually via YAML in `/bundles/`. Build after public traction.
- **Enterprise private org** ($99/team/month) — `clawhub.md/org/name` private skill registry. Target Month 6+ if public product shows traction.
- **Analytics dashboard** — install counts per skill, visible to authors. Depends on: Author OAuth claim page.

## Deferred from Eng Review (2026-03-24)

- **Webhook-based cache invalidation** — GitHub webhook → immediate KV cache bust when skill file is pushed. Current fallback: `?refresh=1`. Effort: M (human: ~2 days / CC: ~30 min). Start: add a `/webhooks/github` Pages Function that validates the HMAC signature and deletes the KV key for the changed file path.

- **Install click analytics** — Track copy-button clicks as a proxy for installs. More valuable than page views for understanding what resonates. Effort: S (human: ~4 hrs / CC: ~15 min). Options: Cloudflare Analytics Engine (free, no third-party), or a simple KV counter per skill slug. Build once the core renderer ships.

- **GitHub App token rotation automation** — Annual rotation is currently manual. Document rotation procedure in a runbook. Optionally: GitHub Actions scheduled workflow that creates a reminder issue 30 days before expiry. Effort: S (human: ~2 hrs / CC: ~10 min).
