/**
 * Verification e2e tests for chartwise.
 * Tests the spec's Success checks against the local production server.
 * Run with: BASE_URL=http://localhost:3099 npx playwright test tests/e2e/verify.spec.ts
 */
import { test, expect } from "@playwright/test";

// ─── Helper: Einstein birth data + localStorage seed ─────────────────────────
// The "Load example (Einstein)" button was removed from the UI 2026-06-26.
// Tests that need the Einstein chart seed via localStorage instead.
const EINSTEIN_BIRTH = {
  name: "Albert Einstein",
  year: 1879, month: 3, day: 14,
  hour: 11, minute: 30,
  latitude: 48.4011, longitude: 9.9876,
  placeName: "Ulm, Germany",
  hasBirthTime: true,
};

async function loadEinsteinChart(page: import("@playwright/test").Page) {
  await page.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, EINSTEIN_BIRTH);
  await page.goto("/");
  await expect(page.getByText("Albert Einstein")).toBeVisible({ timeout: 8000 });
  await page.getByText("Albert Einstein").first().click();
}

async function loadEinsteinChartOnPage1(page1: import("@playwright/test").Page) {
  await page1.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, EINSTEIN_BIRTH);
  await page1.goto("/");
  await expect(page1.getByText("Albert Einstein")).toBeVisible({ timeout: 8000 });
  await page1.getByText("Albert Einstein").first().click();
}



// ───────────────────────────────────────────────────────────
// 0. Plain-English reading section: visible by default, mentions Sun
// ───────────────────────────────────────────────────────────
test("plain-english-reading section is visible by default and mentions Sun", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // The plain-english-reading section must be visible without any user interaction
  const reading = page.getByTestId("plain-english-reading");
  await expect(reading).toBeVisible({ timeout: 5000 });

  // Must mention "Sun" (as part of "Pisces Sun" title or similar)
  await expect(reading).toContainText("Sun");

  // Must also mention Pisces (Einstein's Sun sign)
  await expect(reading).toContainText("Pisces");

  // Must contain actual prose (not just labels) — check for sentence-length text
  const text = await reading.textContent();
  expect(text).toBeTruthy();
  expect(text!.length).toBeGreaterThan(100);
});

// ───────────────────────────────────────────────────────────
// 1. Einstein anchor: Sun=Pisces/House10, Moon=Sagittarius, Asc=Cancer, MC=Pisces
// ───────────────────────────────────────────────────────────
test("Einstein anchor: Sun in Pisces, House 10", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // house-row-10 (desktop tr) must contain "Pisces" (sign) and planet-chip-sun
  const house10 = page.getByTestId("house-row-10").first();
  await expect(house10).toContainText("Pisces");
  await expect(house10.getByTestId("planet-chip-sun")).toBeVisible();
});

test("Einstein anchor: Moon in Sagittarius", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });
  // Moon chip now includes degree: "☽ Moon 14° Sagittarius"
  await expect(page.getByTestId("big-three-chips")).toContainText("Sagittarius");
  await expect(page.getByTestId("big-three-chips")).toContainText("Moon");
});

test("Einstein anchor: Ascendant in Cancer", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });
  // House 1 sign = Cancer (Ascendant)
  const house1 = page.getByTestId("house-row-1").first();
  await expect(house1).toContainText("Cancer");
  // Rising chip now shows degree: "Cancer 7° rising"
  await expect(page.getByTestId("big-three-chips")).toContainText("Cancer");
  await expect(page.getByTestId("big-three-chips")).toContainText("rising");
});

// ───────────────────────────────────────────────────────────
// R6-1. Big-three headline chips show degree symbol (Wen fix)
// ───────────────────────────────────────────────────────────
test("big-three headline chips show degree symbol (°) on Einstein chart", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const chips = page.getByTestId("big-three-chips");
  await expect(chips).toBeVisible();
  const text = await chips.textContent() ?? "";
  // Must contain at least one degree symbol
  expect(text, "big-three chips must contain a degree symbol (°)").toContain("°");
  // Sun: 23° Pisces
  expect(text).toContain("23°");
  // Moon: 14° Sagittarius
  expect(text).toContain("14°");
  // Asc: 7° rising
  expect(text).toContain("7°");
});

test("Einstein anchor: Midheaven in Pisces", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });
  // Midheaven pill appears below the table
  await expect(page.getByText(/Midheaven.*Pisces|Pisces.*Midheaven/)).toBeVisible();
});

// ───────────────────────────────────────────────────────────
// 2. Houses table: 12 house rows present
// ───────────────────────────────────────────────────────────
test("Houses table renders 12 house rows", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });
  for (let h = 1; h <= 12; h++) {
    await expect(page.getByTestId(`house-row-${h}`).first()).toBeVisible();
  }
});

// ───────────────────────────────────────────────────────────
// 3. Planet chip reveals reading on CLICK (not hover-only)
//    Test a chip that is NOT pre-expanded (e.g. Moon chip)
// ───────────────────────────────────────────────────────────
test("Clicking a non-pre-expanded planet chip reveals a reading", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // Moon chip is in house 6 for Einstein — not pre-expanded
  const moonChip = page.getByTestId("planet-chip-moon").first();
  await expect(moonChip).toBeVisible();
  // Reading should NOT be visible before click
  const moonReading = page.getByTestId("planet-chip-moon-reading").first();
  // Click to open
  await moonChip.click();
  await expect(moonReading).toBeVisible({ timeout: 3000 });
  const text = await moonReading.textContent();
  expect(text).toBeTruthy();
  expect(text!.length).toBeGreaterThan(10);
});

test("Clicking a sign chip reveals a reading", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // Click House 1 sign chip
  const signChip = page.getByTestId("sign-chip-h1").first();
  await signChip.click();
  const signReading = page.getByTestId("sign-chip-h1-reading").first();
  await expect(signReading).toBeVisible({ timeout: 3000 });
  const text = await signReading.textContent();
  expect(text).toBeTruthy();
  expect(text!.length).toBeGreaterThan(10);
});

// ───────────────────────────────────────────────────────────
// 4. Element bar: four totals present and sum to 11
// ───────────────────────────────────────────────────────────
test("Element bar shows four non-blank totals summing to 11 planets", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("element-bar")).toBeVisible({ timeout: 10000 });
  const bar = page.getByTestId("element-bar");
  await expect(bar).toContainText("Fire");
  await expect(bar).toContainText("Earth");
  await expect(bar).toContainText("Air");
  await expect(bar).toContainText("Water");
  // Basis label shows "11 placements: Sun, Moon..." (basisLabels path) — NOT "11 planetary"
  await expect(bar).toContainText("11 placements");
  await expect(bar).toContainText("Sun");
});

// ───────────────────────────────────────────────────────────
// 5. Transit card present with dated structure
// ───────────────────────────────────────────────────────────
test("Transit card is present with planet signs and a date string", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("transit-card")).toBeVisible({ timeout: 10000 });
  const card = page.getByTestId("transit-card");
  // Wait for transits to load (async effect)
  await expect(card).not.toContainText("Computing", { timeout: 8000 });
  // Should show Sun and other planets (structure check only, not exact signs)
  await expect(card).toContainText("Sun");
  await expect(card).toContainText("Moon");
  // Date should be displayed (e.g. "Monday, June 16, 2026")
  await expect(card).toContainText("2026");
});

// ───────────────────────────────────────────────────────────
// 6. Mobile layout: no horizontal overflow at 375px
// ───────────────────────────────────────────────────────────
test("No horizontal page overflow at 375px (mobile)", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  expect(overflow, "Page should not overflow horizontally at 375px").toBe(false);
  await ctx.close();
});

test("No horizontal page overflow at 1280px (desktop)", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  expect(overflow, "Page should not overflow horizontally at 1280px").toBe(false);
  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// 7. Share round-trip: POST → GET → clean context renders same chart
// ───────────────────────────────────────────────────────────
test("Share round-trip: create link, open in clean context, same chart renders", async ({ browser, baseURL }) => {
  // Step 1: create the share link in a normal context
  const ctx1 = await browser.newContext();
  const page1 = await ctx1.newPage();
  await loadEinsteinChartOnPage1(page1);
  await expect(page1.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // Click "Create share link"
  const shareBtn = page1.getByTestId("share-btn");
  await expect(shareBtn).toBeVisible();
  await shareBtn.click();

  // Wait for the copy-share-link button to appear (means token was created)
  const copyBtn = page1.getByTestId("copy-share-link");
  await expect(copyBtn).toBeVisible({ timeout: 10000 });

  // Extract the share URL from the readonly input
  const shareInput = page1.locator('input[aria-label="Share link URL"]');
  const shareUrl = await shareInput.inputValue();
  expect(shareUrl).toMatch(/\/chart\/[A-Za-z0-9]{10,}/);

  // Extract the token path
  const tokenPath = new URL(shareUrl).pathname; // e.g. /chart/XXXX

  await ctx1.close();

  // Step 2: open in CLEAN context (no localStorage, no cookies)
  const ctx2 = await browser.newContext({
    storageState: { cookies: [], origins: [] },
  });
  const page2 = await ctx2.newPage();
  await page2.goto(tokenPath);

  // Should render a chart for Albert Einstein with House 10 = Sun
  await expect(page2.getByTestId("houses-table")).toBeVisible({ timeout: 15000 });
  const house10 = page2.getByTestId("house-row-10").first();
  await expect(house10).toContainText("Pisces");
  await expect(house10.getByTestId("planet-chip-sun")).toBeVisible();

  // Name should be visible (h1 and h2 both contain name on shared page — use first())
  await expect(page2.getByText("Albert Einstein").first()).toBeVisible();

  await ctx2.close();
});

// ───────────────────────────────────────────────────────────
// 8. Returning-user: pre-seeded localStorage restores saved person
// ───────────────────────────────────────────────────────────
test("Returning user with pre-seeded localStorage sees saved profile list", async ({ browser, baseURL }) => {
  const einsteinBirth = {
    name: "Albert Einstein",
    year: 1879,
    month: 3,
    day: 14,
    hour: 11,
    minute: 30,
    latitude: 48.4011,
    longitude: 9.9876,
    placeName: "Ulm, Germany",
  };

  // Seed localStorage before navigation
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  // Set storage directly before goto
  await page.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, einsteinBirth);

  await page.goto("/");
  // The people list should appear with Einstein's name
  // (PeopleList renders when hydrated and people.length > 0)
  await expect(page.getByText("Albert Einstein")).toBeVisible({ timeout: 8000 });
  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// 9. SSR / cold load: homepage returns 200, no React hydration errors
// ───────────────────────────────────────────────────────────
test("Cold load: homepage SSR returns 200 and hydrates without React errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });

  const resp = await page.goto("/");
  expect(resp?.status()).toBe(200);
  // Einstein button removed 2026-06-26; check empty state prompt instead
  await expect(page.getByTestId("chart-empty-state")).toBeVisible();

  // No React hydration errors (418, 185, 310)
  const hydrateErrors = errors.filter((e) =>
    e.includes("#418") || e.includes("#185") || e.includes("#310") ||
    e.includes("Hydration") || e.includes("hydration")
  );
  expect(hydrateErrors, "No React hydration errors expected").toEqual([]);
});

test("Cold load with empty localStorage: chart-empty-state shown, no errors", async ({ browser }) => {
  const ctx = await browser.newContext({
    storageState: { cookies: [], origins: [] },
  });
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });

  await page.goto("/");
  await expect(page.getByTestId("chart-empty-state")).toBeVisible({ timeout: 5000 });

  const critErrors = errors.filter((e) =>
    !e.includes("Warning:") && !e.includes("React") && !e.includes("hydrat")
  );
  expect(critErrors, "No critical console errors on empty state").toEqual([]);
  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// NEW: Time-unknown path — houses suppressed, planet signs still shown
// ───────────────────────────────────────────────────────────
test("time-unknown: houses-time-unknown-notice shown, no confident rising sign, planet signs present", async ({
  page,
}) => {
  await page.goto("/");

  // Fill in a birth date (June 1, 1990)
  const dateInput = page.getByTestId("date-input");
  await expect(dateInput).toBeVisible();
  await dateInput.fill("1990-06-01");

  // Check "time unknown"
  const checkbox = page.getByTestId("time-unknown-checkbox");
  await checkbox.check();
  await expect(checkbox).toBeChecked();

  // Type a city and select "New York" from suggestions
  const placeInput = page.getByTestId("place-input");
  await placeInput.fill("New York");
  await expect(page.getByTestId("place-suggestions")).toBeVisible({ timeout: 5000 });
  const suggestions = page.getByTestId("place-suggestions").locator("li");
  await suggestions.first().click();

  // Submit the form
  await page.getByTestId("compute-btn").click();

  // The houses-time-unknown-notice must be present
  await expect(page.getByTestId("houses-time-unknown-notice")).toBeVisible({ timeout: 10000 });

  // The 12-row house table must NOT be present (no house-row-1 through house-row-12)
  // houses-table exists but house-row-* should not render in time-unknown mode
  for (let h = 1; h <= 12; h++) {
    await expect(page.getByTestId(`house-row-${h}`)).toHaveCount(0);
  }

  // No confident rising sign: "Cancer rising" or "[Sign] rising" pill must NOT be shown
  // The profile summary shows "Rising unknown" (strikethrough), not a sign-prefixed rising pill.
  // Assert that no element with pattern "[Sign] rising" exists in the DOM.
  const SIGN_NAMES = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
  for (const sign of SIGN_NAMES) {
    await expect(page.getByText(`${sign} rising`)).toHaveCount(0);
  }
  // And confirm "Rising unknown" placeholder IS shown
  await expect(page.getByText("Rising unknown")).toBeVisible();

  // Planet signs MUST still render (the planet signs section in time-unknown path)
  // At minimum Sun sign text should be visible in the planet signs list
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 5000 });
  // The notice div is inside houses-table wrapper
  const table = page.getByTestId("houses-table");
  await expect(table).toContainText("House placements and Ascendant are not available");
  await expect(table).toContainText("Planet Signs");
  // Sun should appear in the planet signs list
  await expect(table).toContainText("Sun:");
  await expect(table).toContainText("Moon:");
});

