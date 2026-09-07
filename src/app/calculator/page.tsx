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
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10">
        <div className="rounded-2xl border border-[var(--border)] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <p className="text-base text-white">Want to see the math?</p>
            <p className="text-[var(--text-dim)] text-sm mt-1">
              The formula guide works every step with your own numbers.
            </p>
          </div>
          <Link href="/learn/formula" className="btn-secondary shrink-0">
            Read the formula
          </Link>
        </div>
      </div>
    </div>
  );
}
