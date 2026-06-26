/**
 * Synastry regression tests.
 *
 * STATIC REGRESSION ANCHOR (hardcoded birth data — does NOT use EINSTEIN_BIRTH export):
 *   Person A = Einstein (14 Mar 1879, 11:30 LMT, Ulm)
 *   Person B = Michelle Obama (17 Jan 1964, 21:53 CST, Chicago — AstroDatabank A-rated)
 *   Anchor aspect: Einstein Moon (Sagittarius, ~254.3°) TRINE Michelle Jupiter (Aries, ~12.7°)
 *   — a harmony trine at ~1.67° orb (arc ≈ 118.3°, target 120°).
 *
 * UI EXAMPLE PAIR (EINSTEIN_BIRTH / SYNASTRY_PARTNER_BIRTH exports):
 *   Princess Diana × Prince Charles (AA-rated birth data, no-Einstein directive 2026-06-26).
 */
import { describe, it, expect } from "vitest";

describe("Synastry regression anchor — Einstein × Michelle Obama", () => {
  it("Einstein has Moon in Sagittarius and Michelle Obama has Jupiter in Aries (required for Moon-Jupiter trine)", () => {
    const { Origin, Horoscope } = require("circular-natal-horoscope-js");

    // Einstein
    const o1 = new Origin({ year: 1879, month: 2, date: 14, hour: 11, minute: 30, latitude: 48.4011, longitude: 9.9876 });
    const h1 = new Horoscope({ origin: o1, houseSystem: "placidus", zodiac: "tropical", aspectTypes: ["major"], language: "en" });

    // Michelle Obama (month 0-indexed: January = 0)
    const o2 = new Origin({ year: 1964, month: 0, date: 17, hour: 21, minute: 53, latitude: 41.8781, longitude: -87.6298 });
    const h2 = new Horoscope({ origin: o2, houseSystem: "placidus", zodiac: "tropical", aspectTypes: ["major"], language: "en" });

    expect(h1.CelestialBodies.moon.Sign.label).toBe("Sagittarius");
    expect(h2.CelestialBodies.jupiter.Sign.label).toBe("Aries");
  });

  it("Einstein Moon trine Michelle Jupiter ecliptic arc is within 2° of 120°", () => {
    const { Origin, Horoscope } = require("circular-natal-horoscope-js");

    const o1 = new Origin({ year: 1879, month: 2, date: 14, hour: 11, minute: 30, latitude: 48.4011, longitude: 9.9876 });
    const h1 = new Horoscope({ origin: o1, houseSystem: "placidus", zodiac: "tropical", aspectTypes: [], language: "en" });

    const o2 = new Origin({ year: 1964, month: 0, date: 17, hour: 21, minute: 53, latitude: 41.8781, longitude: -87.6298 });
    const h2 = new Horoscope({ origin: o2, houseSystem: "placidus", zodiac: "tropical", aspectTypes: [], language: "en" });

    const moonDeg = h1.CelestialBodies.moon.ChartPosition.Ecliptic.DecimalDegrees as number;
    const jupDeg = h2.CelestialBodies.jupiter.ChartPosition.Ecliptic.DecimalDegrees as number;

    let arc = Math.abs(moonDeg - jupDeg) % 360;
    if (arc > 180) arc = 360 - arc;
    const orbFromTrine = Math.abs(arc - 120);

    expect(orbFromTrine, `Moon-Jupiter trine orb (arc=${arc.toFixed(2)}°, target 120°) must be ≤ 2°`).toBeLessThanOrEqual(2);
  });

  it("computeSynastry produces non-empty aspects with readings for the UI example pair (Diana × Charles)", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const chartA = computeChart(EINSTEIN_BIRTH);   // Princess Diana
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);  // Prince Charles
    const result = computeSynastry(chartA, chartB);

    expect(result.aspects.length, "UI example pair must produce at least one aspect").toBeGreaterThan(0);
    const firstAspect = result.aspects[0];
    expect(firstAspect.reading, "First aspect must have an inline reading").toBeTruthy();
    expect(firstAspect.reading.length, "Inline reading must have substance").toBeGreaterThan(30);
    expect(["harmony", "tension", "context"]).toContain(firstAspect.nature);
  });

  it("getSynastryAspectReading returns a non-empty string for all aspect types on sun-sun pair", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");
    const aspectTypes = ["conjunction", "sextile", "square", "trine", "opposition"] as const;
    const natures = ["harmony", "tension", "context"] as const;

    for (const aspectType of aspectTypes) {
      for (const nature of natures) {
        const reading = getSynastryAspectReading("sun", "sun", aspectType, nature);
        expect(reading, `sun-sun ${aspectType}/${nature} must return a non-empty reading`).toBeTruthy();
        expect(reading.length).toBeGreaterThan(20);
      }
    }
  });

  it("getSynastryAspectReading covers all major body pairs with fallback", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");
    // For any pair, any aspect type, any nature — must return non-empty string
    const bodies = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "chiron"];
    const aspectTypes = ["conjunction", "sextile", "square", "trine", "opposition"] as const;
    const natures = ["harmony", "tension", "context"] as const;

    for (const bA of bodies) {
      for (const bB of bodies) {
        for (const asp of aspectTypes) {
          for (const nat of natures) {
            const reading = getSynastryAspectReading(bA, bB, asp, nat);
            expect(reading, `${bA}-${bB} ${asp}/${nat} must return a non-empty reading`).toBeTruthy();
          }
        }
      }
    }
  });

  it("computeSynastry result has harmonyCount + tensionCount + contextCount = total aspects", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    const total = result.harmonyCount + result.tensionCount + result.contextCount;
    expect(total).toBe(result.aspects.length);
  });

  it("summaryText is a non-trivial sentence mentioning both names (Diana × Charles)", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const chartA = computeChart(EINSTEIN_BIRTH);   // Princess Diana
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);  // Prince Charles
    const result = computeSynastry(chartA, chartB);

    expect(result.summaryText).toBeTruthy();
    expect(result.summaryText.length).toBeGreaterThan(50);
    expect(result.summaryText).toContain("Princess Diana");
    expect(result.summaryText).toContain("Prince Charles");
  });

  it("conjunction body sentence names both people and contains no 'Nodal's' (R6 fixes)", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");

    // Jupiter-Venus conjunction (THE SPECIFIC BUG FROM R6): must name both people
    const jvReading = getSynastryAspectReading("jupiter", "venus", "conjunction", "context", "Albert Einstein", "Michelle Obama");
    expect(jvReading, "jupiter-venus conjunction body must contain 'Einstein'").toContain("Albert Einstein");
    expect(jvReading, "jupiter-venus conjunction body must contain 'Obama'").toContain("Michelle Obama");
    expect(jvReading, "jupiter-venus conjunction body must NOT say 'Nodal'").not.toMatch(/[Nn]odal's/);

    // North Node conjunction blurbs must NOT produce 'Nodal's'
    const nnSunReading = getSynastryAspectReading("northnode", "sun", "conjunction", "context", "Albert Einstein", "Michelle Obama");
    expect(nnSunReading, "northnode-sun conjunction must NOT say 'Nodal's'").not.toMatch(/[Nn]odal's/);

    const nnSunHarmony = getSynastryAspectReading("northnode", "sun", "trine", "harmony", "Albert Einstein", "Michelle Obama");
    expect(nnSunHarmony, "northnode-sun harmony must NOT say 'Nodal's'").not.toMatch(/[Nn]odal's/);

    const snMoonTension = getSynastryAspectReading("southnode", "moon", "square", "tension", "Albert Einstein", "Michelle Obama");
    expect(snMoonTension, "southnode-moon tension must NOT say 'Nodal's'").not.toMatch(/[Nn]odal's/);
  });

  it("conjunction bodies are distinct when different pairs share no sentence (max repeat ≤1)", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");

    // Generate conjunction readings for all major body-pair combinations
    const bodies = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"];
    const readings: string[] = [];
    for (const a of bodies) {
      for (const b of bodies) {
        if (a >= b) continue; // unique pairs only
        const r = getSynastryAspectReading(a, b, "conjunction", "context", "Albert Einstein", "Michelle Obama");
        readings.push(r);
      }
    }

    // Count how many times any reading appears more than once
    const counts: Record<string, number> = {};
    for (const r of readings) counts[r] = (counts[r] ?? 0) + 1;
    const maxRepeat = Math.max(...Object.values(counts));
    expect(maxRepeat, `No conjunction context body should repeat more than once across pairs (max was ${maxRepeat})`).toBeLessThanOrEqual(1);
  });

  it("full Einstein×Obama aspect list — zero conjunction readings contain 'Nodal's'", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    const nodalOccurrences = result.aspects.filter((a) => /[Nn]odal's/i.test(a.reading));
    expect(nodalOccurrences.length, `Found ${nodalOccurrences.length} aspect reading(s) with 'Nodal's': ${nodalOccurrences.map(a => a.reading.substring(0, 60)).join("; ")}`).toBe(0);
  });
});
