"use client";
import { useRef } from "react";
import type { CycleEntry } from "@/types";
import { getPeptideById } from "@/data/peptides";
import { sideEffects } from "@/data/side-effects";
import { format } from "date-fns";

interface ProtocolCardProps {
  entry: CycleEntry;
}

export function ProtocolCard({ entry }: ProtocolCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const pep = getPeptideById(entry.peptides[0]?.peptideId);
  const dateStr = format(new Date(entry.date), "MMM d, yyyy");

  return (
    <div
      ref={cardRef}
      id="protocol-card"
      className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #151515 0%, #1F2224 50%, #151515 100%)",
      }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--accent-dim) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[var(--text-faint)] font-mono uppercase tracking-widest">
              Protocol Log
            </p>
            <p className="text-[var(--text-dim)] text-xs font-mono mt-0.5">{dateStr}</p>
          </div>
          <div className="text-right">
            <p className="text-[var(--accent)] font-mono font-bold text-lg">
              {pep?.name ?? entry.peptides[0]?.peptideId}
            </p>
            <p className="text-[var(--text-dim)] text-xs font-mono">
              {entry.peptides[0]?.doseMcg}mcg
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-dim)] to-transparent" />

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-[10px] text-[var(--text-faint)] font-mono uppercase">Pain</p>
            <p
              className="text-2xl font-mono font-bold"
              style={{
                color: entry.painLevel <= 3 ? "#E4E2D8" : entry.painLevel <= 6 ? "#A7B4BA" : "#9B9B9B",
              }}
            >
              {entry.painLevel}
              <span className="text-xs text-[var(--text-faint)]">/10</span>
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-[var(--text-faint)] font-mono uppercase">Energy</p>
            <p
              className="text-2xl font-mono font-bold"
              style={{
                color: entry.energyLevel >= 7 ? "#E4E2D8" : entry.energyLevel >= 4 ? "#A7B4BA" : "#9B9B9B",
              }}
            >
              {entry.energyLevel}
              <span className="text-xs text-[var(--text-faint)]">/10</span>
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-[var(--text-faint)] font-mono uppercase">Site</p>
            <p className="text-xs text-[var(--text-secondary)] font-mono mt-1 capitalize">
              {(entry.peptides[0]?.injectionSite || "abdomen").replace(/-/g, " ")}
            </p>
          </div>
        </div>

        {/* Side effects */}
        {entry.sideEffects.length > 0 && (
          <div>
            <p className="text-[10px] text-[var(--text-faint)] font-mono uppercase tracking-wider mb-2">
              Side Effects Reported
            </p>
            <div className="flex flex-wrap gap-1.5">
              {entry.sideEffects.map((seId) => {
                const se = sideEffects.find((s) => s.id === seId);
                return (
                  <span
                    key={seId}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-[var(--tint)] border border-[var(--border-strong)] font-mono"
                  >
                    {se?.label ?? seId}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Notes */}
        {entry.notes && (
          <div>
            <p className="text-[10px] text-[var(--text-faint)] font-mono uppercase tracking-wider mb-1">
              Notes
            </p>
            <p className="text-[var(--text-dim)] text-xs leading-relaxed">
              {entry.notes}
            </p>
          </div>
        )}

        {/* Watermark */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          <span className="text-[10px] text-[var(--text-faint)] font-mono">
            peptidelog.app
          </span>
        </div>
      </div>
    </div>
  );
}
