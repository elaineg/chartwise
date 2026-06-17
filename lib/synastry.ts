/**
 * Synastry (relationship compatibility) compute module.
 * Given two ComputedChart objects, produces:
 *  (a) Inter-aspects: major aspects between bodies across the two charts
 *  (b) House overlay: which of Chart A's houses each of Chart B's bodies lands in
 *  (c) Big-three comparison data
 *
 * All computation is deterministic and client-side only.
 *
 * ORB VALUES (documented):
 *  - Sun / Moon (luminaries): 8°
 *  - Mercury / Venus / Mars: 6°
 *  - Jupiter / Saturn: 5°
 *  - Uranus / Neptune / Pluto / Chiron / Nodes / Lilith: 3°
 *
 * ASPECT TYPES:
 *  Conjunction 0° (context — neutral-to-harmonious)
 *  Sextile     60° (harmony)
 *  Square      90° (tension)
 *  Trine       120° (harmony)
 *  Opposition  180° (tension)
 */

import type { ComputedChart, Planet } from "./chartCompute";

export type AspectType = "conjunction" | "sextile" | "square" | "trine" | "opposition";
export type AspectNature = "harmony" | "tension" | "context";

export interface InterAspect {
  bodyA: string;        // key e.g. "sun"
  bodyALabel: string;   // e.g. "Sun"
  bodyB: string;
  bodyBLabel: string;
  aspectType: AspectType;
  aspectGlyph: string;  // ☌ ⚹ □ △ ☍
  orb: number;          // absolute orb in degrees (0–max)
  nature: AspectNature;
  reading: string;
  significanceScore: number; // higher = more relationship-significant; used for display ranking
}

export interface HouseOverlayEntry {
  body: string;         // key (from person B)
  bodyLabel: string;
  sign: string;
  signLabel: string;
  houseOfA: number;     // which house number in chart A this body falls into
  nature: AspectNature; // house overlay nature (house theme–based)
  reading: string;
}

export interface SynastryResult {
  aspects: InterAspect[];       // sorted: harmony first, then tension, then context
  overlayBinA: HouseOverlayEntry[]; // B's planets in A's houses
  overlayAinB: HouseOverlayEntry[]; // A's planets in B's houses
  summaryText: string;              // 1-2 sentence honest harmony/tension framing
  harmonyCount: number;
  tensionCount: number;
  contextCount: number;
}

// ─── Orb table ────────────────────────────────────────────────────────────────

const ORB_BY_BODY: Record<string, number> = {
  sun: 8,
  moon: 8,
  mercury: 6,
  venus: 6,
  mars: 6,
  jupiter: 5,
  saturn: 5,
  uranus: 3,
  neptune: 3,
  pluto: 3,
  chiron: 3,
  northnode: 3,
  southnode: 3,
  lilith: 3,
};

function getOrb(keyA: string, keyB: string): number {
  const a = ORB_BY_BODY[keyA] ?? 3;
  const b = ORB_BY_BODY[keyB] ?? 3;
  return Math.max(a, b);
}

// ─── Aspect geometry ─────────────────────────────────────────────────────────

const ASPECT_ANGLES: Array<{ type: AspectType; angle: number; glyph: string; nature: AspectNature }> = [
  { type: "conjunction",  angle: 0,   glyph: "☌", nature: "context"  },
  { type: "sextile",      angle: 60,  glyph: "⚹", nature: "harmony"  },
  { type: "square",       angle: 90,  glyph: "□", nature: "tension"  },
  { type: "trine",        angle: 120, glyph: "△", nature: "harmony"  },
  { type: "opposition",   angle: 180, glyph: "☍", nature: "tension"  },
];

/** Shortest arc between two ecliptic longitudes (0°–360°) → 0–180 */
function shortestArc(a: number, b: number): number {
  let diff = Math.abs(a - b) % 360;
  if (diff > 180) diff = 360 - diff;
  return diff;
}

function detectAspect(
  degA: number,
  degB: number,
  orbLimit: number
): { type: AspectType; glyph: string; orb: number; nature: AspectNature } | null {
  const arc = shortestArc(degA, degB);
  for (const asp of ASPECT_ANGLES) {
    const orb = Math.abs(arc - asp.angle);
    if (orb <= orbLimit) {
      return { type: asp.type, glyph: asp.glyph, orb, nature: asp.nature };
    }
  }
  return null;
}

