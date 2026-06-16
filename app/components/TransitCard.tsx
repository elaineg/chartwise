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

function getTransitNote(
  planet: Planet,
  natalChart: ComputedChart
): string | null {
  if (planet.isRetrograde) {
    const retroBlurbs: Record<string, string> = {
      mercury: "Mercury retrograde — review plans, re-read contracts, and give communication extra care.",
      venus: "Venus retrograde — re-examine what (and who) you value; not ideal for new financial commitments.",
      mars: "Mars retrograde — channel drive into review and refinement rather than bold new action.",
      jupiter: "Jupiter retrograde — inner growth and reflection yield more than outward expansion right now.",
      saturn: "Saturn retrograde — reassess your structures and responsibilities; what needs rebuilding?",
      _generic: `${planet.label} is retrograde — its energy turns inward; review and reflect before acting on its themes.`,
    };
    return retroBlurbs[planet.key] ?? retroBlurbs["_generic"];
  }

  // Check if transit planet is in same sign as a natal planet
  const natalMatch = natalChart.planets.find(
    (np) => np.sign === planet.sign && np.key !== planet.key
  );
  if (natalMatch) {
    return `${planet.label} in ${planet.signLabel} is visiting your natal ${natalMatch.label}'s sign — themes of ${planet.label.toLowerCase()} and ${natalMatch.label.toLowerCase()} blend right now.`;
  }

  // Check if current planet is in the same sign as the natal planet of the same type
  const natalSelf = natalChart.planets.find((np) => np.key === planet.key);
  if (natalSelf && natalSelf.sign === planet.sign) {
    return `${planet.label} has returned to its natal sign of ${planet.signLabel} in your chart — a natural renewal of ${planet.label.toLowerCase()}'s themes.`;
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
    .map((p) => ({ planet: p, note: getTransitNote(p, natalChart) }))
    .filter((x) => x.note !== null);

  return (
    <div
      data-testid="transit-card"
      className="mt-8 p-5 bg-slate-800/30 border border-indigo-900/40 rounded-2xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">✦</span>
        <div>
          <h2 className="text-base font-semibold text-white">Today's Sky</h2>
          {todayStr && (
            <p className="text-xs text-slate-500">{todayStr}</p>
          )}
        </div>
      </div>

      {transits.length === 0 ? (
        <p className="text-slate-400 text-sm animate-pulse">Computing today's positions…</p>
      ) : (
        <>
          {/* Planet grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-5">
            {transits.map((planet) => (
              <div
                key={planet.key}
                className={`px-2.5 py-2 rounded-lg border text-sm ${
                  planet.isRetrograde
                    ? "bg-amber-900/20 border-amber-700/30"
                    : "bg-slate-800/50 border-slate-700/30"
                }`}
              >
                <div className="flex items-center gap-1 font-medium text-slate-200">
                  <span className="text-base leading-none">
                    {PLANET_SYMBOLS[planet.key] ?? "●"}
                  </span>
                  <span className="text-xs">{planet.label}</span>
                  {planet.isRetrograde && (
                    <span className="text-amber-400 text-xs font-bold ml-auto">℞</span>
                  )}
                </div>
                <div className="text-xs text-indigo-300 mt-0.5">{planet.signLabel}</div>
              </div>
            ))}
          </div>

          {/* Retrograde summary */}
          {retrograde.length > 0 && (
            <div className="mb-4 p-3 bg-amber-900/10 border border-amber-700/20 rounded-lg">
              <p className="text-xs font-semibold text-amber-400 mb-1">
                {retrograde.length === 1 ? "1 planet retrograde" : `${retrograde.length} planets retrograde`}
              </p>
              <p className="text-xs text-slate-400">
                {retrograde.map((p) => p.label).join(", ")}
                {" "}— retrograde planets turn their energy inward.
              </p>
            </div>
          )}

          {/* Notes keyed to this chart */}
          {notes.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                For your chart
              </p>
              {notes.map(({ planet, note }) => (
                <div
                  key={planet.key}
                  className="flex gap-2 text-sm text-slate-300 leading-relaxed"
                >
                  <span className="text-indigo-400 shrink-0 mt-0.5">▸</span>
                  <p>{note}</p>
                </div>
              ))}
            </div>
          )}

          {notes.length === 0 && retrograde.length === 0 && (
            <p className="text-sm text-slate-400">
              The current sky is relatively calm — no major retrograde patterns or
              strong overlaps with your natal placements today.
            </p>
          )}
        </>
      )}
    </div>
  );
}
