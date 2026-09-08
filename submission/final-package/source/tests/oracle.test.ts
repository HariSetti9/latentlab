import { describe, expect, it } from 'vitest';
import { solveWithBfs } from '../src/core/oracle';
import type { Puzzle } from '../src/core/types';

const base = (overrides: Partial<Puzzle> = {}): Puzzle => ({
  id: 'test', title: 'Test', learningPurpose: 'Test fixture',
  grid: [[0, 0], [0, 0]], start: { row: 0, col: 0 }, goal: { row: 1, col: 1 },
  recommendedDepths: [0, 1, 2], expectedObservation: 'Test only', ...overrides,
});

describe('BFS oracle', () => {
  it('finds a shortest path', () => {
    const result = solveWithBfs(base());
    expect(result.reachable).toBe(true);
    expect(result.shortestDistance).toBe(2);
    expect(result.shortestPath).toHaveLength(3);
    expect(result.shortestPath[0]).toEqual({ row: 0, col: 0 });
    expect(result.shortestPath.at(-1)).toEqual({ row: 1, col: 1 });
  });

  it('respects obstacles and reports unreachable goals', () => {
    const result = solveWithBfs(base({ grid: [[0, 1], [1, 0]] }));
    expect(result).toMatchObject({ reachable: false, shortestDistance: null, visitedCount: 1, shortestPath: [] });
  });

  it('handles start equal to goal', () => {
    const result = solveWithBfs(base({ goal: { row: 0, col: 0 } }));
    expect(result).toMatchObject({ reachable: true, shortestDistance: 0, visitedCount: 1 });
  });

  it.each([
    [[], 'at least one row'],
    [[[0], [0, 0]], 'rectangular'],
    [[[0, 2]], '0 (traversable) or 1 (wall)'],
  ])('rejects invalid grid %#', (grid, message) => {
    expect(() => solveWithBfs(base({ grid: grid as Puzzle['grid'] }))).toThrow(message);
  });

  it('rejects invalid start, goal, and wall placement', () => {
    expect(() => solveWithBfs(base({ start: { row: -1, col: 0 } }))).toThrow('Start must be inside');
    expect(() => solveWithBfs(base({ goal: { row: 3, col: 0 } }))).toThrow('Goal must be inside');
    expect(() => solveWithBfs(base({ grid: [[1, 0], [0, 0]] }))).toThrow('Start cannot be placed on a wall');
  });
});
