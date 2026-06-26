- Persona: Priya (senior backend eng, hard-skeptic astrology non-fit, inspects network tab)

- Clarity (purpose clear in 5s): Yes. H1 "Your birth chart, explained in plain English" + eyebrow "Natal chart · Plain English · No signup" + the privacy line nail what it is and who it's for in one glance. Big 3 vs Precise toggle is self-explanatory.

- Value (would you use it): No. It's an astrology tool — pseudoscience to me; I'd never compute my chart. The CRAFT is genuinely good, but the category is a hard non-fit, so personal value is zero.

- Advocacy (0-10): 3 — well-built and honest, but I won't recommend an astrology app; the 3 (not lower) reflects that I'd respect it enough to send to a friend who's *into* astrology.

- In-audience: no (hard-skeptic non-fit)

- What worked:
  - Loads in ~2ms local, no signup, no cookie wall. Respects my time like a CLI would.
  - Privacy claim mostly holds: chart math runs CLIENT-SIDE (verified — heavy astro lib in browser chunk, /chart/{token} reloads compute on device). Cities autocomplete is a LOCAL dataset, not a 3rd-party geocoder leaking my city. Good.
  - Big3 flow round-trips: POST /api/chart-share → token → /chart/{token} reloads name into <title>/OG, isEstimate flag persists ("Estimated Chart" badge, role=status, + transparent "How this works: we searched {year}…" methodology strip). Honest about being an estimate.
  - Spacing/padding clean: consistent --sp scale (12px input pad, 24px field gaps, badge padding 24px all sides). No cramped boxes, no text touching edges.
  - Diana × Charles synastry example has real birth data, computes aspects + a Compatibility Summary, and shares.

- What broke / trust nitpicks (none P0):
  - TRUST ASTERISK: homepage says "Saved charts stay in your browser only," but SAVE/SHARE POSTs full birth data (name, date/time, lat/lon) to /api/chart-share to mint a server-stored /chart/{token}. That's the normal cost of a share link, but the copy oversells "browser only" — a skeptic notices the gap. Say "shared charts are stored on our server."
  - Typing a birth city DOES hit /api/cities?q=… server-side. Minor, but it's a network call the "computed on your device" framing glosses over.
  - SSR title bug on SYNASTRY shares: <title> renders "Birth chart's birth chart, explained" instead of the two names — sloppy for a share/OG preview.
  - Shared pages SSR only the name; chart renders after client fetch, so a brief empty flash. Acceptable but noticeable.
