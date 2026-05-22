"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { UsageCounter } from "@/components/layout/usage-counter";

function RulerY() {
  return (
    <div className="hidden md:flex flex-col justify-between w-10 border-r border-[var(--accent-dim)] py-4 shrink-0 select-none"
      style={{
        backgroundImage: "linear-gradient(to bottom, var(--accent-faint) 1px, transparent 1px)",
        backgroundSize: "100% 20px",
      }}
    >
      {[0, 200, 400, 600, 800, 1000].map((n) => (
        <span key={n} className="text-[8px] font-mono text-[var(--text-faint)] text-right pr-1.5 tabular-nums">
          {n}
        </span>
      ))}
    </div>
  );
}

function RulerX() {
  return (
    <div className="h-6 border-b border-[var(--accent-dim)] w-full select-none"
      style={{
        backgroundImage: "linear-gradient(to right, var(--accent-faint) 1px, transparent 1px)",
        backgroundSize: "20px 100%",
      }}
    />
  );
}

function ConcentricRings() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.3, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    function isDark() {
      return document.documentElement.classList.contains("dark");
    }

    function getRingColor(): [number, number, number] {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue("--accent").trim();
      const m = accent.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
      if (m) return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
      return [15, 118, 110];
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const [cr, cg, cb] = getRingColor();
      const dark = isDark();
      const baseAlpha1 = dark ? 0.12 : 0.18;
      const baseAlpha2 = dark ? 0.08 : 0.12;

      const cx1 = w * 0.35 + mx * 30;
      const cy1 = h * 0.45 + my * 30;
      const cx2 = w * 0.7 - mx * 20;
      const cy2 = h * 0.3 - my * 20;

      canvas.style.mixBlendMode = dark ? "screen" : "multiply";

      for (let r = 20; r < Math.max(w, h) * 1.2; r += 22) {
        ctx.beginPath();
        ctx.arc(cx1, cy1, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${Math.max(0.02, baseAlpha1 - r * 0.0001)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let r = 20; r < Math.max(w, h) * 1.2; r += 22) {
        ctx.beginPath();
        ctx.arc(cx2, cy2, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${Math.max(0.015, baseAlpha2 - r * 0.00008)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    }

    function handleResize() {
      if (!canvas) return;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx!.scale(2, 2);
    }

    function handleMouse(e: MouseEvent) {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    }

    handleResize();
    draw();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}

const features = [
  {
    num: "001",
    label: "Reconstitution",
    title: "Precision\nCalculator",
    desc: "Exact syringe units from vial size, BAC water, and desired dose. Visual guide included.",
    href: "/",
  },
  {
    num: "002",
    label: "Tracking",
    title: "Cycle\nLog",
    desc: "Log injections, side effects, and how you feel. Cloud-synced and private.",
    href: "/tracker",
  },
  {
    num: "003",
    label: "Analytics",
    title: "Community\nCompare",
    desc: "See how your side effects compare to the community. Anonymous aggregate data.",
    href: "/compare",
  },
  {
    num: "004",
    label: "Reference",
    title: "Peptide\nGuide",
    desc: "Storage, reconstitution walkthroughs, and a complete library of 17 peptides.",
    href: "/guide",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function HeroLanding() {
  const [copied, setCopied] = useState(false);
  const contractAddress = "Coming Soon";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative">
      {/* Top ruler */}
      <RulerX />

      <div className="flex">
        {/* Left ruler */}
        <RulerY />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header bar */}
          <div className="border-b border-[var(--accent-dim)] grid grid-cols-2 md:grid-cols-3">
            <div className="p-4 md:p-6 border-r border-[var(--accent-dim)]">
              <span className="text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-[0.15em] block mb-2">
                Bureau
              </span>
              <div className="font-bold text-lg md:text-xl tracking-[-0.04em] leading-[0.9]">
                <span className="text-[var(--accent)]">Peptide</span>
                <span className="text-[var(--text-secondary)]">Log</span>
              </div>
            </div>
            <div className="p-4 md:p-6 border-r border-[var(--accent-dim)] hidden md:flex flex-col justify-between">
              <span className="text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-[0.15em] block mb-2">
                Status
              </span>
              <div className="flex items-center gap-2">
                <UsageCounter />
              </div>
            </div>
            <div className="p-4 md:p-6 flex flex-col justify-between">
              <span className="text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-[0.15em] block mb-2">
                Version
              </span>
              <span className="text-[var(--text-faint)] text-xs font-mono">v2.0 -- 2026</span>
            </div>
          </div>

          {/* Hero section */}
          <div className="relative min-h-[50vh] md:min-h-[65vh] border-b border-[var(--accent-dim)] overflow-hidden">
            <ConcentricRings />
            <motion.div
              className="relative z-10 flex flex-col justify-end h-full min-h-[50vh] md:min-h-[65vh] p-6 md:p-10"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <motion.span
                variants={fadeUp}
                className="text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-[0.2em] mb-4 md:mb-6"
              >
                Reconstitution Tools
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="font-bold tracking-[-0.04em] leading-[0.88] mb-4 md:mb-6"
                style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
              >
                <span className="text-[var(--text)]">Measure.</span>
                <br />
                <span className="text-[var(--accent)]">Calculate.</span>
                <br />
                <span className="text-[var(--text-secondary)]">Inject.</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-[var(--text-dim)] text-sm md:text-base max-w-[38ch] leading-relaxed mb-6"
              >
                Precision reconstitution calculator with visual syringe guide,
                cycle tracking, and community side-effect analytics. Every unit is measured. Every dose is calculated.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="#calculator"
                  className="inline-block px-5 py-3 border border-[var(--accent-dim)] text-[var(--accent)] font-mono text-xs uppercase tracking-[0.1em] hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
                >
                  Open Calculator
                </a>
                <button
                  onClick={handleCopy}
                  className="font-mono text-xs text-[var(--text-dim)] tracking-wide cursor-pointer hover:text-[var(--text)] transition-colors duration-150"
                  title="Click to copy"
                >
                  Contract Address: <span className="text-[var(--accent)]">{copied ? "Copied!" : contractAddress}</span>
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Ruler divider */}
          <RulerX />

          {/* Feature cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((f) => (
              <motion.div key={f.num} variants={fadeUp}>
                <Link
                  href={f.href}
                  className="group block p-6 md:p-8 border-b border-r border-[var(--accent-dim)] min-h-[220px] md:min-h-[280px] flex flex-col justify-between transition-colors duration-200 hover:bg-[var(--accent)] hover:border-[var(--accent-dim)]"
                >
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[var(--text-dim)] group-hover:text-white/50 transition-colors">
                      {f.num} -- {f.label}
                    </span>
                    <h3 className="font-bold text-xl md:text-2xl tracking-[-0.04em] leading-[0.9] mt-3 text-[var(--text)] group-hover:text-white transition-colors whitespace-pre-line">
                      {f.title}
                    </h3>
                  </div>
                  <div>
                    <p className="text-[var(--text-dim)] text-xs leading-relaxed max-w-[28ch] group-hover:text-white/80 transition-colors">
                      {f.desc}
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="w-8 h-[1px] bg-[var(--accent-dim)] group-hover:bg-white/40 group-hover:w-12 transition-all duration-300 relative">
                        <div className="absolute right-0 -top-[3px] w-[7px] h-[7px] border-t border-r border-[var(--accent-dim)] group-hover:border-white/40 rotate-45 transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Ruler divider */}
          <RulerX />
        </div>
      </div>
    </div>
  );
}
