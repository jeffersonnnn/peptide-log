"use client";
import { useState, useEffect, useCallback } from "react";

interface AggregateItem {
  sideEffect: string;
  percentage: number;
}

interface AggregateResult {
  peptideId: string;
  data: AggregateItem[];
  source: string;
}

export function useAggregate(peptideId: string) {
  const [result, setResult] = useState<AggregateResult | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAggregate = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/aggregate?peptideId=${peptideId}`);
      const json = await res.json();
      setResult(json);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [peptideId]);

  useEffect(() => {
    fetchAggregate();
  }, [fetchAggregate]);

  return { result, loading, refetch: fetchAggregate };
}
