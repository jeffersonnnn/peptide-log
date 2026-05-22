"use client";
import { InjectionZone } from "./injection-zone";

interface BodyBackProps {
  selectedZone: string;
  onSelectZone: (id: string) => void;
}

const backZones = [
  { id: "left-love-handle", label: "L Love Handle", cx: 44, cy: 148, rx: 12, ry: 16 },
  { id: "right-love-handle", label: "R Love Handle", cx: 106, cy: 148, rx: 12, ry: 16 },
  { id: "left-glute", label: "L Glute", cx: 58, cy: 200, rx: 16, ry: 16 },
  { id: "right-glute", label: "R Glute", cx: 92, cy: 200, rx: 16, ry: 16 },
  { id: "left-upper-arm", label: "L Upper Arm", cx: 34, cy: 105, rx: 10, ry: 16 },
  { id: "right-upper-arm", label: "R Upper Arm", cx: 116, cy: 105, rx: 10, ry: 16 },
];

export function BodyBack({ selectedZone, onSelectZone }: BodyBackProps) {
  return (
    <svg viewBox="0 0 150 320" className="w-full h-full max-h-80">
      {/* Head */}
      <circle cx={75} cy={28} r={18} fill="none" stroke="var(--body-stroke)" strokeWidth={1.2} />
      {/* Neck */}
      <line x1={75} y1={46} x2={75} y2={56} stroke="var(--body-stroke-dim)" strokeWidth={4} strokeLinecap="round" />
      {/* Back body outline */}
      <path
        d="M50 58 L100 58 Q112 62 118 80 L122 92 Q124 100 120 108 L116 114 Q112 116 108 114
           L104 108 L100 96 L100 140 Q100 150 98 160 L96 180 Q96 190 96 200 L94 210
           Q94 218 92 226 L88 260 Q86 270 84 280 L82 300
           M50 58 Q38 62 32 80 L28 92 Q26 100 30 108 L34 114 Q38 116 42 114
           L46 108 L50 96 L50 140 Q50 150 52 160 L54 180 Q54 190 54 200 L56 210
           Q56 218 58 226 L62 260 Q64 270 66 280 L68 300"
        fill="none" stroke="var(--body-stroke)" strokeWidth={1.2} strokeLinejoin="round"
      />
      {/* Spine line */}
      <line x1={75} y1={56} x2={75} y2={190} stroke="var(--body-stroke-faint)" strokeWidth={1} strokeDasharray="3 4" />
      {/* "BACK" label */}
      <text x={75} y={310} textAnchor="middle" fill="var(--body-label)" fontSize={8} fontFamily="var(--font-mono)">
        BACK VIEW
      </text>

      {/* Injection zones */}
      {backZones.map((zone) => (
        <InjectionZone
          key={zone.id}
          {...zone}
          selected={selectedZone === zone.id}
          onSelect={onSelectZone}
        />
      ))}
    </svg>
  );
}
