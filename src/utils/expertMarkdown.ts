import type { Expert } from '@/data/bundles';
import { t } from '@/data/bundles';
import { getSkill } from '@/data/skills';

export function generateExpertMarkdown(expert: Expert, locale = 'en'): string {
  const lines: string[] = [];
  const pageUrl = `https://clawhub.md/expert/${expert.slug}`;
  const mdUrl = `${pageUrl}.md`;

  lines.push(`# ${t(expert.name, locale)}`);
  lines.push('');
  lines.push(`> **Agentic setup file** — share this URL with your agent and it will set everything up for you:`);
  lines.push(`> \`${mdUrl}\``);
  lines.push('');
  lines.push(`**Goal:** ${t(expert.goal, locale)}`);
  lines.push('');
  lines.push(`**What you'll have:** ${t(expert.outcome, locale)}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Step 1: Install
  lines.push('## Step 1: Install');
  lines.push('');
  const installCmd = expert.installAll
    ?? expert.skillsWithReason.map(s => `clawhub install ${s.slug}`).join('\n');
  lines.push('```bash');
  lines.push(installCmd);
  lines.push('```');
  lines.push('');

  // Step 2: Configure (only skills that have setupSteps)
  const skillsWithSetup = expert.skillsWithReason
    .map(entry => ({
      entry,
      skill: getSkill(entry.slug.split('/')[0]!, entry.slug.split('/')[1]!),
    }))
    .filter(({ skill }) => skill?.setupSteps && skill.setupSteps.length > 0);

  if (skillsWithSetup.length > 0) {
    lines.push('## Step 2: Configure');
    lines.push('');
    lines.push('Each skill may need credentials or auth before it can act on your behalf.');
    lines.push('');
    for (const { entry, skill } of skillsWithSetup) {
      lines.push(`### ${entry.slug}`);
      lines.push('');
      lines.push(`_${t(entry.reason, locale)}_`);
      lines.push('');
      for (const step of skill?.setupSteps ?? []) {
        lines.push(`- ${step}`);
      }
      lines.push('');
    }
  }

  // Step 3 (or 2): Try it
  const useStep = skillsWithSetup.length > 0 ? '3' : '2';
  lines.push(`## Step ${useStep}: Try it`);
  lines.push('');
  lines.push('After setup, say these to your agent to verify everything works:');
  lines.push('');
  for (const entry of expert.skillsWithReason) {
    const exs = entry.examples ? entry.examples[locale === 'zh' ? 'zh' : 'en'] : undefined;
    if (exs && exs.length > 0) {
      lines.push(`**${entry.slug}**`);
      lines.push('');
      for (const ex of exs.slice(0, 3)) {
        lines.push(`- "${ex}"`);
      }
      lines.push('');
    }
  }

  lines.push('---');
  lines.push('');
  lines.push(`*${t(expert.name, locale)} · [clawhub.md/expert/${expert.slug}](${pageUrl})*`);

  return lines.join('\n');
}
