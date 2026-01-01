import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.getByRole('link', { name: 'Home & Kitchen' }).click();
  await page.getByRole('link', { name: 'Da URBAN® Classic Height' }).click();
  await page.getByRole('radio', { name: 'PACK OF 2' }).click();
  await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
  await page.getByRole('link', { name: 'Electronics' }).click();
  await page.getByRole('link', { name: 'HP H200 On Ear Wireless' }).click();
  await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
  await page.getByRole('link', { name: 'HP H100 Wireless Neckband' }).first().click();
  await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
  await page.getByRole('link', { name: 'items in cart' }).click();
  await page.getByRole('button', { name: 'Delete HP H100 Wireless' }).first().click();
  await page.getByRole('button', { name: 'Delete HP H200 On Ear' }).first().click();
  await page.getByRole('group', { name: 'Quantity is' }).getByLabel('Delete Da URBAN - M-').click();
});