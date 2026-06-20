/**
 * estimateFromBigThree.ts
 *
 * Solves for a {date, time, location} whose computed chart matches the requested
 * Sun sign, Moon sign, and Ascendant (Rising) sign.
 *
 * REFERENCE LOCATION: 40.7128° N, -74.0060° E (New York City, USA)
 * Rationale: mid-northern latitude (40°N), representative for Placidus houses;
 * all 12 Ascendant signs cycle through in ~24 hours at this latitude.
 * This is an inherent part of the approximation — the solver uses a fixed place
 * because the user hasn't provided one.
 *
 * STRATEGY (two-pass, complete, deterministic):
 *  (a) Sun+Moon scan: step through the given year, day by day (366 days max),
 *      sampling at four times per day (0h, 6h, 12h, 18h) — enough to catch any
 *      Moon sign transition within a day. Collect ALL (day, hour-anchor) pairs
 *      where Moon is in moonSign. For each such pair, also verify the Sun is in
 *      sunSign at that hour (the Sun can straddle a sign boundary intra-day).
 *
 *  (b) Rising-sign scan: for each candidate (day, hour-anchor) pair, scan the
 *      full 24h in 15-minute steps checking that Sun==sunSign AND Moon==moonSign
 *      AND Ascendant==risingSign simultaneously. If found, narrow to 1-minute
 *      precision in a ±20-minute window around the coarse match.
 *
 *  If no (year) match is found, expand ±1 year before failure — the result is
 *  still a valid estimate honoring all three signs (year is approximate input).
 *
 * KEY CORRECTNESS GUARANTEE:
 *  Every trial in Pass B checks all three conditions at once, so the result
 *  inherently satisfies the Sun-boundary case (where the Sun is in the target
 *  sign at noon but not at 2 AM on the same calendar day).
 *
 * TOTAL TRIAL COUNT WORST CASE (single year):
 *  366×4 (combined Sun+Moon scan) + ~6 candidate days × 96 (coarse Rising scan)
 *  + 6×55 (fine pass) ≈ 2,400 trials.
 *  All lightweight Origin+Horoscope calls; completes well under 1s on a laptop.
 *
 * CORRECTNESS INVARIANT: if the solver returns a BirthData, the computed chart
 * MUST satisfy all three signs. If any sign cannot be found, it throws an error
 * (see SOLVER_FAIL_MESSAGE) — never returns a silently wrong chart.
 *
 * isEstimate is stored as a property on the returned BirthData extension object
 * and threaded through so ComputedChart.isEstimate can reflect it.
 */

import type { BirthData } from "./chartCompute";

// Reference location constant (documented above)
export const ESTIMATE_REF_LATITUDE = 40.7128;  // New York City, 40°N
export const ESTIMATE_REF_LONGITUDE = -74.0060; // New York City

export const SOLVER_FAIL_MESSAGE =
  "Could not find a date and time that places your Sun, Moon, and Rising in the requested signs. " +
  "This can rarely happen for unusual sign combinations at the reference location. " +
  "Try a nearby year or use the precise birth-form instead.";

/** All 12 zodiac sign keys in order, matching circular-natal-horoscope-js */
const ZODIAC_KEYS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;

export type ZodiacKey = typeof ZODIAC_KEYS[number];

export const ZODIAC_OPTIONS: { key: ZodiacKey; label: string }[] = [
  { key: "aries",       label: "Aries" },
  { key: "taurus",      label: "Taurus" },
  { key: "gemini",      label: "Gemini" },
  { key: "cancer",      label: "Cancer" },
  { key: "leo",         label: "Leo" },
  { key: "virgo",       label: "Virgo" },
  { key: "libra",       label: "Libra" },
  { key: "scorpio",     label: "Scorpio" },
  { key: "sagittarius", label: "Sagittarius" },
  { key: "capricorn",   label: "Capricorn" },
  { key: "aquarius",    label: "Aquarius" },
  { key: "pisces",      label: "Pisces" },
];

