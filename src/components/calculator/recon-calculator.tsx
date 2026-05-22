"use client";
import { useCalculator } from "@/hooks/use-calculator";
import { PeptideSelector } from "./peptide-selector";
import { DoseInputs } from "./dose-inputs";
import { CalculationResults } from "./calculation-results";
import { PresetButtons } from "./preset-buttons";
import { SyringeVisual } from "@/components/syringe/syringe-visual";
import { UsageCounter } from "@/components/layout/usage-counter";
import { StackMode } from "./stack-mode";

export function ReconCalculator() {
  const calc = useCalculator();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-10 overflow-x-hidden">
      {/* Header */}
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-[var(--accent)]">Peptide</span>Log
        </h1>
        <p className="text-[var(--text-dim)] text-sm mt-1">
          Reconstitution calculator with visual syringe guide
        </p>
        <div className="mt-3">
          <UsageCounter />
        </div>
      </div>

      {/* Presets */}
      <div className="mb-6 overflow-x-auto -mx-4 px-4">
        <PresetButtons onSelect={calc.selectPeptide} />
      </div>

      {/* Mobile: stacked layout. Desktop: 3-col */}
      <div className="flex flex-col md:grid md:grid-cols-[1fr,auto,1fr] gap-6 items-start">
        {/* Inputs */}
        <div className="w-full min-w-0 space-y-4">
          <PeptideSelector
            selectedId={calc.peptideId}
            onSelect={calc.selectPeptide}
          />
          <DoseInputs
            peptide={calc.selectedPeptide}
            vialSizeMg={calc.vialSizeMg}
            desiredDoseMcg={calc.desiredDoseMcg}
            bacWaterMl={calc.bacWaterMl}
            syringeTypeId={calc.syringeTypeId}
            pricePerVial={calc.pricePerVial}
            onVialChange={calc.setVialSizeMg}
            onDoseChange={calc.setDesiredDoseMcg}
            onBacChange={calc.setBacWaterMl}
            onSyringeChange={calc.setSyringeTypeId}
            onPriceChange={calc.setPricePerVial}
          />
          {/* Storage info */}
          {calc.selectedPeptide && (
            <div className="panel-glass p-4 space-y-2">
              <p className="text-[10px] text-[var(--text-dim)] font-mono uppercase tracking-wider">
                Storage
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {calc.selectedPeptide.storage === "fridge"
                    ? "🧊 Refrigerate"
                    : calc.selectedPeptide.storage === "freezer"
                    ? "❄️ Freeze"
                    : "🏠 Room Temp"}
                </span>
                {calc.selectedPeptide.uvSensitive && (
                  <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    ☀️ UV Sensitive
                  </span>
                )}
                <span className="px-2 py-1 rounded bg-[var(--accent-faint)] text-[var(--text-dim)] border border-[var(--border)]">
                  {calc.selectedPeptide.shelfLifeReconstitutedDays}d shelf life
                </span>
              </div>
              <p className="text-[var(--text-faint)] text-[11px] leading-relaxed mt-2 break-words">
                {calc.selectedPeptide.notes}
              </p>
            </div>
          )}
        </div>

        {/* Syringe */}
        <div className="flex justify-center w-full md:w-auto md:sticky md:top-8">
          <SyringeVisual
            drawLinePosition={calc.result?.drawLinePosition ?? 0}
            unitsToDrawPerDose={calc.result?.unitsToDrawPerDose ?? 0}
            syringeTypeId={calc.syringeTypeId}
            warning={calc.result?.warning}
          />
        </div>

        {/* Results */}
        <div className="w-full min-w-0">
          <CalculationResults result={calc.result} />
        </div>
      </div>

      {/* Stack Mode */}
      <StackMode />
    </div>
  );
}
