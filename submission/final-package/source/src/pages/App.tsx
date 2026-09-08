import { useEffect, useMemo, useState } from 'react';
import { ComparisonMode } from '../components/ComparisonMode';
import { ConvergenceChart } from '../components/ConvergenceChart';
import { DepthControl } from '../components/DepthControl';
import { ExperimentSummary } from '../components/ExperimentSummary';
import { GridVisualizer } from '../components/GridVisualizer';
import { GuidedJourney } from '../components/GuidedJourney';
import { SandboxGrid } from '../components/SandboxGrid';
import { ResearchModule } from '../components/ResearchModule';
import { SelfCheck } from '../components/SelfCheck';
import { TracePlayer } from '../components/TracePlayer';
import { depthMattersPreset, easyPreset, limitationPreset } from '../core/presets';
import { runExperiment } from '../core/trace';
import type { Preset } from '../core/types';

const availablePresets = [depthMattersPreset, easyPreset, limitationPreset] as const;

function initialState() {
  const params = new URLSearchParams(window.location.search);
  const fixture = params.get('fixture');
  const preset = availablePresets.find((item) => item.id === fixture) ?? depthMattersPreset;
  const depthParam = params.get('depth');
  const parsedDepth = depthParam === null ? Number.NaN : Number(depthParam);
  const depth = Number.isInteger(parsedDepth) && parsedDepth >= 0 && parsedDepth <= 16 ? parsedDepth : 4;
  return { preset, depth };
}

export function App() {
  const initial = useMemo(initialState, []);
  const [preset, setPreset] = useState<Preset>(initial.preset);
  const [depth, setDepth] = useState(initial.depth);
  const [currentStep, setCurrentStep] = useState(initial.depth);
  const [playing, setPlaying] = useState(false);
  const [journeyStop, setJourneyStop] = useState(0);
  const result = useMemo(() => runExperiment(preset, depth), [preset, depth]);
  const step = result.steps[Math.min(currentStep, result.steps.length - 1)] ?? result.steps[0];
  if (!step) throw new Error('Experiment returned no steps.');

  useEffect(() => {
    if (!playing) return undefined;
    if (currentStep >= depth) { setPlaying(false); return undefined; }
    const timer = window.setTimeout(() => setCurrentStep((value) => Math.min(depth, value + 1)), 650);
    return () => window.clearTimeout(timer);
  }, [currentStep, depth, playing]);

  function changeDepth(nextDepth: number) {
    setPlaying(false);
    setDepth(nextDepth);
    setCurrentStep(nextDepth);
  }

  function selectPreset(next: Preset, nextDepth = next === limitationPreset ? 8 : 4) {
    setPreset(next);
    setDepth(nextDepth);
    setCurrentStep(nextDepth);
    setPlaying(false);
  }

  const plainSummary = `At depth ${depth}, step ${step.step}, the recurrent system ${step.prediction.reachable ? `has reached the goal at distance ${step.prediction.estimatedDistance}` : 'has not yet reached the goal'}. The BFS reference reports ${result.oracle.reachable ? `a shortest distance of ${result.oracle.shortestDistance}` : 'that the goal is unreachable'}. ${step.correctness ? 'The results agree.' : 'The current estimate is incomplete.'}`;

  return (
    <>
      <a className="skip-link" href="#experiment-lab">Skip to experiment</a>
      <header className="site-header"><a className="brand" href="#top" aria-label="LATENTLAB home">LATENT<span>LAB</span></a><nav aria-label="Page"><a href="#experiment">Experiment</a><a href="#sandbox">Sandbox</a><a href="#evidence">Evidence</a></nav></header>
      <main id="top">
        <section className="opening" id="experiment">
          <div className="opening-copy"><div className="eyebrow">A live, inspectable recurrence</div><h1>Can an AI compute longer <em>without talking longer?</em></h1><p>Change one number. Watch a fixed-size hidden state update before the system reads its answer.</p><div className="truth-labels"><span>LIVE COMPUTATION</span><span>ALGORITHMIC TOY</span><span>NO GENERATED REASONING TEXT</span></div></div>
          <GuidedJourney current={journeyStop} onChange={setJourneyStop} onLoadLimitation={() => { selectPreset(limitationPreset, 8); setJourneyStop(4); document.querySelector('#experiment-lab')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }} />
        </section>

        <section className="experiment-shell" id="experiment-lab" aria-labelledby="lab-title">
          <div className="lab-toolbar">
            <div><div className="section-kicker">Current puzzle</div><h2 id="lab-title">{preset.title}</h2><p>{preset.learningPurpose}</p></div>
            <label>Preset<select value={preset.id} onChange={(event) => selectPreset(availablePresets.find((item) => item.id === event.target.value) ?? depthMattersPreset)}>{availablePresets.map((item) => <option key={item.id} value={item.id}>{item.category === 'limitation' ? 'Limitation · ' : ''}{item.title}</option>)}</select></label>
          </div>
          <DepthControl depth={depth} onChange={changeDepth} />
          <div className="lab-grid">
            <div className="visual-panel">
              <div className="panel-heading"><span>Task-relevant hidden state</span><strong>Step {step.step}</strong></div>
              <GridVisualizer puzzle={preset} state={step.state} step={step.step} oraclePath={result.oracle.shortestPath} />
              <TracePlayer currentStep={step.step} maximumStep={depth} playing={playing} onStepChange={(value) => { setPlaying(false); setCurrentStep(value); }} onPlayingChange={(value) => { if (value && currentStep >= depth) setCurrentStep(0); setPlaying(value); }} />
            </div>
            <div className="analysis-column"><ExperimentSummary result={result} step={step} /><ConvergenceChart steps={result.steps} currentStep={step.step} /></div>
          </div>
          <p className="screen-reader-summary" data-testid="plain-summary">{plainSummary}</p>
          {preset === limitationPreset ? <div className="limitation-callout"><div className="section-kicker">Observed limitation · real fixed point</div><h3>Additional computation can saturate.</h3><p>This state stabilizes at step {result.stableAtStep ?? '—'}. Requested updates after that increase the operation proxy, but do not change the state or answer.</p></div> : null}
        </section>

        <ComparisonMode puzzle={depthMattersPreset} />
        <SandboxGrid />
        <SelfCheck />

        <ResearchModule />
      </main>
      <footer><span>LATENTLAB · DataForge 2026 Pathway</span><span>Local computation. No account. No analytics.</span></footer>
    </>
  );
}
