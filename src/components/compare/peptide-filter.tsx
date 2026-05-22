"use client";
import { peptides } from "@/data/peptides";

interface PeptideFilterProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PeptideFilter({ selectedId, onSelect }: PeptideFilterProps) {
  const filteredPeptides = peptides.filter((p) => p.category !== "blend");

  return (
    <div className="flex flex-wrap gap-2">
      {filteredPeptides.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
            selectedId === p.id
              ? "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30"
              : "bg-[var(--accent-faint)] text-[var(--text-dim)] border border-[var(--border)] hover:border-white/20"
          }`}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}
