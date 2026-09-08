"use client";
import { useState, useEffect } from "react";

export function OfflineIndicator() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(!navigator.onLine);
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] flex justify-center py-1 md:top-12">
      <div className="px-3 py-1 rounded-full text-[10px] font-mono bg-white/[0.08] text-[var(--tint)] border border-[var(--border-strong)] backdrop-blur-sm">
        Offline - entries will sync when reconnected
      </div>
    </div>
  );
}
