"use client";

import { useState } from "react";
import Link from "next/link";

export const CONTRACT_ADDRESS = "Coming Soon";

const columns = [
  {
    title: "Tools",
    links: [
      { href: "/calculator", label: "Reconstitution calculator" },
      { href: "/tracker", label: "Cycle log" },
      { href: "/compare", label: "Am I normal?" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/learn/formula", label: "The formula" },
      { href: "/learn/reconstitution", label: "How to reconstitute" },
      { href: "/learn/storage", label: "Storage and shelf life" },
      { href: "/peptides", label: "Peptide library" },
    ],
  },
];

export function ContractCopy({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] hover:text-white transition-colors ${className}`}
      title="Copy contract address"
    >
      <span className="text-[var(--text-faint)]">Contract address</span>
      <span className="tabular-nums">{copied ? "Copied" : CONTRACT_ADDRESS.toLowerCase()}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
      </svg>
    </button>
  );
}

export function Footer() {
  return (
    <footer className="mt-24">
      <div className="graduation" aria-hidden />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 grid gap-10 md:grid-cols-[1.4fr,1fr,1fr,1.2fr]">
        <div>
          <p className="text-base font-medium">PeptideLog</p>
          <p className="mt-2 text-sm text-[var(--text-dim)] max-w-[32ch] leading-relaxed">
            A free reconstitution calculator, cycle log, and peptide reference.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm text-[var(--text-faint)]">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="space-y-3">
          <ContractCopy />
          <div>
            <p className="text-xs text-[var(--text-faint)] mt-1">
              The token contract address will be posted here and on X when it goes live.
            </p>
            <a
              href="https://x.com/PeptideLog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
            >
              @PeptideLog on X
            </a>
          </div>
          <p className="text-xs text-[var(--text-faint)] leading-relaxed">
            Research use only. Not medical advice. Know your local laws.
          </p>
        </div>
      </div>
    </footer>
  );
}
