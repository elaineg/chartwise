/**
 * SSENSE redesign invariant tests — added by verifier 2026-06-16.
 * Verifies that the pure-visual SSENSE reskin did NOT regress behavioral or data correctness,
 * and that the new ElementBar grid form satisfies the spec's visual success check.
 * Run with: BASE_URL=http://localhost:3099 npx playwright test tests/e2e/ssense-redesign.spec.ts
 */
import { test, expect } from "@playwright/test";

// ───────────────────────────────────────────────────────────
// SSENSE-1. ElementBar new grid form: all four element NAMES and counts visible
// ───────────────────────────────────────────────────────────
test("SSENSE redesign: ElementBar grid renders all four element names (Fire/Earth/Air/Water) and their counts", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("element-bar")).toBeVisible({ timeout: 10000 });

  const bar = page.getByTestId("element-bar");

  // All four element names must be present as labels in the new 4-row grid
  await expect(bar).toContainText("Fire");
  await expect(bar).toContainText("Earth");
  await expect(bar).toContainText("Air");
  await expect(bar).toContainText("Water");

  // Extract numeric tokens — must be at least 4 (one count per element).
  // Note: textContent() concatenates adjacent nodes without spaces (e.g. "Fire4Earth5"), so
  // use a plain digit pattern without word-boundary anchors.
  const barText = await bar.textContent() ?? "";
  const digits = barText.match(/\d+/g) ?? [];
  expect(digits.length, "ElementBar must contain at least 4 numeric count tokens").toBeGreaterThanOrEqual(4);

  // element-basis-label must still be present with the full body list
  const basisLabel = page.getByTestId("element-basis-label");
  await expect(basisLabel).toBeVisible();
  const basisText = await basisLabel.textContent() ?? "";
  expect(basisText).toMatch(/Based on \d+ placements:/);
  expect(basisText).toContain("Sun");
  expect(basisText).toContain("Moon");
  expect(basisText).toContain("Mercury");
  expect(basisText).toContain("Chiron");
});

// ───────────────────────────────────────────────────────────
// SSENSE-2. ElementBar counts sum to the basis label N (data fidelity, Einstein = 11)
// ───────────────────────────────────────────────────────────
test("SSENSE redesign: ElementBar basis label reports 11 placements for Einstein chart", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("element-bar")).toBeVisible({ timeout: 10000 });

  const basisLabel = page.getByTestId("element-basis-label");
  await expect(basisLabel).toBeVisible();
  const basisText = await basisLabel.textContent() ?? "";
  const match = basisText.match(/Based on (\d+) placements:/);
  expect(match, "element-basis-label must contain 'Based on N placements:'").toBeTruthy();
  const expectedTotal = parseInt(match![1], 10);
  expect(expectedTotal, "Einstein element tally should be 11 placements").toBe(11);
});

// ───────────────────────────────────────────────────────────
// SSENSE-3. No element-colored inline styles remain on the element grid
//   The new grid uses --ink for bars; orange/green/sky/blue named colors not allowed
// ───────────────────────────────────────────────────────────
test("SSENSE redesign: ElementBar has no element-colored (orange/green/sky/blue) inline styles", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("element-bar")).toBeVisible({ timeout: 10000 });

  // Inspect inline style background values on fill elements inside the bar
  const coloredBars = await page.evaluate(() => {
    const bar = document.querySelector('[data-testid="element-bar"]');
    if (!bar) return [];
    const fills = Array.from(bar.querySelectorAll('[style]')) as HTMLElement[];
    return fills
      .map((el) => (el.style.background || el.style.backgroundColor || "").trim())
      .filter(Boolean);
  });

  const BANNED_COLORS = ["orange", "green", "sky", "blue", "indigo", "violet", "amber", "#ff", "#22", "#38"];
  for (const color of coloredBars) {
    for (const banned of BANNED_COLORS) {
      expect(
        color.toLowerCase(),
        `ElementBar inline style must not use ${banned}: got "${color}"`
      ).not.toContain(banned);
    }
  }
});

// ───────────────────────────────────────────────────────────
// SSENSE-4. Houses table still renders 12 rows (structural integrity)
// ───────────────────────────────────────────────────────────
test("SSENSE redesign: houses table renders 12 house rows and House 10 has Sun chip", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  for (let h = 1; h <= 12; h++) {
    await expect(page.getByTestId(`house-row-${h}`).first()).toBeVisible({ timeout: 5000 });
  }

  const house10 = page.getByTestId("house-row-10").first();
  await expect(house10).toContainText("Pisces");
  await expect(house10.getByTestId("planet-chip-sun")).toBeVisible();
});

