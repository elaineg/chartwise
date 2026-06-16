# chartwise — Problem (advisory problem-check, PRIORITY-LANE FORCED BUILD)

Purpose: an explanation-first natal-chart web app — free, no signup, 100% client-side
compute — that EXPLAINS your chart in plain English where astro-seek makes you decode it.

## 1. WHO / WHEN / HOW OFTEN (target persona + recurrence honesty)
- WHO: the curious astrology-interested computer worker (marketers/designers/PMs skew here)
  who knows their Sun sign and wants to understand the rest without learning to read a wheel,
  PLUS friends-of-friends moments ("what's your big three?") that recur socially.
- SITUATION: someone references rising signs / Mercury retrograde in Slack or at dinner; the
  person opens a tool to see what it means FOR THEM, cold, on phone or laptop.
- HOW OFTEN — honest read against the 3 gates:
  - User-fit: PASS — primary user is a computer worker in a browser; no install, no login.
  - Legibility: PASS — houses-as-rows table + 1–2 sentence blurbs are legible in 30s.
  - Recurrence: the WEAK gate. A person's OWN natal chart is computed once (P5 one-and-done
    risk). Three mitigations make it recurring, and the spec must lead with them:
    (a) MULTI-PERSON charting — generate + save profiles for partners, friends, new dates,
        coworkers; a social/curious user does this many times a month;
    (b) CURRENT-SKY / TRANSIT reading — changes DAILY (today's Moon/retrogrades vs your
        chart), the genuine return-visit hook that turns a one-shot into a habit;
    (c) re-reading / sharing explanations as conversations come up.
  Advisory risk: without the transit + multi-person hooks this is a P5 one-and-done. They are
  core MVP (design features 1 & 5), so recurrence is mitigated but remains the thing to nail.

## 2. BEST ALTERNATIVE + WHY CHARTWISE WINS
- astro-seek.com (primary): free + comprehensive but DATA-DENSE; confirmed to "assume
  astrological literacy," present positions/aspects as undefined reference data, and overwhelm
  beginners — you decode the wheel yourself. astro.com / Cafe Astrology = wordy walls of text.
  co-star / the-pattern = polished but PAYWALLED + opaque (black-box, no chart transparency).
- WHY WE WIN: free + no-login + EXPLANATION-FIRST. A clean houses-as-rows table (the
  legibility win over a scattered wheel) + concise per-placement blurbs + element counts +
  daily transit reading. We EXPLAIN where astro-seek makes you hunt; we are FREE/transparent
  where co-star is paid/opaque. That gap is structural, not a settings toggle astro-seek will
  flip (its whole identity is the dense professional wheel).

## 3. TIME/VALUE SAVED + LEGIBILITY
- Per use: replaces 10–20 min of cross-referencing astro-seek's positions against separate
  "planet in house" reference pages — chartwise inlines the meaning next to each placement.
- Legibility (cold, 30s): paste birthday + time + place → named profile → a labeled table
  with plain-English rows. A curious non-astrologer gets value immediately. PASS.

## 4. VERDICT
BUILD (forced priority lane). Spec should LEAD with the differentiator: an explanation-first
natal chart — clean houses-as-rows table + concise plain-English blurbs + a DAILY current-sky
transit reading — free, no login, fully client-side, where astro-seek makes you decode the
wheel and co-star hides it behind a paywall. Recurrence rests on transit (daily) + multi-person
charting; build those as first-class, not afterthoughts.
