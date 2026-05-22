import { getEntries } from "@/lib/storage";

const MIGRATED_KEY = "peptidelog_migrated";

export async function migrateLocalEntries(token: string): Promise<number> {
  if (typeof window === "undefined") return 0;
  if (localStorage.getItem(MIGRATED_KEY)) return 0;

  const entries = getEntries();
  if (entries.length === 0) {
    localStorage.setItem(MIGRATED_KEY, "1");
    return 0;
  }

  localStorage.setItem(MIGRATED_KEY, "1");

  let migrated = 0;
  for (const entry of entries) {
    try {
      const res = await fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: entry.date,
          peptides: entry.peptides,
          sideEffects: entry.sideEffects,
          painLevel: entry.painLevel,
          energyLevel: entry.energyLevel,
          weight: entry.weight,
          notes: entry.notes,
        }),
      });
      if (res.ok) migrated++;
    } catch {
      // continue migrating remaining entries
    }
  }

  return migrated;
}
