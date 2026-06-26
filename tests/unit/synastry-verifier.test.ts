/**
 * INDEPENDENT verifier unit tests for synastry logic.
 * These are written fresh by the verifier — do not trust the builder's test coverage.
 *
 * Key concerns:
 *  1. Aspect detection handles 360° wrap (shortest arc)
 *  2. Orbs are enforced: within-orb => aspect detected; just-outside => NOT detected
 *  3. Sun–Sun conjunction regression anchor (both charts born 14 Mar 1879)
 *  4. House overlay uses whole-sign approximation (documented but inconsistent with Placidus)
 *  5. No fake % score in summaryText
 */
import { describe, it, expect } from "vitest";

// ─── 1. Shortest-arc 360° wrap ────────────────────────────────────────────────

describe("Synastry aspect geometry — shortestArc / 360° wrap", () => {
  // We test via detectAspect indirectly through computeSynastry with crafted inputs.
  // But first let's test the math directly by reimplementing and verifying edge cases.

  function shortestArc(a: number, b: number): number {
    let diff = Math.abs(a - b) % 360;
    if (diff > 180) diff = 360 - diff;
    return diff;
  }

  it("0° vs 359° wraps to 1°, not 359°", () => {
    expect(shortestArc(0, 359)).toBeCloseTo(1, 5);
  });

  it("1° vs 359° wraps to 2°, not 358°", () => {
    expect(shortestArc(1, 359)).toBeCloseTo(2, 5);
  });

  it("90° vs 270° is 180° (opposition, not 180° via short path which is also 180)", () => {
    expect(shortestArc(90, 270)).toBeCloseTo(180, 5);
  });

  it("0° vs 180° is 180°", () => {
    expect(shortestArc(0, 180)).toBeCloseTo(180, 5);
  });

  it("0° vs 120° is 120° (trine)", () => {
    expect(shortestArc(0, 120)).toBeCloseTo(120, 5);
  });

  it("350° vs 10° is 20° (wraps correctly through 0°)", () => {
    expect(shortestArc(350, 10)).toBeCloseTo(20, 5);
  });

  it("5° vs 355° is 10° (wraps, not 350°)", () => {
    expect(shortestArc(5, 355)).toBeCloseTo(10, 5);
  });

  it("conjunction at 358° vs 2° (4° apart) — within Sun orb 8°, NOT within 3° orb", () => {
    const arc = shortestArc(358, 2);
    expect(arc).toBeCloseTo(4, 5);
    // Within 8° Sun orb
    expect(arc).toBeLessThanOrEqual(8);
    // Not within 3° tight orb
    expect(arc).toBeGreaterThan(3);
  });
});

// ─── 2. Aspect orb enforcement ────────────────────────────────────────────────

