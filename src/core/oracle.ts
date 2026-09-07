import { neighbors, pointsEqual, validatePuzzle } from './grid';
import type { OracleResult, Point, Puzzle } from './types';

function key(point: Point): string {
  return `${point.row},${point.col}`;
}

/**
 * Independent reference solver. It uses a FIFO queue and predecessor map.
 * It neither imports nor executes the recurrent engine.
 */
export function solveWithBfs(puzzle: Puzzle): OracleResult {
  validatePuzzle(puzzle);
  const rows = puzzle.grid.length;
  const columns = puzzle.grid[0]?.length ?? 0;
  const queue: Point[] = [puzzle.start];
  let cursor = 0;
  const predecessor = new Map<string, Point | null>([[key(puzzle.start), null]]);

  while (cursor < queue.length) {
    const current = queue[cursor++];
    if (!current) break;
    if (pointsEqual(current, puzzle.goal)) break;
    for (const next of neighbors(current, rows, columns)) {
      if (puzzle.grid[next.row]?.[next.col] === 1 || predecessor.has(key(next))) continue;
      predecessor.set(key(next), current);
      queue.push(next);
    }
  }

  if (!predecessor.has(key(puzzle.goal))) {
    return { reachable: false, shortestDistance: null, visitedCount: predecessor.size, shortestPath: [] };
  }

  const reversed: Point[] = [];
  let current: Point | null = puzzle.goal;
  while (current) {
    reversed.push(current);
    current = predecessor.get(key(current)) ?? null;
  }
  const shortestPath = reversed.reverse();
  return {
    reachable: true,
    shortestDistance: shortestPath.length - 1,
    visitedCount: predecessor.size,
    shortestPath,
  };
}
