/**
 * Client-side chart computation using circular-natal-horoscope-js.
 * All computation happens in the browser — nothing is sent to a server.
 *
 * IMPORTANT: This file must only be imported in client components or
 * dynamic imports (the lib uses browser-compatible JS but is large).
 */

export interface BirthData {
  name: string;
  year: number;
  month: number; // 1-indexed (January=1)
  day: number;
  hour: number;
  minute: number;
  latitude: number;
  longitude: number;
  placeName: string;
  utcOffset?: number | null; // optional manual override
  hasBirthTime?: boolean; // explicit flag — false means time was unknown (houses/Asc not meaningful)
}

export interface Planet {
  key: string;
  label: string;
  sign: string;
  signLabel: string;
  house: number;
  houseLabel: string;
  isRetrograde: boolean;
  eclipticDegrees: number;
}

export interface HouseData {
  number: number;
  label: string;
  sign: string;
  signLabel: string;
  planets: Planet[];
  nodes: Planet[];
}

export interface ComputedChart {
  birthData: BirthData;
  houses: HouseData[];
  ascendant: { sign: string; signLabel: string; degrees: number };
  midheaven: { sign: string; signLabel: string; degrees: number };
  planets: Planet[];
  nodes: Planet[];
  elements: { fire: number; earth: number; air: number; water: number };
  computedAt: number;
  hasBirthTime: boolean; // false → houses/Asc are not meaningful; suppress in UI
}

const SIGN_ELEMENTS: Record<string, "fire" | "earth" | "air" | "water"> = {
  aries: "fire",
  leo: "fire",
  sagittarius: "fire",
  taurus: "earth",
  virgo: "earth",
  capricorn: "earth",
  gemini: "air",
  libra: "air",
  aquarius: "air",
  cancer: "water",
  scorpio: "water",
  pisces: "water",
};

const HOUSE_ORDINALS: Record<number, string> = {
  1: "First",
  2: "Second",
  3: "Third",
  4: "Fourth",
  5: "Fifth",
  6: "Sixth",
  7: "Seventh",
  8: "Eighth",
  9: "Ninth",
  10: "Tenth",
  11: "Eleventh",
  12: "Twelfth",
};

function ordinalToNumber(label: string): number {
  const map: Record<string, number> = {
    First: 1,
    Second: 2,
    Third: 3,
    Fourth: 4,
    Fifth: 5,
    Sixth: 6,
    Seventh: 7,
    Eighth: 8,
    Ninth: 9,
    Tenth: 10,
    Eleventh: 11,
    Twelfth: 12,
  };
  return map[label] ?? 0;
}

export function computeChart(birth: BirthData): ComputedChart {
  // Dynamic require — this runs client-side only
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Origin, Horoscope } = require("circular-natal-horoscope-js");

  const origin = new Origin({
    year: birth.year,
    month: birth.month - 1, // lib is 0-indexed
    date: birth.day,
    hour: birth.hour,
    minute: birth.minute,
    latitude: birth.latitude,
    longitude: birth.longitude,
  });

  const horoscope = new Horoscope({
    origin,
    houseSystem: "placidus",
    zodiac: "tropical",
    aspectTypes: ["major"],
    language: "en",
  });

  // Build planet list (Sun–Pluto + Chiron, skip Sirius)
  const PLANET_KEYS = [
    "sun",
    "moon",
    "mercury",
    "venus",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
    "chiron",
  ];

  const planets: Planet[] = [];
  for (const key of PLANET_KEYS) {
    const body = horoscope.CelestialBodies[key];
    if (!body) continue;
    const houseNum = ordinalToNumber(body.House?.label ?? "");
    planets.push({
      key,
      label: body.label,
      sign: body.Sign.key,
      signLabel: body.Sign.label,
      house: houseNum,
      houseLabel: HOUSE_ORDINALS[houseNum] ?? body.House?.label ?? "",
      isRetrograde: body.isRetrograde === true,
      eclipticDegrees: body.ChartPosition.Ecliptic.DecimalDegrees,
    });
  }

  // Nodes
  const NODE_KEYS = ["northnode", "southnode"];
  const nodes: Planet[] = [];
  for (const key of NODE_KEYS) {
    const pt = horoscope.CelestialPoints[key];
    if (!pt) continue;
    const houseNum = ordinalToNumber(pt.House?.label ?? "");
    nodes.push({
      key,
      label: key === "northnode" ? "North Node" : "South Node",
      sign: pt.Sign.key,
      signLabel: pt.Sign.label,
      house: houseNum,
      houseLabel: HOUSE_ORDINALS[houseNum] ?? pt.House?.label ?? "",
      isRetrograde: false,
      eclipticDegrees: pt.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0,
    });
  }

  // Houses
  const houses: HouseData[] = horoscope.Houses.map(
    (h: { id: number; label: string; Sign: { key: string; label: string } }) => {
      const num = h.id;
      const housePlanets = planets.filter((p) => p.house === num);
      const houseNodes = nodes.filter((n) => n.house === num);
      return {
        number: num,
        label: h.label,
        sign: h.Sign.key,
        signLabel: h.Sign.label,
        planets: housePlanets,
        nodes: houseNodes,
      };
    }
  );

  // Ascendant / Midheaven
  const asc = horoscope.Ascendant;
  const mc = horoscope.Midheaven;

  // Element counts (planets only, not nodes)
  const elements = { fire: 0, earth: 0, air: 0, water: 0 };
  for (const p of planets) {
    const el = SIGN_ELEMENTS[p.sign];
    if (el) elements[el]++;
  }

  return {
    birthData: birth,
    houses,
    ascendant: {
      sign: asc.Sign.key,
      signLabel: asc.Sign.label,
      degrees: asc.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0,
    },
    midheaven: {
      sign: mc.Sign.key,
      signLabel: mc.Sign.label,
      degrees: mc.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0,
    },
    planets,
    nodes,
    elements,
    computedAt: Date.now(),
    hasBirthTime: birth.hasBirthTime !== false, // default true if not explicitly set
  };
}

export function computeTransits(): Planet[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Origin, Horoscope } = require("circular-natal-horoscope-js");

  const now = new Date();
  const origin = new Origin({
    year: now.getUTCFullYear(),
    month: now.getUTCMonth(),
    date: now.getUTCDate(),
    hour: now.getUTCHours(),
    minute: now.getUTCMinutes(),
    latitude: 0, // geocentric (doesn't matter for sign positions)
    longitude: 0,
  });

  const horoscope = new Horoscope({
    origin,
    houseSystem: "whole-sign",
    zodiac: "tropical",
    aspectTypes: [],
    language: "en",
  });

  const PLANET_KEYS = [
    "sun",
    "moon",
    "mercury",
    "venus",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
  ];

  return PLANET_KEYS.map((key) => {
    const body = horoscope.CelestialBodies[key];
    return {
      key,
      label: body?.label ?? key,
      sign: body?.Sign?.key ?? "",
      signLabel: body?.Sign?.label ?? "",
      house: 0,
      houseLabel: "",
      isRetrograde: body?.isRetrograde === true,
      eclipticDegrees: body?.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0,
    };
  });
}

export const EINSTEIN_BIRTH: BirthData = {
  name: "Albert Einstein",
  year: 1879,
  month: 3, // March (1-indexed)
  day: 14,
  hour: 11,
  minute: 30,
  latitude: 48.4011,
  longitude: 9.9876,
  placeName: "Ulm, Germany",
  hasBirthTime: true,
};
