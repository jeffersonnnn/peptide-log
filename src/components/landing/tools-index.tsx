"use client";
import Link from "next/link";
import { Reveal, SplitWords, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SignInButton } from "@/components/auth/sign-in-button";

const FREE = [
  {
    href: "/calculator",
    title: "Reconstitution calculator",
    desc: "Enter the vial, the water, and the dose. Get the units to draw on a visual syringe, doses per vial, and cost per dose.",
  },
  {
    href: "/learn/formula",
    title: "The formula, worked out",
    desc: "The four equations behind dosing, each step shown with your own numbers.",
  },
  {
    href: "/learn/reconstitution",
    title: "How to reconstitute",
    desc: "Mixing a vial safely, from swabbing the top to drawing the first dose.",
  },
  {
    href: "/peptides",
    title: "Peptide library",
    desc: "Dose ranges, injection frequency, vial sizes, storage, shelf life, and stacks for 17 peptides and blends.",
  },
  {
    href: "/learn/storage",
    title: "Storage and shelf life",
    desc: "Fridge or freezer, light sensitivity, and how many days a mixed vial keeps.",
  },
];

const MEMBER = [
  {
    href: "/tracker",
    title: "Cycle log",
    desc: "Record each injection, the site, side effects, pain, energy, and weight. Synced to your account and private.",
  },
  {
    href: "/compare",
    title: "Am I normal?",
    desc: "See how often other people on the same peptide report each side effect. Aggregate data only.",
  },
  {
    href: "/calculator",
    title: "Preset stacks and the stack builder",
    desc: "One-tap stacks like Wolverine, KLOW, and GLOW. Calculate several peptides at once and save the stack.",
  },
  {
    href: "/calculator",
    title: "Shareable result images",
    desc: "Turn a calculation or a log entry into an image you can post or send.",
  },
];

function Arrow() {
  return (
    <svg
      className="shrink-0 text-[var(--text-faint)] group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300"
      width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Row({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <StaggerItem className="border-b border-[var(--border)]">
      <Link href={href} className="group relative flex items-center gap-6 py-5 overflow-hidden">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-0 bg-white/[0.03] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
        />
        <div className="relative min-w-0 flex-1">
          <h3 className="text-lg md:text-xl tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
          <p className="mt-1 text-sm text-[var(--text-dim)] leading-relaxed max-w-[60ch]">{desc}</p>
        </div>
        <Arrow />
      </Link>
    </StaggerItem>
  );
}

/** What the site does, split by what needs no account and what a free account adds. */
export function ToolsIndex() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-5 sm:px-8 pt-24 md:pt-32">
      <div className="max-w-3xl">
        <SplitWords
          text="Everything you need for a cycle, in one place"
          className="text-3xl md:text-5xl font-medium tracking-display leading-[1.02]"
        />
        <Reveal delay={0.2}>
          <p className="mt-5 text-lg text-[var(--text-secondary)] leading-relaxed max-w-[58ch]">
            PeptideLog is a free reconstitution calculator, a set of dosing guides, and a
            peptide reference. Use those with no account. Sign in with an email address or a
            wallet to keep a private cycle log, build stacks, share results, and compare your
            side effects with the community.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div>
          <Reveal>
            <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-[var(--border-strong)]">
              <h3 className="text-xl tracking-tight">Use now, no account</h3>
              <span className="text-sm text-[var(--text-faint)]">Free forever</span>
            </div>
          </Reveal>
          <Stagger>
            {FREE.map((t) => (
              <Row key={t.title} {...t} />
            ))}
          </Stagger>
        </div>

        <div>
          <Reveal>
            <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-[var(--border-strong)]">
              <h3 className="text-xl tracking-tight">Sign in to unlock</h3>
              <span className="text-sm text-[var(--text-faint)]">Free account</span>
            </div>
          </Reveal>
          <Stagger>
            {MEMBER.map((t) => (
              <Row key={t.title} {...t} />
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <div className="mt-6 canvas rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <p className="text-white">Sign in takes ten seconds</p>
                <p className="mt-1 text-sm text-[var(--text-dim)] max-w-[40ch] leading-relaxed">
                  Pick an email address or a crypto wallet. Privy handles the login, so there is no
                  password to remember.
                </p>
              </div>
              <SignInButton variant="primary" className="shrink-0" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
