"use client";

import { useEffect, useState } from "react";
import type { Planet, ComputedChart } from "../../lib/chartCompute";

interface TransitCardProps {
  natalChart: ComputedChart;
}

const PLANET_SYMBOLS: Record<string, string> = {
  sun: "☉",
  moon: "☽",
  mercury: "☿",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄",
  uranus: "♅",
  neptune: "♆",
  pluto: "♇",
};

// Varied sentence templates for same-sign natal matches (index by planet key to avoid repeats)
const SAME_SIGN_TEMPLATES: Record<string, (transitLabel: string, sign: string, natalLabel: string) => string> = {
  sun:     (t, s, n) => `${t} moves through ${s}, joining your natal ${n} — a moment when your core drives and ${n}'s themes amplify each other.`,
  moon:    (t, s, n) => `${t} passes through ${s} alongside your natal ${n}. Emotional instincts and ${n}'s energy are running on the same frequency right now.`,
  mercury: (t, s, n) => `${t} transits ${s}, the sign of your natal ${n}. Conversations, ideas, and ${n}'s domain are especially intertwined this week.`,
  venus:   (t, s, n) => `${t} glides through ${s}, meeting your natal ${n}. What you find beautiful and what ${n} represents share the same sky overhead.`,
  mars:    (t, s, n) => `${t} charges through ${s} where your natal ${n} lives. Drive and ${n}'s themes are funneling into the same area of your chart.`,
  jupiter: (t, s, n) => `${t} expands through ${s}, the home of your natal ${n}. Growth and ${n}'s wisdom are pointing in the same direction.`,
  saturn:  (t, s, n) => `${t} works through ${s}, alongside your natal ${n}. Discipline and ${n}'s lessons are converging — a productive time for serious effort.`,
  uranus:  (t, s, n) => `${t} rattles through ${s} where your natal ${n} sits. Expect the unexpected to intersect with ${n}'s territory.`,
  neptune: (t, s, n) => `${t} drifts through ${s}, the sign of your natal ${n}. Imagination and ${n}'s themes blur together in interesting ways.`,
  pluto:   (t, s, n) => `${t} moves through ${s}, the same ground as your natal ${n}. Deep transformation and ${n}'s domain are merging.`,
  _default:(t, s, n) => `${t} in ${s} echoes your natal ${n}. Their energies overlap, spotlighting that part of your chart right now.`,
};

function getTransitNote(
  planet: Planet,
  natalChart: ComputedChart,
  noteIndex: number
): string | null {
  if (planet.isRetrograde) {
    const retroBlurbs: Record<string, string> = {
      mercury: "Mercury retrograde — review plans, re-read contracts, and give communication extra care.",
      venus: "Venus retrograde — re-examine what (and who) you value; not ideal for new financial commitments.",
      mars: "Mars retrograde — channel drive into review and refinement rather than bold new action.",
      jupiter: "Jupiter retrograde — inner growth and reflection yield more than outward expansion right now.",
      saturn: "Saturn retrograde — reassess your structures and responsibilities; what needs rebuilding?",
      _generic: `${planet.label} turns retrograde — its energy pulls inward; reflect and review before acting on its themes.`,
    };
    return retroBlurbs[planet.key] ?? retroBlurbs["_generic"];
  }

  // Check if transit planet is in same sign as a natal planet
  const natalMatch = natalChart.planets.find(
    (np) => np.sign === planet.sign && np.key !== planet.key
  );
  if (natalMatch) {
    // Use the template keyed to the transit planet, or cycle through default variants
    const templateFn = SAME_SIGN_TEMPLATES[planet.key] ?? SAME_SIGN_TEMPLATES["_default"];
    return templateFn(planet.label, planet.signLabel, natalMatch.label);
  }

  // Transit planet has returned to its natal sign (solar/lunar/planetary return)
  const natalSelf = natalChart.planets.find((np) => np.key === planet.key);
  if (natalSelf && natalSelf.sign === planet.sign) {
    const returnTemplates = [
      `${planet.label} has come back to ${planet.signLabel}, where it sat at your birth — a natural reset point for everything ${planet.label} governs.`,
      `${planet.label} is back in ${planet.signLabel}, its natal position in your chart. This cycle invites you to revisit and renew ${planet.label.toLowerCase()}'s themes with fresh eyes.`,
      `${planet.label} completes a cycle in ${planet.signLabel} — the same sign it occupied when you were born. Reflect on how far you've come with ${planet.label.toLowerCase()}'s energy.`,
    ];
    return returnTemplates[noteIndex % returnTemplates.length];
  }

  return null;
}

