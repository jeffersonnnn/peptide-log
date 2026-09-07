import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { AuthGate } from "@/components/auth/auth-gate";
import { peptides, getPeptideById } from "@/data/peptides";
import { categoryLabels, categoryColor } from "@/components/peptides/vial-card";

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
  fridge: "Refrigerate after mixing",
  freezer: "Freeze after mixing",
  room: "Room temperature is fine",
};

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-4 border-b border-[var(--border)] flex items-baseline justify-between gap-4">
      <dt className="text-sm text-[var(--text-dim)]">{label}</dt>
      <dd className="font-mono text-sm text-white text-right tabular-nums">{value}</dd>
    </div>
  );
}

export default function PeptideDetailPage({ params }: { params: { slug: string } }) {
  const p = getPeptideById(params.slug);
  if (!p) notFound();

  const compat = p.stackCompatibility
    .map((id) => getPeptideById(id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const color = categoryColor[p.category];

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8">
      <PageHeader
        crumbs={[{ label: "Peptides", href: "/peptides" }, { label: p.name }]}
        eyebrow={categoryLabels[p.category]}
        title={p.name}
        subtitle={p.notes}
        aside={
          <span className="font-mono text-sm text-[var(--text-faint)] inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} aria-hidden />
            {p.ticker}
          </span>
        }
      />

      <AuthGate
        title="Sign in to see the full profile"
        description={`Dose, storage, side effects, and stacks for ${p.name}.`}
      >
        <div className="grid md:grid-cols-2 gap-x-12">
          <dl className="border-t border-[var(--border)]">
            <Fact label="Typical dose" value={`${p.typicalDoseRangeMcg[0]}–${p.typicalDoseRangeMcg[1]} mcg`} />
            <Fact label="Frequency" value={p.injectionFrequency} />
            <Fact label="Common vial sizes" value={`${p.commonVialSizesMg.join(", ")} mg`} />
          </dl>
          <dl className="border-t border-[var(--border)]">
            <Fact label="Storage" value={storageLabel[p.storage] ?? p.storage} />
            <Fact label="Shelf life once mixed" value={`${p.shelfLifeReconstitutedDays} days`} />
            <Fact label="Bacteriostatic water" value={`${p.bacWaterExpiryDays} days`} />
          </dl>
        </div>

        {p.uvSensitive && (
          <p className="mt-5 text-sm text-[var(--accent-amber)]">
            Sensitive to light. Keep the vial in its box or a dark container.
          </p>
        )}

        {p.commonSideEffects.length > 0 && (
          <div className="mt-10">
            <p className="text-sm text-[var(--text-dim)] mb-3">Commonly reported side effects</p>
            <div className="flex flex-wrap gap-2">
              {p.commonSideEffects.map((se) => (
                <span
                  key={se}
                  className="text-sm px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-secondary)]"
                >
                  {se.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </div>
        )}

        {compat.length > 0 && (
          <div className="mt-8">
            <p className="text-sm text-[var(--text-dim)] mb-3">Stacks well with</p>
            <div className="flex flex-wrap gap-2">
              {compat.map((cp) => (
                <Link
                  key={cp.id}
                  href={`/peptides/${cp.id}`}
                  className="text-sm px-3 py-1 rounded-full border border-[var(--accent-dim)] bg-[var(--accent-faint)] text-[var(--accent)] hover:bg-[var(--accent-dim)] transition-colors"
                >
                  {cp.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </AuthGate>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/calculator" className="btn-primary">
          Calculate a dose
        </Link>
        <Link href="/compare" className="btn-secondary">
          Compare side effects
        </Link>
      </div>

      <p className="mt-10 text-xs text-[var(--text-faint)] leading-relaxed">
        Educational information only. Not medical advice.
      </p>
    </div>
  );
}