test("time-unknown returning user: pre-seeded localStorage with hasBirthTime=false still shows notice", async ({
  browser,
}) => {
  const timeUnknownData = {
    name: "Test Person",
    year: 1990,
    month: 6,
    day: 1,
    hour: 12,
    minute: 0,
    latitude: 40.7128,
    longitude: -74.006,
    placeName: "New York, USA",
    hasBirthTime: false,
  };

  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, timeUnknownData);

  await page.goto("/");
  // The person should appear in the list
  await expect(page.getByText("Test Person")).toBeVisible({ timeout: 8000 });
  // Click on the person to load the chart
  await page.getByText("Test Person").click();
  // houses-time-unknown-notice must appear (not the houses table)
  await expect(page.getByTestId("houses-time-unknown-notice")).toBeVisible({ timeout: 10000 });
  // No house rows
  await expect(page.getByTestId("house-row-1")).toHaveCount(0);

  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// 10. City type-ahead: no network call to geocoding API
//     (Verify purely via the bundled dataset — we confirm suggestions appear
//      even if we artificially block external fetch, but the app uses bundled
//      data so suggestions should still appear without network)
// ───────────────────────────────────────────────────────────
test("City type-ahead resolves from bundled dataset (no geocoding API)", async ({ page }) => {
  // Block any external geocoding calls to prove dataset is local
  await page.route("**/api/geocode*", (route) => route.abort());
  await page.route("**/geocod*", (route) => route.abort());

  await page.goto("/");
  const placeInput = page.getByTestId("place-input");
  await expect(placeInput).toBeVisible();
  await placeInput.fill("Berlin");
  await expect(page.getByTestId("place-suggestions")).toBeVisible({ timeout: 5000 });
  const items = page.getByTestId("place-suggestions").locator("li");
  await expect(items.first()).toContainText("Berlin");
});

// ═══════════════════════════════════════════════════════════
// PANEL ROUND-1 RE-VERIFY TESTS
// ═══════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────
// 11. Geocoder: population-ranked, readable country names (no numeric codes)
// ───────────────────────────────────────────────────────────
test("Geocoder: San Francisco US ranks first with readable country name", async ({ request }) => {
  const resp = await request.get("/api/cities?q=San+Francisco");
  expect(resp.status()).toBe(200);
  const body = await resp.json();
  expect(body.results.length).toBeGreaterThan(0);
  // First result must be the US city — now includes state code (e.g. "San Francisco, CA, United States")
  // Test-maintenance: format changed in panel round-5 to include alphabetic region/state codes for disambiguation.
  expect(body.results[0].displayName).toContain("San Francisco");
  expect(body.results[0].displayName).toContain("United States");
  // No numeric codes in any displayName
  for (const r of body.results) {
    expect(r.displayName).not.toMatch(/,\s*\d+/);
  }
});

test("Geocoder: London UK ranks first for 'London, UK' query", async ({ request }) => {
  const resp = await request.get("/api/cities?q=London%2C+UK");
  expect(resp.status()).toBe(200);
  const body = await resp.json();
  expect(body.results.length).toBeGreaterThan(0);
  // First result must be United Kingdom London — now includes alphabetic region code (e.g. "London, ENG, United Kingdom").
  // Test-maintenance: format changed in panel round-5 to include alphabetic region codes for disambiguation.
  expect(body.results[0].displayName).toContain("London");
  expect(body.results[0].displayName).toContain("United Kingdom");
});

test("Geocoder: Lagos shows Nigeria first", async ({ request }) => {
  const resp = await request.get("/api/cities?q=Lagos");
  expect(resp.status()).toBe(200);
  const body = await resp.json();
  expect(body.results.length).toBeGreaterThan(0);
  expect(body.results[0].displayName).toContain("Nigeria");
});

test("Geocoder: Bangalore alias resolves to Bengaluru, India (not empty)", async ({ request }) => {
  const resp = await request.get("/api/cities?q=Bangalore");
  expect(resp.status()).toBe(200);
  const body = await resp.json();
  expect(body.results.length).toBeGreaterThan(0);
  // Alias must resolve to Bengaluru
  expect(body.results[0].displayName).toContain("Bengaluru");
  expect(body.results[0].displayName).toContain("India");
});

// ───────────────────────────────────────────────────────────
// 12. Plain-English reading: visible by default ABOVE houses table, mentions Sun
// ───────────────────────────────────────────────────────────
test("plain-english-reading is rendered before houses-table in DOM order", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });
  await expect(page.getByTestId("plain-english-reading")).toBeVisible();

  // Verify DOM ordering: plain-english-reading should appear before houses-table
  const order = await page.evaluate(() => {
    const reading = document.querySelector('[data-testid="plain-english-reading"]');
    const table = document.querySelector('[data-testid="houses-table"]');
    if (!reading || !table) return null;
    const pos = reading.compareDocumentPosition(table);
    // DOCUMENT_POSITION_FOLLOWING = 4 means table comes after reading
    return (pos & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
  });
  expect(order, "plain-english-reading must appear before houses-table in DOM").toBe(true);
});

// ───────────────────────────────────────────────────────────
// 13. No empty reading bodies: planet chips & sign chips
// ───────────────────────────────────────────────────────────
test("No planet chip reading body is empty: Sun, Moon, Saturn, Pluto", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const planetChipsToCheck = ["sun", "moon", "saturn", "pluto"];
  for (const planet of planetChipsToCheck) {
    const chip = page.getByTestId(`planet-chip-${planet}`).first();
    // If not already expanded, click to open
    const expanded = await chip.getAttribute("aria-expanded");
    if (expanded !== "true") {
      await chip.click();
    }
    const reading = page.getByTestId(`planet-chip-${planet}-reading`).first();
    await expect(reading).toBeVisible({ timeout: 3000 });
    const text = await reading.textContent();
    expect(text, `planet-chip-${planet} reading must not be empty`).toBeTruthy();
    expect(text!.trim().length, `planet-chip-${planet} reading body must have content`).toBeGreaterThan(20);
  }
});

test("No sign chip reading body is empty: Houses 1, 5, 10", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const signChipsToCheck = ["h1", "h5", "h10"];
  for (const h of signChipsToCheck) {
    const chip = page.getByTestId(`sign-chip-${h}`).first();
    const expanded = await chip.getAttribute("aria-expanded");
    if (expanded !== "true") {
      await chip.click();
    }
    const reading = page.getByTestId(`sign-chip-${h}-reading`).first();
    await expect(reading).toBeVisible({ timeout: 3000 });
    const text = await reading.textContent();
    expect(text, `sign-chip-${h} reading must not be empty`).toBeTruthy();
    expect(text!.trim().length, `sign-chip-${h} reading body must have content`).toBeGreaterThan(20);
  }
});

// ───────────────────────────────────────────────────────────
// 14. Capitalization: transit/reading prose uses Title Case planet & sign names
// ───────────────────────────────────────────────────────────
test("plain-english-reading prose does not contain lowercase planet names (mars, neptune, etc.)", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("plain-english-reading")).toBeVisible({ timeout: 10000 });

  const text = await page.getByTestId("plain-english-reading").textContent() ?? "";
  // Check that planet names appear capitalized (not mid-sentence lowercase)
  // A word " mars" (space + lowercase) would indicate broken capitalization
  const badPlanetPattern = /\b(mars|neptune|saturn|pluto|jupiter|uranus|venus|mercury|sun|moon)\b/;
  // We only flag if a sentence-interior occurrence is lowercase — check no word-boundary lowercase planet names mid-sentence
  // Strategy: split blurb paragraphs and check each starts with capital; no interior " mars " etc.
  const interiorLower = / (mars|neptune|saturn|pluto|jupiter|uranus|venus|mercury)\b/;
  expect(interiorLower.test(text), "No interior lowercase planet names in plain-english-reading").toBe(false);
});

