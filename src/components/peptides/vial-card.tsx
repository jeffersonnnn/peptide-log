import Link from "next/link";
import type { Peptide } from "@/types";

export const categoryLabels: Record<Peptide["category"], string> = {
  healing: "Healing and recovery",
  weight: "Weight and metabolic",
  cosmetic: "Cosmetic",
  cognitive: "Cognitive",
  sleep: "Sleep",
  blend: "Blends and stacks",
};

/* Monochrome taxonomy: categories differ by value, not hue (Topology has no hue). */
export const categoryColor: Record<Peptide["category"], string> = {
  healing: "#E4E2D8",
  weight: "#A7B4BA",
  cosmetic: "#C9C7BE",
  cognitive: "#9B9B9B",
  sleep: "#7C8589",
  blend: "#DBDBDB",
};

const storageWord: Record<Peptide["storage"], string> = {
  fridge: "Fridge",
  freezer: "Freezer",
  room: "Room temp",
};

/** A peptide rendered as a vial label: colour band by category, name, and the facts you check first. */
export function VialCard({ peptide }: { peptide: Peptide }) {
  const color = categoryColor[peptide.category];
  return (
    <Link
      href={`/peptides/${peptide.id}`}
      className="vial-card group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden hover:border-[var(--border-strong)]"
      style={{ ["--band" as string]: color }}
    >
      <div className="band h-1.5 w-full" style={{ background: color }} aria-hidden />
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-medium text-white leading-tight">{peptide.name}</h3>
          <span className="font-mono text-[11px] text-[var(--text-faint)] pt-0.5">{peptide.ticker}</span>
        </div>
        <p className="mt-1 text-xs" style={{ color }}>
          {categoryLabels[peptide.category]}
        </p>
        <dl className="mt-4 space-y-1.5 text-xs">
          <div className="flex justify-between gap-3">
            <dt className="text-[var(--text-faint)]">Dose</dt>
            <dd className="font-mono text-[var(--text-secondary)] tabular-nums">
              {peptide.typicalDoseRangeMcg[0]}–{peptide.typicalDoseRangeMcg[1]} mcg
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[var(--text-faint)]">Frequency</dt>
            <dd className="text-[var(--text-secondary)] text-right">{peptide.injectionFrequency}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[var(--text-faint)]">Vials</dt>
            <dd className="font-mono text-[var(--text-secondary)] tabular-nums">
              {peptide.commonVialSizesMg.join(", ")} mg
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[var(--text-faint)]">Storage</dt>
            <dd className="text-[var(--text-secondary)]">
              {storageWord[peptide.storage]}
              {peptide.uvSensitive ? ", dark" : ""}
            </dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
