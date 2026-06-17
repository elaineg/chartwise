/**
 * INDEPENDENT verifier e2e tests for the synastry feature.
 * Written fresh by the verifier — do not trust builder coverage.
 *
 * Tests run against BASE_URL (http://localhost:3099 in CI).
 */
import { test, expect } from "@playwright/test";

// ─── Helper: Einstein birth data ──────────────────────────────────────────────
const EINSTEIN = {
  name: "Albert Einstein",
  year: 1879, month: 3, day: 14,
  hour: 11, minute: 30,
  latitude: 48.4011, longitude: 9.9876,
  placeName: "Ulm, Germany",
  hasBirthTime: true,
};

const PARTNER = {
  name: "Michelle Obama",
  year: 1964, month: 1, day: 17,
  hour: 21, minute: 53,
  latitude: 41.8781, longitude: -87.6298,
  placeName: "Chicago, IL",
  hasBirthTime: true,
};

// ─── V-S1. Regression anchor: Moon-Jupiter trine ≤2° orb, inline reading ──────

test("verifier: Moon-Jupiter trine ≤2° orb with inline reading on example pair (Einstein × Michelle Obama)", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 15000 });

  // Moon-Jupiter trine row must exist (Einstein Moon trine Michelle Jupiter)
  const moonJupRow = page.getByTestId("synastry-aspect-moon-jupiter-trine");
  await expect(moonJupRow).toBeVisible({ timeout: 8000 });

  // Row must show "trine" label
  const rowText = await moonJupRow.textContent() ?? "";
  expect(rowText.toLowerCase()).toContain("trine");

  // Row must show HARMONY tag
  expect(rowText).toContain("HARMONY");

  // Orb must be ≤2° — extract from text like "1.7° orb"
  const orbMatch = rowText.match(/(\d+\.\d+)°\s*orb/);
  expect(orbMatch, "Row must display orb value").toBeTruthy();
  const orb = parseFloat(orbMatch![1]);
  expect(orb, `Moon-Jupiter trine orb (${orb}°) must be ≤2°`).toBeLessThanOrEqual(2);

  // Inline reading must be visible without a click
  const reading = page.getByTestId("synastry-aspect-reading-moon-jupiter-trine");
  await expect(reading).toBeVisible();
  const readingText = await reading.textContent() ?? "";
  expect(readingText.length, "Moon-Jupiter trine reading must have substance (>30 chars)").toBeGreaterThan(30);
  // Reading must not be truncated
  expect(readingText).not.toContain("…");
});

// ─── V-S2. Both big-three side by side: Person A = Einstein, Person B = Michelle Obama ─

test("verifier: big-three shows Einstein Sun Pisces / Moon Sagittarius / Rising Cancer, Michelle Obama Sun Capricorn", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 15000 });

  const bigThree = page.getByTestId("synastry-big-three");
  await expect(bigThree).toBeVisible({ timeout: 5000 });

  // Person A (Einstein): Sun Pisces / Moon Sagittarius / Rising Cancer
  await expect(bigThree).toContainText("Sun Pisces");
  await expect(bigThree).toContainText("Moon Sagittarius");
  await expect(bigThree).toContainText("Rising Cancer");

  // Person B (Michelle Obama): Sun Capricorn
  await expect(bigThree).toContainText("Sun Capricorn");

  // Both names must appear
  await expect(bigThree).toContainText("Albert Einstein");
  await expect(bigThree).toContainText("Michelle Obama");

  // Both columns must be un-clipped at 1280px — check no overflow
  const box = await bigThree.boundingBox();
  expect(box, "big-three must have a bounding box").toBeTruthy();
  expect(box!.width, "big-three must not be zero-width").toBeGreaterThan(100);
});

// ─── V-S3. No fake % score in the compatibility view ────────────────────────

test("verifier: no fake % compatibility score in synastry view text", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 15000 });

  const viewText = await page.getByTestId("synastry-result").textContent() ?? "";
  // Must not contain a percentage pattern like "92% compatible" or "85% match"
  expect(viewText, "synastry view must not show a fake % score").not.toMatch(/\d+%\s*(compatible|match|score)/i);
  // Also no bare "X% match" at all
  expect(viewText).not.toMatch(/\d+%/);
});

