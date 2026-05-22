"use client";
import { InjectionZone } from "./injection-zone";

interface BodyFrontProps {
  selectedZone: string;
  onSelectZone: (id: string) => void;
}

const frontZones = [
  { id: "left-delt", label: "L Delt", cx: 42, cy: 95, rx: 14, ry: 12 },
  { id: "right-delt", label: "R Delt", cx: 108, cy: 95, rx: 14, ry: 12 },
  { id: "left-abdomen", label: "L Abdomen", cx: 58, cy: 162, rx: 16, ry: 14 },
  { id: "right-abdomen", label: "R Abdomen", cx: 92, cy: 162, rx: 16, ry: 14 },
  { id: "left-quad", label: "L Quad", cx: 58, cy: 230, rx: 14, ry: 18 },
  { id: "right-quad", label: "R Quad", cx: 92, cy: 230, rx: 14, ry: 18 },
];

export function BodyFront({ selectedZone, onSelectZone }: BodyFrontProps) {
  return (
    <svg viewBox="0 0 150 320" className="w-full h-full max-h-80">
      {/* Head */}
      <circle cx={75} cy={28} r={18} fill="none" stroke="var(--body-stroke)" strokeWidth={1.2} />
      {/* Neck */}
      <line x1={75} y1={46} x2={75} y2={56} stroke="var(--body-stroke-dim)" strokeWidth={4} strokeLinecap="round" />
      {/* Torso */}
      <path
        d="M50 58 Q45 58 38 72 L32 90 Q30 96 32 100 L34 108 Q36 112 38 112 L40 112
           Q42 112 44 108 L48 98 Q50 94 50 90 L50 58Z"
        fill="none" stroke="var(--body-stroke-dim)" strokeWidth={1.2}
        transform="scale(-1,1) translate(-150,0)"
      />
      <path
        d="M50 58 Q45 58 38 72 L32 90 Q30 96 32 100 L34 108 Q36 112 38 112 L40 112
           Q42 112 44 108 L48 98 Q50 94 50 90 L50 58Z"
        fill="none" stroke="var(--body-stroke-dim)" strokeWidth={1.2}
      />
      {/* Simplified torso outline */}
      <path
        d="M50 58 L100 58 Q112 62 118 80 L122 92 Q124 100 120 108 L116 114 Q112 116 108 114
           L104 108 L100 96 L100 140 Q100 150 98 160 L96 180 Q94 190 94 200 L94 210
           Q94 218 92 226 L88 260 Q86 270 84 280 L82 300
           M50 58 Q38 62 32 80 L28 92 Q26 100 30 108 L34 114 Q38 116 42 114
           L46 108 L50 96 L50 140 Q50 150 52 160 L54 180 Q56 190 56 200 L56 210
           Q56 218 58 226 L62 260 Q64 270 66 280 L68 300"
        fill="none" stroke="var(--body-stroke)" strokeWidth={1.2} strokeLinejoin="round"
      />

      {/* Injection zones */}
      {frontZones.map((zone) => (
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
