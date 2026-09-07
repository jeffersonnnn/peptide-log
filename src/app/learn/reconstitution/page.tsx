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
    <div className="max-w-3xl mx-auto px-5 sm:px-8">
      <PageHeader
        crumbs={[{ label: "Learn", href: "/learn" }, { label: "How to reconstitute" }]}
        eyebrow="Guide 2 of 3"
        title="How to reconstitute"
        subtitle="Follow every step in order. Work on a clean surface with clean hands."
      />

      <ReconWalkthrough />

      <div className="mt-10 rounded-2xl border border-[var(--border)] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <p className="text-white">Not sure how much water to add?</p>
          <p className="text-[var(--text-dim)] text-sm mt-1">
            The calculator works it out from your vial and dose.
          </p>
        </div>
        <Link href="/calculator" className="btn-primary shrink-0">
          Open the calculator
        </Link>
      </div>
    </div>
  );
}
