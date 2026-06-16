# chartwise — UX Brief

## 1. Problem statement
You know your star sign — this shows you your whole birth chart in plain English, free and with no login.

## 2. Primary user action
Enter birth date, time, and place to get an explained chart. The landing view shows ONE birth-info form, focused on the date field. A prominent "Load example (Einstein)" button sits beside it so a cold visitor sees a fully-explained chart in one click — show, don't tell. The Einstein chart (table + element bar + a sample reading already expanded) IS the demo; the visitor reads a real explanation before typing anything.

## 3. Emotional tone
Calm, clear, and friendly — the opposite of a dense professional wheel. Humanist sans (e.g. Inter), generous line-height, warm-neutral background with a soft single accent (dusk indigo/violet), roomy spacing. Reads like a knowledgeable friend explaining, not a star-chart printout.

## 4. Design decisions
- **Houses-as-rows, reflow to cards on mobile.** Desktop: 12 numbered house rows × Sign / Planets / Nodes columns, scannable top-to-bottom. At ≤640px DO NOT shrink the table or force horizontal scroll — each house becomes a stacked card ("House 10 — Career & public life" header, then its placements as tappable chips). This is the hero surface and the win over astro-seek.
- **Every placement chip is tappable to reveal its reading (no hover-only).** Each planet-in-house / sign-in-house chip carries a visible affordance (chip styled as a button + a small "ⓘ"/chevron); tap/click expands a 1–2 sentence plain-English reading inline beneath it. Discoverable on touch; the Einstein example ships with one reading pre-expanded so the interaction is taught by example.
- **Mode-aware privacy copy.** Computing/saving says "Your chart is computed on your device — nothing is sent anywhere." The Share action explicitly states "Creating a share link sends this chart's birth info to our server so the link works." Never a blanket "nothing leaves your device" claim once share exists.

## 5. 5-second check (above the fold)
- **Headline:** "Your birth chart, explained in plain English."
- **Subtitle:** "Free, no signup — type your birth date, time, and place, or load an example."
- **Primary action:** the birth-info form (date pre-focused) + a clear "Load example (Einstein)" button.
- **Pre-filled example:** clicking Einstein renders the houses table with House 10 → Sun (Pisces) and one reading already open — proof the explanation is real.

## Supporting details
- **Input:** fielded date/time + place type-ahead (all-the-cities, lazy-loaded on first keystroke; pick-from-suggestions disambiguates collisions). "Time unknown" checkbox degrades gracefully — compute Sun/planets/signs, gray out houses + Ascendant with a one-line note "houses and rising need a birth time." "Enter coordinates manually" escape hatch (lat/long + optional UTC offset, marked Advanced) for missing places.
- **Element bar:** compact horizontal Fire/Earth/Air/Water tally with counts + colored segments, directly under the table — obvious at a glance, never blank.
- **Current sky / transit:** a clearly separated "Today" card below the chart — today's planet signs, retrograde flags, and ≥1 concise note keyed to this profile. Visually distinct (dated header) from the static natal chart.
- **Saved charts (recurrence hook):** a persistent, visible people list (localStorage) — partner/friend/coworker. Add-person and switch-person are one obvious tap from the chart view; current profile clearly marked. Delete is secondary-weighted (small, muted, confirm).
- **Share:** optional "Share this chart" → secret URL with the mode-aware copy above; "Copy link" confirms inline.

---
LAYOUT SUMMARY
- Landing = one birth-info form (date pre-focused) + bold "Load example (Einstein)"; headline "Your birth chart, explained in plain English," subtitle names free/no-signup.
- Chart view top→bottom: profile switcher (saved people) → houses-as-rows table → element bar → "Today" transit card → Share.
- Houses table: rows on desktop; reflows to one stacked card per house at ≤640px (no tiny scroll-table).
- Each placement chip = a tap-to-expand button (visible ⓘ/chevron) showing a 1–2 sentence reading; one pre-expanded in the Einstein demo.
- Privacy copy is mode-aware: "computed on your device" for compute; Share states birth info is sent to make the link.
- Time-unknown degrades gracefully (signs yes, houses/Asc grayed with a note); manual-coords escape hatch.
- Saved-people list always visible; add/switch easy, delete muted+confirmed.
- MOST IMPORTANT 5-second call: a one-click "Load example (Einstein)" that instantly renders a real EXPLAINED chart (table + open reading) — the cold visitor sees the explanation-first payoff before typing, which is the entire wedge over astro-seek.
