"use client";

import { useState } from "react";

const CONTRACT_ADDRESS = "Coming Soon";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer className="border-t border-[var(--border)] py-6 mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-faint)] font-mono">
            PeptideLog
          </span>
          <span className="text-[10px] text-[var(--text-faint)]">|</span>
          <span className="text-[10px] text-[var(--text-faint)] font-mono">
            Free peptide calculator & tracker
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-[var(--text-faint)] font-mono">
            Contract Address:{" "}
            <button
              onClick={handleCopy}
              className="text-[var(--accent)] hover:text-[var(--accent-hover)] cursor-pointer transition-colors"
            >
              {copied ? "Copied!" : CONTRACT_ADDRESS}
            </button>
          </span>
          <span className="text-[10px] text-[var(--text-faint)]">|</span>
          <a
            href="https://x.com/PeptideLog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[var(--text-faint)] font-mono hover:text-[var(--accent)] transition-colors"
          >
            𝕏 @PeptideLog
          </a>
          <span className="text-[10px] text-[var(--text-faint)]">|</span>
          <span className="text-[10px] text-[var(--text-faint)] font-mono">
            Research use only. Not medical advice.
          </span>
        </div>
      </div>
    </footer>
  );
}
