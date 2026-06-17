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
      <main style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--grey-600)", fontSize: "var(--fs-body)" }}>Loading chart…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--sp-8)" }}>
        <div style={{ textAlign: "center" }}>
          <p role="alert" style={{ color: "var(--red)", fontSize: "var(--fs-body)", marginBottom: "var(--sp-4)" }}>{error}</p>
          <a href="/" style={{ color: "var(--grey-600)", textDecoration: "underline", fontSize: "var(--fs-body)" }}>
            Create your own chart →
          </a>
        </div>
      </main>
    );
  }

  if (!chart || !birth) return null;

  return (
    <main style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink)" }}>
      <div style={{ maxWidth: "896px", margin: "0 auto", padding: "var(--sp-8) var(--ds-page-x)" }}>
        <div style={{ marginBottom: "var(--sp-6)" }}>
          <span className="ds-eyebrow">Shared chart</span>
          <h1 style={{ fontSize: "var(--fs-h1)", fontWeight: "var(--fw-regular)", color: "var(--ink)", margin: "var(--sp-2) 0 var(--sp-1)" }}>
            {birth.name}
          </h1>
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", margin: "0 0 var(--sp-3)" }}>
            {birth.placeName} · {birth.year}-{String(birth.month).padStart(2, "0")}-{String(birth.day).padStart(2, "0")}
          </p>
          <a href="/" className="ds-btn--text" style={{ fontSize: "var(--fs-sm)" }}>
            Create your own chart →
          </a>
        </div>
        <hr className="ds-rule" style={{ marginBottom: "var(--sp-6)" }} />
        <ChartView chart={chart} isSharedView />
      </div>
    </main>
  );
}
