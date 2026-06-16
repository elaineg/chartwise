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
