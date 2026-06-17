/**
 * POST /api/chart-share
 * Body: BirthData JSON  — creates a natal share link.
 * Body: { type:"synastry", a: BirthData, b: BirthData }  — creates a synastry share link.
 * Returns { token: string } for the share URL /chart/<token>.
 *
 * GET /api/chart-share?token=<token>
 * Returns the share payload.  Shape: { payload: SharePayload }
 * For backward compat also includes a top-level `birth` key when type=natal.
 *
 * runtime = "nodejs" — libsql is NOT edge-compatible.
 */

export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { saveChart, saveSynastry, getSharePayload } from "../../../lib/db";
import type { BirthData } from "../../../lib/chartCompute";

function sanitizeBirth(raw: BirthData): BirthData {
  return {
    ...raw,
    name: (raw.name ?? "").slice(0, 100) || "Chart",
    placeName: (raw.placeName ?? "").slice(0, 200),
  };
}

function isValidBirth(b: unknown): b is BirthData {
  if (!b || typeof b !== "object") return false;
  const bd = b as Record<string, unknown>;
  return typeof bd.year === "number" && typeof bd.latitude === "number" && typeof bd.longitude === "number";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Synastry payload: { type: "synastry", a: BirthData, b: BirthData }
  if (body && typeof body === "object" && (body as Record<string, unknown>).type === "synastry") {
    const syn = body as { type: "synastry"; a: unknown; b: unknown };
    if (!isValidBirth(syn.a) || !isValidBirth(syn.b)) {
      return NextResponse.json({ error: "invalid_data" }, { status: 400 });
    }
    const token = await saveSynastry(sanitizeBirth(syn.a), sanitizeBirth(syn.b));
    return NextResponse.json({ token }, { status: 201 });
  }

  // Natal payload (bare BirthData — legacy + current)
  const birth = body as BirthData;
  if (!isValidBirth(birth)) {
    return NextResponse.json({ error: "invalid_data" }, { status: 400 });
  }
  const token = await saveChart(sanitizeBirth(birth));
  return NextResponse.json({ token }, { status: 201 });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token || token.length > 40) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const payload = await getSharePayload(token);
  if (!payload) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // Back-compat: natal shares previously returned { birth } at top level
  if (payload.type === "natal") {
    return NextResponse.json({ payload, birth: payload.birth });
  }
  return NextResponse.json({ payload });
}
