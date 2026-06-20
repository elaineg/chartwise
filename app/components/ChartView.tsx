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
  onOpenSynastry?: () => void;
}

type CopyState = "idle" | "copied" | "blocked";

export default function ChartView({
  chart,
  isSharedView = false,
  onShare,
  shareState = "idle",
  shareUrl,
  onOpenSynastry,
}: ChartViewProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the chart when it first renders (P2)
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [chart.computedAt]);

  // Clear copy confirmation timer on unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  async function copyShareUrl() {
    if (!shareUrl) return;
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyState("copied");
      copyTimerRef.current = setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("blocked");
      copyTimerRef.current = setTimeout(() => setCopyState("idle"), 3000);
    }
  }

  const { birthData, elements, hasBirthTime } = chart;

  return (
    <div ref={topRef}>
      {/* ESTIMATED CHART banner — only when the chart was produced by the Big-3 solver.
          Keyed off chart.isEstimate (compute-time flag), NOT any UI toggle state. */}
      {chart.isEstimate && (() => {
        const sunPlanet = chart.planets.find((p) => p.key === "sun");
        const moonPlanet = chart.planets.find((p) => p.key === "moon");
        const sunLabel = sunPlanet?.signLabel ?? "";
        const moonLabel = moonPlanet?.signLabel ?? "";
        const risingLabel = chart.ascendant.signLabel;
        return (
          <div
            data-testid="estimate-badge"
            role="status"
            style={{
              border: "1px solid var(--grey-200)",
              padding: "var(--sp-3) var(--sp-4)",
              marginBottom: "var(--sp-4)",
              background: "var(--paper)",
            }}
          >
            <span className="ds-label" style={{ display: "block", marginBottom: "var(--sp-2)" }}>
              Estimated Chart
            </span>
            {/* Big-three confirmation strip — reinforces payoff and confirms estimate honored input */}
            <p
              data-testid="estimate-big3-strip"
              style={{
                fontSize: "var(--fs-micro)",
                fontWeight: "var(--fw-medium)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink)",
                margin: "0 0 var(--sp-2) 0",
                borderTop: "1px solid var(--grey-100)",
                paddingTop: "var(--sp-2)",
              }}
            >
              Your big three — Sun {sunLabel} · Moon {moonLabel} · Rising {risingLabel}
            </p>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", margin: "0 0 var(--sp-2) 0", lineHeight: "1.5" }}>
              Date, time, and place were inferred from your big three — this is an approximation.
              Enter your full birth date, time, and place for the precise chart.
            </p>
            <p
              data-testid="estimate-methodology"
              style={{
                fontSize: "var(--fs-micro)",
                color: "var(--grey-500)",
                margin: 0,
                lineHeight: "1.5",
                borderTop: "1px solid var(--grey-100)",
                paddingTop: "var(--sp-2)",
                letterSpacing: "0.02em",
              }}
            >
              How this works: we searched {birthData.year} for a date and time at a reference location whose chart matches your Sun, Moon, and Rising — then computed the rest from that anchor. Your real birth date, time, and place will differ.
            </p>
          </div>
        );
      })()}

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

      {/* Compare two people — immediately after the chart summary, high on the page */}
      {!isSharedView && onOpenSynastry && (
        <div
          data-testid="synastry-entry"
          style={{ marginTop: "var(--sp-4)" }}
        >
          <button
            type="button"
            data-testid="open-synastry-btn"
            onClick={onOpenSynastry}
            style={{
              padding: "var(--sp-5)",
              border: "1px solid var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--sp-4)",
              flexWrap: "wrap",
              width: "100%",
              background: "var(--paper)",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div>
              <p className="ds-eyebrow" style={{ marginBottom: "var(--sp-1)" }}>Compatibility</p>
              <p style={{ fontSize: "var(--fs-body)", fontWeight: "var(--fw-medium)", color: "var(--ink)", margin: "0 0 var(--sp-1) 0" }}>
                Compare two people
              </p>
              <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", margin: 0 }}>
                Plain-English compatibility between two charts — free, no signup
              </p>
            </div>
            <span
              aria-hidden="true"
              style={{ fontSize: "var(--fs-body)", color: "var(--ink)", fontWeight: "var(--fw-medium)", flexShrink: 0 }}
            >
              →
            </span>
          </button>
        </div>
      )}

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
                Copy link
              </button>
            </div>
          ) : null}
          {/* Visible copy confirmation cue — separate from the button label so it survives re-renders */}
          {shareUrl && copyState === "copied" && (
            <p
              data-testid="share-copied-cue"
              role="status"
              style={{
                fontSize: "var(--fs-sm)",
                color: "var(--ink)",
                marginTop: "var(--sp-2)",
                fontWeight: "var(--fw-medium)",
              }}
            >
              ✓ Link copied to clipboard
            </p>
          )}
          {shareUrl && copyState === "blocked" && (
            <p
              data-testid="share-copied-cue"
              role="alert"
              style={{
                fontSize: "var(--fs-sm)",
                color: "var(--red)",
                marginTop: "var(--sp-2)",
              }}
            >
              Copy blocked — select the link above and press ⌘C / Ctrl+C
            </p>
          )}
          {!shareUrl && (
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
