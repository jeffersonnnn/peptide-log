"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { CalculatorOutput } from "@/types";

interface ResultsProps {
  result: CalculatorOutput | null;
}

function StatCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string | number;
  suffix: string;
}) {
  return (
    <div className="panel-glass p-3 rounded-xl">
      <p className="text-xs text-[var(--text-faint)] mb-1">
        {label}
      </p>
      <p className="font-mono font-bold text-xl text-[var(--text)]">
        {value}
        <span className="text-xs font-normal text-[var(--text-faint)] ml-1">{suffix}</span>
      </p>
    </div>
  );
}

export function CalculationResults({ result }: ResultsProps) {
  if (!result) {
    return (
      <div className="panel-glass p-8 text-center">
        <div className="text-[var(--text-faint)] text-xs mb-2">
          Results
        </div>
        <p className="text-[var(--text-faint)] text-sm">
          Enter values to see results
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="wait">
        <motion.div
          key="hero"
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl border border-[var(--accent-dim)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(228,226,216,0.10) 0%, rgba(228,226,216,0.03) 100%)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(167,180,186,0.16),transparent_70%)]" />
          <div className="relative px-5 py-6 text-center">
            <p className="text-xs text-[var(--accent)]/60 mb-2">
              Draw
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-mono font-black text-5xl md:text-6xl text-[var(--accent)] tabular-nums">
                {result.unitsToDrawPerDose}
              </span>
              <span className="text-lg text-[var(--accent)]/50 font-mono font-medium">
                units
              </span>
            </div>
            <p className="text-[var(--text-faint)] text-xs font-mono mt-2">
              {result.mlToDrawPerDose} mL per dose
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-2">
        <StatCard
          label="Concentration"
          value={result.concentrationMgPerMl}
          suffix="mg/mL"
        />
        <StatCard
          label="Doses per vial"
          value={result.dosesPerVial}
          suffix="doses"
        />
        {result.costPerDose !== undefined && (
          <StatCard
            label="Cost per dose"
            value={`$${result.costPerDose}`}
            suffix=""
          />
        )}
      </div>

      {result.warning && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-white/[0.06] border border-[var(--border-strong)] text-[var(--tint)] text-xs font-mono"
        >
          {result.warning}
        </motion.div>
      )}
    </div>
  );
}
