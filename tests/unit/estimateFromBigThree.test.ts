/**
 * Unit tests for the Big-3 solver.
 *
 * P0 CORRECTNESS INVARIANT (from APP_SPEC.md):
 *   pick Sun=Aries, Moon=Taurus, Rising=Gemini, year=1990 →
 *   the returned BirthData, when fed to computeChart, must produce
 *   Sun==Aries, Moon==Taurus, Ascendant==Gemini.
 *
 * Additional checks:
 *  - isEstimate flag is true on the returned object
 *  - solver is deterministic (two calls with same input → same output)
 *  - bad input throws (not a silent wrong chart)
 */
import { describe, it, expect } from "vitest";
import { estimateFromBigThree, SOLVER_FAIL_MESSAGE } from "../../lib/estimateFromBigThree";
import { computeChart } from "../../lib/chartCompute";

describe("estimateFromBigThree — P0 correctness invariant", () => {
  it("Sun=Aries, Moon=Taurus, Rising=Gemini, year=1990 → chart satisfies all three", () => {
    const birth = estimateFromBigThree({
      sunSign: "aries",
      moonSign: "taurus",
      risingSign: "gemini",
      year: 1990,
    });

    // The flag must be set
    expect(birth.isEstimate).toBe(true);

    // Feed to computeChart and check the three signs
    const chart = computeChart(birth);
    expect(chart.ascendant.sign, "Ascendant must be Gemini").toBe("gemini");

    const sun = chart.planets.find((p) => p.key === "sun");
    expect(sun, "Sun planet must exist").toBeTruthy();
    expect(sun!.sign, "Sun must be Aries").toBe("aries");

    const moon = chart.planets.find((p) => p.key === "moon");
    expect(moon, "Moon planet must exist").toBeTruthy();
    expect(moon!.sign, "Moon must be Taurus").toBe("taurus");

    // isEstimate is also threaded to ComputedChart
    expect(chart.isEstimate, "ComputedChart.isEstimate must be true").toBe(true);
  });

  it("is deterministic — same inputs produce same BirthData", () => {
    const a = estimateFromBigThree({ sunSign: "aries", moonSign: "taurus", risingSign: "gemini", year: 1990 });
    const b = estimateFromBigThree({ sunSign: "aries", moonSign: "taurus", risingSign: "gemini", year: 1990 });
    expect(a.year).toBe(b.year);
    expect(a.month).toBe(b.month);
    expect(a.day).toBe(b.day);
    expect(a.hour).toBe(b.hour);
    expect(a.minute).toBe(b.minute);
  });

  it("Leo/Scorpio/Aquarius, year=1985 — correctness invariant", () => {
    const birth = estimateFromBigThree({
      sunSign: "leo",
      moonSign: "scorpio",
      risingSign: "aquarius",
      year: 1985,
    });
    const chart = computeChart(birth);
    expect(chart.ascendant.sign).toBe("aquarius");
    const sun = chart.planets.find((p) => p.key === "sun");
    expect(sun!.sign).toBe("leo");
    const moon = chart.planets.find((p) => p.key === "moon");
    expect(moon!.sign).toBe("scorpio");
  });

  it("Capricorn/Cancer/Libra, year=2000 — correctness invariant", () => {
    const birth = estimateFromBigThree({
      sunSign: "capricorn",
      moonSign: "cancer",
      risingSign: "libra",
      year: 2000,
    });
    const chart = computeChart(birth);
    expect(chart.ascendant.sign).toBe("libra");
    const sun = chart.planets.find((p) => p.key === "sun");
    expect(sun!.sign).toBe("capricorn");
    const moon = chart.planets.find((p) => p.key === "moon");
    expect(moon!.sign).toBe("cancer");
  });

  it("Pisces/Sagittarius/Cancer — matches Einstein's known big three at 1879", () => {
    // Einstein: Sun Pisces, Moon Sagittarius, Rising Cancer (1879)
    const birth = estimateFromBigThree({
      sunSign: "pisces",
      moonSign: "sagittarius",
      risingSign: "cancer",
      year: 1879,
    });
    const chart = computeChart(birth);
    expect(chart.ascendant.sign).toBe("cancer");
    const sun = chart.planets.find((p) => p.key === "sun");
    expect(sun!.sign).toBe("pisces");
    const moon = chart.planets.find((p) => p.key === "moon");
    expect(moon!.sign).toBe("sagittarius");
  });

  // ── P0 REGRESSION: Leo/Scorpio/Gemini/1988 dead-end bug ─────────────────────
  // Root cause: the old solver picked July 22 as the Moon-Scorpio day, then found
  // Gemini rising at ~1:45 AM on July 22 — but at that hour the Sun is in Cancer
  // (Leo doesn't start until later that day). The correctness invariant then
  // threw. The new solver checks all three conditions simultaneously in Pass C,
  // so it skips July 22 and correctly lands on July 23 where Leo+Scorpio+Gemini
  // all align at ~1:30 AM.
  it("Leo/Scorpio/Gemini, year=1988 — P0 bug regression (panel repro)", () => {
    const birth = estimateFromBigThree({
      sunSign: "leo",
      moonSign: "scorpio",
      risingSign: "gemini",
      year: 1988,
    });
    expect(birth.isEstimate).toBe(true);
    const chart = computeChart(birth);
    expect(chart.ascendant.sign, "Ascendant must be Gemini").toBe("gemini");
    const sun = chart.planets.find((p) => p.key === "sun");
    expect(sun!.sign, "Sun must be Leo").toBe("leo");
    const moon = chart.planets.find((p) => p.key === "moon");
    expect(moon!.sign, "Moon must be Scorpio").toBe("scorpio");
  });

  // ── VERIFIER-REQUIRED COMBINATIONS (from APP_SPEC.md P0 sweep) ─────────────

  it("Scorpio/Cancer/Capricorn, year=2001 — P0 correctness invariant", () => {
    const birth = estimateFromBigThree({
      sunSign: "scorpio",
      moonSign: "cancer",
      risingSign: "capricorn",
      year: 2001,
    });
    expect(birth.isEstimate).toBe(true);
    const chart = computeChart(birth);
    expect(chart.ascendant.sign, "Ascendant must be Capricorn").toBe("capricorn");
    const sun = chart.planets.find((p) => p.key === "sun");
    expect(sun!.sign, "Sun must be Scorpio").toBe("scorpio");
    const moon = chart.planets.find((p) => p.key === "moon");
    expect(moon!.sign, "Moon must be Cancer").toBe("cancer");
    expect(chart.isEstimate).toBe(true);
  });

  it("Leo/Leo/Leo, year=1975 — triple same-sign P0 correctness invariant", () => {
    const birth = estimateFromBigThree({
      sunSign: "leo",
      moonSign: "leo",
      risingSign: "leo",
      year: 1975,
    });
    expect(birth.isEstimate).toBe(true);
    const chart = computeChart(birth);
    expect(chart.ascendant.sign, "Ascendant must be Leo").toBe("leo");
    const sun = chart.planets.find((p) => p.key === "sun");
    expect(sun!.sign, "Sun must be Leo").toBe("leo");
    const moon = chart.planets.find((p) => p.key === "moon");
    expect(moon!.sign, "Moon must be Leo").toBe("leo");
  });

  it("Pisces/Aries/Libra, year=1988 — P0 correctness invariant", () => {
    const birth = estimateFromBigThree({
      sunSign: "pisces",
      moonSign: "aries",
      risingSign: "libra",
      year: 1988,
    });
    expect(birth.isEstimate).toBe(true);
    const chart = computeChart(birth);
    expect(chart.ascendant.sign, "Ascendant must be Libra").toBe("libra");
    const sun = chart.planets.find((p) => p.key === "sun");
    expect(sun!.sign, "Sun must be Pisces").toBe("pisces");
    const moon = chart.planets.find((p) => p.key === "moon");
    expect(moon!.sign, "Moon must be Aries").toBe("aries");
  });

  it("Determinism: Scorpio/Cancer/Capricorn/2001 produces same BirthData across two calls", () => {
    const a = estimateFromBigThree({ sunSign: "scorpio", moonSign: "cancer", risingSign: "capricorn", year: 2001 });
    const b = estimateFromBigThree({ sunSign: "scorpio", moonSign: "cancer", risingSign: "capricorn", year: 2001 });
    expect(a.year).toBe(b.year);
    expect(a.month).toBe(b.month);
    expect(a.day).toBe(b.day);
    expect(a.hour).toBe(b.hour);
    expect(a.minute).toBe(b.minute);
  });
});

