"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useCycleLog } from "@/hooks/use-cycle-log";
import { useAuth } from "@/hooks/use-auth";
import { SideEffectForm } from "@/components/tracker/side-effect-form";
import { LogEntryCard } from "@/components/tracker/log-entry-card";
import { ProtocolCard } from "@/components/protocol/protocol-card";
import { ShareButton } from "@/components/protocol/share-button";
import type { CycleEntry } from "@/types";

export default function TrackerPage() {
  const { entries, mounted, addEntry, removeEntry, totalEntries } = useCycleLog();
  const { isAuthenticated, ready, login } = useAuth();
  const [shareEntry, setShareEntry] = useState<CycleEntry | null>(null);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10 overflow-x-hidden">
      {/* Header */}
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-[var(--accent)]">Cycle</span> Log
        </h1>
        <p className="text-[var(--text-dim)] text-sm mt-1">
          Track injections, side effects, and how you feel
        </p>
        {mounted && totalEntries > 0 && (
          <p className="text-xs text-[var(--text-faint)] font-mono mt-2">
            {totalEntries} {totalEntries === 1 ? "entry" : "entries"} logged
          </p>
        )}
      </div>

      {/* Form - requires auth */}
      <div className="mb-10">
        {!ready ? (
          <div className="panel-glass p-8 text-center">
            <div className="text-[var(--text-faint)] text-sm font-mono">Loading...</div>
          </div>
        ) : !isAuthenticated ? (
          <div className="relative overflow-hidden rounded-2xl border border-[var(--accent)]/15 p-10 text-center"
            style={{ background: "linear-gradient(135deg, rgba(0,212,190,0.06) 0%, rgba(0,212,190,0.02) 100%)" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,212,190,0.08),transparent_70%)]" />
            <div className="relative space-y-5">
              <div className="mx-auto w-12 h-12 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M12 2l-3 6h6l-3-6zM8 14h8" />
                </svg>
              </div>
              <div>
                <p className="text-[var(--text-dim)] text-sm font-medium">
                  Track your injections, side effects, and progress
                </p>
                <p className="text-[var(--text-faint)] text-xs mt-1">
                  Your data syncs to the cloud and stays private
                </p>
              </div>
              <button
                onClick={login}
                className="px-6 py-3 rounded-xl text-sm font-mono font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, var(--gradient-from), var(--gradient-to))" }}
              >
                Connect to Log
              </button>
            </div>
          </div>
        ) : (
          <SideEffectForm onSubmit={addEntry} />
        )}
      </div>

      {/* Share modal */}
      {shareEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md space-y-4">
            <ProtocolCard entry={shareEntry} />
            <div className="flex items-center justify-center gap-3">
              <ShareButton cardElementId="protocol-card" />
              <button
                onClick={() => setShareEntry(null)}
                className="px-4 py-2 rounded-lg text-xs font-mono text-[var(--text-dim)] bg-[var(--accent-faint)] border border-[var(--border)] hover:text-[var(--text-secondary)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {mounted && entries.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-mono text-[var(--text-dim)] uppercase tracking-wider">
            History
          </h2>
          <AnimatePresence>
            {entries.map((entry) => (
              <LogEntryCard
                key={entry.id}
                entry={entry}
                onDelete={removeEntry}
                onShare={setShareEntry}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {mounted && entries.length === 0 && (
        <div className="panel-glass p-10 text-center space-y-3">
          <div className="mx-auto w-10 h-10 rounded-full bg-[var(--accent-faint)] border border-[var(--border)] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-faint)]">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <p className="text-[var(--text-faint)] text-sm">No entries yet</p>
          <p className="text-[var(--text-faint)] text-xs">
            Your injection history will appear here
          </p>
        </div>
      )}
    </div>
  );
}
