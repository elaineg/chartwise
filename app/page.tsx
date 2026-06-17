"use client";

import { useState, useEffect, useCallback } from "react";
import type { BirthData, ComputedChart } from "../lib/chartCompute";
import { EINSTEIN_BIRTH } from "../lib/chartCompute";
import BirthForm from "./components/BirthForm";
import ChartView from "./components/ChartView";
import PeopleList from "./components/PeopleList";

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
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Hero */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            Your birth chart, explained in plain English.
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Free, no signup — type your birth date, time, and place, or load an example.
          </p>
        </header>

        {/* Main layout: form left, chart right on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[340px_1fr] gap-8">

          {/* Left: input panel */}
          <aside className="space-y-4">
            <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700/50">

              {/* Load Einstein button — prominent, show-don't-tell */}
              <button
                type="button"
                data-testid="load-einstein-btn"
                onClick={loadEinstein}
                disabled={isComputing}
                className="w-full mb-4 py-2.5 bg-violet-700 hover:bg-violet-600 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
              >
                <span aria-hidden="true">✦</span>
                Load example (Einstein)
              </button>

              <div className="border-t border-slate-700/50 pt-4">
                <p className="text-xs text-slate-500 mb-3">
                  Or enter your own birth data:
                </p>
                <BirthForm onCompute={computeChart} isComputing={isComputing} />
              </div>
            </div>

            {/* Compute error */}
            {computeError && (
              <p role="alert" className="text-sm text-red-400 px-1">
                {computeError}
              </p>
            )}

            {/* Privacy note */}
            <p className="text-xs text-slate-600 px-1">
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
              <div className="flex items-center justify-center py-20">
                <p className="text-indigo-300 text-lg animate-pulse">
                  Computing chart…
                </p>
              </div>
            )}

            {!isComputing && !chart && (
              <div
                data-testid="chart-empty-state"
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="text-6xl mb-4 opacity-30" aria-hidden="true">✦</div>
                <p className="text-slate-500 text-lg mb-2">
                  Your explained chart will appear here
                </p>
                <p className="text-slate-600 text-sm">
                  Enter your birth data or load the Einstein example
                </p>
              </div>
            )}

            {!isComputing && chart && (
              <ChartView
                chart={chart}
                onShare={handleShare}
                shareState={shareState}
                shareUrl={shareUrl}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
