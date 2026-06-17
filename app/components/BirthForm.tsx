"use client";

import { useState } from "react";
import type { BirthData } from "../../lib/chartCompute";
import PlaceSearch, { type PlaceResult } from "./PlaceSearch";

interface BirthFormProps {
  onCompute: (data: BirthData) => void;
  isComputing?: boolean;
}

export default function BirthForm({ onCompute, isComputing = false }: BirthFormProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [placeText, setPlaceText] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [error, setError] = useState("");

  function handlePlaceSelect(place: PlaceResult) {
    setSelectedPlace(place);
    setShowManual(false);
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Parse date
    const [yearStr, monthStr, dayStr] = date.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
      setError("Please enter a valid birth date.");
      return;
    }

    // Parse time
    let hour = 12;
    let minute = 0;
    if (!timeUnknown && time) {
      const [hStr, mStr] = time.split(":");
      hour = parseInt(hStr, 10);
      minute = parseInt(mStr, 10);
      if (isNaN(hour) || isNaN(minute)) {
        setError("Please enter a valid birth time.");
        return;
      }
    }

    // Get coordinates
    let latitude: number;
    let longitude: number;
    let placeName: string;

    if (showManual) {
      latitude = parseFloat(manualLat);
      longitude = parseFloat(manualLng);
      if (isNaN(latitude) || isNaN(longitude)) {
        setError("Please enter valid coordinates (e.g. 48.4011, 9.9876).");
        return;
      }
      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        setError("Coordinates out of range. Latitude: -90 to 90, Longitude: -180 to 180.");
        return;
      }
      placeName = placeText || `${latitude}, ${longitude}`;
    } else if (selectedPlace) {
      latitude = selectedPlace.latitude;
      longitude = selectedPlace.longitude;
      placeName = selectedPlace.displayName;
    } else {
      setError("Please select a place from the suggestions or enter coordinates manually.");
      return;
    }

    onCompute({
      name: name.trim() || "My Chart",
      year,
      month,
      day,
      hour: timeUnknown ? 12 : hour,
      minute: timeUnknown ? 0 : minute,
      latitude,
      longitude,
      placeName,
      hasBirthTime: !timeUnknown,
    });
  }

  return (
    <form onSubmit={handleSubmit} data-testid="birth-form">

      {/* Name */}
      <div className="ds-field">
        <label htmlFor="name" className="ds-label">Name (optional)</label>
        <input
          id="name"
          type="text"
          data-testid="name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Albert Einstein"
          className="ds-input"
        />
      </div>

      {/* Date */}
      <div className="ds-field">
        <label htmlFor="birth-date" className="ds-label">
          Birth date <span style={{ color: "var(--ink)" }}>*</span>
        </label>
        <input
          id="birth-date"
          type="date"
          data-testid="date-input"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          min="0001-01-01"
          max="2025-12-31"
          className="ds-input"
        />
      </div>

      {/* Time */}
      <div className="ds-field">
        <label htmlFor="birth-time" className="ds-label">Birth time</label>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)" }}>
          <input
            id="birth-time"
            type="time"
            data-testid="time-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={timeUnknown}
            className="ds-input"
            style={{ flex: 1, opacity: timeUnknown ? 0.4 : 1 }}
          />
          <label style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", fontSize: "var(--fs-sm)", color: "var(--grey-600)", cursor: "pointer", whiteSpace: "nowrap" }}>
            <input
              type="checkbox"
              data-testid="time-unknown-checkbox"
              checked={timeUnknown}
              onChange={(e) => setTimeUnknown(e.target.checked)}
              style={{ accentColor: "var(--ink)" }}
            />
            Unknown
          </label>
        </div>
        {timeUnknown && (
          <p role="status" style={{ fontSize: "var(--fs-sm)", color: "var(--grey-600)", marginTop: "var(--sp-1)" }}>
            Houses and Ascendant need a birth time. Sun, Moon, and planet signs will still be shown.
          </p>
        )}
      </div>

      {/* Place */}
      <div className="ds-field">
        <label className="ds-label">
          Birth place <span style={{ color: "var(--ink)" }}>*</span>
        </label>
        {!showManual ? (
          <>
            <PlaceSearch
              value={placeText}
              onChange={(v) => {
                setPlaceText(v);
                if (selectedPlace && v !== selectedPlace.displayName) {
                  setSelectedPlace(null);
                }
              }}
              onSelect={handlePlaceSelect}
            />
            {selectedPlace && (
              <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink)", marginTop: "var(--sp-1)" }}>
                ✓ {selectedPlace.displayName} ({selectedPlace.latitude.toFixed(4)},{" "}
                {selectedPlace.longitude.toFixed(4)})
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowManual(true)}
              className="ds-btn--text"
              style={{ fontSize: "var(--fs-sm)", marginTop: "var(--sp-2)" }}
            >
              City not found? Enter coordinates manually
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", gap: "var(--sp-2)" }}>
              <input
                type="text"
                data-testid="manual-lat"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
                placeholder="Latitude (e.g. 48.4011)"
                className="ds-input"
                style={{ flex: 1 }}
                aria-label="Latitude"
              />
              <input
                type="text"
                data-testid="manual-lng"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
                placeholder="Longitude (e.g. 9.9876)"
                className="ds-input"
                style={{ flex: 1 }}
                aria-label="Longitude"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setShowManual(false);
                setManualLat("");
                setManualLng("");
              }}
              className="ds-btn--text"
              style={{ fontSize: "var(--fs-sm)", marginTop: "var(--sp-2)" }}
            >
              Back to city search
            </button>
          </>
        )}
      </div>

      {/* Error */}
      {error && (
        <p role="alert" data-testid="form-error" className="ds-error-text" style={{ marginBottom: "var(--sp-4)" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        data-testid="compute-btn"
        disabled={isComputing}
        className="ds-btn ds-btn--secondary ds-btn--block"
      >
        {isComputing ? "Computing…" : "Compute chart"}
      </button>
    </form>
  );
}
