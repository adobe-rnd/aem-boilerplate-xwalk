import { test, expect } from '../fixtures.js';
import { openPage } from '../utils.js';

test.describe('setFocus tests', () => {
  const testURL = '/drafts/tests/x-walk/wizardvalidation';
  test.skip('setFocus test wizard', async ({ page }) => {
    await openPage(page, testURL);
    await expect(await page.$eval('fieldset[name="item_1"]', (el) => el.classList.contains('current-wizard-step'))).toBeTruthy(); // check first panel is active
    await expect(await page.$eval('li[data-index="0"]', (el) => el.classList.contains('wizard-menu-active-item'))).toBeTruthy(); // check first menu item is active

    const textinput = await page.getByLabel('Text Input');
    await textinput.fill('xyz');
    await textinput.press('Tab');

    await expect(await page.$eval('fieldset[name="item_2"]', (el) => el.classList.contains('current-wizard-step'))).toBeTruthy(); // check second panel is active
    await expect(await page.$eval('li[data-index="1"]', (el) => el.classList.contains('wizard-menu-active-item'))).toBeTruthy(); // check second menu item is active
    await expect(await page.locator('div').filter({ hasText: /^Number Input$/ })).toHaveAttribute('data-active', 'true'); // check number input is active

    const numberinput = await page.getByLabel('Number Input');
    await numberinput.fill('3');
    await numberinput.press('Tab');

    await expect(await page.$eval('fieldset[name="item_3"]', (el) => el.classList.contains('current-wizard-step'))).toBeTruthy(); // check third panel is active
    await expect(await page.$eval('li[data-index="2"]', (el) => el.classList.contains('wizard-menu-active-item'))).toBeTruthy(); // check third menu item is active
    await expect(await page.locator('div').filter({ hasText: /^Email Input$/ })).toHaveAttribute('data-active', 'true'); // check email input is active
  });

  const url = '/content/aem-boilerplate-forms-xwalk-collaterals/set-focus';
  test('scroll into view for set focus', async ({ page }) => {
    await openPage(page, url);
    const button = await page.getByRole('button', { name: 'Button' });
    await button.click();
    const textInput = await page.getByLabel('Text Input');
    await expect(textInput).toBeFocused();
    await expect(textInput).toBeInViewport();
  });
});
