import { describe, it, expect } from 'vitest';
import { generateExpertMarkdown } from './expertMarkdown';
import type { Expert } from '@/data/bundles';

const sampleExpert: Expert = {
  slug: 'test-expert',
  name: { en: 'Test Expert', zh: '测试助理' },
  description: { en: 'A test expert', zh: '一个测试助理' },
  goal: { en: 'Test goal', zh: '测试目标' },
  outcome: { en: 'Test outcome', zh: '测试结果' },
  skillsWithReason: [
    {
      slug: 'openclaw/gog',
      reason: { en: 'Because it works', zh: '因为有效' },
      order: 1,
      examples: {
        en: ['Summarize this meeting', 'Take notes'],
        zh: ['总结这个会议', '做笔记'],
      },
    },
  ],
  curator: 'clawhub',
  created: '2026-03-27',
};

describe('generateExpertMarkdown', () => {
  it('generates English markdown by default', () => {
    const md = generateExpertMarkdown(sampleExpert);
    expect(md).toContain('# Test Expert');
    expect(md).toContain('Test goal');
    expect(md).toContain('Test outcome');
    expect(md).toContain('Summarize this meeting');
    expect(md).not.toContain('测试助理');
  });

  it('generates English markdown for locale="en"', () => {
    const md = generateExpertMarkdown(sampleExpert, 'en');
    expect(md).toContain('# Test Expert');
    expect(md).toContain('Because it works');
    expect(md).toContain('Summarize this meeting');
    expect(md).not.toContain('因为有效');
  });

  it('generates Chinese markdown for locale="zh"', () => {
    const md = generateExpertMarkdown(sampleExpert, 'zh');
    expect(md).toContain('# 测试助理');
    expect(md).toContain('测试目标');
    expect(md).toContain('测试结果');
    expect(md).toContain('总结这个会议');
    expect(md).not.toContain('Test Expert');
  });

  it('always includes the machine-readable md URL', () => {
    const md = generateExpertMarkdown(sampleExpert, 'zh');
    expect(md).toContain('clawhub.md/expert/test-expert.md');
  });

  it('includes install command', () => {
    const md = generateExpertMarkdown(sampleExpert, 'en');
    expect(md).toContain('clawhub install openclaw/gog');
  });
});
