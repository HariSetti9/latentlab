interface TracePlayerProps {
  currentStep: number;
  maximumStep: number;
  playing: boolean;
  onStepChange: (step: number) => void;
  onPlayingChange: (playing: boolean) => void;
}

export function TracePlayer({ currentStep, maximumStep, playing, onStepChange, onPlayingChange }: TracePlayerProps) {
  return (
    <div className="trace-player" aria-label="Trace playback">
      <button type="button" onClick={() => onStepChange(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>Previous</button>
      <button type="button" className="play-button" onClick={() => onPlayingChange(!playing)} aria-pressed={playing}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <button type="button" onClick={() => onStepChange(Math.min(maximumStep, currentStep + 1))} disabled={currentStep === maximumStep}>Next</button>
      <button type="button" onClick={() => { onPlayingChange(false); onStepChange(0); }}>Reset</button>
      <label className="step-slider">
        <span>Inspect step {currentStep} of {maximumStep}</span>
        <input type="range" min="0" max={maximumStep} value={currentStep} onChange={(event) => onStepChange(Number(event.target.value))} />
      </label>
    </div>
  );
}
