import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.getByRole('button', { name: 'Delivering to Hyderabad' }).click();
  await page.getByRole('textbox', { name: 'or enter an Indian pincode' }).click();
  await page.getByRole('textbox', { name: 'or enter an Indian pincode' }).fill('500060');
  await page.getByLabel('Apply').click();
});