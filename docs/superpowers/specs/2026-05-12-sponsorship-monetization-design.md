# Sponsorship Monetization Design

**Date:** 2026-05-12  
**Goal:** Cover server costs via direct text sponsorship. No auth, no payment infrastructure, minimal code changes.

---

## Context

clawhub.md has growing traffic with unclear source breakdown. Monetization goal is to cover server costs first and validate willingness to pay before pursuing scale. Core experience must remain unchanged; only a new page/module is added.

---

## What We're Building

A single weekly/monthly text sponsor slot on the homepage and Browse page, plus a `/sponsor` page for self-serve discovery. No display ads, no ad networks, no tracking pixels.

---

## Part 1: Sponsor Slot UI

Appears on `/` (homepage) and `/browse`, positioned before the skill list, separated by dividers.

```
─────────────────────────────────────────────────────────
SPONSOR

Linear — issue tracking built for fast-moving teams.
linear.app/for-developers ↗

─────────────────────────────────────────────────────────
```

**Visual rules (strictly per DESIGN.md):**
- `SPONSOR` label: 11px, `#8b949e`, small-caps style — matches `INSTALL` label treatment
- Company name + tagline: 13px, `#8b949e` — matches skill list description color
- URL: separate line, `#58a6ff` (accent), hover underline
- No border, no background, no image, no logo, no animation
- Separated by existing `--border` divider lines only

**Empty state:** When `currentSponsor` is `null`, the entire block is absent. No "Become a sponsor" placeholder. A clean page is a better pitch than a recruitment banner.

---

## Part 2: `/sponsor` Page

Static page explaining terms and directing interested parties to email. No form system needed at this stage.

**Content structure:**
```
Sponsor clawhub.md

clawhub.md reaches developers who are actively building
with AI agents. One sponsor slot per week.

WHAT YOU GET

  Homepage + Browse page text placement
  One company name, one line of copy, one link
  ~[X] weekly developers, [Y] agent fetches/day

TERMS

  $[price]/week · minimum 2 weeks
  Text-only · no images, no tracking pixels
  We reserve the right to decline any sponsor

PAST SPONSORS

  (empty until first sponsor; add logos/names after)

→ sponsor@clawhub.md
```

**Pricing:** Leave blank until first traffic data is available. First target: low enough to close the first deal fast (validate demand), then raise. Suggested starting range: ¥1,500–3,000/week.

**Past Sponsors section:** Hidden until first sponsor completes. Social proof beats recruitment copy.

**Navigation:** Add a `sponsor` text link at the far right of the nav, `#8b949e` color, subordinate to existing nav items.

---

## Part 3: Data Structure & Implementation

Sponsor state managed as a static TypeScript config file. No database, no CMS, no API.

**`src/data/sponsor.ts`**
```ts
export type Sponsor = {
  name: string;     // "Linear"
  tagline: string;  // "issue tracking built for fast-moving teams"
  url: string;      // "https://linear.app/for-developers"
  active: boolean;
};

export const currentSponsor: Sponsor | null = null;
```

To activate a sponsor: set `currentSponsor` to a `Sponsor` object, push to main, Cloudflare Pages redeploys in ~30 seconds.

**Files touched:**
| File | Change |
|------|--------|
| `src/data/sponsor.ts` | New file — sponsor config |
| `src/pages/index.astro` | Import `currentSponsor`, conditionally render slot |
| `src/pages/browse/index.astro` | Same as index |
| `src/pages/sponsor.astro` | New page |
| `src/components/nav.astro` (or equivalent) | Add `sponsor` nav link |

**Effort:** XS — ~30 minutes. Zero new dependencies.

---

## Out of Scope

- Payment processing (handle via direct invoice or Stripe Link outside the codebase)
- Analytics on sponsor clicks (add later if sponsors request it)
- Expert-level sponsorship (evaluate after first direct sponsor closes)
- Any form of display advertising

---

## Success Criteria

- First sponsor signed within 4 weeks of launch
- Revenue covers Cloudflare Pages + KV costs (est. ¥500–800/month)
- Zero negative feedback from developer audience about aesthetics
