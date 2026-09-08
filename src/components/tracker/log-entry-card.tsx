"use client";
import { motion } from "framer-motion";
import type { CycleEntry } from "@/types";
import { getPeptideById } from "@/data/peptides";
import { sideEffects } from "@/data/side-effects";
import { format } from "date-fns";

interface LogEntryCardProps {
  entry: CycleEntry;
  onDelete?: (id: string) => void;
  onShare?: (entry: CycleEntry) => void;
}

export function LogEntryCard({ entry, onDelete, onShare }: LogEntryCardProps) {
  const dateStr = format(new Date(entry.date), "MMM d, yyyy");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="panel-glass p-4 space-y-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--text-dim)] font-mono">{dateStr}</span>
        <div className="flex gap-3">
          {onShare && (
            <button
              onClick={() => onShare(entry)}
              className="text-[var(--text-faint)] hover:text-[var(--accent)] text-xs transition-colors"
            >
              share
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(entry.id)}
              className="text-[var(--text-faint)] hover:text-[var(--bone)] text-xs transition-colors"
            >
              delete
            </button>
          )}
        </div>
      </div>

      {/* Peptides */}
      <div className="flex flex-wrap gap-2">
        {entry.peptides.map((p, i) => {
          const pep = getPeptideById(p.peptideId);
          return (
            <div
              key={i}
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20"
            >
              <span className="text-[var(--accent)] font-mono text-xs font-semibold">
                {pep?.name ?? p.peptideId}
              </span>
              <span className="text-[var(--text-dim)] text-[10px] font-mono">
                {p.doseMcg}mcg
              </span>
              {p.injectionSite && (
                <span className="text-[var(--text-faint)] text-[10px]">
                  {p.injectionSite.replace(/-/g, " ")}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Side effects */}
      {entry.sideEffects.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {entry.sideEffects.map((seId) => {
            const se = sideEffects.find((s) => s.id === seId);
            return (
              <span
                key={seId}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-[var(--tint)] border border-[var(--border-strong)]"
              >
                {se?.label ?? seId}
              </span>
            );
          })}
        </div>
      )}

      {/* Metrics */}
      <div className="flex gap-4 text-xs">
        <div>
          <span className="text-[var(--text-faint)]">Pain </span>
          <span
            className="font-mono font-semibold"
            style={{
              color:
                entry.painLevel <= 3
                  ? "#E4E2D8"
                  : entry.painLevel <= 6
                  ? "#A7B4BA"
                  : "#9B9B9B",
            }}
          >
            {entry.painLevel}/10
          </span>
        </div>
        <div>
          <span className="text-[var(--text-faint)]">Energy </span>
          <span
            className="font-mono font-semibold"
            style={{
              color:
                entry.energyLevel >= 7
                  ? "#E4E2D8"
                  : entry.energyLevel >= 4
                  ? "#A7B4BA"
                  : "#9B9B9B",
            }}
          >
            {entry.energyLevel}/10
          </span>
        </div>
        {entry.weight && (
          <div>
            <span className="text-[var(--text-faint)]">Weight </span>
            <span className="font-mono font-semibold text-[var(--text-secondary)]">
              {entry.weight} lbs
            </span>
          </div>
        )}
      </div>

      {/* Notes */}
      {entry.notes && (
        <p className="text-[var(--text-faint)] text-xs leading-relaxed border-t border-white/5 pt-2">
          {entry.notes}
        </p>
      )}
    </motion.div>
  );
}
