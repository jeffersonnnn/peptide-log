"use client";
import { motion } from "framer-motion";
import { getSyringeById } from "@/data/syringe-types";

interface SyringeVisualProps {
  drawLinePosition: number;
  unitsToDrawPerDose: number;
  syringeTypeId: string;
  warning?: string;
}

export function SyringeVisual({
  drawLinePosition,
  unitsToDrawPerDose,
  syringeTypeId,
}: SyringeVisualProps) {
  const syringe = getSyringeById(syringeTypeId);
  if (!syringe) return null;

  const svgW = 120;
  const svgH = 480;
  const barrelX = 35;
  const barrelW = 50;
  const barrelTop = 60;
  const barrelBottom = 400;
  const barrelH = barrelBottom - barrelTop;
  const needleX = barrelX + barrelW / 2;
  const needleTop = barrelBottom;
  const needleBottom = 450;

  const fillHeight = Math.min(drawLinePosition, 1) * barrelH;
  const fillY = barrelBottom - fillHeight;

  const totalTicks = syringe.totalUnits;
  const ticks: { y: number; isMajor: boolean; label: string }[] = [];
  for (let i = 0; i <= totalTicks; i += syringe.minorTickEvery) {
    const pct = i / totalTicks;
    const y = barrelBottom - pct * barrelH;
    const isMajor = i % syringe.majorTickEvery === 0;
    ticks.push({ y, isMajor, label: isMajor ? String(i) : "" });
  }

  const drawLineY = barrelBottom - drawLinePosition * barrelH;
  const clampedDrawY = Math.max(barrelTop, Math.min(barrelBottom, drawLineY));

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="w-28 md:w-36 h-auto select-none"
        aria-label={`Syringe showing ${unitsToDrawPerDose} units to draw`}
      >
        <defs>
          <linearGradient id="fluid-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--accent-hover)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
          <linearGradient id="barrel-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--syringe-glass-from)" />
            <stop offset="50%" stopColor="var(--syringe-glass-mid)" />
            <stop offset="100%" stopColor="var(--syringe-glass-from)" />
          </linearGradient>
          <clipPath id="barrel-clip">
            <rect
              x={barrelX}
              y={barrelTop}
              width={barrelW}
              height={barrelH}
              rx={4}
            />
          </clipPath>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Plunger handle (T-shape) */}
        <rect
          x={needleX - 20}
          y={8}
          width={40}
          height={6}
          rx={3}
          fill="var(--syringe-struct)"
        />
        {/* Plunger rod */}
        <motion.rect
          x={needleX - 3}
          width={6}
          rx={2}
          fill="var(--syringe-tick-minor)"
          animate={{ y: 14, height: Math.max(0, clampedDrawY - 14) }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />
        {/* Plunger stopper */}
        <motion.rect
          x={barrelX + 2}
          width={barrelW - 4}
          height={8}
          rx={2}
          fill="var(--syringe-struct)"
          animate={{ y: clampedDrawY - 8 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />

        {/* Barrel outline */}
        <rect
          x={barrelX}
          y={barrelTop}
          width={barrelW}
          height={barrelH}
          rx={4}
          fill="url(#barrel-glass)"
          stroke="var(--syringe-barrel)"
          strokeWidth={1.5}
        />

        {/* Fluid fill */}
        <g clipPath="url(#barrel-clip)">
          <motion.rect
            x={barrelX}
            width={barrelW}
            fill="url(#fluid-grad)"
            animate={{ y: fillY, height: fillHeight }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          />
          {/* Meniscus curve */}
          <motion.ellipse
            cx={barrelX + barrelW / 2}
            rx={barrelW / 2}
            ry={3}
            fill="var(--accent)"
            opacity={0.4}
            animate={{ cy: fillY }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          />
          {/* Glow zone from bottom to draw line */}
          <motion.rect
            x={barrelX}
            width={barrelW}
            fill="rgba(0, 212, 190, 0.08)"
            className="animate-pulse-glow"
            animate={{ y: fillY, height: fillHeight }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          />
        </g>

        {/* Graduation marks */}
        {ticks.map((tick, i) => (
          <g key={i}>
            <line
              x1={barrelX + barrelW}
              y1={tick.y}
              x2={barrelX + barrelW + (tick.isMajor ? 12 : 6)}
              y2={tick.y}
              stroke={tick.isMajor ? "var(--syringe-tick)" : "var(--syringe-tick-minor)"}
              strokeWidth={tick.isMajor ? 1.2 : 0.7}
            />
            {tick.label && (
              <text
                x={barrelX + barrelW + 16}
                y={tick.y + 3}
                fill="var(--syringe-label)"
                fontSize={8}
                fontFamily="var(--font-mono)"
              >
                {tick.label}
              </text>
            )}
          </g>
        ))}

        {/* Draw line indicator */}
        {drawLinePosition > 0 && drawLinePosition <= 1 && (
          <g filter="url(#glow)">
            <motion.line
              x1={barrelX - 8}
              x2={barrelX + barrelW + 8}
              stroke="var(--accent)"
              strokeWidth={1.5}
              strokeDasharray="4 2"
              animate={{ y1: clampedDrawY, y2: clampedDrawY }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            />
            <motion.polygon
              points={`${barrelX - 12},${0} ${barrelX - 8},${-4} ${barrelX - 8},${4}`}
              fill="var(--accent)"
              animate={{ transform: `translateY(${clampedDrawY}px)` }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            />
          </g>
        )}

        {/* Needle connector */}
        <rect
          x={needleX - 6}
          y={barrelBottom}
          width={12}
          height={10}
          fill="var(--syringe-barrel)"
          rx={1}
        />
        {/* Needle */}
        <line
          x1={needleX}
          y1={needleTop + 10}
          x2={needleX}
          y2={needleBottom}
          stroke="var(--syringe-struct-bold)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        {/* Needle tip */}
        <circle
          cx={needleX}
          cy={needleBottom + 2}
          r={1}
          fill="var(--syringe-struct-bold)"
        />
        {/* Drip */}
        {drawLinePosition > 0 && (
          <circle
            cx={needleX}
            cy={needleBottom + 6}
            r={1.5}
            fill="var(--accent)"
            opacity={0.5}
            className="animate-drip"
          />
        )}

        {/* Units label */}
        {drawLinePosition > 0 && (
          <motion.g
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <rect
              x={0}
              y={clampedDrawY - 12}
              width={30}
              height={16}
              rx={4}
              fill="var(--accent-dim)"
              stroke="var(--accent-dim)"
              strokeWidth={0.5}
            />
            <text
              x={15}
              y={clampedDrawY + 1}
              fill="var(--accent)"
              fontSize={8}
              fontFamily="var(--font-mono)"
              fontWeight={600}
              textAnchor="middle"
            >
              {unitsToDrawPerDose > 0 ? unitsToDrawPerDose.toFixed(1) : "0"}
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  );
}
