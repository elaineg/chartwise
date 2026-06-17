# Round 9 — Tomás (Ops analyst, hard-skeptic, NON-FIT, privacy-focused)

Round 8: 6/10. Device: 1280px desktop + 375px mobile (Edge equivalent).

## Did the round-9 node/Lilith fix land? YES.
Verified on the anchor chart (1998-08-08 16:30 Jiangmen, China):
- Desktop: dedicated NODES column in houses table. Read WITHOUT clicking, no clipping:
  South Node 2°07' Pisces (H2), North Node 2°07' Virgo (H8), Black Moon Lilith 26°25' Libra (H10).
  Lilith label wraps to a 2nd line instead of clipping. Good.
- Mobile 375px: table becomes stacked house cards. Each node/Lilith is its own full-width chip,
  full sign+degree visible inline, no click, no clipping (House 10 card: "Black Moon Lilith 26°25' Libra";
  House 8: "North Node 2°07' Virgo"). Fix confirmed both viewports.

## Prior concern (place field hard-block): PARTIALLY addressed.
- Typing "Jiangmen, China" and clicking Compute still does NOT auto-resolve — it errors
  "Please select a place from the suggestions or enter coordinates manually." My round-8 ask
  (auto-resolve typed City, Country) was NOT implemented.
- BUT: the error is now clear (not a silent block), the autocomplete reliably surfaces the city,
  and "Enter coordinates manually" (lat/lon with examples + "Back to city search") gives a real
  fallback. So it's friction, not a dead end. Acceptable.

## Privacy / data-entry (my main lens): STRONG.
"Free, no signup." "Your chart is computed on your device. Saved charts stay in your browser only."
On the result: "computed on your device — nothing is sent anywhere. Creating a share link sends this
chart's birth info to our server so the link works." That honest, scoped disclosure is exactly what a
fine-print reader wants — default fully local, only optional share-link transmits, and they say so.

## Layperson legibility: YES.
Plain-English blurbs ("You are here to shine and you know it — not from arrogance...") are readable;
my astrology-into-it partner would get it, and even I followed the structure (house = life area).

## Regression check: NONE found. Chart computed cleanly, 0 console errors, both viewports render.

## 3 answers
1. Advocate? NO — I'm a category non-fit (astrology = harmless nonsense to me); I wouldn't bring it
   up myself. But trust/clarity bars are met; I'd send the link to my partner without privacy worry.
2. Advocacy score: 6/10. Held back only by my category skepticism + the still-manual place selection.
   The defects I could name are gone; the cap is who I am, not the build.
3. Single most important remaining fix: make typed "City, Country" auto-resolve on Compute (match the
   obvious autocomplete suggestion automatically) instead of erroring and forcing a click.

```json
{"tester": 7, "round": 9, "clarity": "Yes", "value": "No", "advocacy": 6, "topComplaints": ["Typed 'City, Country' still errors on Compute instead of auto-resolving the matching suggestion", "I'm a hard-skeptic non-fit so I won't personally advocate for the category"], "priorConcernsAddressed": "some"}
```
