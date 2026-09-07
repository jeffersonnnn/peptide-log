"use client";
import { motion } from "framer-motion";
import { sideEffects } from "@/data/side-effects";

interface SideEffectChipsProps {
  selected: string[];
  onToggle: (id: string) => void;
}

const categoryIcons: Record<string, string> = {
  physical: "💪",
  mental: "🧠",
  digestive: "🫄",
  sleep: "😴",
};

export function SideEffectChips({ selected, onToggle }: SideEffectChipsProps) {
  const grouped = sideEffects.reduce(
    (acc, se) => {
      if (!acc[se.category]) acc[se.category] = [];
      acc[se.category].push(se);
      return acc;
    },
    {} as Record<string, typeof sideEffects>
  );

  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--text-dim)]">
        Side Effects
      </p>
      {Object.entries(grouped).map(([category, effects]) => (
        <div key={category}>
          <p className="text-[10px] text-[var(--text-faint)] mb-1.5">
            {categoryIcons[category] ?? ""} {category}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {effects.map((se) => {
              const isSelected = selected.includes(se.id);
              return (
                <motion.button
                  key={se.id}
                  onClick={() => onToggle(se.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                    isSelected
                      ? "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30"
                      : "bg-[var(--accent-faint)] text-[var(--text-dim)] border border-[var(--border)] hover:border-white/20"
                  }`}
                >
                  {se.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