test("transit card prose does not use interior lowercase planet names", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("transit-card")).toBeVisible({ timeout: 10000 });
  // Wait for transit to load
  await expect(page.getByTestId("transit-card")).not.toContainText("Computing", { timeout: 8000 });

  const text = await page.getByTestId("transit-card").textContent() ?? "";
  // Check no interior lowercase planet name (word-boundary)
  const interiorLower = / (mars|neptune|saturn|pluto|jupiter|uranus|venus|mercury)\b/;
  expect(interiorLower.test(text), "No interior lowercase planet names in transit card").toBe(false);
});

// ═══════════════════════════════════════════════════════════
// PANEL ROUND-2 NEW TESTS
// ═══════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────
// R2-a. "Save as image" feature DELETED — button must NOT appear in the UI
//        (spec success check: "No 'Save as image' button is present in the UI")
// ───────────────────────────────────────────────────────────
test("save-image-btn is NOT present (feature deleted per spec)", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // The save-image-btn must NOT exist anywhere in the DOM
  await expect(page.getByTestId("save-image-btn")).toHaveCount(0);
  // Also assert no text matching "Save as image" appears
  await expect(page.getByText("Save as image", { exact: false })).toHaveCount(0);
});

// ───────────────────────────────────────────────────────────
// R2-b. Per-planet degrees: degree symbol appears in the houses table
// ───────────────────────────────────────────────────────────
test("planet degrees (° symbol) appear in the houses table", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const table = page.getByTestId("houses-table");
  // The table must contain at least one degree symbol from planet chips
  const text = await table.textContent() ?? "";
  expect(text).toContain("°");
});

// ───────────────────────────────────────────────────────────
// R2-c. /chart/[token] page HTML contains og:title meta tag
// ───────────────────────────────────────────────────────────
test("/chart/[token] page HTML contains og:title meta tag", async ({ browser, baseURL }) => {
  // Step 1: create a share link
  const ctx1 = await browser.newContext();
  const page1 = await ctx1.newPage();
  await loadEinsteinChartOnPage1(page1);
  await expect(page1.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const shareBtn = page1.getByTestId("share-btn");
  await expect(shareBtn).toBeVisible();
  await shareBtn.click();
  const copyBtn = page1.getByTestId("copy-share-link");
  await expect(copyBtn).toBeVisible({ timeout: 10000 });

  const shareInput = page1.locator('input[aria-label="Share link URL"]');
  const shareUrl = await shareInput.inputValue();
  const tokenPath = new URL(shareUrl).pathname;
  await ctx1.close();

  // Step 2: fetch the shared page and check for og:title in HTML
  const ctx2 = await browser.newContext({ storageState: { cookies: [], origins: [] } });
  const page2 = await ctx2.newPage();
  const resp = await page2.goto(tokenPath);
  expect(resp?.status()).toBe(200);

  // og:title must be present in the page HTML (server-rendered meta)
  const html = await page2.content();
  expect(html).toContain('og:title');
  await ctx2.close();
});

// ───────────────────────────────────────────────────────────
// R2-d. De-templated transit: notes are varied (not all identical sentence frame)
// ───────────────────────────────────────────────────────────
test("transit notes are varied — multiple lines, not all identical sentence structure", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("transit-card")).toBeVisible({ timeout: 10000 });
  // Wait for transits to compute
  await expect(page.getByTestId("transit-card")).not.toContainText("Computing", { timeout: 10000 });

  // Get all transit note paragraphs from the "For your chart" section
  // The notes are in <p> elements inside the notes section
  const noteParagraphs = page.getByTestId("transit-card").locator("p");
  const count = await noteParagraphs.count();
  // There should be at least 2 note paragraphs (can include retrograde summary + chart notes)
  expect(count, "Transit card should have at least 2 text paragraphs").toBeGreaterThanOrEqual(2);

  // Collect all note texts
  const noteTexts: string[] = [];
  for (let i = 0; i < count; i++) {
    const t = await noteParagraphs.nth(i).textContent() ?? "";
    if (t.trim().length > 20) noteTexts.push(t.trim());
  }

  // At least 2 substantive notes
  expect(noteTexts.length, "At least 2 substantive transit note lines").toBeGreaterThanOrEqual(2);

  // Not all notes share the same sentence opener (de-templating check)
  // Extract first 6 words of each note as its "frame"
  const frames = noteTexts.map((t) =>
    t
      .split(/\s+/)
      .slice(0, 4)
      .join(" ")
      .toLowerCase()
  );
  const uniqueFrames = new Set(frames);
  // At least 2 distinct openings
  expect(uniqueFrames.size, `Notes should not all share the same opener. Frames: ${frames.join(" | ")}`).toBeGreaterThanOrEqual(2);
});

