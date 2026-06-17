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
    <div className="block w-full min-w-0">
      <button
        type="button"
        data-testid={testId ?? undefined}
        aria-expanded={expanded}
        aria-label={`${label}${isRetrograde ? " (retrograde)" : ""} — tap to ${expanded ? "hide" : "show"} reading`}
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-900/40 border border-indigo-700/40 hover:bg-indigo-800/50 transition-colors text-sm font-medium text-indigo-200 cursor-pointer w-full text-left"
      >
        <span className="flex-1 min-w-0 truncate">
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
      {expanded && (
        <div
          role="status"
          data-testid={testId ? `${testId}-reading` : undefined}
          style={{ width: "100%", minWidth: 0, boxSizing: "border-box" }}
          className="mt-1 px-3 py-2 text-sm text-slate-300 bg-slate-800/60 rounded-md border border-slate-700/40 leading-relaxed break-words whitespace-normal overflow-hidden"
        >
          {reading}
        </div>
      )}
    </div>
  );
}
