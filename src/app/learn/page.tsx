import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Learn | PeptideLog",
  description:
    "Learn how peptide reconstitution works: the dosing formula, a step-by-step mixing walkthrough, and storage guidance.",
  alternates: { canonical: "/learn" },
};

const guides = [
  {
    num: "001",
    href: "/learn/formula",
    title: "The Reconstitution Formula",
    desc: "Understand the math behind dosing. See each step worked out, then plug in your own numbers.",
    tag: "Formula",
  },
  {
    num: "002",
    href: "/learn/reconstitution",
    title: "How to Reconstitute",
    desc: "A step-by-step walkthrough of mixing a vial safely, from swabbing to your first draw.",
    tag: "Walkthrough",
  },
  {
    num: "003",
    href: "/learn/storage",
    title: "Storage & Shelf Life",
    desc: "How to store each peptide after mixing. Temperature, UV light, and shelf life at a glance.",
    tag: "Reference",
  },
];

export default function LearnPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <PageHeader
        eyebrow="Guides"
        title={
          <>
            <span className="text-[var(--accent)]">Learn</span> the process
          </>
        }
        subtitle="The calculator gives you the number. These guides explain the why: the dosing formula, safe mixing, and storage."
      />

      <div className="grid gap-4 sm:grid-cols-1">
        {guides.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="group panel-glass p-5 flex items-start gap-4 hover:border-[var(--accent)]/30 transition-colors"
          >
            <span className="shrink-0 text-[10px] font-mono text-[var(--text-faint)] pt-1">
              {g.num}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-base font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {g.title}
                </h2>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-faint)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                  {g.tag}
                </span>
              </div>
              <p className="text-[var(--text-dim)] text-xs leading-relaxed">{g.desc}</p>
            </div>
            <svg
              className="shrink-0 text-[var(--text-faint)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all mt-1"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
