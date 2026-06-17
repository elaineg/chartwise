"use client";

import { useState, useEffect, useCallback } from "react";
import type { BirthData, ComputedChart } from "../lib/chartCompute";
import { EINSTEIN_BIRTH } from "../lib/chartCompute";
import BirthForm from "./components/BirthForm";
import ChartView from "./components/ChartView";
import PeopleList from "./components/PeopleList";
import SynastryView from "./components/SynastryView";

const STORAGE_KEY = "chartwise:people";

type ShareState = "idle" | "loading" | "copied" | "error";

export default function Home() {
  // SSR-safe: init to empty; read from localStorage in useEffect only
  const [people, setPeople] = useState<BirthData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chart, setChart] = useState<ComputedChart | null>(null);
  const [isComputing, setIsComputing] = useState(false);
  const [computeError, setComputeError] = useState("");
  const [shareState, setShareState] = useState<ShareState>("idle");
  const [shareUrl, setShareUrl] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);
  const [showSynastry, setShowSynastry] = useState(false);

  // Load saved people from localStorage after hydration (SSR-safe)
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw) as BirthData[];
        if (Array.isArray(saved) && saved.length > 0) {
          setPeople(saved);
        }
      } catch {
        // corrupt data, ignore
      }
    }
    setHydrated(true);
  }, []);

  // Persist people to localStorage whenever they change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
  }, [people, hydrated]);

  const computeChart = useCallback(async (birth: BirthData) => {
    setIsComputing(true);
    setComputeError("");
    setShareState("idle");
    setShareUrl("");
    try {
      const { computeChart: compute } = await import("../lib/chartCompute");
      const computed = compute(birth);
      setChart(computed);

      // Save/update in people list
      setPeople((prev) => {
        const idx = prev.findIndex((p) => p.name === birth.name);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = birth;
          setActiveIndex(idx);
          return next;
        }
        const newIdx = prev.length;
        setActiveIndex(newIdx);
        return [...prev, birth];
      });
    } catch (err) {
      setComputeError(
        "Failed to compute chart. Please check your birth data and try again."
      );
      console.error("Chart compute error:", err);
    } finally {
      setIsComputing(false);
    }
  }, []);

  async function loadEinstein() {
    setShareState("idle");
    setShareUrl("");
    await computeChart(EINSTEIN_BIRTH);
  }

  function selectPerson(index: number) {
    const person = people[index];
    if (!person) return;
    setActiveIndex(index);
    setShareState("idle");
    setShareUrl("");
    computeChart(person);
  }

  function deletePerson(index: number) {
    setPeople((prev) => prev.filter((_, i) => i !== index));
    if (activeIndex === index) {
      setChart(null);
      setActiveIndex(null);
    } else if (activeIndex !== null && activeIndex > index) {
      setActiveIndex((prev) => (prev !== null ? prev - 1 : null));
    }
  }

  async function handleShare() {
    if (!chart) return;
    setShareState("loading");
    try {
      const res = await fetch("/api/chart-share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chart.birthData),
      });
      if (!res.ok) throw new Error("API error");
      const data = (await res.json()) as { token: string };
      const url = `${window.location.origin}/chart/${data.token}`;
      setShareUrl(url);
      setShareState("copied");
    } catch {
      setShareState("error");
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink)" }}>
      <div style={{ maxWidth: "var(--ds-maxw)", margin: "0 auto", padding: "0 var(--ds-page-x)" }}>

        {/* Hero */}
        <header style={{ paddingTop: "var(--sp-24)", paddingBottom: "var(--sp-8)" }}>
          <span className="ds-eyebrow">Natal chart · Plain English · No signup</span>
          <h1 className="ds-display" style={{ marginTop: "var(--sp-2)", marginBottom: "var(--sp-3)" }}>
            Your birth chart, explained in plain English.
          </h1>
          <p style={{ fontSize: "var(--fs-body)", color: "var(--grey-600)", maxWidth: "480px", margin: 0 }}>
            Free, no signup — type your birth date, time, and place, or load an example.
          </p>
        </header>

        {/* Full-bleed hairline below hero */}
        <hr className="ds-rule" style={{ margin: "0 0 var(--sp-8) 0" }} />

        {/* Main layout: form left, chart right on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[340px_1fr]" style={{ gap: "var(--sp-8)" }}>

          {/* Left: input panel */}
          <aside>
            <div className="ds-panel" style={{ padding: "var(--sp-6) 0" }}>

              {/* Load Einstein button — primary ink-filled, the one hero CTA */}
              <button
                type="button"
                data-testid="load-einstein-btn"
                onClick={loadEinstein}
                disabled={isComputing}
                className="ds-btn ds-btn--block"
                style={{ marginBottom: "var(--sp-4)" }}
              >
                Load example (Einstein)
              </button>

              {/* OR divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", marginBottom: "var(--sp-4)" }}>
                <hr className="ds-rule" style={{ flex: 1, margin: 0 }} />
                <span className="ds-label ds-label--secondary">Or enter your own</span>
                <hr className="ds-rule" style={{ flex: 1, margin: 0 }} />
              </div>

              <BirthForm onCompute={computeChart} isComputing={isComputing} />
            </div>

            {/* Compute error */}
            {computeError && (
              <p role="alert" style={{ fontSize: "var(--fs-sm)", color: "var(--red)", marginTop: "var(--sp-3)" }}>
                {computeError}
              </p>
            )}

            {/* Privacy note */}
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", marginTop: "var(--sp-3)" }}>
              Your chart is computed on your device. Saved charts stay in your browser only.
            </p>
          </aside>

          {/* Right: chart output */}
          <section>
            {/* People switcher */}
            {hydrated && people.length > 0 && (
              <PeopleList
                people={people}
                activeIndex={activeIndex}
                onSelect={selectPerson}
                onDelete={deletePerson}
              />
            )}

            {isComputing && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--sp-24) 0" }}>
                <p style={{ color: "var(--grey-600)", fontSize: "var(--fs-body)" }}>
                  Computing…
                </p>
              </div>
            )}

            {!isComputing && !chart && (
              <div
                data-testid="chart-empty-state"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "var(--sp-24) 0", textAlign: "center" }}
              >
                <p style={{ color: "var(--grey-400)", fontSize: "var(--fs-body)", marginBottom: "var(--sp-2)" }}>
                  Your explained chart will appear here
                </p>
                <p style={{ color: "var(--grey-400)", fontSize: "var(--fs-sm)" }}>
                  Enter your birth data or load the Einstein example
                </p>
              </div>
            )}

            {!isComputing && chart && !showSynastry && (
              <ChartView
                chart={chart}
                onShare={handleShare}
                shareState={shareState}
                shareUrl={shareUrl}
                onOpenSynastry={() => setShowSynastry(true)}
              />
            )}

            {!isComputing && showSynastry && (
              <SynastryView
                people={people}
                onClose={() => setShowSynastry(false)}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
