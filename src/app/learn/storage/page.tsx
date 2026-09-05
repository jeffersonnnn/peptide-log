import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { StorageCard } from "@/components/guide/storage-card";
import { peptides } from "@/data/peptides";

export const metadata: Metadata = {
  title: "Peptide Storage & Shelf Life | PeptideLog",
  description:
    "How to store each peptide after reconstitution: fridge or freezer, UV sensitivity, and shelf life in days.",
  alternates: { canonical: "/learn/storage" },
};

export default function StoragePage() {
  const nonBlends = peptides.filter((p) => p.category !== "blend");
  const blends = peptides.filter((p) => p.category === "blend");

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      <PageHeader
        crumbs={[{ label: "Learn", href: "/learn" }, { label: "Storage" }]}
        eyebrow="Reference"
        title={
          <>
            <span className="text-[var(--accent)]">Storage</span> & shelf life
          </>
        }
        subtitle="How to store each peptide after mixing. Keep BAC water and reconstituted vials out of UV light."
      />

      <h2 className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mb-3">
        Individual peptides
      </h2>
      <div className="grid gap-3">
        {nonBlends.map((p) => (
          <StorageCard key={p.id} peptide={p} />
        ))}
      </div>

      {blends.length > 0 && (
        <>
          <h2 className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mt-8 mb-3">
            Blend stacks
          </h2>
          <div className="grid gap-3">
            {blends.map((p) => (
              <StorageCard key={p.id} peptide={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