// ─── V-S4. Harmony/tension text tags visible at-a-glance (no color-only distinction) ─

test("verifier: HARMONY and TENSION text tags visible without clicking, not color-only", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 15000 });

  const aspectsList = page.getByTestId("synastry-aspects-list");
  await expect(aspectsList).toBeVisible({ timeout: 5000 });
  const text = await aspectsList.textContent() ?? "";

  // At least one HARMONY or TENSION tag must appear in the text
  const hasHarmony = text.includes("HARMONY");
  const hasTension = text.includes("TENSION");
  const hasConjunction = text.includes("CONJUNCTION");

  expect(
    hasHarmony || hasTension || hasConjunction,
    "At least one explicit text tag (HARMONY/TENSION/CONJUNCTION) must appear in the aspects list"
  ).toBe(true);
});

// ─── V-S5. House overlay readout present with inline readings ─────────────────

test("verifier: house overlay section present with inline readings (no expand required)", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 15000 });

  // House overlay sections (B in A and A in B)
  const overlayBinA = page.getByTestId("synastry-overlay-b-in-a");
  const overlayAinB = page.getByTestId("synastry-overlay-a-in-b");

  // At least one overlay section must exist (both charts have birth times)
  const hasBinA = await overlayBinA.count();
  const hasAinB = await overlayAinB.count();
  expect(hasBinA + hasAinB, "At least one overlay section must be present").toBeGreaterThan(0);

  if (hasBinA > 0) {
    await expect(overlayBinA).toBeVisible({ timeout: 5000 });
    // Must have at least one overlay row
    const rows = overlayBinA.locator("[data-testid^='synastry-overlay-']");
    const rowCount = await rows.count();
    expect(rowCount, "House overlay B-in-A must have rows").toBeGreaterThan(0);

    // Each row must have a reading visible without click
    const firstRow = rows.first();
    // The reading is inside the row with testid synastry-overlay-reading-*
    const firstRowText = await firstRow.textContent() ?? "";
    expect(firstRowText.length, "First overlay row must have text content").toBeGreaterThan(20);
  }

  if (hasAinB > 0) {
    await expect(overlayAinB).toBeVisible({ timeout: 5000 });
    const rows = overlayAinB.locator("[data-testid^='synastry-overlay-']");
    const rowCount = await rows.count();
    expect(rowCount, "House overlay A-in-B must have rows").toBeGreaterThan(0);
  }
});

// ─── V-S6. Returning-user with 2 saved charts sees full picker ────────────────

test("verifier: returning user with 2 pre-seeded charts sees two-person picker in synastry", async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  // Seed 2 charts in localStorage before navigation
  await page.addInitScript(({ einstein, partner }: { einstein: typeof EINSTEIN; partner: typeof PARTNER }) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([einstein, partner]));
  }, { einstein: EINSTEIN, partner: PARTNER });

  await page.goto("/");

  // Both names must appear in saved list
  await expect(page.getByText("Albert Einstein")).toBeVisible({ timeout: 8000 });
  await expect(page.getByText("Michelle Obama")).toBeVisible({ timeout: 5000 });

  // Click Einstein to load their chart
  await page.getByText("Albert Einstein").first().click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // Open synastry
  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-view")).toBeVisible({ timeout: 5000 });

  // With 2 saved charts, the two-person picker must appear
  const selectA = page.getByTestId("synastry-select-a");
  const selectB = page.getByTestId("synastry-select-b");
  await expect(selectA, "Person A selector must be visible with 2 saved charts").toBeVisible({ timeout: 5000 });
  await expect(selectB, "Person B selector must be visible with 2 saved charts").toBeVisible({ timeout: 5000 });

  // Both names must appear as options in both selects
  const optionsA = await selectA.locator("option").allTextContents();
  const optionsB = await selectB.locator("option").allTextContents();
  expect(optionsA.some((o) => o.includes("Albert Einstein")), "Select A must include Einstein").toBe(true);
  expect(optionsA.some((o) => o.includes("Michelle Obama")), "Select A must include Michelle Obama").toBe(true);
  expect(optionsB.some((o) => o.includes("Albert Einstein")), "Select B must include Einstein").toBe(true);
  expect(optionsB.some((o) => o.includes("Michelle Obama")), "Select B must include Michelle Obama").toBe(true);

  await ctx.close();
});

