import { test, expect } from '@playwright/test';
import { getFieldModel, openPage } from '../../utils.js';

test.describe("Form with Checkbox", () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/check-validation/basic';
  const shortDescription = "This is short description";
  const largeDescription = "This is large description";
  const errorMessage = "This is a custom required checkbox";
  let formContainer = null;

  test.beforeEach(async ({ page }) => {
    await openPage(page, testURL);
    formContainer = await page.evaluate(() => myForm);

    const response = await page.request.get(page.url());
    expect(response.status()).toBe(200);
  });

  test("should have value set to false if checked and then unchecked", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[0];
    const input = page.locator(`#${id}`);
    await input.click();
    await expect(input).toBeChecked();
    await input.click();
    const model = await getFieldModel(page, id);
    expect(model.value).toBe(false);
  });

  test("should have value set to default during initial render", async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[1];
    const input = page.locator(`#${id}`);
    const model = fieldView._jsonModel;
    expect(model.value).toContain('true');
    await expect(input).toBeChecked();
  });

  test("html changes are reflected in model", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[0];
    const input = page.locator(`#${id}`);
    await input.click();
    const model = await getFieldModel(page, id);
    expect(model.value).toBe(true);
    await input.click();
    const model1 = await getFieldModel(page, id);
    expect(model1.value).toBe(false);
  });

  test("should show error messages in the HTML", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[2];
    const input = page.locator(`#${id}`);
    await input.click();
    const model = await getFieldModel(page, id);
    expect(model.value).toContain('true');
    await input.click();
    const errorMessageLocator = page.locator(`#${id} ~ .field-description`);
    await expect(errorMessageLocator).toHaveText(errorMessage);
    await input.click();
    await expect(errorMessageLocator).toBeHidden();
  });

  test("Checkbox should not have aria-disabled attribute if enable is false", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[6];
    const checkBox7 = page.locator(`#${id}`);
    await expect(checkBox7).toHaveAttribute('disabled');
  });

  test("should toggle description and tooltip", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[0];
    const tooltip = page.locator(`#${id}`);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('title', shortDescription);
    const longDescription = page.locator(`#${id} ~ .field-description`);
    await expect(longDescription).toHaveAttribute('id', `${id}-description`);
    await expect(longDescription).toHaveText(largeDescription);
  });

  test("should show and hide components on certain checkbox input", async ({ page }) => {
    const [checkbox] = Object.entries(formContainer._fields)[3];
    const [hiddenCB] = Object.entries(formContainer._fields)[4];

    await expect(page.locator(`#${hiddenCB}`)).not.toBeVisible();
    await page.locator(`#${checkbox}`).click();
    await expect(page.locator(`#${hiddenCB}`)).toBeVisible();
    await page.locator(`#${checkbox}`).click();
    await expect(page.locator(`#${hiddenCB}`)).not.toBeVisible();
  });

  test("should enable and disable components on certain checkbox input", async ({ page }) => {
    const [checkbox6] = Object.entries(formContainer._fields)[5];
    const [checkbox7] = Object.entries(formContainer._fields)[6];

    await expect(page.locator(`#${checkbox7}`)).toBeDisabled();
    await page.locator(`#${checkbox6}`).click();
    await expect(page.locator(`#${checkbox7}`)).toBeEnabled();
    await page.locator(`#${checkbox6}`).click();
    await expect(page.locator(`#${checkbox7}`)).toBeDisabled();
  });

});