export default function TransitCard({ natalChart }: TransitCardProps) {
  const [transits, setTransits] = useState<Planet[]>([]);
  const [todayStr, setTodayStr] = useState("");

  useEffect(() => {
    // Compute transits client-side only (avoids SSR mismatch)
    async function loadTransits() {
      const { computeTransits } = await import("../../lib/chartCompute");
      const t = computeTransits();
      setTransits(t);

      const now = new Date();
      setTodayStr(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
    loadTransits();
  }, []);

  const retrograde = transits.filter((p) => p.isRetrograde);
  const notes = transits
    .map((p, i) => ({ planet: p, note: getTransitNote(p, natalChart, i) }))
    .filter((x) => x.note !== null);

  return (
    <div
      data-testid="transit-card"
      className="ds-panel"
      style={{ marginTop: "var(--sp-8)" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "var(--sp-4)" }}>
        <h2 style={{ fontSize: "var(--fs-h3)", fontWeight: "var(--fw-medium)", color: "var(--ink)", margin: 0 }}>
          Today&apos;s Sky
        </h2>
        {todayStr && (
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", margin: "var(--sp-1) 0 0" }}>
            {todayStr}
          </p>
        )}
      </div>

      {transits.length === 0 ? (
        <p style={{ color: "var(--grey-600)", fontSize: "var(--fs-body)" }}>
          Computing today&apos;s positions…
        </p>
      ) : (
        <>
          {/* Planet grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--sp-2)", marginBottom: "var(--sp-6)" }}
            className="sm:grid-cols-3 md:grid-cols-5"
          >
            {transits.map((planet) => (
              <div
                key={planet.key}
                style={{
                  padding: "var(--sp-2) var(--sp-3)",
                  border: planet.isRetrograde ? "1px solid var(--ink)" : "1px solid var(--grey-200)",
                  background: "var(--paper)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-1)", color: "var(--ink)", fontWeight: "var(--fw-medium)" }}>
                  <span style={{ fontSize: "1rem", lineHeight: 1 }}>
                    {PLANET_SYMBOLS[planet.key] ?? "●"}
                  </span>
                  <span style={{ fontSize: "var(--fs-sm)" }}>{planet.label}</span>
                  {planet.isRetrograde && (
                    <span style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-medium)", marginLeft: "auto" }} title="Retrograde">℞</span>
                  )}
                </div>
                <div style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", marginTop: "2px" }}>{planet.signLabel}</div>
              </div>
            ))}
          </div>

          {/* Retrograde summary */}
          {retrograde.length > 0 && (
            <div style={{ marginBottom: "var(--sp-4)", padding: "var(--sp-3)", background: "var(--grey-50)", border: "1px solid var(--grey-200)" }}>
              <p className="ds-label" style={{ marginBottom: "var(--sp-1)", display: "block" }}>
                {retrograde.length === 1 ? "1 planet retrograde" : `${retrograde.length} planets retrograde`}
              </p>
              <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", margin: 0 }}>
                {retrograde.map((p) => p.label).join(", ")}
                {" "}— retrograde planets turn their energy inward.
              </p>
            </div>
          )}

          {/* Notes keyed to this chart */}
          {notes.length > 0 && (
            <div>
              <p className="ds-label ds-label--secondary" style={{ display: "block", marginBottom: "var(--sp-3)" }}>
                For your chart
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
                {notes.map(({ planet, note }) => (
                  <div
                    key={planet.key}
                    style={{ display: "flex", gap: "var(--sp-2)", fontSize: "var(--fs-body)", color: "var(--ink)", lineHeight: "var(--lh-body)" }}
                  >
                    <span style={{ color: "var(--grey-600)", flexShrink: 0, marginTop: "2px" }}>▸</span>
                    <p style={{ margin: 0 }}>{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notes.length === 0 && retrograde.length === 0 && (
            <p style={{ fontSize: "var(--fs-body)", color: "var(--grey-600)" }}>
              The current sky is relatively calm — no major retrograde patterns or
              strong overlaps with your natal placements today.
            </p>
          )}
        </>
      )}
    </div>
  );
}
