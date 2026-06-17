# Tomás — Round 4

Operations analyst, hard-skeptic on astrology (partner's into it). Tested cold over HTTP, desktop + 375px. Focus: privacy of birth-data entry + whether a layperson could read the output.

## R3 nit re-check
- Lowercase "house" vs heading "House": **PARTIALLY fixed.** Headers + ~43 body refs now read "1st House / 8th House" correctly, but 7 sentences still ship lowercase ("in their 1st house carries", "6th house introduces", "7th house brings", "9th house carries", "11th house"). The post-processor caught most, missed the karmic/overlay sentence template. Cosmetic, not a blocker — but it's the same nit, so the "forced one form everywhere" claim isn't fully true.

## Three questions

**Clarity — Yes.** "Compatibility, explained / How two charts get along — in plain English, free, no signup." A layperson gets it cold. PERSON A / PERSON B columns with Sun/Moon/Rising chips, then a baseline summary line ("30 harmonious aspects to 15 tensions — overall easy-flowing"), then plain-English aspect and house-overlay paragraphs. No jargon wall. Einstein Sun Pisces / Rising Cancer is astronomically sane.

**Value — No (for me; category-capped).** Today I solve this by... not solving it — I don't do astrology; my partner uses Co-Star/AstroSeek. For HER this clearly beats AstroSeek's cryptic glyph tables because every line is a readable sentence. For me there's nothing to save time on. Honest "No" by category, not by quality.

**Advocacy — 5/10.** Up from R3's 4. The +1 is earned, not polite: the share fine-print is now genuinely honest — "Creating a link stores the birth info on our server to make the URL work." That's the disclosure a fine-print reader needs, and it flipped my biggest trust objection. What still caps it at 5: it's astrology (my hard ceiling), and I'd want the server-storage line to also say how long data is kept / whether it can be deleted before I'd forward a link containing my partner's real birth time.

## Focus verifications
- (a) Share privacy copy: **YES, honest now.** Explicitly states birth info is stored on the server for sharing. Natal side also says "computed on your device. Saved charts stay in your browser only." Clear distinction.
- (b) Show-all aspect tail: **YES, readable.** Expanded 8.4k→20.8k chars, ~50 aspects; each row names specific planets + distinct orb (e.g. "Neptune trine South Node · 2.6° orb"), not identical lines.
- (c) Ordinals/casing: **partial** — see R3 re-check above (7 lowercase stragglers).
- (d) Share link: **YES.** Generates /chart/<opaque random id>, copies to clipboard (verified, not env-blocked), opens fresh in a clean context → renders both names + KEY ASPECTS, 200, zero errors. **No PII in URL** (no names/dates).
- (e) Layperson clarity + natal sanity: good; mobile 375px no overflow, zero JS errors.

## Dominant note
Trust copy is now solid and the share flow is clean — that's the real fix this round. Only residual: 7 lowercase "house" sentences (claimed fixed, not fully), and I'd add a data-retention/deletion line to the server-storage disclosure.

Movement: 4 → 5 (+1).

```json
{"tester": 0, "round": 4, "clarity": "Yes", "value": "No", "advocacy": 5, "topComplaints": ["7 sentences still read lowercase 'Nth house' vs heading 'Nth House' — post-processor claimed fixed but missed the karmic/overlay template", "server-storage disclosure is honest but says nothing about data retention/deletion — would want that before forwarding a partner's real birth time"], "priorConcernsAddressed": "some"}
```