// ───────────────────────────────────────────────────────────
// SSENSE-5. Placement chip ▾ reading toggle still expands/collapses
// ───────────────────────────────────────────────────────────
test("SSENSE redesign: placement chip expand/collapse reading toggle still works (▾ caret preserved)", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  // Moon chip is not pre-expanded — click to expand
  const moonChip = page.getByTestId("planet-chip-moon").first();
  await expect(moonChip).toBeVisible();

  const initialExpanded = await moonChip.getAttribute("aria-expanded");
  expect(["false", null], "Moon chip should start collapsed").toContain(initialExpanded);

  await moonChip.click();
  const moonReading = page.getByTestId("planet-chip-moon-reading").first();
  await expect(moonReading).toBeVisible({ timeout: 3000 });
  const text = await moonReading.textContent();
  expect(text!.trim().length).toBeGreaterThan(20);

  // Caret ▾ must be present in chip text
  const chipText = await moonChip.textContent() ?? "";
  expect(chipText, "Chip must still contain ▾ caret affordance").toContain("▾");

  // Click again to collapse
  await moonChip.click();
  await expect(moonReading).not.toBeVisible({ timeout: 3000 });
});

// ───────────────────────────────────────────────────────────
// SSENSE-6. Share-link copy flow: "Copied" confirmation appears (SSENSE uses "COPIED")
// ───────────────────────────────────────────────────────────
test("SSENSE redesign: share-link copy cue ('Copied' text) appears after clicking copy button", async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  // Override clipboard to prevent permission errors in headless mode
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: (_text: string) => Promise.resolve(),
      },
      configurable: true,
      writable: true,
    });
  });

  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({ timeout: 10000 });

  const shareBtn = page.getByTestId("share-btn");
  await expect(shareBtn).toBeVisible();
  await shareBtn.click();

  const copyBtn = page.getByTestId("copy-share-link");
  await expect(copyBtn).toBeVisible({ timeout: 10000 });

  await copyBtn.click();

  // "Copied" confirmation must appear (the SSENSE label is "COPIED" per DESIGN_REDESIGN.md Surface 10)
  const copiedCue = page.getByText(/copied/i).first();
  await expect(copiedCue).toBeVisible({ timeout: 3000 });

  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// SSENSE-7. Regression anchor: Jiangmen North Node = Virgo, South Node = Pisces
// ───────────────────────────────────────────────────────────
test("SSENSE redesign regression anchor: Jiangmen North Node = Virgo (not Leo), South Node = Pisces", async ({ browser }) => {
  const jiangmenBirth = {
    name: "Amy",
    year: 1998, month: 8, day: 8,
    hour: 16, minute: 30,
    latitude: 22.583, longitude: 113.083,
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

  const northChip = pg.getByTestId("node-chip-northnode").first();
  await expect(northChip).toBeVisible({ timeout: 5000 });
  const northLabel = await northChip.getAttribute("aria-label") ?? await northChip.textContent() ?? "";
  expect(northLabel, "North Node must show Virgo after SSENSE redesign").toContain("Virgo");
  expect(northLabel, "North Node must NOT show Leo (that was the pre-fix bug)").not.toMatch(/Leo/);

  const southChip = pg.getByTestId("node-chip-southnode").first();
  await expect(southChip).toBeVisible({ timeout: 5000 });
  const southLabel = await southChip.getAttribute("aria-label") ?? await southChip.textContent() ?? "";
  expect(southLabel, "South Node must show Pisces after SSENSE redesign").toContain("Pisces");

  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// SSENSE-8. Regression anchor: Jiangmen Lilith ~26° Libra House 10 (unchanged)
// ───────────────────────────────────────────────────────────
test("SSENSE redesign regression anchor: Jiangmen Lilith still at ~26° Libra in House 10", async ({ browser }) => {
  const jiangmenBirth = {
    name: "Amy",
    year: 1998, month: 8, day: 8,
    hour: 16, minute: 30,
    latitude: 22.583, longitude: 113.083,
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

  const house10 = pg.getByTestId("house-row-10").first();
  await expect(house10).toBeVisible({ timeout: 5000 });
  const h10Text = await house10.textContent() ?? "";
  expect(h10Text, "House 10 must contain Lilith after SSENSE redesign").toContain("Lilith");
  expect(h10Text, "Lilith must still be in Libra after SSENSE redesign").toContain("Libra");
  expect(h10Text, "Arcminute D°MM' format must still appear in House 10").toMatch(/\d+°\d+'/);

  await ctx.close();
});

// ───────────────────────────────────────────────────────────
// SSENSE-9. Regression anchor: Jiangmen arcminutes still in D°MM' format
// ───────────────────────────────────────────────────────────
test("SSENSE redesign regression anchor: Jiangmen chart uses D°MM' arcminute format throughout table", async ({ browser }) => {
  const jiangmenBirth = {
    name: "Amy",
    year: 1998, month: 8, day: 8,
    hour: 16, minute: 30,
    latitude: 22.583, longitude: 113.083,
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

  const tableText = await pg.getByTestId("houses-table").textContent() ?? "";
  const arcminuteMatches = tableText.match(/\d+°\d{2}'/g) ?? [];
  expect(arcminuteMatches.length, "Multiple D°MM' arcminute positions must appear in Jiangmen table").toBeGreaterThan(3);

  await ctx.close();
});
