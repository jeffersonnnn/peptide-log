import type { CycleEntry } from "@/types";

const QUEUE_KEY = "peptidelog_offline_queue";

type QueuedEntry = Omit<CycleEntry, "id" | "createdAt">;

export function enqueueOfflineEntry(entry: QueuedEntry): void {
  if (typeof window === "undefined") return;
  const queue = getQueue();
  queue.push(entry);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

function getQueue(): QueuedEntry[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function flushOfflineQueue(
  getAccessToken: () => Promise<string | null>
): Promise<number> {
  const queue = getQueue();
  if (queue.length === 0) return 0;

  const token = await getAccessToken();
  if (!token) return 0;

  let flushed = 0;
  const remaining: QueuedEntry[] = [];

  for (const entry of queue) {
    try {
      const res = await fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(entry),
      });
      if (res.ok) {
        flushed++;
      } else {
        remaining.push(entry);
      }
    } catch {
      remaining.push(entry);
    }
  }

  if (remaining.length > 0) {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  } else {
    localStorage.removeItem(QUEUE_KEY);
  }

  return flushed;
}
