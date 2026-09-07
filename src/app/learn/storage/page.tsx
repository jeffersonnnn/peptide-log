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
    <div className="max-w-3xl mx-auto px-5 sm:px-8">
      <PageHeader
        crumbs={[{ label: "Learn", href: "/learn" }, { label: "Storage" }]}
        eyebrow="Guide 3 of 3"
        title="Storage and shelf life"
        subtitle="Where to keep each peptide after mixing, and for how long. Keep bacteriostatic water and mixed vials out of light."
      />

      <h2 className="text-sm text-[var(--text-dim)] mb-3">Individual peptides</h2>
      <div className="grid gap-3">
        {nonBlends.map((p) => (
          <StorageCard key={p.id} peptide={p} />
        ))}
      </div>

      {blends.length > 0 && (
        <>
          <h2 className="text-sm text-[var(--text-dim)] mt-10 mb-3">Blend stacks</h2>
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
