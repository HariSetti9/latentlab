import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ResearchModule } from '../src/components/ResearchModule';
import { researchClaims } from '../src/research/claims';
import { papers } from '../src/research/papers';

describe('research module', () => {
  it('keeps the non-equivalence warning and evidence boundaries visible', () => {
    render(<ResearchModule />);
    expect(screen.getByText('Conceptual bridge, not a replica.')).toBeVisible();
    expect(screen.getByText(/no learned weights, in-context learning/)).toBeVisible();
    expect(screen.getByText('Not independently reproduced')).toBeVisible();
    expect(screen.getByText(/exact updates are proprietary/i)).toBeVisible();
  });

  it('maps a control to the real toy without claiming BDH depth', async () => {
    const user = userEvent.setup();
    render(<ResearchModule />);
    await user.click(screen.getByRole('button', { name: 'Toy concept mapping depth 6' }));
    expect(screen.getByText(/After 6 updates/)).toHaveTextContent('goal is reached');
    expect(screen.getByText(/does not select, estimate, or simulate BDH-CQ depth/)).toBeVisible();
  });

  it('renders the required comparison distinctions', () => {
    render(<ResearchModule />);
    const table = screen.getByRole('table');
    expect(table).toHaveTextContent('LATENTLAB toy');
    expect(table).toHaveTextContent('BDH-CQ');
    expect(table).toHaveTextContent('Contextual memory S plus query workspace H');
    expect(table).toHaveTextContent('None');
  });

  it('links every primary source with a full arXiv URL', () => {
    render(<ResearchModule />);
    for (const paper of papers) {
      const links = screen.getAllByRole('link', { name: new RegExp(paper.title) });
      expect(links.some((link) => link.getAttribute('href') === paper.url)).toBe(true);
      expect(paper.url).toMatch(/^https:\/\/arxiv\.org\/abs\/\d{4}\.\d{5}$/);
    }
  });

  it('keeps all strong claims attached to known sources', () => {
    const known = new Set(papers.map((paper) => paper.id));
    expect(researchClaims.every((claim) => claim.sourceIds.length > 0 && claim.sourceIds.every((id) => known.has(id)))).toBe(true);
  });
});
