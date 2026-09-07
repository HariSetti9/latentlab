import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../src/pages/App';

describe('deterministic demo routes', () => {
  it.each([
    ['/?fixture=depth-matters-winding&depth=4', 'Six edges away', 'At depth 4'],
    ['/?fixture=depth-matters-winding&depth=6', 'Six edges away', 'At depth 6'],
    ['/?fixture=limitation-island&depth=16', 'More work, same answer', 'At depth 16'],
  ])('loads %s', (url, heading, summary) => {
    window.history.replaceState({}, '', url);
    render(<App />);
    expect(screen.getByRole('heading', { name: heading })).toBeVisible();
    expect(screen.getByTestId('plain-summary')).toHaveTextContent(summary);
  });
});
