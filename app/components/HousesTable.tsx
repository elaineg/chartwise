"use client";

import type { ComputedChart } from "../../lib/chartCompute";
import {
  getPlanetInHouseBlurb,
  getSignInHouseBlurb,
  getHouseTheme,
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

interface HousesTableProps {
  chart: ComputedChart;
  preExpandedPlanet?: string; // e.g. "sun" — pre-expands the first chip matching this planet
}

export default function HousesTable({
  chart,
  preExpandedPlanet,
}: HousesTableProps) {
  const { houses, ascendant, midheaven } = chart;
  let preExpandedUsed = false;

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
              return (
                <tr
                  key={house.number}
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
                    <PlacementChip
                      label={house.signLabel}
                      reading={getSignInHouseBlurb(house.sign, house.number)}
                      testId={`sign-chip-h${house.number}`}
                    />
                  </td>
                  <td className="py-3 px-3 min-w-0">
                    <div className="flex flex-col gap-1">
                      {house.planets.length === 0 ? (
                        <span className="text-slate-600 text-xs italic">—</span>
                      ) : (
                        house.planets.map((planet) => {
                          const shouldPreExpand =
                            !preExpandedUsed &&
                            preExpandedPlanet === planet.key;
                          if (shouldPreExpand) preExpandedUsed = true;
                          return (
                            <PlacementChip
                              key={planet.key}
                              label={planet.label}
                              reading={getPlanetInHouseBlurb(
                                planet.key,
                                house.number
                              )}
                              isRetrograde={planet.isRetrograde}
                              preExpanded={shouldPreExpand}
                              testId={`planet-chip-${planet.key}`}
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
                        house.nodes.map((node) => (
                          <PlacementChip
                            key={node.key}
                            label={node.label}
                            reading={
                              node.key === "northnode"
                                ? "Your North Node marks your growth direction — the unfamiliar territory that challenges and ultimately fulfills you in this life."
                                : "Your South Node marks your comfort zone — innate strengths that come easily but can keep you from evolving."
                            }
                            testId={`node-chip-${node.key}`}
                          />
                        ))
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden flex flex-col gap-3">
        {houses.map((house) => {
          const isAscHouse = house.number === 1;
          const isMCHouse = house.number === 10;
          const hasContent =
            house.planets.length > 0 || house.nodes.length > 0;
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
                      !preExpandedUsed && preExpandedPlanet === planet.key;
                    if (shouldPreExpand) preExpandedUsed = true;
                    return (
                      <PlacementChip
                        key={planet.key}
                        label={planet.label}
                        reading={getPlanetInHouseBlurb(
                          planet.key,
                          house.number
                        )}
                        isRetrograde={planet.isRetrograde}
                        preExpanded={shouldPreExpand}
                        testId={`planet-chip-${planet.key}`}
                      />
                    );
                  })}
                  {house.nodes.map((node) => (
                    <PlacementChip
                      key={node.key}
                      label={node.label}
                      reading={
                        node.key === "northnode"
                          ? "Your North Node marks your growth direction — the unfamiliar territory that challenges and ultimately fulfills you in this life."
                          : "Your South Node marks your comfort zone — innate strengths that come easily but can keep you from evolving."
                      }
                      testId={`node-chip-${node.key}`}
                    />
                  ))}
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
          Ascendant: {ascendant.signLabel}
        </span>
        <span className="px-3 py-1.5 bg-violet-900/30 border border-violet-700/30 rounded-full text-violet-300">
          Midheaven: {midheaven.signLabel}
        </span>
      </div>
    </div>
  );
}
