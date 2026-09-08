import { useMemo, useState } from 'react';
import { runExperiment } from '../core/trace';
import type { Cell, Point, Puzzle } from '../core/types';
import { GridVisualizer } from './GridVisualizer';

type EditMode = 'wall' | 'start' | 'goal';
const initialGrid: Cell[][] = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

export function SandboxGrid() {
  const [grid, setGrid] = useState<Cell[][]>(() => initialGrid.map((row) => [...row]));
  const [start, setStart] = useState<Point>({ row: 0, col: 0 });
  const [goal, setGoal] = useState<Point>({ row: 3, col: 3 });
  const [depth, setDepth] = useState(6);
  const [mode, setMode] = useState<EditMode>('wall');
  const [validationMessage, setValidationMessage] = useState('');
  const puzzle: Puzzle = useMemo(() => ({ id: 'sandbox', title: 'Sandbox', learningPurpose: 'Explore local propagation', grid, start, goal, recommendedDepths: [2, 4, 6, 8], expectedObservation: 'Varies by learner input.' }), [grid, start, goal]);
  const result = useMemo(() => runExperiment(puzzle, depth), [puzzle, depth]);
  const state = result.steps.at(-1)?.state ?? [];

  function edit(point: Point) {
    setValidationMessage('');
    if (mode === 'start') {
      if (grid[point.row]?.[point.col] === 1 || (point.row === goal.row && point.col === goal.col)) { setValidationMessage('Start must be on an open cell and distinct from the goal.'); return; }
      setStart(point); return;
    }
    if (mode === 'goal') {
      if (grid[point.row]?.[point.col] === 1 || (point.row === start.row && point.col === start.col)) { setValidationMessage('Goal must be on an open cell and distinct from the start.'); return; }
      setGoal(point); return;
    }
    if ((point.row === start.row && point.col === start.col) || (point.row === goal.row && point.col === goal.col)) { setValidationMessage('Start and goal cells cannot become walls.'); return; }
    setGrid((current) => current.map((row, rowIndex) => row.map((cell, colIndex) => rowIndex === point.row && colIndex === point.col ? (cell === 0 ? 1 : 0) : cell)));
  }

  return (
    <section className="sandbox" id="sandbox" aria-labelledby="sandbox-title">
      <div><div className="section-kicker">Optional lab bench</div><h2 id="sandbox-title">Change the puzzle, keep the rule</h2><p>Choose an edit mode, then activate a cell. Start and goal must remain distinct and traversable.</p></div>
      <div className="sandbox-layout">
        <div>
          <div className="edit-tools" role="group" aria-label="Grid edit mode">
            {(['wall', 'start', 'goal'] as const).map((item) => <button type="button" key={item} aria-pressed={mode === item} className={mode === item ? 'is-selected' : ''} onClick={() => setMode(item)}>{item === 'wall' ? 'Toggle wall' : `Move ${item}`}</button>)}
          </div>
          <div className="sandbox-grid" style={{ '--columns': 4 } as React.CSSProperties} role="grid" aria-label="Editable four by four puzzle">
            {grid.flatMap((row, rowIndex) => row.map((_cell, colIndex) => <button type="button" role="gridcell" key={`${rowIndex}-${colIndex}`} aria-label={`Edit row ${rowIndex + 1}, column ${colIndex + 1}`} onClick={() => edit({ row: rowIndex, col: colIndex })} />))}
          </div>
          {validationMessage ? <p className="validation-message" role="alert">{validationMessage}</p> : null}
          <GridVisualizer puzzle={puzzle} state={state} step={depth} oraclePath={result.oracle.shortestPath} compact />
        </div>
        <div className="sandbox-controls">
          <label>Sandbox depth: <strong>{depth}</strong><input type="range" min="0" max="16" value={depth} onChange={(event) => setDepth(Number(event.target.value))} /></label>
          <p role="status">At depth {depth}, the estimate is {result.finalPrediction.reachable ? `reachable at ${result.finalPrediction.estimatedDistance}` : 'not reached'}. BFS says {result.oracle.reachable ? `reachable at ${result.oracle.shortestDistance}` : 'unreachable'}.</p>
          <button type="button" onClick={() => { setGrid(initialGrid.map((row) => [...row])); setStart({ row: 0, col: 0 }); setGoal({ row: 3, col: 3 }); setDepth(6); setValidationMessage(''); }}>Reset sandbox</button>
        </div>
      </div>
    </section>
  );
}
