/**
 * Extracts `claude install ...` lines from the first fenced code block
 * in a markdown string that contains such a line.
 *
 * Returns null if no matching block is found.
 * Never returns shell prompt characters ($ % >).
 */
export function extractInstallCommand(md: string): string | null {
  const codeBlockRegex = /```[\w]*\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(md)) !== null) {
    const block = match[1];
    if (!block.includes('claude install')) continue;

    const installLines = block
      .split('\n')
      // Strip any leading shell prompt characters first, then filter
      .map(line => line.replace(/^[$%>]\s*/, '').trim())
      .filter(line => line.startsWith('claude install'))
      .join('\n');

    if (installLines) return installLines;
  }

  return null;
}
