"use client";
import { motion } from "framer-motion";

interface InjectionZoneProps {
  id: string;
  label: string;
  cx: number;
  cy: number;
  rx?: number;
  ry?: number;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function InjectionZone({
  id,
  label,
  cx,
  cy,
  rx = 18,
  ry = 14,
  selected,
  onSelect,
}: InjectionZoneProps) {
  return (
    <g
      onClick={() => onSelect(id)}
      className="cursor-pointer"
      role="button"
      aria-label={`Injection site: ${label}`}
    >
      {/* Hover/hit area */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx + 4}
        ry={ry + 4}
        fill="transparent"
      />
      {/* Zone outline */}
      <motion.ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={selected ? "rgba(228, 226, 216, 0.16)" : "transparent"}
        stroke={selected ? "var(--accent)" : "rgba(228, 226, 216, 0.22)"}
        strokeWidth={selected ? 1.5 : 1}
        strokeDasharray={selected ? "none" : "4 3"}
        animate={{
          fill: selected ? "rgba(228, 226, 216, 0.16)" : "rgba(228, 226, 216, 0.0)",
          stroke: selected ? "var(--accent)" : "rgba(228, 226, 216, 0.22)",
        }}
        whileHover={{
          fill: "rgba(228, 226, 216, 0.1)",
          stroke: "rgba(228, 226, 216, 0.42)",
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Center dot when selected */}
      {selected && (
        <motion.circle
          cx={cx}
          cy={cy}
          r={3}
          fill="var(--accent)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="animate-pulse-glow"
        />
      )}
      {/* Label */}
      <text
        x={cx}
        y={cy + ry + 12}
        textAnchor="middle"
        fill={selected ? "var(--accent)" : "rgba(255,255,255,0.3)"}
        fontSize={7}
        fontFamily="var(--font-mono)"
      >
        {label}
      </text>
    </g>
  );
}
