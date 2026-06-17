"use client";

import { useState } from "react";
import type { ComputedChart } from "../../lib/chartCompute";
import { formatDegMinInSign } from "../../lib/chartCompute";
import {
  getPlanetInHouseBlurb,
  getSignInHouseBlurb,
} from "../../lib/interpretations";
import PlacementChip from "./PlacementChip";

const HOUSE_THEMES: Record<number, string> = {
  1: "Self & identity",
  2: "Money & values",
  3: "Communication",
  4: "Home & roots",
  5: "Creativity & play",
  6: "Work & health",
  7: "Partnerships",
  8: "Transformation",
  9: "Beliefs & travel",
  10: "Career & reputation",
  11: "Community & vision",
  12: "Inner life",
};

// Number of columns in the desktop table
const COL_COUNT = 4;

/**
 * Desktop-only chip that renders its expanded reading in a separate full-width colSpan row
 * instead of inline below the chip button. This avoids the narrow-cell sliver problem.
 */
interface DesktopChipProps {
  label: string;
  reading: string;
  testId?: string;
  isRetrograde?: boolean;
  preExpanded?: boolean;
  /** Called with (testId, reading, isNowExpanded) so the parent row can inject the colSpan row */
  onToggle: (id: string, reading: string, expanded: boolean) => void;
  chipId: string;
}

function DesktopChip({
  label,
  reading,
  testId,
  isRetrograde = false,
  preExpanded = false,
  onToggle,
  chipId,
}: DesktopChipProps) {
  const [expanded, setExpanded] = useState(preExpanded);

  function toggle() {
    const next = !expanded;
    setExpanded(next);
    onToggle(chipId, reading, next);
  }

  return (
    <button
      type="button"
      data-testid={testId ?? undefined}
      aria-expanded={expanded}
      aria-label={`${label}${isRetrograde ? " (retrograde)" : ""} — tap to ${expanded ? "hide" : "show"} reading`}
      onClick={toggle}
      className="flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-900/40 border border-indigo-700/40 hover:bg-indigo-800/50 transition-colors text-sm font-medium text-indigo-200 cursor-pointer w-full text-left"
    >
      <span className="flex-1 min-w-0 whitespace-normal break-words leading-snug">
        {label}
        {isRetrograde && (
          <span className="ml-1 text-amber-400 text-xs font-bold" title="Retrograde">
            ℞
          </span>
        )}
      </span>
      <span
        className={`text-xs text-indigo-400 shrink-0 transition-transform duration-150 ${
          expanded ? "rotate-180" : ""
        }`}
        aria-hidden="true"
      >
        ▾
      </span>
    </button>
  );
}

interface HousesTableProps {
  chart: ComputedChart;
  preExpandedPlanet?: string;
  hasBirthTime?: boolean;
}

