import type { SyringeType } from "@/types";

export const syringeTypes: SyringeType[] = [
  {
    id: "u100-1ml",
    label: "U100 Insulin (1mL)",
    totalUnits: 100,
    totalMl: 1.0,
    majorTickEvery: 10,
    minorTickEvery: 2,
  },
  {
    id: "u100-0.5ml",
    label: "U100 Insulin (0.5mL)",
    totalUnits: 50,
    totalMl: 0.5,
    majorTickEvery: 10,
    minorTickEvery: 1,
  },
  {
    id: "u100-0.3ml",
    label: "U100 Insulin (0.3mL)",
    totalUnits: 30,
    totalMl: 0.3,
    majorTickEvery: 5,
    minorTickEvery: 1,
  },
  {
    id: "1ml-standard",
    label: "Standard 1mL Syringe",
    totalUnits: 100,
    totalMl: 1.0,
    majorTickEvery: 10,
    minorTickEvery: 5,
  },
];

export function getSyringeById(id: string): SyringeType | undefined {
  return syringeTypes.find((s) => s.id === id);
}
