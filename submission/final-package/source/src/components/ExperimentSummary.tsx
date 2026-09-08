import type { ExperimentResult, StepTrace } from '../core/types';

interface ExperimentSummaryProps { result: ExperimentResult; step: StepTrace }

export function ExperimentSummary({ result, step }: ExperimentSummaryProps) {
  const changing = step.changedStateCount > 0;
  return (
    <section className="summary-panel" aria-labelledby="summary-title">
      <div className="section-kicker">Live computation · toy recurrent system</div>
      <h2 id="summary-title">Estimate at step {step.step}</h2>
      <div className="comparison-readout">
        <div>
          <span className="readout-label">Recurrent estimate</span>
          <strong>{step.prediction.reachable ? `Reached · distance ${step.prediction.estimatedDistance}` : 'Not reached yet'}</strong>
        </div>
        <div className="reference-readout">
          <span className="readout-label">Independent BFS reference</span>
          <strong>{result.oracle.reachable ? `Reachable · shortest ${result.oracle.shortestDistance}` : 'Unreachable'}</strong>
        </div>
      </div>
      <p className={`verdict ${step.correctness ? 'is-correct' : 'is-incomplete'}`} role="status">
        {step.correctness ? '✓ Estimate agrees with the reference' : '○ Current depth is incomplete'}
      </p>
      <p className="oracle-note">The oracle evaluates the result. It is never used by the recurrent system during inference.</p>
      <dl className="metrics-strip">
        <div><dt>Current step</dt><dd>{step.step}</dd></div>
        <div><dt>Changed cells</dt><dd>{step.changedStateCount}</dd></div>
        <div><dt>State delta</dt><dd>{(step.convergenceDelta * 100).toFixed(0)}%</dd></div>
        <div><dt>Status</dt><dd>{changing ? 'Still changing' : step.step === 0 ? 'Initialized' : 'Stable'}</dd></div>
        <div title="Requested updates × traversable cells; not elapsed time or FLOPs."><dt>Operation proxy</dt><dd>{step.step * (result.computeProxy / Math.max(1, result.depth))}</dd></div>
      </dl>
    </section>
  );
}
