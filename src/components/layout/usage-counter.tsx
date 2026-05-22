"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

let pending = 0;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function incrementCounter() {
  if (typeof window === "undefined") return;
  pending++;
  window.dispatchEvent(new CustomEvent("peptidelog:counter"));

  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    const batch = pending;
    pending = 0;
    try {
      for (let i = 0; i < batch; i++) {
        await fetch("/api/counter", { method: "POST" });
      }
    } catch {}
  }, 2000);
}

export function UsageCounter() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    async function fetchCount() {
      try {
        const res = await fetch("/api/counter");
        const json = await res.json();
        setCount(json.count);
      } catch {
        setCount(0);
      }
    }
    fetchCount();

    function onLocalUpdate() {
      setCount((prev) => prev + 1);
    }
    window.addEventListener("peptidelog:counter", onLocalUpdate);
    return () => window.removeEventListener("peptidelog:counter", onLocalUpdate);
  }, []);

  if (!mounted) return null;

  const formatted = count.toLocaleString();

  return (
    <div className="inline-flex items-center gap-2.5">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
      <AnimatePresence mode="wait">
        <motion.span
          key={formatted}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="font-mono font-bold text-sm text-[var(--text-dim)] tabular-nums"
        >
          {formatted}
        </motion.span>
      </AnimatePresence>
      <span className="text-xs text-[var(--text-faint)]">calculations performed</span>
    </div>
  );
}
