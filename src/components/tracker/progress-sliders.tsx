"use client";

interface ProgressSlidersProps {
  painLevel: number;
  energyLevel: number;
  weight: string;
  onPainChange: (v: number) => void;
  onEnergyChange: (v: number) => void;
  onWeightChange: (v: string) => void;
}

function Slider({
  label,
  value,
  onChange,
  leftLabel,
  rightLabel,
  color,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  leftLabel: string;
  rightLabel: string;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-xs text-[var(--text-dim)]">
          {label}
        </label>
        <span className="text-sm font-mono font-semibold" style={{ color }}>
          {value}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[9px] text-[var(--text-faint)] mt-0.5">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

export function ProgressSliders({
  painLevel,
  energyLevel,
  weight,
  onPainChange,
  onEnergyChange,
  onWeightChange,
}: ProgressSlidersProps) {
  return (
    <div className="space-y-5">
      <p className="text-xs text-[var(--text-dim)]">
        How are you feeling?
      </p>
      <Slider
        label="Pain Level"
        value={painLevel}
        onChange={onPainChange}
        leftLabel="None"
        rightLabel="Severe"
        color={painLevel <= 3 ? "#4ade80" : painLevel <= 6 ? "#facc15" : "#f87171"}
      />
      <Slider
        label="Energy Level"
        value={energyLevel}
        onChange={onEnergyChange}
        leftLabel="Exhausted"
        rightLabel="Peak"
        color={energyLevel >= 7 ? "#4ade80" : energyLevel >= 4 ? "#facc15" : "#f87171"}
      />
      <div>
        <label className="block text-xs text-[var(--text-dim)] mb-1.5">
          Weight (optional)
        </label>
        <div className="relative">
          <input
            type="number"
            value={weight}
            onChange={(e) => onWeightChange(e.target.value)}
            placeholder="—"
            className="w-full panel-glass px-4 py-2.5 pr-12 text-white font-mono text-sm outline-none focus:border-[var(--accent-dim)] transition-colors"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)] text-xs font-mono">
            lbs
          </span>
        </div>
      </div>
    </div>
  );
}
