import { test, expect } from '@playwright/test';
import { openPage, getFieldModel } from '../../utils.js';

test.describe("Form Runtime with Telephone Input", () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/telephone-input/basic';
  const description = "This is short description";
  let formContainer = null;

  test.beforeEach(async ({ page }) => {
    await openPage(page, testURL);
    formContainer = await page.evaluate(() => myForm);

    const response = await page.request.get(page.url());
    expect(response.status()).toBe(200);

  });

  test("html changes are reflected in model", async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[0];
    const input = "value";
    const inputElement = page.locator(`#${id}`);
    await inputElement.fill(input);
    await inputElement.blur();
    const model = await getFieldModel(page, id);
    expect(model.value).toBe(input);
  });

  test("Telephone input field should not have aria-disabled attribute if enable is false", async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[1];
    const telephone1Input = page.locator(`#${id}`);
    await expect(telephone1Input).toHaveAttribute('disabled');
  });

  test("should toggle description and tooltip", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[3];
    const tooltip = page.locator(`#${id}`);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('title', description);
  });

});
