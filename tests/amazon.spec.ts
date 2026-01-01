import { test, expect } from '@playwright/test';

test('amazon add to cart', async ({ page }) => {

  await page.goto('https://www.amazon.in/', { waitUntil: 'domcontentloaded' });

  // Close cookies / location popup if present
  const continueBtn = page.locator('input[name="accept"]');
  if (await continueBtn.isVisible().catch(() => false)) {
    await continueBtn.click();
  }

  // Sometimes Amazon shows location popup
  const locationPopup = page.locator('#nav-global-location-popover-link');
  if (await locationPopup.isVisible().catch(() => false)) {
    await page.keyboard.press('Escape');
  }

  // Go directly to search instead of unstable menu
  await page.locator('#twotabsearchtextbox').fill('WildHorn leather wallet for men');
  await page.keyboard.press('Enter');

  // Click first product
  const firstProduct = page.locator('[data-component-type="s-search-result"] h2 a').first();
  await Promise.all([
    page.waitForURL(/\/dp\//),
    firstProduct.click()
  ]);

  // Add to cart
  await page.locator('#add-to-cart-button').waitFor({ state: 'visible' });
  await page.locator('#add-to-cart-button').click();

  // Verify item added
  await expect(page.locator('#sw-gtc')).toBeVisible();
});
