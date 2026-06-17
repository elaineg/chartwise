/**
 * Unit tests for chart computation logic.
 * Validates against Einstein's known chart (AA-rated birth data).
 * Expected output verified against astro-seek.com (Placidus, tropical).
 */
import { describe, it, expect } from "vitest";

// We test the compute logic via Node.js require (CJS)
// circular-natal-horoscope-js works in Node as well as browser
describe("Einstein chart computation", () => {
  it("produces correct Sun sign (Pisces)", () => {
    const { Origin, Horoscope } = require("circular-natal-horoscope-js");
    const origin = new Origin({
      year: 1879,
      month: 2, // 0-indexed: March = 2
      date: 14,
      hour: 11,
      minute: 30,
      latitude: 48.4011,
      longitude: 9.9876,
    });
    const h = new Horoscope({
      origin,
      houseSystem: "placidus",
      zodiac: "tropical",
      aspectTypes: ["major"],
      language: "en",
    });
    expect(h.CelestialBodies.sun.Sign.label).toBe("Pisces");
  });

  it("produces correct Moon sign (Sagittarius)", () => {
    const { Origin, Horoscope } = require("circular-natal-horoscope-js");
    const origin = new Origin({
      year: 1879,
      month: 2,
      date: 14,
      hour: 11,
      minute: 30,
      latitude: 48.4011,
      longitude: 9.9876,
    });
    const h = new Horoscope({
      origin,
      houseSystem: "placidus",
      zodiac: "tropical",
      aspectTypes: ["major"],
      language: "en",
    });
    expect(h.CelestialBodies.moon.Sign.label).toBe("Sagittarius");
  });

  it("produces correct Ascendant sign (Cancer)", () => {
    const { Origin, Horoscope } = require("circular-natal-horoscope-js");
    const origin = new Origin({
      year: 1879,
      month: 2,
      date: 14,
      hour: 11,
      minute: 30,
      latitude: 48.4011,
      longitude: 9.9876,
    });
    const h = new Horoscope({
      origin,
      houseSystem: "placidus",
      zodiac: "tropical",
      aspectTypes: ["major"],
      language: "en",
    });
    expect(h.Ascendant.Sign.label).toBe("Cancer");
  });

  it("places Sun in the 10th house", () => {
    const { Origin, Horoscope } = require("circular-natal-horoscope-js");
    const origin = new Origin({
      year: 1879,
      month: 2,
      date: 14,
      hour: 11,
      minute: 30,
      latitude: 48.4011,
      longitude: 9.9876,
    });
    const h = new Horoscope({
      origin,
      houseSystem: "placidus",
      zodiac: "tropical",
      aspectTypes: ["major"],
      language: "en",
    });
    expect(h.CelestialBodies.sun.House.label).toBe("Tenth");
  });

  it("computes 11 planets (Sun through Chiron)", () => {
    const { Origin, Horoscope } = require("circular-natal-horoscope-js");
    const origin = new Origin({
      year: 1879,
      month: 2,
      date: 14,
      hour: 11,
      minute: 30,
      latitude: 48.4011,
      longitude: 9.9876,
    });
    const h = new Horoscope({
      origin,
      houseSystem: "placidus",
      zodiac: "tropical",
      aspectTypes: ["major"],
      language: "en",
    });
    const PLANET_KEYS = [
      "sun", "moon", "mercury", "venus", "mars",
      "jupiter", "saturn", "uranus", "neptune", "pluto", "chiron",
    ];
    for (const key of PLANET_KEYS) {
      expect(h.CelestialBodies[key], `${key} should exist`).toBeDefined();
      expect(h.CelestialBodies[key].Sign.label).toBeTruthy();
    }
  });
});

describe("Interpretation dataset coverage", () => {
  it("has planetInHouse entries for all 11 planets × 12 houses", async () => {
    const { default: interp } = await import("../../lib/interpretations");
    const PLANETS = [
      "sun", "moon", "mercury", "venus", "mars",
      "jupiter", "saturn", "uranus", "neptune", "pluto", "chiron",
    ];
    for (const planet of PLANETS) {
      expect(interp.planetInHouse[planet], `${planet} should have planetInHouse entries`).toBeDefined();
      for (let h = 1; h <= 12; h++) {
        const blurb = interp.planetInHouse[planet]?.[String(h)];
        expect(blurb, `${planet} house ${h} should have a blurb`).toBeTruthy();
        expect(blurb!.length, `${planet} house ${h} blurb should be substantial`).toBeGreaterThan(20);
      }
    }
  });

  it("has signInHouse entries for all 12 signs × 12 houses", async () => {
    const { default: interp } = await import("../../lib/interpretations");
    const SIGNS = [
      "aries", "taurus", "gemini", "cancer", "leo", "virgo",
      "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
    ];
    for (const sign of SIGNS) {
      expect(interp.signInHouse[sign], `${sign} should have signInHouse entries`).toBeDefined();
      for (let h = 1; h <= 12; h++) {
        const blurb = interp.signInHouse[sign]?.[String(h)];
        expect(blurb, `${sign} house ${h} should have a blurb`).toBeTruthy();
      }
    }
  });

  it("has element blurbs for all 4 elements", async () => {
    const { default: interp } = await import("../../lib/interpretations");
    expect(interp.elements.fire).toBeTruthy();
    expect(interp.elements.earth).toBeTruthy();
    expect(interp.elements.air).toBeTruthy();
    expect(interp.elements.water).toBeTruthy();
  });
});

