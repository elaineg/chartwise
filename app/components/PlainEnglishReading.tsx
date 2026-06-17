"use client";

import type { ComputedChart } from "../../lib/chartCompute";
import {
  getPlanetSignBlurb,
  getPlanetInHouseBlurb,
} from "../../lib/interpretations";

interface PlainEnglishReadingProps {
  chart: ComputedChart;
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Build a planet-sign blurb where the sign's quality is expressed THROUGH
 * the planet's specific domain — so two planets in the same sign are
 * genuinely different sentences, not just differently prefixed.
 *
 * Uses getPlanetSignBlurb which looks up the planet × sign combination
 * in the interpretations.planetSignBlurbs table (72 authored entries).
 * Falls back to the generic sign blurb if no entry exists.
 */
function buildPlanetBlurb(
  planetKey: string,
  sign: string,
  houseBlurb: string | null
): string {
  const body = getPlanetSignBlurb(planetKey, sign);

  // Ensure it ends with a period
  const headline = body.endsWith(".") || body.endsWith("!") || body.endsWith("?")
    ? body
    : body + ".";

  return houseBlurb ? `${headline} ${houseBlurb}` : headline;
}

export default function PlainEnglishReading({ chart }: PlainEnglishReadingProps) {
  const { planets, ascendant, hasBirthTime } = chart;

  const sun = planets.find((p) => p.key === "sun");
  const moon = planets.find((p) => p.key === "moon");
  const mercury = planets.find((p) => p.key === "mercury");
  const venus = planets.find((p) => p.key === "venus");
  const mars = planets.find((p) => p.key === "mars");

  type Reading = {
    icon: string;
    title: string;
    blurb: string;
    subtitle: string;
  };

  const readings: Reading[] = [];

  // Sun — always present
  if (sun) {
    const houseBlurb =
      hasBirthTime && sun.house > 0
        ? getPlanetInHouseBlurb("sun", sun.house)
        : null;
    readings.push({
      icon: "☉",
      title: `${cap(sun.signLabel)} Sun${hasBirthTime && sun.house > 0 ? ` · House ${sun.house}` : ""}`,
      subtitle: "Core identity",
      blurb: buildPlanetBlurb("sun", sun.sign, houseBlurb),
    });
  }

  // Moon — always present (approx. when no birth time)
  if (moon) {
    const houseBlurb =
      hasBirthTime && moon.house > 0
        ? getPlanetInHouseBlurb("moon", moon.house)
        : null;
    readings.push({
      icon: "☽",
      title: `${cap(moon.signLabel)} Moon${hasBirthTime && moon.house > 0 ? ` · House ${moon.house}` : ""}`,
      subtitle: hasBirthTime ? "Emotional world" : "Emotional world (approximate)",
      blurb: buildPlanetBlurb("moon", moon.sign, houseBlurb),
    });
  }

  // Ascendant — only when birth time is known
  if (hasBirthTime) {
    readings.push({
      icon: "↑",
      title: `${cap(ascendant.signLabel)} Rising`,
      subtitle: "How others see you",
      blurb: buildPlanetBlurb("rising", ascendant.sign, null),
    });
  }

  // Mercury — communication style
  if (mercury) {
    const houseBlurb =
      hasBirthTime && mercury.house > 0
        ? getPlanetInHouseBlurb("mercury", mercury.house)
        : null;
    readings.push({
      icon: "☿",
      title: `${cap(mercury.signLabel)} Mercury${hasBirthTime && mercury.house > 0 ? ` · House ${mercury.house}` : ""}`,
      subtitle: "Mind & communication",
      blurb: buildPlanetBlurb("mercury", mercury.sign, houseBlurb),
    });
  }

  // Venus — love & values
  if (venus) {
    const houseBlurb =
      hasBirthTime && venus.house > 0
        ? getPlanetInHouseBlurb("venus", venus.house)
        : null;
    readings.push({
      icon: "♀",
      title: `${cap(venus.signLabel)} Venus${hasBirthTime && venus.house > 0 ? ` · House ${venus.house}` : ""}`,
      subtitle: "Love & values",
      blurb: buildPlanetBlurb("venus", venus.sign, houseBlurb),
    });
  }

  // Mars — drive
  if (mars) {
    const houseBlurb =
      hasBirthTime && mars.house > 0
        ? getPlanetInHouseBlurb("mars", mars.house)
        : null;
    readings.push({
      icon: "♂",
      title: `${cap(mars.signLabel)} Mars${hasBirthTime && mars.house > 0 ? ` · House ${mars.house}` : ""}`,
      subtitle: "Drive & desire",
      blurb: buildPlanetBlurb("mars", mars.sign, houseBlurb),
    });
  }

  if (readings.length === 0) return null;

  return (
    <div
      data-testid="plain-english-reading"
      className="ds-panel"
      style={{ marginBottom: "var(--sp-6)" }}
    >
      <h2 className="ds-eyebrow" style={{ marginBottom: "var(--sp-4)" }}>
        Your chart, in plain English
      </h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {readings.map((r, idx) => (
          <div
            key={r.title}
            style={{
              display: "flex",
              gap: "var(--sp-3)",
              padding: idx < readings.length - 1 ? `0 0 var(--sp-4) 0` : 0,
              borderBottom: idx < readings.length - 1 ? "1px solid var(--grey-200)" : "none",
              marginBottom: idx < readings.length - 1 ? "var(--sp-4)" : 0,
            }}
          >
            {/* Square glyph swatch */}
            <div style={{
              flexShrink: 0,
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--grey-200)",
              fontSize: "1rem",
              color: "var(--ink)",
            }}>
              {r.icon}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "var(--sp-2)", marginBottom: "var(--sp-1)" }}>
                <span style={{ fontSize: "var(--fs-body)", fontWeight: "var(--fw-medium)", color: "var(--ink)" }}>{r.title}</span>
                <span className="ds-label ds-label--secondary">{r.subtitle}</span>
              </div>
              <p style={{ fontSize: "var(--fs-body)", color: "var(--grey-800)", lineHeight: "var(--lh-body)", margin: 0 }}>{r.blurb}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
