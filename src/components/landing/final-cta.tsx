"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SplitWords } from "@/components/motion/reveal";
import { SignInButton } from "@/components/auth/sign-in-button";

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [120, -160]);
  const glowX = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const ruleScale = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);

  return (
    <section ref={ref} className="px-2 sm:px-3 pt-24 md:pt-32">
      <div className="canvas relative overflow-hidden rounded-[24px] sm:rounded-[32px] px-6 sm:px-10 lg:px-14 py-16 md:py-24">
        <motion.div
          aria-hidden
          style={{ y: glowY, x: glowX }}
          className="pointer-events-none absolute -top-32 right-[5%] h-[520px] w-[520px] rounded-full blur-3xl"
        >
          <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, rgba(0,200,5,0.26), transparent 62%)" }} />
        </motion.div>

        <div className="relative grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <SplitWords
              text="Measure once. Draw with confidence."
              className="text-4xl md:text-6xl font-medium tracking-display leading-[0.98] max-w-[16ch]"
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
          className="graduation relative mt-12"
        />
      </div>
    </section>
  );
}
