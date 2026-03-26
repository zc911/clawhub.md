import { describe, it, expect } from 'vitest';
import {
  experts,
  getExpert,
  getExperts,
  type Expert,
} from './bundles';

const sampleExpert: Expert = {
  slug: 'test-expert',
  name: 'Test Expert',
  description: 'A test expert',
  goal: 'Test goal',
  outcome: 'Test outcome',
  skillsWithReason: [{ slug: 'openclaw/gog', reason: 'Because', order: 1 }],
  curator: 'clawhub',
  created: '2026-03-26',
};

describe('getExpert', () => {
  it('returns the expert for a known slug', () => {
    const result = getExpert('meeting-expert');
    expect(result).toBeDefined();
    expect(result?.slug).toBe('meeting-expert');
  });

  it('returns undefined for a nonexistent slug', () => {
    expect(getExpert('nonexistent')).toBeUndefined();
  });

  it('returns undefined for old bundle slug', () => {
    expect(getExpert('starter')).toBeUndefined();
  });
});

describe('getExperts', () => {
  it('returns all experts', () => {
    const result = getExperts();
    expect(result.length).toBeGreaterThan(0);
  });

  it('does not include old code-review scenario', () => {
    const result = getExperts();
    expect(result.find(e => e.slug === 'code-review')).toBeUndefined();
  });
});

describe('experts data integrity', () => {
  it('has exactly 3 experts', () => {
    expect(getExperts().length).toBe(3);
  });

  it('has meeting-expert, comms-expert, research-expert slugs', () => {
    const slugs = getExperts().map(e => e.slug);
    expect(slugs).toContain('meeting-expert');
    expect(slugs).toContain('comms-expert');
    expect(slugs).toContain('research-expert');
  });

  it('all experts have at least 1 skill with reason', () => {
    getExperts().forEach(e => {
      expect(e.skillsWithReason.length).toBeGreaterThan(0);
    });
  });

  it('installAll is a valid clawhub install command when present', () => {
    getExperts().forEach(e => {
      if (e.installAll !== undefined) {
        expect(e.installAll).toMatch(/^clawhub install\s+\S+/);
      }
    });
  });

  it('Expert type accepts optional installAll and configSnippet fields', () => {
    const withInstallAll: Expert = {
      ...sampleExpert,
      installAll: 'clawhub install openclaw/gog openclaw/summarize',
    };
    expect(withInstallAll.installAll).toBe('clawhub install openclaw/gog openclaw/summarize');
    expect(withInstallAll.configSnippet).toBeUndefined();

    const withBoth: Expert = {
      ...sampleExpert,
      installAll: 'clawhub install openclaw/gog',
      configSnippet: '# Use gog\n/gog',
    };
    expect(withBoth.configSnippet).toBeDefined();
  });

  it('all experts are OpenClaw-focused (no gstack/* skills)', () => {
    getExperts().forEach(e => {
      e.skillsWithReason.forEach(s => {
        expect(s.slug).not.toMatch(/^gstack\//);
      });
    });
  });
});
