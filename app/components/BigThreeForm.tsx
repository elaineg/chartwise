"use client";

import { useState } from "react";
import { ZODIAC_OPTIONS, type ZodiacKey } from "../../lib/estimateFromBigThree";
import type { BirthData } from "../../lib/chartCompute";

interface BigThreeFormProps {
  onCompute: (data: BirthData) => void;
  isComputing?: boolean;
}

export default function BigThreeForm({ onCompute, isComputing = false }: BigThreeFormProps) {
  const [sunSign, setSunSign] = useState<ZodiacKey | "">("");
  const [moonSign, setMoonSign] = useState<ZodiacKey | "">("");
  const [risingSign, setRisingSign] = useState<ZodiacKey | "">("");
  const [birthYear, setBirthYear] = useState("");
  const [error, setError] = useState("");
  const [solving, setSolving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!sunSign || !moonSign || !risingSign || !birthYear) {
      setError("Pick all three signs and a birth year to estimate.");
      return;
    }

    const year = parseInt(birthYear, 10);
    if (isNaN(year) || year < 1800 || year > 2100) {
      setError("Please enter a valid birth year (1800–2100).");
      return;
    }

    setSolving(true);
    // Yield a macrotask so React can flush the "Estimating…" state to the DOM
    // before the synchronous solver loop blocks the main thread.
    await new Promise<void>((r) => setTimeout(r, 0));
    try {
      // Dynamic import — client-side only; avoids SSR issues
      const { estimateFromBigThree } = await import("../../lib/estimateFromBigThree");
      const birthData = estimateFromBigThree({ sunSign, moonSign, risingSign, year });
      onCompute(birthData);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setSolving(false);
    }
  }

  const isLoading = isComputing || solving;

  // Shared select style matching .ds-input look: square corners, hairline border, ink focus
  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "var(--sp-2) var(--sp-3)",
    fontSize: "var(--fs-body)",
    fontFamily: "inherit",
    color: "var(--ink)",
    background: "var(--paper)",
    border: "1px solid var(--grey-300)",
    borderRadius: 0,                    // square corners — SSENSE house rule
    outline: "none",
    appearance: "auto" as React.CSSProperties["appearance"],
    WebkitAppearance: "auto" as React.CSSProperties["WebkitAppearance"],
    cursor: "pointer",
    lineHeight: "1.5",
  };

  return (
    <form onSubmit={handleSubmit} data-testid="big3-form">

      {/* Calm explainer */}
      <p style={{
        fontSize: "var(--fs-sm)",
        color: "var(--grey-600)",
        marginBottom: "var(--sp-5)",
        lineHeight: "1.5",
      }}>
        Know your Sun, Moon, and Rising (e.g. from Co-Star) but not your exact birth time? Estimate the rest.
      </p>

      {/* Sun Sign */}
      <div className="ds-field">
        <label htmlFor="big3-sun" className="ds-label">Sun Sign</label>
        <select
          id="big3-sun"
          data-testid="big3-sun"
          value={sunSign}
          onChange={(e) => setSunSign(e.target.value as ZodiacKey | "")}
          style={selectStyle}
          aria-label="Sun sign"
        >
          <option value="">Select…</option>
          {ZODIAC_OPTIONS.map((z) => (
            <option key={z.key} value={z.key}>{z.label}</option>
          ))}
        </select>
      </div>

      {/* Moon Sign */}
      <div className="ds-field">
        <label htmlFor="big3-moon" className="ds-label">Moon Sign</label>
        <select
          id="big3-moon"
          data-testid="big3-moon"
          value={moonSign}
          onChange={(e) => setMoonSign(e.target.value as ZodiacKey | "")}
          style={selectStyle}
          aria-label="Moon sign"
        >
          <option value="">Select…</option>
          {ZODIAC_OPTIONS.map((z) => (
            <option key={z.key} value={z.key}>{z.label}</option>
          ))}
        </select>
      </div>

      {/* Rising Sign */}
      <div className="ds-field">
        <label htmlFor="big3-rising" className="ds-label">Rising Sign</label>
        <select
          id="big3-rising"
          data-testid="big3-rising"
          value={risingSign}
          onChange={(e) => setRisingSign(e.target.value as ZodiacKey | "")}
          style={selectStyle}
          aria-label="Rising sign"
        >
          <option value="">Select…</option>
          {ZODIAC_OPTIONS.map((z) => (
            <option key={z.key} value={z.key}>{z.label}</option>
          ))}
        </select>
      </div>

      {/* Birth Year */}
      <div className="ds-field">
        <label htmlFor="big3-year" className="ds-label">Birth Year</label>
        <input
          id="big3-year"
          type="number"
          data-testid="big3-year"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          placeholder="e.g. 1990"
          min="1800"
          max="2100"
          className="ds-input"
          aria-label="Birth year"
        />
      </div>

      {/* Validation error */}
      {error && (
        <p role="alert" data-testid="big3-error" className="ds-error-text" style={{ marginBottom: "var(--sp-4)" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        data-testid="big3-estimate-btn"
        disabled={isLoading}
        className="ds-btn ds-btn--secondary ds-btn--block"
      >
        {isLoading ? "Estimating…" : "Estimate chart"}
      </button>
    </form>
  );
}
