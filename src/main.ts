import { depthMattersPreset, runExperiment } from './core';

const result = runExperiment(depthMattersPreset, 6);
const target = document.querySelector<HTMLPreElement>('#result');
if (target) {
  target.textContent = JSON.stringify({
    preset: result.puzzleId,
    depth: result.depth,
    prediction: result.finalPrediction,
    reference: result.oracle,
  }, null, 2);
}
