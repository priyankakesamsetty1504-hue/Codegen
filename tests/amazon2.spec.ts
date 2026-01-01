import { test, expect } from '@playwright/test';

test('change delivery pincode', async ({ page }) => {

  await page.goto('https://www.amazon.in/', { waitUntil: 'domcontentloaded' });

  // Close any popup
  await page.keyboard.press('Escape');

  // Click delivery location icon (top left)
  await page.locator('#nav-global-location-popover-link').click();

  // Wait for location modal
  await page.locator('#GLUXZipUpdateInput').waitFor({ state: 'visible' });

  // Enter pincode
  await page.locator('#GLUXZipUpdateInput').fill('500060');

  // Click Apply
  await page.locator('#GLUXZipUpdate').click();

  // Wait for update to complete
  await page.waitForTimeout(3000);

  // Validate location changed
  const locationText = await page.locator('#glow-ingress-line2').innerText();
  expect(locationText).toContain('500060');
});
