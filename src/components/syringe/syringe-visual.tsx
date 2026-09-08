"use client";
import { useEffect, useId, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { getSyringeById } from "@/data/syringe-types";

interface SyringeVisualProps {
  drawLinePosition: number;
  unitsToDrawPerDose: number;
  syringeTypeId: string;
  warning?: string;
  /** Width classes for the SVG. Defaults to full width. */
  className?: string;
}

const SPRING = { type: "spring", stiffness: 90, damping: 18, mass: 0.8 } as const;

/* Geometry, in viewBox units (1000 x 240). Needle on the left, plunger on the right. */
const VB_W = 1000;
const VB_H = 240;
const NEEDLE_TIP = 18;
const HUB_X = 148;
const BARREL_X = 196;
const BARREL_END = 804;
const BARREL_Y = 68;
const BARREL_H = 104;
const STOPPER_W = 26;
const USABLE = BARREL_END - BARREL_X - STOPPER_W - 4;
const MID_Y = BARREL_Y + BARREL_H / 2;

/**
 * A horizontal syringe drawn as an instrument: glass barrel with shading and a
 * sheen, printed graduations, rubber stopper, luer hub, and a needle. The fluid
 * fills from the hub to the stopper as the plunger pulls back. Motion is spring
 * driven so a new dose reads as the plunger being drawn.
 */
export function SyringeVisual({
  drawLinePosition,
  unitsToDrawPerDose,
  syringeTypeId,
  className = "w-full",
}: SyringeVisualProps) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const syringe = getSyringeById(syringeTypeId);

  const pos = Math.max(0, Math.min(drawLinePosition, 1));
  const target = BARREL_X + 2 + pos * USABLE;
  /* One spring drives every moving part so the plunger, fluid, stopper, and
     label stay in step. Rendered as plain attributes, which SVG honours. */
  const [fluidEnd, setFluidEnd] = useState(target);
  useEffect(() => {
    if (reduce) {
      setFluidEnd(target);
      return;
    }
    const controls = animate(fluidEnd, target, { ...SPRING, onUpdate: (v) => setFluidEnd(v) });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduce]);

  if (!syringe) return null;
  const stopperX = fluidEnd;
  const hasFluid = drawLinePosition > 0;

  const ticks: { x: number; major: boolean; label: string }[] = [];
  for (let i = 0; i <= syringe.totalUnits; i += syringe.minorTickEvery) {
    const x = BARREL_X + 2 + (i / syringe.totalUnits) * USABLE;
    const major = i % syringe.majorTickEvery === 0;
    ticks.push({ x, major, label: major ? String(i) : "" });
  }

  const id = (n: string) => `${n}-${uid}`;

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-auto select-none"
        role="img"
        aria-label={`Syringe showing ${unitsToDrawPerDose} units to draw`}
      >
        <defs>
          <linearGradient id={id("glass")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="18%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.015)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
          </linearGradient>
          <linearGradient id={id("fluid")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--syringe-fluid-from)" />
            <stop offset="100%" stopColor="var(--syringe-fluid-to)" />
          </linearGradient>
          <linearGradient id={id("fluid-shade")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="35%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.28)" />
          </linearGradient>
          <linearGradient id={id("rubber")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A3A40" />
            <stop offset="50%" stopColor="#1C1C21" />
            <stop offset="100%" stopColor="#121215" />
          </linearGradient>
          <linearGradient id={id("metal")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
          </linearGradient>
          <linearGradient id={id("hub")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
          </linearGradient>
          <linearGradient id={id("sheen")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <clipPath id={id("barrel-clip")}>
            <rect x={BARREL_X} y={BARREL_Y} width={BARREL_END - BARREL_X} height={BARREL_H} rx={10} />
          </clipPath>
          <clipPath id={id("fluid-clip")}>
            <rect
              x={BARREL_X + 2}
              y={BARREL_Y + 4}
              height={BARREL_H - 8}
              rx={6}
              width={Math.max(0, fluidEnd - BARREL_X - 2)}
            />
          </clipPath>
          <filter id={id("glow")} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={id("soft")} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx={520} cy={218} rx={420} ry={10} fill="rgba(0,0,0,0.45)" filter={`url(#${id("soft")})`} />

        {/* Needle: a thin steel shaft with a bevelled tip and a shadow line beneath. */}
        <line x1={NEEDLE_TIP + 2} y1={MID_Y + 2.4} x2={HUB_X} y2={MID_Y + 2.4} stroke="rgba(0,0,0,0.5)" strokeWidth={2} strokeLinecap="round" />
        <line x1={NEEDLE_TIP + 2} y1={MID_Y} x2={HUB_X} y2={MID_Y} stroke="rgba(255,255,255,0.72)" strokeWidth={3} strokeLinecap="round" />
        <line x1={NEEDLE_TIP + 6} y1={MID_Y - 0.9} x2={HUB_X - 4} y2={MID_Y - 0.9} stroke="rgba(255,255,255,0.9)" strokeWidth={0.8} strokeLinecap="round" />
        <polygon points={`${NEEDLE_TIP - 10},${MID_Y + 1.2} ${NEEDLE_TIP + 4},${MID_Y - 1.6} ${NEEDLE_TIP + 4},${MID_Y + 1.6}`} fill="rgba(255,255,255,0.9)" />
        {/* Luer hub */}
        <path
          d={`M${HUB_X},${MID_Y - 11} L${HUB_X + 22},${MID_Y - 22} L${BARREL_X + 2},${MID_Y - 26} L${BARREL_X + 2},${MID_Y + 26} L${HUB_X + 22},${MID_Y + 22} L${HUB_X},${MID_Y + 11} Z`}
          fill={`url(#${id("hub")})`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1.2}
        />
        <line x1={HUB_X + 8} y1={MID_Y - 16} x2={HUB_X + 8} y2={MID_Y + 16} stroke="rgba(255,255,255,0.25)" />
        <line x1={HUB_X + 16} y1={MID_Y - 19} x2={HUB_X + 16} y2={MID_Y + 19} stroke="rgba(255,255,255,0.25)" />

        {/* Plunger rod (behind the barrel) */}
        <rect
          x={stopperX + STOPPER_W - 4}
          y={MID_Y - 7}
          height={14}
          rx={4}
          fill="rgba(255,255,255,0.16)"
          stroke="rgba(255,255,255,0.22)"
          width={Math.max(40, 968 - (stopperX + STOPPER_W - 4))}
        />
        <rect
          x={stopperX + STOPPER_W}
          y={MID_Y - 3}
          height={6}
          rx={3}
          fill="rgba(255,255,255,0.06)"
          width={Math.max(30, 960 - (stopperX + STOPPER_W))}
        />
        {/* Thumb pad */}
        <rect
          x={964}
          y={MID_Y - 60}
          width={22}
          height={120}
          rx={7}
          fill="rgba(255,255,255,0.14)"
          stroke="rgba(255,255,255,0.32)"
          strokeWidth={1.4}
        />

        {/* Fluid */}
        <g clipPath={`url(#${id("barrel-clip")})`}>
          <g clipPath={`url(#${id("fluid-clip")})`}>
            <rect x={BARREL_X} y={BARREL_Y} width={BARREL_END - BARREL_X} height={BARREL_H} fill={`url(#${id("fluid")})`} />
            <rect x={BARREL_X} y={BARREL_Y} width={BARREL_END - BARREL_X} height={BARREL_H} fill={`url(#${id("fluid-shade")})`} />
            {/* Drifting bubbles */}
            {hasFluid &&
              [
                { cy: MID_Y + 18, r: 3.2, dur: 7, delay: 0 },
                { cy: MID_Y - 12, r: 2.2, dur: 9, delay: 1.4 },
                { cy: MID_Y + 30, r: 1.8, dur: 6, delay: 2.6 },
                { cy: MID_Y - 28, r: 2.6, dur: 8, delay: 0.8 },
                { cy: MID_Y + 4, r: 1.5, dur: 10, delay: 3.4 },
              ].map((b, i) => (
                <circle
                  key={i}
                  cy={b.cy}
                  r={b.r}
                  fill="rgba(255,255,255,0.55)"
                  className="syringe-bubble"
                  style={{
                    // Bubbles drift from the hub toward the stopper and fade.
                    ["--bubble-from" as string]: `${BARREL_X + 10}px`,
                    ["--bubble-to" as string]: `${Math.max(BARREL_X + 40, fluidEnd - 12)}px`,
                    animationDuration: `${b.dur}s`,
                    animationDelay: `${b.delay}s`,
                  }}
                />
              ))}
          </g>
          {/* Meniscus at the stopper face */}
          {hasFluid && (
            <rect x={fluidEnd - 6} y={BARREL_Y + 4} width={6} height={BARREL_H - 8} rx={3} fill="rgba(255,255,255,0.35)" />
          )}
        </g>

        {/* Barrel glass */}
        <rect
          x={BARREL_X}
          y={BARREL_Y}
          width={BARREL_END - BARREL_X}
          height={BARREL_H}
          rx={10}
          fill={`url(#${id("glass")})`}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={1.5}
        />
        {/* Top highlight */}
        <rect x={BARREL_X + 14} y={BARREL_Y + 9} width={BARREL_END - BARREL_X - 28} height={7} rx={3.5} fill="rgba(255,255,255,0.28)" />
        {/* Sweeping sheen */}
        <g clipPath={`url(#${id("barrel-clip")})`}>
          <rect
            className="syringe-sheen"
            x={BARREL_X - 80}
            y={BARREL_Y - 20}
            width={90}
            height={BARREL_H + 40}
            fill={`url(#${id("sheen")})`}
            transform={`skewX(-18)`}
          />
        </g>

        {/* Stopper. Each part animates its own x attribute; SVG groups cannot take a transform from x. */}
        <rect x={stopperX} y={BARREL_Y + 5} width={STOPPER_W} height={BARREL_H - 10} rx={5} fill={`url(#${id("rubber")})`} stroke="rgba(0,0,0,0.5)" />
        <rect x={stopperX + 4} y={BARREL_Y + 12} width={4} height={BARREL_H - 24} rx={2} fill="rgba(255,255,255,0.08)" />
        <rect x={stopperX + STOPPER_W - 9} y={BARREL_Y + 12} width={4} height={BARREL_H - 24} rx={2} fill="rgba(255,255,255,0.08)" />

        {/* Flange */}
        <rect x={BARREL_END - 4} y={BARREL_Y - 26} width={14} height={BARREL_H + 52} rx={5} fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.4)" strokeWidth={1.4} />

        {/* Graduations, printed on the barrel */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={t.x}
              x2={t.x}
              y1={BARREL_Y + BARREL_H}
              y2={BARREL_Y + BARREL_H - (t.major ? 18 : 9)}
              stroke={t.major ? "var(--syringe-tick)" : "var(--syringe-tick-minor)"}
              strokeWidth={t.major ? 1.4 : 0.9}
            />
            {t.label && (
              <text x={t.x} y={BARREL_Y + BARREL_H + 20} fill="var(--syringe-label)" fontSize={12} fontFamily="var(--font-mono)" textAnchor="middle">
                {t.label}
              </text>
            )}
          </g>
        ))}

        {/* Draw line and label */}
        {hasFluid && (
          <g filter={`url(#${id("glow")})`}>
            <line x1={fluidEnd} x2={fluidEnd} y1={BARREL_Y - 40} y2={BARREL_Y + BARREL_H + 30} stroke="var(--accent)" strokeWidth={1.6} strokeDasharray="5 4" />
            <rect x={fluidEnd - 34} y={BARREL_Y - 66} width={68} height={26} rx={13} fill="var(--accent)" />
            <text x={fluidEnd} y={BARREL_Y - 48} fill="#151515" fontSize={13} fontFamily="var(--font-mono)" fontWeight={600} textAnchor="middle">
              {unitsToDrawPerDose > 0 ? `${unitsToDrawPerDose.toFixed(1)} u` : "0"}
            </text>
          </g>
        )}

        {/* Drip at the tip */}
        {hasFluid && (
          <circle cx={NEEDLE_TIP - 8} cy={MID_Y + 8} r={3} fill="var(--accent)" opacity={0.6} className="animate-drip" />
        )}
      </svg>
    </div>
  );
}