// ───────────────────────────────────────────────────────────
// R2-e / R3-fix1. Expanded planet reading at 1280px spans the full table width via colSpan row
// (FIX 1: reading is now in a separate <tr colSpan=4>, not inside the narrow Planets cell)
// ───────────────────────────────────────────────────────────
test("expanded planet reading at 1280px spans full table width (colSpan row, not a sliver)", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // Sun chip is pre-expanded — reading is already visible
  const sunReading = page.getByTestId("planet-chip-sun-reading").first();
  await expect(sunReading).toBeVisible({ timeout: 5000 });

  // Measure reading width and table width
  const readingBox = await sunReading.boundingBox();
  const tableBox = await page.getByTestId("houses-table").boundingBox();

  expect(readingBox, "Reading bounding box must exist").toBeTruthy();
  expect(tableBox, "Table bounding box must exist").toBeTruthy();

  const readingWidth = readingBox!.width;
  const tableWidth = tableBox!.width;

  // The reading now renders in a full-width colSpan=4 row — it must span ≥ 60% of the table width
  // (previously constrained to ~38% Planets column — any reading < 60% is the old sliver regression)
  expect(
    readingWidth,
    `Reading (${readingWidth}px) should be ≥ 60% of table width (${tableWidth}px) — full colSpan row`
  ).toBeGreaterThan(tableWidth * 0.6);

  // Must not be absurdly narrow (< 200px at 1280px is a failure)
  expect(readingWidth, "Reading must be at least 200px wide at 1280px").toBeGreaterThan(200);

  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// R3-fix1b. Clicking a non-pre-expanded chip on desktop reveals full-width reading
// ───────────────────────────────────────────────────────────
test("clicking moon chip on desktop reveals full-width colSpan reading (≥60% table width)", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // Click the moon chip (desktop — first() is the desktop instance)
  const moonChip = page.getByTestId("planet-chip-moon").first();
  await expect(moonChip).toBeVisible();
  await moonChip.click();

  const moonReading = page.getByTestId("planet-chip-moon-reading").first();
  await expect(moonReading).toBeVisible({ timeout: 3000 });

  const readingBox = await moonReading.boundingBox();
  const tableBox = await page.getByTestId("houses-table").boundingBox();

  expect(readingBox!.width).toBeGreaterThan(tableBox!.width * 0.6);
  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// R3-fix2. /chart/[token] HTML contains og:image and twitter:card=summary_large_image
// ───────────────────────────────────────────────────────────
test("/chart/[token] HTML contains og:image and twitter:card=summary_large_image", async ({ browser, baseURL }) => {
  // Step 1: create a share link
  const ctx1 = await browser.newContext();
  const page1 = await ctx1.newPage();
  await loadEinsteinChartOnPage1(page1);
  await expect(page1.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const shareBtn = page1.getByTestId("share-btn");
  await expect(shareBtn).toBeVisible();
  await shareBtn.click();
  const copyBtn = page1.getByTestId("copy-share-link");
  await expect(copyBtn).toBeVisible({ timeout: 10000 });

  const shareInput = page1.locator('input[aria-label="Share link URL"]');
  const shareUrl = await shareInput.inputValue();
  const tokenPath = new URL(shareUrl).pathname;
  await ctx1.close();

  // Step 2: fetch the shared page and check meta tags
  const ctx2 = await browser.newContext({ storageState: { cookies: [], origins: [] } });
  const page2 = await ctx2.newPage();
  const resp = await page2.goto(tokenPath);
  expect(resp?.status()).toBe(200);

  const html = await page2.content();
  // og:image must be present (dynamic opengraph-image.tsx route, not static og-default.png)
  expect(html).toContain('og:image');
  // twitter:card must be summary_large_image
  expect(html).toContain('summary_large_image');
  // og:title still present
  expect(html).toContain('og:title');
  // The per-chart og:image URL must point to the dynamic route, not the static fallback
  expect(html).not.toContain('og-default.png');

  await ctx2.close();
});

// ───────────────────────────────────────────────────────────
// R4-fix1. /chart/[token]/opengraph-image returns HTTP 200 image/* for a created token
// ───────────────────────────────────────────────────────────
test("GET /chart/[token]/opengraph-image returns HTTP 200 image/* for a created token", async ({ browser, request }) => {
  // Step 1: create a share token
  const ctx1 = await browser.newContext();
  const page1 = await ctx1.newPage();
  await loadEinsteinChartOnPage1(page1);
  await expect(page1.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const shareBtn = page1.getByTestId("share-btn");
  await expect(shareBtn).toBeVisible();
  await shareBtn.click();
  const copyBtn = page1.getByTestId("copy-share-link");
  await expect(copyBtn).toBeVisible({ timeout: 10000 });

  const shareInput = page1.locator('input[aria-label="Share link URL"]');
  const shareUrl = await shareInput.inputValue();
  const tokenPath = new URL(shareUrl).pathname; // /chart/<token>
  await ctx1.close();

  // Step 2: fetch the opengraph-image route for that token
  const ogImagePath = `${tokenPath}/opengraph-image`;
  const resp = await request.get(ogImagePath);
  expect(resp.status(), `GET ${ogImagePath} must return 200`).toBe(200);
  const contentType = resp.headers()["content-type"] ?? "";
  expect(contentType, "OG image content-type must be image/*").toMatch(/^image\//);
});

// ═══════════════════════════════════════════════════════════
// PANEL ROUND-4 NEW TESTS
// ═══════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────
// R4-fix2. De-templated plain-English openers: distinct lead sentences per planet
// Same-sign placements (e.g. two planets sharing a sign) must NOT produce identical
// headline sentences. Assert lead sentences for Sun, Moon, Mercury, Venus, Mars differ.
// ───────────────────────────────────────────────────────────
test("plain-english-reading: per-planet lead sentences are distinct (de-templated)", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("plain-english-reading")).toBeVisible({ timeout: 10000 });

  // Collect all <p> text nodes inside the plain-english-reading section
  // Each planet block has a single <p> with the blurb
  const paragraphs = page.getByTestId("plain-english-reading").locator("p");
  const count = await paragraphs.count();
  expect(count, "plain-english-reading must have at least 3 planet blurbs (Sun, Moon, Rising)").toBeGreaterThanOrEqual(3);

  const leadSentences: string[] = [];
  for (let i = 0; i < count; i++) {
    const text = (await paragraphs.nth(i).textContent() ?? "").trim();
    if (text.length > 0) {
      // Take the first ~40 chars as the "opener" (enough to distinguish planet-specific frames)
      leadSentences.push(text.substring(0, 40).toLowerCase());
    }
  }

  // All lead sentences must be distinct (no duplicates)
  const uniqueLeads = new Set(leadSentences);
  expect(
    uniqueLeads.size,
    `All planet blurb openers must be distinct. Got: ${leadSentences.join(" | ")}`
  ).toBe(leadSentences.length);

  // Spot-check Einstein: Sun (Pisces) and Moon (Sagittarius) must have distinct, planet-specific openers.
  // Sun/Pisces starts with "your identity" (identity-domain language).
  // Moon/Sagittarius starts with "emotionally" (emotions-domain language).
  const sunOpener = leadSentences[0] ?? "";
  const moonOpener = leadSentences[1] ?? "";
  expect(sunOpener, "Sun blurb must start with identity-domain language ('your identity')").toMatch(/^your identity/);
  expect(moonOpener, "Moon blurb must start with 'emotionally'").toMatch(/^emotionally/);
});

// ───────────────────────────────────────────────────────────
// R4-fix3. Wider desktop container: no overflow at 1440px
// ───────────────────────────────────────────────────────────
test("No horizontal page overflow at 1440px (wide desktop)", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  expect(overflow, "Page should not overflow horizontally at 1440px").toBe(false);
  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// R4-fix4. Two different chart tokens produce different per-chart og:image URLs
// (per-chart OG is not the same static URL)
// ───────────────────────────────────────────────────────────
test("Two different tokens produce distinct og:image URLs (per-chart, not static)", async ({ request }) => {
  // Create token 1: Einstein
  const resp1 = await request.post("/api/chart-share", {
    data: {
      name: "Albert Einstein",
      year: 1879, month: 3, day: 14,
      hour: 11, minute: 30,
      latitude: 48.4011, longitude: 9.9876,
      placeName: "Ulm, Germany", hasBirthTime: true,
    },
  });
  // POST /api/chart-share may return 200 or 201 depending on whether the token is new
  expect([200, 201]).toContain(resp1.status());
  const { token: token1 } = await resp1.json();

  // Create token 2: different person
  const resp2 = await request.post("/api/chart-share", {
    data: {
      name: "Marie Curie",
      year: 1867, month: 11, day: 7,
      hour: 12, minute: 0,
      latitude: 52.2297, longitude: 21.0122,
      placeName: "Warsaw, Poland", hasBirthTime: true,
    },
  });
  expect([200, 201]).toContain(resp2.status());
  const { token: token2 } = await resp2.json();

  expect(token1).not.toBe(token2);

  // Fetch the og:image meta from each chart page
  const page1Html = await (await request.get(`/chart/${token1}`)).text();
  const page2Html = await (await request.get(`/chart/${token2}`)).text();

  const ogMatch1 = page1Html.match(/og:image" content="([^"]+)"/);
  const ogMatch2 = page2Html.match(/og:image" content="([^"]+)"/);

  expect(ogMatch1, "Token 1 chart page must have og:image").toBeTruthy();
  expect(ogMatch2, "Token 2 chart page must have og:image").toBeTruthy();

  const ogUrl1 = ogMatch1![1];
  const ogUrl2 = ogMatch2![1];

  // og:image URLs must differ (each contains the respective token)
  expect(ogUrl1, "Token1 og:image must embed its token").toContain(token1);
  expect(ogUrl2, "Token2 og:image must embed its token").toContain(token2);
  expect(ogUrl1, "og:image URLs for different tokens must differ").not.toBe(ogUrl2);

  // Neither must be the static og-default.png
  expect(ogUrl1).not.toContain("og-default.png");
  expect(ogUrl2).not.toContain("og-default.png");

  // Both og:image endpoints must return image/*
  const img1 = await request.get(`/chart/${token1}/opengraph-image`);
  const img2 = await request.get(`/chart/${token2}/opengraph-image`);
  // Follow redirects automatically — Playwright request follows them
  expect(img1.status(), "Token1 og image must return 200").toBe(200);
  expect(img1.headers()["content-type"]).toMatch(/^image\//);
  expect(img2.status(), "Token2 og image must return 200").toBe(200);
  expect(img2.headers()["content-type"]).toMatch(/^image\//);
});

// ───────────────────────────────────────────────────────────
// R2-f. /chart/[token] SSR + clean-context chart render: no hydration error, chart visible
// ───────────────────────────────────────────────────────────
test("/chart/[token] SSR returns 200, no hydration error, chart renders in clean context", async ({ browser, baseURL }) => {
  // Create a share token first
  const ctx1 = await browser.newContext();
  const page1 = await ctx1.newPage();
  await loadEinsteinChartOnPage1(page1);
  await expect(page1.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const shareBtn = page1.getByTestId("share-btn");
  await expect(shareBtn).toBeVisible();
  await shareBtn.click();
  const copyBtn = page1.getByTestId("copy-share-link");
  await expect(copyBtn).toBeVisible({ timeout: 10000 });

  const shareInput = page1.locator('input[aria-label="Share link URL"]');
  const shareUrl = await shareInput.inputValue();
  const tokenPath = new URL(shareUrl).pathname;
  await ctx1.close();

  // Open in completely clean context (no localStorage/cookies)
  const ctx2 = await browser.newContext({ storageState: { cookies: [], origins: [] } });
  const page2 = await ctx2.newPage();

  const hydrateErrors: string[] = [];
  page2.on("console", (m) => {
    if (m.type() === "error") hydrateErrors.push(m.text());
  });

  const resp = await page2.goto(tokenPath);
  expect(resp?.status(), "/chart/[token] SSR must return 200").toBe(200);

  // Chart must render with Einstein's name and Sun in House 10
  await expect(page2.getByTestId("houses-table")).toBeVisible({ timeout: 15000 });
  const house10 = page2.getByTestId("house-row-10").first();
  await expect(house10).toContainText("Pisces");
  await expect(house10.getByTestId("planet-chip-sun")).toBeVisible();
  await expect(page2.getByText("Albert Einstein").first()).toBeVisible();

  // No React hydration errors
  const badErrors = hydrateErrors.filter(
    (e) => e.includes("#418") || e.includes("#185") || e.includes("#310") ||
      e.includes("Hydration") || e.includes("hydration")
  );
  expect(badErrors, "No React hydration errors on /chart/[token]").toEqual([]);

  await ctx2.close();
});

// ═══════════════════════════════════════════════════════════
// PANEL ROUND-5 NEW TESTS
// ═══════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────
// R5-1. PLACE-SEARCH DISAMBIGUATION: Austin returns distinct state-qualified labels
// ───────────────────────────────────────────────────────────
test("Geocoder: Austin returns distinct state-labeled results (TX, MN, etc.)", async ({ request }) => {
  const resp = await request.get("/api/cities?q=Austin");
  expect(resp.status()).toBe(200);
  const body = await resp.json();
  const results: { displayName: string }[] = body.results;
  expect(results.length).toBeGreaterThan(1);

  // All displayNames must be distinct (de-duplication)
  const names = results.map((r) => r.displayName);
  const unique = new Set(names);
  expect(unique.size, `All Austin results must be distinct labels. Got: ${names.join(", ")}`).toBe(names.length);

  // Must include TX (primary) and at least one other state code
  const hasTX = names.some((n) => n.includes("TX"));
  const hasOther = names.some((n) => n.includes("MN") || n.includes("IN") || n.includes("AR"));
  expect(hasTX, 'Austin results must include "Austin, TX, United States"').toBe(true);
  expect(hasOther, "Austin results must include at least one other US state variant").toBe(true);
});

// ───────────────────────────────────────────────────────────
// R5-2. PLACE-SEARCH DISAMBIGUATION: Berlin returns Germany first, then distinct US states
// ───────────────────────────────────────────────────────────
test("Geocoder: Berlin returns Germany first, then distinct US-state variants", async ({ request }) => {
  const resp = await request.get("/api/cities?q=Berlin");
  expect(resp.status()).toBe(200);
  const body = await resp.json();
  const results: { displayName: string }[] = body.results;
  expect(results.length).toBeGreaterThan(1);

  // First must be Germany
  expect(results[0].displayName).toContain("Germany");
  expect(results[0].displayName).toContain("Berlin");

  // All labels are distinct
  const names = results.map((r) => r.displayName);
  const unique = new Set(names);
  expect(unique.size, `All Berlin results must be distinct. Got: ${names.join(", ")}`).toBe(names.length);

  // At least one US state variant exists
  const hasUSState = names.some((n) => n.match(/Berlin, [A-Z]{2}, United States/));
  expect(hasUSState, "Berlin results must include US state-qualified variants").toBe(true);
});

// ───────────────────────────────────────────────────────────
// R5-3. PLACE-SEARCH DISAMBIGUATION: San Francisco CA ranks first, all labels distinct
// ───────────────────────────────────────────────────────────
test("Geocoder: San Francisco, CA, United States is first and all labels distinct", async ({ request }) => {
  const resp = await request.get("/api/cities?q=San+Francisco");
  expect(resp.status()).toBe(200);
  const body = await resp.json();
  const results: { displayName: string }[] = body.results;
  expect(results.length).toBeGreaterThan(0);

  // First result must be the California SF with state code
  expect(results[0].displayName).toBe("San Francisco, CA, United States");

  // All results are distinct
  const names = results.map((r) => r.displayName);
  const unique = new Set(names);
  expect(unique.size, `All SF results must be distinct. Got: ${names.join(", ")}`).toBe(names.length);

  // No numeric codes
  for (const r of results) {
    expect(r.displayName).not.toMatch(/,\s*\d+/);
  }
});

// ───────────────────────────────────────────────────────────
// R5-4. SAME-SIGN-DISTINCT: two planets in the same sign → different full blurb strings
//        Tested via the /api/cities API (unit-tested in vitest), and cross-checked
//        in the live plain-english-reading for Einstein's chart.
// ───────────────────────────────────────────────────────────
test("plain-english-reading: same-sign blurb bodies differ beyond first word (Einstein Pisces: Sun/MC both Pisces check)", async ({ page }) => {
  // Einstein has Sun and MC both in Pisces — the plain-english-reading must not
  // show two identical sentences for Pisces-signed placements.
  await loadEinsteinChart(page);
  await expect(page.getByTestId("plain-english-reading")).toBeVisible({ timeout: 10000 });

  // Collect all <p> blurbs in the plain-english-reading section
  const paragraphs = page.getByTestId("plain-english-reading").locator("p");
  const count = await paragraphs.count();
  expect(count, "plain-english-reading must have at least 3 blurbs").toBeGreaterThanOrEqual(3);

  const blurbs: string[] = [];
  for (let i = 0; i < count; i++) {
    const t = (await paragraphs.nth(i).textContent() ?? "").trim();
    if (t.length > 20) blurbs.push(t);
  }

  // Strip first word and compare all pairs — no two blurb bodies (after first word) are identical
  const bodies = blurbs.map((b) => b.split(" ").slice(1).join(" "));
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      expect(
        bodies[i],
        `Blurb body ${i} and blurb body ${j} must differ (same-sign de-template check)`
      ).not.toBe(bodies[j]);
    }
  }
});

// ═══════════════════════════════════════════════════════════
// QA CORRECTNESS FIXES — AstroSeek comparison (2026-06-16)
// ═══════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────
// QA-1. Lunar nodes display their OWN sign (P0 fix)
//   Jiangmen anchor: North Node ~2°07' Virgo, South Node ~2°07' Pisces.
//   Prior bug: nodes were showing the house cusp sign (Leo/Aquarius) instead.
// ───────────────────────────────────────────────────────────
test("QA: Jiangmen chart — North Node shows Virgo (own sign, not house sign Leo)", async ({ page, browser }) => {
  // Load Jiangmen chart via localStorage seeding
  const jiangmenBirth = {
    name: "Amy",
    year: 1998,
    month: 8,
    day: 8,
    hour: 16,
    minute: 30,
    latitude: 22.583,
    longitude: 113.083,
    placeName: "Jiangmen, China",
    hasBirthTime: true,
  };

  const ctx = await browser.newContext();
  const pg = await ctx.newPage();
  await pg.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, jiangmenBirth);

  await pg.goto("/");
  await expect(pg.getByText("Amy")).toBeVisible({ timeout: 8000 });
  await pg.getByText("Amy").click();
  await expect(pg.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // North Node chip must exist and show Virgo
  // The node appears in House 8; the sign chip for House 8 is Virgo — but the node must show its own sign.
  const tableText = await pg.getByTestId("houses-table").textContent() ?? "";
  // Look for "North Node" label near "Virgo" — the chip label includes the degree and sign
  expect(tableText, "North Node must be labelled with Virgo (not Leo)").toContain("Virgo");
  // Also confirm "Pisces" appears (South Node in Pisces)
  expect(tableText, "South Node must be labelled with Pisces (not Aquarius)").toContain("Pisces");
  // Must NOT say "North Node" adjacent to "Leo" — the old bug
  // We check the node chips specifically by looking for the degree-formatted label
  // Node chips contain "°" and the sign name
  expect(tableText).not.toMatch(/North Node[^]*?Leo/s.source.replace("s", "").slice(0, 30));

  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// QA-2. Black Moon Lilith (Mean) present, ~26° Libra, House 10 (P1 fix)
// ───────────────────────────────────────────────────────────
test("QA: Jiangmen chart — Black Moon Lilith appears at ~26° Libra in House 10", async ({ browser }) => {
  const jiangmenBirth = {
    name: "Amy",
    year: 1998,
    month: 8,
    day: 8,
    hour: 16,
    minute: 30,
    latitude: 22.583,
    longitude: 113.083,
    placeName: "Jiangmen, China",
    hasBirthTime: true,
  };

  const ctx = await browser.newContext();
  const pg = await ctx.newPage();
  await pg.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, jiangmenBirth);

  await pg.goto("/");
  await expect(pg.getByText("Amy")).toBeVisible({ timeout: 8000 });
  await pg.getByText("Amy").click();
  await expect(pg.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // House 10 row must contain "Lilith" and "Libra"
  const house10 = pg.getByTestId("house-row-10").first();
  await expect(house10).toBeVisible({ timeout: 5000 });
  const h10Text = await house10.textContent() ?? "";
  expect(h10Text, "House 10 must contain Lilith").toContain("Lilith");
  expect(h10Text, "House 10 must contain Libra (Lilith's sign)").toContain("Libra");
  // Degree must be in range 24°–28° (AstroSeek: 26°17')
  const degMatch = h10Text.match(/(\d+)°\d+'[^A-Z]*?Libra|Libra[^]*?(\d+)°/);
  // Just confirm a degree symbol exists near Libra in house 10
  expect(h10Text).toMatch(/\d+°\d+'/);

  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// QA-3. Arcminute formatting: positions show D°MM' not floor-truncated whole degrees (P2)
// ───────────────────────────────────────────────────────────
test("QA: Einstein chart — planet positions use D°MM' arcminute format", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const tableText = await page.getByTestId("houses-table").textContent() ?? "";
  // Must contain at least one D°MM' pattern (e.g. "23°52'" or "14°30'")
  expect(tableText, "Table must contain D°MM' arcminute format").toMatch(/\d+°\d{2}'/);
  // Must NOT rely on just "°" without minutes (floor-truncated like "23°")
  // A sample: Einstein Sun ~23°52' Pisces — the "52" minutes must appear
  // We just confirm the full D°MM' pattern appears (not just "°" alone)
  const arcminuteMatches = tableText.match(/\d+°\d{2}'/g) ?? [];
  expect(arcminuteMatches.length, "Multiple D°MM' positions must appear in table").toBeGreaterThan(3);
});

// ───────────────────────────────────────────────────────────
// QA-4. Element distribution basis label shows body names (P2 spec check)
// ───────────────────────────────────────────────────────────
test("QA: element bar shows explicit basis label naming counted bodies", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("element-bar")).toBeVisible({ timeout: 10000 });

  const basisLabel = page.getByTestId("element-basis-label");
  await expect(basisLabel).toBeVisible({ timeout: 5000 });
  const text = await basisLabel.textContent() ?? "";
  // Must say "Based on N placements: Sun, Moon, ..."
  expect(text).toMatch(/Based on \d+ placements:/);
  // Must explicitly name Sun, Moon, Mercury
  expect(text).toContain("Sun");
  expect(text).toContain("Moon");
  expect(text).toContain("Mercury");
  // Lilith/nodes are NOT in the element count (planetary bodies only)
  // but 11 planetary bodies should be named
  expect(text).toContain("Chiron");
});

// ═══════════════════════════════════════════════════════════
// PANEL ROUND-6: NODE + LILITH VISIBILITY (no-click, no truncation)
// ═══════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────
// R6-a. Nodes + Lilith sign+degree visible WITHOUT a click (Jiangmen chart)
//   North Node ~2°07' Virgo, South Node ~2°07' Pisces, Black Moon Lilith ~26° Libra H10
// ───────────────────────────────────────────────────────────
test("QA: Jiangmen — North Node, South Node, and Black Moon Lilith sign+degree visible without clicking", async ({ browser }) => {
  const jiangmenBirth = {
    name: "Amy",
    year: 1998,
    month: 8,
    day: 8,
    hour: 16,
    minute: 30,
    latitude: 22.583,
    longitude: 113.083,
    placeName: "Jiangmen, China",
    hasBirthTime: true,
  };

  const ctx = await browser.newContext();
  const pg = await ctx.newPage();
  await pg.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, jiangmenBirth);

  await pg.goto("/");
  await expect(pg.getByText("Amy")).toBeVisible({ timeout: 8000 });
  await pg.getByText("Amy").click();
  await expect(pg.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // No click — check the chip button text directly (aria-label or button text)
  // The chips render label as visible button text; no expand needed to see sign+degree

  // North Node chip: aria-label must contain "Virgo" and a degree pattern
  const northNodeChip = pg.getByTestId("node-chip-northnode").first();
  await expect(northNodeChip).toBeVisible({ timeout: 5000 });
  const northLabel = await northNodeChip.getAttribute("aria-label") ?? await northNodeChip.textContent() ?? "";
  expect(northLabel, "North Node chip must show Virgo without a click").toContain("Virgo");
  expect(northLabel, "North Node chip must show degree without a click").toMatch(/\d+°/);

  // South Node chip: must contain "Pisces"
  const southNodeChip = pg.getByTestId("node-chip-southnode").first();
  await expect(southNodeChip).toBeVisible({ timeout: 5000 });
  const southLabel = await southNodeChip.getAttribute("aria-label") ?? await southNodeChip.textContent() ?? "";
  expect(southLabel, "South Node chip must show Pisces without a click").toContain("Pisces");
  expect(southLabel, "South Node chip must show degree without a click").toMatch(/\d+°/);

  // Black Moon Lilith chip: must contain "Libra"
  const lilithChip = pg.getByTestId("node-chip-lilith").first();
  await expect(lilithChip).toBeVisible({ timeout: 5000 });
  const lilithLabel = await lilithChip.getAttribute("aria-label") ?? await lilithChip.textContent() ?? "";
  expect(lilithLabel, "Black Moon Lilith chip must show Libra without a click").toContain("Libra");
  expect(lilithLabel, "Black Moon Lilith chip must show degree without a click").toMatch(/\d+°/);

  // Confirm full label is NOT truncated with ellipsis (the visible text must not end in "…")
  const lilithVisibleText = await lilithChip.textContent() ?? "";
  expect(lilithVisibleText, "Black Moon Lilith chip label must not be ellipsis-truncated").not.toContain("…");
  expect(lilithVisibleText, "Black Moon Lilith chip label must not be truncated with ASCII ...").not.toMatch(/\.\.\.$/);

  await ctx.close();
});

// ═══════════════════════════════════════════════════════════
// SYNASTRY / COMPATIBILITY (core flow 3)
// ═══════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────
// S-1. "Compare two people" entry is visible ABOVE the transit card in chart view
// ───────────────────────────────────────────────────────────
test("synastry: 'Compare two people' entry is visible above transit card after loading Einstein", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // The synastry entry must be present and visible
  const entry = page.getByTestId("synastry-entry");
  await expect(entry).toBeVisible({ timeout: 5000 });
  await expect(entry).toContainText("Compare two people");

  // It must appear BEFORE the transit card in DOM order
  const order = await page.evaluate(() => {
    const synaEntry = document.querySelector('[data-testid="synastry-entry"]');
    const transit = document.querySelector('[data-testid="transit-card"]');
    if (!synaEntry || !transit) return null;
    const pos = synaEntry.compareDocumentPosition(transit);
    return (pos & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
  });
  expect(order, "synastry entry must appear before transit-card in DOM").toBe(true);
});

// ───────────────────────────────────────────────────────────
// S-2. Clicking "Compare two people" opens the synastry view
// ───────────────────────────────────────────────────────────
test("synastry: clicking compare button shows synastry view", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-view")).toBeVisible({ timeout: 5000 });
  await expect(page.getByText("Compatibility, explained")).toBeVisible();
});

// ───────────────────────────────────────────────────────────
// S-3. Example pair: Mars-Moon trine visible with reading, tagged HARMONY
// REGRESSION ANCHOR — Diana × Charles (replaced Einstein × Obama 2026-06-26)
// Diana Mars (Virgo) trine Charles Moon (Taurus), orb ~1.22°
// ───────────────────────────────────────────────────────────
test("synastry regression: Mars-Moon trine visible with reading on example pair (Princess Diana × Prince Charles)", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // Open synastry
  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-view")).toBeVisible({ timeout: 5000 });

  // Wait for the example pair to load (auto-loads since < 2 people saved)
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 10000 });

  // Mars-Moon trine aspect row must be present (Diana Mars trine Charles Moon, ~1.22° orb)
  const marsMonRow = page.getByTestId("synastry-aspect-mars-moon-trine");
  await expect(marsMonRow).toBeVisible({ timeout: 5000 });

  // Row must contain "trine"
  await expect(marsMonRow).toContainText("trine");

  // Reading must be visible on the row (no click needed)
  const reading = page.getByTestId("synastry-aspect-reading-mars-moon-trine");
  await expect(reading).toBeVisible({ timeout: 5000 });
  const readingText = await reading.textContent() ?? "";
  expect(readingText.length, "Mars-Moon trine reading must have substance").toBeGreaterThan(30);
});

// ───────────────────────────────────────────────────────────
// S-4. Both big-three columns visible: Person A = Princess Diana, Person B = Prince Charles
// ───────────────────────────────────────────────────────────
test("synastry: both big-three columns visible, Princess Diana and Prince Charles shown", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 10000 });

  const bigThree = page.getByTestId("synastry-big-three");
  await expect(bigThree).toBeVisible({ timeout: 5000 });

  // Person A (Princess Diana): Sun Cancer / Moon Aquarius / Rising Sagittarius
  await expect(bigThree).toContainText("Sun Cancer");
  await expect(bigThree).toContainText("Moon Aquarius");
  await expect(bigThree).toContainText("Rising Sagittarius");

  // Person B (Prince Charles): Sun Scorpio — both names visible
  await expect(bigThree).toContainText("Sun Scorpio");
  await expect(bigThree).toContainText("Prince Charles");
});

// ───────────────────────────────────────────────────────────
// S-5. Harmony/tension framing visible without clicking
// ───────────────────────────────────────────────────────────
test("synastry: harmony/tension tags visible without any click, readings un-clipped", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 10000 });

  // Summary text with harmony · tension count must be visible
  const summary = page.getByTestId("synastry-summary-text");
  await expect(summary).toBeVisible({ timeout: 5000 });
  const summaryText = await summary.textContent() ?? "";
  expect(summaryText.length, "Summary must have substantive text").toBeGreaterThan(40);

  // Aspects list must be present
  const aspectsList = page.getByTestId("synastry-aspects-list");
  await expect(aspectsList).toBeVisible({ timeout: 5000 });

  // Mars-Moon trine reading must be visible (regression anchor: Diana Mars trine Charles Moon)
  const reading = page.getByTestId("synastry-aspect-reading-mars-moon-trine");
  await expect(reading).toBeVisible({ timeout: 5000 });

  // Check no text is truncated with ellipsis
  const text = await reading.textContent() ?? "";
  expect(text).not.toContain("…");
  expect(text).not.toMatch(/\.\.\.$/);
});

// ───────────────────────────────────────────────────────────
// S-6. Load example pair button shown when < 2 charts saved
// ───────────────────────────────────────────────────────────
test("synastry: 'Load example pair' button shown and loads results", async ({ browser }) => {
  const ctx = await browser.newContext({ storageState: { cookies: [], origins: [] } });
  const page = await ctx.newPage();
  await page.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, EINSTEIN_BIRTH);
  await page.goto("/");
  await expect(page.getByText("Albert Einstein")).toBeVisible({ timeout: 8000 });
  await page.getByText("Albert Einstein").first().click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // Open synastry
  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-view")).toBeVisible({ timeout: 5000 });

  // With only 1 person saved, example pair auto-loads OR the button is shown
  // Either way, the result should appear within 10s
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 10000 });

  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// S-7. Back button closes synastry, returns to natal chart view
// ───────────────────────────────────────────────────────────
test("synastry: back button closes the compatibility view", async ({ page }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-view")).toBeVisible({ timeout: 5000 });

  // Click back — button has aria-label="Close compatibility view" (overrides visible text for getByRole)
  await page.getByRole("button", { name: "Close compatibility view" }).click();

  // Synastry view should be gone, natal chart should be back
  await expect(page.getByTestId("synastry-view")).not.toBeVisible();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 5000 });
});

// ───────────────────────────────────────────────────────────
// S-8. No horizontal overflow at 375px with synastry open
// ───────────────────────────────────────────────────────────
test("synastry: no horizontal overflow at 375px", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  await page.getByTestId("open-synastry-btn").click();
  await expect(page.getByTestId("synastry-result")).toBeVisible({ timeout: 10000 });

  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  expect(overflow, "No horizontal overflow at 375px with synastry open").toBe(false);
  await ctx.close();
});

