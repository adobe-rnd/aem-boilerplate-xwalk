import { test, expect } from '../fixtures.js';
import { openPage } from '../utils.js';


test.describe('service worker test suite', () => {
const url = '/content/aem-boilerplate-forms-xwalk-collaterals/worker';
test('sync changes from service worker to main thread', async ({ page }) => {
    await openPage(page, url);
    // on form init an api is invoked and its reponse is set as the value of text input field
    const textInput = await page.getByLabel('Text Input');
    await expect(textInput).toHaveValue('success');
  });
});