"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import type { CycleEntry } from "@/types";
import { getEntries, createEntry, deleteEntry } from "@/lib/storage";
import {
  getEntriesFromSupabase,
  createEntryInSupabase,
  deleteEntryFromSupabase,
} from "@/lib/storage-supabase";
import { migrateLocalEntries } from "@/lib/migrate-local-entries";
import { enqueueOfflineEntry, flushOfflineQueue } from "@/lib/offline-queue";
import { useAuth } from "@/hooks/use-auth";

export function useCycleLog() {
  const [entries, setEntries] = useState<CycleEntry[]>([]);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, ready, getAccessToken } = useAuth();
  const migrated = useRef(false);

  useEffect(() => {
    if (!ready) return;

    if (isAuthenticated) {
      getAccessToken().then(async (token) => {
        if (!token) return;

        if (!migrated.current) {
          migrated.current = true;
          await migrateLocalEntries(token);
        }

        await flushOfflineQueue(getAccessToken);

        const remote = await getEntriesFromSupabase(token);
        setEntries(remote);
        setMounted(true);
      });
    } else {
      setEntries(getEntries());
      setMounted(true);
    }
  }, [ready, isAuthenticated, getAccessToken]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const handleOnline = () => {
      flushOfflineQueue(getAccessToken).then(async (count) => {
        if (count > 0) {
          const token = await getAccessToken();
          if (token) {
            const remote = await getEntriesFromSupabase(token);
            setEntries(remote);
          }
        }
      });
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [isAuthenticated, getAccessToken]);

  const addEntry = useCallback(
    async (entry: Omit<CycleEntry, "id" | "createdAt">) => {
      if (isAuthenticated) {
        try {
          const token = await getAccessToken();
          if (token) {
            const created = await createEntryInSupabase(entry, token);
            if (created) {
              setEntries((prev) => [created, ...prev]);
              return created;
            }
          }
        } catch {
          enqueueOfflineEntry(entry);
        }
      }
      const created = createEntry(entry);
      setEntries((prev) => [created, ...prev]);
      return created;
    },
    [isAuthenticated, getAccessToken]
  );

  const removeEntry = useCallback(
    async (id: string) => {
      if (isAuthenticated) {
        const token = await getAccessToken();
        if (token) {
          await deleteEntryFromSupabase(id, token);
        }
      } else {
        deleteEntry(id);
      }
      setEntries((prev) => prev.filter((e) => e.id !== id));
    },
    [isAuthenticated, getAccessToken]
  );

  const entriesByDate = useCallback(
    (date: string) => entries.filter((e) => e.date === date),
    [entries]
  );

  return {
    entries,
    mounted,
    addEntry,
    removeEntry,
    entriesByDate,
    totalEntries: entries.length,
  };
}
