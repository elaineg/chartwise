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
    <div ref={containerRef} className="relative">
      <input
        type="text"
        data-testid="place-input"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 disabled:opacity-50"
        aria-label="Birth place"
        aria-autocomplete="list"
        aria-expanded={showSuggestions}
        aria-haspopup="listbox"
      />
      {isLoading && (
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"
          aria-live="polite"
        >
          searching…
        </span>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <ul
          role="listbox"
          data-testid="place-suggestions"
          className="absolute z-50 mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-56 overflow-y-auto"
        >
          {suggestions.map((place, i) => (
            <li
              key={`${place.displayName}-${i}`}
              role="option"
              aria-selected={i === activeSuggestion}
              className={`px-3 py-2 text-sm cursor-pointer ${
                i === activeSuggestion
                  ? "bg-indigo-700 text-white"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(place);
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
