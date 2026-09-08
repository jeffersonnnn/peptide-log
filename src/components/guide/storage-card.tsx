"use client";
import type { Peptide } from "@/types";

interface StorageCardProps {
  peptide: Peptide;
}

export function StorageCard({ peptide }: StorageCardProps) {
  return (
    <div className="panel-glass p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-mono font-semibold text-[var(--accent)] text-sm">
          {peptide.name}
        </h3>
        <span className="text-[10px] text-[var(--text-faint)] font-mono">
          {peptide.injectionFrequency}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-[var(--tint)] border border-[var(--border-strong)]">
          {peptide.storage === "fridge"
            ? "🧊 Refrigerate"
            : peptide.storage === "freezer"
            ? "❄️ Freeze"
            : "🏠 Room Temp"}
        </span>
        {peptide.uvSensitive && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-[var(--tint)] border border-[var(--border-strong)]">
            ☀️ UV Sensitive
          </span>
        )}
        <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-faint)] text-[var(--text-dim)] border border-[var(--border)]">
          {peptide.shelfLifeReconstitutedDays}d shelf life
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-faint)] text-[var(--text-dim)] border border-[var(--border)]">
          BAC water: {peptide.bacWaterExpiryDays}d
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <p className="text-[var(--text-faint)] mb-0.5">Vial sizes</p>
          <p className="text-[var(--text-secondary)] font-mono">
            {peptide.commonVialSizesMg.join(", ")}mg
          </p>
        </div>
        <div>
          <p className="text-[var(--text-faint)] mb-0.5">Dose range</p>
          <p className="text-[var(--text-secondary)] font-mono">
            {peptide.typicalDoseRangeMcg[0]}-{peptide.typicalDoseRangeMcg[1]}mcg
          </p>
        </div>
      </div>

      {peptide.commonSideEffects.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {peptide.commonSideEffects.map((se) => (
            <span
              key={se}
              className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-[var(--tint)]/60 capitalize"
            >
              {se.replace(/-/g, " ")}
            </span>
          ))}
        </div>
      )}

      <p className="text-[var(--text-faint)] text-[10px] leading-relaxed">
        {peptide.notes}
      </p>
    </div>
  );
}
