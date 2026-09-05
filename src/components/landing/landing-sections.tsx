"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { peptides } from "@/data/peptides";

/* ── small inline icons ── */
const icon = (d: string) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {d.split("|").map((p, i) => (
      <path key={i} d={p} />
    ))}
  </svg>
);

const FEATURES = [
  {
    href: "/calculator",
    title: "Reconstitution Calculator",
    desc: "Turn vial size, BAC water, and dose into the exact syringe units to draw — with a visual syringe guide.",
    icon: icon("M12 2v20|M12 2l-3 6h6l-3-6zM8 14h8M6 18h12"),
  },
  {
    href: "/learn/formula",
    title: "The Formula, Explained",
    desc: "Understand the math. Every step is worked out, then you plug in your own numbers.",
    icon: icon("M4 19.5A2.5 2.5 0 016.5 17H20|M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"),
  },
  {
    href: "/peptides",
    title: "Peptide Library",
    desc: "Dose ranges, storage, and stacks for 17 research peptides. A dedicated page for each one.",
    icon: icon("M12 3a9 9 0 000 18|M3 12h18|M3 12a9 9 0 0118 0"),
  },
  {
    href: "/tracker",
    title: "Cycle Log",
    desc: "Track injections, side effects, and how you feel across a cycle. Private and cloud-synced.",
    icon: icon("M3 4h18v18H3zM16 2v4M8 2v4M3 10h18"),
  },
  {
    href: "/compare",
    title: "Am I Normal?",
    desc: "Compare your side effects against the community. Anonymous, aggregate data only.",
    icon: icon("M18 20V10M12 20V4M6 20v-6"),
  },
  {
    href: "/calculator",
    title: "Works Offline",
    desc: "Install it as an app. The calculator keeps working with no connection.",
    icon: icon("M5 12.55a11 11 0 0114 0|M8.5 16.1a6 6 0 017 0|M12 20h.01|M2 8.82a15 15 0 0120 0"),
  },
];

const STEPS = [
  { n: "01", title: "Pick your peptide", desc: "Choose from 17 peptides, or enter any vial size yourself." },
  { n: "02", title: "Enter dose & water", desc: "Set your target dose and how much bacteriostatic water you added." },
  { n: "03", title: "Draw with confidence", desc: "Get the exact units to draw, doses per vial, and cost per dose." },
];

const FAQ = [
  { q: "Is PeptideLog free?", a: "Yes. The calculator, the formula guide, and the peptide library are free to use — no account needed." },
  { q: "What does reconstitution mean?", a: "It is mixing dry peptide powder with bacteriostatic (BAC) water so you can draw an exact, repeatable dose." },
  { q: "Does PeptideLog give medical advice?", a: "No. It is an educational calculator and reference. Research use only. Always follow your local laws and a qualified professional." },
  { q: "Which syringes are supported?", a: "U100 insulin syringes (1 mL, 0.5 mL, 0.3 mL) and a standard 1 mL syringe." },
  { q: "Do I need to sign in?", a: "Only to save a cycle log, build stacks, or see community data. The core calculator works without an account." },
];

const CATEGORIES = [
  { key: "healing", label: "Healing & Recovery" },
  { key: "weight", label: "Weight & Metabolic" },
  { key: "cosmetic", label: "Cosmetic" },
  { key: "cognitive", label: "Cognitive" },
  { key: "sleep", label: "Sleep" },
  { key: "blend", label: "Blends" },
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--accent)] mb-3">
      {children}
    </span>
  );
}

