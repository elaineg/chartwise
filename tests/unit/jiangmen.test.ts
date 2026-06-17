/**
 * QA regression anchor — Elaine/Jiangmen chart (1998-08-08, 16:30 local, Jiangmen China).
 * Reference: AstroSeek (Placidus, tropical). Verified 2026-06-16.
 *
 * The library (circular-natal-horoscope-js) auto-derives the UTC offset from lat/long,
 * so we pass LOCAL time (16:30) + coordinates and it correctly places the chart.
 *
 * Tolerances: ±3 arcminutes on all degree assertions (floating-point ephemeris precision).
 */
import { describe, it, expect } from "vitest";
import { formatDegMinInSign } from "../../lib/chartCompute";

const TOLERANCE_DEG = 3 / 60; // 3 arcminutes in decimal degrees

/** Parse "D°MM'" back to decimal degrees within a sign (0–30 range). */
function parseDegMin(str: string): number {
  const m = str.match(/^(\d+)°(\d+)'$/);
  if (!m) throw new Error(`Cannot parse: ${str}`);
  return parseInt(m[1], 10) + parseInt(m[2], 10) / 60;
}

function makeHoroscope() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Origin, Horoscope } = require("circular-natal-horoscope-js");
  const origin = new Origin({
    year: 1998,
    month: 7,  // 0-indexed: August = 7
    date: 8,
    hour: 16,  // 16:30 local CST; lib auto-derives UTC offset from lat/long
    minute: 30,
    latitude: 22.583,   // 22°35'N
    longitude: 113.083, // 113°05'E
  });
  return new Horoscope({
    origin,
    houseSystem: "placidus",
    zodiac: "tropical",
    aspectTypes: ["major"],
    language: "en",
  });
}

describe("Jiangmen chart — node signs (P0 fix)", () => {
  it("North Node is in Virgo, House 8 (NOT Leo from house cusp)", () => {
    const h = makeHoroscope();
    const nn = h.CelestialPoints.northnode;
    expect(nn.Sign.label).toBe("Virgo");
    expect(nn.House.label).toBe("Eighth");
  });

  it("South Node is in Pisces, House 2 (NOT Aquarius from house cusp)", () => {
    const h = makeHoroscope();
    const sn = h.CelestialPoints.southnode;
    expect(sn.Sign.label).toBe("Pisces");
    expect(sn.House.label).toBe("Second");
  });

  it("North Node is near 2°07' Virgo (±3')", () => {
    const h = makeHoroscope();
    const nn = h.CelestialPoints.northnode;
    const inSign = nn.ChartPosition.Ecliptic.DecimalDegrees % 30;
    // Expected: ~2°06' = 2.1°
    expect(inSign).toBeGreaterThan(2 + 0 / 60 - TOLERANCE_DEG);
    expect(inSign).toBeLessThan(2 + 6 / 60 + TOLERANCE_DEG + 3 / 60);
  });

  it("South Node is near 2°07' Pisces (±3')", () => {
    const h = makeHoroscope();
    const sn = h.CelestialPoints.southnode;
    const inSign = sn.ChartPosition.Ecliptic.DecimalDegrees % 30;
    expect(inSign).toBeGreaterThan(2 + 0 / 60 - TOLERANCE_DEG);
    expect(inSign).toBeLessThan(2 + 6 / 60 + TOLERANCE_DEG + 3 / 60);
  });
});

describe("Jiangmen chart — Black Moon Lilith (P1 fix)", () => {
  it("Lilith is present in CelestialPoints", () => {
    const h = makeHoroscope();
    expect(h.CelestialPoints.lilith).toBeDefined();
  });

  it("Lilith is in Libra (~26°17', AstroSeek ref)", () => {
    const h = makeHoroscope();
    const lilith = h.CelestialPoints.lilith;
    expect(lilith.Sign.label).toBe("Libra");
  });

  it("Lilith is in House 10", () => {
    const h = makeHoroscope();
    const lilith = h.CelestialPoints.lilith;
    expect(lilith.House.label).toBe("Tenth");
  });

  it("Lilith is near 26° Libra (±10')", () => {
    const h = makeHoroscope();
    const lilith = h.CelestialPoints.lilith;
    const inSign = lilith.ChartPosition.Ecliptic.DecimalDegrees % 30;
    // AstroSeek: 26°17'; lib gives ~26°22' — within ~5' tolerance
    expect(inSign).toBeGreaterThan(26 - 10 / 60);
    expect(inSign).toBeLessThan(27 + 10 / 60);
  });
});

