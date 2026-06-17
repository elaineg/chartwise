# Sam — Round 1 (synastry)

**Persona:** Sam, PM, mobile-first between meetings, curious about astrology, screenshots clean stuff into chats, won't debug.
**Tested:** localhost:3099 cold, mobile 375px + desktop 1280px.

## 1. What I tried & what happened
Landed, tapped "Load example (Einstein)" — chart appeared in ~1.5s, clean, no errors. Scrolled and immediately spotted a "**Compare two people →**" button. **Discovery: under 5 seconds**, and it sits ABOVE the "Today's Sky" transit card exactly as promised (mobile y=1794 vs 1913; desktop y=827 vs 961). Tapped it: compatibility view opened in ~1.3s, auto-loaded **Einstein × Michelle Obama** — two genuinely distinct charts. 0 console errors at both widths.

## 2. What worked / what confused me
WORKED:
- Big-three side-by-side (Person A / Person B, Sun/Moon/Rising) is clean and instantly screenshot-worthy on mobile.
- Element-distribution bars per person — readable, "Based on 11 placements" honest footnote.
- Summary is HONEST: "30 harmony · 15 tension · 5 conjunction" with a plain sentence, **NO fake % match score**. This is the right call and I'd trust it.
- House overlay ("Where each person's planets fall in the other's chart") in plain English.
- Top "key aspects" have REAL personalized blurbs (Venus–Saturn, Mercury–Sun, Moon–Saturn) that sound like actual synastry.
- Natal chart still works — accordion expands fine. Not broken.

CONFUSED / WEAK:
- **~50 stacked aspect cards** and only **14 unique blurbs out of 53** — the long tail is 3 copy-pasted templates ("A sextile between these bodies creates an easy cooperative opportunity…") repeated a dozen times each. Scrolling becomes a wall of identical text. Kills the "ooh interesting" screenshot moment past the first card.
- **How do I compare MY partner?** The only way to set Person B is the "Saved charts" list, which just has "Albert Einstein". There's no inline "add/pick Person B" in the compare view and no hint that I must compute + save a 2nd chart first. As a won't-debug PM I'd poke twice and bail to the example. That's the dealbreaker for repeat use.
- No "share this comparison" button (natal chart has one). I'd just screenshot — fine — but inconsistent.

## 3. Would I use / recommend it?
The example pair is fun and I'd screenshot the big-three + summary into a group chat once. But the feature I actually want — me × my girlfriend — is hidden behind an unexplained save-a-chart step, and the aspect list is repetitive filler. Curious-yes, sticky-no.

- **ADVOCACY: 6/10** — discoverable, honest, clean big-three; held back by hidden Person-B flow + repetitive blurbs.
- **VALUE: Marginal** — beats nothing I use today (I'd otherwise Google "X and Y compatibility"), but only if I can actually load my own people easily, which I couldn't figure out fast.
- **CLARITY: Partially** — what it shows is clear in 5s; HOW to make it about my own pair is not.
- **DOMINANT complaint:** Setting Person B (my partner) is hidden behind an unexplained "save a chart" step, so I can only ever see the demo pair.

```json
{"tester": 0, "round": 1, "clarity": "Partially", "value": "Marginal", "advocacy": 6, "topComplaints": ["No clear way to set Person B / compare my own partner — only the saved Einstein chart is selectable, no inline picker or hint", "~50 aspect cards but only 14 unique blurbs; long tail is repeated generic templates", "No 'share comparison' button (natal chart has one) — inconsistent"], "priorConcernsAddressed": "n/a"}
```
