# Sponsorship Monetization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a text sponsor slot to the homepage and Browse page, plus a `/sponsor` info page and nav link — zero new dependencies, under 30 minutes total.

**Architecture:** Static config file (`src/data/sponsor.ts`) drives a reusable `SponsorSlot.astro` component that renders conditionally. When `currentSponsor` is `null`, the slot is fully absent from the page. Activating a sponsor = change one file, push.

**Tech Stack:** Astro (existing), TypeScript (existing), Vitest (existing)

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/data/sponsor.ts` | Sponsor type + `currentSponsor` config |
| Create | `src/data/sponsor.test.ts` | Smoke test for module exports |
| Create | `src/components/SponsorSlot.astro` | Reusable sponsor slot UI |
| Modify | `src/pages/index.astro` | Import + render `<SponsorSlot>` |
| Modify | `src/pages/browse.astro` | Import + render `<SponsorSlot>` |
| Create | `src/pages/sponsor.astro` | `/sponsor` info page |
| Modify | `src/layouts/Base.astro` | Add `Sponsor` nav link |

---

## Task 1: Create sponsor data module

**Files:**
- Create: `src/data/sponsor.ts`
- Create: `src/data/sponsor.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/data/sponsor.test.ts
import { describe, it, expect } from 'vitest';
import { currentSponsor, type Sponsor } from './sponsor';

