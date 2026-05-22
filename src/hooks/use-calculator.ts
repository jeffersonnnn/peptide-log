"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import type { CalculatorOutput } from "@/types";
import { calculateReconstitution } from "@/lib/calculator";
import { peptides } from "@/data/peptides";
import { incrementCounter } from "@/components/layout/usage-counter";

export function useCalculator() {
  const [peptideId, setPeptideId] = useState("bpc-157");
  const [vialSizeMg, setVialSizeMg] = useState(5);
  const [desiredDoseMcg, setDesiredDoseMcg] = useState(250);
  const [bacWaterMl, setBacWaterMl] = useState(2);
  const [syringeTypeId, setSyringeTypeId] = useState("u100-1ml");
  const [pricePerVial, setPricePerVial] = useState<number | undefined>();
  const isFirstRender = useRef(true);

  const selectedPeptide = useMemo(
    () => peptides.find((p) => p.id === peptideId),
    [peptideId]
  );

  const result: CalculatorOutput | null = useMemo(
    () =>
      calculateReconstitution(
        vialSizeMg,
        desiredDoseMcg,
        bacWaterMl,
        syringeTypeId,
        pricePerVial
      ),
    [vialSizeMg, desiredDoseMcg, bacWaterMl, syringeTypeId, pricePerVial]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (result) {
      incrementCounter();
    }
  }, [result]);

  function selectPeptide(id: string) {
    setPeptideId(id);
    const pep = peptides.find((p) => p.id === id);
    if (pep) {
      setVialSizeMg(pep.commonVialSizesMg[0]);
      setDesiredDoseMcg(pep.typicalDoseRangeMcg[0]);
      if (pep.id === "nad-plus") {
        setBacWaterMl(10);
      } else {
        setBacWaterMl(2);
      }
    }
  }

  return {
    peptideId,
    vialSizeMg,
    desiredDoseMcg,
    bacWaterMl,
    syringeTypeId,
    pricePerVial,
    selectedPeptide,
    result,
    selectPeptide,
    setVialSizeMg,
    setDesiredDoseMcg,
    setBacWaterMl,
    setSyringeTypeId,
    setPricePerVial,
  };
}