describe("Planet-sign blurb composition — same-sign placements are distinct", () => {
  it("getPlanetSignBlurb: every planet×sign entry exists and has substance", async () => {
    const { getPlanetSignBlurb } = await import("../../lib/interpretations");
    const PLANETS = ["sun", "moon", "mercury", "venus", "mars", "rising"];
    const SIGNS = [
      "aries", "taurus", "gemini", "cancer", "leo", "virgo",
      "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
    ];
    for (const planet of PLANETS) {
      for (const sign of SIGNS) {
        const blurb = getPlanetSignBlurb(planet, sign);
        expect(blurb, `${planet}/${sign} must have a blurb`).toBeTruthy();
        expect(blurb.length, `${planet}/${sign} blurb must be substantial`).toBeGreaterThan(30);
      }
    }
  });

  it("two planets in the SAME sign produce different blurbs (not just different prefixes)", async () => {
    const { getPlanetSignBlurb } = await import("../../lib/interpretations");
    // Test every sign: mercury vs venus in the same sign
    const SIGNS = [
      "aries", "taurus", "gemini", "cancer", "leo", "virgo",
      "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
    ];
    for (const sign of SIGNS) {
      const sunBlurb = getPlanetSignBlurb("sun", sign);
      const moonBlurb = getPlanetSignBlurb("moon", sign);
      const mercuryBlurb = getPlanetSignBlurb("mercury", sign);
      const venusBlurb = getPlanetSignBlurb("venus", sign);
      const marsBlurb = getPlanetSignBlurb("mars", sign);
      const risingBlurb = getPlanetSignBlurb("rising", sign);

      // Each pair must be a completely different string
      expect(sunBlurb, `sun/${sign} vs moon/${sign} must differ`).not.toBe(moonBlurb);
      expect(mercuryBlurb, `mercury/${sign} vs venus/${sign} must differ`).not.toBe(venusBlurb);
      expect(marsBlurb, `mars/${sign} vs rising/${sign} must differ`).not.toBe(risingBlurb);

      // The body (not just prefix) must differ — strip first word and compare
      const stripFirstWord = (s: string) => s.split(" ").slice(1).join(" ");
      expect(
        stripFirstWord(sunBlurb),
        `sun/${sign} body (after first word) must differ from moon/${sign} body`
      ).not.toBe(stripFirstWord(moonBlurb));
      expect(
        stripFirstWord(mercuryBlurb),
        `mercury/${sign} body must differ from venus/${sign} body after first word`
      ).not.toBe(stripFirstWord(venusBlurb));
    }
  });

  it("Einstein's same-planet-group check: Sun(Pisces) and Moon(Sag) blurbs are distinct", async () => {
    const { getPlanetSignBlurb } = await import("../../lib/interpretations");
    const sunPisces = getPlanetSignBlurb("sun", "pisces");
    const moonSag = getPlanetSignBlurb("moon", "sagittarius");
    expect(sunPisces).not.toBe(moonSag);
    // Sun/Pisces is identity-domain language
    expect(sunPisces.toLowerCase()).toMatch(/identity|self|who you are/);
    // Moon/Sag is emotion-domain language
    expect(moonSag.toLowerCase()).toMatch(/emotional|emotionally|feel/);
  });

  it("hypothetical same-sign chart: Mercury and Venus in Aries have different full blurbs", async () => {
    const { getPlanetSignBlurb } = await import("../../lib/interpretations");
    const mercuryAries = getPlanetSignBlurb("mercury", "aries");
    const venusAries = getPlanetSignBlurb("venus", "aries");
    // Full strings must differ
    expect(mercuryAries).not.toBe(venusAries);
    // Strip first word — still must differ (body is not the same sentence)
    const body = (s: string) => s.split(" ").slice(1).join(" ");
    expect(body(mercuryAries)).not.toBe(body(venusAries));
  });
});
