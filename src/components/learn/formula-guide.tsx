"use client";
import { useState } from "react";
import { syringeTypes, getSyringeById } from "@/data/syringe-types";

/** Format a number with a sensible number of decimals, no trailing zeros. */
function fmt(n: number, max = 2): string {
  if (!isFinite(n)) return "—";
  const r = Number(n.toFixed(max));
  return r.toLocaleString(undefined, { maximumFractionDigits: max });
}

interface FieldProps {
  label: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
  step?: string;
}

function Field({ label, unit, value, onChange, step }: FieldProps) {
  return (
    <label className="block">
      <span className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-1.5">
        {label}
      </span>
      <div className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] focus-within:border-[var(--accent)] transition-colors">
        <input
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-2.5 text-sm font-mono text-[var(--text)] outline-none"
        />
        <span className="px-3 text-[11px] font-mono text-[var(--text-faint)] shrink-0">
          {unit}
        </span>
      </div>
    </label>
  );
}

interface StepProps {
  n: number;
  title: string;
  formula: React.ReactNode;
  substituted: React.ReactNode;
  result: React.ReactNode;
  note?: string;
}

function Step({ n, title, formula, substituted, result, note }: StepProps) {
  return (
    <div className="panel-glass p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="shrink-0 w-6 h-6 rounded-md bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[11px] font-mono font-bold text-[var(--accent)]">
          {n}
        </span>
        <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
      </div>
      <div className="space-y-2 pl-8">
        <div>
          <p className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-faint)] mb-1">
            Formula
          </p>
          <p className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed">
            {formula}
          </p>
        </div>
        <div>
          <p className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-faint)] mb-1">
            Your numbers
          </p>
          <p className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed break-words">
            {substituted}
          </p>
        </div>
        <div className="pt-1">
          <p className="text-sm font-mono font-bold text-[var(--accent)] break-words">
            = {result}
          </p>
        </div>
        {note && (
          <p className="text-[11px] text-[var(--text-dim)] leading-relaxed pt-1">{note}</p>
        )}
      </div>
    </div>
  );
}

export function FormulaGuide() {
  const [vial, setVial] = useState("10");
  const [dose, setDose] = useState("500");
  const [bac, setBac] = useState("2");
  const [syringeId, setSyringeId] = useState("u100-1ml");

  const vialMg = parseFloat(vial) || 0;
  const doseMcg = parseFloat(dose) || 0;
  const bacMl = parseFloat(bac) || 0;
  const syringe = getSyringeById(syringeId)!;
  const unitsPerMl = syringe.totalUnits / syringe.totalMl; // e.g. 100 units/mL for U100

  const valid = vialMg > 0 && doseMcg > 0 && bacMl > 0;

  const concMgMl = valid ? vialMg / bacMl : 0;
  const concMcgMl = concMgMl * 1000;
  const mlToDraw = valid && concMcgMl > 0 ? doseMcg / concMcgMl : 0;
  const unitsToDraw = mlToDraw * unitsPerMl;
  const dosesPerVial = valid && doseMcg > 0 ? (vialMg * 1000) / doseMcg : 0;

  const overCapacity = unitsToDraw > syringe.totalUnits;
  const tooSmall = valid && unitsToDraw > 0 && unitsToDraw < 1;

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="panel-glass p-5">
        <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-4">
          Plug in your own numbers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Field label="Vial size" unit="mg" value={vial} onChange={setVial} step="0.5" />
          <Field label="Desired dose" unit="mcg" value={dose} onChange={setDose} step="10" />
          <Field label="BAC water" unit="mL" value={bac} onChange={setBac} step="0.5" />
          <label className="block">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-1.5">
              Syringe
            </span>
            <select
              value={syringeId}
              onChange={(e) => setSyringeId(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] px-2.5 py-2.5 text-xs font-mono text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors"
            >
              {syringeTypes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {!valid && (
        <p className="text-xs text-[var(--text-dim)] text-center py-2">
          Enter a vial size, dose, and BAC water amount above to see the formula worked out.
        </p>
      )}

      {valid && (
        <>
          <Step
            n={1}
            title="Find the concentration"
            formula={<>Concentration (mcg/mL) = Vial (mg) &divide; BAC water (mL) &times; 1000</>}
            substituted={<>{fmt(vialMg)} mg &divide; {fmt(bacMl)} mL &times; 1000</>}
            result={<>{fmt(concMcgMl)} mcg/mL</>}
            note={`Every 1 mL of your reconstituted vial holds ${fmt(concMcgMl)} mcg of peptide (${fmt(concMgMl, 3)} mg/mL).`}
          />
          <Step
            n={2}
            title="Find the volume for one dose"
            formula={<>Volume (mL) = Desired dose (mcg) &divide; Concentration (mcg/mL)</>}
            substituted={<>{fmt(doseMcg)} mcg &divide; {fmt(concMcgMl)} mcg/mL</>}
            result={<>{fmt(mlToDraw, 4)} mL</>}
          />
          <Step
            n={3}
            title="Convert volume to syringe units"
            formula={<>Units = Volume (mL) &times; {fmt(unitsPerMl)} units per mL</>}
            substituted={<>{fmt(mlToDraw, 4)} mL &times; {fmt(unitsPerMl)}</>}
            result={
              <span className={overCapacity ? "text-[var(--accent-red)]" : undefined}>
                {fmt(unitsToDraw, 1)} units
              </span>
            }
            note={`Draw to the ${fmt(unitsToDraw, 0)} mark on your ${syringe.label}. ${unitsPerMl} units = 1 mL on a U100 syringe.`}
          />
          <Step
            n={4}
            title="Find how many doses per vial"
            formula={<>Doses = Vial (mg) &times; 1000 &divide; Dose (mcg)</>}
            substituted={<>{fmt(vialMg)} mg &times; 1000 &divide; {fmt(doseMcg)} mcg</>}
            result={<>{Math.floor(dosesPerVial)} doses</>}
            note={`Your ${fmt(vialMg)} mg vial gives about ${Math.floor(dosesPerVial)} full doses of ${fmt(doseMcg)} mcg.`}
          />

          {overCapacity && (
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <p className="text-amber-400 text-xs font-mono leading-relaxed">
                ⚠️ {fmt(unitsToDraw, 0)} units is more than your syringe holds
                ({syringe.totalUnits} units). Use more BAC water, or a larger syringe.
              </p>
            </div>
          )}
          {tooSmall && (
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <p className="text-amber-400 text-xs font-mono leading-relaxed">
                ⚠️ This dose is under 1 unit ({fmt(unitsToDraw, 1)}). Use less BAC water for
                a more precise, easier-to-read draw.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
