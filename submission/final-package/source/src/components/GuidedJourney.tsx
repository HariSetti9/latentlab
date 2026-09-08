const stops = [
  { title: 'See the problem', prompt: 'Can the system solve this immediately?', action: 'Start shallow and locate S, G, and the reference path.' },
  { title: 'Watch state propagate', prompt: 'What changes inside the hidden state?', action: 'Use Next. Distance information moves only one grid edge per update.' },
  { title: 'Change reasoning depth', prompt: 'What if we allocate more computation?', action: 'Choose depth 6, then inspect the real trace.' },
  { title: 'Compare with truth', prompt: 'Did the estimate become correct?', action: 'Compare the goal cell with the independent BFS result.' },
  { title: 'Challenge the claim', prompt: 'Does longer always help?', action: 'Load the limitation: after stability, extra updates change nothing.' },
] as const;

export function GuidedJourney({ current, onChange, onLoadLimitation }: { current: number; onChange: (step: number) => void; onLoadLimitation: () => void }) {
  const stop = stops[current] ?? stops[0];
  return (
    <aside className="journey" aria-labelledby="journey-title">
      <div className="journey-progress" aria-label={`Learning stop ${current + 1} of ${stops.length}`}>
        {stops.map((item, index) => <button type="button" key={item.title} className={index === current ? 'is-current' : ''} onClick={() => onChange(index)} aria-label={`Stop ${index + 1}: ${item.title}`}>{index + 1}</button>)}
      </div>
      <div className="section-kicker">Stop {current + 1} of 5 · {stop.title}</div>
      <h2 id="journey-title">{stop.prompt}</h2>
      <p>{stop.action}</p>
      <div className="journey-actions">
        <button type="button" onClick={() => onChange(Math.max(0, current - 1))} disabled={current === 0}>Back</button>
        {current === stops.length - 1 ? <button type="button" className="primary-button" onClick={onLoadLimitation}>Load limitation</button> : <button type="button" className="primary-button" onClick={() => onChange(current + 1)}>Next stop</button>}
      </div>
    </aside>
  );
}
