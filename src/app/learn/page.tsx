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
    href: "/learn/formula",
    title: "The reconstitution formula",
    desc: "The math behind dosing. Each step worked out, then you plug in your own numbers.",
    time: "5 min",
  },
  {
    href: "/learn/reconstitution",
    title: "How to reconstitute",
    desc: "Mixing a vial safely, from swabbing to your first draw.",
    time: "6 min",
  },
  {
    href: "/learn/storage",
    title: "Storage and shelf life",
    desc: "Where to keep each peptide after mixing, and for how long.",
    time: "3 min",
  },
];

export default function LearnPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8">
      <PageHeader
        eyebrow="Guides"
        title="Learn the process"
        subtitle="The calculator gives you the number. These three guides explain the why: the formula, safe mixing, and storage. Read them in order if you are new."
      />

      <ol className="border-t border-[var(--border)]">
        {guides.map((g, i) => (
          <li key={g.href} className="border-b border-[var(--border)]">
            <Link href={g.href} className="group flex items-start gap-6 py-6">
              <span className="font-mono text-sm text-[var(--text-faint)] tabular-nums pt-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl md:text-2xl tracking-tight text-white">{g.title}</h2>
                <p className="mt-1.5 text-[var(--text-dim)] leading-relaxed">{g.desc}</p>
              </div>
              <span className="hidden sm:block text-xs text-[var(--text-faint)] pt-2 shrink-0">{g.time}</span>
              <svg
                className="shrink-0 mt-2 text-[var(--text-faint)] group-hover:text-white group-hover:translate-x-1 transition-all"
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
