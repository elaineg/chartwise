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
    <div data-testid="people-list" style={{ marginBottom: "var(--sp-6)" }}>
      <p className="ds-eyebrow" style={{ marginBottom: "var(--sp-2)" }}>
        Saved charts
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)" }}>
        {people.map((person, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center" }}
          >
            <button
              type="button"
              data-testid={`person-tab-${i}`}
              onClick={() => onSelect(i)}
              aria-pressed={i === activeIndex}
              className={i === activeIndex ? "ds-tag ds-tag--selected" : "ds-tag"}
              style={{ fontSize: "var(--fs-sm)", textTransform: "none", letterSpacing: "normal" }}
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
              style={{
                marginLeft: "var(--sp-1)",
                padding: "4px 6px",
                fontSize: "var(--fs-sm)",
                color: "var(--grey-400)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                lineHeight: 1,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--red)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--grey-400)"; }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
