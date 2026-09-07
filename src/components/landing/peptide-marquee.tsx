import Link from "next/link";
import { peptides } from "@/data/peptides";
import { categoryColor } from "@/components/peptides/vial-card";

const storageWord = { fridge: "fridge", freezer: "freezer", room: "room temp" } as const;

/**
 * Two counter-flowing tickers of the library. The top row carries names and
 * dose ranges, the bottom row frequency and storage, moving the other way.
 */
export function PeptideMarquee() {
  const rowA = [...peptides, ...peptides];
  const rowB = [...peptides.slice().reverse(), ...peptides.slice().reverse()];
  return (
    <div className="marquee border-y border-[var(--border)]" aria-label="Peptide library">
      <div className="overflow-hidden py-3">
        <div className="marquee-track gap-10 pr-10">
          {rowA.map((p, i) => (
            <Link
              key={`${p.id}-${i}`}
              href={`/peptides/${p.id}`}
              className="flex items-center gap-2.5 whitespace-nowrap text-sm text-[var(--text-dim)] hover:text-white transition-colors"
              aria-hidden={i >= peptides.length}
              tabIndex={i >= peptides.length ? -1 : 0}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: categoryColor[p.category] }} aria-hidden />
              <span className="text-white">{p.name}</span>
              <span className="font-mono text-xs tabular-nums">
                {p.typicalDoseRangeMcg[0]}–{p.typicalDoseRangeMcg[1]} mcg
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="overflow-hidden border-t border-[var(--border)] py-2.5">
        <div className="marquee-track gap-10 pr-10" style={{ animationDirection: "reverse", animationDuration: "75s" }}>
          {rowB.map((p, i) => (
            <span
              key={`${p.id}-b-${i}`}
              className="flex items-center gap-2 whitespace-nowrap text-xs text-[var(--text-faint)]"
              aria-hidden
            >
              <span className="text-[var(--text-dim)]">{p.ticker}</span>
              <span>{p.injectionFrequency}</span>
              <span className="text-white/20">/</span>
              <span>{storageWord[p.storage]}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
