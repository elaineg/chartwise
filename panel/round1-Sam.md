# ChartWise — Round 1 panel verdict
**Tester:** Sam — Product Manager. Mobile-heavy (tested at 375px), curious about astrology, screenshots-and-shares everything, won't debug.

## 1) Advocacy: 7/10
I'd genuinely bring this up in a group chat — "type your birthday, get your chart in plain English, free, no login." The big-three card (e.g. "Cancer rising / ☉ Pisces Sun / ☽ Sagittarius Moon") is clean and screenshot-worthy, and the share link actually works (opens a 200 page showing the same chart + a "Create your own chart →" CTA — that's a real viral loop). But it's a 7, not a 9, because the part that makes me look interesting is *buried*. Below the nice big-three card the whole page is a House 1–12 wall of jargon ("SIGN / PLACEMENTS / Uranus℞") with every plain-English line collapsed behind a "▾" I have to tap individually. The good copy ("Cancer rising gives you a warm, receptive, protective presence — others feel nurtured around you") is exactly what I'd screenshot — but I had to dig for it, and there's no single clean shareable image, just a long technical scroll.

## 2) Value: Yes
Today I'd Google "what's my rising sign" or open Co-Star/astro-seek, which throw confusing chart wheels at me. This gives me a plain-English big-three instantly, lets me save my partner's + friends' charts side by side, and hands me a working share link. That beats my current habit for the "fun conversation starter" job.

## 3) Clarity: Yes
H1 "Your birth chart, explained in plain English" + "Free, no signup" + a prominent "Load example (Einstein)" told me what it is and what to do in well under 30s. No confusion.

## Likes
- Plain-English big-three card is shareable and the headline copy is great.
- **Mobile entry was NOT fiddly** (the thing I expected to quit on): native date/time pickers, name optional, and the city field has real autocomplete ("New York" → "New York City, NY, US"). Smooth.
- Multi-profile works — saved Einstein + my own chart as chips, no signup.
- Share link verified: generates a /chart/ URL that loads the full chart for a friend.

## Defects / friction (mobile)
- **Explanations collapsed by default.** Below the big-three it's a jargon-heavy House 1–12 list; the readable sentences are hidden behind per-row "▾" carets. As a screenshotter I want them open by default (or a "show all" / one clean shareable summary card). This is what holds advocacy at 7.
- Daily transit section ("Mars in Taurus is visiting your natal Neptune's sign — themes of mars and neptune blend right now") reads templated/generic — not quite share-worthy, says little I'd repeat.
- "Copy link" button click didn't fire cleanly for me (link is still selectable in the field). Minor — note: clipboard read is blocked in my test env, so I'm not calling this a hard regression, but the click should give visible "Copied!" feedback.

```json
{"tester": 0, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 7, "topComplaints": ["Plain-English explanations are collapsed behind per-row ▾ carets; the screenshot-worthy copy is buried under a House 1-12 jargon wall", "No single clean shareable summary card / no 'expand all'", "Daily transit copy reads templated and generic"], "priorConcernsAddressed": "n/a"}
```
