# Round 8 — Tomás (Ops analyst, hard-skeptic, audience non-fit)

**Value: No** (for me personally — astrology is harmless nonsense; my partner is the user).
**Clarity: Yes** — within 30s I'd tell a friend: "Free no-signup tool that takes a birth
date/time/place and explains your natal chart in plain English." The H1 "explained in plain
English," "Free, no signup," and "Your chart is computed on your device. Saved charts stay
in your browser only" did the heavy lifting — exactly what a privacy-wary person wants to see.

## 5 QA items (anchor: 1998-08-08, 16:30, Jiangmen China — computed clean, 0 console errors)
1. North/South Nodes — PASS. Shows "North Node 2°07' Virgo" / "South Node 2°07' Pisces" with
   own sign + degree, not just a house. Good.
2. Black Moon Lilith — PASS. Appears as "Lilith 26°25' Libra" in House 10 region. Present.
3. Arcminutes — PASS. Everywhere: Sun 15°36' Leo, Jupiter 27°20' Pisces℞, etc. No truncation.
4. Element-distribution basis — PASS. "Based on 11 placements: Sun, Moon, Mercury…Chiron."
   Clear and honest about what it counts. Appreciated as a fine-print reader.
5. "Save as image" — GONE. No such button anywhere; replaced by "Create share link." Good.

## Trust / clarity notes (my real lens)
- Privacy story is strong: client-side, no signup, no data sent. This is the ONE thing that
  would let me hand it to my partner without worry.
- Friction: place field REQUIRES picking from the autocomplete; typing "Jiangmen China" and
  hitting Compute throws "Please select a place from the suggestions." A layperson may not
  realize they must wait for and click the dropdown. Minor but real first-run snag.
- Layperson readability: the plain-English blurbs are genuinely understandable; my partner
  could read them. The houses table is dense but legible.

## Three questions
1. Use & advocate? I won't use it (non-fit), but I'd point my partner to it — its privacy
   + plain-English framing is its only competitor differentiator I actually trust.
2. Advocacy: **6**
3. Single most important fix: make the place field forgiving — auto-resolve a typed
   "City, Country" on Compute instead of hard-blocking until a suggestion is clicked.

```json
{"tester": 9, "round": 8, "clarity": "Yes", "value": "No", "advocacy": 6, "topComplaints": ["Place field hard-blocks unless you click an autocomplete suggestion", "Houses table is dense for a layperson"], "priorConcernsAddressed": "all"}
```
