import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";

const DEMO_DATA: Record<string, { sideEffect: string; percentage: number }[]> = {
  "bpc-157": [
    { sideEffect: "fatigue", percentage: 72 },
    { sideEffect: "injection-site-pain", percentage: 58 },
    { sideEffect: "nausea", percentage: 34 },
    { sideEffect: "vivid-dreams", percentage: 28 },
    { sideEffect: "headache", percentage: 22 },
    { sideEffect: "mood-shift", percentage: 18 },
    { sideEffect: "appetite-change", percentage: 12 },
    { sideEffect: "dizziness", percentage: 8 },
  ],
  "tb-500": [
    { sideEffect: "fatigue", percentage: 65 },
    { sideEffect: "headache", percentage: 45 },
    { sideEffect: "injection-site-pain", percentage: 40 },
    { sideEffect: "nausea", percentage: 22 },
    { sideEffect: "vivid-dreams", percentage: 15 },
    { sideEffect: "dizziness", percentage: 12 },
  ],
  "retatrutide": [
    { sideEffect: "nausea", percentage: 82 },
    { sideEffect: "appetite-change", percentage: 78 },
    { sideEffect: "fatigue", percentage: 55 },
    { sideEffect: "flu-like", percentage: 42 },
    { sideEffect: "digestive-issues", percentage: 38 },
    { sideEffect: "vivid-dreams", percentage: 25 },
    { sideEffect: "mood-shift", percentage: 20 },
    { sideEffect: "injection-site-pain", percentage: 15 },
  ],
  "nad-plus": [
    { sideEffect: "flu-like", percentage: 85 },
    { sideEffect: "fatigue", percentage: 70 },
    { sideEffect: "injection-site-pain", percentage: 65 },
    { sideEffect: "nausea", percentage: 48 },
    { sideEffect: "headache", percentage: 30 },
    { sideEffect: "brain-fog", percentage: 20 },
  ],
  "mt2": [
    { sideEffect: "nausea", percentage: 75 },
    { sideEffect: "vivid-dreams", percentage: 60 },
    { sideEffect: "libido-change", percentage: 55 },
    { sideEffect: "appetite-change", percentage: 40 },
    { sideEffect: "injection-site-pain", percentage: 25 },
  ],
  "ghk-cu": [
    { sideEffect: "injection-site-pain", percentage: 45 },
    { sideEffect: "fatigue", percentage: 15 },
  ],
  "ipamorelin": [
    { sideEffect: "headache", percentage: 40 },
    { sideEffect: "vivid-dreams", percentage: 35 },
    { sideEffect: "fatigue", percentage: 20 },
    { sideEffect: "injection-site-pain", percentage: 18 },
  ],
  "semaglutide": [
    { sideEffect: "nausea", percentage: 80 },
    { sideEffect: "appetite-change", percentage: 75 },
    { sideEffect: "digestive-issues", percentage: 55 },
    { sideEffect: "fatigue", percentage: 35 },
    { sideEffect: "headache", percentage: 20 },
  ],
};

export async function GET(req: NextRequest) {
  const peptideId = req.nextUrl.searchParams.get("peptideId") || "bpc-157";

  const sb = getSupabaseServer();
  if (!sb) {
    const demo = DEMO_DATA[peptideId] || DEMO_DATA["bpc-157"];
    return NextResponse.json({ peptideId, data: demo, source: "demo" });
  }

  const { data, error } = await sb.rpc("get_side_effect_aggregate", {
    p_peptide_id: peptideId,
  });

  if (error || !data || data.length === 0) {
    const demo = DEMO_DATA[peptideId] || DEMO_DATA["bpc-157"];
    return NextResponse.json({ peptideId, data: demo, source: "demo" });
  }

  const formatted = data.map((row: { side_effect: string; percentage: number }) => ({
    sideEffect: row.side_effect,
    percentage: row.percentage,
  }));

  return NextResponse.json({ peptideId, data: formatted, source: "live" });
}
