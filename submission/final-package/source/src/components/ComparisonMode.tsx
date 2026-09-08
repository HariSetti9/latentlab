import { runExperiment } from '../core/trace';
import type { Puzzle } from '../core/types';
import { GridVisualizer } from './GridVisualizer';

export function ComparisonMode({ puzzle }: { puzzle: Puzzle }) {
  const shallow = runExperiment(puzzle, 2);
  const deeper = runExperiment(puzzle, 6);
  const cards = [{ label: 'Shallow', result: shallow }, { label: 'Deeper', result: deeper }];
  return (
    <section className="comparison-mode" aria-labelledby="comparison-title">
      <div className="section-kicker">Same input, different compute budget</div>
      <h2 id="comparison-title">Shallow vs deeper</h2>
      <div className="comparison-cards">
        {cards.map(({ label, result }) => {
          const final = result.steps.at(-1);
          if (!final) return null;
          return (
            <article key={label}>
              <header><span>{label}</span><strong>Depth {result.depth}</strong></header>
              <GridVisualizer puzzle={puzzle} state={final.state} step={final.step} compact />
              <p>{final.prediction.reachable ? `Reached at distance ${final.prediction.estimatedDistance}` : 'Goal not reached yet'}</p>
              <dl><div><dt>Correct</dt><dd>{final.correctness ? 'Yes' : 'No'}</dd></div><div><dt>Operations</dt><dd>{result.computeProxy}</dd></div></dl>
            </article>
          );
        })}
      </div>
      <p className="comparison-note">More updates cost more operations here. They can change this result; this is not a universal cost–accuracy law.</p>
    </section>
  );
}
