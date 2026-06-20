# Priya — round 1

**CLARITY:** Yes. "Your birth chart, explained in plain English. Free, no signup" + "NATAL CHART · PLAIN ENGLISH · NO SIGNUP" tells me exactly what it is in under 5s. Clean type, no marketing fluff, no modal, no cookie wall. Craft is genuinely good.

**VALUE:** No — for me personally. I consider astrology pseudoscience; I would never compute my own chart, so the output has zero utility to me. That's a category stance, not an app defect. Mechanically it does what it claims well.

**ADVOCACY:** 3/10. I will not recommend an astrology app — I'd get side-eye from my team. The 3 (not 0) reflects that the *engineering* is clean: no signup, provably client-side, no dark patterns. If a non-skeptic friend asked for an astrology tool I'd mention it, but I'd never bring it up unprompted.

**BIGGEST BLOCKER:** The category itself, for me. There is no craft fix that makes a hard astrology-skeptic advocate. Nothing on screen confused me; nothing felt broken.

**BIG 3 flow notes:**
- Discoverable? Yes. PRECISE | BIG 3 toggle sits at the top of the input panel, high contrast, can't miss it. Helper line "Know your Sun, Moon, and Rising (e.g. from Co-Star) but not your exact birth time? Estimate the rest." is a sharp explanation of when to use it.
- Loading state? Yes — saw "Estimating…" cue, ~0.9s in my run. Felt fast, not broken. No CLI would beat it for this task.
- Clearly an estimate? Yes, unambiguous. Black "ESTIMATED CHART" badge + "Date, time, and place were inferred from your big three — this is an approximation. Enter your full birth date, time, and place for the precise chart." Inferred location even tagged "New York, USA (reference)". No way to mistake it for exact.
- Signs honored? Yes, exactly. Picked Sun=Leo / Moon=Scorpio / Rising=Aquarius → result showed ☉ Sun Leo · House 7, ☽ Moon Scorpio, ↑ Aquarius rising. Correct.

**Data handling:** Inspected network. Birth data NEVER leaves the browser — only outbound request is `fonts.googleapis.com` CSS. "Your chart is computed on your device. Saved charts stay in your browser only." is truthful. This is the one thing I genuinely respect.

```json
{"tester": "Priya", "round": 1, "clarity": "Yes", "value": "No", "advocacy": 3, "topComplaints": ["Astrology category — non-fit for me, won't advocate regardless of craft", "Google Fonts is the only external call; trivially could self-host for a zero-third-party claim"], "priorConcernsAddressed": "n/a"}
```
