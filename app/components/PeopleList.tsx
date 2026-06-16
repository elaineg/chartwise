"use client";

import type { BirthData } from "../../lib/chartCompute";

interface PeopleListProps {
  people: BirthData[];
  activeIndex: number | null;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function PeopleList({
  people,
  activeIndex,
  onSelect,
  onDelete,
}: PeopleListProps) {
  if (people.length === 0) return null;

  return (
    <div data-testid="people-list" className="mb-6">
      <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">
        Saved charts
      </p>
      <div className="flex flex-wrap gap-2">
        {people.map((person, i) => (
          <div
            key={i}
            className={`flex items-center gap-1 rounded-full border text-sm transition-colors ${
              i === activeIndex
                ? "bg-indigo-700 border-indigo-500 text-white"
                : "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <button
              type="button"
              data-testid={`person-tab-${i}`}
              onClick={() => onSelect(i)}
              className="px-3 py-1.5 rounded-full"
              aria-pressed={i === activeIndex}
            >
              {person.name}
            </button>
            <button
              type="button"
              data-testid={`person-delete-${i}`}
              onClick={() => {
                if (confirm(`Remove "${person.name}" from saved charts?`)) {
                  onDelete(i);
                }
              }}
              aria-label={`Remove ${person.name}`}
              className="pr-2 text-slate-500 hover:text-red-400 text-xs transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
