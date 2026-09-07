"use client";
import { useState } from "react";
import { BodyFront } from "./body-front";
import { BodyBack } from "./body-back";

interface BodyDiagramProps {
  selectedZone: string;
  onSelectZone: (zone: string) => void;
}

export function BodyDiagram({ selectedZone, onSelectZone }: BodyDiagramProps) {
  const [view, setView] = useState<"front" | "back">("front");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--text-dim)]">
          Injection Site
        </p>
        <div className="flex rounded-lg overflow-hidden border border-[var(--border)]">
          <button
            onClick={() => setView("front")}
            className={`px-3 py-1 text-xs font-mono transition-colors ${
              view === "front"
                ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                : "text-[var(--text-dim)] hover:text-[var(--text-secondary)]"
            }`}
          >
            Front
          </button>
          <button
            onClick={() => setView("back")}
            className={`px-3 py-1 text-xs font-mono transition-colors ${
              view === "back"
                ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                : "text-[var(--text-dim)] hover:text-[var(--text-secondary)]"
            }`}
          >
            Back
          </button>
        </div>
      </div>
      <div className="panel-glass p-4 flex justify-center min-h-[280px]">
        {view === "front" ? (
          <BodyFront selectedZone={selectedZone} onSelectZone={onSelectZone} />
        ) : (
          <BodyBack selectedZone={selectedZone} onSelectZone={onSelectZone} />
        )}
      </div>
      {selectedZone && (
        <p className="text-xs text-[var(--accent)] font-mono text-center">
          {selectedZone.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </p>
      )}
    </div>
  );
}
