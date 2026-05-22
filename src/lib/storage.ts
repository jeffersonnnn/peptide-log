import type { CycleEntry } from "@/types";

const STORAGE_KEY = "peptidelog_cycle_entries";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getEntries(): CycleEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function createEntry(
  entry: Omit<CycleEntry, "id" | "createdAt">
): CycleEntry {
  const full: CycleEntry = {
    ...entry,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  const entries = getEntries();
  entries.unshift(full);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return full;
}

export function deleteEntry(id: string): void {
  const entries = getEntries().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getEntriesByDate(date: string): CycleEntry[] {
  return getEntries().filter((e) => e.date === date);
}

export function getEntryCount(): number {
  return getEntries().length;
}