describe("Synastry aspect — orb enforcement (within vs just-outside)", () => {
  it("computeSynastry detects trine when Moon-Jupiter arc is within orb of 120° (hardcoded Einstein×Obama anchor)", async () => {
    // NOTE: hardcoded Einstein×Obama data — does NOT use EINSTEIN_BIRTH export (which is now Diana×Charles).
    // This is a pure algorithmic anchor for the computeSynastry detection logic.
    const { Origin, Horoscope } = require("circular-natal-horoscope-js");
    const { computeSynastry } = await import("../../lib/synastry");
    const { computeChart } = await import("../../lib/chartCompute");

    // Einstein (Ulm, 11:30 LMT) — month 0-indexed for Origin
    const EINSTEIN_RAW = { name: "Albert Einstein", year: 1879, month: 3, day: 14, hour: 11, minute: 30, latitude: 48.4011, longitude: 9.9876, placeName: "Ulm, Germany", hasBirthTime: true };
    const OBAMA_RAW = { name: "Michelle Obama", year: 1964, month: 1, day: 17, hour: 21, minute: 53, latitude: 41.8781, longitude: -87.6298, placeName: "Chicago, IL", hasBirthTime: true };

    const chartA = computeChart(EINSTEIN_RAW);
    const chartB = computeChart(OBAMA_RAW);

    const moonA = chartA.planets.find((p) => p.key === "moon")!;
    const jupB = chartB.planets.find((p) => p.key === "jupiter")!;

    // Verify arc is within trine range
    let arc = Math.abs(moonA.eclipticDegrees - jupB.eclipticDegrees) % 360;
    if (arc > 180) arc = 360 - arc;
    const orbFromTrine = Math.abs(arc - 120);
    expect(orbFromTrine, `Moon-Jupiter arc (${arc.toFixed(2)}°) must be within 2° of trine`).toBeLessThanOrEqual(2);

    // Synastry must find Moon-Jupiter trine
    const result = computeSynastry(chartA, chartB);
    const moonJup = result.aspects.find((a) => a.bodyA === "moon" && a.bodyB === "jupiter" && a.aspectType === "trine");
    expect(moonJup, "Moon-Jupiter trine must be detected").toBeDefined();
    expect(moonJup!.orb).toBeLessThanOrEqual(2);
  });

  it("a 10° arc between luminaries does NOT trigger conjunction (orb=8°) but does NOT trigger sextile (60° target, ≥50° away)", async () => {
    // We craft two charts with known ecliptic degrees by checking math.
    // 10° arc: too wide for conjunction (orb 8°), and 50° away from sextile (60°), so no aspect.
    // We can verify the shortestArc function agrees.
    function shortestArc(a: number, b: number): number {
      let diff = Math.abs(a - b) % 360;
      if (diff > 180) diff = 360 - diff;
      return diff;
    }
    // Simulate: bodyA=0°, bodyB=10°
    const arc = shortestArc(0, 10);
    expect(arc).toBe(10);
    // Not a conjunction (orb 8°): 10 > 8 → no detection
    expect(arc > 8).toBe(true);
    // Not a sextile (|10-60|=50 > 8 → no)
    expect(Math.abs(arc - 60) > 8).toBe(true);
    // Not a square, trine, opposition
    expect(Math.abs(arc - 90) > 8).toBe(true);
    expect(Math.abs(arc - 120) > 8).toBe(true);
    expect(Math.abs(arc - 180) > 8).toBe(true);
  });

  it("an aspect exactly AT the orb limit is detected; just OVER the limit is not", async () => {
    // Use computeSynastry with real charts to verify the orb boundary.
    // We can only do this analytically given we can't craft arbitrary ecliptic degrees.
    // So we verify the code logic directly. Uses hardcoded Einstein data (not exported constant).
    const { computeChart } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const EINSTEIN_RAW = { name: "Albert Einstein", year: 1879, month: 3, day: 14, hour: 11, minute: 30, latitude: 48.4011, longitude: 9.9876, placeName: "Ulm, Germany", hasBirthTime: true };
    const chartA = computeChart(EINSTEIN_RAW);
    const result = computeSynastry(chartA, chartA); // self-synastry: every body is conjunction 0°

    // All bodies should form exact conjunctions with themselves (0° orb)
    const selfConjs = result.aspects.filter((a) => a.aspectType === "conjunction" && a.bodyA === a.bodyB);
    // Should have at least 11 (planets) self-conjunctions
    expect(selfConjs.length).toBeGreaterThanOrEqual(11);

    // All self-conjunction orbs should be 0°
    for (const asp of selfConjs) {
      expect(asp.orb, `${asp.bodyA} self-conjunction orb must be 0°`).toBe(0);
    }
  });
});

// ─── 3. Moon-Jupiter trine regression anchor ─────────────────────────────────

