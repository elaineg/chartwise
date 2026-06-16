/**
 * POST /api/chart-share
 * Body: BirthData JSON
 * Saves birth data to Turso, returns { token: string } for share URL.
 *
 * GET /api/chart-share?token=<token>
 * Returns the birth data for a shared chart.
 *
 * runtime = "nodejs" — libsql is NOT edge-compatible.
 */

export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { saveChart, getChartByToken } from "../../../lib/db";
import type { BirthData } from "../../../lib/chartCompute";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let birth: BirthData;
  try {
    birth = (await req.json()) as BirthData;
    if (!birth.year || !birth.latitude || !birth.longitude) {
      return NextResponse.json({ error: "invalid_data" }, { status: 400 });
    }
    // Sanitize name
    birth.name = (birth.name ?? "").slice(0, 100) || "Chart";
    birth.placeName = (birth.placeName ?? "").slice(0, 200);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const token = await saveChart(birth);
  return NextResponse.json({ token }, { status: 201 });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token || token.length > 40) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const birth = await getChartByToken(token);
  if (!birth) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ birth });
}
