import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.locator('#nav-link-groceries').click();
  await page.getByRole('img', { name: 'Banner image' }).click();
  await page.getByRole('textbox', { name: 'or enter an Indian pincode' }).click();
  await page.getByRole('textbox', { name: 'or enter an Indian pincode' }).fill('560048');
  await page.getByLabel('Apply').click();
  await page.getByLabel('Apply').click();
  await page.getByLabel('Apply').click();
  await page.getByText('Skip', { exact: true }).click();
  await page.getByRole('link', { name: 'Egg, Meat & Fish' }).click();
  await page.getByRole('link', { name: 'meat', exact: true }).click();
  await page.getByRole('link', { name: 'Mutton', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'FreshToHome Premium Goat Mince/Kheema | 250g Pack | Fresh | Never Frozen' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Add to cart', exact: true }).click();
  await page.locator('.s-widget-container.s-spacing-small.s-widget-container-height-small.celwidget.slot\\=MAIN.template\\=SEARCH_RESULTS.widgetId\\=search-results_8 > span > .puis-card-container > div > div > .puisg-col.puisg-col-4-of-4.puisg-col-4-of-8.puisg-col-8-of-12 > div').click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'FreshToHome Mutton Bone' }).click();
  const page2 = await page2Promise;
  await page2.getByRole('button', { name: 'Add to cart', exact: true }).click();
  await page2.getByRole('link', { name: 'items in cart' }).click();
  await page2.getByRole('button', { name: 'Proceed to Buy Fresh Meat' }).click();
});