export default function HousesTable({
  chart,
  preExpandedPlanet,
  hasBirthTime = true,
}: HousesTableProps) {
  const { houses, ascendant, midheaven } = chart;

  /**
   * Desktop reading state: tracks which chip (by unique id) is expanded and its reading text.
   * Only one reading is shown at a time (the last toggled-on chip).
   * Key: chipId (e.g. "planet-chip-sun" or "sign-chip-h1"), value: { reading, houseNumber }
   * so we can inject the colSpan row right after the correct house row.
   */
  const [desktopExpanded, setDesktopExpanded] = useState<{
    chipId: string;
    reading: string;
    testId: string;
    houseNumber: number;
  } | null>(() => {
    // Pre-expand the first matching planet chip
    if (!preExpandedPlanet) return null;
    for (const house of chart.houses) {
      for (const planet of house.planets) {
        if (planet.key === preExpandedPlanet) {
          return {
            chipId: `planet-chip-${planet.key}`,
            reading: getPlanetInHouseBlurb(planet.key, house.number),
            testId: `planet-chip-${planet.key}`,
            houseNumber: house.number,
          };
        }
      }
    }
    return null;
  });

  function handleDesktopToggle(
    chipId: string,
    reading: string,
    testId: string,
    houseNumber: number,
    isNowExpanded: boolean
  ) {
    if (isNowExpanded) {
      setDesktopExpanded({ chipId, reading, testId, houseNumber });
    } else {
      // Collapse if this chip was the one expanded
      setDesktopExpanded((prev) =>
        prev?.chipId === chipId ? null : prev
      );
    }
  }

  let preExpandedUsed = false;

  // When time is unknown, show a suppressed "needs birth time" state
  if (!hasBirthTime) {
    return (
      <div data-testid="houses-table">
        <div
          data-testid="houses-time-unknown-notice"
          className="rounded-xl border border-slate-700/40 bg-slate-800/20 p-5 text-center"
        >
          <p className="text-slate-400 text-sm font-medium mb-1">
            House placements and Ascendant are not available
          </p>
          <p className="text-slate-500 text-xs">
            Houses and your rising sign require an exact birth time. Add one above to unlock all 12 houses.
          </p>
        </div>

        {/* Show planet signs (sign-level reading) without house assignments */}
        <div className="mt-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Planet Signs</p>
          <div className="flex flex-wrap gap-2">
            {chart.planets.map((planet) => {
              const degMin = formatDegMinInSign(planet.eclipticDegrees);
              return (
                <span
                  key={planet.key}
                  className="px-2.5 py-1 text-xs bg-slate-800/50 border border-slate-700/30 rounded-full text-slate-300"
                >
                  {planet.label}: <span className="text-white">{degMin} {planet.signLabel}</span>
                  {planet.key === "moon" && (
                    <span className="text-slate-500 ml-1">(approx.)</span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="houses-table">
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-sm">
          <colgroup>
            <col className="w-[18%]" />
            <col className="w-[20%]" />
            <col className="w-[38%]" />
            <col className="w-[24%]" />
          </colgroup>
          <thead>
            <tr className="text-left border-b border-slate-700">
              <th className="py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                House
              </th>
              <th className="py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Sign
              </th>
              <th className="py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Planets
              </th>
              <th className="py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Nodes
              </th>
            </tr>
          </thead>
          <tbody>
            {houses.map((house) => {
              const isAscHouse = house.number === 1;
              const isMCHouse = house.number === 10;

              // Build chips for this house row
              const signChipId = `sign-chip-h${house.number}`;
              const planetChips = house.planets.map((planet) => {
                const shouldPreExpand =
                  !preExpandedUsed && preExpandedPlanet === planet.key;
                if (shouldPreExpand) preExpandedUsed = true;
                return { planet, shouldPreExpand };
              });

              const rows: React.ReactNode[] = [];

              // Main house row
              rows.push(
                <tr
                  key={`house-${house.number}`}
                  data-testid={`house-row-${house.number}`}
                  className="border-b border-slate-800/60 hover:bg-slate-800/20 transition-colors align-top"
                >
                  <td className="py-3 px-3 min-w-0">
                    <div className="font-semibold text-white text-sm">
                      {house.number}
                    </div>
                    <div className="text-xs text-slate-400 leading-snug mt-0.5">
                      {HOUSE_THEMES[house.number] ?? ""}
                    </div>
                    {isAscHouse && (
                      <div className="text-xs text-indigo-400 mt-0.5 font-medium">
                        ASC: {ascendant.signLabel}
                      </div>
                    )}
                    {isMCHouse && (
                      <div className="text-xs text-indigo-400 mt-0.5 font-medium">
                        MC: {midheaven.signLabel}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3 min-w-0">
                    <DesktopChip
                      label={house.signLabel}
                      reading={getSignInHouseBlurb(house.sign, house.number)}
                      testId={signChipId}
                      chipId={signChipId}
                      onToggle={(id, reading, expanded) =>
                        handleDesktopToggle(id, reading, id, house.number, expanded)
                      }
                    />
                  </td>
                  <td className="py-3 px-3 min-w-0">
                    <div className="flex flex-col gap-1">
                      {house.planets.length === 0 ? (
                        <span className="text-slate-600 text-xs italic">—</span>
                      ) : (
                        planetChips.map(({ planet, shouldPreExpand }) => {
                          const chipId = `planet-chip-${planet.key}`;
                          const degMin = formatDegMinInSign(planet.eclipticDegrees);
                          return (
                            <DesktopChip
                              key={planet.key}
                              label={`${planet.label} ${degMin} ${planet.signLabel}`}
                              reading={getPlanetInHouseBlurb(planet.key, house.number)}
                              isRetrograde={planet.isRetrograde}
                              preExpanded={shouldPreExpand}
                              testId={chipId}
                              chipId={chipId}
                              onToggle={(id, reading, expanded) =>
                                handleDesktopToggle(id, reading, id, house.number, expanded)
                              }
                            />
                          );
                        })
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 min-w-0">
                    <div className="flex flex-col gap-1">
                      {house.nodes.length === 0 ? (
                        <span className="text-slate-600 text-xs italic">—</span>
                      ) : (
                        house.nodes.map((node) => {
                          const chipId = `node-chip-${node.key}`;
                          const degMin = formatDegMinInSign(node.eclipticDegrees);
                          const nodeReading =
                            node.key === "northnode"
                              ? "Your North Node marks your growth direction — the unfamiliar territory that challenges and ultimately fulfills you in this life."
                              : node.key === "southnode"
                              ? "Your South Node marks your comfort zone — innate strengths that come easily but can keep you from evolving."
                              : "Black Moon Lilith reveals the raw, instinctual side of you that resists conformity — your untamed desires and where you refuse to be tamed.";
                          return (
                            <DesktopChip
                              key={node.key}
                              label={`${node.label} ${degMin} ${node.signLabel}`}
                              reading={nodeReading}
                              testId={`node-chip-${node.key}`}
                              chipId={chipId}
                              onToggle={(id, reading, expanded) =>
                                handleDesktopToggle(id, reading, `node-chip-${node.key}`, house.number, expanded)
                              }
                            />
                          );
                        })
                      )}
                    </div>
                  </td>
                </tr>
              );

              // If this house has an expanded chip, inject the full-width colSpan reading row
              if (desktopExpanded && desktopExpanded.houseNumber === house.number) {
                rows.push(
                  <tr key={`reading-${house.number}`}>
                    <td
                      colSpan={COL_COUNT}
                      className="px-3 pb-3 pt-0"
                    >
                      <div
                        role="status"
                        data-testid={`${desktopExpanded.testId}-reading`}
                        className="w-full px-4 py-3 text-sm text-slate-300 bg-slate-800/60 rounded-md border border-slate-700/40 leading-relaxed break-words whitespace-normal"
                      >
                        {desktopExpanded.reading}
                      </div>
                    </td>
                  </tr>
                );
              }

              return rows;
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards — unchanged, use PlacementChip directly */}
      <div className="sm:hidden flex flex-col gap-3">
        {houses.map((house) => {
          const isAscHouse = house.number === 1;
          const isMCHouse = house.number === 10;
          const hasContent =
            house.planets.length > 0 || house.nodes.length > 0;
          let mobilePreExpandedUsed = false;
          return (
            <div
              key={house.number}
              data-testid={`house-row-${house.number}`}
              className="bg-slate-800/40 rounded-xl border border-slate-700/40 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-lg font-bold text-white mr-2">
                    House {house.number}
                  </span>
                  <span className="text-sm text-slate-400">
                    {HOUSE_THEMES[house.number]}
                  </span>
                </div>
                <div className="flex gap-1">
                  {isAscHouse && (
                    <span className="text-xs bg-indigo-700/40 text-indigo-300 px-2 py-0.5 rounded-full">
                      ASC
                    </span>
                  )}
                  {isMCHouse && (
                    <span className="text-xs bg-violet-700/40 text-violet-300 px-2 py-0.5 rounded-full">
                      MC
                    </span>
                  )}
                </div>
              </div>

              {/* Sign */}
              <div className="mb-2">
                <span className="text-xs text-slate-500 uppercase tracking-wide mr-1">
                  Sign{" "}
                </span>
                <PlacementChip
                  label={house.signLabel}
                  reading={getSignInHouseBlurb(house.sign, house.number)}
                  testId={`sign-chip-h${house.number}`}
                />
              </div>

              {/* Planets */}
              {hasContent && (
                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="text-xs text-slate-500 uppercase tracking-wide">
                    Placements
                  </span>
                  {house.planets.map((planet) => {
                    const shouldPreExpand =
                      !mobilePreExpandedUsed && preExpandedPlanet === planet.key;
                    if (shouldPreExpand) mobilePreExpandedUsed = true;
                    const degMin = formatDegMinInSign(planet.eclipticDegrees);
                    return (
                      <PlacementChip
                        key={planet.key}
                        label={`${planet.label} ${degMin} ${planet.signLabel}`}
                        reading={getPlanetInHouseBlurb(planet.key, house.number)}
                        isRetrograde={planet.isRetrograde}
                        preExpanded={shouldPreExpand}
                        testId={`planet-chip-${planet.key}`}
                      />
                    );
                  })}
                  {house.nodes.map((node) => {
                    const degMin = formatDegMinInSign(node.eclipticDegrees);
                    const nodeReading =
                      node.key === "northnode"
                        ? "Your North Node marks your growth direction — the unfamiliar territory that challenges and ultimately fulfills you in this life."
                        : node.key === "southnode"
                        ? "Your South Node marks your comfort zone — innate strengths that come easily but can keep you from evolving."
                        : "Black Moon Lilith reveals the raw, instinctual side of you that resists conformity — your untamed desires and where you refuse to be tamed.";
                    return (
                      <PlacementChip
                        key={node.key}
                        label={`${node.label} ${degMin} ${node.signLabel}`}
                        reading={nodeReading}
                        testId={`node-chip-${node.key}`}
                      />
                    );
                  })}
                </div>
              )}

              {!hasContent && (
                <p className="text-slate-600 text-xs italic mt-1">
                  No planets in this house
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Ascendant / MC summary outside table */}
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <span className="px-3 py-1.5 bg-indigo-900/30 border border-indigo-700/30 rounded-full text-indigo-300">
          Ascendant: {formatDegMinInSign(ascendant.degrees)} {ascendant.signLabel}
        </span>
        <span className="px-3 py-1.5 bg-violet-900/30 border border-violet-700/30 rounded-full text-violet-300">
          Midheaven: {formatDegMinInSign(midheaven.degrees)} {midheaven.signLabel}
        </span>
      </div>
    </div>
  );
}
