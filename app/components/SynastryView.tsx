"use client";

import { useEffect, useState } from "react";
import type { BirthData, ComputedChart } from "../../lib/chartCompute";
import { EINSTEIN_BIRTH, SYNASTRY_PARTNER_BIRTH } from "../../lib/chartCompute";
import type { SynastryResult } from "../../lib/synastry";
import ElementBar from "./ElementBar";

interface SynastryViewProps {
  people: BirthData[];
  /** When close is clicked, parent shows natal view again */
  onClose: () => void;
  /** Pre-select person A by index (used in shared synastry view) */
  initialA?: number;
  /** Pre-select person B by index (used in shared synastry view) */
  initialB?: number;
  /** When true, hides the back button and share UI (read-only shared view) */
  isSharedView?: boolean;
}

type IndexOrExample = number | "example-a" | "example-b";
type ShareState = "idle" | "loading" | "copied" | "error";

export default function SynastryView({
  people,
  onClose,
  initialA,
  initialB,
  isSharedView = false,
}: SynastryViewProps) {
  // SSR-safe: init null
  const [indexA, setIndexA] = useState<IndexOrExample | null>(null);
  const [indexB, setIndexB] = useState<IndexOrExample | null>(null);
  const [chartA, setChartA] = useState<ComputedChart | null>(null);
  const [chartB, setChartB] = useState<ComputedChart | null>(null);
  const [result, setResult] = useState<SynastryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareState, setShareState] = useState<ShareState>("idle");
  const [shareUrl, setShareUrl] = useState<string>("");

  const hasTwoSaved = people.length >= 2;

  /** Load example pair if fewer than 2 saved charts */
  async function loadExamplePair() {
    setLoading(true);
    setError("");
    try {
      const { computeChart } = await import("../../lib/chartCompute");
      const { computeSynastry } = await import("../../lib/synastry");
      const a = computeChart(EINSTEIN_BIRTH);
      const b = computeChart(SYNASTRY_PARTNER_BIRTH);
      setChartA(a);
      setChartB(b);
      setIndexA("example-a");
      setIndexB("example-b");
      setResult(computeSynastry(a, b));
    } catch (e) {
      setError("Failed to load example. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function computeWithIndices(idxA: IndexOrExample, idxB: IndexOrExample) {
    if (idxA === null || idxB === null) return;
    if (idxA === idxB && typeof idxA === "number") {
      setError("Please choose two different people.");
      return;
    }
    setShareState("idle");
    setShareUrl("");
    setLoading(true);
    setError("");
    try {
      const { computeChart } = await import("../../lib/chartCompute");
      const { computeSynastry } = await import("../../lib/synastry");

      const getBirth = (idx: IndexOrExample): BirthData => {
        if (idx === "example-a") return EINSTEIN_BIRTH;
        if (idx === "example-b") return SYNASTRY_PARTNER_BIRTH;
        return people[idx as number];
      };

      const a = computeChart(getBirth(idxA));
      const b = computeChart(getBirth(idxB));
      setChartA(a);
      setChartB(b);
      setResult(computeSynastry(a, b));
    } catch (e) {
      setError("Failed to compute compatibility. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectA(val: string) {
    const idx = val === "example-a" || val === "example-b" ? val as IndexOrExample : Number(val);
    setIndexA(idx);
    if (indexB !== null) computeWithIndices(idx, indexB);
  }

  function handleSelectB(val: string) {
    const idx = val === "example-a" || val === "example-b" ? val as IndexOrExample : Number(val);
    setIndexB(idx);
    if (indexA !== null) computeWithIndices(indexA, idx);
  }

  async function handleShare() {
    if (!chartA || !chartB) return;
    setShareState("loading");
    try {
      const res = await fetch("/api/chart-share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "synastry", a: chartA.birthData, b: chartB.birthData }),
      });
      if (!res.ok) throw new Error("API error");
      const data = (await res.json()) as { token: string };
      const url = `${window.location.origin}/chart/${data.token}`;
      setShareUrl(url);
      await navigator.clipboard.writeText(url).catch(() => {});
      setShareState("copied");
    } catch {
      setShareState("error");
    }
  }

  // Auto-load: if initialA/initialB are provided, compute those immediately;
  // otherwise, if < 2 saved people load the example pair.
  useEffect(() => {
    if (initialA !== undefined && initialB !== undefined) {
      computeWithIndices(initialA, initialB);
    } else if (!hasTwoSaved) {
      loadExamplePair();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nameA = chartA?.birthData.name ?? "Person A";
  const nameB = chartB?.birthData.name ?? "Person B";

  function getDisplayName(idx: IndexOrExample): string {
    if (idx === "example-a") return EINSTEIN_BIRTH.name;
    if (idx === "example-b") return SYNASTRY_PARTNER_BIRTH.name;
    return people[idx as number]?.name ?? "";
  }

  function BigThreeCol({ chart, label }: { chart: ComputedChart | null; label: string }) {
    if (!chart) return (
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className="ds-label" style={{ marginBottom: "var(--sp-2)" }}>{label}</p>
        <p style={{ color: "var(--grey-400)", fontSize: "var(--fs-sm)" }}>—</p>
      </div>
    );
    const sun = chart.planets.find((p) => p.key === "sun");
    const moon = chart.planets.find((p) => p.key === "moon");
    const asc = chart.hasBirthTime ? chart.ascendant : null;
    return (
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className="ds-label" style={{ marginBottom: "var(--sp-2)" }}>{label}</p>
        <p style={{ fontSize: "var(--fs-h3)", fontWeight: "var(--fw-medium)", color: "var(--ink)", marginBottom: "var(--sp-1)" }}>
          {chart.birthData.name}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-1)" }}>
          {sun && (
            <span className="ds-tag" style={{ textTransform: "none", letterSpacing: "normal", fontSize: "var(--fs-sm)", display: "inline-block" }}>
              ☉ Sun {sun.signLabel}
            </span>
          )}
          {moon && (
            <span className="ds-tag" style={{ textTransform: "none", letterSpacing: "normal", fontSize: "var(--fs-sm)", display: "inline-block" }}>
              ☽ Moon {moon.signLabel}
            </span>
          )}
          {asc ? (
            <span className="ds-tag" style={{ textTransform: "none", letterSpacing: "normal", fontSize: "var(--fs-sm)", display: "inline-block" }}>
              ↑ Rising {asc.signLabel}
            </span>
          ) : (
            <span className="ds-tag" style={{ textTransform: "none", letterSpacing: "normal", fontSize: "var(--fs-sm)", color: "var(--grey-400)", display: "inline-block" }}>
              Rising unknown
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="synastry-view">
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "var(--sp-6)" }}>
        <div>
          <p className="ds-eyebrow" style={{ marginBottom: "var(--sp-1)" }}>Compatibility</p>
          <h2 style={{ fontSize: "var(--fs-h2)", fontWeight: "var(--fw-medium)", color: "var(--ink)", margin: 0 }}>
            Compatibility, explained
          </h2>
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", marginTop: "var(--sp-1)" }}>
            How two charts get along — in plain English, free, no signup
          </p>
        </div>
        {!isSharedView && (
          <button
            type="button"
            onClick={onClose}
            className="ds-btn ds-btn--secondary"
            style={{ flexShrink: 0, marginLeft: "var(--sp-4)" }}
            aria-label="Close compatibility view"
          >
            ← Back to chart
          </button>
        )}
      </div>

      <hr className="ds-rule" style={{ marginBottom: "var(--sp-6)" }} />

      {/* Cold visitor: fewer than 2 saved people */}
      {!hasTwoSaved && !result && !loading && (
        <div className="ds-card" style={{ textAlign: "center", padding: "var(--sp-8)" }}>
          <p className="ds-eyebrow" style={{ marginBottom: "var(--sp-3)" }}>No saved charts yet</p>
          <p style={{ fontSize: "var(--fs-body)", color: "var(--grey-600)", marginBottom: "var(--sp-4)", maxWidth: "400px", margin: "0 auto var(--sp-4)" }}>
            Save two charts to compare them, or load the example pair to see how it works.
          </p>
          <button
            type="button"
            data-testid="load-example-pair-btn"
            onClick={loadExamplePair}
            className="ds-btn"
            disabled={loading}
          >
            Load example pair
          </button>
        </div>
      )}

      {/* Picker (when 2+ saved) */}
      {hasTwoSaved && (
        <div className="ds-panel" style={{ marginBottom: "var(--sp-6)", padding: "var(--sp-4) 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-4)" }}>
            <div>
              <label className="ds-label" htmlFor="synastry-person-a" style={{ display: "block", marginBottom: "var(--sp-2)" }}>
                Person A
              </label>
              <select
                id="synastry-person-a"
                data-testid="synastry-select-a"
                className="ds-input"
                style={{ width: "100%", fontSize: "var(--fs-sm)" }}
                value={indexA === null ? "" : String(indexA)}
                onChange={(e) => handleSelectA(e.target.value)}
              >
                <option value="">Choose a person…</option>
                {people.map((p, i) => (
                  <option key={i} value={String(i)}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="ds-label" htmlFor="synastry-person-b" style={{ display: "block", marginBottom: "var(--sp-2)" }}>
                Person B
              </label>
              <select
                id="synastry-person-b"
                data-testid="synastry-select-b"
                className="ds-input"
                style={{ width: "100%", fontSize: "var(--fs-sm)" }}
                value={indexB === null ? "" : String(indexB)}
                onChange={(e) => handleSelectB(e.target.value)}
              >
                <option value="">Choose a person…</option>
                {people.map((p, i) => (
                  <option key={i} value={String(i)}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
          {error && <p role="alert" style={{ fontSize: "var(--fs-sm)", color: "var(--red)", marginTop: "var(--sp-3)" }}>{error}</p>}
        </div>
      )}

      {loading && (
        <p style={{ color: "var(--grey-600)", fontSize: "var(--fs-body)", padding: "var(--sp-8) 0" }}>
          Computing compatibility…
        </p>
      )}

      {error && !hasTwoSaved && (
        <p role="alert" style={{ fontSize: "var(--fs-sm)", color: "var(--red)", marginTop: "var(--sp-3)" }}>{error}</p>
      )}

      {/* Results */}
      {!loading && result && chartA && chartB && (
        <div data-testid="synastry-result">

          {/* ── SECTION 1: COMPATIBILITY SUMMARY ── */}
          <div style={{ marginBottom: "var(--sp-8)" }}>
            <p className="ds-eyebrow" style={{ marginBottom: "var(--sp-4)" }}>Compatibility Summary</p>

            {/* Big-three side by side */}
            <div
              data-testid="synastry-big-three"
              style={{ display: "flex", gap: "var(--sp-6)", marginBottom: "var(--sp-6)", flexWrap: "wrap" }}
            >
              <BigThreeCol chart={chartA} label="Person A" />
              <div style={{ width: "1px", background: "var(--grey-200)", alignSelf: "stretch", flexShrink: 0 }} aria-hidden="true" />
              <BigThreeCol chart={chartB} label="Person B" />
            </div>

            {/* Element balance: A above B */}
            <div style={{ marginBottom: "var(--sp-6)" }}>
              <p className="ds-label" style={{ marginBottom: "var(--sp-2)" }}>{nameA} — elements</p>
              <ElementBar
                fire={chartA.elements.fire}
                earth={chartA.elements.earth}
                air={chartA.elements.air}
                water={chartA.elements.water}
              />
              <div style={{ marginTop: "var(--sp-4)" }}>
                <p className="ds-label" style={{ marginBottom: "var(--sp-2)" }}>{nameB} — elements</p>
                <ElementBar
                  fire={chartB.elements.fire}
                  earth={chartB.elements.earth}
                  air={chartB.elements.air}
                  water={chartB.elements.water}
                />
              </div>
            </div>

            {/* Harmony/tension summary */}
            <div className="ds-card" data-testid="synastry-summary-text">
              <p className="ds-label" style={{ marginBottom: "var(--sp-2)" }}>
                {result.harmonyCount} harmony · {result.tensionCount} tension · {result.contextCount} conjunction
              </p>
              <p style={{ fontSize: "var(--fs-body)", color: "var(--ink)", lineHeight: "var(--lh-body)", margin: 0 }}>
                {result.summaryText}
              </p>
              {/* Rider A: honest framing line */}
              <p
                data-testid="synastry-honest-framing"
                style={{
                  fontSize: "var(--fs-sm)",
                  color: "var(--grey-500)",
                  marginTop: "var(--sp-3)",
                  marginBottom: 0,
                  letterSpacing: "0.01em",
                }}
              >
                For insight and fun — a lens on the dynamic, not a prediction.
              </p>
            </div>
          </div>

          <hr className="ds-rule" style={{ marginBottom: "var(--sp-8)" }} />

          {/* ── SECTION 2: KEY ASPECTS ── */}
          <KeyAspectsSection result={result} nameA={nameA} nameB={nameB} />

          <hr className="ds-rule" style={{ marginBottom: "var(--sp-8)" }} />

          {/* ── SECTION 3: HOUSE OVERLAY ── */}
          {(result.overlayBinA.length > 0 || result.overlayAinB.length > 0) && (
            <div style={{ marginBottom: "var(--sp-8)" }}>
              <p className="ds-eyebrow" style={{ marginBottom: "var(--sp-4)" }}>House Overlay</p>
              <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", marginBottom: "var(--sp-6)" }}>
                Where each person&apos;s planets fall in the other&apos;s chart
              </p>

              {result.overlayBinA.length > 0 && (
                <div style={{ marginBottom: "var(--sp-6)" }}>
                  <p className="ds-label" style={{ marginBottom: "var(--sp-3)" }}>
                    {nameB}&apos;s planets in {nameA}&apos;s houses
                  </p>
                  <div data-testid="synastry-overlay-b-in-a" style={{ display: "flex", flexDirection: "column" }}>
                    {result.overlayBinA.map((entry, i) => (
                      <OverlayRow
                        key={`bina-${entry.body}-${entry.houseOfA}`}
                        entry={entry}
                        isLast={i === result.overlayBinA.length - 1}
                      />
                    ))}
                  </div>
                </div>
              )}

              {result.overlayAinB.length > 0 && (
                <div>
                  <p className="ds-label" style={{ marginBottom: "var(--sp-3)" }}>
                    {nameA}&apos;s planets in {nameB}&apos;s houses
                  </p>
                  <div data-testid="synastry-overlay-a-in-b" style={{ display: "flex", flexDirection: "column" }}>
                    {result.overlayAinB.map((entry, i) => (
                      <OverlayRow
                        key={`ainb-${entry.body}-${entry.houseOfA}`}
                        entry={entry}
                        isLast={i === result.overlayAinB.length - 1}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* No-birth-time notice for overlays */}
          {(!chartA.hasBirthTime || !chartB.hasBirthTime) && (
            <p role="status" style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", marginTop: "var(--sp-4)" }}>
              House overlay requires birth times for both people. Add exact birth times to see which houses each person&apos;s planets fall in.
            </p>
          )}

          {/* Share this comparison */}
          {!isSharedView && (
            <div className="ds-card" style={{ marginTop: "var(--sp-6)" }}>
              <p className="ds-eyebrow" style={{ marginBottom: "var(--sp-2)" }}>Share this comparison</p>
              <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", marginBottom: "var(--sp-3)" }}>
                Creates a link anyone can open to see this compatibility reading — free, no signup.
                Creating a link stores the birth info on our server to make the URL work.
              </p>
              {shareUrl ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }} className="sm:flex-row">
                  <input
                    readOnly
                    value={shareUrl}
                    className="ds-input"
                    style={{ flex: 1, fontSize: "var(--fs-sm)", background: "var(--grey-50)", minWidth: 0 }}
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                    aria-label="Synastry share link URL"
                  />
                  <button
                    type="button"
                    data-testid="synastry-copy-share-link"
                    aria-label="Copy synastry share link"
                    onClick={async () => {
                      try { await navigator.clipboard.writeText(shareUrl); } catch { /* ignore */ }
                      setShareState("copied");
                    }}
                    className="ds-btn"
                    style={{ flexShrink: 0 }}
                  >
                    {shareState === "copied" ? "Copied" : "Copy link"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  data-testid="synastry-share-btn"
                  onClick={handleShare}
                  disabled={shareState === "loading"}
                  aria-busy={shareState === "loading"}
                  aria-label={shareState === "loading" ? "Creating share link, please wait" : "Share this comparison"}
                  className="ds-btn ds-btn--secondary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "var(--sp-2)", opacity: shareState === "loading" ? 0.7 : 1 }}
                >
                  {shareState === "loading" && (
                    <span
                      aria-hidden="true"
                      style={{
                        display: "inline-block",
                        width: "0.85em",
                        height: "0.85em",
                        border: "2px solid currentColor",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {shareState === "loading" ? "Creating link…" : "Share this comparison"}
                </button>
              )}
              {shareState === "error" && (
                <p role="alert" style={{ fontSize: "var(--fs-sm)", color: "var(--red)", marginTop: "var(--sp-2)" }}>
                  Failed to create share link. Please try again.
                </p>
              )}
              <p role="status" aria-live="polite" style={{ position: "absolute", left: "-9999px" }}>
                {shareState === "copied" ? "Link copied to clipboard" : ""}
              </p>
            </div>
          )}

          {/* Load example pair button for saved-chart context */}
          {hasTwoSaved && !isSharedView && (
            <div style={{ marginTop: "var(--sp-6)", paddingTop: "var(--sp-4)", borderTop: "1px solid var(--grey-200)" }}>
              <button
                type="button"
                data-testid="load-example-pair-btn"
                onClick={loadExamplePair}
                className="ds-btn ds-btn--secondary"
              >
                Load example pair instead
              </button>
            </div>
          )}
        </div>
      )}

      {/* Show load-example-pair when < 2 saved and result is loaded */}
      {!hasTwoSaved && result && (
        <div style={{ marginTop: "var(--sp-6)", paddingTop: "var(--sp-4)", borderTop: "1px solid var(--grey-200)" }}>
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)" }}>
            Save charts to compare people you know. Go back and enter a birth date to create your first saved chart.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Key Aspects Section (significance-ranked, top N surfaced, tail collapsed) ─

import type { InterAspect } from "../../lib/synastry";

const TOP_N = 6; // number of aspects surfaced by default

function natureLabel(nature: "harmony" | "tension" | "context"): string {
  if (nature === "harmony") return "HARMONY";
  if (nature === "tension") return "TENSION";
  return "CONJUNCTION";
}

function KeyAspectsSection({
  result,
  nameA,
  nameB,
}: {
  result: SynastryResult;
  nameA: string;
  nameB: string;
}) {
  const [showAll, setShowAll] = useState(false);

  const topAspects = result.aspects.slice(0, TOP_N);
  const tailAspects = result.aspects.slice(TOP_N);
  const hasTail = tailAspects.length > 0;

  return (
    <div style={{ marginBottom: "var(--sp-8)" }}>
      <p className="ds-eyebrow" style={{ marginBottom: "var(--sp-4)" }}>Key Aspects</p>
      <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", marginBottom: "var(--sp-4)" }}>
        The most relationship-significant aspects between {nameA} and {nameB}
      </p>

      {result.aspects.length === 0 ? (
        <p style={{ color: "var(--grey-400)", fontSize: "var(--fs-body)" }}>
          No major inter-aspects detected within standard orbs.
        </p>
      ) : (
        <div data-testid="synastry-aspects-list" style={{ display: "flex", flexDirection: "column" }}>
          {/* Top N most significant aspects — always visible */}
          {topAspects.map((asp, i) => (
            <AspectRow
              key={`${asp.bodyA}-${asp.bodyB}-${asp.aspectType}`}
              asp={asp}
              nameA={nameA}
              nameB={nameB}
              isLast={i === topAspects.length - 1 && !showAll && !hasTail}
            />
          ))}

          {/* Collapsed tail — toggled via Tailwind hidden/block classes */}
          {hasTail && (
            <div className={showAll ? "block" : "hidden"} aria-hidden={!showAll}>
              {tailAspects.map((asp, i) => (
                <AspectRow
                  key={`${asp.bodyA}-${asp.bodyB}-${asp.aspectType}`}
                  asp={asp}
                  nameA={nameA}
                  nameB={nameB}
                  isLast={i === tailAspects.length - 1}
                />
              ))}
            </div>
          )}

          {/* Show all / collapse toggle */}
          {hasTail && (
            <div style={{ paddingTop: "var(--sp-3)", borderTop: showAll ? "none" : "1px solid var(--grey-100)" }}>
              <button
                type="button"
                data-testid="synastry-show-all-toggle"
                onClick={() => setShowAll((v) => !v)}
                className="ds-btn ds-btn--secondary"
                style={{ fontSize: "var(--fs-sm)" }}
                aria-expanded={showAll}
              >
                {showAll
                  ? "Show top aspects only"
                  : `Show all ${result.aspects.length} aspects`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Aspect row ────────────────────────────────────────────────────────────────

function AspectRow({
  asp,
  nameA,
  nameB,
  isLast,
}: {
  asp: InterAspect;
  nameA: string;
  nameB: string;
  isLast: boolean;
}) {
  // Directional label: "{nameA}'s Sun △ {nameB}'s Moon"
  const dirLabel = `${nameA}’s ${asp.bodyALabel} ${asp.aspectGlyph} ${nameB}’s ${asp.bodyBLabel}`;

  return (
    <div
      data-testid={`synastry-aspect-${asp.bodyA}-${asp.bodyB}-${asp.aspectType}`}
      style={{
        padding: "var(--sp-4) 0",
        borderBottom: isLast ? "none" : "1px solid var(--grey-100)",
      }}
    >
      {/* Row header */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", flexWrap: "wrap", marginBottom: "var(--sp-2)" }}>
        <span style={{ fontSize: "var(--fs-body)", color: "var(--ink)", fontWeight: "var(--fw-medium)" }}>
          {dirLabel}
        </span>
        <span className="ds-label" style={{ color: "var(--grey-600)" }}>
          {asp.aspectType} · {asp.orb.toFixed(1)}° orb
        </span>
        <span
          className="ds-label"
          style={{
            fontWeight: asp.nature === "tension" ? "600" : "500",
            color: asp.nature === "tension" ? "var(--ink)" : "var(--grey-600)",
          }}
        >
          {natureLabel(asp.nature)}
        </span>
      </div>
      {/* Reading — always visible, no expand gate */}
      <p
        data-testid={`synastry-aspect-reading-${asp.bodyA}-${asp.bodyB}-${asp.aspectType}`}
        style={{
          fontSize: "var(--fs-body)",
          color: "var(--ink)",
          lineHeight: "var(--lh-body)",
          margin: 0,
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        {asp.reading}
      </p>
    </div>
  );
}

// ─── Overlay row ──────────────────────────────────────────────────────────────

import type { HouseOverlayEntry } from "../../lib/synastry";

/** Format a house number as an ordinal: 1 → 1st, 2 → 2nd, 3 → 3rd, 4–20 → Nth */
function houseOrdinal(n: number): string {
  const suffixes: Record<number, string> = { 1: "st", 2: "nd", 3: "rd" };
  const mod100 = n % 100;
  // 11th, 12th, 13th are exceptions
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  return `${n}${suffixes[n % 10] ?? "th"}`;
}

function OverlayRow({ entry, isLast }: { entry: HouseOverlayEntry; isLast: boolean }) {
  return (
    <div
      data-testid={`synastry-overlay-${entry.body}-h${entry.houseOfA}`}
      style={{
        padding: "var(--sp-4) 0",
        borderBottom: isLast ? "none" : "1px solid var(--grey-100)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", flexWrap: "wrap", marginBottom: "var(--sp-2)" }}>
        <span style={{ fontSize: "var(--fs-body)", color: "var(--ink)", fontWeight: "var(--fw-medium)" }}>
          {entry.bodyLabel} in the {houseOrdinal(entry.houseOfA)} House
        </span>
        <span className="ds-label" style={{ color: "var(--grey-600)" }}>
          {entry.signLabel}
        </span>
      </div>
      <p
        data-testid={`synastry-overlay-reading-${entry.body}-h${entry.houseOfA}`}
        style={{
          fontSize: "var(--fs-body)",
          color: "var(--ink)",
          lineHeight: "var(--lh-body)",
          margin: 0,
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        {entry.reading}
      </p>
    </div>
  );
}
