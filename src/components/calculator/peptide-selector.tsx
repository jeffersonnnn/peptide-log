"use client";
import { useState, useRef, useEffect } from "react";
import { peptides } from "@/data/peptides";

interface PeptideSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  healing: "bg-white/[0.08] text-[var(--bone)]",
  weight: "bg-white/[0.06] text-[var(--tint)]",
  cosmetic: "bg-white/[0.06] text-[var(--bone-2)]",
  cognitive: "bg-white/[0.05] text-[var(--mid-gray)]",
  sleep: "bg-white/[0.04] text-[var(--tint)]",
  blend: "bg-white/[0.08] text-[var(--bone)]",
};

export function PeptideSelector({ selectedId, onSelect }: PeptideSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = peptides.find((p) => p.id === selectedId);
  const filtered = peptides.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.ticker.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs text-[var(--text-dim)] mb-1.5">
        Peptide
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full panel-glass px-4 py-3 text-left flex items-center justify-between hover:border-[var(--accent-dim)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-mono font-semibold text-lg">
            {selected?.name ?? "Select..."}
          </span>
          {selected && (
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                categoryColors[selected.category] ?? ""
              }`}
            >
              {selected.category}
            </span>
          )}
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform text-[var(--text-dim)] ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full panel-glass overflow-hidden shadow-2xl shadow-black/50">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search peptides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--accent-faint)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-[var(--accent)]/40"
              autoFocus
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onSelect(p.id);
                  setOpen(false);
                  setSearch("");
                }}
                className={`w-full px-4 py-2.5 text-left hover:bg-[var(--accent-faint)] flex items-center justify-between transition-colors ${
                  p.id === selectedId ? "bg-[var(--accent)]/10" : ""
                }`}
              >
                <div>
                  <span className="font-mono font-medium text-sm">{p.name}</span>
                  <span className="text-[var(--text-faint)] text-xs ml-2">{p.injectionFrequency}</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    categoryColors[p.category] ?? ""
                  }`}
                >
                  {p.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
