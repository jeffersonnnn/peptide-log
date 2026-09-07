"use client";
import Link from "next/link";
import { peptides } from "@/data/peptides";
import { VialCard, categoryLabels, categoryColor } from "@/components/peptides/vial-card";
import { Reveal, SplitWords, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Peptide } from "@/types";

const ORDER: Peptide["category"][] = ["healing", "weight", "cosmetic", "cognitive", "sleep", "blend"];
const FEATURED = ["bpc-157", "tb-500", "semaglutide", "ghk-cu", "ipamorelin", "wolverine"];

export function LibrarySection() {
  const featured = FEATURED.map((id) => peptides.find((p) => p.id === id)).filter(
    (p): p is Peptide => Boolean(p)
  );
  const counts = Object.fromEntries(
    ORDER.map((c) => [c, peptides.filter((p) => p.category === c).length])
  ) as Record<Peptide["category"], number>;

  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-24 md:pt-32">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <SplitWords
            text="A label for every vial"
            className="text-3xl md:text-5xl font-medium tracking-display leading-[1.02]"
          />
          <Reveal delay={0.15}>
            <p className="mt-4 text-[var(--text-dim)] leading-relaxed max-w-[52ch]">
              Dose range, frequency, vial sizes, and storage for each peptide, grouped by
              what you are trying to do.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.25}>
          <Link href="/peptides" className="btn-secondary shrink-0">
            See all {peptides.length}
          </Link>
        </Reveal>
      </div>

      <Stagger className="mt-8 flex flex-wrap gap-2" stagger={0.05}>
        {ORDER.map((c) => (
          <StaggerItem key={c}>
            <Link
              href="/peptides"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3.5 py-1.5 text-sm text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-strong)] transition-colors"
            >
              <span className="h-2 w-2 rounded-full" style={{ background: categoryColor[c] }} aria-hidden />
              {categoryLabels[c]}
              <span className="font-mono text-xs text-[var(--text-faint)] tabular-nums">{counts[c]}</span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {featured.map((p) => (
          <StaggerItem key={p.id}>
            <VialCard peptide={p} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
