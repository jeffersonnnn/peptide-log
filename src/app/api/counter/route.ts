import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";

let fallbackCount = 14847;

export async function GET() {
  const sb = getSupabaseServer();
  if (!sb) {
    return NextResponse.json({ count: fallbackCount });
  }

  const { data, error } = await sb
    .from("calc_counter")
    .select("count")
    .eq("id", 1)
    .single();

  if (error || !data) {
    return NextResponse.json({ count: fallbackCount });
  }

  return NextResponse.json({ count: data.count });
}

export async function POST() {
  const sb = getSupabaseServer();
  if (!sb) {
    fallbackCount++;
    return NextResponse.json({ count: fallbackCount });
  }

  const { data, error } = await sb.rpc("increment_calc_counter");

  if (error) {
    fallbackCount++;
    return NextResponse.json({ count: fallbackCount });
  }

  return NextResponse.json({ count: data });
}