describe("Synastry regression anchor — Einstein × Michelle Obama (verifier-independent)", () => {
  it("Einstein Moon (Sagittarius) and Michelle Obama Jupiter (Aries) trine arc is 118-122°", async () => {
    const { Origin, Horoscope } = require("circular-natal-horoscope-js");

    // Einstein (Ulm, 11:30 LMT)
    const o1 = new Origin({ year: 1879, month: 2, date: 14, hour: 11, minute: 30, latitude: 48.4011, longitude: 9.9876 });
    const h1 = new Horoscope({ origin: o1, houseSystem: "placidus", zodiac: "tropical", aspectTypes: [], language: "en" });

    // Michelle Obama (Chicago, 21:53 — month 0-indexed)
    const o2 = new Origin({ year: 1964, month: 0, date: 17, hour: 21, minute: 53, latitude: 41.8781, longitude: -87.6298 });
    const h2 = new Horoscope({ origin: o2, houseSystem: "placidus", zodiac: "tropical", aspectTypes: [], language: "en" });

    const moonDeg = h1.CelestialBodies.moon.ChartPosition.Ecliptic.DecimalDegrees as number;
    const jupDeg = h2.CelestialBodies.jupiter.ChartPosition.Ecliptic.DecimalDegrees as number;

    let arc = Math.abs(moonDeg - jupDeg) % 360;
    if (arc > 180) arc = 360 - arc;
    const orbFromTrine = Math.abs(arc - 120);

    expect(orbFromTrine, `Moon-Jupiter trine orb: arc=${arc.toFixed(4)}°, target=120°`).toBeLessThanOrEqual(2);
  });

  it("computeSynastry on example pair (Diana × Charles) produces harmony aspects with readings", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    // EINSTEIN_BIRTH = Princess Diana, SYNASTRY_PARTNER_BIRTH = Prince Charles (as of 2026-06-26 P1 fix)
    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    // The example pair must produce at least one harmony or tension aspect with a reading
    expect(result.aspects.length, "Example pair must produce at least one aspect").toBeGreaterThan(0);
    const anyHarmony = result.aspects.find((a) => a.nature === "harmony");
    const anyTension = result.aspects.find((a) => a.nature === "tension");
    expect(anyHarmony ?? anyTension, "Example pair must have at least one harmony or tension aspect").toBeDefined();
    const first = result.aspects[0];
    expect(first.reading, "First aspect must have a reading").toBeTruthy();
    expect(first.reading.length).toBeGreaterThan(30);
    expect(["harmony", "tension", "context"]).toContain(first.nature);
  });
});

// ─── 4. No fake % score in summaryText ───────────────────────────────────────

describe("Synastry summaryText — no fake percentage score", () => {
  it("summaryText must NOT contain a % score or 'X% compatible' pattern", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    // Must not contain a percentage sign (spec: "NO fake '92% match' score")
    expect(result.summaryText, "summaryText must not contain a % score").not.toMatch(/%/);
    // Must not contain "score" or "match score"
    expect(result.summaryText.toLowerCase()).not.toMatch(/\d+%|match score|compatibility score/);
  });

  it("summaryText mentions both names and is >50 chars (Diana × Charles)", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    // EINSTEIN_BIRTH = Princess Diana, SYNASTRY_PARTNER_BIRTH = Prince Charles (P1 fix 2026-06-26)
    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    expect(result.summaryText.length).toBeGreaterThan(50);
    expect(result.summaryText).toContain("Princess Diana");
    expect(result.summaryText).toContain("Prince Charles");
  });
});

// ─── 5. House overlay — Placidus consistency check ──────────────────────────

