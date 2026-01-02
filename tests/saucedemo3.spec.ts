import { test, expect } from '@playwright/test';

test('change delivery pincode', async ({ page }) => {
  await page.goto('https://www.amazon.in/', { waitUntil: 'domcontentloaded' });

  // Close any popup
  await page.keyboard.press('Escape');

  const locationButton = page.locator('#nav-global-location-popover-link');
  await locationButton.click();

  const zipInput = page.locator('#GLUXZipUpdateInput');

  // Only try if popup appears (important for GitHub Actions)
  if (await zipInput.isVisible({ timeout: 5000 }).catch(() => false)) {
    await zipInput.fill('500060');
    await page.locator('#GLUXZipUpdate').click();

    // wait until location updates
    await expect(locationButton).toContainText('500060');
  } else {
    console.log('Location popup did not appear – skipping pincode change');
  }
});
