export type Cell = 0 | 1;

export interface Point {
  readonly row: number;
  readonly col: number;
}

export interface Puzzle {
  readonly id: string;
  readonly title: string;
  readonly learningPurpose: string;
  readonly grid: readonly (readonly Cell[])[];
  readonly start: Point;
  readonly goal: Point;
  readonly recommendedDepths: readonly number[];
  readonly expectedObservation: string;
}

/** -1 means the recurrence has not yet reached this cell. Walls also remain -1. */
export type HiddenState = readonly (readonly number[])[];

export interface Prediction {
  readonly reachable: boolean;
  readonly estimatedDistance: number | null;
}

export interface OracleResult {
  readonly reachable: boolean;
  readonly shortestDistance: number | null;
  readonly visitedCount: number;
  readonly shortestPath: readonly Point[];
}

export interface StepTrace {
  readonly step: number;
  readonly state: HiddenState;
  readonly prediction: Prediction;
  /** Number of state cells whose value changed during this update. */
  readonly changedStateCount: number;
  /** Fraction of traversable cells changed during this update, in [0, 1]. */
  readonly convergenceDelta: number;
  readonly correctness: boolean;
  readonly distanceError: number | null;
}

export interface ExperimentResult {
  readonly puzzleId: string;
  readonly depth: number;
  /** Includes initialized state at step 0 and one entry per requested update. */
  readonly steps: readonly StepTrace[];
  readonly finalPrediction: Prediction;
  readonly finalCorrectness: boolean;
  readonly oracle: OracleResult;
  /** Exact recurrence count times traversable cell count; not time or FLOPs. */
  readonly computeProxy: number;
  readonly stableAtStep: number | null;
}

export interface RunOptions {
  readonly stopWhenStable?: boolean;
}

export interface Preset extends Puzzle {
  readonly category: 'easy' | 'depth-matters' | 'limitation';
  readonly discovery: string;
}
