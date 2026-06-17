# ChartWise — Round 1 panel verdict
**Tester:** Jules — Content & community marketer (medium tech, mobile-first; Notion/Buffer/Mailchimp/Figma; curious about astrology, posts about Mercury retrograde + asks people their big three). Tested at 375px mobile viewport.

## 1) Advocacy: 8/10 — yes, I'd actually share it
This is squarely my thing and it nails the bar I judge hardest: free, no login, fast, and mobile-first. The headline "Your birth chart, explained in plain English" plus "Free, no signup" told me what it is and that I don't have to make an account — that alone is share-worthy in my circles vs the usual ad-choked astro sites. The plain-English placement lines are the killer feature: "Daily routine and caring for others gives you emotional grounding; when your body is well, you are well" is something I'd literally screenshot and post. The **Create share link** works (generated /chart/<id>, opened cleanly in a fresh browser with a "Create your own chart →" CTA = built-in viral loop), and "Today's Sky" with the live transits + retrograde callout is a real reason to come back daily/post a Mercury-retrograde story.
Why not 9–10: (a) no one-tap "share to X/LinkedIn" or image/PNG export — as a marketer I share a clean graphic, not a raw link, so I'd have to screenshot manually; (b) share link routes through their server (the privacy copy is honest about it, but it slightly dents the "all on your device" pitch); (c) no chart wheel graphic — text-only is great for reading but less screenshot-bait.

## 2) Value: Yes
Today I'd use astro-seek or co-star/an app that nags me to sign up. This is faster, free, no login, and the explanations are actually readable instead of jargon. I'd genuinely run friends' big-three on it repeatedly, and the daily-transit hook gives me recurring post fuel.

## 3) Clarity: Yes
Within ~10 seconds I knew exactly what it does and how: headline + subhead + a giant "Load example (Einstein)" button and a 3-field form (date/time/place). Zero confusion. "Birth time → Unknown" checkbox and "City not found? Enter coordinates manually" preempt the two questions I'd have had.

## Likes
- No-signup, fully client-side compute message ("computed on your device") — exactly my allergy, removed.
- Plain-English placement + house explanations (legible, postable).
- "Today's Sky" daily transits + "FOR YOUR CHART" personalized aspects + retrograde highlight = daily-return + social-post hook.
- City autocomplete returns real geocoded options; Einstein example loads instantly; share link verified working in a clean context.
- Element distribution bars and clean dark mobile layout — looks good in a screenshot.

## Defects / mobile nits
- **No native social share / image export.** Marketers share graphics, not URLs. A "Share to X / copy image" would push this to a 9.
- **No chart wheel.** Text-only is readable but less screenshot-bait for a story post.
- City autocomplete ordered "Austin, AR" above "Austin, TX" — common cities aren't prioritized, easy to pick the wrong one on a small screen.
- Share link hits their server (disclosed honestly), a minor wrinkle vs the otherwise 100%-on-device promise.
- Copy-link: clipboard read came back empty in my test env (headless), but the click fired and the URL generated — copy verified visually; clipboard read blocked in test env, NOT a product bug.

```json
{"tester": "Jules", "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["No native social share / image export — marketers post graphics not links", "No chart wheel graphic for screenshot-worthy story posts", "City autocomplete doesn't prioritize the common big city (Austin AR above Austin TX)"], "priorConcernsAddressed": "n/a"}
```