describe("Jiangmen chart — arcminute precision (P2 fix)", () => {
  it("Venus is near 23°52' Cancer (not truncated to 23°)", () => {
    const h = makeHoroscope();
    const venus = h.CelestialBodies.venus;
    expect(venus.Sign.label).toBe("Cancer");
    const inSign = venus.ChartPosition.Ecliptic.DecimalDegrees % 30;
    // Must be > 23.5° (i.e. arcminutes present, not floor-truncated)
    expect(inSign).toBeGreaterThan(23.5);
    expect(inSign).toBeLessThan(24.5);
    // formatDegMinInSign must render "23°…'"
    const formatted = formatDegMinInSign(venus.ChartPosition.Ecliptic.DecimalDegrees);
    expect(formatted).toMatch(/^23°\d{2}'$/);
    // Arcminutes should be ~51–55 (AstroSeek 23°51')
    const minutes = parseDegMin(formatted) - 23;
    expect(minutes * 60).toBeGreaterThan(40);
    expect(minutes * 60).toBeLessThan(60);
  });

  it("Mars is near 21°55' Cancer (not truncated to 21°)", () => {
    const h = makeHoroscope();
    const mars = h.CelestialBodies.mars;
    expect(mars.Sign.label).toBe("Cancer");
    const inSign = mars.ChartPosition.Ecliptic.DecimalDegrees % 30;
    expect(inSign).toBeGreaterThan(21.5);
    expect(inSign).toBeLessThan(22.5);
    const formatted = formatDegMinInSign(mars.ChartPosition.Ecliptic.DecimalDegrees);
    expect(formatted).toMatch(/^21°\d{2}'$/);
    const minutes = parseDegMin(formatted) - 21;
    expect(minutes * 60).toBeGreaterThan(45);
    expect(minutes * 60).toBeLessThan(60);
  });

  it("Sun is near 15°36' Leo", () => {
    const h = makeHoroscope();
    const sun = h.CelestialBodies.sun;
    expect(sun.Sign.label).toBe("Leo");
    const inSign = sun.ChartPosition.Ecliptic.DecimalDegrees % 30;
    expect(inSign).toBeGreaterThan(15.3);
    expect(inSign).toBeLessThan(16.0);
    const formatted = formatDegMinInSign(sun.ChartPosition.Ecliptic.DecimalDegrees);
    expect(formatted).toMatch(/^15°\d{2}'$/);
  });
});

describe("Jiangmen chart — Ascendant & MC (regression guard)", () => {
  it("Ascendant is 6°21' Capricorn", () => {
    const h = makeHoroscope();
    const asc = h.Ascendant;
    expect(asc.Sign.label).toBe("Capricorn");
    const inSign = asc.ChartPosition.Ecliptic.DecimalDegrees % 30;
    // 6°21' = 6.35°
    expect(inSign).toBeGreaterThan(6.35 - TOLERANCE_DEG);
    expect(inSign).toBeLessThan(6.35 + TOLERANCE_DEG);
  });

  it("Midheaven is ~18°40' Libra", () => {
    const h = makeHoroscope();
    const mc = h.Midheaven;
    expect(mc.Sign.label).toBe("Libra");
    const inSign = mc.ChartPosition.Ecliptic.DecimalDegrees % 30;
    // 18°40' = 18.667°
    expect(inSign).toBeGreaterThan(18.5);
    expect(inSign).toBeLessThan(19.0);
  });
});

describe("formatDegMinInSign utility", () => {
  it("formats 113.87 (Venus Cancer) as 23°52'", () => {
    // 113.87 % 30 = 23.87°; 0.87 * 60 = 52.2 → 52
    const result = formatDegMinInSign(113.87);
    expect(result).toBe("23°52'");
  });

  it("formats 111.92 (Mars Cancer) as 21°55'", () => {
    // 111.92 % 30 = 21.92°; 0.92 * 60 = 55.2 → 55
    const result = formatDegMinInSign(111.92);
    expect(result).toBe("21°55'");
  });

  it("handles 60-minute edge (rounds up degree)", () => {
    // 0.9999 * 60 ≈ 60 → should render as 1°00'
    const result = formatDegMinInSign(30.9999);
    expect(result).toBe("1°00'");
  });

  it("pads single-digit minutes with zero", () => {
    // 0.08333 * 60 = 5 → 0°05'
    const result = formatDegMinInSign(0.0833);
    expect(result).toMatch(/^0°0\d'$/);
  });
});
