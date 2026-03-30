# Contributing to clawhub.md

clawhub.md is a curated registry of AgentSkills for Claude Code. Contributions are welcome — this document covers how to add a skill, propose an expert bundle, or improve the site.

---

## Adding a Skill to the Registry

### What qualifies

A skill is added to the registry when it meets all three criteria:

1. **Has a valid `SKILL.md`** — structured according to the [AgentSkills spec](https://github.com/anthropics/skills)
2. **Is publicly hosted** — the `SKILL.md` file is accessible via a public GitHub repo
3. **Works immediately or with documented setup** — a developer should be able to install and use the skill within 10 minutes

We prioritize skills that are actively maintained and have clear, concrete examples.

### How to submit

Open an issue using the **[Add a skill](.github/ISSUE_TEMPLATE/add-skill.md)** template. Include:

- Skill name and namespace (`author/slug`)
- GitHub repo and path to `SKILL.md`
- What the skill does (1-2 sentences)
- Setup requirements (auth, env vars, etc.)
- 2-3 example prompts

If the skill is approved, a maintainer will add it to `src/data/skills.ts` and it will appear on the Browse page.

---

## Proposing an Expert Bundle

An Expert is a curated set of skills for a specific role or use case. To propose one:

1. Open an issue using the **[Propose an expert](.github/ISSUE_TEMPLATE/propose-expert.md)** template
2. Describe the target persona (who uses this, what they do daily)
3. List the skills and explain why each one is included
4. Suggest 3-5 example prompts the user would say after installing

Expert bundles are added to `src/data/bundles.ts`. They must use skills already in the registry.

---

## Improving the Site

For bug fixes and improvements to the site itself:

1. Fork the repo and create a branch: `git checkout -b feat/your-change`
2. Make your changes
3. Run tests: `npm test`
4. Open a PR with a clear description of what changed and why

### Development setup

```bash
npm install
npm run dev      # http://localhost:4321
npm test         # run all tests
npm run build    # full production build
```

### Code conventions

- TypeScript throughout
- All user-facing strings in `src/data/` use bilingual `{ en: string; zh: string }` fields — add both languages
- No new dependencies without discussion
- Tests live alongside source files (`*.test.ts`)

---

## What we don't accept

- Skills that require paid APIs without a free tier or trial
- Skills with no examples or unclear use cases
- Duplicate skills that overlap heavily with an existing one
- Expert bundles that are just one skill renamed

---

## Questions?

Open a [Discussion](https://github.com/zc911/clawhub.md/discussions) or file an issue. We're a small team and respond within a few days.
