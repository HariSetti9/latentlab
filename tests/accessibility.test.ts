import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('motion and mobile safeguards', () => {
  it('contains an explicit reduced-motion mode', async () => {
    const css = await readFile(join(process.cwd(), 'src/styles/global.css'), 'utf8');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('scroll-behavior: auto');
  });

  it.each(['900px', '720px', '390px'])('contains the %s responsive breakpoint', async (breakpoint) => {
    const css = await readFile(join(process.cwd(), 'src/styles/global.css'), 'utf8');
    expect(css).toContain(`max-width: ${breakpoint}`);
  });
});
