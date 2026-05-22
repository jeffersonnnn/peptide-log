"use client";
import { useState } from "react";
import { peptides } from "@/data/peptides";
import { ReconWalkthrough } from "@/components/guide/recon-walkthrough";
import { StorageCard } from "@/components/guide/storage-card";
import { PeptideInfoCard } from "@/components/guide/peptide-info-card";

type Tab = "walkthrough" | "storage" | "peptides";

export default function GuidePage() {
  const [tab, setTab] = useState<Tab>("walkthrough");
  const nonBlends = peptides.filter((p) => p.category !== "blend");
  const blends = peptides.filter((p) => p.category === "blend");

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10 overflow-x-hidden">
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-[var(--accent)]">Peptide</span> Guide
        </h1>
        <p className="text-[var(--text-dim)] text-sm mt-1">
          Everything you need to know about reconstitution and storage
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 p-1 rounded-xl bg-[var(--accent-faint)] mb-6 overflow-x-auto">
        {(
          [
            { id: "walkthrough", label: "How to Reconstitute" },
            { id: "storage", label: "Storage Guide" },
            { id: "peptides", label: "Peptide Library" },
          ] as { id: Tab; label: string }[]
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
              tab === t.id
                ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                : "text-[var(--text-dim)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "walkthrough" && <ReconWalkthrough />}

      {tab === "storage" && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">
            <span className="text-[var(--accent)]">Storage</span> Quick Reference
          </h2>
          <p className="text-[var(--text-dim)] text-xs mb-4">
            How to store each peptide after reconstitution. Keep BAC water out of UV light.
          </p>

          <h3 className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mt-6 mb-2">
            Individual Peptides
          </h3>
          <div className="grid gap-3">
            {nonBlends.map((p) => (
              <StorageCard key={p.id} peptide={p} />
            ))}
          </div>

          <h3 className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mt-6 mb-2">
            Blend Stacks
          </h3>
          <div className="grid gap-3">
            {blends.map((p) => (
              <StorageCard key={p.id} peptide={p} />
            ))}
          </div>
        </div>
      )}

      {tab === "peptides" && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">
            <span className="text-[var(--accent)]">Peptide</span> Library
          </h2>
          <p className="text-[var(--text-dim)] text-xs mb-4">
            Dose ranges, frequency, storage, and stack compatibility for 17 peptides.
          </p>
          <div className="grid gap-4">
            {peptides.map((p) => (
              <PeptideInfoCard key={p.id} peptide={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
