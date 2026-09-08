"use client";
import { motion } from "framer-motion";

const steps = [
  {
    num: 1,
    title: "Gather Supplies",
    desc: "Peptide vial, bacteriostatic (BAC) water, alcohol swabs, insulin syringe (U100 recommended).",
    icon: "🧪",
    warning: null,
  },
  {
    num: 2,
    title: "Swab Both Vial Tops",
    desc: "Clean the rubber stoppers on both the peptide vial and BAC water vial with alcohol swabs. Let dry 10 seconds.",
    icon: "🧴",
    warning: null,
  },
  {
    num: 3,
    title: "Draw BAC Water",
    desc: "Pull back the plunger on your syringe to the desired amount of BAC water (use the calculator above). Insert needle into BAC water vial and draw.",
    icon: "💉",
    warning: null,
  },
  {
    num: 4,
    title: "Equalize Air Pressure",
    desc: "Before injecting BAC water into the peptide vial, pull back the plunger slightly to draw an equal volume of air. Inject the air into the peptide vial FIRST, then slowly inject the BAC water.",
    icon: "🌬️",
    warning: "CRITICAL: Skipping air equalization can cause the plunger to shoot across the room due to pressure buildup. This wastes your peptide and creates a mess.",
  },
  {
    num: 5,
    title: "Inject BAC Water Slowly",
    desc: "Aim the stream of water against the glass wall of the vial, NOT directly onto the peptide powder. Let it run down the side gently.",
    icon: "💧",
    warning: "Never spray directly onto the lyophilized powder. This can damage the peptide structure.",
  },
  {
    num: 6,
    title: "Swirl Gently - Do NOT Shake",
    desc: "Roll the vial between your palms or gently swirl. The peptide should dissolve within 1-2 minutes. The solution should be clear, not cloudy.",
    icon: "🔄",
    warning: "Shaking can denature the peptide. If the solution is cloudy after 5 minutes of gentle swirling, the peptide may be degraded.",
  },
  {
    num: 7,
    title: "Draw Your Dose",
    desc: "Insert needle into the reconstituted vial. Draw to the number of units shown by the calculator. Tap out any air bubbles.",
    icon: "📐",
    warning: null,
  },
  {
    num: 8,
    title: "Inject & Store",
    desc: "SubQ injection into belly fat (most common) or near the injury site. Store the reconstituted vial in the fridge. Note the date - check shelf life for your peptide.",
    icon: "✅",
    warning: null,
  },
];

export function ReconWalkthrough() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">
        <span className="text-[var(--accent)]">Step-by-Step</span> Reconstitution Guide
      </h2>
      <p className="text-[var(--text-dim)] text-xs">
        How to reconstitute peptides safely. Follow every step.
      </p>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="panel-glass p-4"
          >
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-base">
                {step.icon}
              </div>
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[var(--accent)] font-mono font-bold">
                    STEP {step.num}
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--text)]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-[var(--text-dim)] text-xs leading-relaxed">
                  {step.desc}
                </p>
                {step.warning && (
                  <div className="mt-2 p-2 rounded bg-white/[0.04] border border-[var(--border-strong)]">
                    <p className="text-[var(--tint)] text-[10px] font-mono leading-relaxed">
                      ⚠️ {step.warning}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
