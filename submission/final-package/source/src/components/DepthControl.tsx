const DEPTHS = [1, 2, 3, 4, 5, 6, 8, 12, 16] as const;

interface DepthControlProps {
  depth: number;
  onChange: (depth: number) => void;
}

export function DepthControl({ depth, onChange }: DepthControlProps) {
  return (
    <fieldset className="depth-control">
      <legend>Reasoning depth</legend>
      <div className="depth-options">
        {DEPTHS.map((value) => (
          <button
            type="button"
            className={depth === value ? 'is-selected' : ''}
            aria-pressed={depth === value}
            key={value}
            onClick={() => onChange(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <p className="control-note">Each number runs that many real recurrent updates.</p>
    </fieldset>
  );
}
