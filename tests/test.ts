import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('index page has expected h1', async ({ page }) => {
	await page.goto('https://google.de');
	const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
	console.log(accessibilityScanResults);
	expect(accessibilityScanResults.violations).toEqual([]);
	// await expect(page.getByRole('heading', { name: 'Paul stinkt nach Arschkriechen' })).toBeVisible();
});
