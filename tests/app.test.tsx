import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { App } from '../src/pages/App';

describe('interactive learning experience', () => {
  it('opens with the meaningful depth-matters preset already computed', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Six edges away' })).toBeVisible();
    expect(screen.getByText(/Current depth is incomplete/)).toBeVisible();
    expect(screen.getByTestId('plain-summary')).toHaveTextContent('At depth 4');
  });

  it('reruns the real engine when depth changes', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '6' }));
    expect(screen.getByTestId('plain-summary')).toHaveTextContent('At depth 6');
    expect(screen.getByTestId('plain-summary')).toHaveTextContent('distance 6');
    expect(screen.getByText(/Estimate agrees with the reference/)).toBeVisible();
  });

  it('shows the independent oracle result', () => {
    render(<App />);
    expect(screen.getByText('Independent BFS reference')).toBeVisible();
    expect(screen.getByText('Reachable · shortest 6')).toBeVisible();
    expect(screen.getByText(/never used by the recurrent system/i)).toBeVisible();
  });

  it('moves backward and forward through exact trace states', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByText('Estimate at step 3')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Estimate at step 4')).toBeVisible();
  });

  it('plays and pauses without advancing beyond the real trace', async () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('button', { name: 'Pause' })).toBePressed();
    await act(async () => vi.advanceTimersByTimeAsync(700));
    expect(screen.getByText('Estimate at step 1')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    await act(async () => vi.advanceTimersByTimeAsync(1400));
    expect(screen.getByText('Estimate at step 1')).toBeVisible();
  });

  it('switches presets and exposes computed saturation', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByLabelText('Preset'), 'limitation-island');
    expect(screen.getByRole('heading', { name: 'More work, same answer' })).toBeVisible();
    expect(screen.getByText('Additional computation can saturate.')).toBeVisible();
    expect(screen.getByText(/stabilizes at step 3/i)).toBeVisible();
  });

  it('loads deterministic fixture and depth from the query string', () => {
    window.history.replaceState({}, '', '/?fixture=easy-corridor&depth=2');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'One turn away' })).toBeVisible();
    expect(screen.getByTestId('plain-summary')).toHaveTextContent('At depth 2');
  });

  it('keeps sandbox start and goal valid when wall mode targets them', async () => {
    const user = userEvent.setup();
    render(<App />);
    const startCell = screen.getByRole('gridcell', { name: 'Edit row 1, column 1' });
    await user.click(startCell);
    expect(screen.getByRole('alert')).toHaveTextContent('cannot become walls');
    expect(screen.getByText(/BFS says reachable at 6/i)).toBeVisible();
  });

  it('supports keyboard activation of depth controls', () => {
    render(<App />);
    const depth = screen.getByRole('button', { name: '6' });
    depth.focus();
    fireEvent.keyDown(depth, { key: 'Enter' });
    fireEvent.click(depth);
    expect(screen.getByTestId('plain-summary')).toHaveTextContent('At depth 6');
  });

  it('provides a textual equivalent for the state grid', () => {
    render(<App />);
    expect(screen.getAllByTestId('state-grid')[0]).toHaveAccessibleName(/At recurrent step 4, 13 cells/);
  });
});
