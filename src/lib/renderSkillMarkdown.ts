import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

// Allow highlight.js class attributes on code/span elements
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), 'className'],
    span: [...(defaultSchema.attributes?.span ?? []), 'className'],
    pre: [...(defaultSchema.attributes?.pre ?? []), 'className'],
  },
};

/**
 * Renders a markdown string to an HTML string.
 * Uses GFM (GitHub Flavored Markdown) — same flavour as GitHub,
 * where all skills live.
 * Syntax highlighting via highlight.js (theme applied via CSS).
 * rehype-sanitize strips any raw HTML injected via skill files.
 */
export async function renderSkillMarkdown(md: string): Promise<string> {
  if (!md) return '';

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeHighlight, { detect: true })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(md);

  return String(result);
}

/**
 * Extracts the skill name (first H1) and one-line description
 * (first non-empty paragraph after the H1) from raw markdown.
 * Skips YAML frontmatter (---...---) and fenced code blocks.
 */
export function extractSkillMeta(md: string): { name: string; description: string } {
  const lines = md.split('\n');
  let inFrontmatter = false;
  let frontmatterDone = false;
  let inCodeBlock = false;
  let name = '';
  let pastH1 = false;
  let description = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // YAML frontmatter: first line is '---', ends at second '---'
    if (i === 0 && trimmed === '---') {
      inFrontmatter = true;
      continue;
    }
    if (inFrontmatter) {
      if (trimmed === '---') { inFrontmatter = false; frontmatterDone = true; }
      continue;
    }

    // Fenced code blocks
    if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    // Find first H1 (single #, not ##)
    if (!name && /^#(?!#)\s+(.+)$/.test(line)) {
      name = line.replace(/^#\s+/, '').trim();
      pastH1 = true;
      continue;
    }

    // First non-empty, non-heading paragraph after H1
    if (pastH1 && !description) {
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('<!--')) continue;
      description = trimmed;
    }
  }

  return { name, description };
}