// ─── Relationship significance weights ───────────────────────────────────────
// Higher = more meaningful for relationship readings.
// Used to rank inter-aspects: users care about Sun/Moon/Venus/Mars/ASC first.
// Chiron/Nodes/Lilith/outer planets are lowest.

const BODY_SIGNIFICANCE: Record<string, number> = {
  sun:       10,
  moon:      10,
  ascendant: 8,   // handled via house overlays but also via aspect if present
  venus:     8,
  mars:      7,
  mercury:   5,
  jupiter:   5,
  saturn:    5,
  uranus:    2,
  neptune:   2,
  pluto:     2,
  chiron:    1,
  northnode: 1,
  southnode: 1,
  lilith:    1,
};

function pairSignificance(keyA: string, keyB: string): number {
  const sA = BODY_SIGNIFICANCE[keyA] ?? 1;
  const sB = BODY_SIGNIFICANCE[keyB] ?? 1;
  // Geometric mean so luminaries together are highest, outer+node pairs lowest
  return Math.round(Math.sqrt(sA * sB) * 10);
}

// ─── Body lists for inter-aspect detection ────────────────────────────────────

const PLANET_PRIORITY = [
  "sun", "moon", "mercury", "venus", "mars",
  "jupiter", "saturn", "uranus", "neptune", "pluto",
  "chiron",
];

const NODE_KEYS = ["northnode", "southnode", "lilith"];

function getAllBodies(chart: ComputedChart): Planet[] {
  const bodies: Planet[] = [];
  // Main planets in priority order
  for (const key of PLANET_PRIORITY) {
    const p = chart.planets.find((x) => x.key === key);
    if (p) bodies.push(p);
  }
  // Nodes + Lilith
  for (const key of NODE_KEYS) {
    const n = chart.nodes.find((x) => x.key === key);
    if (n) bodies.push(n);
  }
  return bodies;
}

// ─── House overlay ────────────────────────────────────────────────────────────

/**
 * Determine which Placidus house number a given ecliptic degree falls into,
 * using the exact cusp degrees from ComputedChart.houseCusps.
 *
 * houseCusps[0] = House 1 cusp (Ascendant ecliptic degree)
 * houseCusps[11] = House 12 cusp
 * House N spans from cusps[N-1] to cusps[N % 12], wrapping through 0°/360°.
 */
function getPlacidusHouse(eclipticDeg: number, cusps: number[]): number {
  const n = cusps.length; // 12
  for (let i = 0; i < n; i++) {
    const cStart = cusps[i];
    const cEnd = cusps[(i + 1) % n];
    if (cStart <= cEnd) {
      // Normal span: no 360° wrap
      if (eclipticDeg >= cStart && eclipticDeg < cEnd) return i + 1;
    } else {
      // Span wraps through 0°/360°
      if (eclipticDeg >= cStart || eclipticDeg < cEnd) return i + 1;
    }
  }
  // Fallback: house 12
  return 12;
}

// ─── Reading lookup ───────────────────────────────────────────────────────────

import { getSynastryAspectReading, getHouseOverlayReading } from "./synastryInterpretations";

// ─── Main compute function ─────────────────────────────────────────────────────

