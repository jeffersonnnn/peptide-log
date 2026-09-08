"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { peptides } from "@/data/peptides";
import { BodyDiagram } from "@/components/body/body-diagram";
import { SideEffectChips } from "./side-effect-chips";
import { ProgressSliders } from "./progress-sliders";
import type { CycleEntry } from "@/types";

interface SideEffectFormProps {
  onSubmit: (entry: Omit<CycleEntry, "id" | "createdAt">) => void;
}

export function SideEffectForm({ onSubmit }: SideEffectFormProps) {
  const [peptideId, setPeptideId] = useState("bpc-157");
  const [doseMcg, setDoseMcg] = useState(250);
  const [injectionSite, setInjectionSite] = useState("");
  const [selectedSideEffects, setSelectedSideEffects] = useState<string[]>([]);
  const [painLevel, setPainLevel] = useState(3);
  const [energyLevel, setEnergyLevel] = useState(6);
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function toggleSideEffect(id: string) {
    setSelectedSideEffects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleSubmit() {
    const entry: Omit<CycleEntry, "id" | "createdAt"> = {
      date: new Date().toISOString().split("T")[0],
      peptides: [
        {
          peptideId,
          doseMcg,
          injectionSite: injectionSite || "abdomen",
        },
      ],
      sideEffects: selectedSideEffects,
      painLevel,
      energyLevel,
      weight: weight ? parseFloat(weight) : undefined,
      notes,
    };
    onSubmit(entry);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedSideEffects([]);
      setNotes("");
    }, 2000);
  }

  return (
    <div className="space-y-6">
      {/* Peptide + Dose row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-[var(--text-dim)] mb-1.5">
            Peptide
          </label>
          <select
            value={peptideId}
            onChange={(e) => {
              setPeptideId(e.target.value);
              const pep = peptides.find((p) => p.id === e.target.value);
              if (pep) setDoseMcg(pep.typicalDoseRangeMcg[0]);
            }}
            className="w-full panel-glass px-3 py-2.5 text-[var(--accent)] font-mono text-sm outline-none bg-transparent appearance-none cursor-pointer"
          >
            {peptides.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#1B1B1B] text-white">
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[var(--text-dim)] mb-1.5">
            Dose
          </label>
          <div className="relative">
            <input
              type="number"
              value={doseMcg || ""}
              onChange={(e) => setDoseMcg(Number(e.target.value))}
              className="w-full panel-glass px-3 py-2.5 pr-12 text-[var(--accent)] font-mono text-sm outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)] text-xs font-mono">
              mcg
            </span>
          </div>
        </div>
      </div>

      {/* Body diagram */}
      <BodyDiagram
        selectedZone={injectionSite}
        onSelectZone={setInjectionSite}
      />

      {/* Side effects */}
      <SideEffectChips
        selected={selectedSideEffects}
        onToggle={toggleSideEffect}
      />

      {/* Progress sliders */}
      <ProgressSliders
        painLevel={painLevel}
        energyLevel={energyLevel}
        weight={weight}
        onPainChange={setPainLevel}
        onEnergyChange={setEnergyLevel}
        onWeightChange={setWeight}
      />

      {/* Notes */}
      <div>
        <label className="block text-xs text-[var(--text-dim)] mb-1.5">
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How was today's injection? Any observations..."
          rows={3}
          className="w-full panel-glass px-4 py-3 text-white text-sm outline-none resize-none placeholder-white/20 focus:border-[var(--accent-dim)] transition-colors"
        />
      </div>

      {/* Submit */}
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 rounded-xl text-center text-white font-mono text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, var(--gradient-from), var(--gradient-to))" }}
          >
            Entry logged
          </motion.div>
        ) : (
          <motion.button
            key="submit"
            onClick={handleSubmit}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            className="w-full py-3.5 rounded-xl text-white font-mono font-semibold text-sm transition-all shadow-lg shadow-[var(--accent-dim)]"
            style={{ background: "linear-gradient(135deg, var(--gradient-from), var(--gradient-to))" }}
          >
            Log Entry
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
