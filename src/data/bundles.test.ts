import { describe, it, expect } from 'vitest';
import {
  experts,
  getExpert,
  getExperts,
  t,
  type Expert,
  type L,
} from './bundles';

const sampleExpert: Expert = {
  slug: 'test-expert',
  name: { en: 'Test Expert', zh: '测试助理' },
  description: { en: 'A test expert', zh: '一个测试助理' },
  goal: { en: 'Test goal', zh: '测试目标' },
  outcome: { en: 'Test outcome', zh: '测试结果' },
  skillsWithReason: [{ slug: 'openclaw/gog', reason: { en: 'Because', zh: '因为' }, order: 1 }],
  curator: 'clawhub',
  created: '2026-03-26',
};

describe('t() helper', () => {
  const field: L = { en: 'Hello', zh: '你好' };

  it('returns English for locale "en"', () => {
    expect(t(field, 'en')).toBe('Hello');
  });

  it('returns Chinese for locale "zh"', () => {
    expect(t(field, 'zh')).toBe('你好');
  });

  it('defaults to English for unknown locale', () => {
    expect(t(field, 'fr')).toBe('Hello');
  });
});

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
  it('has at least 3 experts', () => {
    expect(getExperts().length).toBeGreaterThanOrEqual(3);
  });

  it('includes Chinese-focused experts', () => {
    const slugs = getExperts().map(e => e.slug);
    expect(slugs).toContain('feishu-expert');
    expect(slugs).toContain('dingtalk-expert');
    expect(slugs).toContain('wecom-expert');
    expect(slugs).toContain('dev-expert-cn');
  });

  it('has meeting-expert, comms-expert, research-expert slugs', () => {
    const slugs = getExperts().map(e => e.slug);
    expect(slugs).toContain('meeting-expert');
    expect(slugs).toContain('comms-expert');
    expect(slugs).toContain('research-expert');
  });

  it('has dev-expert, daily-briefing, and creator-expert slugs', () => {
    const slugs = getExperts().map(e => e.slug);
    expect(slugs).toContain('dev-expert');
    expect(slugs).toContain('daily-briefing');
    expect(slugs).toContain('creator-expert');
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

  it('all expert name fields have both en and zh', () => {
    getExperts().forEach(e => {
      expect(e.name.en).toBeTruthy();
      expect(e.name.zh).toBeTruthy();
    });
  });

  it('all expert descriptions have both en and zh', () => {
    getExperts().forEach(e => {
      expect(e.description.en).toBeTruthy();
      expect(e.description.zh).toBeTruthy();
    });
  });

  it('all skill reasons have both en and zh', () => {
    getExperts().forEach(e => {
      e.skillsWithReason.forEach(s => {
        expect(s.reason.en).toBeTruthy();
        expect(s.reason.zh).toBeTruthy();
      });
    });
  });
});
