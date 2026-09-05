"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { peptides } from "@/data/peptides";

const AVATARS = [
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
  "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
  "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
  "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100",
];

/** Small triangular dot pattern (9 squares) inside a 20x20 box. */
function TriangleDots() {
  const rows = [4, 3, 2];
  const dots: { x: number; y: number }[] = [];
  rows.forEach((count, r) => {
    const rowWidth = (count - 1) * 5;
    const startX = (18 - rowWidth) / 2;
    for (let i = 0; i < count; i++) {
      dots.push({ x: startX + i * 5, y: 2 + r * 6 });
    }
  });
  return (
    <div className="relative h-5 w-5">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute bg-white/60"
          style={{ width: 2.5, height: 2.5, left: d.x, top: d.y }}
        />
      ))}
    </div>
  );
}

/** 3x3 checkerboard grid icon. */
function GridDots() {
  const on = [true, false, true, false, true, false, true, false, true];
  return (
    <div className="grid grid-cols-3 gap-[2px]">
      {on.map((v, i) => (
        <span
          key={i}
          className={`rounded-[1px] ${v ? "bg-white/60" : "bg-white/0"}`}
          style={{ width: 4, height: 4 }}
        />
      ))}
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div>
      <div className="mb-2">{icon}</div>
      <div className="text-xl sm:text-2xl md:text-3xl font-normal text-white tabular-nums">
        {value}
      </div>
      <div className="text-xs sm:text-sm font-light text-white/60">{label}</div>
    </div>
  );
}

export function HeroLanding() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/counter")
      .then((r) => r.json())
      .then((j) => setCount(j.count))
      .catch(() => setCount(null));
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between px-5 sm:px-8 md:px-12 lg:px-16 pb-10 sm:pb-14">
      {/* Top block */}
      <div className="mt-28 sm:mt-32 md:mt-40 max-w-2xl">
        {/* Badge */}
        <div
          className="hero-in liquid-glass rounded-full inline-flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 mb-5 sm:mb-6"
          style={{ animationDelay: "0.05s" }}
        >
          <div className="flex -space-x-2">
            {AVATARS.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/20 object-cover"
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm font-light text-white/80">
            precision reconstitution tools
          </span>
        </div>

        {/* Heading */}
        <h1
          className="hero-in font-normal text-white leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ letterSpacing: "-0.05em", animationDelay: "0.13s" }}
        >
          <span>Measure.</span>
          <br />
          <span className="text-[var(--accent)]">Calculate.</span>
          <br />
          <span className="text-white/70">Inject.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-in mt-4 sm:mt-5 max-w-[46ch] text-sm sm:text-base md:text-lg font-light text-white/70 leading-relaxed"
          style={{ animationDelay: "0.21s" }}
        >
          Precision reconstitution. Every unit is measured, every dose is
          calculated — with a visual syringe guide, cycle tracking, and
          community analytics.
        </p>

        {/* CTAs */}
        <div className="hero-in mt-6 sm:mt-8 flex items-center gap-4" style={{ animationDelay: "0.29s" }}>
          <Link
            href="/calculator"
            className="liquid-glass rounded-full px-6 py-3 sm:px-7 sm:py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-white/10"
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

      {/* Bottom stats */}
      <div
        className="hero-in flex items-end gap-6 sm:gap-10 md:gap-16"
        style={{ animationDelay: "0.4s" }}
      >
        <Stat
          icon={<TriangleDots />}
          value={`${peptides.length} Peptides`}
          label="In the library"
        />
        <Stat
          icon={<GridDots />}
          value={count !== null ? count.toLocaleString() : "—"}
          label="Calculations run"
        />
      </div>
    </section>
  );
}
