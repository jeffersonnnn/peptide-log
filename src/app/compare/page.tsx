"use client";
import { useState } from "react";
import { useAggregate } from "@/hooks/use-aggregate";
import { ComparisonView } from "@/components/compare/comparison-view";
import { PeptideFilter } from "@/components/compare/peptide-filter";
import { getPeptideById } from "@/data/peptides";
import { AuthGate } from "@/components/auth/auth-gate";

export default function ComparePage() {
  const [peptideId, setPeptideId] = useState("bpc-157");
  const { result, loading } = useAggregate(peptideId);
  const peptide = getPeptideById(peptideId);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10 overflow-x-hidden">
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-[var(--accent)]">Am I</span> Normal?
        </h1>
        <p className="text-[var(--text-dim)] text-sm mt-1">
          See how your side effects compare to the community
        </p>
      </div>

      <div className="mb-6">
        <PeptideFilter selectedId={peptideId} onSelect={setPeptideId} />
      </div>

      <AuthGate
        title="Sign in to see community data"
        description="Compare your side effects against everyone else logging this peptide."
      >
        <div className="panel-glass p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-24 bg-[var(--accent-faint)] rounded animate-pulse" />
                  <div className="h-2 w-full bg-[var(--accent-faint)] rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : result?.data ? (
            <ComparisonView
              data={result.data}
              peptideName={peptide?.name ?? peptideId}
            />
          ) : (
            <p className="text-[var(--text-faint)] text-sm text-center py-8">
              No data available for this peptide yet.
            </p>
          )}
        </div>
      </AuthGate>

      {result?.source === "demo" && (
        <p className="text-[10px] text-[var(--text-faint)] text-center mt-4 font-mono">
          Showing community averages. Real-time data available as more users log their cycles.
        </p>
      )}
    </div>
  );
}
