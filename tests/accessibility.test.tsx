import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../src/pages/App';

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

describe('rendered accessibility semantics', () => {
  it('provides landmarks, one page heading, and a skip link', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Page' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'Skip to experiment' })).toHaveAttribute('href', '#experiment-lab');
  });

  it('gives every range control and scrollable comparison an accessible name', () => {
    render(<App />);
    for (const slider of screen.getAllByRole('slider')) expect(slider).toHaveAccessibleName();
    expect(screen.getByLabelText('Scrollable mechanism comparison')).toHaveAttribute('tabindex', '0');
  });
});
