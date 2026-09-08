import type { OracleResult, Prediction } from './types';

export function isPredictionCorrect(prediction: Prediction, oracle: OracleResult): boolean {
  return prediction.reachable === oracle.reachable &&
    (!oracle.reachable || prediction.estimatedDistance === oracle.shortestDistance);
}

/** Null means distance error is undefined because one side predicts unreachable. */
export function distanceError(prediction: Prediction, oracle: OracleResult): number | null {
  if (prediction.estimatedDistance === null || oracle.shortestDistance === null) return null;
  return Math.abs(prediction.estimatedDistance - oracle.shortestDistance);
}
