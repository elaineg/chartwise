"use client";

interface ElementBarProps {
  fire: number;
  earth: number;
  air: number;
  water: number;
}

const ELEMENTS = [
  { key: "fire", label: "Fire", color: "bg-orange-500", textColor: "text-orange-300" },
  { key: "earth", label: "Earth", color: "bg-green-600", textColor: "text-green-300" },
  { key: "air", label: "Air", color: "bg-sky-400", textColor: "text-sky-300" },
  { key: "water", label: "Water", color: "bg-blue-600", textColor: "text-blue-300" },
] as const;

export default function ElementBar({ fire, earth, air, water }: ElementBarProps) {
  const counts: Record<string, number> = { fire, earth, air, water };
  const total = fire + earth + air + water;

  return (
    <div data-testid="element-bar" className="mt-6 p-4 bg-slate-800/40 rounded-xl border border-slate-700/40">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
        Element Distribution
      </h3>
      <div className="flex gap-2 mb-3 h-3 rounded-full overflow-hidden">
        {ELEMENTS.map(({ key, color }) => {
          const pct = total > 0 ? (counts[key] / total) * 100 : 25;
          return (
            <div
              key={key}
              className={`${color} rounded-full transition-all`}
              style={{ width: `${pct}%` }}
              title={`${counts[key]} ${key}`}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3">
        {ELEMENTS.map(({ key, label, textColor }) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`text-sm font-semibold ${textColor}`}>
              {counts[key]}
            </span>
            <span className="text-xs text-slate-400">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-2">Based on {total} planetary placements</p>
    </div>
  );
}
