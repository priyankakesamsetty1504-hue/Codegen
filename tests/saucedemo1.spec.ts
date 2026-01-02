import { test, expect } from '@playwright/test';

test('add multiple products and clear cart', async ({ page }) => {

  // 1. Open SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // 2. Login
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // 3. Verify login
  await expect(page).toHaveURL(/inventory/);

  // 4. Add multiple products
  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await page.locator('#add-to-cart-sauce-labs-bike-light').click();
  await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();

  // 5. Go to cart
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart/);

  // 6. Remove all items
  const removeButtons = page.locator('button:has-text("Remove")');
  const count = await removeButtons.count();

  for (let i = 0; i < count; i++) {
    await removeButtons.first().click();
  }

  // 7. Verify cart is empty
  await expect(page.locator('.cart_item')).toHaveCount(0);
});