import { test, expect } from '@playwright/test';

test('add multiple products and clear cart', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // Add 3 products
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

  // Go to cart
  await page.locator('.shopping_cart_link').click();

  // Remove all items
  const removeButtons = page.locator('button[data-test^="remove"]');
  while (await removeButtons.count() > 0) {
    await removeButtons.first().click();
  }

  // Verify cart empty
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});