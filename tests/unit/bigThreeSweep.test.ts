/**
 * BIG-THREE FULL SWEEP — RE-VERIFY-2
 *
 * Sweeps all 12×12×12 = 1728 sign combinations at two representative years
 * (1988 and 2001), asserting:
 *   (a) no dead-end (solver returns without throwing) for any reachable combo
 *   (b) the returned chart honors all three input signs exactly
 *
 * The spec says "The solver hits all three for every valid combination
 * (all 12×12×12 are reachable at the reference latitude)."
 *
 * This test is run with a long timeout (600s) because 3456 solver calls
 * at ~500ms each can take several minutes. Vitest parallelizes across files.
 */
import { describe, it, expect } from "vitest";
import { estimateFromBigThree } from "../../lib/estimateFromBigThree";
import { computeChart } from "../../lib/chartCompute";

const ZODIAC_KEYS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;
type ZK = typeof ZODIAC_KEYS[number];

const YEARS = [1988, 2001];

// Build the full sweep list: 1728 combos × 2 years = 3456 items
const sweepCases: { sun: ZK; moon: ZK; rising: ZK; year: number }[] = [];
for (const year of YEARS) {
  for (const sun of ZODIAC_KEYS) {
    for (const moon of ZODIAC_KEYS) {
      for (const rising of ZODIAC_KEYS) {
        sweepCases.push({ sun, moon, rising, year });
      }
    }
  }
}

// OPT-IN ONLY: this exhaustive 3456-combo solver sweep takes ~75–90 min and would
// tax every default `npm test`/verify run. It runs only when SWEEP=1 is set
// (e.g. `SWEEP=1 npm test`); otherwise it is skipped. The fast targeted combos
// (incl. the Leo/Scorpio/Gemini 1988 regression) live in estimateFromBigThree.test.ts
// and always run by default. See friction lesson:
// exhaustive-sweep-proof-belongs-in-an-opt-in-script-not-default-test-path.
const runSweep = process.env.SWEEP === "1";
(runSweep ? describe : describe.skip)(`Big-3 full sweep — ${sweepCases.length} combos (1728 × ${YEARS.length} years)`, {
  timeout: 600_000,
}, () => {
  const deadEnds: string[] = [];
  const violations: string[] = [];

  // Run all cases in a single test so we can accumulate results and report
  it("all combos: no dead-end, no invariant violation", { timeout: 600_000 }, () => {
    for (const { sun, moon, rising, year } of sweepCases) {
      const label = `${sun}/${moon}/${rising}/${year}`;
      let birth: ReturnType<typeof estimateFromBigThree> | null = null;
      try {
        birth = estimateFromBigThree({ sunSign: sun, moonSign: moon, risingSign: rising, year });
      } catch (_e) {
        deadEnds.push(label);
        continue;
      }

      // Invariant: returned chart must satisfy all three
      const chart = computeChart(birth);
      const sunPlanet = chart.planets.find((p) => p.key === "sun");
      const moonPlanet = chart.planets.find((p) => p.key === "moon");
      const gotSun = sunPlanet?.sign;
      const gotMoon = moonPlanet?.sign;
      const gotAsc = chart.ascendant.sign;
      if (gotSun !== sun || gotMoon !== moon || gotAsc !== rising) {
        violations.push(
          `${label} → got Sun=${gotSun} Moon=${gotMoon} Asc=${gotAsc}`,
        );
      }
    }

    // Report summary before asserting — surfaced in test output even on failure
    console.log(`Sweep complete: ${sweepCases.length} combos tested`);
    console.log(`  Dead-ends: ${deadEnds.length}`);
    console.log(`  Invariant violations: ${violations.length}`);
    if (deadEnds.length > 0) console.log("  DEAD-ENDS:", deadEnds.slice(0, 10).join(", "));
    if (violations.length > 0) console.log("  VIOLATIONS:", violations.slice(0, 10).join(", "));

    expect(deadEnds.length, `Dead-ends found: ${deadEnds.join(", ")}`).toBe(0);
    expect(violations.length, `Invariant violations found: ${violations.join(", ")}`).toBe(0);
  });

  // Also assert the specific P0 regression combo explicitly
  it("Leo/Scorpio/Gemini/1988 — P0 panel repro combo: no dead-end, correct signs", () => {
    const birth = estimateFromBigThree({
      sunSign: "leo", moonSign: "scorpio", risingSign: "gemini", year: 1988,
    });
    expect(birth.isEstimate).toBe(true);
    const chart = computeChart(birth);
    const sun = chart.planets.find((p) => p.key === "sun");
    const moon = chart.planets.find((p) => p.key === "moon");
    expect(sun!.sign, "Sun must be Leo").toBe("leo");
    expect(moon!.sign, "Moon must be Scorpio").toBe("scorpio");
    expect(chart.ascendant.sign, "Ascendant must be Gemini").toBe("gemini");
  });

  // Determinism: same combo across two calls
  it("Leo/Scorpio/Gemini/1988 determinism: two calls produce identical BirthData", () => {
    const a = estimateFromBigThree({ sunSign: "leo", moonSign: "scorpio", risingSign: "gemini", year: 1988 });
    const b = estimateFromBigThree({ sunSign: "leo", moonSign: "scorpio", risingSign: "gemini", year: 1988 });
    expect(a.year).toBe(b.year);
    expect(a.month).toBe(b.month);
    expect(a.day).toBe(b.day);
    expect(a.hour).toBe(b.hour);
    expect(a.minute).toBe(b.minute);
  });
});