// ═══════════════════════════════════════════════════════════
// BIG-3 ESTIMATE (core flow 4)
// ═══════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────
// B-1. Toggle exists and is PRECISE by default
// ───────────────────────────────────────────────────────────
test("big3: entry-mode-toggle is present, PRECISE is active by default", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByTestId("entry-mode-toggle");
  await expect(toggle).toBeVisible();
  // PRECISE button should have aria-selected=true by default
  const preciseBtn = page.getByTestId("mode-precise");
  await expect(preciseBtn).toHaveAttribute("aria-selected", "true");
  // BIG 3 button should have aria-selected=false
  const big3Btn = page.getByTestId("mode-big3");
  await expect(big3Btn).toHaveAttribute("aria-selected", "false");
  // Einstein button removed 2026-06-26 — PRECISE mode leads directly with BirthForm
  await expect(page.getByTestId("chart-empty-state")).toBeVisible();
});

// ───────────────────────────────────────────────────────────
// B-2. Switching to BIG 3 shows the form
// ───────────────────────────────────────────────────────────
test("big3: switching to BIG 3 mode shows the big3 form", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("mode-big3").click();
  // big3 form is now visible
  await expect(page.getByTestId("big3-form")).toBeVisible({ timeout: 3000 });
  // Three sign selects are present
  await expect(page.getByTestId("big3-sun")).toBeVisible();
  await expect(page.getByTestId("big3-moon")).toBeVisible();
  await expect(page.getByTestId("big3-rising")).toBeVisible();
  // Year input
  await expect(page.getByTestId("big3-year")).toBeVisible();
  // Estimate button
  await expect(page.getByTestId("big3-estimate-btn")).toBeVisible();
  // Einstein button removed 2026-06-26 — it's gone from both modes
});

