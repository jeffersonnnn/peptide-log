"use client";
import { motion, useScroll, useSpring } from "framer-motion";

/** A thin accent line along the bottom of the nav that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-[var(--accent)]"
    />
  );
}
