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
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--sp-1)",
        padding: "var(--sp-1) var(--sp-2)",
        border: "1px solid var(--grey-200)",
        borderRadius: 0,
        background: "transparent",
        color: "var(--ink)",
        fontSize: "var(--fs-sm)",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        transition: "border-color var(--motion-fast), background-color var(--motion-fast)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--grey-50)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--ink)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--grey-200)";
      }}
    >
      <span style={{ flex: 1, minWidth: 0, whiteSpace: "normal", wordBreak: "break-word", lineHeight: 1.35 }}>
        {label}
        {isRetrograde && (
          <span style={{ marginLeft: "var(--sp-1)", fontWeight: "var(--fw-medium)" }} title="Retrograde">
            ℞
          </span>
        )}
      </span>
      <span
        style={{
          fontSize: "var(--fs-micro)",
          color: "var(--grey-600)",
          flexShrink: 0,
          transition: "transform 150ms ease",
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          display: "inline-block",
        }}
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
          style={{
            border: "1px solid var(--grey-200)",
            padding: "var(--sp-6)",
            textAlign: "center",
          }}
        >
          <p style={{ color: "var(--grey-600)", fontSize: "var(--fs-body)", fontWeight: "var(--fw-medium)", marginBottom: "var(--sp-2)" }}>
            House placements and Ascendant are not available
          </p>
          <p style={{ color: "var(--grey-400)", fontSize: "var(--fs-sm)" }}>
            Houses and your rising sign require an exact birth time. Add one above to unlock all 12 houses.
          </p>
        </div>

        {/* Show planet signs (sign-level reading) without house assignments */}
        <div style={{ marginTop: "var(--sp-4)" }}>
          <p className="ds-eyebrow" style={{ marginBottom: "var(--sp-2)" }}>Planet Signs</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)" }}>
            {chart.planets.map((planet) => {
              const degMin = formatDegMinInSign(planet.eclipticDegrees);
              return (
                <span
                  key={planet.key}
                  className="ds-tag"
                  style={{ fontSize: "var(--fs-sm)", textTransform: "none", letterSpacing: "normal" }}
                >
                  {planet.label}: <strong style={{ color: "var(--ink)" }}>{degMin} {planet.signLabel}</strong>
                  {planet.key === "moon" && (
                    <span style={{ color: "var(--grey-400)", marginLeft: "var(--sp-1)" }}>(approx.)</span>
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
        <table className="ds-table table-fixed" style={{ width: "100%" }}>
          <colgroup>
            <col style={{ width: "18%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "38%" }} />
            <col style={{ width: "24%" }} />
          </colgroup>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>House</th>
              <th style={{ textAlign: "left" }}>Sign</th>
              <th style={{ textAlign: "left" }}>Planets</th>
              <th style={{ textAlign: "left" }}>Nodes</th>
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
                  style={{ verticalAlign: "top" }}
                >
                  <td style={{ paddingTop: "var(--sp-3)", paddingBottom: "var(--sp-3)" }}>
                    <div style={{ fontWeight: "var(--fw-medium)", color: "var(--ink)", fontSize: "var(--fs-sm)" }}>
                      {house.number}
                    </div>
                    <div style={{ fontSize: "var(--fs-micro)", color: "var(--grey-600)", marginTop: "2px", lineHeight: 1.3 }}>
                      {HOUSE_THEMES[house.number] ?? ""}
                    </div>
                    {isAscHouse && (
                      <div className="ds-label" style={{ marginTop: "2px", fontWeight: "var(--fw-medium)" }}>
                        ASC: {ascendant.signLabel}
                      </div>
                    )}
                    {isMCHouse && (
                      <div className="ds-label" style={{ marginTop: "2px", fontWeight: "var(--fw-medium)" }}>
                        MC: {midheaven.signLabel}
                      </div>
                    )}
                  </td>
                  <td style={{ paddingTop: "var(--sp-3)", paddingBottom: "var(--sp-3)" }}>
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
                  <td style={{ paddingTop: "var(--sp-3)", paddingBottom: "var(--sp-3)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-1)" }}>
                      {house.planets.length === 0 ? (
                        <span style={{ color: "var(--grey-400)", fontSize: "var(--fs-sm)", fontStyle: "italic" }}>—</span>
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
                  <td style={{ paddingTop: "var(--sp-3)", paddingBottom: "var(--sp-3)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-1)" }}>
                      {house.nodes.length === 0 ? (
                        <span style={{ color: "var(--grey-400)", fontSize: "var(--fs-sm)", fontStyle: "italic" }}>—</span>
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
                      style={{ paddingTop: 0, paddingBottom: "var(--sp-3)", paddingLeft: "var(--sp-4)", paddingRight: "var(--sp-4)" }}
                    >
                      <div
                        role="status"
                        data-testid={`${desktopExpanded.testId}-reading`}
                        style={{
                          width: "100%",
                          padding: "var(--sp-3) var(--sp-4)",
                          fontSize: "var(--fs-body)",
                          color: "var(--ink)",
                          background: "var(--grey-50)",
                          border: "1px solid var(--grey-200)",
                          borderRadius: 0,
                          lineHeight: "var(--lh-body)",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
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

      {/* Mobile cards — unchanged structure, use PlacementChip directly */}
      <div className="flex flex-col sm:hidden" style={{ gap: "var(--sp-3)" }}>
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
              style={{
                border: "1px solid var(--grey-200)",
                background: "var(--paper)",
                padding: "var(--sp-4)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--sp-3)" }}>
                <div>
                  <span style={{ fontSize: "var(--fs-h3)", fontWeight: "var(--fw-medium)", color: "var(--ink)", marginRight: "var(--sp-2)" }}>
                    House {house.number}
                  </span>
                  <span style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)" }}>
                    {HOUSE_THEMES[house.number]}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "var(--sp-1)" }}>
                  {isAscHouse && (
                    <span className="ds-label" style={{ fontWeight: "var(--fw-medium)" }}>
                      ASC
                    </span>
                  )}
                  {isMCHouse && (
                    <span className="ds-label" style={{ fontWeight: "var(--fw-medium)" }}>
                      MC
                    </span>
                  )}
                </div>
              </div>

              {/* Sign */}
              <div style={{ marginBottom: "var(--sp-2)" }}>
                <span className="ds-label ds-label--secondary" style={{ display: "block", marginBottom: "var(--sp-1)" }}>Sign</span>
                <PlacementChip
                  label={house.signLabel}
                  reading={getSignInHouseBlurb(house.sign, house.number)}
                  testId={`sign-chip-h${house.number}`}
                />
              </div>

              {/* Planets */}
              {hasContent && (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-1)", marginTop: "var(--sp-2)" }}>
                  <span className="ds-label ds-label--secondary" style={{ display: "block", marginBottom: "var(--sp-1)" }}>Placements</span>
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
                <p style={{ color: "var(--grey-400)", fontSize: "var(--fs-sm)", fontStyle: "italic", marginTop: "var(--sp-1)" }}>
                  No planets in this house
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Ascendant / MC summary outside table */}
      <div style={{ marginTop: "var(--sp-4)", display: "flex", flexWrap: "wrap", gap: "var(--sp-3)" }}>
        <span className="ds-tag" style={{ fontSize: "var(--fs-sm)", textTransform: "none", letterSpacing: "normal" }}>
          <span className="ds-label" style={{ marginRight: "var(--sp-1)" }}>Ascendant:</span>
          {formatDegMinInSign(ascendant.degrees)} {ascendant.signLabel}
        </span>
        <span className="ds-tag" style={{ fontSize: "var(--fs-sm)", textTransform: "none", letterSpacing: "normal" }}>
          <span className="ds-label" style={{ marginRight: "var(--sp-1)" }}>Midheaven:</span>
          {formatDegMinInSign(midheaven.degrees)} {midheaven.signLabel}
        </span>
      </div>
    </div>
  );
}