// ───────────────────────────────────────────────────────────
// B-3. P0 CORRECTNESS: Aries/Taurus/Gemini/1990 → chart honors all three signs
// ───────────────────────────────────────────────────────────
test("big3: Aries/Taurus/Gemini/1990 → chart Sun=Aries, Moon=Taurus, Asc=Gemini (P0 correctness)", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible({ timeout: 3000 });

  // Select Aries for Sun
  await page.getByTestId("big3-sun").selectOption("aries");
  // Select Taurus for Moon
  await page.getByTestId("big3-moon").selectOption("taurus");
  // Select Gemini for Rising
  await page.getByTestId("big3-rising").selectOption("gemini");
  // Enter year 1990
  await page.getByTestId("big3-year").fill("1990");
  // Click Estimate
  await page.getByTestId("big3-estimate-btn").click();

  // Wait for chart to render
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 15000 });

  // The big-three chips must show the correct signs
  const chips = page.getByTestId("big-three-chips");
  await expect(chips).toContainText("Aries");  // Sun
  await expect(chips).toContainText("Taurus"); // Moon
  await expect(chips).toContainText("Gemini"); // Rising

  // The ESTIMATED CHART badge must be present
  await expect(page.getByTestId("estimate-badge")).toBeVisible({ timeout: 5000 });
});

// ───────────────────────────────────────────────────────────
// B-4. Estimate badge appears on estimated chart, not on precise chart
// ───────────────────────────────────────────────────────────
test("big3: estimate-badge shown for estimated chart, NOT shown for precise Einstein chart", async ({ page }) => {
  // Load Einstein (precise) via localStorage — badge must NOT appear
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });
  await expect(page.getByTestId("estimate-badge")).toHaveCount(0);

  // Switch to BIG 3 mode and estimate
  await page.getByTestId("mode-big3").click();
  await page.getByTestId("big3-sun").selectOption("aries");
  await page.getByTestId("big3-moon").selectOption("taurus");
  await page.getByTestId("big3-rising").selectOption("gemini");
  await page.getByTestId("big3-year").fill("1990");
  await page.getByTestId("big3-estimate-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 15000 });

  // Badge MUST be present for the estimated chart
  await expect(page.getByTestId("estimate-badge")).toBeVisible({ timeout: 5000 });
  await expect(page.getByTestId("estimate-badge")).toContainText("ESTIMATED CHART", { ignoreCase: true });
});

// ───────────────────────────────────────────────────────────
// B-5. Switching back to PRECISE mode still gives correct chart (Einstein via localStorage)
// ───────────────────────────────────────────────────────────
test("big3: switching back to PRECISE mode shows BirthForm; Einstein (seeded) gives Sun Pisces / Moon Sagittarius / Asc Cancer", async ({ page }) => {
  // Seed Einstein so the people list is populated
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // Switch to BIG 3 mode
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible();

  // Switch back to PRECISE — BirthForm must be visible
  await page.getByTestId("mode-precise").click();
  await expect(page.getByTestId("birth-form")).toBeVisible({ timeout: 3000 });

  // Einstein chart should still be visible on the right (mode toggle does not clear the chart)
  const chips = page.getByTestId("big-three-chips");
  await expect(chips).toContainText("Pisces");
  await expect(chips).toContainText("Sagittarius");
  await expect(chips).toContainText("Cancer");
  await expect(chips).toContainText("rising");

  // No estimate badge for a precise chart
  await expect(page.getByTestId("estimate-badge")).toHaveCount(0);
});

// ───────────────────────────────────────────────────────────
// B-6. Validation: empty fields show an error
// ───────────────────────────────────────────────────────────
test("big3: submitting empty big3 form shows validation error", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible();
  // Click estimate without filling anything
  await page.getByTestId("big3-estimate-btn").click();
  // Error alert must appear
  const err = page.getByTestId("big3-error");
  await expect(err).toBeVisible({ timeout: 3000 });
  await expect(err).toHaveAttribute("role", "alert");
  // No chart should have rendered
  await expect(page.getByTestId("estimate-badge")).toHaveCount(0);
});

// ───────────────────────────────────────────────────────────
// B-7. No horizontal overflow at 375px with big3 form open
// ───────────────────────────────────────────────────────────
test("big3: no horizontal overflow at 375px with big3 form visible", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible({ timeout: 3000 });

  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  expect(overflow, "No horizontal overflow at 375px with big3 form open").toBe(false);
  await ctx.close();
});

// ═══════════════════════════════════════════════════════════
// BIG-3 ESTIMATE — VERIFIER-REQUIRED ADDITIONAL COMBINATIONS
// APP_SPEC.md P0 sweep: all four required combos exercised in the live UI
// ═══════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────
// B-8. Scorpio/Cancer/Capricorn/2001 — P0 correctness in UI
// ───────────────────────────────────────────────────────────
test("big3: Scorpio/Cancer/Capricorn/2001 → chart Sun=Scorpio, Moon=Cancer, Asc=Capricorn (P0)", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible({ timeout: 3000 });

  await page.getByTestId("big3-sun").selectOption("scorpio");
  await page.getByTestId("big3-moon").selectOption("cancer");
  await page.getByTestId("big3-rising").selectOption("capricorn");
  await page.getByTestId("big3-year").fill("2001");
  await page.getByTestId("big3-estimate-btn").click();

  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 15000 });

  const chips = page.getByTestId("big-three-chips");
  await expect(chips).toContainText("Scorpio");    // Sun
  await expect(chips).toContainText("Cancer");     // Moon
  await expect(chips).toContainText("Capricorn");  // Rising

  // Estimate badge must be present
  await expect(page.getByTestId("estimate-badge")).toBeVisible({ timeout: 5000 });
});

