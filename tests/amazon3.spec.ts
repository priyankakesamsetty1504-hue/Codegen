import { test, expect } from '@playwright/test';

test('amazon fresh add mutton to cart', async ({ page }) => {

  await page.goto('https://www.amazon.in', { waitUntil: 'domcontentloaded' });

  // Close any popup
  await page.keyboard.press('Escape');

  // Open delivery location
  await page.locator('#nav-global-location-popover-link').click();
  await page.locator('#GLUXZipUpdateInput').fill('560048');
  await page.locator('#GLUXZipUpdate').click();
  await page.waitForTimeout(3000);

  // Open Amazon Fresh
  await page.locator('#nav-link-groceries').click();

  // Select Meat category
  await page.locator('a[href*="meat"]').first().click();
  await page.getByRole('link', { name: 'Mutton' }).click();

  // Click first product
  await page.locator('[data-component-type="s-search-result"] h2 a').first().click();

  // New tab handling (CI safe)
  const productPage = await page.context().waitForEvent('page');
  await productPage.waitForLoadState();

  // Add to cart
  await productPage.locator('#add-to-cart-button').click();

  // Verify item added
  await productPage.locator('#nav-cart-count').waitFor();
  const count = await productPage.locator('#nav-cart-count').innerText();
  expect(Number(count)).toBeGreaterThan(0);
});