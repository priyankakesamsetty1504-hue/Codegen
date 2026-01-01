import { test, expect } from '@playwright/test';

test('add multiple products and clear cart', async ({ page }) => {

  await page.goto('https://www.amazon.in/', { waitUntil: 'domcontentloaded' });

  // Close popups if present
  const accept = page.locator('input[name="accept"]');
  if (await accept.isVisible().catch(() => false)) {
    await accept.click();
  }
  await page.keyboard.press('Escape');

  // -------- Product 1 --------
  await page.locator('#twotabsearchtextbox').fill('Da URBAN stool');
  await page.keyboard.press('Enter');

  const product1 = page.locator('[data-component-type="s-search-result"] h2 a').first();
  await Promise.all([
    page.waitForURL(/\/dp\//),
    product1.click()
  ]);

  await page.locator('#add-to-cart-button').click();

  // -------- Product 2 --------
  await page.locator('#twotabsearchtextbox').fill('HP wireless headphones');
  await page.keyboard.press('Enter');

  const product2 = page.locator('[data-component-type="s-search-result"] h2 a').first();
  await Promise.all([
    page.waitForURL(/\/dp\//),
    product2.click()
  ]);

  await page.locator('#add-to-cart-button').click();

  // -------- Product 3 --------
  await page.locator('#twotabsearchtextbox').fill('HP neckband');
  await page.keyboard.press('Enter');

  const product3 = page.locator('[data-component-type="s-search-result"] h2 a').first();
  await Promise.all([
    page.waitForURL(/\/dp\//),
    product3.click()
  ]);

  await page.locator('#add-to-cart-button').click();

  // -------- Go to Cart --------
  await page.locator('#nav-cart').click();

  // -------- Delete all items --------
  const deleteButtons = page.locator('input[value="Delete"]');
  const count = await deleteButtons.count();

  for (let i = 0; i < count; i++) {
    await deleteButtons.first().click();
    await page.waitForTimeout(1000);
  }

  // -------- Verify cart is empty --------
  await expect(page.locator('#sc-subtotal-label-activecart')).toContainText('0 items');
});