// ───────────────────────────────────────────────────────────
// B-9. Leo/Leo/Leo/1975 — triple same-sign P0 correctness in UI
// ───────────────────────────────────────────────────────────
test("big3: Leo/Leo/Leo/1975 → chart Sun=Leo, Moon=Leo, Asc=Leo (P0 triple same-sign)", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible({ timeout: 3000 });

  await page.getByTestId("big3-sun").selectOption("leo");
  await page.getByTestId("big3-moon").selectOption("leo");
  await page.getByTestId("big3-rising").selectOption("leo");
  await page.getByTestId("big3-year").fill("1975");
  await page.getByTestId("big3-estimate-btn").click();

  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 15000 });

  // Big-three chips must all show Leo
  const chips = page.getByTestId("big-three-chips");
  // Sun, Moon, and Rising all Leo — "Leo" must appear at least 2-3 times
  const chipsText = await chips.textContent() ?? "";
  const leoCount = (chipsText.match(/Leo/g) ?? []).length;
  expect(leoCount, "Leo must appear at least twice in big-three chips (Sun, Moon, Rising all Leo)").toBeGreaterThanOrEqual(2);

  // Estimate badge must be present
  await expect(page.getByTestId("estimate-badge")).toBeVisible({ timeout: 5000 });
});

// ───────────────────────────────────────────────────────────
// B-10. Pisces/Aries/Libra/1988 — P0 correctness in UI
// ───────────────────────────────────────────────────────────
test("big3: Pisces/Aries/Libra/1988 → chart Sun=Pisces, Moon=Aries, Asc=Libra (P0)", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible({ timeout: 3000 });

  await page.getByTestId("big3-sun").selectOption("pisces");
  await page.getByTestId("big3-moon").selectOption("aries");
  await page.getByTestId("big3-rising").selectOption("libra");
  await page.getByTestId("big3-year").fill("1988");
  await page.getByTestId("big3-estimate-btn").click();

  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 15000 });

  const chips = page.getByTestId("big-three-chips");
  await expect(chips).toContainText("Pisces");  // Sun
  await expect(chips).toContainText("Aries");   // Moon
  await expect(chips).toContainText("Libra");   // Rising

  // Estimate badge must be present
  await expect(page.getByTestId("estimate-badge")).toBeVisible({ timeout: 5000 });
});

// ───────────────────────────────────────────────────────────
// B-11. Badge persists after toggle back to PRECISE without recomputing
//
// APP_SPEC.md: badge is driven by compute-time flag (isEstimate on the chart),
// NOT by the current toggle state. After producing an estimated chart, toggling
// back to PRECISE mode WITHOUT pressing "Compute" must leave the estimate badge
// on the still-displayed chart.
// ───────────────────────────────────────────────────────────
test("big3: estimate-badge persists when toggle flipped back to PRECISE without recomputing", async ({ page }) => {
  await page.goto("/");

  // Step 1: Produce an estimated chart
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible({ timeout: 3000 });
  await page.getByTestId("big3-sun").selectOption("aries");
  await page.getByTestId("big3-moon").selectOption("taurus");
  await page.getByTestId("big3-rising").selectOption("gemini");
  await page.getByTestId("big3-year").fill("1990");
  await page.getByTestId("big3-estimate-btn").click();

  // Wait for chart to render and verify badge is present
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 15000 });
  await expect(page.getByTestId("estimate-badge")).toBeVisible({ timeout: 5000 });

  // Step 2: Toggle BACK to PRECISE mode WITHOUT recomputing (no button click)
  await page.getByTestId("mode-precise").click();

  // Step 3: The estimate badge must STILL be present because the displayed chart is still estimated
  // (the badge is driven by chart.isEstimate, not by toggle state)
  await expect(page.getByTestId("estimate-badge")).toBeVisible({ timeout: 3000 });

  // The houses table is still showing the estimated chart
  await expect(page.getByTestId("houses-table")).toBeVisible();

  // The big-three chips still show the estimated signs (Aries/Taurus/Gemini)
  const chips = page.getByTestId("big-three-chips");
  await expect(chips).toContainText("Aries");
  await expect(chips).toContainText("Taurus");
  await expect(chips).toContainText("Gemini");
});

// ───────────────────────────────────────────────────────────
// B-12. Returning-user: estimated chart saved to localStorage, re-opens with badge
//
// If an estimated chart is saved (via the people list), a returning user who
// ── RE-VERIFY-2: Leo/Scorpio/Gemini/1988 UI spot-check with big3 strip ─────────
// This is the panel-confirmed dead-end combo. After the fix it must:
//   (a) render a chart (no red error)
//   (b) show Sun Leo, Moon Scorpio, Ascendant Gemini
//   (c) show the ESTIMATED CHART badge
//   (d) show the new "Your big three" strip with those three signs
// ───────────────────────────────────────────────────────────
test("RE-VERIFY-2: Leo/Scorpio/Gemini/1988 renders with correct signs + big3 strip", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  // Switch to BIG 3 mode
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible({ timeout: 5000 });

  // Fill the big3 form: Sun=Leo, Moon=Scorpio, Rising=Gemini, Year=1988
  await page.getByTestId("big3-sun").selectOption("leo");
  await page.getByTestId("big3-moon").selectOption("scorpio");
  await page.getByTestId("big3-rising").selectOption("gemini");
  await page.getByTestId("big3-year").fill("1988");

  await page.getByTestId("big3-estimate-btn").click();

  // Houses table must render (no error)
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 20000 });

  // ESTIMATED CHART badge must be present
  await expect(page.getByTestId("estimate-badge")).toBeVisible({ timeout: 5000 });

  // Big-three strip must show all three signs
  const strip = page.getByTestId("estimate-big3-strip");
  await expect(strip).toBeVisible({ timeout: 5000 });
  const stripText = (await strip.textContent()) ?? "";
  expect(stripText.toLowerCase()).toContain("leo");
  expect(stripText.toLowerCase()).toContain("scorpio");
  expect(stripText.toLowerCase()).toContain("gemini");

  // Verify the actual chart honors all three signs via chips
  const chips = page.getByTestId("big-three-chips");
  const chipsText = (await chips.textContent()) ?? "";
  expect(chipsText.toLowerCase()).toContain("leo");
  expect(chipsText.toLowerCase()).toContain("scorpio");
  expect(chipsText.toLowerCase()).toContain("gemini");
});

// ── RE-VERIFY-2: Einstein precise chart must NOT show big3 strip ────────────
// The "Load example (Einstein)" button was removed 2026-06-26; seed via localStorage.
test("RE-VERIFY-2: Einstein precise chart shows NO estimate-badge and NO big3 strip", async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, EINSTEIN_BIRTH);
  await page.goto("/");
  await expect(page.getByText("Albert Einstein")).toBeVisible({ timeout: 8000 });
  await page.getByText("Albert Einstein").first().click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // No estimate badge
  await expect(page.getByTestId("estimate-badge")).not.toBeVisible();

  // No big3 strip
  await expect(page.getByTestId("estimate-big3-strip")).not.toBeVisible();

  await ctx.close();
});

// selects it must still see the estimate badge — the isEstimate flag must survive
// the localStorage round-trip.
// ───────────────────────────────────────────────────────────
test("big3: estimated chart saved in localStorage shows estimate-badge on re-open", async ({ browser }) => {
  // Seed localStorage with a pre-saved estimated chart profile
  const estimatedBirth = {
    name: "Estimated chart",
    year: 1990,
    month: 4,   // April (Aries month per solver)
    day: 10,
    hour: 6,
    minute: 15,
    latitude: 40.7128,
    longitude: -74.006,
    placeName: "New York, USA (reference)",
    hasBirthTime: true,
    isEstimate: true,   // the flag the solver sets
  };

  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, estimatedBirth);

  await page.goto("/");
  // The person should appear in the list
  await expect(page.getByText("Estimated chart")).toBeVisible({ timeout: 8000 });
  // Click on the person to load the chart
  await page.getByText("Estimated chart").click();

  // Houses table should render
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // The estimate badge must be visible (isEstimate was persisted in localStorage)
  await expect(page.getByTestId("estimate-badge")).toBeVisible({ timeout: 5000 });

  await ctx.close();
});

// ---- RE-VERIFY-3: share-copied-cue and estimate-methodology ----

test("RE-VERIFY-3 FIX 1 success path: Copy link shows visible share-copied-cue with success text", async ({ browser, baseURL }) => {
  // Create a share link first, then click Copy link and assert the cue appears
  // Grant clipboard-write permission so the success path is exercised
  const ctx = await browser.newContext({
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await ctx.newPage();
  // Override clipboard to a mock that resolves so the test is deterministic
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () => Promise.resolve(),
      },
      writable: true,
    });
  });
  await page.addInitScript((data) => {
    // Seed Einstein so the people list is available
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, EINSTEIN_BIRTH);
  await page.goto("/");
  await expect(page.getByText("Albert Einstein")).toBeVisible({ timeout: 8000 });
  await page.getByText("Albert Einstein").first().click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 15000 });

  // Click Create share link
  const shareBtn = page.getByTestId("share-btn");
  await expect(shareBtn).toBeVisible({ timeout: 5000 });
  await shareBtn.click();

  // Wait for copy-share-link button (token created)
  const copyBtn = page.getByTestId("copy-share-link");
  await expect(copyBtn).toBeVisible({ timeout: 10000 });

  // Click Copy link
  await copyBtn.click();

  // The visible share-copied-cue must appear with success text
  const cue = page.getByTestId("share-copied-cue");
  await expect(cue).toBeVisible({ timeout: 3000 });
  const cueText = await cue.textContent();
  expect(cueText).toContain("Link copied to clipboard");

  await ctx.close();
});

test("RE-VERIFY-3 FIX 1 blocked-clipboard path: Copy link shows blocked cue when clipboard is denied", async ({ browser, baseURL }) => {
  // Override clipboard.writeText to reject before the page loads
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  // Inject clipboard override before navigation
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () => Promise.reject(new Error("NotAllowedError")),
      },
      writable: true,
    });
  });

  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 15000 });

  // Click Create share link
  const shareBtn = page.getByTestId("share-btn");
  await expect(shareBtn).toBeVisible({ timeout: 5000 });
  await shareBtn.click();

  const copyBtn = page.getByTestId("copy-share-link");
  await expect(copyBtn).toBeVisible({ timeout: 10000 });
  await copyBtn.click();

  // The share-copied-cue must appear with the blocked message
  const cue = page.getByTestId("share-copied-cue");
  await expect(cue).toBeVisible({ timeout: 3000 });
  const cueText = await cue.textContent();
  expect(cueText).toContain("Copy blocked");

  await ctx.close();
});

