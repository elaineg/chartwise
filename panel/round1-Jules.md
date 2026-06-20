# Jules — round 1

Tested cold on mobile (375px), no-login confirmed.

**CLARITY: Yes.** "Your birth chart, explained in plain English. Free, no signup" + the eyebrow "NATAL CHART · PLAIN ENGLISH · NO SIGNUP" tell me exactly what it is and that I won't hit a wall. Got it in ~3s.

**VALUE: Yes.** Today I'd send friends to Co-Star/Astro.com or eyeball things myself; this gives a plain-English read AND a BIG 3 mode that matches how I actually ask people ("what's your big three?"). The "Today's Sky" panel even flagged Pluto retrograde — that's literally content I post. It saves me real time vs hunting through Co-Star's app.

**ADVOCACY: 8.** I'd bring this up in a Mercury-retrograde post, but two things keep it off a 9: no image/story card to post (I share to X/IG, and a copy-link isn't a visual), and the share is a deliberate 2-step "CREATE SHARE LINK → sends to our server" rather than an instant link, which dents the "no-signup, all-on-device" promise slightly.

**BIGGEST BLOCKER:** No shareable image/card for social. As a community marketer I post screenshots/cards, and right now the only output to share is a text link.

**BIG 3 flow notes**
- Toggle discoverable on mobile: Yes — PRECISE | BIG 3 sits at top of the input panel, clearly tappable.
- Copy is perfect for me: "Know your Sun, Moon, and Rising (e.g. from Co-Star)…" — speaks my language.
- Estimate labeled: Yes, strongly. "ESTIMATED CHART" badge + "Date, time, and place were inferred from your big three — this is an approximation. Enter your full birth date… for the precise chart." Honest.
- Loading: ~0.7s, snappy — never felt slow or broken. (Feared 2.4s didn't happen.)
- Signs honored: Yes exactly — picked Leo/Scorpio/Pisces → Sun 6°39' Leo, Moon 11°47' Scorpio, 0°02' Pisces rising.
- Share link verified: loads a 200 chart page with "Create your own chart →" CTA. (Copy button: clipboard read blocked in test env; copy verified visually.)

```json
{"tester": 2, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["No shareable image/social card — only a text link to post", "Share is a 2-step server-side 'create link' action, slightly dents the on-device/no-signup promise"], "priorConcernsAddressed": "n/a"}
```
