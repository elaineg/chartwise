"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { BirthData, ComputedChart } from "../../../lib/chartCompute";
import ChartView from "../../components/ChartView";

export default function SharedChartClient() {
  const params = useParams<{ token: string }>();
  const token = params?.token ?? "";
  const [birth, setBirth] = useState<BirthData | null>(null);
  const [chart, setChart] = useState<ComputedChart | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function load() {
      try {
        const res = await fetch(`/api/chart-share?token=${encodeURIComponent(token)}`);
        if (!res.ok) {
          setError("Share link not found or expired.");
          setLoading(false);
          return;
        }
        const data = await res.json() as { birth: BirthData };
        setBirth(data.birth);

        // Compute chart client-side
        const { computeChart } = await import("../../../lib/chartCompute");
        const computed = computeChart(data.birth);
        setChart(computed);
      } catch {
        setError("Failed to load shared chart.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-indigo-300 text-lg animate-pulse">Loading chart…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
        <div className="text-center">
          <p role="alert" className="text-red-400 text-lg mb-4">{error}</p>
          <a href="/" className="text-indigo-400 underline">Create your own chart →</a>
        </div>
      </main>
    );
  }

  if (!chart || !birth) return null;

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-slate-400 text-sm mb-1">Shared chart</p>
          <h1 className="text-2xl font-bold text-white">{birth.name}</h1>
          <p className="text-slate-400 text-sm mt-1">
            {birth.placeName} · {birth.year}-{String(birth.month).padStart(2, "0")}-{String(birth.day).padStart(2, "0")}
          </p>
          <a href="/" className="inline-block mt-3 text-indigo-400 text-sm underline">
            Create your own chart →
          </a>
        </div>
        <ChartView chart={chart} isSharedView />
      </div>
    </main>
  );
}