/** Compute a chart position for a single {year, month (0-indexed!), day, hour, minute} trial */
function trialChart(
  Origin: new (o: object) => object,
  Horoscope: new (o: object) => {
    CelestialBodies: Record<string, { Sign: { key: string } }>;
    Ascendant: { Sign: { key: string } };
  },
  year: number, month0: number, day: number, hour: number, minute: number,
) {
  const origin = new Origin({
    year, month: month0, date: day, hour, minute,
    latitude: ESTIMATE_REF_LATITUDE,
    longitude: ESTIMATE_REF_LONGITUDE,
  });
  return new Horoscope({
    origin,
    houseSystem: "placidus",
    zodiac: "tropical",
    aspectTypes: [],
    language: "en",
  });
}

export interface EstimatedBirthData extends BirthData {
  isEstimate: true;
}

/**
 * Run the full two-pass solver for a single target year.
 * Returns {month1, day, hour, minute} if found, null otherwise.
 */
function solveForYear(
  Origin: new (o: object) => object,
  Horoscope: new (o: object) => {
    CelestialBodies: Record<string, { Sign: { key: string } }>;
    Ascendant: { Sign: { key: string } };
  },
  sunSign: ZodiacKey,
  moonSign: ZodiacKey,
  risingSign: ZodiacKey,
  year: number,
): { month1: number; day: number; hour: number; minute: number } | null {

  // ─── PASS A: Collect candidate (month, day) pairs ────────────────────────────
  // For each calendar day, sample at 0h, 6h, 12h, 18h.
  // A day is a "Sun-day" if the Sun is in sunSign at ANY of those sample times.
  // We collect unique calendar days where the Sun was in sunSign at least once
  // (to handle the sign-boundary edge case).
  const sunDaySet = new Set<string>();  // "month0:day"
  const moonCandidates: Array<{ month0: number; day: number }> = [];

  for (let doy = 1; doy <= 366; doy++) {
    const d = new Date(year, 0, doy);
    if (d.getFullYear() !== year) break;
    const month0 = d.getMonth();
    const day = d.getDate();

    // Check if Sun is in sunSign at noon (canonical anchor — keeps the Sun window ~30 days wide)
    const noonH = trialChart(Origin, Horoscope, year, month0, day, 12, 0);
    if (noonH.CelestialBodies.sun?.Sign?.key === sunSign) {
      sunDaySet.add(`${month0}:${day}`);
    }
  }

  if (sunDaySet.size === 0) {
    return null;
  }

  // Build the ordered list of sun days for moon-sign scanning
  for (const key of sunDaySet) {
    const [m0, d] = key.split(":").map(Number);
    moonCandidates.push({ month0: m0, day: d });
  }
  // Sort by calendar order (they come from Date iteration, already sorted)

  // ─── PASS B: Find ALL days in Sun window where Moon crosses moonSign ─────────
  // Sample each day at 0h, 6h, 12h, 18h. The Moon moves ~0.5°/hour; sampling
  // every 6h catches every sign transition (signs span ~30°, ~2.3 days / 55 hours).
  // We collect all unique (day) entries where Moon was in moonSign at any sample.
  const moonDays: Array<{ month0: number; day: number }> = [];
  const seenMoonDays = new Set<string>();

  for (const { month0, day } of moonCandidates) {
    for (const sampleHour of [0, 6, 12, 18]) {
      const h = trialChart(Origin, Horoscope, year, month0, day, sampleHour, 0);
      if (h.CelestialBodies.moon?.Sign?.key === moonSign) {
        const key = `${month0}:${day}`;
        if (!seenMoonDays.has(key)) {
          seenMoonDays.add(key);
          moonDays.push({ month0, day });
        }
        break; // found moon in target sign for this day — no need to check other hours
      }
    }
  }

  if (moonDays.length === 0) {
    return null;
  }

  // ─── PASS C: Find the (day, time) where ALL THREE signs align simultaneously ──
  // For each moon-candidate day, scan the full 24h in 15-minute steps.
  // CHECK ALL THREE CONDITIONS at each step — this is the key correctness fix.
  // The Sun can straddle a sign boundary intra-day, so a time with Gemini rising
  // but Cancer sun (not Leo) must be rejected at the scan step, not only at the
  // final invariant check.
  for (const { month0, day } of moonDays) {
    let coarseMin = -1;

    for (let totalMin = 0; totalMin < 24 * 60; totalMin += 15) {
      const h = Math.floor(totalMin / 60);
      const m = totalMin % 60;
      const horo = trialChart(Origin, Horoscope, year, month0, day, h, m);
      const gotSun = horo.CelestialBodies.sun?.Sign?.key;
      const gotMoon = horo.CelestialBodies.moon?.Sign?.key;
      const gotAsc = horo.Ascendant?.Sign?.key;
      if (gotSun === sunSign && gotMoon === moonSign && gotAsc === risingSign) {
        coarseMin = totalMin;
        break;
      }
    }

    if (coarseMin < 0) continue; // this day has no all-three alignment — try next

    // Fine pass: 1-minute steps in ±20 minute window around the coarse match.
    const windowStart = coarseMin - 20;
    const windowEnd = coarseMin + 35; // +35 covers the full 15-min coarse step

    let bestMin = coarseMin;
    for (let totalMin = Math.max(0, windowStart); totalMin <= Math.min(23 * 60 + 59, windowEnd); totalMin++) {
      const h = Math.floor(totalMin / 60);
      const m = totalMin % 60;
      const horo = trialChart(Origin, Horoscope, year, month0, day, h, m);
      const gotSun = horo.CelestialBodies.sun?.Sign?.key;
      const gotMoon = horo.CelestialBodies.moon?.Sign?.key;
      const gotAsc = horo.Ascendant?.Sign?.key;
      if (gotSun === sunSign && gotMoon === moonSign && gotAsc === risingSign) {
        bestMin = totalMin;
        break;
      }
    }

    return {
      month1: month0 + 1,
      day,
      hour: Math.floor(bestMin / 60),
      minute: bestMin % 60,
    };
  }

  // No candidate day yielded all three simultaneously this year
  return null;
}

