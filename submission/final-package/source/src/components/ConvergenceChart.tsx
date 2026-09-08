import type { StepTrace } from '../core/types';

export function ConvergenceChart({ steps, currentStep }: { steps: readonly StepTrace[]; currentStep: number }) {
  const width = 320;
  const height = 92;
  const max = Math.max(1, ...steps.map((step) => step.changedStateCount));
  const points = steps.map((step, index) => {
    const x = steps.length === 1 ? 0 : (index / (steps.length - 1)) * width;
    const y = height - (step.changedStateCount / max) * (height - 16);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <figure className="chart-card">
      <div className="chart-heading"><strong>State change by step</strong><span>Changed cells</span></div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Changed cells by step: ${steps.map((s) => s.changedStateCount).join(', ')}`}>
        <line x1="0" y1={height} x2={width} y2={height} className="chart-axis" />
        <polyline points={points} className="chart-line" />
        {steps.map((step, index) => {
          const [x = '0', y = '0'] = points.split(' ')[index]?.split(',') ?? [];
          return <circle key={step.step} cx={x} cy={y} r={step.step === currentStep ? 5 : 3} className={step.step === currentStep ? 'chart-dot is-current' : 'chart-dot'} />;
        })}
      </svg>
      <figcaption>Zero means the hidden state has reached a fixed point.</figcaption>
    </figure>
  );
}
