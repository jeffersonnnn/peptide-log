"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SplitWords } from "@/components/motion/reveal";
import { SignInButton } from "@/components/auth/sign-in-button";

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ruleScale = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);

  return (
    <section ref={ref} className="px-2 sm:px-3 pt-24 md:pt-32">
      <div className="canvas relative overflow-hidden rounded-[24px] sm:rounded-[32px] px-6 sm:px-10 lg:px-14 py-16 md:py-24">
        <div className="relative grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <SplitWords
              text="Measure once. Draw with confidence."
              className="display text-4xl md:text-7xl max-w-[16ch]"
            />
            <Reveal delay={0.25}>
              <p className="mt-5 text-[var(--text-secondary)] text-lg max-w-[44ch] leading-relaxed">
                Your first calculation takes about twenty seconds, with no account. Sign in with an
                email or wallet when you want to keep a cycle log.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.35} className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <Link href="/calculator" className="btn-primary">
              Open the calculator
            </Link>
            <SignInButton label="Sign in to save a log" />
          </Reveal>
        </div>

        <motion.div
          aria-hidden
          style={{ scaleX: ruleScale, transformOrigin: "0% 50%" }}
          className="split-border relative mt-12"
        />
      </div>
    </section>
  );
}