export function LandingSections() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    fetch("/api/counter").then((r) => r.json()).then((j) => setCount(j.count)).catch(() => {});
  }, []);

  const catCounts = Object.fromEntries(
    CATEGORIES.map((c) => [c.key, peptides.filter((p) => p.category === c.key).length])
  );

  return (
    <div
      className="relative"
      style={{
        background:
          "linear-gradient(180deg, rgba(8,10,16,0) 0%, rgba(8,10,16,0.86) 9%, rgba(8,10,16,0.94) 100%)",
      }}
    >
      {/* Features */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-24 md:pt-32">
        <div className="max-w-2xl">
          <SectionEyebrow>Everything in one place</SectionEyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-white leading-[1.1]">
            The complete peptide toolkit
          </h2>
          <p className="mt-4 text-base md:text-lg font-light text-white/60 leading-relaxed">
            From the first calculation to a full cycle logged — PeptideLog covers
            the whole workflow, free.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Link
              key={f.title + f.href}
              href={f.href}
              className="group panel-glass p-6 flex flex-col gap-4 hover:border-[var(--accent)]/30 transition-colors"
            >
              <span className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
                {f.icon}
              </span>
              <div>
                <h3 className="text-lg font-medium text-white group-hover:text-[var(--accent)] transition-colors">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm font-light text-white/60 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-24 md:pt-32">
        <div className="max-w-2xl">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-white leading-[1.1]">
            Three steps to an exact dose
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="panel-glass p-7">
              <span className="text-4xl font-light text-[var(--accent)]/80 tabular-nums">{s.n}</span>
              <h3 className="mt-4 text-xl font-medium text-white">{s.title}</h3>
              <p className="mt-2 text-sm font-light text-white/60 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Precision highlight */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-24 md:pt-32">
        <div className="panel-glass p-8 md:p-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <SectionEyebrow>Measured to the unit</SectionEyebrow>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-[-0.03em] text-white leading-[1.15]">
              No more guesswork on the draw
            </h2>
            <p className="mt-4 text-base font-light text-white/60 leading-relaxed">
              The visual syringe shows exactly where to draw. Built-in warnings
              catch a dose that overflows your syringe or reads too small to
              measure — before you ever pick up the needle.
            </p>
            <Link
              href="/calculator"
              className="liquid-glass inline-block mt-6 rounded-full px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              Open the Calculator
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: "0.1 mL", l: "per dose, exact" },
              { v: "10", l: "units to draw" },
              { v: "20", l: "doses per vial" },
              { v: "U100", l: "syringe support" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-2xl md:text-3xl font-normal text-white tabular-nums">{s.v}</div>
                <div className="mt-1 text-xs font-light text-white/50">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Library */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-24 md:pt-32">
        <div className="max-w-2xl">
          <SectionEyebrow>Know your compound</SectionEyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-white leading-[1.1]">
            A reference for every peptide
          </h2>
          <p className="mt-4 text-base md:text-lg font-light text-white/60 leading-relaxed">
            Dose ranges, injection frequency, storage, shelf life, and stack
            compatibility — organized by what you are trying to do.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              href="/peptides"
              className="liquid-glass rounded-full px-5 py-2.5 text-sm font-light text-white/80 hover:text-white transition"
            >
              {c.label}
              <span className="ml-2 text-white/40 tabular-nums">{catCounts[c.key]}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-24 md:pt-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          {[
            { v: `${peptides.length}`, l: "Peptides in the library" },
            { v: count !== null ? count.toLocaleString() : "—", l: "Calculations run" },
            { v: "Free", l: "No paywall, ever" },
            { v: "Offline", l: "Installable as an app" },
          ].map((s) => (
            <div key={s.l} className="bg-[rgba(8,10,16,0.6)] p-6 md:p-8">
              <div className="text-2xl md:text-4xl font-normal text-white tabular-nums">{s.v}</div>
              <div className="mt-2 text-xs md:text-sm font-light text-white/55">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-5 sm:px-8 md:px-12 pt-24 md:pt-32">
        <SectionEyebrow>Questions</SectionEyebrow>
        <h2 className="text-3xl md:text-4xl font-normal tracking-[-0.03em] text-white leading-[1.1]">
          Good to know
        </h2>
        <div className="mt-10 divide-y divide-white/10">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-base md:text-lg font-medium text-white pr-6">{item.q}</span>
                <span className="shrink-0 text-white/40 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm md:text-base font-light text-white/60 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="panel-glass p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-normal tracking-[-0.03em] text-white leading-[1.1]">
            Start with your first calculation
          </h2>
          <p className="mt-4 text-base md:text-lg font-light text-white/60 max-w-xl mx-auto leading-relaxed">
            Free, precise, and private. Measure once, draw with confidence.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/calculator"
              className="liquid-glass rounded-full px-7 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              Open Calculator
            </Link>
            <Link
              href="/learn/formula"
              className="text-sm font-light text-white/70 hover:text-white transition-colors"
            >
              Learn the formula →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
