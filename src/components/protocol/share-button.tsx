"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonProps {
  cardElementId: string;
}

export function ShareButton({ cardElementId }: ShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");

  async function handleCopy() {
    setStatus("copying");
    try {
      const html2canvas = (await import("html2canvas")).default;
      const el = document.getElementById(cardElementId);
      if (!el) {
        setStatus("error");
        return;
      }

      const canvas = await html2canvas(el, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setStatus("error");
          return;
        }

        try {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setStatus("copied");
        } catch {
          const url = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = "peptidelog-protocol.png";
          link.href = url;
          link.click();
          setStatus("copied");
        }

        setTimeout(() => setStatus("idle"), 2000);
      }, "image/png");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.button
        key={status}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={handleCopy}
        disabled={status === "copying"}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
          status === "copied"
            ? "bg-white/[0.06] text-[var(--tint)] border border-[var(--border-strong)]"
            : status === "error"
            ? "bg-white/[0.08] text-[var(--bone)] border border-[var(--border-strong)]"
            : "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 hover:bg-[var(--accent)]/20"
        }`}
      >
        {status === "copying" && (
          <>
            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="15" />
            </svg>
            Capturing...
          </>
        )}
        {status === "copied" && "Copied to clipboard"}
        {status === "error" && "Failed - try again"}
        {status === "idle" && (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Share Protocol
          </>
        )}
      </motion.button>
    </AnimatePresence>
  );
}
