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
