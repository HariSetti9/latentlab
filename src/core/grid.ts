import type { Cell, Point, Puzzle } from './types';

export function pointsEqual(a: Point, b: Point): boolean {
  return a.row === b.row && a.col === b.col;
}

export function cloneGrid(grid: Puzzle['grid']): Cell[][] {
  return grid.map((row) => [...row]);
}

export function validatePuzzle(puzzle: Puzzle): void {
  const rows = puzzle.grid.length;
  if (rows === 0) throw new Error('Grid must contain at least one row.');
  const columns = puzzle.grid[0]?.length ?? 0;
  if (columns === 0) throw new Error('Grid rows must contain at least one cell.');
  if (puzzle.grid.some((row) => row.length !== columns)) {
    throw new Error('Grid must be rectangular.');
  }
  if (puzzle.grid.some((row) => row.some((cell) => cell !== 0 && cell !== 1))) {
    throw new Error('Grid cells must be 0 (traversable) or 1 (wall).');
  }
  for (const [label, point] of [['Start', puzzle.start], ['Goal', puzzle.goal]] as const) {
    if (!Number.isInteger(point.row) || !Number.isInteger(point.col)) {
      throw new Error(`${label} coordinates must be integers.`);
    }
    if (point.row < 0 || point.row >= rows || point.col < 0 || point.col >= columns) {
      throw new Error(`${label} must be inside the grid.`);
    }
    if (puzzle.grid[point.row]?.[point.col] === 1) {
      throw new Error(`${label} cannot be placed on a wall.`);
    }
  }
}

export function neighbors(point: Point, rows: number, columns: number): Point[] {
  const candidates = [
    { row: point.row - 1, col: point.col },
    { row: point.row + 1, col: point.col },
    { row: point.row, col: point.col - 1 },
    { row: point.row, col: point.col + 1 },
  ];
  return candidates.filter(({ row, col }) => row >= 0 && row < rows && col >= 0 && col < columns);
}

export function traversableCellCount(puzzle: Puzzle): number {
  return puzzle.grid.reduce((total, row) => total + row.filter((cell) => cell === 0).length, 0);
}
