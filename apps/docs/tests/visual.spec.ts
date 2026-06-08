import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/components/product-button", id: "product-button" },
  { path: "/components/brand-button", id: "brand-button" },
];

for (const page of PAGES) {
  test(`${page.id} renders without horizontal overflow`, async ({ page: p }) => {
    await p.goto(page.path);
    await expect(p.locator("h1")).toBeVisible();
    const overflow = await p.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test(`${page.id} visual snapshot`, async ({ page: p }, testInfo) => {
    await p.goto(page.path);
    await expect(p.locator("h1")).toBeVisible();
    await expect(p).toHaveScreenshot(`${page.id}-${testInfo.project.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
}