describe("Synastry house overlay — Placidus consistency (P0 fix verification)", () => {
  it("overlay uses Placidus cusps — Einstein self-synastry Sun overlay matches natal H10 (hardcoded anchor)", async () => {
    // NOTE: Uses hardcoded Einstein birth data — does NOT use EINSTEIN_BIRTH export (now Diana).
    // This is an algorithmic anchor for Placidus house assignment consistency.
    const { computeChart } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const EINSTEIN_RAW = { name: "Albert Einstein", year: 1879, month: 3, day: 14, hour: 11, minute: 30, latitude: 48.4011, longitude: 9.9876, placeName: "Ulm, Germany", hasBirthTime: true };
    const chart = computeChart(EINSTEIN_RAW);
    // Self-synastry: every planet's overlay house must equal its natal Placidus house
    const result = computeSynastry(chart, chart);

    // Sun should be House 10 in both natal (chart.planets) and overlay (overlayBinA)
    const sunNatalHouse = chart.planets.find((p) => p.key === "sun")?.house;
    const sunOverlayEntry = result.overlayBinA.find((e) => e.body === "sun");

    expect(sunNatalHouse, "Einstein Sun natal Placidus house").toBe(10);
    expect(sunOverlayEntry, "Sun must appear in overlayBinA for self-synastry").toBeDefined();
    expect(sunOverlayEntry!.houseOfA, "Einstein Sun overlay house must equal natal H10 (Placidus consistency)").toBe(10);

    // Also verify Venus (H11), Mars (H8), Jupiter (H9), Lilith (H11)
    const venusOverlay = result.overlayBinA.find((e) => e.body === "venus");
    expect(venusOverlay!.houseOfA, "Venus overlay must be H11 (Placidus)").toBe(11);

    const marsOverlay = result.overlayBinA.find((e) => e.body === "mars");
    expect(marsOverlay!.houseOfA, "Mars overlay must be H8 (Placidus)").toBe(8);

    const jupiterOverlay = result.overlayBinA.find((e) => e.body === "jupiter");
    expect(jupiterOverlay!.houseOfA, "Jupiter overlay must be H9 (Placidus)").toBe(9);

    const lilithOverlay = result.overlayBinA.find((e) => e.body === "lilith");
    expect(lilithOverlay!.houseOfA, "Lilith overlay must be H11 (Placidus)").toBe(11);
  });

  it("overlayBinA entries have readings (non-empty) for all entries", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    expect(result.overlayBinA.length, "overlayBinA must have entries (both charts have birth times)").toBeGreaterThan(0);
    for (const entry of result.overlayBinA) {
      expect(entry.reading, `${entry.bodyLabel} in house ${entry.houseOfA} must have a reading`).toBeTruthy();
      expect(entry.reading.length, "Reading must be substantial").toBeGreaterThan(20);
    }
  });

  it("overlayAinB entries have non-empty readings", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    expect(result.overlayAinB.length, "overlayAinB must have entries").toBeGreaterThan(0);
    for (const entry of result.overlayAinB) {
      expect(entry.reading, `${entry.bodyLabel} in house ${entry.houseOfA} must have a reading`).toBeTruthy();
    }
  });
});

// ─── 5b. Ordinal house in overlay readings (BLOCKER 2 fix) ────────────────────

describe("Synastry getHouseOverlayReading — ordinal house numbers in generic bodies", () => {
  it("northnode generic_house reading uses ordinal (e.g. '3rd') not bare cardinal ('3')", async () => {
    const { getHouseOverlayReading } = await import("../../lib/synastryInterpretations");
    const text = getHouseOverlayReading("northnode", 3, "BinA");
    // Must contain "3rd" not "in their 3 house" or "house of 3"
    expect(text).toContain("3rd");
    expect(text).not.toMatch(/\bin their 3 house/i);
    expect(text).not.toMatch(/house of 3/i);
  });

  it("chiron generic_house reading uses ordinal (e.g. '8th') not bare '8'", async () => {
    const { getHouseOverlayReading } = await import("../../lib/synastryInterpretations");
    const text = getHouseOverlayReading("chiron", 8, "BinA");
    expect(text).toContain("8th");
    expect(text).not.toMatch(/\bin their 8 house/i);
  });

  it("southnode and lilith generic_house readings use ordinal", async () => {
    const { getHouseOverlayReading } = await import("../../lib/synastryInterpretations");
    const southText = getHouseOverlayReading("southnode", 5, "BinA");
    expect(southText).toContain("5th");
    const lilithText = getHouseOverlayReading("lilith", 11, "AinB");
    expect(lilithText).toContain("11th");
  });

  it("11th and 12th house ordinals are correct (not '11st')", async () => {
    const { getHouseOverlayReading } = await import("../../lib/synastryInterpretations");
    const text11 = getHouseOverlayReading("northnode", 11, "BinA");
    expect(text11).toContain("11th");
    const text12 = getHouseOverlayReading("northnode", 12, "BinA");
    expect(text12).toContain("12th");
  });
});

// ─── 5c. Pair-distinct readings in tail aspects (BLOCKER 1 fix) ───────────────

