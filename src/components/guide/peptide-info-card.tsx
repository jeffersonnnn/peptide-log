"use client";
import type { Peptide } from "@/types";
import { getPeptideById } from "@/data/peptides";

interface PeptideInfoCardProps {
  peptide: Peptide;
}

const categoryColors: Record<string, string> = {
  healing: "bg-white/[0.08] text-[var(--bone)]",
  weight: "bg-white/[0.06] text-[var(--tint)]",
  cosmetic: "bg-white/[0.06] text-[var(--bone-2)]",
  cognitive: "bg-white/[0.05] text-[var(--mid-gray)]",
  sleep: "bg-white/[0.04] text-[var(--tint)]",
  blend: "bg-white/[0.08] text-[var(--bone)]",
};

export function PeptideInfoCard({ peptide }: PeptideInfoCardProps) {
  const compatPeptides = peptide.stackCompatibility
    .map((id) => getPeptideById(id))
    .filter(Boolean);

  return (
    <div className="panel-glass p-5 space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="font-mono font-bold text-[var(--accent)] text-lg">
          {peptide.name}
        </h3>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
            categoryColors[peptide.category] ?? ""
          }`}
        >
          {peptide.category}
        </span>
      </div>

      <p className="text-[var(--text-dim)] text-xs leading-relaxed">
        {peptide.notes}
      </p>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="text-[var(--text-faint)] text-xs mb-1">Dose range</p>
          <p className="text-[var(--text-secondary)] font-mono">
            {peptide.typicalDoseRangeMcg[0]} - {peptide.typicalDoseRangeMcg[1]} mcg
          </p>
        </div>
        <div>
          <p className="text-[var(--text-faint)] text-xs mb-1">Frequency</p>
          <p className="text-[var(--text-secondary)] font-mono">{peptide.injectionFrequency}</p>
        </div>
        <div>
          <p className="text-[var(--text-faint)] text-xs mb-1">Vial sizes</p>
          <p className="text-[var(--text-secondary)] font-mono">
            {peptide.commonVialSizesMg.join(", ")} mg
          </p>
        </div>
        <div>
          <p className="text-[var(--text-faint)] text-xs mb-1">Storage</p>
          <p className="text-[var(--text-secondary)] font-mono capitalize">
            {peptide.storage} | {peptide.shelfLifeReconstitutedDays}d shelf life
          </p>
        </div>
      </div>

      {compatPeptides.length > 0 && (
        <div>
          <p className="text-[var(--text-faint)] text-xs mb-2">
            Stack Compatible With
          </p>
          <div className="flex flex-wrap gap-1.5">
            {compatPeptides.map((cp) => (
              <span
                key={cp!.id}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/15 font-mono"
              >
                {cp!.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
