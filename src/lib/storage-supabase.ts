import type { CycleEntry } from "@/types";

const LOG_API = "/api/log";

function headers(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

interface SupabaseRow {
  id: string;
  user_id: string;
  peptides: CycleEntry["peptides"];
  side_effects: string[];
  pain_level: number;
  energy_level: number;
  weight: number | null;
  notes: string;
  log_date: string;
  created_at: string;
}

function rowToEntry(row: SupabaseRow): CycleEntry {
  return {
    id: row.id,
    date: row.log_date,
    peptides: row.peptides,
    sideEffects: row.side_effects,
    painLevel: row.pain_level,
    energyLevel: row.energy_level,
    weight: row.weight ?? undefined,
    notes: row.notes,
    createdAt: row.created_at,
  };
}

export async function getEntriesFromSupabase(
  token: string
): Promise<CycleEntry[]> {
  const res = await fetch(LOG_API, { headers: headers(token) });
  if (!res.ok) return [];
  const { entries } = await res.json();
  return (entries as SupabaseRow[]).map(rowToEntry);
}

export async function createEntryInSupabase(
  entry: Omit<CycleEntry, "id" | "createdAt">,
  token: string
): Promise<CycleEntry | null> {
  const res = await fetch(LOG_API, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify(entry),
  });
  if (!res.ok) return null;
  const { entry: row } = await res.json();
  return row ? rowToEntry(row) : null;
}

export async function deleteEntryFromSupabase(
  entryId: string,
  token: string
): Promise<boolean> {
  const res = await fetch(LOG_API, {
    method: "DELETE",
    headers: headers(token),
    body: JSON.stringify({ entryId }),
  });
  return res.ok;
}
