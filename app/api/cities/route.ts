/**
 * GET /api/cities?q=<query>
 * Returns up to 8 city suggestions for the given query string.
 * Reads from a pre-generated cities JSON file (public/cities-top.json) that was
 * generated from all-the-cities at build time. Using a static JSON avoids the
 * Turbopack __dirname resolution issue with all-the-cities' fs.readFileSync.
 *
 * City record format: [name, country, adminCode, latitude, longitude]
 *
 * runtime = "nodejs" — uses fs.readFileSync.
 */

export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type CityRecord = [string, string, string, number, number]; // [name, country, admin, lat, lng]

export interface CityResult {
  name: string;
  displayName: string;
  latitude: number;
  longitude: number;
}

// Lazy-load and cache the cities dataset
let citiesCache: CityRecord[] | null = null;

function getCities(): CityRecord[] {
  if (!citiesCache) {
    // Use process.cwd() which resolves correctly in production
    const filePath = path.join(process.cwd(), "public", "cities-top.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    citiesCache = JSON.parse(raw) as CityRecord[];
  }
  return citiesCache;
}

function searchCities(query: string): CityResult[] {
  const cities = getCities();
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  // Population isn't stored in slim format — sort by index position (already sorted by pop desc)
  const results: Array<{ city: CityRecord; score: number; idx: number }> = [];

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const nameLower = city[0].toLowerCase();
    if (!nameLower.includes(q)) continue;
    let score = cities.length - i; // higher score for higher-population cities (sorted desc)
    if (nameLower === q) score += 1e9;
    else if (nameLower.startsWith(q)) score += 1e6;
    results.push({ city, score, idx: i });
    if (results.length > 300) break; // Early exit for performance
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 8).map(({ city }) => {
    const [name, country, admin, lat, lng] = city;
    return {
      name,
      displayName: `${name}${admin ? ", " + admin : ""}, ${country}`,
      latitude: lat,
      longitude: lng,
    };
  });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  if (q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = searchCities(q.slice(0, 100));
    return NextResponse.json({ results });
  } catch (err) {
    console.error("Cities search error:", err);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
