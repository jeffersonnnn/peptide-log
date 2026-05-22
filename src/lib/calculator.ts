import type { CalculatorOutput } from "@/types";
import { getSyringeById } from "@/data/syringe-types";

export function calculateReconstitution(
  vialSizeMg: number,
  desiredDoseMcg: number,
  bacWaterMl: number,
  syringeTypeId: string,
  pricePerVial?: number
): CalculatorOutput | null {
  if (vialSizeMg <= 0 || desiredDoseMcg <= 0 || bacWaterMl <= 0) return null;

  const syringe = getSyringeById(syringeTypeId);
  if (!syringe) return null;

  const concentrationMgPerMl = vialSizeMg / bacWaterMl;
  const concentrationMcgPerMl = concentrationMgPerMl * 1000;
  const mlToDrawPerDose = desiredDoseMcg / concentrationMcgPerMl;
  const unitsToDrawPerDose = mlToDrawPerDose * syringe.totalUnits;
  const dosesPerVial = (vialSizeMg * 1000) / desiredDoseMcg;
  const drawLinePosition = Math.min(unitsToDrawPerDose / syringe.totalUnits, 1);

  let warning: string | undefined;
  if (unitsToDrawPerDose > syringe.totalUnits) {
    warning = `Dose requires ${Math.round(unitsToDrawPerDose)} units, which exceeds ${syringe.label} capacity (${syringe.totalUnits} units). Use more BAC water or a larger syringe.`;
  }
  if (unitsToDrawPerDose < 1) {
    warning = `Dose is very small (${unitsToDrawPerDose.toFixed(1)} units). Consider using less BAC water for more precise dosing.`;
  }

  const costPerDose =
    pricePerVial && pricePerVial > 0
      ? pricePerVial / dosesPerVial
      : undefined;

  return {
    concentrationMgPerMl: round(concentrationMgPerMl, 4),
    concentrationMcgPerMl: round(concentrationMcgPerMl, 2),
    unitsToDrawPerDose: round(unitsToDrawPerDose, 1),
    mlToDrawPerDose: round(mlToDrawPerDose, 4),
    dosesPerVial: Math.floor(dosesPerVial),
    costPerDose: costPerDose ? round(costPerDose, 2) : undefined,
    drawLinePosition: round(drawLinePosition, 4),
    warning,
  };
}

function round(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
