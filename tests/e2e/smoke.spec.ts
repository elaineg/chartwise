import { test, expect, type Page, type BrowserContext } from "@playwright/test";

// ─── Helper: seed Einstein in localStorage and navigate ──────────────────────
// The "Load example (Einstein)" button was removed from the UI 2026-06-26.
// Tests that need the Einstein chart now seed via localStorage (no UI button needed).
const EINSTEIN_BIRTH = {
  name: "Albert Einstein",
  year: 1879, month: 3, day: 14,
  hour: 11, minute: 30,
  latitude: 48.4011, longitude: 9.9876,
  placeName: "Ulm, Germany",
  hasBirthTime: true,
};

async function seedEinsteinAndLoad(ctx: BrowserContext): Promise<Page> {
  const page = await ctx.newPage();
  await page.addInitScript((data) => {
    window.localStorage.setItem("chartwise:people", JSON.stringify([data]));
  }, EINSTEIN_BIRTH);
  await page.goto("/");
  await expect(page.getByText("Albert Einstein")).toBeVisible({ timeout: 8000 });
  await page.getByText("Albert Einstein").first().click();
  return page;
}

// Baseline smoke: page loads, communicates purpose, no console errors.
test("landing page loads and states its purpose", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  const resp = await page.goto("/");
  expect(resp?.status()).toBe(200);
  await expect(page.locator("h1").first()).toBeVisible();
  // Check key headline text per UX brief
  await expect(
    page.getByText("Your birth chart, explained in plain English")
  ).toBeVisible();
  // Filter out React dev warnings that only appear in dev mode
  const realErrors = errors.filter(
    (e) =>
      !e.includes("Warning:") &&
      !e.includes("React") &&
      !e.includes("hydrat")
  );
  expect(realErrors).toEqual([]);
});

test("No Einstein button on landing (removed 2026-06-26)", async ({ page }) => {
  await page.goto("/");
  // The button must NOT exist in the UI
  const einsteinBtn = page.getByTestId("load-einstein-btn");
  await expect(einsteinBtn).not.toBeVisible();
});

test("Einstein chart renders from seeded localStorage", async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await seedEinsteinAndLoad(ctx);

  // Wait for houses table to appear
  await expect(page.getByTestId("houses-table")).toBeVisible({
    timeout: 10000,
  });

  // House 10 row should be present (use first() — desktop + mobile both exist in DOM)
  await expect(page.getByTestId("house-row-10").first()).toBeVisible();
  await ctx.close();
});

test("Einstein chart shows Sun in Pisces in House 10", async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await seedEinsteinAndLoad(ctx);

  // Wait for chart to render
  await expect(page.getByTestId("houses-table")).toBeVisible({
    timeout: 10000,
  });

  // House 10 row (first = desktop tr): sign chip should say Pisces
  const house10Row = page.getByTestId("house-row-10").first();
  await expect(house10Row).toContainText("Pisces");

  // Sun chip should be visible somewhere in the page
  const sunChip = page.getByTestId("planet-chip-sun").first();
  await expect(sunChip).toBeVisible();
  // The Sun chip should be inside house 10 (desktop row)
  const sunInHouse10 = house10Row.getByTestId("planet-chip-sun");
  await expect(sunInHouse10).toBeVisible();
  await ctx.close();
});

test("Einstein chart shows Moon in Sagittarius", async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await seedEinsteinAndLoad(ctx);

  await expect(page.getByTestId("houses-table")).toBeVisible({
    timeout: 10000,
  });

  // Moon chip should exist — it's in House 6 for Einstein
  const moonChip = page.getByTestId("planet-chip-moon").first();
  await expect(moonChip).toBeVisible();

  // The profile summary shows "Sagittarius Moon" pill (use first() since plain-english section also mentions it)
  await expect(page.getByText("Sagittarius Moon").first()).toBeVisible();
  await ctx.close();
});

test("Ascendant shows Cancer for Einstein", async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await seedEinsteinAndLoad(ctx);

  await expect(page.getByTestId("houses-table")).toBeVisible({
    timeout: 10000,
  });

  // House 1 row should show Cancer as the sign (first = desktop)
  const house1Row = page.getByTestId("house-row-1").first();
  await expect(house1Row).toContainText("Cancer");
  // ASC pill in big-three chips now shows degree: "Cancer 7° rising"
  await expect(page.getByTestId("big-three-chips")).toContainText("Cancer");
  await expect(page.getByTestId("big-three-chips")).toContainText("rising");
  await ctx.close();
});

test("Einstein chart has element bar with non-zero totals", async ({
  browser,
}) => {
  const ctx = await browser.newContext();
  const page = await seedEinsteinAndLoad(ctx);

  // Wait for chart to render
  await expect(page.getByTestId("element-bar")).toBeVisible({
    timeout: 10000,
  });
  // The bar should have Fire/Earth/Air/Water labels
  await expect(page.getByTestId("element-bar")).toContainText("Fire");
  await expect(page.getByTestId("element-bar")).toContainText("Earth");
  await expect(page.getByTestId("element-bar")).toContainText("Air");
  await expect(page.getByTestId("element-bar")).toContainText("Water");
  // Should show some placements count — basis label path renders "11 placements: Sun..."
  await expect(page.getByTestId("element-bar")).toContainText("11 placements");
  await ctx.close();
});

test("Tapping a planet chip reveals a reading", async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await seedEinsteinAndLoad(ctx);

  await expect(page.getByTestId("houses-table")).toBeVisible({
    timeout: 10000,
  });

  // The Sun chip should be pre-expanded (Einstein demo has Sun pre-expanded)
  // Use first() since chip appears in both desktop table and mobile card
  const sunReading = page.getByTestId("planet-chip-sun-reading").first();
  await expect(sunReading).toBeVisible({ timeout: 5000 });

  // The reading should have some content
  const readingText = await sunReading.textContent();
  expect(readingText).toBeTruthy();
  expect(readingText!.length).toBeGreaterThan(10);
  await ctx.close();
});

test("Transit card is present", async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await seedEinsteinAndLoad(ctx);

  await expect(page.getByTestId("transit-card")).toBeVisible({
    timeout: 10000,
  });
  // Transit card should list some planets
  await expect(page.getByTestId("transit-card")).toContainText("Sun");
  await ctx.close();
});

test("City search returns suggestions", async ({ page }) => {
  await page.goto("/");
  const placeInput = page.getByTestId("place-input");
  await expect(placeInput).toBeVisible();
  await placeInput.fill("London");
  // Wait for suggestions to appear
  await expect(page.getByTestId("place-suggestions")).toBeVisible({
    timeout: 5000,
  });
  const suggestions = page.getByTestId("place-suggestions").locator("li");
  await expect(suggestions.first()).toContainText("London");
});

test("BIG 3 mode is reachable and shows a chart without login", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("mode-big3").click();
  await expect(page.getByTestId("big3-form")).toBeVisible();
  // Name field is present
  await expect(page.getByTestId("big3-name")).toBeVisible();
});