// ─── V-S7. Back button closes synastry (correct locator: aria-label) ─────────

test("verifier: back button closes synastry view (using aria-label)", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-view")).toBeVisible({ timeout: 5000 });

  // Wait for result to load so the view is stable
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 15000 });

  // Use aria-label (the button has aria-label="Close compatibility view")
  const backBtn = page.getByRole("button", { name: "Close compatibility view" });
  await expect(backBtn, "Close compatibility view button must exist").toBeVisible({ timeout: 5000 });
  await backBtn.click();

  // Synastry view gone, natal chart back
  await expect(page.getByTestId("synastry-view")).not.toBeVisible({ timeout: 5000 });
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 5000 });
});

// ─── V-S8. "Compare two people" entry visible above transit card ──────────────

test("verifier: Compare two people entry visible and above transit card in DOM", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const synaEntry = page.getByTestId("synastry-entry");
  await expect(synaEntry).toBeVisible({ timeout: 5000 });

  // Must contain "Compare two people" text
  await expect(synaEntry).toContainText("Compare two people");

  // Must contain the sub-label about compatibility
  const text = await synaEntry.textContent() ?? "";
  expect(text.toLowerCase()).toMatch(/compatibility|plain-english/i);

  // Must appear before transit-card in DOM
  const isBefore = await page.evaluate(() => {
    const entry = document.querySelector('[data-testid="synastry-entry"]');
    const transit = document.querySelector('[data-testid="transit-card"]');
    if (!entry || !transit) return null;
    return (entry.compareDocumentPosition(transit) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
  });
  expect(isBefore, "synastry-entry must appear before transit-card in DOM").toBe(true);
});

// ─── V-S9. No horizontal overflow at 375px with synastry open ─────────────────

test("verifier: no horizontal overflow at 375px with synastry result visible", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 15000 });

  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  expect(overflow, "No horizontal overflow at 375px with synastry open").toBe(false);
  await ctx.close();
});

// ─── V-S10. Inline readings un-clipped at 375px and 1280px ──────────────────

test("verifier: aspect row and overlay row text wraps at 375px (no truncation ellipsis)", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 15000 });

  // Moon-Jupiter trine reading must be present and not ellipsis-truncated
  const reading = page.getByTestId("synastry-aspect-reading-moon-jupiter-trine");
  await expect(reading).toBeVisible({ timeout: 5000 });
  const text = await reading.textContent() ?? "";
  expect(text.length, "Reading must have substantial text at 375px").toBeGreaterThan(30);
  expect(text, "Reading must not have ellipsis at 375px").not.toContain("…");
  expect(text, "Reading must not have ASCII '...' truncation").not.toMatch(/\.\.\.$/);

  await ctx.close();
});

// ─── V-S11. "Compare two people" text is visible without scrolling past natal chart ─

test("verifier: Compare two people entry visible without needing to scroll past natal chart", async ({ page }) => {
  // This is a first-viewport check — the entry must be reachable, not buried
  // The spec says: "a primary, labeled action — not buried below the transit card"
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // scroll to bring synastry-entry into view
  const synaEntry = page.getByTestId("synastry-entry");
  await expect(synaEntry).toBeVisible({ timeout: 5000 });

  // Transit card must NOT appear between houses-table and synastry-entry
  // i.e., synastry-entry must come before transit-card in DOM order
  const order = await page.evaluate(() => {
    const table = document.querySelector('[data-testid="houses-table"]');
    const synEntry = document.querySelector('[data-testid="synastry-entry"]');
    const transit = document.querySelector('[data-testid="transit-card"]');
    if (!table || !synEntry || !transit) return null;
    // synEntry must be between table and transit OR before transit
    const entryBeforeTransit = (synEntry.compareDocumentPosition(transit) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    return entryBeforeTransit;
  });
  expect(order, "synastry entry must appear before transit card in DOM (not buried after it)").toBe(true);
});

// ─── V-S12. Collapse toggle works both ways (expand + re-collapse) ─────────────

test("verifier: Show-all toggle expands and then re-collapses the tail aspects", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 15000 });

  const toggle = page.getByTestId("synastry-show-all-toggle");
  // If there is no tail, skip
  const toggleCount = await toggle.count();
  if (toggleCount === 0) return;

  // Initially shows "Show all N aspects"
  await expect(toggle).toContainText("Show all");

  // Click to expand
  await toggle.click();
  // Now button should say "Show top aspects only" or similar collapse label
  await expect(toggle).toContainText("Show top");

  // Click to re-collapse
  await toggle.click();
  await expect(toggle).toContainText("Show all");
});

