import { describe, it, expect } from 'vitest';
import { extractSkillMeta } from './renderSkillMarkdown';

// Regression: ISSUE-003/004 — extractSkillMeta matched `# shell-comment` inside
// fenced code blocks as H1, causing wrong skill names on curated and /r/ pages.
// Found by /qa on 2026-03-24
// Report: .gstack/qa-reports/qa-report-clawhub-md-2026-03-24.md

describe('extractSkillMeta', () => {
  it('ignores # comments inside fenced code blocks (regression ISSUE-003/004)', () => {
    const md = `
\`\`\`bash
# zsh-compatible: use find instead of glob to avoid NOMATCH error
echo "hello"
\`\`\`

# Real Title

A real description line.
`;
    const { name, description } = extractSkillMeta(md);
    expect(name).toBe('Real Title');
    expect(description).toBe('A real description line.');
  });

  it('skips YAML frontmatter before scanning for H1', () => {
    const md = `---
name: qa
description: QA skill
---

# QA

Run tests and fix bugs.
`;
    const { name, description } = extractSkillMeta(md);
    expect(name).toBe('QA');
    expect(description).toBe('Run tests and fix bugs.');
  });

  it('returns empty strings when no H1 exists (gstack SKILL.md without H1)', () => {
    const md = `---
name: qa
---

## Usage

Some content without an H1.
`;
    const { name, description } = extractSkillMeta(md);
    expect(name).toBe('');
    expect(description).toBe('');
  });

  it('ignores # comments in ~~~ fenced blocks', () => {
    const md = `~~~bash
# not a title
~~~

# Actual Title

The description.
`;
    const { name, description } = extractSkillMeta(md);
    expect(name).toBe('Actual Title');
    expect(description).toBe('The description.');
  });

  it('does not pick up ## headings as H1', () => {
    const md = `## Section

# Real H1

Description here.
`;
    const { name, description } = extractSkillMeta(md);
    expect(name).toBe('Real H1');
    expect(description).toBe('Description here.');
  });

  it('skips empty lines and HTML comments between H1 and description', () => {
    const md = `# My Skill

<!-- badge -->

First real paragraph.
`;
    const { name, description } = extractSkillMeta(md);
    expect(name).toBe('My Skill');
    expect(description).toBe('First real paragraph.');
  });

  it('handles empty string gracefully', () => {
    const { name, description } = extractSkillMeta('');
    expect(name).toBe('');
    expect(description).toBe('');
  });

  it('handles multiple nested code blocks without losing track of state', () => {
    const md = `\`\`\`bash
# inside first block
\`\`\`

\`\`\`bash
# inside second block
\`\`\`

# Real Title

Real description.
`;
    const { name, description } = extractSkillMeta(md);
    expect(name).toBe('Real Title');
    expect(description).toBe('Real description.');
  });
});
