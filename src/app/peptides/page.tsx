import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { peptides } from "@/data/peptides";
import { VialCard, categoryLabels, categoryColor } from "@/components/peptides/vial-card";
import type { Peptide } from "@/types";

export const metadata: Metadata = {
  title: "Peptide Library | PeptideLog",
  description:
    "Reference library of 17 research peptides: dose ranges, injection frequency, vial sizes, storage, and stack compatibility.",
  alternates: { canonical: "/peptides" },
};

const ORDER: Peptide["category"][] = ["healing", "weight", "cosmetic", "cognitive", "sleep", "blend"];

export default function PeptidesPage() {
  const groups = ORDER.map((cat) => ({
    cat,
    items: peptides.filter((p) => p.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8">
      <PageHeader
        eyebrow="Reference"
        title="Peptide library"
        subtitle={`Dose ranges, storage, and stacks for ${peptides.length} research peptides and blends. Open any vial for the full profile.`}
        aside={
          <Link href="/compare" className="btn-secondary">
            Compare side effects
          </Link>
        }
      />

      <nav className="flex flex-wrap gap-2 mb-10" aria-label="Categories">
        {groups.map((g) => (
          <a
            key={g.cat}
            href={`#${g.cat}`}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3.5 py-1.5 text-sm text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-strong)] transition-colors"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: categoryColor[g.cat] }} aria-hidden />
            {categoryLabels[g.cat]}
            <span className="font-mono text-xs text-[var(--text-faint)] tabular-nums">{g.items.length}</span>
          </a>
        ))}
      </nav>

      <div className="space-y-14">
        {groups.map((g) => (
          <section key={g.cat} id={g.cat} className="scroll-mt-32">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: categoryColor[g.cat] }} aria-hidden />
              <h2 className="text-2xl tracking-tight">{categoryLabels[g.cat]}</h2>
              <span className="font-mono text-sm text-[var(--text-faint)] tabular-nums">{g.items.length}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p) => (
                <VialCard key={p.id} peptide={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
