"use client";

import { useState } from "react";
import type { ComputedChart } from "../../lib/chartCompute";
import HousesTable from "./HousesTable";
import ElementBar from "./ElementBar";
import TransitCard from "./TransitCard";

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

  const { birthData, elements } = chart;

  return (
    <div>
      {/* Profile summary */}
      <div className="mb-6 p-4 bg-slate-800/40 rounded-xl border border-slate-700/40">
        <h2 className="text-xl font-bold text-white mb-1">{birthData.name}</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
          <span>
            {birthData.year}-{String(birthData.month).padStart(2, "0")}-
            {String(birthData.day).padStart(2, "0")}
          </span>
          {(birthData.hour != null && birthData.minute != null) && (
            <span>
              {String(birthData.hour).padStart(2, "0")}:
              {String(birthData.minute).padStart(2, "0")}
            </span>
          )}
          {birthData.placeName && <span>{birthData.placeName}</span>}
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          <span className="px-2.5 py-1 bg-indigo-900/30 border border-indigo-700/30 rounded-full text-indigo-300">
            {chart.ascendant.signLabel} rising
          </span>
          {chart.planets.find((p) => p.key === "sun") && (
            <span className="px-2.5 py-1 bg-amber-900/30 border border-amber-700/30 rounded-full text-amber-300">
              ☉ {chart.planets.find((p) => p.key === "sun")!.signLabel} Sun
            </span>
          )}
          {chart.planets.find((p) => p.key === "moon") && (
            <span className="px-2.5 py-1 bg-slate-700/50 border border-slate-600/40 rounded-full text-slate-300">
              ☽ {chart.planets.find((p) => p.key === "moon")!.signLabel} Moon
            </span>
          )}
        </div>
      </div>

      {/* Privacy copy */}
      <p className="text-xs text-slate-500 mb-4">
        Your chart is computed on your device — nothing is sent anywhere.
        {!isSharedView && " Creating a share link sends this chart's birth info to our server so the link works."}
      </p>

      {/* Houses table */}
      <HousesTable chart={chart} preExpandedPlanet="sun" />

      {/* Element bar */}
      <ElementBar
        fire={elements.fire}
        earth={elements.earth}
        air={elements.air}
        water={elements.water}
      />

      {/* Today transit card */}
      <TransitCard natalChart={chart} />

      {/* Share section */}
      {!isSharedView && onShare && (
        <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
          <h3 className="text-sm font-semibold text-slate-300 mb-2">Share this chart</h3>
          <p className="text-xs text-slate-400 mb-3">
            Creating a share link sends this chart's birth info to our server so anyone with
            the link can view the same chart.
          </p>
          {shareUrl ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 min-w-0"
                onClick={(e) => (e.target as HTMLInputElement).select()}
                aria-label="Share link URL"
              />
              <button
                type="button"
                data-testid="copy-share-link"
                aria-label="Copy share link"
                onClick={copyShareUrl}
                className="shrink-0 px-3 py-2 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-medium rounded-lg transition-colors"
              >
                {showShareCopied ? "Copied!" : "Copy link"}
              </button>
            </div>
          ) : (
            <button
              type="button"
              data-testid="share-btn"
              onClick={onShare}
              disabled={shareState === "loading"}
              className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {shareState === "loading" ? "Creating link…" : "Create share link"}
            </button>
          )}
          {shareState === "error" && (
            <p role="alert" className="text-xs text-red-400 mt-2">
              Failed to create share link. Please try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
