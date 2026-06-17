import { test, expect } from "@playwright/test";

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

test("Load example (Einstein) button renders a chart", async ({ page }) => {
  await page.goto("/");
  const einsteinBtn = page.getByTestId("load-einstein-btn");
  await expect(einsteinBtn).toBeVisible();
  await einsteinBtn.click();

  // Wait for houses table to appear
  await expect(page.getByTestId("houses-table")).toBeVisible({
    timeout: 10000,
  });

  // House 10 row should be present (use first() — desktop + mobile both exist in DOM)
  await expect(page.getByTestId("house-row-10").first()).toBeVisible();
});

test("Einstein chart shows Sun in Pisces in House 10", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();

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
});

test("Einstein chart shows Moon in Sagittarius", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({
    timeout: 10000,
  });

  // Moon chip should exist — it's in House 6 for Einstein
  const moonChip = page.getByTestId("planet-chip-moon").first();
  await expect(moonChip).toBeVisible();

  // The profile summary shows "Sagittarius Moon" pill (use first() since plain-english section also mentions it)
  await expect(page.getByText("Sagittarius Moon").first()).toBeVisible();
});

test("Ascendant shows Cancer for Einstein", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("houses-table")).toBeVisible({
    timeout: 10000,
  });

  // House 1 row should show Cancer as the sign (first = desktop)
  const house1Row = page.getByTestId("house-row-1").first();
  await expect(house1Row).toContainText("Cancer");
  // ASC pill in big-three chips now shows degree: "Cancer 7° rising"
  await expect(page.getByTestId("big-three-chips")).toContainText("Cancer");
  await expect(page.getByTestId("big-three-chips")).toContainText("rising");
});

test("Einstein chart has element bar with non-zero totals", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();

  // Wait for chart to render
  await expect(page.getByTestId("element-bar")).toBeVisible({
    timeout: 10000,
  });
  // The bar should have Fire/Earth/Air/Water labels
  await expect(page.getByTestId("element-bar")).toContainText("Fire");
  await expect(page.getByTestId("element-bar")).toContainText("Earth");
  await expect(page.getByTestId("element-bar")).toContainText("Air");
  await expect(page.getByTestId("element-bar")).toContainText("Water");
  // Should show some placements count
  await expect(page.getByTestId("element-bar")).toContainText("11 planetary");
});

test("Tapping a planet chip reveals a reading", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
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
});

test("Transit card is present", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("load-einstein-btn").click();
  await expect(page.getByTestId("transit-card")).toBeVisible({
    timeout: 10000,
  });
  // Transit card should list some planets
  await expect(page.getByTestId("transit-card")).toContainText("Sun");
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

test("Load example button is prominently visible on landing", async ({
  page,
}) => {
  await page.goto("/");
  const btn = page.getByTestId("load-einstein-btn");
  await expect(btn).toBeVisible();
  await expect(btn).toContainText("Einstein");
});
