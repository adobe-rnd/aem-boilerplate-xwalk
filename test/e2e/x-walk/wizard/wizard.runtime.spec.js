import { test, expect } from '../../fixtures.js';
import { openPage } from '../../utils.js';

test.describe('Wizard test', () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/wizard';
  test('test hidden required fields don\'t prevent wizard navigation', async ({ page }) => {
    await openPage(page, testURL);
    const nxtBtn = await page.getByRole('button', { name: 'Next' });
    await nxtBtn.click();
    expect(await page.locator('#textinput-cc9dc604c7-description').textContent()).toBe('Please fill in this field.');
    const textInput = await page.getByLabel('Text Input');
    await textInput.fill('abc');
    await nxtBtn.click();
    await expect(page.locator('.current-wizard-step')).toHaveAttribute('data-index', '1');
  });
});
