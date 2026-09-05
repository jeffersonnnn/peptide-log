import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { peptides } from "@/data/peptides";

export const metadata: Metadata = {
  title: "Peptide Library | PeptideLog",
  description:
    "Reference library of 17 research peptides: dose ranges, injection frequency, vial sizes, storage, and stack compatibility.",
  alternates: { canonical: "/peptides" },
};

const categoryLabels: Record<string, string> = {
  healing: "Healing & Recovery",
  weight: "Weight & Metabolic",
  cosmetic: "Cosmetic",
  cognitive: "Cognitive",
  sleep: "Sleep",
  blend: "Blends & Stacks",
};

const categoryOrder = ["healing", "weight", "cosmetic", "cognitive", "sleep", "blend"];

const categoryDot: Record<string, string> = {
  healing: "bg-emerald-400",
  weight: "bg-amber-400",
  cosmetic: "bg-pink-400",
  cognitive: "bg-blue-400",
  sleep: "bg-violet-400",
  blend: "bg-cyan-400",
};

export default function PeptidesPage() {
  const groups = categoryOrder
    .map((cat) => ({ cat, items: peptides.filter((p) => p.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <PageHeader
        eyebrow="Reference"
        title={
          <>
            Peptide <span className="text-[var(--accent)]">library</span>
          </>
        }
        subtitle={`Dose ranges, storage, and stacks for ${peptides.length} research peptides. Tap any peptide for the full profile.`}
      />

      {/* Compare tool link */}
      <Link
        href="/compare"
        className="group panel-glass p-4 flex items-center gap-3 mb-8 hover:border-[var(--accent)]/30 transition-colors"
      >
        <span className="shrink-0 w-9 h-9 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
            Am I Normal?
          </p>
          <p className="text-[var(--text-dim)] text-xs">
            Compare your side effects to the community.
          </p>
        </div>
        <span className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors">&rarr;</span>
      </Link>

      <div className="space-y-8">
        {groups.map((g) => (
          <section key={g.cat}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-2 h-2 rounded-full ${categoryDot[g.cat] ?? "bg-[var(--accent)]"}`} />
              <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-dim)]">
                {categoryLabels[g.cat] ?? g.cat}
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {g.items.map((p) => (
                <Link
                  key={p.id}
                  href={`/peptides/${p.id}`}
                  className="group panel-glass p-4 hover:border-[var(--accent)]/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-mono font-bold text-[var(--accent)] text-sm group-hover:opacity-80 transition-opacity">
                      {p.name}
                    </h3>
                    <span className="text-[9px] font-mono text-[var(--text-faint)]">
                      {p.commonVialSizesMg.join("/")} mg
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-[var(--text-dim)]">
                    <span>
                      {p.typicalDoseRangeMcg[0]}–{p.typicalDoseRangeMcg[1]} mcg
                    </span>
                    <span>{p.injectionFrequency}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
