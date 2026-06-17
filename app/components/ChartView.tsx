"use client";

import { useState, useEffect, useRef } from "react";
import type { ComputedChart } from "../../lib/chartCompute";
import { formatDegMinInSign } from "../../lib/chartCompute";
import HousesTable from "./HousesTable";
import ElementBar from "./ElementBar";
import TransitCard from "./TransitCard";
import PlainEnglishReading from "./PlainEnglishReading";

interface ChartViewProps {
  chart: ComputedChart;
  isSharedView?: boolean;
  onShare?: () => void;
  shareState?: "idle" | "loading" | "copied" | "error";
  shareUrl?: string;
}

export default function ChartView({
  chart,
  isSharedView = false,
  onShare,
  shareState = "idle",
  shareUrl,
}: ChartViewProps) {
  const [showShareCopied, setShowShareCopied] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the chart when it first renders (P2)
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [chart.computedAt]);

  async function copyShareUrl() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowShareCopied(true);
      setTimeout(() => setShowShareCopied(false), 2000);
    } catch {
      // fallback: select the input
    }
  }

  const { birthData, elements, hasBirthTime } = chart;

  return (
    <div ref={topRef}>
      {/* Profile summary */}
      <div className="ds-card" style={{ marginBottom: "var(--sp-6)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--sp-2)", marginBottom: "var(--sp-2)" }}>
          <h2 style={{ fontSize: "var(--fs-h2)", fontWeight: "var(--fw-medium)", color: "var(--ink)", margin: 0 }}>{birthData.name}</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-4)", fontSize: "var(--fs-sm)", color: "var(--grey-600)" }}>
          <span>
            {birthData.year}-{String(birthData.month).padStart(2, "0")}-
            {String(birthData.day).padStart(2, "0")}
          </span>
          {(birthData.hour != null && birthData.minute != null && hasBirthTime) && (
            <span>
              {String(birthData.hour).padStart(2, "0")}:
              {String(birthData.minute).padStart(2, "0")}
            </span>
          )}
          {birthData.placeName && <span>{birthData.placeName}</span>}
        </div>
        <div data-testid="big-three-chips" style={{ marginTop: "var(--sp-3)", display: "flex", flexWrap: "wrap", gap: "var(--sp-2)" }}>
          {hasBirthTime ? (
            <span className="ds-tag" style={{ fontSize: "var(--fs-sm)", textTransform: "none", letterSpacing: "normal" }}>
              ↑ {formatDegMinInSign(chart.ascendant.degrees)} {chart.ascendant.signLabel} rising
            </span>
          ) : (
            <span className="ds-tag" style={{ fontSize: "var(--fs-sm)", color: "var(--grey-400)", textDecoration: "line-through", textTransform: "none", letterSpacing: "normal" }}>
              Rising unknown
            </span>
          )}
          {chart.planets.find((p) => p.key === "sun") && (() => {
            const sun = chart.planets.find((p) => p.key === "sun")!;
            const degMin = formatDegMinInSign(sun.eclipticDegrees);
            return (
              <span className="ds-tag" style={{ fontSize: "var(--fs-sm)", textTransform: "none", letterSpacing: "normal" }}>
                ☉ Sun {degMin} {sun.signLabel}{hasBirthTime && sun.house > 0 && ` · House ${sun.house}`}
              </span>
            );
          })()}
          {chart.planets.find((p) => p.key === "moon") && (() => {
            const moon = chart.planets.find((p) => p.key === "moon")!;
            const degMin = formatDegMinInSign(moon.eclipticDegrees);
            return (
              <span className="ds-tag" style={{ fontSize: "var(--fs-sm)", textTransform: "none", letterSpacing: "normal" }}>
                ☽ Moon {degMin} {moon.signLabel}
                {!hasBirthTime && (
                  <span style={{ color: "var(--grey-400)", marginLeft: "var(--sp-1)", fontSize: "var(--fs-micro)" }}>(approx.)</span>
                )}
              </span>
            );
          })()}
        </div>
        {!hasBirthTime && (
          <p role="status" style={{ marginTop: "var(--sp-2)", fontSize: "var(--fs-sm)", color: "var(--grey-600)" }}>
            Houses and your rising sign need an exact birth time — add one to unlock them.
          </p>
        )}
      </div>

      {/* Element bar — summary block, above detail on all viewports */}
      <ElementBar
        fire={elements.fire}
        earth={elements.earth}
        air={elements.air}
        water={elements.water}
        basisLabels={chart.elementBasisLabels}
      />

      {/* Today transit card — summary/daily hook, above detail on all viewports */}
      <TransitCard natalChart={chart} />

      {/* Privacy copy */}
      <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", marginBottom: "var(--sp-4)" }}>
        Your chart is computed on your device — nothing is sent anywhere.
        {!isSharedView && " Creating a share link sends this chart's birth info to our server so the link works."}
      </p>

      {/* Plain-English reading — always visible, no caret needed */}
      <PlainEnglishReading chart={chart} />

      {/* Houses table */}
      <HousesTable chart={chart} preExpandedPlanet="sun" hasBirthTime={hasBirthTime} />

      {/* Share section */}
      {!isSharedView && onShare && (
        <div className="ds-card" style={{ marginTop: "var(--sp-6)" }}>
          <h3 style={{ fontSize: "var(--fs-body)", fontWeight: "var(--fw-medium)", color: "var(--ink)", marginBottom: "var(--sp-2)" }}>Share this chart</h3>
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", marginBottom: "var(--sp-3)" }}>
            Creating a share link sends this chart&apos;s birth info to our server so anyone with
            the link can view the same chart.
          </p>
          {shareUrl ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }} className="sm:flex-row">
              <input
                readOnly
                value={shareUrl}
                className="ds-input"
                style={{ flex: 1, fontSize: "var(--fs-sm)", background: "var(--grey-50)", minWidth: 0 }}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                aria-label="Share link URL"
              />
              <button
                type="button"
                data-testid="copy-share-link"
                aria-label="Copy share link"
                onClick={copyShareUrl}
                className="ds-btn"
                style={{ flexShrink: 0 }}
              >
                {showShareCopied ? "Copied" : "Copy link"}
              </button>
            </div>
          ) : (
            <button
              type="button"
              data-testid="share-btn"
              onClick={onShare}
              disabled={shareState === "loading"}
              className="ds-btn ds-btn--secondary"
            >
              {shareState === "loading" ? "Creating link…" : "Create share link"}
            </button>
          )}
          {shareState === "error" && (
            <p role="alert" style={{ fontSize: "var(--fs-sm)", color: "var(--red)", marginTop: "var(--sp-2)" }}>
              Failed to create share link. Please try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
