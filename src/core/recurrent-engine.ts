import { neighbors, traversableCellCount, validatePuzzle } from './grid';
import type { HiddenState, Prediction, Puzzle } from './types';

export function initializeState(puzzle: Puzzle): HiddenState {
  validatePuzzle(puzzle);
  return puzzle.grid.map((row, rowIndex) =>
    row.map((_cell, colIndex) => rowIndex === puzzle.start.row && colIndex === puzzle.start.col ? 0 : -1),
  );
}

/**
 * One synchronous local recurrent update. A cell may adopt one plus the
 * smallest distance visible in its four-neighbor state from the prior step.
 * Information therefore travels at most one edge per update.
 */
export function updateState(puzzle: Puzzle, previous: HiddenState): HiddenState {
  validatePuzzle(puzzle);
  const rows = puzzle.grid.length;
  const columns = puzzle.grid[0]?.length ?? 0;
  if (previous.length !== rows || previous.some((row) => row.length !== columns)) {
    throw new Error('Hidden state shape must match puzzle grid.');
  }
  return puzzle.grid.map((row, rowIndex) => row.map((cell, colIndex) => {
    if (cell === 1) return -1;
    const current = previous[rowIndex]?.[colIndex] ?? -1;
    if (current >= 0) return current;
    const reachedNeighbors = neighbors({ row: rowIndex, col: colIndex }, rows, columns)
      .map((point) => previous[point.row]?.[point.col] ?? -1)
      .filter((distance) => distance >= 0);
    return reachedNeighbors.length === 0 ? -1 : Math.min(...reachedNeighbors) + 1;
  }));
}

export function predictFromState(puzzle: Puzzle, state: HiddenState): Prediction {
  const value = state[puzzle.goal.row]?.[puzzle.goal.col] ?? -1;
  return { reachable: value >= 0, estimatedDistance: value >= 0 ? value : null };
}

export function countChangedCells(before: HiddenState, after: HiddenState): number {
  return before.reduce((count, row, rowIndex) => count + row.reduce(
    (rowCount, value, colIndex) => rowCount + (value === after[rowIndex]?.[colIndex] ? 0 : 1), 0,
  ), 0);
}

export function stateDelta(puzzle: Puzzle, changedStateCount: number): number {
  return changedStateCount / traversableCellCount(puzzle);
}
