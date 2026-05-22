import type { StackPreset } from "@/types";

export const presets: StackPreset[] = [
  {
    id: "wolverine",
    name: "Wolverine Stack",
    description: "BPC-157 + TB-500 for accelerated healing",
    peptides: [
      { peptideId: "bpc-157", defaultDoseMcg: 500, defaultVialMg: 10 },
      { peptideId: "tb-500", defaultDoseMcg: 2500, defaultVialMg: 10 },
    ],
  },
  {
    id: "klow",
    name: "KLOW Stack",
    description: "BPC-157 + KPV for gut healing and anti-inflammatory",
    peptides: [
      { peptideId: "bpc-157", defaultDoseMcg: 500, defaultVialMg: 10 },
      { peptideId: "kpv", defaultDoseMcg: 300, defaultVialMg: 5 },
    ],
  },
  {
    id: "glow",
    name: "GLOW Stack",
    description: "GHK-Cu + BPC-157 for skin rejuvenation",
    peptides: [
      { peptideId: "ghk-cu", defaultDoseMcg: 400, defaultVialMg: 5 },
      { peptideId: "bpc-157", defaultDoseMcg: 250, defaultVialMg: 5 },
    ],
  },
  {
    id: "cognitive",
    name: "Cognitive Stack",
    description: "Selank + Semax for focus and anxiety reduction",
    peptides: [
      { peptideId: "selank", defaultDoseMcg: 300, defaultVialMg: 5 },
      { peptideId: "semax", defaultDoseMcg: 400, defaultVialMg: 5 },
    ],
  },
];
