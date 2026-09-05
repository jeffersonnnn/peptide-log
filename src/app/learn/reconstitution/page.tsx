import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { ReconWalkthrough } from "@/components/guide/recon-walkthrough";

export const metadata: Metadata = {
  title: "How to Reconstitute a Peptide | PeptideLog",
  description:
    "A safe, step-by-step walkthrough for reconstituting peptides: swabbing, drawing BAC water, equalizing pressure, mixing, and drawing your dose.",
  alternates: { canonical: "/learn/reconstitution" },
};

export default function ReconstitutionPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      <PageHeader
        crumbs={[{ label: "Learn", href: "/learn" }, { label: "How to Reconstitute" }]}
        eyebrow="Walkthrough"
        title={
          <>
            How to <span className="text-[var(--accent)]">reconstitute</span>
          </>
        }
        subtitle="Follow every step in order. Work on a clean surface with clean hands."
      />

      <ReconWalkthrough />

      <div className="mt-8 panel-glass p-5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">
            Not sure how much BAC water to add?
          </p>
          <p className="text-[var(--text-dim)] text-xs mt-0.5">
            The calculator works it out from your vial and dose.
          </p>
        </div>
        <Link
          href="/calculator"
          className="shrink-0 inline-block px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-mono text-xs uppercase tracking-[0.1em] hover:opacity-90 transition-all"
        >
          Open Calculator
        </Link>
      </div>
    </div>
  );
}
