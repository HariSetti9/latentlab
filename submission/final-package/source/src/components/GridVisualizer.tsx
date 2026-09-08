import type { HiddenState, Point, Puzzle } from '../core/types';

interface GridVisualizerProps {
  puzzle: Puzzle;
  state: HiddenState;
  step: number;
  oraclePath?: readonly Point[];
  compact?: boolean;
}

const pointKey = ({ row, col }: Point) => `${row},${col}`;

export function GridVisualizer({ puzzle, state, step, oraclePath = [], compact = false }: GridVisualizerProps) {
  const path = new Set(oraclePath.map(pointKey));
  const reached = state.flat().filter((value) => value >= 0).length;
  const description = `At recurrent step ${step}, ${reached} cells have a known distance. Start is row ${puzzle.start.row + 1}, column ${puzzle.start.col + 1}; goal is row ${puzzle.goal.row + 1}, column ${puzzle.goal.col + 1}.`;

  return (
    <figure className={`grid-figure${compact ? ' grid-figure--compact' : ''}`}>
      <div
        className="state-grid"
        style={{ '--columns': puzzle.grid[0]?.length ?? 1 } as React.CSSProperties}
        role="img"
        aria-label={description}
        data-testid="state-grid"
      >
        {puzzle.grid.flatMap((row, rowIndex) => row.map((cell, colIndex) => {
          const value = state[rowIndex]?.[colIndex] ?? -1;
          const isStart = rowIndex === puzzle.start.row && colIndex === puzzle.start.col;
          const isGoal = rowIndex === puzzle.goal.row && colIndex === puzzle.goal.col;
          const onPath = path.has(`${rowIndex},${colIndex}`);
          const label = cell === 1 ? 'wall' : value >= 0 ? `reached at distance ${value}` : 'not reached';
          return (
            <div
              className={`grid-cell ${cell === 1 ? 'is-wall' : value >= 0 ? 'is-reached' : 'is-unseen'}${onPath ? ' is-oracle-path' : ''}`}
              key={`${rowIndex}-${colIndex}`}
              title={`Row ${rowIndex + 1}, column ${colIndex + 1}: ${label}`}
            >
              {cell === 1 ? <span aria-hidden="true">×</span> : null}
              {value >= 0 && !isStart ? <span className="cell-distance">{value}</span> : null}
              {isStart ? <strong className="cell-marker">S</strong> : null}
              {isGoal ? <strong className="cell-marker cell-marker--goal">G</strong> : null}
            </div>
          );
        }))}
      </div>
      {!compact ? (
        <figcaption className="grid-legend">
          <span><i className="legend-swatch legend-start" />Start</span>
          <span><i className="legend-swatch legend-goal" />Goal</span>
          <span><i className="legend-swatch legend-reached" />Known distance</span>
          <span><i className="legend-swatch legend-path" />BFS path</span>
          <span><i className="legend-swatch legend-wall" />Wall</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
