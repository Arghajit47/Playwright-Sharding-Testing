// @ts-check
const { test, expect } = require('@playwright/test');
const allure = require("allure-js-commons");

test("has title", { tag: "@test" }, async ({ page }) => {
  await allure.severity("normal");
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", { tag: "@test" }, async ({ page }) => {
  await allure.severity("normal");
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