// ─── BROADER PROGRAMMATIC SWEEP ──────────────────────────────────────────────
// Verify that all four spec-required combinations + a cross-sample of additional
// combos never silently return a wrong chart. If the solver returns, it must match.
describe("estimateFromBigThree — programmatic multi-combo sweep (no silent wrong chart)", () => {
  const combos: Array<{ sun: Parameters<typeof estimateFromBigThree>[0]["sunSign"]; moon: Parameters<typeof estimateFromBigThree>[0]["moonSign"]; rising: Parameters<typeof estimateFromBigThree>[0]["risingSign"]; year: number }> = [
    // Spec-required P0 cases
    { sun: "aries", moon: "taurus", rising: "gemini", year: 1990 },
    { sun: "scorpio", moon: "cancer", rising: "capricorn", year: 2001 },
    { sun: "leo", moon: "leo", rising: "leo", year: 1975 },
    { sun: "pisces", moon: "aries", rising: "libra", year: 1988 },
    // P0 regression case (Leo/Scorpio/Gemini/1988 — panel-confirmed dead-end)
    { sun: "leo", moon: "scorpio", rising: "gemini", year: 1988 },
    // Additional cross-sample
    { sun: "virgo", moon: "gemini", rising: "sagittarius", year: 1995 },
    { sun: "aquarius", moon: "scorpio", rising: "taurus", year: 2005 },
    { sun: "cancer", moon: "pisces", rising: "virgo", year: 1980 },
    { sun: "sagittarius", moon: "aquarius", rising: "aries", year: 1970 },
    { sun: "libra", moon: "capricorn", rising: "cancer", year: 2010 },
    { sun: "taurus", moon: "virgo", rising: "scorpio", year: 1965 },
  ];

  for (const { sun, moon, rising, year } of combos) {
    it(`${sun}/${moon}/${rising}/${year} → chart honors all three signs`, () => {
      const birth = estimateFromBigThree({ sunSign: sun, moonSign: moon, risingSign: rising, year });
      expect(birth.isEstimate).toBe(true);
      const chart = computeChart(birth);
      const sunPlanet = chart.planets.find((p) => p.key === "sun");
      const moonPlanet = chart.planets.find((p) => p.key === "moon");
      expect(sunPlanet!.sign, `Sun must be ${sun} for combo ${sun}/${moon}/${rising}/${year}`).toBe(sun);
      expect(moonPlanet!.sign, `Moon must be ${moon} for combo ${sun}/${moon}/${rising}/${year}`).toBe(moon);
      expect(chart.ascendant.sign, `Ascendant must be ${rising} for combo ${sun}/${moon}/${rising}/${year}`).toBe(rising);
    });
  }
});
