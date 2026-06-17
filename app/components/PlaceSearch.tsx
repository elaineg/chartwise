"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface PlaceResult {
  name: string;
  displayName: string;
  latitude: number;
  longitude: number;
}

interface PlaceSearchProps {
  value: string;
  onChange: (val: string) => void;
  onSelect: (place: PlaceResult) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function PlaceSearch({
  value,
  onChange,
  onSelect,
  placeholder = "City, Country (e.g. London, UK)",
  disabled = false,
}: PlaceSearchProps) {
  const [suggestions, setSuggestions] = useState<PlaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dismiss on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/cities?q=${encodeURIComponent(q.trim())}`,
        { signal: AbortSignal.timeout(5000) }
      );
      if (!res.ok) throw new Error("search failed");
      const data = (await res.json()) as { results: PlaceResult[] };
      setSuggestions(data.results);
      setShowSuggestions(data.results.length > 0);
      setActiveSuggestion(-1);
    } catch {
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    onChange(val);
    setActiveSuggestion(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 250);
  }

  function handleSelect(place: PlaceResult) {
    onSelect(place);
    onChange(place.displayName);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeSuggestion >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeSuggestion]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <input
        type="text"
        data-testid="place-input"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
        className="ds-input"
        style={{ opacity: disabled ? 0.4 : 1 }}
        aria-label="Birth place"
        aria-autocomplete="list"
        aria-expanded={showSuggestions}
        aria-haspopup="listbox"
      />
      {isLoading && (
        <span
          style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "var(--fs-micro)", color: "var(--grey-400)" }}
          aria-live="polite"
        >
          searching…
        </span>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <ul
          role="listbox"
          data-testid="place-suggestions"
          style={{
            position: "absolute",
            zIndex: 50,
            marginTop: "1px",
            width: "100%",
            background: "var(--paper)",
            border: "1px solid var(--grey-200)",
            borderRadius: 0,
            boxShadow: "none",
            maxHeight: "224px",
            overflowY: "auto",
            listStyle: "none",
            padding: 0,
            margin: "1px 0 0 0",
          }}
        >
          {suggestions.map((place, i) => (
            <li
              key={`${place.displayName}-${i}`}
              role="option"
              aria-selected={i === activeSuggestion}
              style={{
                padding: "12px",
                fontSize: "var(--fs-sm)",
                cursor: "pointer",
                borderBottom: i < suggestions.length - 1 ? "1px solid var(--grey-200)" : "none",
                background: i === activeSuggestion ? "var(--ink)" : "var(--paper)",
                color: i === activeSuggestion ? "var(--paper)" : "var(--ink)",
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(place);
              }}
              onMouseEnter={(e) => {
                if (i !== activeSuggestion) {
                  (e.currentTarget as HTMLLIElement).style.background = "var(--grey-50)";
                }
              }}
              onMouseLeave={(e) => {
                if (i !== activeSuggestion) {
                  (e.currentTarget as HTMLLIElement).style.background = "var(--paper)";
                }
              }}
            >
              {place.displayName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
