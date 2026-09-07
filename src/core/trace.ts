import { traversableCellCount, validatePuzzle } from './grid';
import { distanceError, isPredictionCorrect } from './metrics';
import { solveWithBfs } from './oracle';
import { countChangedCells, initializeState, predictFromState, stateDelta, updateState } from './recurrent-engine';
import type { ExperimentResult, HiddenState, Puzzle, RunOptions, StepTrace } from './types';

function traceStep(puzzle: Puzzle, oracle: ReturnType<typeof solveWithBfs>, state: HiddenState, step: number, changed: number): StepTrace {
  const prediction = predictFromState(puzzle, state);
  return {
    step,
    state,
    prediction,
    changedStateCount: changed,
    convergenceDelta: step === 0 ? 0 : stateDelta(puzzle, changed),
    correctness: isPredictionCorrect(prediction, oracle),
    distanceError: distanceError(prediction, oracle),
  };
}

export function runExperiment(puzzle: Puzzle, depth: number, options: RunOptions = {}): ExperimentResult {
  validatePuzzle(puzzle);
  if (!Number.isInteger(depth) || depth < 0) throw new Error('Depth must be a non-negative integer.');
  const oracle = solveWithBfs(puzzle);
  let state = initializeState(puzzle);
  const steps: StepTrace[] = [traceStep(puzzle, oracle, state, 0, 0)];
  let stableAtStep: number | null = null;

  for (let step = 1; step <= depth; step += 1) {
    const next = updateState(puzzle, state);
    const changed = countChangedCells(state, next);
    steps.push(traceStep(puzzle, oracle, next, step, changed));
    state = next;
    if (changed === 0 && stableAtStep === null) stableAtStep = step;
    if (changed === 0 && options.stopWhenStable) break;
  }

  const final = steps.at(-1);
  if (!final) throw new Error('Experiment trace unexpectedly empty.');
  return {
    puzzleId: puzzle.id,
    depth,
    steps,
    finalPrediction: final.prediction,
    finalCorrectness: final.correctness,
    oracle,
    computeProxy: depth * traversableCellCount(puzzle),
    stableAtStep,
  };
}
