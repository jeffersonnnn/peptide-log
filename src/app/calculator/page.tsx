import type { Metadata } from "next";
import Link from "next/link";
import { ReconCalculator } from "@/components/calculator/recon-calculator";

export const metadata: Metadata = {
  title: "Reconstitution Calculator | PeptideLog",
  description:
    "Enter your vial size, BAC water, and desired dose. Get the exact number of syringe units to draw, doses per vial, and cost per dose.",
  alternates: { canonical: "/calculator" },
};

export default function CalculatorPage() {
  return (
    <div>
      <ReconCalculator />
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <div className="panel-glass p-5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">
              Want to understand the math?
            </p>
            <p className="text-[var(--text-dim)] text-xs mt-0.5">
              The calculator gives the answer. The formula guide shows every step.
            </p>
          </div>
          <Link
            href="/learn/formula"
            className="shrink-0 inline-block px-4 py-2 rounded-lg border border-[var(--accent-dim)] text-[var(--accent)] font-mono text-xs uppercase tracking-[0.1em] hover:bg-[var(--accent)] hover:text-white transition-all"
          >
            Learn the Formula
          </Link>
        </div>
      </div>
    </div>
  );
}