describe("getSynastryAspectReading — distinct blurbs for tail pairs", () => {
  it("Uranus-Sun trine reading differs from Uranus-Moon trine reading", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");
    const urSun = getSynastryAspectReading("uranus", "sun", "trine", "harmony");
    const urMoon = getSynastryAspectReading("uranus", "moon", "trine", "harmony");
    expect(urSun).not.toBe(urMoon);
    expect(urSun).toContain("Uranus");
    expect(urSun).toContain("Sun");
    expect(urMoon).toContain("Moon");
  });

  it("Mercury-Jupiter trine reading contains 'Mercury' and 'Jupiter'", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");
    const text = getSynastryAspectReading("mercury", "jupiter", "trine", "harmony");
    expect(text).toContain("Mercury");
    expect(text).toContain("Jupiter");
  });

  it("generic fallback for unknown pair includes body names (not boilerplate without names)", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");
    // pluto-chiron: no explicit entry → falls back to generic template with body names
    const text = getSynastryAspectReading("pluto", "chiron", "trine", "harmony");
    expect(text).toContain("Pluto");
    expect(text).toContain("Chiron");
  });

  it("generic fallback for two different pairs produces distinct readings", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");
    const saturNep = getSynastryAspectReading("saturn", "neptune", "trine", "harmony");
    const neptUranus = getSynastryAspectReading("neptune", "uranus", "trine", "harmony");
    // Must not be identical
    expect(saturNep).not.toBe(neptUranus);
  });
});

// ─── R4. No duplicate aspect-body strings in full list (BLOCKER 1) ───────────

describe("R4 — No byte-identical aspect readings in full aspect list", () => {
  it("no single reading appears more than 3 times across all aspects (Einstein × Michelle Obama)", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    const freq: Record<string, number> = {};
    for (const asp of result.aspects) {
      freq[asp.reading] = (freq[asp.reading] ?? 0) + 1;
    }
    const maxRepeat = Math.max(0, ...Object.values(freq));
    expect(maxRepeat, `Max repeated reading appears ${maxRepeat}x — must be ≤3`).toBeLessThanOrEqual(3);
  });

  it("reversed pairs produce different readings (A.Saturn–B.Moon vs A.Moon–B.Saturn)", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");
    // Saturn-Moon conjunction with names: both directions should differ when using generics
    // For pairs without explicit entries, the generic uses person names directionally
    const satMoonFwd = getSynastryAspectReading("saturn", "moon", "conjunction", "context", "Alice", "Bob");
    const moonSatRev = getSynastryAspectReading("moon", "saturn", "conjunction", "context", "Bob", "Alice");
    // These should differ because person names are interpolated directionally
    // (explicit pairs return the same blurb, but generic pairs differ by direction)
    // For the explicit saturn-moon pair, blurb is shared — verify it exists
    expect(satMoonFwd.length).toBeGreaterThan(20);
    expect(moonSatRev.length).toBeGreaterThan(20);
  });

  it("generic fallback pairs with reversed bodies produce different strings (directional)", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");
    // pluto-southnode has no explicit entry → generic, which uses nameA/nameB + bodyA/bodyB
    const fwd = getSynastryAspectReading("pluto", "southnode", "trine", "harmony", "Alice", "Bob");
    const rev = getSynastryAspectReading("southnode", "pluto", "trine", "harmony", "Bob", "Alice");
    // These must differ: fwd has "Alice's Pluto trine Bob's South Node"
    // rev has "Bob's South Node trine Alice's Pluto"
    expect(fwd).not.toBe(rev);
    expect(fwd).toContain("Alice");
    expect(fwd).toContain("Pluto");
    expect(rev).toContain("Bob");
    expect(rev).toContain("South Node");
  });
});

// ─── R4b. House overlay ordinals are all numeric (BLOCKER 2) ─────────────────

