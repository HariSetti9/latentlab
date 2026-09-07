import { performance } from 'node:perf_hooks';
import { writeFile } from 'node:fs/promises';
import { evaluationDepths, evaluationFixtures } from '../src/core/evaluation-fixtures';
import { presets } from '../src/core/presets';
import { runExperiment } from '../src/core/trace';

const started = performance.now();
const corpus = [
  ...presets.map((puzzle) => ({ puzzle, construction: 'showcase preset' as const, obstacleDensity: puzzle.grid.flat().filter((cell) => cell === 1).length / puzzle.grid.flat().length })),
  ...evaluationFixtures,
];
const items = corpus.flatMap(({ puzzle, construction, obstacleDensity }) => evaluationDepths.map((depth) => {
  const result = runExperiment(puzzle, depth);
  return {
    puzzleId: puzzle.id,
    construction,
    gridRows: puzzle.grid.length,
    gridColumns: puzzle.grid[0]?.length ?? 0,
    obstacleDensity: Number(obstacleDensity.toFixed(4)),
    depth,
    oracleReachable: result.oracle.reachable,
    oracleDistance: result.oracle.shortestDistance,
    predictedReachable: result.finalPrediction.reachable,
    predictedDistance: result.finalPrediction.estimatedDistance,
    correct: result.finalCorrectness,
    changedCellsFinalStep: result.steps.at(-1)?.changedStateCount ?? 0,
    stableAtStep: result.stableAtStep,
    computeProxy: result.computeProxy,
  };
}));

const elapsed = performance.now() - started;
const report = {
  schemaVersion: 2,
  corpusLabel: 'small hand-constructed deterministic reproducibility corpus',
  generatedBy: 'pnpm evaluate --write (scripts/evaluate.ts)',
  fixtureCount: corpus.length,
  evaluatedCases: items.length,
  depths: evaluationDepths,
  items,
};
const serialized = `${JSON.stringify(report, null, 2)}\n`;
const shouldWrite = process.argv.includes('--write');
if (shouldWrite) {
  const columns = ['puzzleId', 'construction', 'gridRows', 'gridColumns', 'obstacleDensity', 'depth', 'oracleReachable', 'oracleDistance', 'predictedReachable', 'predictedDistance', 'correct', 'changedCellsFinalStep', 'stableAtStep', 'computeProxy'] as const;
  const csvValue = (value: unknown) => value === null ? '' : typeof value === 'string' ? `"${value.replaceAll('"', '""')}"` : String(value);
  const csv = `${columns.join(',')}\n${items.map((item) => columns.map((column) => csvValue(item[column])).join(',')).join('\n')}\n`;
  await Promise.all([
    writeFile(new URL('../artifacts/evaluation-results.json', import.meta.url), serialized, 'utf8'),
    writeFile(new URL('../artifacts/evaluation-results.csv', import.meta.url), csv, 'utf8'),
    writeFile(new URL('../artifacts/metrics.json', import.meta.url), serialized, 'utf8'),
  ]);
}
if (shouldWrite) console.log(`Wrote ${items.length} cases across ${corpus.length} fixtures to JSON and CSV.`);
else console.log(serialized);
console.error(`Evaluation diagnostic: ${elapsed.toFixed(3)} ms (not a product performance claim).`);
