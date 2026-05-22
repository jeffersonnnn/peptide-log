export interface Peptide {
  id: string;
  name: string;
  ticker: string;
  category: "healing" | "weight" | "cosmetic" | "cognitive" | "sleep" | "blend";
  commonVialSizesMg: number[];
  typicalDoseRangeMcg: [number, number];
  injectionFrequency: string;
  storage: "fridge" | "freezer" | "room";
  uvSensitive: boolean;
  shelfLifeReconstitutedDays: number;
  bacWaterExpiryDays: number;
  commonSideEffects: string[];
  stackCompatibility: string[];
  notes: string;
}

export interface SyringeType {
  id: string;
  label: string;
  totalUnits: number;
  totalMl: number;
  majorTickEvery: number;
  minorTickEvery: number;
}

export interface CalculatorInput {
  peptideId: string;
  vialSizeMg: number;
  desiredDoseMcg: number;
  bacWaterMl: number;
  syringeType: string;
  pricePerVial?: number;
}

export interface CalculatorOutput {
  concentrationMgPerMl: number;
  concentrationMcgPerMl: number;
  unitsToDrawPerDose: number;
  mlToDrawPerDose: number;
  dosesPerVial: number;
  costPerDose?: number;
  drawLinePosition: number;
  warning?: string;
}

export interface CycleEntry {
  id: string;
  date: string;
  peptides: {
    peptideId: string;
    doseMcg: number;
    injectionSite: string;
  }[];
  sideEffects: string[];
  painLevel: number;
  energyLevel: number;
  weight?: number;
  notes: string;
  createdAt: string;
}

export interface StackPreset {
  id: string;
  name: string;
  description: string;
  peptides: {
    peptideId: string;
    defaultDoseMcg: number;
    defaultVialMg: number;
  }[];
}

export interface SideEffect {
  id: string;
  label: string;
  category: "physical" | "mental" | "digestive" | "sleep";
}