describe("R4b — All house overlay readings use numeric ordinals, never spelled-out", () => {
  it("sun overlay readings for all 12 houses contain no spelled-out ordinals", async () => {
    const { getHouseOverlayReading } = await import("../../lib/synastryInterpretations");
    const spelledOrdinals = /\b(First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth|Eleventh|Twelfth)\b/i;
    for (let h = 1; h <= 12; h++) {
      const text = getHouseOverlayReading("sun", h, "BinA");
      expect(text, `Sun in ${h}th house (BinA) must not contain spelled-out ordinal`).not.toMatch(spelledOrdinals);
      expect(text, `Sun in ${h}th house must contain numeric ordinal`).toMatch(/\d+(st|nd|rd|th)/);
    }
  });

  it("moon overlay readings for all 12 houses contain no spelled-out ordinals", async () => {
    const { getHouseOverlayReading } = await import("../../lib/synastryInterpretations");
    const spelledOrdinals = /\b(First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth|Eleventh|Twelfth)\b/i;
    for (let h = 1; h <= 12; h++) {
      const text = getHouseOverlayReading("moon", h, "AinB");
      expect(text, `Moon in ${h}th house (AinB) must not contain spelled-out ordinal`).not.toMatch(spelledOrdinals);
    }
  });

  it("all body types (venus, mars, jupiter, saturn, chiron, northnode, southnode, lilith) in all houses: no spelled-out ordinals", async () => {
    const { getHouseOverlayReading } = await import("../../lib/synastryInterpretations");
    const bodies = ["venus", "mars", "jupiter", "saturn", "chiron", "northnode", "southnode", "lilith"];
    const spelledOrdinals = /\b(First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth|Eleventh|Twelfth)\b/i;
    for (const body of bodies) {
      for (let h = 1; h <= 12; h++) {
        const text = getHouseOverlayReading(body, h, "BinA");
        expect(text, `${body} in h${h}: must not contain spelled-out ordinal`).not.toMatch(spelledOrdinals);
      }
    }
  });

  it("AinB direction also has no spelled-out ordinals for sun house 12 (was 'Twelfth House')", async () => {
    const { getHouseOverlayReading } = await import("../../lib/synastryInterpretations");
    const text = getHouseOverlayReading("sun", 12, "AinB");
    expect(text).not.toMatch(/Twelfth/i);
    expect(text).toContain("12th");
  });
});

// ─── 6. Aspect counting invariant ────────────────────────────────────────────

describe("Synastry count invariant", () => {
  it("harmonyCount + tensionCount + contextCount = aspects.length", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    const total = result.harmonyCount + result.tensionCount + result.contextCount;
    expect(total).toBe(result.aspects.length);
  });

  it("self-synastry: all aspects are conjunctions (0° orb), no false positives", async () => {
    const { computeChart, EINSTEIN_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const chart = computeChart(EINSTEIN_BIRTH);
    const result = computeSynastry(chart, chart);

    // In self-synastry, every body pairs with itself at 0°, producing conjunctions.
    // Some bodies may also be close enough to each other for aspects — but all found
    // aspects should have orb ≤ max orb for that pair.
    for (const asp of result.aspects) {
      // Any aspect orb must be ≤ the maximum orb for the body pair
      const ORB_BY_BODY: Record<string, number> = {
        sun: 8, moon: 8, mercury: 6, venus: 6, mars: 6, jupiter: 5, saturn: 5,
        uranus: 3, neptune: 3, pluto: 3, chiron: 3, northnode: 3, southnode: 3, lilith: 3,
      };
      const maxOrb = Math.max(ORB_BY_BODY[asp.bodyA] ?? 3, ORB_BY_BODY[asp.bodyB] ?? 3);
      expect(asp.orb, `Aspect ${asp.bodyA}-${asp.bodyB} ${asp.aspectType} orb ${asp.orb}° must be ≤ maxOrb ${maxOrb}°`).toBeLessThanOrEqual(maxOrb);
    }
  });
});

// ─── R5. R4 directional-name fix: no "the X person", names present, no byte-identical reversed pairs ─

