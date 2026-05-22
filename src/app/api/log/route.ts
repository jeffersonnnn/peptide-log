import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";
import { verifyPrivyToken } from "@/lib/privy-server";

export async function GET(req: NextRequest) {
  const userId = await verifyPrivyToken(req.headers.get("authorization"));
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const sb = getSupabaseServer();
  if (!sb) {
    return NextResponse.json({ entries: [] });
  }

  const { data, error } = await sb
    .from("cycle_logs")
    .select("*")
    .eq("user_id", userId)
    .order("log_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch cycle logs:", error.message);
    return NextResponse.json({ entries: [] });
  }

  return NextResponse.json({ entries: data });
}

export async function POST(req: NextRequest) {
  const userId = await verifyPrivyToken(req.headers.get("authorization"));
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const sb = getSupabaseServer();

  if (!sb) {
    return NextResponse.json({ ok: false, stored: "local-only" });
  }

  const { data, error } = await sb
    .from("cycle_logs")
    .insert({
      user_id: userId,
      session_id: userId,
      peptides: body.peptides,
      side_effects: body.sideEffects || [],
      pain_level: body.painLevel,
      energy_level: body.energyLevel,
      weight: body.weight || null,
      notes: body.notes || "",
      log_date: body.date,
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to insert cycle log:", error.message);
    return NextResponse.json({ ok: false, stored: "local-only" });
  }

  return NextResponse.json({ ok: true, stored: "supabase", entry: data });
}

export async function DELETE(req: NextRequest) {
  const userId = await verifyPrivyToken(req.headers.get("authorization"));
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const sb = getSupabaseServer();

  if (!sb) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const { error } = await sb
    .from("cycle_logs")
    .delete()
    .eq("id", body.entryId)
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to delete cycle log:", error.message);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
