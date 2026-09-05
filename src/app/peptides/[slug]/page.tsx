import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { AuthGate } from "@/components/auth/auth-gate";
import { peptides, getPeptideById } from "@/data/peptides";

export function generateStaticParams() {
  return peptides.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPeptideById(params.slug);
  if (!p) return { title: "Peptide not found | PeptideLog" };
  return {
    title: `${p.name} — Dose, Storage & Stacks | PeptideLog`,
    description: `${p.name}: typical dose ${p.typicalDoseRangeMcg[0]}–${p.typicalDoseRangeMcg[1]} mcg, ${p.injectionFrequency}. ${p.notes}`,
    alternates: { canonical: `/peptides/${p.id}` },
  };
}

const storageLabel: Record<string, string> = {
  fridge: "🧊 Refrigerate",
  freezer: "❄️ Freeze",
  room: "🏠 Room temp",
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel-glass p-4">
      <p className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-faint)] mb-1">
        {label}
      </p>
      <p className="text-sm font-mono text-[var(--text)]">{value}</p>
    </div>
  );
}

export default function PeptideDetailPage({ params }: { params: { slug: string } }) {
  const p = getPeptideById(params.slug);
  if (!p) notFound();

  const compat = p.stackCompatibility
    .map((id) => getPeptideById(id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      <PageHeader
        crumbs={[{ label: "Peptides", href: "/peptides" }, { label: p.name }]}
        eyebrow={p.category}
        title={<span className="text-[var(--accent)]">{p.name}</span>}
        subtitle={p.notes}
      />

      <AuthGate
        title="Sign in to see the full profile"
        description={`Dose, storage, side effects, and stacks for ${p.name}.`}
      >
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Stat
          label="Dose range"
          value={`${p.typicalDoseRangeMcg[0]}–${p.typicalDoseRangeMcg[1]} mcg`}
        />
        <Stat label="Frequency" value={p.injectionFrequency} />
        <Stat label="Vial sizes" value={`${p.commonVialSizesMg.join(", ")} mg`} />
        <Stat label="Shelf life" value={`${p.shelfLifeReconstitutedDays} days`} />
      </div>

      {/* Storage badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="px-2.5 py-1 rounded-lg text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {storageLabel[p.storage] ?? p.storage}
        </span>
        {p.uvSensitive && (
          <span className="px-2.5 py-1 rounded-lg text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">
            ☀️ UV sensitive
          </span>
        )}
        <span className="px-2.5 py-1 rounded-lg text-xs bg-[var(--accent-faint)] text-[var(--text-dim)] border border-[var(--border)]">
          BAC water: {p.bacWaterExpiryDays}d
        </span>
      </div>

      {/* Common side effects */}
      {p.commonSideEffects.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-faint)] mb-2">
            Common side effects
          </p>
          <div className="flex flex-wrap gap-1.5">
            {p.commonSideEffects.map((se) => (
              <span
                key={se}
                className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)] font-mono"
              >
                {se.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stack compatibility */}
      {compat.length > 0 && (
        <div className="mb-8">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-faint)] mb-2">
            Stacks well with
          </p>
          <div className="flex flex-wrap gap-1.5">
            {compat.map((cp) => (
              <Link
                key={cp.id}
                href={`/peptides/${cp.id}`}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/15 font-mono hover:bg-[var(--accent)]/20 transition-colors"
              >
                {cp.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      </AuthGate>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/calculator"
          className="flex-1 text-center px-4 py-3 rounded-lg bg-[var(--accent)] text-white font-mono text-xs uppercase tracking-[0.1em] hover:opacity-90 transition-all"
        >
          Calculate a Dose
        </Link>
        <Link
          href="/compare"
          className="flex-1 text-center px-4 py-3 rounded-lg border border-[var(--accent-dim)] text-[var(--accent)] font-mono text-xs uppercase tracking-[0.1em] hover:bg-[var(--accent)] hover:text-white transition-all"
        >
          Compare Side Effects
        </Link>
      </div>

      <p className="mt-8 text-[10px] text-[var(--text-faint)] leading-relaxed text-center">
        Educational information only. Not medical advice.
      </p>
    </div>
  );
}