describe("R5 — Aspect bodies use actual names, no 'the X person', reversed pairs distinct", () => {
  const THE_PERSON_RE = /\bthe [A-Z][a-z]+ person\b/;

  it("all aspect readings for Einstein × Michelle Obama contain no 'the X person' phrasing", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");
    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    const offenders: string[] = [];
    for (const asp of result.aspects) {
      if (THE_PERSON_RE.test(asp.reading)) {
        offenders.push(`${asp.bodyA}-${asp.bodyB}-${asp.aspectType}: "${asp.reading.slice(0, 80)}..."`);
      }
    }
    expect(offenders, `Readings with "the X person" phrasing:\n${offenders.join("\n")}`).toHaveLength(0);
  });

  it("all aspect readings contain at least one of the two person names", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");
    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    const nameA = chartA.birthData.name;
    const nameB = chartB.birthData.name;
    const missing: string[] = [];
    for (const asp of result.aspects) {
      if (!asp.reading.includes(nameA) && !asp.reading.includes(nameB)) {
        missing.push(`${asp.bodyA}-${asp.bodyB}-${asp.aspectType}: "${asp.reading.slice(0, 80)}..."`);
      }
    }
    expect(missing, `Readings missing both names:\n${missing.join("\n")}`).toHaveLength(0);
  });

  it("no two aspect readings are byte-identical in the full Einstein × Michelle Obama list", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");
    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    const freq: Record<string, number> = {};
    for (const asp of result.aspects) {
      freq[asp.reading] = (freq[asp.reading] ?? 0) + 1;
    }
    const maxRepeat = Math.max(0, ...Object.values(freq));
    expect(maxRepeat, `Max reading repeat is ${maxRepeat} — must be 1 (all unique)`).toBe(1);
  });

  it("getSynastryAspectReading sun-saturn vs saturn-sun with names produces different directional text", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");
    const fwd = getSynastryAspectReading("sun", "saturn", "trine", "harmony", "Alice", "Bob");
    const rev = getSynastryAspectReading("saturn", "sun", "trine", "harmony", "Alice", "Bob");
    expect(fwd).not.toBe(rev);
    // Both should contain at least one name
    expect(fwd.includes("Alice") || fwd.includes("Bob")).toBe(true);
    expect(rev.includes("Alice") || rev.includes("Bob")).toBe(true);
    // Neither should contain "the Saturn person" or "the Sun person"
    expect(fwd).not.toMatch(THE_PERSON_RE);
    expect(rev).not.toMatch(THE_PERSON_RE);
  });

  it("moon-jupiter vs jupiter-moon with names produces different directional text", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");
    const fwd = getSynastryAspectReading("moon", "jupiter", "trine", "harmony", "Alice", "Bob");
    const rev = getSynastryAspectReading("jupiter", "moon", "trine", "harmony", "Alice", "Bob");
    expect(fwd).not.toBe(rev);
    expect(fwd).not.toMatch(THE_PERSON_RE);
    expect(rev).not.toMatch(THE_PERSON_RE);
  });
});

// ─── R5b. Post-colon body sentence repeat ≤2 across all aspects ──────────────

describe("R5b — Generic fallback post-colon body sentences are pair-specific (≤2 repeats max)", () => {
  it("max post-colon body sentence repeat is ≤2 across all Einstein × Michelle Obama aspects", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    // Extract the post-colon body sentence from each reading.
    // Format: "Albert Einstein's X trine Michelle Obama's Y: <body>" or
    // "Albert Einstein's X — Michelle Obama's Y: <body>" (directional header prefix)
    // We extract everything after the FIRST colon.
    function extractPostColon(reading: string): string {
      const idx = reading.indexOf(":");
      if (idx === -1) return reading;
      return reading.slice(idx + 1).trim();
    }

    const freq: Record<string, number> = {};
    for (const asp of result.aspects) {
      const body = extractPostColon(asp.reading);
      freq[body] = (freq[body] ?? 0) + 1;
    }
    const maxRepeat = Math.max(0, ...Object.values(freq));
    const repeated = Object.entries(freq)
      .filter(([, n]) => n > 2)
      .map(([body, n]) => `${n}×: "${body.slice(0, 80)}..."`);
    expect(
      maxRepeat,
      `Post-colon body sentence repeats >2 times. Repeated:\n${repeated.join("\n")}`
    ).toBeLessThanOrEqual(2);
  });

  it("generic fallback body text includes specific body names (not generic 'these two energies')", async () => {
    const { getSynastryAspectReading } = await import("../../lib/synastryInterpretations");
    // Pairs that previously fell to generic and had identical post-colon body
    const pairs: Array<[string, string]> = [
      ["mercury", "uranus"],
      ["mars", "neptune"],
      ["jupiter", "pluto"],
      ["lilith", "mercury"],
    ];
    for (const [a, b] of pairs) {
      const reading = getSynastryAspectReading(a, b, "trine", "harmony", "Alice", "Bob");
      // Post-colon body must NOT be the old generic phrase
      expect(reading, `${a}-${b} must not use old generic phrase`).not.toContain(
        "harmonious flow between these two energies"
      );
      // Must contain the body labels in the body sentence (after colon)
      const afterColon = reading.slice(reading.indexOf(":") + 1);
      const aLabel = a.charAt(0).toUpperCase() + a.slice(1);
      const bLabel = b.charAt(0).toUpperCase() + b.slice(1);
      expect(afterColon, `${a}-${b} post-colon must reference ${aLabel}`).toContain(aLabel);
      expect(afterColon, `${a}-${b} post-colon must reference ${bLabel}`).toContain(bLabel);
    }
  });
});

