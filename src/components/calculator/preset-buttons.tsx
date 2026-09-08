"use client";
import { presets } from "@/data/presets";

interface PresetButtonsProps {
  onSelect: (peptideId: string) => void;
}

const presetIcons: Record<string, string> = {
  wolverine: "◆",
  klow: "◇",
  glow: "○",
  cognitive: "◐",
};

export function PresetButtons({ onSelect }: PresetButtonsProps) {
  return (
    <div>
      <p className="text-xs text-[var(--text-dim)] mb-2">
        Quick presets
      </p>
      <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset.peptides[0].peptideId)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--accent-faint)] border border-[var(--border)] hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all text-sm group shrink-0"
          >
            <span className="text-sm text-[var(--tint)]">{presetIcons[preset.id] ?? "•"}</span>
            <div className="text-left">
              <span className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                {preset.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
