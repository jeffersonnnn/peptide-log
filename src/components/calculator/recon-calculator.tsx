"use client";
import { useCalculator } from "@/hooks/use-calculator";
import { PeptideSelector } from "./peptide-selector";
import { DoseInputs } from "./dose-inputs";
import { CalculationResults } from "./calculation-results";
import { PresetButtons } from "./preset-buttons";
import { SyringeVisual } from "@/components/syringe/syringe-visual";
import { UsageCounter } from "@/components/layout/usage-counter";
import { PageHeader } from "@/components/layout/page-header";
import { StackMode } from "./stack-mode";
import { AuthGate } from "@/components/auth/auth-gate";
import { ShareButton } from "@/components/protocol/share-button";

const storageWord = { fridge: "Refrigerate", freezer: "Freeze", room: "Room temperature" } as const;

export function ReconCalculator() {
  const calc = useCalculator();

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 overflow-x-hidden">
      <PageHeader
        eyebrow="Calculator"
        title="Reconstitution calculator"
        subtitle="Enter the vial, the water, and the dose. The syringe shows the line to draw to."
        aside={<UsageCounter />}
      />

      {/* The instrument. Full width, sticks under the nav on desktop while you edit. */}
      <div className="canvas rounded-[24px] p-4 sm:p-6">
        <div className="flex items-center justify-between text-xs text-[var(--text-dim)] px-1">
          <span>{calc.selectedPeptide?.name ?? "Peptide"}</span>
          <span>{calc.syringeTypeId.startsWith("u100") ? "U100 insulin syringe" : "Standard 1 mL syringe"}</span>
        </div>
        <SyringeVisual
          drawLinePosition={calc.result?.drawLinePosition ?? 0}
          unitsToDrawPerDose={calc.result?.unitsToDrawPerDose ?? 0}
          syringeTypeId={calc.syringeTypeId}
          warning={calc.result?.warning}
          className="w-full max-w-[860px] mx-auto"
        />
      </div>

      <div className="mt-6">
        <AuthGate
          compact
          title="Sign in for preset stacks"
          description="One-tap popular stacks like the Wolverine Stack."
        >
          <div className="overflow-x-auto -mx-4 px-4">
            <PresetButtons onSelect={calc.selectPeptide} />
          </div>
        </AuthGate>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
        <div className="w-full min-w-0 space-y-4">
          <PeptideSelector selectedId={calc.peptideId} onSelect={calc.selectPeptide} />
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
        </div>

        <div className="w-full min-w-0 space-y-4">
          <div id="calc-result-card">
            <CalculationResults result={calc.result} />
          </div>
          {calc.result && (
            <AuthGate
              compact
              overlay={false}
              title="Sign in to save and share"
              description="Copy a shareable image of this result."
            >
              <ShareButton cardElementId="calc-result-card" />
            </AuthGate>
          )}
          {calc.selectedPeptide && (
            <div className="rounded-2xl border border-[var(--border)] p-4 space-y-3">
              <p className="text-xs text-[var(--text-dim)]">Storage for {calc.selectedPeptide.name}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-secondary)]">
                  {storageWord[calc.selectedPeptide.storage]}
                </span>
                {calc.selectedPeptide.uvSensitive && (
                  <span className="px-2.5 py-1 rounded-full border border-[var(--accent-amber)]/30 text-[var(--accent-amber)]">
                    Keep out of light
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-secondary)]">
                  {calc.selectedPeptide.shelfLifeReconstitutedDays} days once mixed
                </span>
              </div>
              <p className="text-[var(--text-faint)] text-xs leading-relaxed break-words">
                {calc.selectedPeptide.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <AuthGate
          title="Sign in to build stacks"
          description="Calculate several peptides at once and save them as a stack."
        >
          <StackMode />
        </AuthGate>
      </div>
    </div>
  );
}
