"use client";
import { motion } from "framer-motion";
import { sideEffects } from "@/data/side-effects";

interface ComparisonItem {
  sideEffect: string;
  percentage: number;
}

interface ComparisonViewProps {
  data: ComparisonItem[];
  peptideName: string;
}

function getBarColor(pct: number): string {
  if (pct >= 70) return "var(--bone)";
  if (pct >= 40) return "var(--tint)";
  return "var(--mid-gray)";
}

export function ComparisonView({ data, peptideName }: ComparisonViewProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--text-faint)] font-mono">
        Based on community reports for {peptideName}
      </p>
      {data.map((item, i) => {
        const se = sideEffects.find((s) => s.id === item.sideEffect);
        const label = se?.label ?? item.sideEffect.replace(/-/g, " ");
        const color = getBarColor(item.percentage);

        return (
          <motion.div
            key={item.sideEffect}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-secondary)] capitalize">{label}</span>
              <span
                className="text-xs font-mono font-semibold"
                style={{ color }}
              >
                {item.percentage}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-[var(--accent-faint)] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
