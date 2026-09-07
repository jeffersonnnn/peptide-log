"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { peptides, getPeptideById } from "@/data/peptides";
import { calculateReconstitution } from "@/lib/calculator";
import { SyringeVisual } from "@/components/syringe/syringe-visual";
import { CountUp } from "@/components/motion/count-up";
import { SignInButton } from "@/components/auth/sign-in-button";
import { CONTRACT_ADDRESS } from "@/components/layout/footer";

/* Real scenarios, computed with the real calculator so the numbers are honest. */
const SCENARIOS = [
  { peptideId: "bpc-157", vialMg: 5, waterMl: 2, doseMcg: 250 },
  { peptideId: "semaglutide", vialMg: 5, waterMl: 2, doseMcg: 500 },
  { peptideId: "tb-500", vialMg: 5, waterMl: 2, doseMcg: 2500 },
  { peptideId: "ipamorelin", vialMg: 5, waterMl: 2, doseMcg: 200 },
];
const CYCLE_MS = 4500;

/* Deterministic particle field so server and client render the same markup. */
const PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const r = seed / 233280;
  return {
    left: `${(i * 61) % 100}%`,
    top: `${(r * 100).toFixed(1)}%`,
    size: 1.5 + ((i * 7) % 4) * 0.6,
    dur: 12 + (i % 5) * 4,
    delay: -((i * 3.7) % 14),
    dx: `${((i % 3) - 1) * 40}px`,
    dy: `${-80 - (i % 4) * 40}px`,
    opacity: 0.18 + (i % 3) * 0.1,
  };
});

function Readout({ label, value, unit, big }: { label: string; value: number; unit: string; big?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-[var(--text-dim)]">{label}</p>
      <p className={`mt-1 font-mono leading-none ${big ? "text-4xl sm:text-5xl text-[var(--accent)]" : "text-xl text-white"}`}>
        <CountUp value={value} decimals={big ? 1 : 0} duration={big ? 700 : 500} />
        <span className={`ml-1.5 ${big ? "text-base text-[var(--text-faint)]" : "text-xs text-[var(--text-faint)]"}`}>{unit}</span>
      </p>
    </div>
  );
}

function LiveDemo() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SCENARIOS.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const s = SCENARIOS[index];
  const peptide = getPeptideById(s.peptideId);
  const result = calculateReconstitution(s.vialMg, s.doseMcg, s.waterMl, "u100-1ml");
  const units = result?.unitsToDrawPerDose ?? 0;

  return (
    <div
      className="hero-in relative w-full rounded-[22px] border border-[var(--border)] bg-[rgba(10,10,11,0.62)] backdrop-blur-sm p-5 sm:p-6"
      style={{ animationDelay: "0.35s" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-1.5 flex-wrap" role="tablist" aria-label="Example doses">
          {SCENARIOS.map((sc, i) => {
            const p = getPeptideById(sc.peptideId);
            const active = i === index;
            return (
              <button
                key={sc.peptideId}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setIndex(i);
                  setPaused(true);
                }}
                className={`relative overflow-hidden rounded-full px-3 py-1.5 text-xs transition-colors ${
                  active ? "text-white bg-white/10" : "text-[var(--text-dim)] hover:text-white"
                }`}
              >
                {active && !paused && !reduce && (
                  <motion.span
                    key={index}
                    className="absolute left-0 bottom-0 h-[2px] bg-[var(--accent)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                  />
                )}
                {p?.name}
              </button>
            );
          })}
        </div>
        <span className="text-[11px] text-[var(--text-faint)]">U100, 1 mL</span>
      </div>

      <div className="mt-3 -mx-2">
        <SyringeVisual
          drawLinePosition={result?.drawLinePosition ?? 0}
          unitsToDrawPerDose={units}
          syringeTypeId="u100-1ml"
        />
      </div>

      <div className="mt-2 grid grid-cols-2 sm:grid-cols-[auto,auto,auto,1fr] gap-x-8 gap-y-4 items-end border-t border-[var(--border)] pt-4">
        <Readout label="Vial" value={s.vialMg} unit="mg" />
        <Readout label="Water" value={s.waterMl} unit="mL" />
        <Readout label="Dose" value={s.doseMcg} unit="mcg" />
        <div className="col-span-2 sm:col-span-1 sm:justify-self-end sm:text-right whitespace-nowrap">
          <Readout label="Draw to" value={units} unit="units" big />
        </div>
      </div>
      <p className="mt-3 text-[11px] text-[var(--text-faint)]">
        {result ? `${result.mlToDrawPerDose} mL per dose, ${result.dosesPerVial} doses in the vial.` : ""}{" "}
        {peptide ? `${peptide.name} is ${peptide.injectionFrequency}.` : ""}
      </p>
    </div>
  );
}

function HeadlineLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="line-mask">
      <span style={{ animationDelay: `${delay}s` }}>{children}</span>
    </span>
  );
}

export function HeroLanding() {
  const [count, setCount] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* Pointer parallax: the aurora blobs and the demo panel lean toward the cursor. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const blobAx = useTransform(sx, (v) => v * -40);
  const blobAy = useTransform(sy, (v) => v * -30);
  const blobBx = useTransform(sx, (v) => v * 50);
  const blobBy = useTransform(sy, (v) => v * 40);
  const panelX = useTransform(sx, (v) => v * 10);
  const panelY = useTransform(sy, (v) => v * 8);

  useEffect(() => {
    fetch("/api/counter")
      .then((r) => r.json())
      .then((j) => setCount(typeof j?.count === "number" ? j.count : null))
      .catch(() => setCount(null));
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = canvasRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section className="px-2 sm:px-3 pt-2 sm:pt-3">
      <div
        ref={canvasRef}
        onMouseMove={onMove}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="canvas relative overflow-hidden rounded-[24px] sm:rounded-[32px] min-h-[calc(100svh-16px)] sm:min-h-[calc(100svh-24px)] flex flex-col"
      >
        {/* Aurora */}
        <motion.div
          aria-hidden
          style={{ x: blobAx, y: blobAy }}
          className="pointer-events-none absolute -top-40 right-[-8%] h-[640px] w-[640px] rounded-full aurora-a"
        >
          <div className="h-full w-full rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(0,200,5,0.2), transparent 62%)" }} />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ x: blobBx, y: blobBy }}
          className="pointer-events-none absolute bottom-[-30%] left-[-10%] h-[560px] w-[560px] rounded-full aurora-b"
        >
          <div className="h-full w-full rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.09), transparent 62%)" }} />
        </motion.div>
        {/* Particles */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
                ["--p-dx" as string]: p.dx,
                ["--p-dy" as string]: p.dy,
                ["--p-opacity" as string]: p.opacity,
              }}
            />
          ))}
        </div>

        <div className="relative flex-1 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center px-6 sm:px-10 lg:px-14 pt-28 sm:pt-32 pb-10">
          <div className="lg:col-span-5 max-w-2xl">
            <h1 className="font-medium text-white tracking-display leading-[0.98] text-[2.6rem] sm:text-6xl lg:text-[4.2rem]">
              <HeadlineLine delay={0.05}>Know exactly</HeadlineLine>
              <HeadlineLine delay={0.13}>how many units</HeadlineLine>
              <HeadlineLine delay={0.21}>to draw.</HeadlineLine>
            </h1>
            <p
              className="hero-in mt-6 max-w-[44ch] text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed"
              style={{ animationDelay: "0.4s" }}
            >
              A free reconstitution calculator with a visual syringe, dosing
              guides, and a library of 17 peptides. Sign in to keep a private
              cycle log and compare your side effects with the community.
            </p>
            <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.5s" }}>
              <Link href="/calculator" className="btn-primary">
                Open the calculator
              </Link>
              <a href="#services" className="btn-secondary">
                See what you get
              </a>
            </div>
            <div className="hero-in mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--text-dim)]" style={{ animationDelay: "0.6s" }}>
              <SignInButton size="sm" label="Sign in with email or wallet" />
              <span>Free account. Unlocks the cycle log, stacks, and sharing.</span>
            </div>
          </div>

          <motion.div style={{ x: panelX, y: panelY }} className="lg:col-span-7">
            <LiveDemo />
          </motion.div>
        </div>

        {/* Proof line */}
        <div className="hero-in relative px-6 sm:px-10 lg:px-14 pb-8" style={{ animationDelay: "0.7s" }}>
          <div className="graduation" aria-hidden />
          <div className="mt-4 flex flex-wrap gap-x-10 gap-y-3 text-sm text-[var(--text-dim)]">
            <p>
              <span className="text-white font-mono tabular-nums">{peptides.length}</span> peptides and
              blends in the library
            </p>
            {typeof count === "number" && count > 0 && (
              <p>
                <span className="text-white font-mono tabular-nums">
                  <CountUp value={count} duration={1200} />
                </span>{" "}
                calculations run
              </p>
            )}
            <p>Works offline once installed</p>
            <p className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-amber)]" aria-hidden />
              Contract address: <span className="text-white">{CONTRACT_ADDRESS.toLowerCase()}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
