import { test, expect } from '../fixtures.js';
import { openPage } from '../utils.js';


test.describe('import data on a panel with initalise enums rule on radio button', () => {
const url = '/content/aem-boilerplate-forms-xwalk-collaterals/import-data';
test('sync changes from service worker to main thread', async ({ page }) => {
    await openPage(page, url);
    const button = await page.getByText('Button');
    await button.click();
    const panels = await page.getByText('Panel');
    // Assert that panels should be of length 13
    await expect(panels).toHaveCount(13);
    const radios = await page.locator('.radio-group-wrapper');
    const radioElements = await radios.all();
    for (const radio of radioElements) {
        // Get all radio-wrapper elements within this radio
        const radioWrappers = await radio.locator('.radio-wrapper').all();
        // Assert that we found 4 radio-wrapper elements
        expect(radioWrappers).toHaveLength(4);
    }
  });
});