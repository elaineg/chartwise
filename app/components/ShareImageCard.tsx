"use client";

import { useState, useCallback } from "react";
import type { ComputedChart } from "../../lib/chartCompute";

interface ShareImageCardProps {
  chart: ComputedChart;
}

const ELEMENT_COLORS: Record<string, string> = {
  fire: "#f97316",
  earth: "#84cc16",
  air: "#38bdf8",
  water: "#818cf8",
};

const SIGN_ELEMENTS: Record<string, "fire" | "earth" | "air" | "water"> = {
  aries: "fire", leo: "fire", sagittarius: "fire",
  taurus: "earth", virgo: "earth", capricorn: "earth",
  gemini: "air", libra: "air", aquarius: "air",
  cancer: "water", scorpio: "water", pisces: "water",
};

const ELEMENT_SYMBOLS: Record<string, string> = {
  fire: "△", earth: "▽", air: "△̄", water: "▽̄",
};

function cap(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

export default function ShareImageCard({ chart }: ShareImageCardProps) {
  const [status, setStatus] = useState<"idle" | "generating" | "done" | "error">("idle");

  const generateAndDownload = useCallback(async () => {
    setStatus("generating");
    try {
      const W = 800;
      const H = 420;
      const DPR = 2;
      const canvas = document.createElement("canvas");
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(DPR, DPR);

      // ── Background gradient (deep indigo → near-black) ──
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#0d1427");
      bg.addColorStop(0.5, "#111827");
      bg.addColorStop(1, "#0f0d2e");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Radial glow (centre-left, indigo haze) ──
      const glow = ctx.createRadialGradient(W * 0.25, H * 0.45, 0, W * 0.25, H * 0.45, 260);
      glow.addColorStop(0, "rgba(99,102,241,0.18)");
      glow.addColorStop(0.5, "rgba(99,102,241,0.06)");
      glow.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // ── Subtle top-right warm glow (amber tint) ──
      const warmGlow = ctx.createRadialGradient(W * 0.82, H * 0.18, 0, W * 0.82, H * 0.18, 180);
      warmGlow.addColorStop(0, "rgba(249,115,22,0.10)");
      warmGlow.addColorStop(1, "rgba(249,115,22,0)");
      ctx.fillStyle = warmGlow;
      ctx.fillRect(0, 0, W, H);

      // ── Decorative star dots ──
      const starSeeds = [
        [60,32],[180,62],[305,22],[510,50],[658,28],[735,75],
        [90,360],[420,395],[610,385],[755,355],[490,30],[700,400],
        [35,200],[760,190],[330,410],
      ];
      for (const [sx, sy] of starSeeds) {
        const size = Math.random() * 1.2 + 0.8;
        ctx.fillStyle = `rgba(255,255,255,${0.06 + Math.random() * 0.12})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Zodiac-wheel decoration (partial decorative circle, bottom-right) ──
      const wheelCx = W - 110;
      const wheelCy = H - 95;
      const wheelR = 130;
      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = "#818cf8";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(wheelCx, wheelCy, wheelR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(wheelCx, wheelCy, wheelR * 0.72, 0, Math.PI * 2);
      ctx.stroke();
      // 12 spokes
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(wheelCx + wheelR * 0.72 * Math.cos(angle), wheelCy + wheelR * 0.72 * Math.sin(angle));
        ctx.lineTo(wheelCx + wheelR * Math.cos(angle), wheelCy + wheelR * Math.sin(angle));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // ── Branding (top-right) ──
      ctx.font = "bold 14px system-ui, sans-serif";
      ctx.fillStyle = "#818cf8";
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "right";
      ctx.fillText("chartwise", W - 36, 34);
      ctx.textAlign = "left";

      // ── Name ──
      const name = chart.birthData.name || "Birth Chart";
      ctx.font = `bold 30px system-ui, sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(name, 40, 62);

      // ── Birth details ──
      const dateStr = `${chart.birthData.year}-${String(chart.birthData.month).padStart(2,"0")}-${String(chart.birthData.day).padStart(2,"0")}`;
      const placeStr = chart.birthData.placeName || "";
      ctx.font = "13px system-ui, sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(`${dateStr}${placeStr ? "  ·  " + placeStr : ""}`, 40, 86);

      // ── Divider ──
      ctx.strokeStyle = "rgba(99,102,241,0.20)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, 102);
      ctx.lineTo(W - 40, 102);
      ctx.stroke();

      // ── Big Three chips ──
      const sun = chart.planets.find(p => p.key === "sun");
      const moon = chart.planets.find(p => p.key === "moon");
      const { ascendant, hasBirthTime } = chart;

      const bigThree: Array<{ icon: string; label: string; color: string }> = [];
      if (sun) {
        const el = SIGN_ELEMENTS[sun.sign] ?? "fire";
        const deg = Math.floor(sun.eclipticDegrees % 30);
        bigThree.push({ icon: "☉", label: `Sun ${deg}° ${cap(sun.signLabel)}`, color: ELEMENT_COLORS[el] });
      }
      if (moon) {
        const el = SIGN_ELEMENTS[moon.sign] ?? "water";
        const deg = Math.floor(moon.eclipticDegrees % 30);
        bigThree.push({
          icon: "☽",
          label: `Moon ${deg}° ${cap(moon.signLabel)}${!hasBirthTime ? " (approx.)" : ""}`,
          color: ELEMENT_COLORS[el],
        });
      }
      if (hasBirthTime) {
        const el = SIGN_ELEMENTS[ascendant.sign] ?? "air";
        const deg = Math.floor(ascendant.degrees % 30);
        bigThree.push({ icon: "↑", label: `${cap(ascendant.signLabel)} ${deg}° Rising`, color: ELEMENT_COLORS[el] });
      }

      const chipY = 122;
      const chipH = 60;
      const chipSpacing = 14;
      const totalChipW = W - 80 - chipSpacing * (bigThree.length - 1);
      const chipW = Math.min(210, totalChipW / bigThree.length);
      let chipX = 40;

      ctx.textBaseline = "middle";
      for (const chip of bigThree) {
        // Chip background with slight gradient
        const chipBg = ctx.createLinearGradient(chipX, chipY, chipX, chipY + chipH);
        chipBg.addColorStop(0, "rgba(30,27,75,0.90)");
        chipBg.addColorStop(1, "rgba(15,13,46,0.90)");
        ctx.fillStyle = chipBg;
        drawRoundRect(ctx, chipX, chipY, chipW, chipH, 14);
        ctx.fill();

        // Chip border (coloured)
        ctx.strokeStyle = chip.color + "66";
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, chipX, chipY, chipW, chipH, 14);
        ctx.stroke();

        // Colour dot accent
        ctx.fillStyle = chip.color + "33";
        ctx.beginPath();
        ctx.arc(chipX + 22, chipY + chipH / 2, 14, 0, Math.PI * 2);
        ctx.fill();

        // Icon
        ctx.fillStyle = chip.color;
        ctx.font = "bold 18px system-ui, sans-serif";
        ctx.fillText(chip.icon, chipX + 14, chipY + chipH / 2);

        // Label
        ctx.fillStyle = "#e2e8f0";
        ctx.font = "bold 13px system-ui, sans-serif";
        ctx.fillText(chip.label, chipX + 42, chipY + chipH / 2);

        chipX += chipW + chipSpacing;
      }
      ctx.textBaseline = "alphabetic";

      // ── Element pills (refined, not a raw bar) ──
      const { fire, earth, air, water } = chart.elements;
      const elements = [
        { label: "Fire", count: fire, color: "#f97316", icon: "△" },
        { label: "Earth", count: earth, color: "#84cc16", icon: "▽" },
        { label: "Air", count: air, color: "#38bdf8", icon: "◇" },
        { label: "Water", count: water, color: "#818cf8", icon: "~" },
      ].filter(e => e.count > 0);

      const pillY = 210;
      const pillH = 32;
      const pillSpacing = 10;
      let pillX = 40;
      ctx.font = "12px system-ui, sans-serif";

      for (const el of elements) {
        const pillLabel = `${el.icon} ${el.label} ${el.count}`;
        const textW = ctx.measureText(pillLabel).width;
        const pillW = textW + 24;

        // Pill background
        ctx.fillStyle = el.color + "1A";
        ctx.strokeStyle = el.color + "55";
        ctx.lineWidth = 1;
        drawRoundRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
        ctx.fill();
        drawRoundRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
        ctx.stroke();

        // Pill text
        ctx.fillStyle = el.color;
        ctx.textBaseline = "middle";
        ctx.fillText(pillLabel, pillX + 12, pillY + pillH / 2);
        ctx.textBaseline = "alphabetic";

        pillX += pillW + pillSpacing;
        if (pillX > W - 150) break; // don't overflow
      }

      // ── Highlight insight line ──
      const highlights: string[] = [];
      if (sun && moon) {
        const sunEl = SIGN_ELEMENTS[sun.sign];
        const moonEl = SIGN_ELEMENTS[moon.sign];
        if (sunEl === moonEl) {
          highlights.push(`Strong ${sunEl} energy — identity and emotions run on the same current.`);
        }
      }
      if (hasBirthTime && sun) {
        const houseLabel = sun.house <= 3 ? "House " + sun.house + " — early life and formation shape purpose."
          : sun.house <= 6 ? "House " + sun.house + " — craft and daily work are where purpose lives."
          : sun.house <= 9 ? "House " + sun.house + " — relationships and public life carry identity."
          : "House " + sun.house + " — career and legacy are central to this life.";
        highlights.push(`Sun in ${houseLabel}`);
      }
      if (highlights.length === 0 && sun) {
        const el = SIGN_ELEMENTS[sun.sign] ?? "fire";
        highlights.push(`${cap(sun.signLabel)} Sun · ${el.charAt(0).toUpperCase() + el.slice(1)} element — a chart led by ${el === "fire" ? "initiative" : el === "earth" ? "practicality" : el === "air" ? "intellect" : "depth"}.`);
      }

      // Insight box (subtle, not floating text)
      const insightY = 265;
      const insightH = 42;
      ctx.fillStyle = "rgba(99,102,241,0.08)";
      ctx.strokeStyle = "rgba(99,102,241,0.20)";
      ctx.lineWidth = 1;
      drawRoundRect(ctx, 40, insightY, W - 80, insightH, 8);
      ctx.fill();
      drawRoundRect(ctx, 40, insightY, W - 80, insightH, 8);
      ctx.stroke();

      // Indigo accent bar on left
      ctx.fillStyle = "#818cf8";
      ctx.fillRect(40, insightY, 3, insightH);

      ctx.font = "italic 13px system-ui, sans-serif";
      ctx.fillStyle = "#cbd5e1";
      ctx.textBaseline = "middle";
      ctx.fillText(highlights[0] ?? "", 52, insightY + insightH / 2);
      ctx.textBaseline = "alphabetic";

      // ── Footer ──
      const footerY = H - 52;
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, footerY, W, 52);

      // Thin indigo accent line at footer top
      ctx.fillStyle = "rgba(99,102,241,0.40)";
      ctx.fillRect(0, footerY, W, 1);

      // No-signup badge
      const badgeText = "✦ no signup";
      ctx.font = "bold 11px system-ui, sans-serif";
      ctx.fillStyle = "#818cf8";
      ctx.textBaseline = "middle";
      ctx.fillText(badgeText, 40, footerY + 26);

      // Footer text
      ctx.font = "12px system-ui, sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.textAlign = "right";
      ctx.fillText("chartwise.vercel.app — free birth chart, instant, no account", W - 36, footerY + 26);
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      // ── Download ──
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${name.toLowerCase().replace(/\s+/g, "-")}-chart.png`;
      a.click();
      setStatus("done");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("Image generation failed:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }, [chart]);

  return (
    <button
      type="button"
      data-testid="save-image-btn"
      onClick={generateAndDownload}
      disabled={status === "generating"}
      aria-label="Save chart as image"
      className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors shrink-0"
    >
      {status === "generating" ? (
        <>
          <span aria-hidden="true" className="animate-spin">⟳</span>
          Generating…
        </>
      ) : status === "done" ? (
        <>
          <span aria-hidden="true">✓</span>
          Saved!
        </>
      ) : status === "error" ? (
        <>
          <span aria-hidden="true">✕</span>
          Failed
        </>
      ) : (
        <>
          <span aria-hidden="true">⬇</span>
          Save as image
        </>
      )}
    </button>
  );
}
