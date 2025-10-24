import { test, expect } from '@playwright/test';
import { getFieldModel, openPage } from '../../utils.js';

test.describe('Form Runtime with Email Input', () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/email-validation/basic';
  let formContainer = null;
  const errorMessage = "validation picture clause error message!";
  const shortDescription = "This is short description";
  const largeDescription = "This is large description";

  test.beforeEach(async ({ page }) => {
    await openPage(page, testURL);
    formContainer = await page.evaluate(() => myForm);

    const response = await page.request.get(page.url());
    expect(response.status()).toBe(200);

  });

  test("html changes are reflected in model", async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[0];
    const input = "value@dns.com";
    await page.locator(`#${id}`).fill(input);
    await page.locator(`#${id}`).blur();
    const model = await getFieldModel(page, id);
    expect(model.value).toBe(input);
  });

  test("Email should not have aria-disabled attribute if enable is false", async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[1];
    const emailInput1 = page.locator(`#${id}`);
    await expect(emailInput1).toHaveAttribute('disabled');
  });

  test("mandatory message set by user is displayed", async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[3];
    const form = page.locator('form');
    await form.evaluate(form => {
      if (form.checkValidity) {
        form.checkValidity();
      }
    });
    await expect(page.locator(`#${id} ~ .field-description`)).toHaveText('custom mandatory message!');
  });

  test("validation picture clause message set by user is displayed", async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[0];
    await page.locator(`#${id}`).fill("ares@a");
    await page.locator(`#${id}`).blur();
    await expect(page.locator(`#${id} ~ .field-description`)).toHaveText(errorMessage);
  });

  test("should toggle description and tooltip", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[3];
    const tooltip = page.locator(`#${id}`);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('title', shortDescription);
    const longDescription = page.locator(`#${id} ~ .field-description`);
    await expect(longDescription).toHaveAttribute('id', `${id}-description`);
    await expect(longDescription).toHaveText(largeDescription);
  });

});
