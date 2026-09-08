"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const HOLD_MS = 600;
const DONE_MS = 4500;

type Phase = "hold" | "reveal";

/*
 * Topology's opening, as a state marker the CSS keys off with :has().
 * "hold": graphite screen, canvas and header hidden, headline words parked
 * off to the right. "reveal": the canvas fades up (2.5s), the words slide in
 * right-to-left with a 75ms stagger, then the body content fades up and the
 * header appears. The marker is server-rendered as "hold" so the first paint
 * is the hold, and it is removed once the sequence has finished.
 */
export function Opener() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase | null>("hold");

  useEffect(() => {
    if (reduce) {
      setPhase(null);
      return;
    }
    const reveal = setTimeout(() => setPhase("reveal"), HOLD_MS);
    const done = setTimeout(() => setPhase(null), DONE_MS);
    return () => {
      clearTimeout(reveal);
      clearTimeout(done);
    };
  }, [reduce]);

  if (!phase) return null;
  return <div data-opener={phase} hidden />;
}
