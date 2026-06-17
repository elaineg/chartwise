/**
 * Dynamic per-chart Open Graph image for /chart/[token].
 * Uses Next.js built-in ImageResponse (next/og / satori).
 *
 * Satori constraints (strictly enforced):
 *  - All elements with >1 child must have display: "flex" (default is "block" which satori rejects)
 *  - No z-index, no position: "relative" / "absolute" stacking
 *  - No unsupported CSS props; inline styles only
 *  - Avoid special Unicode in text nodes (font-loading issues)
 */
import { ImageResponse } from "next/og";
import { getChartByToken } from "../../../lib/db";
import type { BirthData } from "../../../lib/chartCompute";

export const runtime = "nodejs";
export const alt = "Birth chart card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SIGN_ELEMENTS: Record<string, string> = {
  aries: "fire", leo: "fire", sagittarius: "fire",
  taurus: "earth", virgo: "earth", capricorn: "earth",
  gemini: "air", libra: "air", aquarius: "air",
  cancer: "water", scorpio: "water", pisces: "water",
};

const ELEMENT_COLORS: Record<string, string> = {
  fire: "#f97316",
  earth: "#84cc16",
  air: "#38bdf8",
  water: "#818cf8",
};

// Planet icons as simple text to avoid font-loading failures
const PLANET_LABELS: Record<string, string> = {
  sun: "Sun", moon: "Moon", rising: "Rising",
};

function cap(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function deriveBigThree(birth: BirthData) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Origin, Horoscope } = require("circular-natal-horoscope-js");
    const origin = new Origin({
      year: birth.year,
      month: birth.month - 1,
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
      aspectTypes: [],
      language: "en",
    });
    const ORDINALS: Record<string, number> = {
      First: 1, Second: 2, Third: 3, Fourth: 4, Fifth: 5, Sixth: 6,
      Seventh: 7, Eighth: 8, Ninth: 9, Tenth: 10, Eleventh: 11, Twelfth: 12,
    };
    const sunBody = horoscope.CelestialBodies["sun"];
    const moonBody = horoscope.CelestialBodies["moon"];
    const asc = horoscope.Ascendant;
    const sunEcl: number = sunBody?.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0;
    const moonEcl: number = moonBody?.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0;
    const ascEcl: number = asc?.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0;
    return {
      sunSign: (sunBody?.Sign?.key ?? "aries") as string,
      sunSignLabel: (sunBody?.Sign?.label ?? "Aries") as string,
      sunHouse: ORDINALS[sunBody?.House?.label ?? ""] ?? 0,
      sunDeg: Math.floor(sunEcl % 30),
      moonSign: (moonBody?.Sign?.key ?? "cancer") as string,
      moonSignLabel: (moonBody?.Sign?.label ?? "Cancer") as string,
      moonDeg: Math.floor(moonEcl % 30),
      risingSign: (asc?.Sign?.key ?? "aries") as string,
      risingSignLabel: (asc?.Sign?.label ?? "Aries") as string,
      risingDeg: Math.floor(ascEcl % 30),
      hasBirthTime: birth.hasBirthTime !== false,
    };
  } catch {
    return {
      sunSign: "aries", sunSignLabel: "Aries", sunHouse: 0, sunDeg: 0,
      moonSign: "cancer", moonSignLabel: "Cancer", moonDeg: 0,
      risingSign: "aries", risingSignLabel: "Aries", risingDeg: 0,
      hasBirthTime: false,
    };
  }
}

interface Props {
  params: Promise<{ token: string }>;
}

