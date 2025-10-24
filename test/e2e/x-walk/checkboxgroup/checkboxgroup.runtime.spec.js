import { test, expect } from '@playwright/test';
import { getFieldModel, openPage } from '../../utils.js';

test.describe("Form with Checkbox Group", () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/checkbox-group-validation/basic';
  const shortDescription = "This is short description";
  const largeDescription = "This is large description";
  const errorMessage = "This is a custom required checkboxgroup";
  let formContainer = null;

  test.beforeEach(async ({ page }) => {
    await openPage(page, testURL);
    formContainer = await page.evaluate(() => myForm);

    const response = await page.request.get(page.url());
    expect(response.status()).toBe(200);
  });

  test("html changes are reflected in model", async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[1];
    const checkboxGroup1 = page.locator(`#${id} input`);
    await checkboxGroup1.nth(1).click();
    let model = await getFieldModel(page, id);
    expect(model.value).toContain('1');
    await checkboxGroup1.nth(2).click();
    model = await getFieldModel(page, id);
    expect(model.value).toContain('2');
  });

  test("should show error messages in the HTML", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[1];
    await page.locator(`#${id} input`).nth(1).click();
    const model = await getFieldModel(page, id);
    expect(model.value).toContain('1');
    await page.locator(`#${id} input`).nth(1).click();
    const errorMessageLocator = page.locator(`#${id} .field-description`);
    await expect(errorMessageLocator).toHaveText(errorMessage);
    await page.locator(`#${id} input`).nth(1).click();
    await expect(errorMessageLocator).toBeHidden();

  });

  test("should toggle description and tooltip", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[3];
    const tooltip = page.locator(`#${id}`);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('title', shortDescription);
    const descriptionLocator = page.locator(`#${id} .field-description`);
    await expect(descriptionLocator).toHaveAttribute('id', `${id}-description`);
    await expect(descriptionLocator).toHaveText(largeDescription);
  });

  test("should show and hide components on certain checkbox input", async ({ page }) => {
    const [checkboxGroupId2] = Object.entries(formContainer._fields)[1];
    const [checkboxGroupId3] = Object.entries(formContainer._fields)[2];
    const [checkboxGroupId4] = Object.entries(formContainer._fields)[3];
    await expect(page.locator(`#${checkboxGroupId3}`)).not.toBeVisible();
    await expect(page.locator(`#${checkboxGroupId4}`)).toBeVisible();
    await page.locator(`#${checkboxGroupId2} input`).nth(0).check();
    await page.locator(`#${checkboxGroupId2} input`).nth(3).check();
    await expect(page.locator(`#${checkboxGroupId3}`)).toBeVisible();
    await expect(page.locator(`#${checkboxGroupId4}`)).not.toBeVisible();
  });

  test("Checkbox group should not have aria-disabled attribute if enable is false", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[0];
    const checkboxGroupId1 = page.locator(`#${id} input`);
    const count = await checkboxGroupId1.count();
    for (let i = 0; i < count; i++) {
      const locator = checkboxGroupId1.nth(i);
      await expect(locator).toHaveAttribute('disabled');
    }
  });

  test("should enable and disable components on certain checkbox input", async ({ page }) => {
    const [checkboxGroupId1] = Object.entries(formContainer._fields)[0];
    const [checkboxGroupId2] = Object.entries(formContainer._fields)[1];
    const [checkboxGroupId4] = Object.entries(formContainer._fields)[3];
    await expect(page.locator(`#${checkboxGroupId2}`)).toBeEnabled();
    await page.locator(`#${checkboxGroupId4} input`).nth(2).check();
    await expect(page.locator(`#${checkboxGroupId1}`)).toBeEnabled();
    const radioButton = page.locator(`#${checkboxGroupId2} input`); // Replace with your selector
    const count = await radioButton.count();
    for (let i = 0; i < count; i++) {
      const locator = radioButton.nth(i);
      await expect(locator).toHaveAttribute('disabled');
    }
  });

  test("should set and clear value based on rules", async ({ page }) => {
    const [checkboxGroupId2] = Object.entries(formContainer._fields)[1];
    const [checkboxGroupId3] = Object.entries(formContainer._fields)[2];
    const [checkboxGroupId5] = Object.entries(formContainer._fields)[4];
    await page.locator(`#${checkboxGroupId2} input`).nth(0).check();
    await page.locator(`#${checkboxGroupId2} input`).nth(3).check();
    await page.locator(`#${checkboxGroupId3} input`).nth(1).check();
    await page.locator(`#${checkboxGroupId3} input`).nth(1).blur();
    await expect(page.locator(`#${checkboxGroupId5} input`).nth(0)).toBeChecked();
    await expect(page.locator(`#${checkboxGroupId2} input`).nth(0)).not.toBeChecked();
  });

  test("should update enum values on providing duplicate enums", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[5];
    const optionNames = await page.locator(`#${id} label`).evaluateAll(labels =>
      labels.map(label => label.textContent.trim())
    );
    expect(optionNames).toContain('Item 3');
    expect(optionNames).toContain('Item 2');
    expect(optionNames).not.toContain('Item 1');
  });

  test("reset of checkbox group resulting in invalidation", async ({ page }) => {
    expect(formContainer).not.toBeNull();
    const [checkboxGroupId2] = Object.entries(formContainer._fields)[1];
    const [resetButtonId] = Object.entries(formContainer._fields)[7];
    await page.locator(`#${checkboxGroupId2} input`).nth(0).check();
    await page.locator(`#${checkboxGroupId2} input`).nth(3).check();
    await page.locator(`#${resetButtonId}`).click();
    await expect(page.locator(`#${checkboxGroupId2} input`).nth(0)).not.toBeChecked();
    await expect(page.locator(`#${checkboxGroupId2} input`).nth(3)).not.toBeChecked();
  });
});