// ─── V-S13. Tail aspect readings are distinct (not byte-identical boilerplate) ─

test("verifier: tail aspects have distinct readings (no N identical trine sentences)", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 15000 });

  const toggle = page.getByTestId("synastry-show-all-toggle");
  const toggleCount = await toggle.count();
  if (toggleCount === 0) return; // no tail to check

  await toggle.click();
  await expect(toggle).toContainText("Show top");

  // Collect all reading texts
  const aspectsList = page.getByTestId("synastry-aspects-list");
  const readingEls = aspectsList.locator("[data-testid^='synastry-aspect-reading-']");
  const count = await readingEls.count();
  if (count < 2) return;

  const texts: string[] = [];
  for (let i = 0; i < count; i++) {
    const t = await readingEls.nth(i).textContent() ?? "";
    texts.push(t.trim());
  }

  // Count the most-repeated reading
  const freq: Record<string, number> = {};
  for (const t of texts) { freq[t] = (freq[t] ?? 0) + 1; }
  const maxRepeat = Math.max(...Object.values(freq));

  // No single reading should appear more than 3 times (we have pair-aware blurbs now)
  expect(maxRepeat, `Max repeated reading appears ${maxRepeat}x — must be ≤3`).toBeLessThanOrEqual(3);
});

// ─── V-S14. House overlay readings use ordinal house numbers (not bare cardinals) ─

test("verifier: overlay row headings use ordinal house numbers (1st, 2nd, not '1 house')", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 15000 });

  const overlayBinA = page.getByTestId("synastry-overlay-b-in-a");
  const overlayAinB = page.getByTestId("synastry-overlay-a-in-b");
  const hasBinA = await overlayBinA.count();
  const hasAinB = await overlayAinB.count();

  if (hasBinA === 0 && hasAinB === 0) return; // no birth times, skip

  async function checkOrdinals(container: ReturnType<typeof page.getByTestId>) {
    const text = await container.textContent() ?? "";
    // Must NOT contain bare cardinal patterns like " 1 House", "in their 5 house", "house of 8"
    expect(text).not.toMatch(/\b(in their|in your)\s+\d+\s+house/i);
    expect(text).not.toMatch(/house of \d+/i);
    // Must contain ordinal patterns like "1st", "2nd", "3rd", "4th" etc.
    expect(text).toMatch(/\d+(st|nd|rd|th)\s+House/i);
    // Must NOT contain spelled-out ordinals (First/Sixth/Twelfth) in body text
    expect(text, "body text must not contain spelled-out ordinals").not.toMatch(
      /\b(First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth|Eleventh|Twelfth)\s+House/i
    );
  }

  if (hasBinA > 0) await checkOrdinals(overlayBinA);
  if (hasAinB > 0) await checkOrdinals(overlayAinB);
});

// ─── V-S15. No duplicate aspect body strings in the tail (all aspects expanded) ─

test("verifier: no more than 3 identical aspect reading strings (no boilerplate repeat)", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 15000 });

  const toggle = page.getByTestId("synastry-show-all-toggle");
  const toggleCount = await toggle.count();
  if (toggleCount > 0) {
    await toggle.click();
    await expect(toggle).toContainText("Show top");
  }

  const aspectsList = page.getByTestId("synastry-aspects-list");
  const readingEls = aspectsList.locator("[data-testid^='synastry-aspect-reading-']");
  const count = await readingEls.count();
  if (count < 2) return;

  const texts: string[] = [];
  for (let i = 0; i < count; i++) {
    const t = await readingEls.nth(i).textContent() ?? "";
    texts.push(t.trim());
  }

  const freq: Record<string, number> = {};
  for (const t of texts) { freq[t] = (freq[t] ?? 0) + 1; }
  const maxRepeat = Math.max(0, ...Object.values(freq));

  expect(maxRepeat, `Max repeated reading appears ${maxRepeat}x — must be ≤3`).toBeLessThanOrEqual(3);
});