export default async function OgImage({ params }: Props) {
  const { token } = await params;

  let birth: BirthData | null = null;
  try {
    birth = await getChartByToken(token);
  } catch {
    // DB unavailable — render generic fallback
  }

  const name = birth?.name ?? "Birth Chart";
  const dateStr = birth
    ? `${birth.year}-${String(birth.month).padStart(2, "0")}-${String(birth.day).padStart(2, "0")}`
    : "";
  const place = birth?.placeName ?? "";

  const big3 = birth
    ? deriveBigThree(birth)
    : { sunSignLabel: "?", sunHouse: 0, sunDeg: 0, moonSignLabel: "?", moonDeg: 0, risingSignLabel: "?", risingDeg: 0, hasBirthTime: false, sunSign: "aries", moonSign: "cancer", risingSign: "aries" };

  const sunEl = SIGN_ELEMENTS[big3.sunSign] ?? "fire";
  const moonEl = SIGN_ELEMENTS[big3.moonSign] ?? "water";
  const risingEl = SIGN_ELEMENTS[big3.risingSign] ?? "air";

  type Chip = { role: string; label: string; color: string };
  const chips: Chip[] = [
    { role: PLANET_LABELS.sun, label: `Sun ${big3.sunDeg}° ${cap(big3.sunSignLabel)}${big3.hasBirthTime && big3.sunHouse > 0 ? ` (H${big3.sunHouse})` : ""}`, color: ELEMENT_COLORS[sunEl] ?? "#f97316" },
    { role: PLANET_LABELS.moon, label: `Moon ${big3.moonDeg}° ${cap(big3.moonSignLabel)}${!big3.hasBirthTime ? " (approx)" : ""}`, color: ELEMENT_COLORS[moonEl] ?? "#818cf8" },
    ...(big3.hasBirthTime ? [{ role: PLANET_LABELS.rising, label: `${cap(big3.risingSignLabel)} ${big3.risingDeg}° Rising`, color: ELEMENT_COLORS[risingEl] ?? "#38bdf8" }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0d1427 0%, #111827 50%, #0f0d2e 100%)",
          fontFamily: "system-ui, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Top brand bar */}
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "36px 64px 0" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#818cf8", letterSpacing: "0.04em" }}>
            chartwise
          </div>
        </div>

        {/* Main content area */}
        <div style={{ display: "flex", flexDirection: "column", padding: "24px 64px 0", flex: 1 }}>
          {/* Name */}
          <div style={{ display: "flex" }}>
            <div
              style={{
                fontSize: name.length > 20 ? 48 : 58,
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: 10,
              }}
            >
              {name}
            </div>
          </div>

          {/* Date + place */}
          {(dateStr || place) && (
            <div style={{ display: "flex", marginBottom: 28 }}>
              <div style={{ fontSize: 18, color: "#94a3b8" }}>
                {[dateStr, place].filter(Boolean).join("  ·  ")}
              </div>
            </div>
          )}

          {/* Divider */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: "rgba(99,102,241,0.25)",
              marginBottom: 32,
              display: "flex",
            }}
          />

          {/* Big-three chips */}
          <div style={{ display: "flex", gap: 20, marginBottom: 36 }}>
            {chips.map((chip) => (
              <div
                key={chip.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 26px",
                  background: "rgba(30,27,75,0.85)",
                  border: `1.5px solid ${chip.color}66`,
                  borderRadius: 16,
                  minWidth: 240,
                }}
              >
                {/* Role badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px 10px",
                    background: `${chip.color}22`,
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: chip.color,
                    flexShrink: 0,
                  }}
                >
                  {chip.role}
                </div>
                {/* Label */}
                <div style={{ fontSize: 20, fontWeight: 700, color: "#e2e8f0" }}>
                  {chip.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div style={{ display: "flex" }}>
            <div style={{ fontSize: 16, color: "#64748b", fontStyle: "italic" }}>
              Free natal chart interpretation — no account needed
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 64px",
            height: 60,
            background: "rgba(0,0,0,0.40)",
            borderTop: "1px solid rgba(99,102,241,0.25)",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: "#818cf8" }}>
            free · instant · no signup
          </div>
          <div style={{ fontSize: 14, color: "#64748b" }}>
            chartwise.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