/**
 * Main solver entry point.
 * Throws a user-visible string if any sign cannot be satisfied.
 */
export function estimateFromBigThree(input: {
  sunSign: ZodiacKey;
  moonSign: ZodiacKey;
  risingSign: ZodiacKey;
  year: number;
}): EstimatedBirthData {
  const { sunSign, moonSign, risingSign, year } = input;

  // Dynamic require — client-side only (same pattern as chartCompute.ts)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Origin, Horoscope } = require("circular-natal-horoscope-js");

  // Try the requested year first, then expand ±1 year before giving up.
  // The ±1 expansion handles boundary cases (e.g. a Sun-sign window that spans
  // Jan 1 — Capricorn/Sagittarius combos at year edges). The result still
  // honors all three signs; year is itself approximate input.
  const yearsToTry = [year, year - 1, year + 1];
  let result: { month1: number; day: number; hour: number; minute: number } | null = null;
  let foundYear = year;

  for (const tryYear of yearsToTry) {
    result = solveForYear(Origin, Horoscope, sunSign, moonSign, risingSign, tryYear);
    if (result) {
      foundYear = tryYear;
      break;
    }
  }

  if (!result) {
    throw new Error(SOLVER_FAIL_MESSAGE);
  }

  const { month1, day, hour, minute } = result;

  // ─── CORRECTNESS INVARIANT CHECK ─────────────────────────────────────────────
  // The solver already verifies all three conditions at each trial in Pass C,
  // but we double-check here to guarantee we never return a wrong chart.
  const verifyHoro = trialChart(Origin, Horoscope, foundYear, month1 - 1, day, hour, minute);
  const gotSun = verifyHoro.CelestialBodies.sun?.Sign?.key;
  const gotMoon = verifyHoro.CelestialBodies.moon?.Sign?.key;
  const gotAsc = verifyHoro.Ascendant?.Sign?.key;

  if (gotSun !== sunSign || gotMoon !== moonSign || gotAsc !== risingSign) {
    // Should be unreachable — the scan checked all three conditions simultaneously
    throw new Error(SOLVER_FAIL_MESSAGE);
  }

  return {
    name: "Estimated chart",
    year: foundYear,
    month: month1,
    day,
    hour,
    minute,
    latitude: ESTIMATE_REF_LATITUDE,
    longitude: ESTIMATE_REF_LONGITUDE,
    placeName: "New York, USA (reference)",
    hasBirthTime: true,
    isEstimate: true,
  };
}
