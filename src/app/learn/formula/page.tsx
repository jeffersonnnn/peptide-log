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
    <div className="max-w-3xl mx-auto px-5 sm:px-8">
      <PageHeader
        crumbs={[{ label: "Learn", href: "/learn" }, { label: "The formula" }]}
        eyebrow="Guide 1 of 3"
        title="The reconstitution formula"
        subtitle="Reconstitution means mixing dry peptide powder with bacteriostatic water so you can draw an exact dose. Here is the math, one step at a time. Change any number and every step updates."
      />

      <FormulaGuide />

      <div className="mt-10 rounded-2xl border border-[var(--border)] p-5 sm:p-6">
        <p className="text-sm text-white mb-3">The four equations</p>
        <ul className="space-y-2 text-sm font-mono text-[var(--text-secondary)] leading-relaxed">
          <li>Concentration = vial mg &divide; water mL &times; 1000, in mcg/mL</li>
          <li>Volume = dose mcg &divide; concentration mcg/mL, in mL</li>
          <li>Units = volume mL &times; 100, for a U100 syringe</li>
          <li>Doses per vial = vial mg &times; 1000 &divide; dose mcg</li>
        </ul>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <Link href="/calculator" className="rounded-2xl border border-[var(--border)] p-5 hover:border-[var(--border-strong)] transition-colors">
          <p className="text-white">Just want the answer?</p>
          <p className="text-[var(--text-dim)] text-sm mt-1">Use the calculator</p>
        </Link>
        <Link href="/learn/reconstitution" className="rounded-2xl border border-[var(--border)] p-5 hover:border-[var(--border-strong)] transition-colors">
          <p className="text-white">Ready to mix a vial?</p>
          <p className="text-[var(--text-dim)] text-sm mt-1">Next guide: how to reconstitute</p>
        </Link>
      </div>

      <p className="mt-10 text-xs text-[var(--text-faint)] leading-relaxed">
        Educational information only. Not medical advice. Research peptides are not
        approved for human use in many places. Know your local laws.
      </p>
    </div>
  );
}
