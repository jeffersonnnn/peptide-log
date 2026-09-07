"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { peptides } from "@/data/peptides";
import { presets } from "@/data/presets";
import { calculateReconstitution } from "@/lib/calculator";
import type { CalculatorOutput } from "@/types";

interface StackItem {
  peptideId: string;
  vialSizeMg: number;
  desiredDoseMcg: number;
  bacWaterMl: number;
}

interface StackResult extends StackItem {
  result: CalculatorOutput | null;
  peptideName: string;
}

export function StackMode() {
  const [items, setItems] = useState<StackItem[]>([]);
  const [open, setOpen] = useState(false);

  function addItem(peptideId: string, doseMcg?: number, vialMg?: number) {
    const pep = peptides.find((p) => p.id === peptideId);
    if (!pep) return;
    setItems((prev) => [
      ...prev,
      {
        peptideId,
        vialSizeMg: vialMg ?? pep.commonVialSizesMg[0],
        desiredDoseMcg: doseMcg ?? pep.typicalDoseRangeMcg[0],
        bacWaterMl: peptideId === "nad-plus" ? 10 : 2,
      },
    ]);
    setOpen(true);
  }

  function removeItem(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateItem(idx: number, field: keyof StackItem, value: number | string) {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  }

  function loadPreset(presetId: string) {
    const preset = presets.find((p) => p.id === presetId);
    if (!preset) return;
    setItems(
      preset.peptides.map((pp) => {
        return {
          peptideId: pp.peptideId,
          vialSizeMg: pp.defaultVialMg,
          desiredDoseMcg: pp.defaultDoseMcg,
          bacWaterMl: pp.peptideId === "nad-plus" ? 10 : 2,
        };
      })
    );
    setOpen(true);
  }

  const results: StackResult[] = items.map((item) => {
    const pep = peptides.find((p) => p.id === item.peptideId);
    return {
      ...item,
      peptideName: pep?.name ?? item.peptideId,
      result: calculateReconstitution(
        item.vialSizeMg,
        item.desiredDoseMcg,
        item.bacWaterMl,
        "u100-1ml"
      ),
    };
  });

  const totalDoses = results.reduce(
    (min, r) => (r.result ? Math.min(min, r.result.dosesPerVial) : min),
    Infinity
  );

  if (!open && items.length === 0) {
    return (
      <div className="mt-6">
        <button
          onClick={() => setOpen(true)}
          className="w-full py-3 rounded-xl bg-[var(--accent-faint)] border border-[var(--border)] text-[var(--text-dim)] font-mono text-sm hover:border-[var(--accent)]/30 hover:text-[var(--text-secondary)] transition-all"
        >
          + Build a Stack
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-[var(--text-dim)]">
          Stack Builder
        </h2>
        <button
          onClick={() => {
            setItems([]);
            setOpen(false);
          }}
          className="text-[10px] text-[var(--text-faint)] hover:text-[var(--text-dim)] font-mono"
        >
          Clear
        </button>
      </div>

      {/* Preset loaders */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => loadPreset(preset.id)}
            className="text-[10px] px-2.5 py-1 rounded-md font-mono bg-[var(--accent-faint)] text-[var(--text-dim)] border border-[var(--border)] hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-all"
          >
            Load {preset.name}
          </button>
        ))}
      </div>

      {/* Stack items */}
      <AnimatePresence>
        {results.map((item, idx) => (
          <motion.div
            key={idx}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="panel-glass p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <select
                  value={item.peptideId}
                  onChange={(e) => updateItem(idx, "peptideId", e.target.value)}
                  className="bg-transparent text-[var(--accent)] font-mono font-semibold text-sm outline-none cursor-pointer appearance-none"
                >
                  {peptides
                    .filter((p) => p.category !== "blend")
                    .map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#121214] text-white">
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>
              <button
                onClick={() => removeItem(idx)}
                className="text-[var(--text-faint)] hover:text-red-400 text-xs transition-colors"
              >
                remove
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[9px] text-[var(--text-faint)] font-mono mb-1">
                  Vial (mg)
                </label>
                <input
                  type="number"
                  value={item.vialSizeMg || ""}
                  onChange={(e) => updateItem(idx, "vialSizeMg", Number(e.target.value))}
                  className="w-full bg-[var(--accent-faint)] border border-[var(--border)] rounded px-2 py-1.5 text-white font-mono text-xs outline-none focus:border-[var(--accent)]/30"
                />
              </div>
              <div>
                <label className="block text-[9px] text-[var(--text-faint)] font-mono mb-1">
                  Dose (mcg)
                </label>
                <input
                  type="number"
                  value={item.desiredDoseMcg || ""}
                  onChange={(e) => updateItem(idx, "desiredDoseMcg", Number(e.target.value))}
                  className="w-full bg-[var(--accent-faint)] border border-[var(--border)] rounded px-2 py-1.5 text-white font-mono text-xs outline-none focus:border-[var(--accent)]/30"
                />
              </div>
              <div>
                <label className="block text-[9px] text-[var(--text-faint)] font-mono mb-1">
                  BAC (mL)
                </label>
                <input
                  type="number"
                  value={item.bacWaterMl || ""}
                  onChange={(e) => updateItem(idx, "bacWaterMl", Number(e.target.value))}
                  step={0.5}
                  className="w-full bg-[var(--accent-faint)] border border-[var(--border)] rounded px-2 py-1.5 text-white font-mono text-xs outline-none focus:border-[var(--accent)]/30"
                />
              </div>
            </div>

            {item.result && (
              <div className="flex gap-4 text-xs font-mono">
                <span>
                  Draw: <span className="text-[var(--accent)] font-semibold">{item.result.unitsToDrawPerDose} units</span>
                </span>
                <span>
                  Vol: <span className="text-[var(--text-secondary)]">{item.result.mlToDrawPerDose} mL</span>
                </span>
                <span>
                  Doses: <span className="text-[var(--text-secondary)]">{item.result.dosesPerVial}</span>
                </span>
              </div>
            )}

            {item.result?.warning && (
              <p className="text-amber-400 text-[10px] font-mono">
                ⚠️ {item.result.warning}
              </p>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add button */}
      <button
        onClick={() => addItem("bpc-157")}
        className="w-full py-2 rounded-lg bg-[var(--accent-faint)] border border-dashed border-[var(--border)] text-[var(--text-faint)] font-mono text-xs hover:border-[var(--accent)]/30 hover:text-[var(--text-dim)] transition-all"
      >
        + Add Peptide to Stack
      </button>

      {/* Stack summary */}
      {results.length >= 2 && (
        <div className="panel-glass-accent p-4">
          <p className="text-xs text-[var(--text-dim)] mb-2">
            Stack Summary
          </p>
          <div className="space-y-1.5 text-xs font-mono">
            {results.map((r) => (
              <div key={r.peptideId} className="flex justify-between">
                <span className="text-[var(--text-secondary)]">{r.peptideName}</span>
                <span className="text-[var(--accent)]">
                  {r.result?.unitsToDrawPerDose ?? "—"} units
                </span>
              </div>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <div className="flex justify-between">
              <span className="text-[var(--text-dim)]">Total draw per session</span>
              <span className="text-[var(--accent)] font-semibold">
                {results
                  .reduce((sum, r) => sum + (r.result?.unitsToDrawPerDose ?? 0), 0)
                  .toFixed(1)}{" "}
                units
              </span>
            </div>
            {totalDoses < Infinity && (
              <div className="flex justify-between">
                <span className="text-[var(--text-dim)]">Limiting vial lasts</span>
                <span className="text-[var(--text-secondary)]">{totalDoses} sessions</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
