"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SplitWords } from "@/components/motion/reveal";

const FAQ = [
  {
    q: "Is PeptideLog free?",
    a: "Yes. The calculator, the formula guide, and the peptide library are free with no account. Sign in only to keep a cycle log, build stacks, or see community data.",
  },
  {
    q: "How do I sign in, and why would I?",
    a: "Click Sign in and choose an email address or a crypto wallet. Privy handles it, there is no password. Signing in unlocks the cycle log, preset stacks, the stack builder, shareable result images, and community side-effect data.",
  },
  {
    q: "Is there a token?",
    a: "A token is planned. The contract address is coming soon and will be posted in the footer of this site and on X at @peptidelog_. Do not trust any address posted anywhere else.",
  },
  {
    q: "What does reconstitution mean?",
    a: "It is mixing dry peptide powder with bacteriostatic water so you can draw an exact, repeatable dose.",
  },
  {
    q: "Which syringes does the calculator support?",
    a: "U100 insulin syringes in 1 mL, 0.5 mL, and 0.3 mL, and a standard 1 mL syringe.",
  },
  {
    q: "Does PeptideLog give medical advice?",
    a: "No. It is an educational calculator and reference for research use. Follow your local laws and a qualified professional.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. Install it as an app from your browser and the calculator keeps working with no connection.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-24 md:pt-32">
      <div className="grid md:grid-cols-[1fr,2fr] gap-8 md:gap-16">
        <SplitWords text="Good to know" className="text-3xl md:text-4xl font-medium tracking-display leading-[1.05]" />
        <Reveal className="border-t border-[var(--border)]">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-[var(--border)]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-base md:text-lg text-white">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 h-7 w-7 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-dim)]"
                    aria-hidden
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[var(--text-dim)] leading-relaxed max-w-[60ch]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
