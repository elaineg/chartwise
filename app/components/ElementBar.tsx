"use client";

interface ElementBarProps {
  fire: number;
  earth: number;
  air: number;
  water: number;
  /** Names of the bodies included in this tally, e.g. ["Sun","Moon","Mercury",...] */
  basisLabels?: string[];
}

const ELEMENT_KEYS = ["fire", "earth", "air", "water"] as const;
type ElementKey = (typeof ELEMENT_KEYS)[number];

const ELEMENT_LABELS: Record<ElementKey, string> = {
  fire: "Fire",
  earth: "Earth",
  air: "Air",
  water: "Water",
};

// Grey-value ramp by rank: dominant = near-ink, least = light grey
// Rank 0 (dominant) → near-ink, rank 3 (least) → grey-400
const RANK_FILLS = ["#101010", "#3A3A3A", "#767676", "#B4B4B4"];
// Rank 0 font-weight is medium-bold, rest are regular
const RANK_WEIGHTS = ["600", "500", "400", "400"];

export default function ElementBar({ fire, earth, air, water, basisLabels }: ElementBarProps) {
  const counts: Record<ElementKey, number> = { fire, earth, air, water };
  const total = fire + earth + air + water;

  // Sort dominant-first (descending count). Use stable sort: equal counts keep Fire/Earth/Air/Water order.
  const sorted = (["fire", "earth", "air", "water"] as ElementKey[])
    .map((key) => ({ key, count: counts[key] }))
    .sort((a, b) => b.count - a.count);

  return (
    <div data-testid="element-bar" className="ds-panel" style={{ marginTop: "var(--sp-6)" }}>
      <p className="ds-eyebrow" style={{ marginBottom: "var(--sp-4)" }}>Element Distribution</p>

      {/* 4-row grid — dominant-first, differentiated by bar LENGTH + grey-value ramp */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
        {sorted.map(({ key, count }, rank) => {
          const pct = total > 0 ? (count / total) * 100 : 25;
          const fillColor = RANK_FILLS[rank];
          const fontWeight = RANK_WEIGHTS[rank];
          const label = ELEMENT_LABELS[key];
          return (
            <div
              key={key}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 2.5rem 1fr",
                alignItems: "center",
                gap: "var(--sp-3)",
              }}
            >
              {/* Element label — uppercase micro-label */}
              <span className="ds-label" style={{ color: fillColor }}>
                {label}
              </span>
              {/* Count — size signals dominance */}
              <span
                style={{
                  fontSize: rank === 0 ? "var(--fs-h2)" : "var(--fs-h3)",
                  fontWeight,
                  color: fillColor,
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                }}
              >
                {count}
              </span>
              {/* Proportion bar — full-width grey track, ink fill whose LENGTH is the primary comparator */}
              <div
                style={{
                  height: rank === 0 ? "8px" : "5px",
                  background: "var(--grey-100)",
                  borderRadius: 0,
                  overflow: "hidden",
                  alignSelf: "center",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: fillColor,
                    transition: "width var(--motion)",
                    borderRadius: 0,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {basisLabels && basisLabels.length > 0 ? (
        <p
          style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", marginTop: "var(--sp-3)", marginBottom: 0 }}
          data-testid="element-basis-label"
        >
          Based on {total} placements: {basisLabels.join(", ")}
        </p>
      ) : (
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", marginTop: "var(--sp-3)", marginBottom: 0 }}>
          Based on {total} planetary placements
        </p>
      )}
    </div>
  );
}
