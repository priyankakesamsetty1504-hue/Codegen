import { test, expect } from '@playwright/test';

test('amazon add to cart', async ({ page, context }) => {
  await page.goto('https://www.amazon.in/');

  await page.getByRole('link', { name: 'Fashion' }).click();
  await page.getByRole('link', { name: 'Luggage & Bags' }).click();
 
  const productLink = page.getByRole('link', {
  name: 'WildHorn Rfid Protected Leather Wallet For Men, Brown'
});

await Promise.all([
  page.waitForURL(/\/dp\/|\/gp\/product\//),   // 👈 wait for product page
  productLink.click()
]);

// Now you are guaranteed on product page
//await page.getByRole('button', { name: 'Add to Cart' }).click();
await page.locator('#add-to-cart-button').click();
await page.getByRole('link', { name: 'Item in Cart' }).click();
});