export function computeSynastry(chartA: ComputedChart, chartB: ComputedChart): SynastryResult {
  const bodiesA = getAllBodies(chartA);
  const bodiesB = getAllBodies(chartB);

  // Inter-aspects — iterate A×B only (not B×A) to avoid bidirectional duplicates.
  // Each unordered body-pair aspect is listed exactly once.
  const aspects: InterAspect[] = [];

  for (const bodyA of bodiesA) {
    for (const bodyB of bodiesB) {
      const orb = getOrb(bodyA.key, bodyB.key);
      const asp = detectAspect(bodyA.eclipticDegrees, bodyB.eclipticDegrees, orb);
      if (!asp) continue;

      const reading = getSynastryAspectReading(bodyA.key, bodyB.key, asp.type, asp.nature, chartA.birthData.name, chartB.birthData.name);
      const sig = pairSignificance(bodyA.key, bodyB.key);
      aspects.push({
        bodyA: bodyA.key,
        bodyALabel: bodyA.label,
        bodyB: bodyB.key,
        bodyBLabel: bodyB.label,
        aspectType: asp.type,
        aspectGlyph: asp.glyph,
        orb: Math.round(asp.orb * 100) / 100,
        nature: asp.nature,
        reading,
        significanceScore: sig,
      });
    }
  }

  // Sort: by relationship significance descending, then orb ascending as tiebreak.
  // This ensures Sun/Moon/Venus/Mars chemistry leads; Chiron/Node pairs fall to the tail.
  aspects.sort((a, b) => {
    const sd = b.significanceScore - a.significanceScore;
    if (sd !== 0) return sd;
    return a.orb - b.orb;
  });

  // House overlay: B's bodies in A's houses (uses Placidus cusps from chart A)
  const overlayBinA: HouseOverlayEntry[] = [];
  if (chartA.hasBirthTime && chartA.houseCusps.length === 12) {
    for (const bodyB of bodiesB) {
      const houseNum = getPlacidusHouse(bodyB.eclipticDegrees, chartA.houseCusps);
      const nature: AspectNature = houseNum === 7 || houseNum === 5 ? "harmony" :
        houseNum === 8 || houseNum === 12 ? "tension" : "context";
      const reading = getHouseOverlayReading(bodyB.key, houseNum, "BinA");
      overlayBinA.push({
        body: bodyB.key,
        bodyLabel: bodyB.label,
        sign: bodyB.sign,
        signLabel: bodyB.signLabel,
        houseOfA: houseNum,
        nature,
        reading,
      });
    }
  }
  // Sort by house number
  overlayBinA.sort((a, b) => a.houseOfA - b.houseOfA);

  // A's bodies in B's houses (uses Placidus cusps from chart B)
  const overlayAinB: HouseOverlayEntry[] = [];
  if (chartB.hasBirthTime && chartB.houseCusps.length === 12) {
    for (const bodyA of bodiesA) {
      const houseNum = getPlacidusHouse(bodyA.eclipticDegrees, chartB.houseCusps);
      const nature: AspectNature = houseNum === 7 || houseNum === 5 ? "harmony" :
        houseNum === 8 || houseNum === 12 ? "tension" : "context";
      const reading = getHouseOverlayReading(bodyA.key, houseNum, "AinB");
      overlayAinB.push({
        body: bodyA.key,
        bodyLabel: bodyA.label,
        sign: bodyA.sign,
        signLabel: bodyA.signLabel,
        houseOfA: houseNum,
        nature,
        reading,
      });
    }
  }
  overlayAinB.sort((a, b) => a.houseOfA - b.houseOfA);

  // Counts
  const harmonyCount = aspects.filter((a) => a.nature === "harmony").length;
  const tensionCount = aspects.filter((a) => a.nature === "tension").length;
  const contextCount = aspects.filter((a) => a.nature === "context").length;

  // Summary text
  const nameA = chartA.birthData.name;
  const nameB = chartB.birthData.name;
  const total = harmonyCount + tensionCount + contextCount;

  let summaryText = "";
  if (total === 0) {
    summaryText = `${nameA} and ${nameB} share few major inter-aspects at standard orbs — the connection is subtle, operating more through house overlays and elemental resonance than direct aspect contact.`;
  } else if (harmonyCount > tensionCount * 1.5) {
    summaryText = `${nameA} and ${nameB} share ${harmonyCount} harmonious aspect${harmonyCount !== 1 ? "s" : ""} to ${tensionCount} tension${tensionCount !== 1 ? "s" : ""} — an overall easy-flowing dynamic where shared aims and natural resonance tend to outweigh friction.`;
  } else if (tensionCount > harmonyCount * 1.5) {
    summaryText = `${nameA} and ${nameB} show ${tensionCount} tension aspect${tensionCount !== 1 ? "s" : ""} against ${harmonyCount} harmonious — a charged, activating dynamic that can drive growth but calls for patience and conscious effort to navigate.`;
  } else {
    summaryText = `${nameA} and ${nameB} carry a mix of ${harmonyCount} harmoni${harmonyCount !== 1 ? "es" : "y"} and ${tensionCount} tension${tensionCount !== 1 ? "s" : ""} — a balanced dynamic where ease and challenge coexist, keeping the relationship alive and developing.`;
  }

  return {
    aspects,
    overlayBinA,
    overlayAinB,
    summaryText,
    harmonyCount,
    tensionCount,
    contextCount,
  };
}
