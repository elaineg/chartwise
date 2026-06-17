# chartwise — Round 12 — Tomás (ops analyst, HARD-SKEPTIC non-fit, Edge/Windows)

## Re-check of my prior round-11 concerns
- I praised the craft in r11; my standing reservation is purely "I personally don't believe in astrology."
- Privacy fine print (my main lens): STILL EXCELLENT. Result page states "Your chart is computed
  on your device — nothing is sent anywhere," "Saved charts stay in your browser only," and the
  share control honestly warns "Creating a share link sends this chart's birth info to our server
  so anyone with the link can view the same chart." That opt-in honesty is exactly what a fine-print
  reader wants. No silent data egress. Addressed/maintained.

## RE-JUDGE THIS ROUND
(a) MOBILE summary-first fix (390px): WORKS. On the example chart the very top of the result is the
    big-three card (Cancer rising / Sun Pisces H10 / Moon Sagittarius), then ELEMENT DISTRIBUTION
    grid (Earth 5 / Fire 4 / Air 1 / Water 1), then "Today's Sky" transit card — all above the
    per-placement readings and the Houses table (Houses/Placements stack measured ~y4100+, far below).
    No house cards sit above the summary. Reorder confirmed on narrow viewport.
(b) Monochrome SSENSE chart: genuinely sharp. Clean editorial type, restrained grayscale bars, plain-
    English section labels (CORE IDENTITY, EMOTIONAL WORLD, HOW OTHERS SEE YOU; houses tagged
    "Communication / Home & roots / Work & health"). A layperson — my partner — would understand the
    output cold. The craft is 9-tier; my advocacy is capped only by my hard non-fit, not by the app.

## The 3 questions (brutally honest, as Tomás)
1. VALUE — No (for ME). I'd never use a birth chart; my "tool today" is "ignore astrology." Nothing
   here changes that. It IS clearly valuable for someone who's into it — but that isn't me.
2. CLARITY — Yes. Within 30s: "NATAL CHART · PLAIN ENGLISH · NO SIGNUP" + "Your birth chart, explained
   in plain English" tells me exactly what it is and who it's for. Output is legible to a layperson.
3. ADVOCACY — 6. I'd recommend it to my partner the moment astrology came up ("free, no signup, the
   privacy is actually honest, and it reads in plain English"), but I'd never bring it up unprompted —
   it solves a problem I don't have. The reorder and the trust copy are flawless; the ceiling is me.

Notes: "Copy/share" verified visually (button fires, copy is a separate explicit opt-in) — clipboard
read is blocked in my headless test env, not an app bug. 0 console errors across the flow.

```json
{"tester": 12, "round": 12, "clarity": "Yes", "value": "No", "advocacy": 6, "topComplaints": ["I'm a hard non-fit — astrology solves no problem I have, so I'd never raise it unprompted", "Share-link path sends birth data to a server (clearly disclosed/opt-in, but a privacy-wary user will avoid that one feature)"], "priorConcernsAddressed": "all"}
```
