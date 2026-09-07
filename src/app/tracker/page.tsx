"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useCycleLog } from "@/hooks/use-cycle-log";
import { useAuth } from "@/hooks/use-auth";
import { PageHeader } from "@/components/layout/page-header";
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
    <div className="max-w-3xl mx-auto px-5 sm:px-8 overflow-x-hidden">
      <PageHeader
        eyebrow="Cycle log"
        title="Log each injection"
        subtitle="Record the peptide, the dose, the site, side effects, and how you feel. Entries sync to your account and stay private."
        aside={
          mounted && totalEntries > 0 ? (
            <p className="font-mono text-sm text-[var(--text-dim)] tabular-nums">
              {totalEntries} {totalEntries === 1 ? "entry" : "entries"}
            </p>
          ) : undefined
        }
      />

      <div className="mb-12">
        {!ready ? (
          <div className="rounded-2xl border border-[var(--border)] p-10 text-center text-sm text-[var(--text-faint)]">
            Loading
          </div>
        ) : !isAuthenticated ? (
          <div className="canvas rounded-[24px] p-8 sm:p-12 grid sm:grid-cols-[1fr,auto] gap-6 items-center">
            <div>
              <p className="text-2xl tracking-tight text-white">Sign in to start a log</p>
              <p className="text-[var(--text-dim)] mt-2 max-w-[40ch] leading-relaxed">
                Your entries sync to the cloud and stay private. You can share a
                single entry as an image whenever you choose.
              </p>
            </div>
            <button onClick={login} className="btn-primary">
              Sign in
            </button>
          </div>
        ) : (
          <SideEffectForm onSubmit={addEntry} />
        )}
      </div>

      {shareEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md space-y-4">
            <ProtocolCard entry={shareEntry} />
            <div className="flex items-center justify-center gap-3">
              <ShareButton cardElementId="protocol-card" />
              <button onClick={() => setShareEntry(null)} className="btn-secondary !py-2.5 !px-4 text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {mounted && entries.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm text-[var(--text-dim)]">History</h2>
          <AnimatePresence>
            {entries.map((entry) => (
              <LogEntryCard key={entry.id} entry={entry} onDelete={removeEntry} onShare={setShareEntry} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {mounted && isAuthenticated && entries.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[var(--border-strong)] p-10 text-center">
          <p className="text-white">No entries yet</p>
          <p className="text-[var(--text-dim)] text-sm mt-1">
            Add your first injection above. Your history appears here.
          </p>
        </div>
      )}
    </div>
  );
}
