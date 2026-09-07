"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { peptides } from "@/data/peptides";
import { SyringeVisual } from "@/components/syringe/syringe-visual";
import { SplitWords } from "@/components/motion/reveal";

const STEPS = [
  {
    title: "Pick your peptide",
    body: "Choose from 17 peptides and blends. Vial sizes and a typical dose fill in for you.",
  },
  {
    title: "Add the water",
    body: "Enter how much bacteriostatic water you put in the vial. That sets the concentration.",
  },
  {
    title: "Draw the dose",
    body: "Read the line on the syringe. The units are exact, and you get a warning if the dose will not fit.",
  },
  {
    title: "Log the cycle",
    body: "Sign in with an email or wallet, then record each injection, side effects, and how you feel. Compare with the community.",
  },
];

/* ── Step visuals ── */

function PickVisual() {
  const rows = peptides.slice(0, 5);
  return (
    <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-2">
      {rows.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 * i, duration: 0.4 }}
          className={`flex items-center justify-between rounded-xl px-4 py-3 ${
            i === 0 ? "bg-white/[0.06] text-white" : "text-[var(--text-dim)]"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`h-2 w-2 rounded-full ${i === 0 ? "bg-[var(--accent)]" : "bg-white/15"}`} />
            <span className="text-sm">{p.name}</span>
          </div>
          <span className="font-mono text-xs tabular-nums">
            {p.commonVialSizesMg[0]} mg
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function WaterVisual() {
  return (
    <div className="flex items-center gap-8">
      <svg viewBox="0 0 120 200" className="w-28 sm:w-32" aria-label="Vial with 2 mL of water">
        <rect x="42" y="8" width="36" height="16" rx="3" fill="rgba(255,255,255,0.35)" />
        <rect x="46" y="24" width="28" height="14" fill="rgba(255,255,255,0.2)" />
        <rect x="24" y="38" width="72" height="150" rx="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <clipPath id="vial-clip">
          <rect x="25" y="39" width="70" height="148" rx="13" />
        </clipPath>
        <g clipPath="url(#vial-clip)">
          <motion.rect
            x="25"
            width="70"
            fill="url(#water)"
            initial={{ y: 188, height: 0 }}
            animate={{ y: 108, height: 80 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          <motion.ellipse
            cx="60"
            rx="35"
            ry="4"
            fill="rgba(255,255,255,0.25)"
            initial={{ cy: 188 }}
            animate={{ cy: 108 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </g>
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--syringe-fluid-from)" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="96" x2="104" y1={188 - f * 150} y2={188 - f * 150} stroke="rgba(255,255,255,0.3)" />
        ))}
      </svg>
      <div className="font-mono text-sm space-y-2">
        <p className="text-[var(--text-dim)]">
          <span className="text-white">5 mg</span> powder
        </p>
        <p className="text-[var(--text-dim)]">
          + <span className="text-white">2 mL</span> water
        </p>
        <div className="h-px bg-[var(--border)] my-3" />
        <p className="text-[var(--accent)] text-lg">2.5 mg/mL</p>
      </div>
    </div>
  );
}

function DrawVisual() {
  return (
    <div className="w-full">
      <SyringeVisual drawLinePosition={0.1} unitsToDrawPerDose={10} syringeTypeId="u100-1ml" className="w-full" />
      <div className="mt-2 grid grid-cols-3 gap-4 font-mono text-sm border-t border-[var(--border)] pt-4">
        <p className="text-[var(--text-dim)]">
          <span className="block text-white text-lg">250 mcg</span> dose
        </p>
        <p className="text-[var(--text-dim)]">
          <span className="block text-white text-lg">2,500 mcg/mL</span> concentration
        </p>
        <p className="text-[var(--text-dim)]">
          <span className="block text-[var(--accent)] text-2xl">10 u</span> draw to
        </p>
      </div>
    </div>
  );
}

function LogVisual() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 space-y-4">
      <div className="flex items-center justify-between text-xs text-[var(--text-dim)]">
        <span>Today</span>
        <span className="font-mono">Day 12 of 28</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-lg bg-[var(--accent-faint)] border border-[var(--accent-dim)] px-2.5 py-1 text-xs text-[var(--accent)] font-mono">
          BPC-157 250 mcg
        </span>
        <span className="rounded-lg bg-white/5 border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--text-dim)]">
          Abdomen, left
        </span>
      </div>
      {[
        { label: "Energy", v: 7 },
        { label: "Injection pain", v: 2 },
      ].map((row, i) => (
        <div key={row.label}>
          <div className="flex justify-between text-xs text-[var(--text-dim)] mb-1.5">
            <span>{row.label}</span>
            <span className="font-mono">{row.v}/10</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-[var(--accent)]"
              initial={{ width: 0 }}
              animate={{ width: `${row.v * 10}%` }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
      <p className="text-xs text-[var(--text-faint)]">Side effects: none logged</p>
    </div>
  );
}

const VISUALS = [PickVisual, WaterVisual, DrawVisual, LogVisual];

function StepList({ active, onSelect }: { active: number; onSelect?: (i: number) => void }) {
  return (
    <ol className="space-y-1">
      {STEPS.map((s, i) => {
        const isActive = i === active;
        return (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => onSelect?.(i)}
              className={`w-full text-left flex gap-5 rounded-2xl px-4 py-4 transition-colors ${
                isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
              }`}
              aria-current={isActive ? "step" : undefined}
            >
              <span
                className={`font-mono text-sm tabular-nums pt-1 transition-colors ${
                  isActive ? "text-[var(--accent)]" : "text-[var(--text-faint)]"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className={`block text-xl md:text-2xl tracking-tight transition-colors ${isActive ? "text-white" : "text-[var(--text-dim)]"}`}>
                  {s.title}
                </span>
                <motion.span
                  initial={false}
                  animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="block overflow-hidden text-sm text-[var(--text-dim)] leading-relaxed"
                >
                  <span className="block pt-2 max-w-[42ch]">{s.body}</span>
                </motion.span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function Visual({ index }: { index: number }) {
  const Comp = VISUALS[index];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center"
      >
        <Comp />
      </motion.div>
    </AnimatePresence>
  );
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

/**
 * Pinned four-step section. On desktop the section is 4 screens tall and the
 * inner panel sticks; scroll position picks the active step and swaps the
 * visual. On smaller screens the steps stack with a tappable list.
 */
export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!desktop) return;
    const next = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length));
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-5 sm:px-8">
      <div className="pt-24 md:pt-32 max-w-2xl">
        <SplitWords
          text="Four steps from powder to an exact dose"
          className="text-3xl md:text-5xl font-medium tracking-display leading-[1.02]"
        />
      </div>

      {desktop ? (
        <div ref={ref} style={{ height: `${STEPS.length * 100}vh` }} className="relative mt-4">
          <div className="sticky top-0 h-screen grid grid-cols-2 gap-12 items-center">
            <StepList active={active} />
            <div className="relative h-[520px] rounded-[28px] canvas flex items-center justify-center p-10">
              <Visual index={active} />
              <div className="absolute left-8 right-8 bottom-6 flex gap-1.5" aria-hidden>
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-[2px] flex-1 rounded-full transition-colors duration-300 ${
                      i <= active ? "bg-[var(--accent)]" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div ref={ref} className="mt-8 space-y-6">
          <div className="rounded-[24px] canvas flex items-center justify-center p-8 min-h-[360px]">
            <Visual index={active} />
          </div>
          <StepList active={active} onSelect={setActive} />
        </div>
      )}
    </section>
  );
}
