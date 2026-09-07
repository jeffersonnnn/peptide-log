"use client";
import { useState } from "react";
import { useAggregate } from "@/hooks/use-aggregate";
import { PageHeader } from "@/components/layout/page-header";
import { ComparisonView } from "@/components/compare/comparison-view";
import { PeptideFilter } from "@/components/compare/peptide-filter";
import { getPeptideById } from "@/data/peptides";
import { AuthGate } from "@/components/auth/auth-gate";

export default function ComparePage() {
  const [peptideId, setPeptideId] = useState("bpc-157");
  const { result, loading } = useAggregate(peptideId);
  const peptide = getPeptideById(peptideId);

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 overflow-x-hidden">
      <PageHeader
        eyebrow="Community"
        title="Am I normal?"
        subtitle="See how often other people logging the same peptide report each side effect. Aggregate data only, never individual entries."
      />

      <div className="mb-8">
        <PeptideFilter selectedId={peptideId} onSelect={setPeptideId} />
      </div>

      <AuthGate
        title="Sign in to see community data"
        description="Compare your side effects against everyone else logging this peptide."
      >
        <div className="rounded-2xl border border-[var(--border)] p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
                  <div className="h-2 w-full bg-white/5 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : result?.data ? (
            <ComparisonView data={result.data} peptideName={peptide?.name ?? peptideId} />
          ) : (
            <p className="text-[var(--text-dim)] text-sm text-center py-8">
              No entries for this peptide yet. Log a cycle to be the first.
            </p>
          )}
        </div>
      </AuthGate>

      {result?.source === "demo" && (
        <p className="text-xs text-[var(--text-faint)] mt-4">
          Showing community averages. Live figures appear as more people log their cycles.
        </p>
      )}
    </div>
  );
}
