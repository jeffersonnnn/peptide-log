"use client";
import type { Peptide } from "@/types";
import { syringeTypes } from "@/data/syringe-types";

interface DoseInputsProps {
  peptide: Peptide | undefined;
  vialSizeMg: number;
  desiredDoseMcg: number;
  bacWaterMl: number;
  syringeTypeId: string;
  pricePerVial?: number;
  onVialChange: (v: number) => void;
  onDoseChange: (v: number) => void;
  onBacChange: (v: number) => void;
  onSyringeChange: (v: string) => void;
  onPriceChange: (v: number | undefined) => void;
}

function NumberInput({
  label,
  value,
  onChange,
  suffix,
  min = 0,
  step = 1,
  presets,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix: string;
  min?: number;
  step?: number;
  presets?: number[];
}) {
  return (
    <div>
      <label className="block text-xs text-[var(--text-dim)] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          step={step}
          className="w-full panel-glass px-4 py-3 pr-14 text-[var(--accent)] font-mono font-semibold text-lg outline-none focus:border-[var(--accent-dim)] transition-colors"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)] text-xs font-mono">
          {suffix}
        </span>
      </div>
      {presets && presets.length > 0 && (
        <div className="flex gap-1.5 mt-2">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`text-xs px-2.5 py-1 rounded-md font-mono transition-colors ${
                value === p
                  ? "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30"
                  : "bg-[var(--accent-faint)] text-[var(--text-dim)] hover:text-[var(--text-secondary)] border border-white/5"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function DoseInputs({
  peptide,
  vialSizeMg,
  desiredDoseMcg,
  bacWaterMl,
  syringeTypeId,
  pricePerVial,
  onVialChange,
  onDoseChange,
  onBacChange,
  onSyringeChange,
  onPriceChange,
}: DoseInputsProps) {
  return (
    <div className="grid gap-4">
      <NumberInput
        label="Vial size"
        value={vialSizeMg}
        onChange={onVialChange}
        suffix="mg"
        step={1}
        presets={peptide?.commonVialSizesMg}
      />
      <NumberInput
        label="Desired dose"
        value={desiredDoseMcg}
        onChange={onDoseChange}
        suffix="mcg"
        step={50}
        presets={
          peptide
            ? [peptide.typicalDoseRangeMcg[0], peptide.typicalDoseRangeMcg[1]]
            : undefined
        }
      />
      <NumberInput
        label="Bacteriostatic water"
        value={bacWaterMl}
        onChange={onBacChange}
        suffix="mL"
        step={0.5}
        presets={[1, 2, 3, 5]}
      />
      <div>
        <label className="block text-xs text-[var(--text-dim)] mb-1.5">
          Syringe type
        </label>
        <select
          value={syringeTypeId}
          onChange={(e) => onSyringeChange(e.target.value)}
          className="w-full panel-glass px-4 py-3 text-[var(--accent)] font-mono font-semibold text-sm outline-none focus:border-[var(--accent-dim)] transition-colors bg-transparent appearance-none cursor-pointer"
        >
          {syringeTypes.map((s) => (
            <option key={s.id} value={s.id} className="bg-[#121214] text-white">
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <NumberInput
        label="Price per vial, optional"
        value={pricePerVial ?? 0}
        onChange={(v) => onPriceChange(v > 0 ? v : undefined)}
        suffix="$"
        step={1}
      />
    </div>
  );
}
