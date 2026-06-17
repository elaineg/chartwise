"use client";

import { useState } from "react";

interface PlacementChipProps {
  label: string;
  reading: string;
  isRetrograde?: boolean;
  preExpanded?: boolean;
  testId?: string;
}

export default function PlacementChip({
  label,
  reading,
  isRetrograde = false,
  preExpanded = false,
  testId,
}: PlacementChipProps) {
  const [expanded, setExpanded] = useState(preExpanded);

  return (
    <div style={{ display: "block", width: "100%", minWidth: 0 }}>
      <button
        type="button"
        data-testid={testId ?? undefined}
        aria-expanded={expanded}
        aria-label={`${label}${isRetrograde ? " (retrograde)" : ""} — tap to ${expanded ? "hide" : "show"} reading`}
        onClick={() => setExpanded((v) => !v)}
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
            <span style={{ marginLeft: "var(--sp-1)", fontWeight: "var(--fw-medium)", fontSize: "var(--fs-sm)" }} title="Retrograde">
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
      {expanded && (
        <div
          role="status"
          data-testid={testId ? `${testId}-reading` : undefined}
          style={{
            width: "100%",
            minWidth: 0,
            boxSizing: "border-box",
            marginTop: "var(--sp-1)",
            padding: "var(--sp-3)",
            fontSize: "var(--fs-body)",
            color: "var(--ink)",
            background: "var(--grey-50)",
            border: "1px solid var(--grey-200)",
            borderRadius: 0,
            lineHeight: "var(--lh-body)",
            wordBreak: "break-word",
            whiteSpace: "normal",
            overflow: "hidden",
          }}
        >
          {reading}
        </div>
      )}
    </div>
  );
}
