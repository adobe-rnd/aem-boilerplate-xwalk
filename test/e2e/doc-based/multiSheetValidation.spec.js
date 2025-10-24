import { test, expect } from '@playwright/test';
import {openPage} from "../utils.js";

let requestPayload = null;
const expectedPayload = {
  textInput: 'adobe',
  'check-opiton1': 'on',
  'check-opiton2': null
};
test.describe('Validation of Form Generation from Multi-Sheet Document', () => {
  const testURL = '/multisheetrulesvalidation';
  const testURL1 = '/multisheetcomponentvalidation';

  test('Validation of components Form Generation form Multi-Sheet Document', async ({ page }) => {
    await openPage(page, testURL, 'docbased');

    await page.getByRole('radio', { name: 'Item 1' }).click();
    const emailInput = page.getByLabel("Email Input")
    await expect(emailInput).toBeVisible();
    const textInput = page.getByLabel("Test Name")
    await textInput.fill('Sample Text');
    await emailInput.fill('test@example.com');
    const resetButton = page.getByRole('button', { name: 'Reset' });
    await resetButton.click();
    await expect(emailInput).not.toBeVisible();
    await expect(textInput).toHaveValue('');
  });

  test('Validation of rules Form Generation form Multi-Sheet Document', async ({ page }) => {
    await openPage(page, testURL1, 'docbased');

    // listeners to fetch payload form submission.
    page.on('request', async (request) => {
      requestPayload = request.postData();
    });
    await page.getByRole('checkbox', { name: 'Item 1' }).click();
    const textInput = page.getByLabel("Text Input")
    await textInput.fill('adobe');
    await page.getByRole('button', {name: 'Submit'}).click();
    const parsedPayload = JSON.parse(requestPayload);

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in expectedPayload) {
      expect(parsedPayload.data[key]).toBe(expectedPayload[key]);
    }
  });
});
