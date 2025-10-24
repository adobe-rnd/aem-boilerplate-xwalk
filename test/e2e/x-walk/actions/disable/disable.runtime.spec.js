import { test, expect } from "@playwright/test";
import {openPage} from "../../../utils.js";

const formComponents = [
  'textinput',
  'checkboxgroup',
  'numberinput',
  'radiobutton',
  'telephoneinput',
  'emailinput',
  'fileinput',
  'dropdown',
  'datepicker',
  'reset'
];
const componentSelectors = {
  dropdown: 'select[name*="dropdown"]',
  reset: 'button[name*="reset"]',
};
test.describe("Disable Form Test", () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/disable-validation/basic';
  let formContainer = null;

  test.beforeEach(async ({ page }) => {
    await openPage(page, testURL);
    formContainer = await page.evaluate(() => myForm);

    const response = await page.request.get(page.url());
    expect(response.status()).toBe(200);
  });

  test("should disable all form elements and verify disabled state", async ({ page }) => {

    // Disable all form elements using JavaScript
    await page.evaluate(() => {
      document.querySelectorAll('input, select, textarea, button').forEach(el => {
        el.disabled = true;
      });
    });

    // Loop through each component name and validate all matching elements are disabled
    for (const componentName of formComponents) {
      const selector = componentSelectors[componentName] || `div input[name*="${componentName}"]`;
      const elements = page.locator(selector);
      const elementCount = await elements.count();
      // Validate all matching elements (in case there are multiple components we will check all of them)
      for (let i = 0; i < elementCount; i++) {
        const element = elements.nth(i);
        expect(await element.isDisabled()).toBe(true);
      }
    }
  });
});

