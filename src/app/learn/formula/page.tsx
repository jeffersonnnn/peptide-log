import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { FormulaGuide } from "@/components/learn/formula-guide";

export const metadata: Metadata = {
  title: "The Reconstitution Formula | PeptideLog",
  description:
    "Learn the peptide dosing formula step by step. Concentration, volume to draw, syringe units, and doses per vial — worked out with your own numbers.",
  alternates: { canonical: "/learn/formula" },
};

export default function FormulaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <PageHeader
        crumbs={[{ label: "Learn", href: "/learn" }, { label: "The Formula" }]}
        eyebrow="Guide"
        title={
          <>
            The reconstitution <span className="text-[var(--accent)]">formula</span>
          </>
        }
        subtitle="Reconstitution means mixing dry peptide powder with bacteriostatic (BAC) water so you can draw an exact dose. Here is the math, one step at a time. Change any number below and every step updates."
      />

      <FormulaGuide />

      {/* Reference block */}
      <div className="mt-8 panel-glass p-5">
        <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-3">
          The four equations
        </p>
        <ul className="space-y-2 text-xs font-mono text-[var(--text-secondary)] leading-relaxed">
          <li>Concentration = Vial mg &divide; BAC mL &times; 1000 &rarr; mcg/mL</li>
          <li>Volume = Dose mcg &divide; Concentration mcg/mL &rarr; mL</li>
          <li>Units = Volume mL &times; 100 (for a U100 syringe)</li>
          <li>Doses per vial = Vial mg &times; 1000 &divide; Dose mcg</li>
        </ul>
      </div>

      {/* Cross links */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
          href="/calculator"
          className="flex-1 panel-glass p-4 hover:border-[var(--accent)]/30 transition-colors"
        >
          <p className="text-sm font-semibold text-[var(--text)]">Just want the answer?</p>
          <p className="text-[var(--text-dim)] text-xs mt-0.5">
            Use the calculator &rarr;
          </p>
        </Link>
        <Link
          href="/learn/reconstitution"
          className="flex-1 panel-glass p-4 hover:border-[var(--accent)]/30 transition-colors"
        >
          <p className="text-sm font-semibold text-[var(--text)]">Ready to mix a vial?</p>
          <p className="text-[var(--text-dim)] text-xs mt-0.5">
            See the step-by-step walkthrough &rarr;
          </p>
        </Link>
      </div>

      <p className="mt-8 text-[10px] text-[var(--text-faint)] leading-relaxed text-center">
        Educational information only. Not medical advice. Research peptides are not
        approved for human use in many places — know your local laws.
      </p>
    </div>
  );
}