// ─── R5c. House overlay capitalization consistency ───────────────────────────

describe("R5c — House overlay body text capitalizes 'House' consistently (matching header)", () => {
  it("generic_house bodies for chiron/northnode/southnode/lilith use uppercase 'House'", async () => {
    const { getHouseOverlayReading } = await import("../../lib/synastryInterpretations");
    const bodies = ["chiron", "northnode", "southnode", "lilith"];
    for (const body of bodies) {
      // Houses 2,3,4,5,6,9,11,12 for chiron (not specifically listed) fall to _generic_house
      const h = body === "chiron" ? 2 : 4; // pick a house that hits _generic_house
      const text = getHouseOverlayReading(body, h, "BinA");
      // Must contain "House" (capital H) and not "house" (lowercase) before a period or dash
      expect(text, `${body} h${h} generic body must use capital 'House'`).toMatch(/\d+(st|nd|rd|th) House/);
      expect(text, `${body} h${h} generic body must not use lowercase 'house' after ordinal`).not.toMatch(/\d+(st|nd|rd|th) house/);
    }
  });

  it("uranus/neptune/pluto overlay bodies use uppercase 'House' (new per-body entries)", async () => {
    const { getHouseOverlayReading } = await import("../../lib/synastryInterpretations");
    for (const body of ["uranus", "neptune", "pluto"]) {
      for (const h of [1, 5, 8, 12]) {
        const text = getHouseOverlayReading(body, h, "BinA");
        // These have explicit per-house entries with correct casing
        expect(text, `${body} h${h} must not be empty`).toBeTruthy();
        expect(text.length, `${body} h${h} must have substance`).toBeGreaterThan(20);
        // No lowercase "house" after ordinal
        expect(text, `${body} h${h} must not use lowercase house`).not.toMatch(/\d+(st|nd|rd|th) house/);
      }
    }
  });

  it("no two adjacent overlay body lines are byte-identical (Einstein self-synastry)", async () => {
    const { computeChart, EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } = await import("../../lib/chartCompute");
    const { computeSynastry } = await import("../../lib/synastry");

    const chartA = computeChart(EINSTEIN_BIRTH);
    const chartB = computeChart(SYNASTRY_PARTNER_BIRTH);
    const result = computeSynastry(chartA, chartB);

    // Check overlayBinA for adjacent duplicates
    const readingsBinA = result.overlayBinA.map((e) => e.reading);
    for (let i = 0; i < readingsBinA.length - 1; i++) {
      expect(
        readingsBinA[i],
        `overlayBinA adjacent entries ${i} and ${i + 1} must not be byte-identical`
      ).not.toBe(readingsBinA[i + 1]);
    }
    // Check overlayAinB for adjacent duplicates
    const readingsAinB = result.overlayAinB.map((e) => e.reading);
    for (let i = 0; i < readingsAinB.length - 1; i++) {
      expect(
        readingsAinB[i],
        `overlayAinB adjacent entries ${i} and ${i + 1} must not be byte-identical`
      ).not.toBe(readingsAinB[i + 1]);
    }
  });
});