describe('sponsor config', () => {
  it('exports currentSponsor as null by default', () => {
    expect(currentSponsor).toBeNull();
  });

  it('accepts a valid Sponsor object', () => {
    const sponsor: Sponsor = {
      name: 'Linear',
      tagline: 'issue tracking built for fast-moving teams',
      url: 'https://linear.app/for-developers',
      active: true,
    };
    expect(sponsor.name).toBe('Linear');
    expect(sponsor.active).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /Users/chenzhen48/Workspace/clawhub.md && npm test -- --reporter=verbose src/data/sponsor.test.ts
```

Expected: FAIL — `Cannot find module './sponsor'`

- [ ] **Step 3: Create `src/data/sponsor.ts`**

```ts
export type Sponsor = {
  name: string;
  tagline: string;
  url: string;
  active: boolean;
};

export const currentSponsor: Sponsor | null = null;
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd /Users/chenzhen48/Workspace/clawhub.md && npm test -- --reporter=verbose src/data/sponsor.test.ts
```

Expected: PASS — 2 tests

- [ ] **Step 5: Commit**

```bash
git add src/data/sponsor.ts src/data/sponsor.test.ts
git commit -m "feat: add sponsor data module with null default"
```

---

## Task 2: Create SponsorSlot component

**Files:**
- Create: `src/components/SponsorSlot.astro`

- [ ] **Step 1: Create the component**

```astro
---
// src/components/SponsorSlot.astro
import type { Sponsor } from '@/data/sponsor';

interface Props {
  sponsor: Sponsor | null;
}

const { sponsor } = Astro.props;
const show = sponsor !== null && sponsor.active;
const displayUrl = show ? sponsor!.url.replace(/^https?:\/\//, '') : '';
---

{show && (
  <div class="sponsor-slot">
    <span class="sponsor-label">SPONSOR</span>
    <p class="sponsor-line">{sponsor!.name} — {sponsor!.tagline}</p>
    <a
      href={sponsor!.url}
      class="sponsor-link"
      target="_blank"
      rel="noopener sponsored"
    >{displayUrl} ↗</a>
  </div>
)}

<style>
.sponsor-slot {
  padding: 20px 0;
}

.sponsor-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.sponsor-line {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0 0 6px 0;
  line-height: 1.5;
}

.sponsor-link {
  font-size: 13px;
  color: var(--accent);
  text-decoration: none;
}

.sponsor-link:hover {
  text-decoration: underline;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SponsorSlot.astro
git commit -m "feat: add SponsorSlot component"
```

---

## Task 3: Add sponsor slot to homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add import at top of frontmatter block**

In `src/pages/index.astro`, find the existing imports (lines 1–6):

```astro
---
import Base from '@/layouts/Base.astro';
import InstallBox from '@/components/InstallBox.astro';
import { loadExperts, findExpert, t } from '@/lib/loadExperts';
import { sotw } from '@/data/sotw';
```

Add two lines — import the component and config:

```astro
---
import Base from '@/layouts/Base.astro';
import InstallBox from '@/components/InstallBox.astro';
import { loadExperts, findExpert, t } from '@/lib/loadExperts';
import { sotw } from '@/data/sotw';
import SponsorSlot from '@/components/SponsorSlot.astro';
import { currentSponsor } from '@/data/sponsor';
```

- [ ] **Step 2: Insert `<SponsorSlot>` between featured section and expert grid**

Find this block in `src/pages/index.astro` (around line 84):

```astro
  <hr />

  <!-- Expert grid -->
```

Replace with:

```astro
  <hr />

  <SponsorSlot sponsor={currentSponsor} />

  {currentSponsor?.active && <hr />}

  <!-- Expert grid -->
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/chenzhen48/Workspace/clawhub.md && npm run dev &
sleep 5 && curl -s http://localhost:4321 | grep -i "sponsor" || echo "No sponsor rendered (expected — currentSponsor is null)"
kill %1
```

Expected: `No sponsor rendered (expected — currentSponsor is null)`

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add SponsorSlot to homepage"
```

---

## Task 4: Add sponsor slot to Browse page

**Files:**
- Modify: `src/pages/browse.astro`

- [ ] **Step 1: Add imports at top of frontmatter block**

In `src/pages/browse.astro`, find:

```astro
---
import Base from '@/layouts/Base.astro';
import { skills } from '@/data/skills';
```

Replace with:

```astro
---
import Base from '@/layouts/Base.astro';
import { skills } from '@/data/skills';
import SponsorSlot from '@/components/SponsorSlot.astro';
import { currentSponsor } from '@/data/sponsor';
```

- [ ] **Step 2: Insert `<SponsorSlot>` before namespace sections**

Find this block in `src/pages/browse.astro` (around line 40):

```astro
  {grouped.map(ns => ns.skills.length > 0 && (
```

Insert before it:

```astro
  {currentSponsor?.active && <hr />}

  <SponsorSlot sponsor={currentSponsor} />

  {currentSponsor?.active && <hr />}

  {grouped.map(ns => ns.skills.length > 0 && (
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/browse.astro
git commit -m "feat: add SponsorSlot to Browse page"
```

---

## Task 5: Create /sponsor page

**Files:**
- Create: `src/pages/sponsor.astro`

- [ ] **Step 1: Create the page**

```astro
---
// src/pages/sponsor.astro
import Base from '@/layouts/Base.astro';
---

<Base
  title="Sponsor"
  description="Reach developers building with AI agents. One text sponsor slot on clawhub.md."
>
  <h1 style="margin-bottom: 10px;">Sponsor clawhub.md</h1>
  <p style="color: var(--text-secondary); font-size: 15px; margin-bottom: 48px;">
    clawhub.md reaches developers who are actively building with AI agents.<br />
    One sponsor slot per week — text only, no tracking pixels.
  </p>

  <hr />

  <section style="margin-bottom: 40px;">
    <p class="section-label">WHAT YOU GET</p>
    <ul class="sponsor-list">
      <li>Homepage + Browse page text placement</li>
      <li>One company name, one line of copy, one link</li>
      <li>Your slot is the only ad on the page</li>
    </ul>
  </section>

  <section style="margin-bottom: 40px;">
    <p class="section-label">TERMS</p>
    <ul class="sponsor-list">
      <li>Minimum 2-week commitment</li>
      <li>Text only — no images, no scripts, no tracking pixels</li>
      <li>We reserve the right to decline any sponsor</li>
    </ul>
  </section>

  <hr />

  <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: 8px;">
    Interested? Email us and we'll send details.
  </p>
  <a
    href="mailto:sponsor@clawhub.md"
    style="font-size: 15px; color: var(--accent);"
  >sponsor@clawhub.md →</a>
</Base>

<style>
.section-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 14px;
}

.sponsor-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sponsor-list li {
  font-size: 14px;
  color: var(--text-secondary);
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.sponsor-list li::before {
  content: '›';
  color: var(--accent);
  flex-shrink: 0;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/sponsor.astro
git commit -m "feat: add /sponsor info page"
```

---

## Task 6: Add Sponsor link to nav

**Files:**
- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: Add link to nav**

In `src/layouts/Base.astro`, find the nav-links block (around line 55):

```astro
      <div class="nav-links">
        <a href={lang === 'zh' ? '/zh/experts' : '/experts'}>{lang === 'zh' ? 'Experts' : 'Experts'}</a>
        <a href="/browse">{lang === 'zh' ? '技能库' : 'Browse'}</a>
        <a href="/r/">{lang === 'zh' ? '任意技能' : 'Any skill'}</a>
        <a href="https://clawhub.ai" target="_blank" rel="noopener" class="nav-external">clawhub.ai ↗</a>
```

Add the `Sponsor` link after `Any skill`:

```astro
      <div class="nav-links">
        <a href={lang === 'zh' ? '/zh/experts' : '/experts'}>{lang === 'zh' ? 'Experts' : 'Experts'}</a>
        <a href="/browse">{lang === 'zh' ? '技能库' : 'Browse'}</a>
        <a href="/r/">{lang === 'zh' ? '任意技能' : 'Any skill'}</a>
        <a href="/sponsor" class="nav-sponsor">Sponsor</a>
        <a href="https://clawhub.ai" target="_blank" rel="noopener" class="nav-external">clawhub.ai ↗</a>
```

- [ ] **Step 2: Add `.nav-sponsor` style to `Base.astro` `<style>` block**

In `src/layouts/Base.astro`, find the `<style>` block at the bottom and add:

```css
nav.site-nav .nav-links a.nav-sponsor {
  color: var(--text-muted);
  font-size: 13px;
}
nav.site-nav .nav-links a.nav-sponsor:hover { color: var(--accent); }
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: add Sponsor nav link"
```

---

## Task 7: Full build verification

- [ ] **Step 1: Run tests**

```bash
cd /Users/chenzhen48/Workspace/clawhub.md && npm test
```

Expected: all existing tests pass + 2 new sponsor tests pass

- [ ] **Step 2: Run full build**

```bash
cd /Users/chenzhen48/Workspace/clawhub.md && npm run build
```

Expected: build succeeds with no errors

- [ ] **Step 3: Smoke-test key pages**

```bash
cd /Users/chenzhen48/Workspace/clawhub.md && npm run preview &
sleep 3
curl -s http://localhost:4321 | grep -c "sponsor" && echo "homepage ok"
curl -s http://localhost:4321/browse | grep -c "sponsor" && echo "browse ok"
curl -s http://localhost:4321/sponsor | grep -c "sponsor@clawhub.md" && echo "sponsor page ok"
kill %1
```

Expected: each command prints a count ≥ 1 followed by "ok"

- [ ] **Step 4: Final commit if needed**

```bash
git status
# If clean, nothing to do. If any stray changes, stage and commit.
```

---

## Activating a Sponsor (operator runbook)

When a sponsor signs, edit one line in `src/data/sponsor.ts`:

```ts
export const currentSponsor: Sponsor | null = {
  name: 'Linear',
  tagline: 'issue tracking built for fast-moving teams',
  url: 'https://linear.app/for-developers',
  active: true,
};
```

Push to `master`. Cloudflare Pages redeploys in ~30 seconds. To deactivate, set `active: false` or restore `null`.
