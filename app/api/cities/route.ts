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

// [name, countryCode, adminCode, latitude, longitude, population]
type CityRecord = [string, string, string, number, number, number];

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

// Convert an ISO alpha-2 country code to a readable country name via the
// built-in Intl API (no bundled list). Falls back to the raw code.
let regionNames: Intl.DisplayNames | null = null;
function countryName(code: string): string {
  try {
    if (!regionNames) regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

// Common former/alternate city names → the name stored in the dataset, so a
// search for a familiar older name still resolves. (City names only, no list of regions.)
const CITY_ALIASES: Record<string, string> = {
  bangalore: "bengaluru",
  bombay: "mumbai",
  calcutta: "kolkata",
  madras: "chennai",
  peking: "beijing",
  saigon: "ho chi minh",
  rangoon: "yangon",
  "st petersburg": "saint petersburg",
};

function searchCities(query: string): CityResult[] {
  const cities = getCities();
  // Support "City, Country" / "City, State" input: the first token is the city
  // to match; the second (optional) token boosts results in that country/region.
  const parts = query.trim().toLowerCase().split(",").map((s) => s.trim());
  const cityQ = CITY_ALIASES[parts[0]] || parts[0];
  const locQ = parts[1] || "";
  if (cityQ.length < 2) return [];

  const results: Array<{ city: CityRecord; score: number }> = [];

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const nameLower = city[0].toLowerCase();
    if (!nameLower.includes(cityQ)) continue;
    const pop = city[5] ?? 0;
    let score = pop; // population is the base rank — major cities win over namesakes
    if (nameLower === cityQ) score *= 1000;
    else if (nameLower.startsWith(cityQ)) score *= 10;
    // Boost results matching the location token (country name, code, or admin)
    if (locQ) {
      const cc = city[1].toLowerCase();
      const cName = countryName(city[1]).toLowerCase();
      const admin = (city[2] || "").toLowerCase();
      if (cc === locQ || cName.includes(locQ) || admin === locQ) score *= 1e6;
    }
    results.push({ city, score });
    if (results.length > 500) break; // Early exit for performance
  }

  results.sort((a, b) => b.score - a.score);
  // Build labels with a readable region to disambiguate same-name cities, and
  // drop rows that would display identically (dedupe by final label).
  const seen = new Set<string>();
  const out: CityResult[] = [];
  for (const { city } of results) {
    const [name, country, admin, lat, lng] = city;
    // Show an alphabetic region/state code (e.g. US "TX") so "Austin, TX" and
    // "Austin, MN" are distinguishable; numeric GeoNames admin codes aren't
    // user-friendly, so omit them.
    const region = admin && /^[A-Za-z]/.test(admin) ? `, ${admin}` : "";
    const displayName = `${name}${region}, ${countryName(country)}`;
    if (seen.has(displayName)) continue;
    seen.add(displayName);
    out.push({ name, displayName, latitude: lat, longitude: lng });
    if (out.length >= 8) break;
  }
  return out;
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