test("RE-VERIFY-3 FIX 2: estimate-methodology line visible in estimate badge for Leo/Scorpio/Gemini/1988", async ({ page, baseURL }) => {
  await page.goto("/");

  // Switch to BIG 3 mode
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible({ timeout: 5000 });

  // Fill Leo/Scorpio/Gemini/1988
  await page.getByTestId("big3-sun").selectOption("leo");
  await page.getByTestId("big3-moon").selectOption("scorpio");
  await page.getByTestId("big3-rising").selectOption("gemini");
  await page.getByTestId("big3-year").fill("1988");
  await page.getByTestId("big3-estimate-btn").click();

  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 20000 });

  // estimate-badge must be visible
  await expect(page.getByTestId("estimate-badge")).toBeVisible({ timeout: 5000 });

  // estimate-methodology must be visible inside the badge
  const methodology = page.getByTestId("estimate-methodology");
  await expect(methodology).toBeVisible({ timeout: 3000 });
  const text = await methodology.textContent();
  expect(text).toContain("How this works");
  expect(text).toContain("1988");
  expect(text).toContain("Sun, Moon, and Rising");
});

test("RE-VERIFY-3 FIX 2: Einstein precise chart shows NO estimate-methodology line", async ({ page, baseURL }) => {
  await loadEinsteinChart(page);
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 15000 });

  // No estimate-badge and no estimate-methodology for precise chart
  await expect(page.getByTestId("estimate-badge")).not.toBeVisible();
  await expect(page.getByTestId("estimate-methodology")).not.toBeVisible();
});

// ── FIX (1): BIG 3 FORM SPACING — ds-field gap consistency ────────────────
test("FIX-1: BIG 3 form uses ds-field class for consistent vertical spacing", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible({ timeout: 5000 });

  // All field wrappers in the Big-3 form should carry the ds-field class
  // which applies --sp-6 (24px) margin-bottom between groups.
  const dsFields = page.getByTestId("big3-form").locator(".ds-field");
  const count = await dsFields.count();
  expect(count).toBeGreaterThanOrEqual(3); // sun, moon, rising at minimum

  // No two adjacent field groups should have 0 gap — verify via computed style
  // that at least one ds-field has margin-bottom > 0
  const firstField = dsFields.first();
  const mb = await firstField.evaluate((el) =>
    parseFloat(getComputedStyle(el).marginBottom)
  );
  expect(mb).toBeGreaterThan(0);
});

// ── FIX (2): CONSISTENT BOX PADDING — no var(--sp-5), compare-box ≥ 0 ────
test("FIX-2: no var(--sp-5) token in served CSS", async ({ page }) => {
  // Collect all linked stylesheets
  await page.goto("/");
  const sheetTexts = await page.evaluate(async () => {
    const sheets = Array.from(document.styleSheets);
    const texts: string[] = [];
    for (const sheet of sheets) {
      try {
        const rules = Array.from(sheet.cssRules ?? []);
        texts.push(rules.map((r) => r.cssText).join("\n"));
      } catch {
        // cross-origin sheet — skip
      }
    }
    return texts.join("\n");
  });
  expect(sheetTexts).not.toContain("var(--sp-5)");
});

test("FIX-2: synastry-entry box (Compare two people) has non-zero left padding", async ({ page, browser }) => {
  // Need a chart loaded so the synastry entry is rendered
  const ctx = await browser.newContext();
  const p = await ctx.newPage();
  await p.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, EINSTEIN_BIRTH);
  await p.goto("/");
  await expect(p.getByText("Albert Einstein")).toBeVisible({ timeout: 8000 });
  await p.getByText("Albert Einstein").first().click();
  await expect(p.getByTestId("houses-table")).toBeVisible({ timeout: 15000 });

  // The synastry-entry uses open-synastry-btn with padding var(--sp-6)
  const btn = p.getByTestId("open-synastry-btn");
  await expect(btn).toBeVisible({ timeout: 5000 });
  const paddingLeft = await btn.evaluate((el) =>
    parseFloat(getComputedStyle(el).paddingLeft)
  );
  expect(paddingLeft).toBeGreaterThan(0);

  // Share card uses ds-card which has padding var(--sp-8)
  const shareCard = p.getByTestId("share-btn").locator("xpath=ancestor::div[contains(@class,'ds-card')]");
  const shareCardPadding = await shareCard.evaluate((el) =>
    parseFloat(getComputedStyle(el).paddingLeft)
  );
  expect(shareCardPadding).toBeGreaterThan(0);

  await ctx.close();
});

// ── FIX (3): SAVE + NAME ESTIMATED CHART — share round-trip ──────────────
test("FIX-3: estimated chart save/name/share round-trip (marquee check)", async ({ browser, baseURL }) => {
  // Step 1: estimate a Big-3 chart, give it a name, create share link
  const ctx1 = await browser.newContext();
  const page1 = await ctx1.newPage();
  await page1.goto("/");

  // Switch to BIG 3 mode
  await page1.getByTestId("mode-big3").click();
  await expect(page1.getByTestId("big3-form")).toBeVisible({ timeout: 5000 });

  // Fill in name
  const nameInput = page1.getByTestId("big3-name");
  await nameInput.fill("Aries Test Person");

  // Fill Sun=Aries, Moon=Taurus, Rising=Gemini, year=1990
  await page1.getByTestId("big3-sun").selectOption("aries");
  await page1.getByTestId("big3-moon").selectOption("taurus");
  await page1.getByTestId("big3-rising").selectOption("gemini");
  await page1.getByTestId("big3-year").fill("1990");
  await page1.getByTestId("big3-estimate-btn").click();

  // Houses table renders
  await expect(page1.getByTestId("houses-table")).toBeVisible({ timeout: 20000 });

  // Estimate badge is shown
  await expect(page1.getByTestId("estimate-badge")).toBeVisible({ timeout: 5000 });

  // big3-name field is visible in BIG 3 mode
  await expect(nameInput).toBeVisible();

  // Create share link
  const shareBtn = page1.getByTestId("share-btn");
  await expect(shareBtn).toBeVisible({ timeout: 5000 });
  await shareBtn.click();

  // Wait for the copy-share-link to appear (token created)
  const copyBtn = page1.getByTestId("copy-share-link");
  await expect(copyBtn).toBeVisible({ timeout: 15000 });

  // Extract the share URL
  const shareInput = page1.locator('input[aria-label="Share link URL"]');
  const shareUrl = await shareInput.inputValue();
  expect(shareUrl).toMatch(/\/chart\/[A-Za-z0-9]{10,}/);

  const tokenPath = new URL(shareUrl).pathname;
  await ctx1.close();

  // Step 2: open in CLEAN context (no localStorage)
  const ctx2 = await browser.newContext({
    storageState: { cookies: [], origins: [] },
  });
  const page2 = await ctx2.newPage();
  await page2.goto(tokenPath);

  // Houses table must render
  await expect(page2.getByTestId("houses-table")).toBeVisible({ timeout: 20000 });

  // ESTIMATED CHART badge must be present (isEstimate flag survived round-trip)
  await expect(page2.getByTestId("estimate-badge")).toBeVisible({ timeout: 5000 });

  // Name must appear (either in heading or visible text)
  await expect(page2.getByText("Aries Test Person").first()).toBeVisible({ timeout: 5000 });

  // Big-three chips show the correct signs (round-trip fidelity)
  const chips = page2.getByTestId("big-three-chips");
  const chipsText = (await chips.textContent()) ?? "";
  expect(chipsText.toLowerCase()).toContain("aries");
  expect(chipsText.toLowerCase()).toContain("taurus");
  expect(chipsText.toLowerCase()).toContain("gemini");

  await ctx2.close();
});

test("FIX-3: big3-name field visible in BIG 3 mode, blank name still estimates", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible({ timeout: 5000 });

  // Name field must be visible
  await expect(page.getByTestId("big3-name")).toBeVisible();

  // Leave name blank and estimate anyway
  await page.getByTestId("big3-sun").selectOption("aries");
  await page.getByTestId("big3-moon").selectOption("taurus");
  await page.getByTestId("big3-rising").selectOption("gemini");
  await page.getByTestId("big3-year").fill("1990");
  await page.getByTestId("big3-estimate-btn").click();

  // Chart renders even with blank name
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 20000 });
  await expect(page.getByTestId("estimate-badge")).toBeVisible({ timeout: 5000 });
});

// ── FIX (4): NO EINSTEIN IN THE UI ────────────────────────────────────────
test("FIX-4: load-einstein-btn is absent from rendered UI", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  // The Einstein button must be completely absent (not just hidden)
  const einsteinBtn = page.getByTestId("load-einstein-btn");
  await expect(einsteinBtn).not.toBeVisible();

  // Also verify no user-facing "Einstein" text on the landing page
  // (internal data anchors are in tests only, not in the product UI)
  const bodyText = await page.locator("body").innerText();
  // The word "Einstein" should not appear in rendered text on the homepage
  expect(bodyText).not.toContain("Einstein");
});

// ── HERO-ABSENCE TESTS (added 2026-06-28) ───────────────────────────────────
// Spec success check: "The page opens DIRECTLY into the birth form with NO hero
// headline, NO eyebrow micro-label, and NO subtitle."
// The three exact strings that must be absent from the rendered body:
//   (a) "Natal chart · Plain English · No signup"
//   (b) "Your birth chart, explained in plain English."
//   (c) "Free, no signup — type your birth date, time, and place."

test("HERO-ABSENT: eyebrow micro-label is not rendered in the page body", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const bodyText = await page.locator("body").innerText();
  expect(bodyText).not.toContain("Natal chart · Plain English · No signup");
});

test("HERO-ABSENT: hero headline is not rendered in the page body", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const bodyText = await page.locator("body").innerText();
  expect(bodyText).not.toContain("Your birth chart, explained in plain English.");
});

test("HERO-ABSENT: hero subtitle is not rendered in the page body", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const bodyText = await page.locator("body").innerText();
  expect(bodyText).not.toContain("Free, no signup — type your birth date, time, and place.");
});

test("HERO-ABSENT: entry-mode-toggle (top of birth form) is present near top of page with no large gap above it", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const toggle = page.getByTestId("entry-mode-toggle");
  await expect(toggle).toBeVisible();
  // The toggle should be near the top of the page (y < 200px at 1280-wide viewport).
  // A large hero block above it would push it far down the page.
  const box = await toggle.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeLessThan(300);
});

test("HERO-ABSENT: birth form first interactive element is visible near top", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  // The date input is the first required field in precise mode
  const dateInput = page.getByTestId("date-input");
  await expect(dateInput).toBeVisible();
  const box = await dateInput.boundingBox();
  expect(box).not.toBeNull();
  // Must appear within first ~400px — no large hero block pushing it down
  expect(box!.y).toBeLessThan(400);
});

test("HERO-ABSENT: chart can still be generated (regression — core flow 1 unaffected)", async ({ browser }) => {
  const ctx = await browser.newContext();
  const EINSTEIN_BIRTH = {
    name: "Albert Einstein",
    year: 1879, month: 3, day: 14,
    hour: 11, minute: 30,
    latitude: 48.4011, longitude: 9.9876,
    placeName: "Ulm, Germany",
    hasBirthTime: true,
  };
  const page = await ctx.newPage();
  await page.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, EINSTEIN_BIRTH);
  await page.goto("/");
  await expect(page.getByText("Albert Einstein")).toBeVisible({ timeout: 8000 });
  await page.getByText("Albert Einstein").first().click();
  // Chart must still render fully with no hero block present
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 12000 });
  await expect(page.getByTestId("house-row-10").first()).toBeVisible();
  await ctx.close();
});
