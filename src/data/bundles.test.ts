import { describe, it, expect } from 'vitest';
import {
  bundles,
  isScenario,
  getBundle,
  getScenario,
  getScenarios,
  getRegularBundles,
  type RegularBundle,
  type ScenarioBundle,
} from './bundles';

const regularBundle: RegularBundle = {
  slug: 'test-regular',
  name: 'Test Regular',
  description: 'A regular bundle',
  skills: ['gstack/review'],
  curator: 'clawhub',
  created: '2026-03-25',
};

const scenarioBundle: ScenarioBundle = {
  scenario: true,
  slug: 'test-scenario',
  name: 'Test Scenario',
  description: 'A scenario bundle',
  goal: 'Test goal',
  skillsWithReason: [{ slug: 'gstack/review', reason: 'Because', order: 1 }],
  curator: 'clawhub',
  created: '2026-03-25',
};

describe('isScenario', () => {
  it('returns false for a regular bundle', () => {
    expect(isScenario(regularBundle)).toBe(false);
  });

  it('returns true for a scenario bundle', () => {
    expect(isScenario(scenarioBundle)).toBe(true);
  });

  it('returns false when scenario is undefined', () => {
    const b = { ...regularBundle, scenario: undefined };
    expect(isScenario(b as RegularBundle)).toBe(false);
  });
});

describe('getScenario', () => {
  it('returns the scenario bundle for a known slug', () => {
    const result = getScenario('code-review');
    expect(result).toBeDefined();
    expect(result?.scenario).toBe(true);
    expect(result?.slug).toBe('code-review');
  });

  it('returns undefined for a nonexistent slug', () => {
    expect(getScenario('nonexistent')).toBeUndefined();
  });

  it('returns undefined for a regular bundle slug', () => {
    expect(getScenario('starter')).toBeUndefined();
  });
});

describe('getScenarios', () => {
  it('returns only scenario: true bundles', () => {
    const scenarios = getScenarios();
    expect(scenarios.length).toBeGreaterThan(0);
    scenarios.forEach(s => expect(s.scenario).toBe(true));
  });

  it('returns no regular bundles', () => {
    const scenarios = getScenarios();
    scenarios.forEach(s => expect(isScenario(s)).toBe(true));
  });
});

describe('getBundle', () => {
  it('returns the regular bundle for a known slug', () => {
    const result = getBundle('starter');
    expect(result).toBeDefined();
    expect(result?.slug).toBe('starter');
  });

  it('returns undefined for a scenario slug', () => {
    expect(getBundle('code-review')).toBeUndefined();
  });

  it('returns undefined for a nonexistent slug', () => {
    expect(getBundle('nonexistent')).toBeUndefined();
  });
});

describe('getRegularBundles', () => {
  it('returns only non-scenario bundles', () => {
    const regular = getRegularBundles();
    expect(regular.length).toBeGreaterThan(0);
    regular.forEach(b => expect(isScenario(b)).toBe(false));
  });
});

describe('bundles data integrity', () => {
  it('has at least 2 scenario bundles (Phase 1 minimum)', () => {
    expect(getScenarios().length).toBeGreaterThanOrEqual(2);
  });

  it('all scenario bundles have at least 1 skill with reason', () => {
    getScenarios().forEach(s => {
      expect(s.skillsWithReason.length).toBeGreaterThan(0);
    });
  });
});
