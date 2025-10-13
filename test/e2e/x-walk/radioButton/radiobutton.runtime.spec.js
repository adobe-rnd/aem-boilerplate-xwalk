import { test, expect } from '@playwright/test';
import { getFieldModel, openPage } from '../../utils.js';


test.describe("Form with Radio Button Input", () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/radio-button-validation/basic';
  let formContainer = null;
  const errorMessage = "This is a required radiobutton";
  const description = "This is short description";
  const errorMessage2 = "Please enter a valid value.";

  test.beforeEach(async ({ page }) => {
    await openPage(page, testURL);
    formContainer = await page.evaluate(() => myForm);

    const response = await page.request.get(page.url());
    expect(response.status()).toBe(200);
  });

  test("should have data-name attribute in parent div matching model name", async ({ page }) => {
    const [radioButton1, radioButton1FieldView] = Object.entries(formContainer._fields)[0];
    const modelName = radioButton1FieldView._jsonModel.name;
    await expect(page.locator(`#${radioButton1}`)).toHaveAttribute('name', modelName);
  });

  test("should set proper name attribute for radio buttons", async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[0];
    const expectedName = fieldView._jsonModel.name;
    const radioButtons = page.locator(`#${id} input[data-field-type="radio-group"]`);
    const count = await radioButtons.count();
    for (let i = 0; i < count; i++) {
      await expect(radioButtons.nth(i)).toHaveAttribute('name', `${id}_${expectedName}`);
    }
  });

  test("radiobutton html changes are reflected in model", async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[1];
    let model = fieldView._jsonModel;
    expect(model.value).toBe('0');
    await page.locator(`#${id} input`).nth(1).click();
    model = await getFieldModel(page, id);
    expect(model.value).toBe('1');
    await page.locator(`#${id} input`).nth(3).click();
    model = await getFieldModel(page, id);
    expect(model.value).toBe('3');
  });

  test("radiobutton should show error messages in the HTML", async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[0];
    await page.getByRole('button', {name: 'Submit'}).click();
    const errorMessageLocator = page.locator(`#${id} div.field-description`);
    await expect(errorMessageLocator).toHaveText(errorMessage);
    await page.locator(`#${id} input`).nth(0).click();
    await expect(errorMessageLocator).toBeHidden();
  });
  test("Radio button should not have aria-disabled attribute if enable is false", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[3];
    const radiobutton3 = page.locator(`#${id} input`); // Replace with your selector
    const count = await radiobutton3.count();
    for (let i = 0; i < count; i++) {
      const locator = radiobutton3.nth(i);
      await expect(locator).toHaveAttribute('disabled');
    }
  });

  test("should toggle description and tooltip", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[1];
    const tooltip = page.locator(`#${id}`);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('title', description);
  });

  test("should show and hide components on certain select", async ({ page }) => {
    const [radioButton1] = Object.entries(formContainer._fields)[0];
    const [radioButton3] = Object.entries(formContainer._fields)[2];
    const [radioButton4] = Object.entries(formContainer._fields)[3];
    await page.locator(`#${radioButton1} input`).first().check();
    await expect(page.locator(`#${radioButton3}`)).toBeVisible();
    await expect(page.locator(`#${radioButton4}`)).not.toBeVisible();
  });

  test("should enable and disable components on certain select", async ({ page }) => {
    const [radioButton1] = Object.entries(formContainer._fields)[0];
    const [radioButton2] = Object.entries(formContainer._fields)[1];
    const [radioButton4] = Object.entries(formContainer._fields)[3];
    await page.locator(`#${radioButton1} input`).last().check();
    await expect(page.locator(`#${radioButton4}`)).toBeEnabled();
    const radioButton = page.locator(`#${radioButton2} input`);
    const count = await radioButton.count();
    for (let i = 0; i < count; i++) {
      const locator = radioButton.nth(i);
      await expect(locator).toHaveAttribute('disabled');
    }
  });

  test("should show validation error messages based on expression rule", async ({ page }) => {
    const [radioButton5] = Object.entries(formContainer._fields)[4];
    const [radioButton6] = Object.entries(formContainer._fields)[5];
    await page.locator(`#${radioButton5} input`).nth(1).check();
    await page.locator(`#${radioButton6} input`).nth(0).check();
    const errorMessageLocator = page.locator(`#${radioButton6} div.field-description`);
    await expect(errorMessageLocator).toHaveText(errorMessage2);
    await page.locator(`#${radioButton6} input`).nth(1).check();
    await expect(errorMessageLocator).toBeHidden();
  });

  test("should set and clear value based on rules", async ({ page }) => {
    const [radioButton1] = Object.entries(formContainer._fields)[0];
    const [radioButton6] = Object.entries(formContainer._fields)[5];
    const [radioButton4] = Object.entries(formContainer._fields)[3];
    const radioButton1Input = page.locator(`#${radioButton1} input`);
    await radioButton1Input.nth(1).check();
    await page.locator(`#${radioButton4} input`).first().check();
    await expect(page.locator(`#${radioButton6} input`).nth(1)).toBeChecked();
    const count = await radioButton1Input.count();
    for (let i = 0; i < count; i++) {
      await expect(radioButton1Input.nth(i)).not.toBeChecked();
    }
  });

  test("should update enum values on providing duplicate enums", async ({ page }) => {
    const [radioButton7, radioButton7FieldView] = Object.entries(formContainer._fields)[6];
    const optionNames = await page.locator(`#${radioButton7} label`).evaluateAll(labels =>
      labels.map(label => label.textContent.trim())
    );
    expect(optionNames).toContain('Item 3');
    expect(optionNames).toContain('Item 2');
    expect(optionNames).not.toContain('Item 1');
  });

  test("radiobutton with boolean type selection should happen in first click", async ({ page }) => {
    const [id, radioButton1FieldView] = Object.entries(formContainer._fields)[7];
    await page.locator(`#${id} input[value="true"]`).check();
    await expect(page.locator(`#${id} input[value="true"]`)).toBeChecked();
    await page.locator(`#${id} input[value="false"]`).check();
    await expect(page.locator(`#${id} input[value="false"]`)).toBeChecked();
  });

});
