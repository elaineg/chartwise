# Tomás — Round 5

Ops analyst, hard-skeptic on astrology (partner's into it). Tested cold on Edge-equivalent desktop 1280px + 375px mobile. Carried non-gating.

## Prior concerns re-checked
- **Data-retention/deletion line (my round-4 ask):** NOT addressed. The share fine print is honest — "Creating a link stores the birth info on our server to make the URL work" — and the on-device line "Your chart is computed on your device. Saved charts stay in your browser only" is good. But there's still nothing saying how long the shared birth-data is kept on the server, or whether/how I can delete it. For a wary person sharing a partner's birth time, "you can delete this / it expires in X" is the missing reassurance.
- **~7 lowercase "Nth house" stragglers:** NOT fixed. Exactly the same ~7 still live in the HOUSE OVERLAY of the compatibility view, all in the Node/Lilith/Chiron blurbs: "Your North Node in their 1st house", "...their 6th house" (Lilith), "...their 7th house" (South Node), and their mirror lines. Meanwhile the Mars/Mercury overlay blurbs use "8th House"/"6th House". Same section, inconsistent. Natal side is now 100% clean (0 lowercase "house", all "House").

## New fixes verified
- **Directional + name-bound aspects:** YES, genuinely fixed. Zero "the X person" phrasings. Every aspect names both people and reads directionally ("Albert Einstein's Mars is energized by Michelle Obama's Sun"). Reversed pairs read differently. Only 1 duplicated blurb across all 50 (Uranus-in-4th and Pluto-in-4th share the same overlay sentence — both legitimately the 4th house, but a layperson sees two identical paragraphs back-to-back; minor).
- **Honest-framing line:** present on compat — "For insight and fun — a lens on the dynamic, not a prediction." As a skeptic, this is the single best thing on the page: it stops the app from pretending to predict, so I don't roll my eyes. It earns a notch of trust.
- **Share button loading/disabled state:** couldn't fully exercise it (the example comparison routes to "save a chart first"), but no JS errors fired.

## Mobile (375px)
Clean. No horizontal overflow (scrollWidth==clientWidth on both views), no clipping, no double-render, no overlap. Aspect list is a long scroll but readable.

## Three questions
**CLARITY — Yes.** "Your birth chart, explained in plain English. Free, no signup." plus "NATAL CHART · PLAIN ENGLISH · NO SIGNUP" — I'd tell a friend "it turns a birth chart into readable English, free, no login." My partner (the actual audience) could follow the synastry output: it names both people and explains the dynamic in sentences, not jargon.

**VALUE — No.** I don't do this today and never will — I think it's harmless nonsense. For me personally there's no time saved because the task isn't one I have. For my partner it's a clean free alternative to the paywalled astrology sites she uses; for ME it stays No on category grounds.

**ADVOCACY — 6/10.** Capped by my category skepticism — I won't bring up an astrology app unprompted. The honesty improvements (server-storage disclosure, "not a prediction" line, on-device chart compute) genuinely raised this above last round's 5: I'd now feel okay forwarding it to my partner without warning her it's sketchy. Two things keep it from going higher even within my ceiling: (1) still no retention/deletion line for the data I'm told goes to a server when I share, and (2) the ~7 lowercase "house" stragglers I flagged last round are untouched in the overlay — when the fix note says caps were addressed and I find the exact same count, it dents my confidence in the polish.

```json
{"tester": 9, "round": 5, "clarity": "Yes", "value": "No", "advocacy": 6, "topComplaints": ["No data-retention/deletion line for shared birth data stored on the server (my round-4 ask, still unaddressed)", "~7 lowercase 'Nth house' stragglers still in compat HOUSE OVERLAY (Node/Lilith/Chiron blurbs) — same count as round 4, inconsistent with adjacent 'House' blurbs"], "priorConcernsAddressed": "some"}
```
