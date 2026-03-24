import { describe, it, expect } from 'vitest';
import { extractInstallCommand } from './extractInstallCommand';

// Regression: covers extractInstallCommand behavior
// Found by /qa on 2026-03-24
// Report: .gstack/qa-reports/qa-report-clawhub-md-2026-03-24.md

describe('extractInstallCommand', () => {
  it('extracts claude install command from a fenced code block', () => {
    const md = `
\`\`\`bash
claude install gstack/review
\`\`\`
`;
    expect(extractInstallCommand(md)).toBe('claude install gstack/review');
  });

  it('returns null when no claude install line exists', () => {
    const md = `
\`\`\`bash
echo "hello"
\`\`\`
`;
    expect(extractInstallCommand(md)).toBeNull();
  });

  it('strips leading shell prompt characters', () => {
    const md = `
\`\`\`bash
$ claude install gstack/qa
\`\`\`
`;
    expect(extractInstallCommand(md)).toBe('claude install gstack/qa');
  });

  it('strips % prompt character', () => {
    const md = `
\`\`\`zsh
% claude install gstack/ship
\`\`\`
`;
    expect(extractInstallCommand(md)).toBe('claude install gstack/ship');
  });

  it('strips > prompt character', () => {
    const md = `
\`\`\`
> claude install gstack/review
\`\`\`
`;
    expect(extractInstallCommand(md)).toBe('claude install gstack/review');
  });

  it('returns first matching block when multiple code blocks exist', () => {
    const md = `
\`\`\`bash
echo "setup first"
\`\`\`

\`\`\`bash
claude install gstack/qa
\`\`\`

\`\`\`bash
claude install gstack/review
\`\`\`
`;
    expect(extractInstallCommand(md)).toBe('claude install gstack/qa');
  });

  it('handles multiple install lines in one block', () => {
    const md = `
\`\`\`bash
claude install gstack/review
claude install gstack/qa
\`\`\`
`;
    expect(extractInstallCommand(md)).toBe('claude install gstack/review\nclaude install gstack/qa');
  });

  it('returns null for empty string', () => {
    expect(extractInstallCommand('')).toBeNull();
  });

  it('ignores claude install lines outside code blocks', () => {
    const md = `claude install gstack/review

Some prose with claude install gstack/qa mentioned.
`;
    expect(extractInstallCommand(md)).toBeNull();
  });
});
