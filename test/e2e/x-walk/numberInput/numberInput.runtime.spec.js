import { test, expect } from '@playwright/test';
import { getFieldModel, openPage } from '../../utils.js';

test.describe('Form with Number Input', () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/number-validation/basic';
  const errorMessage = "Please enter a valid value.";
  const errorMessage1 = "Please enter a valid value. The two nearest valid values are 11 and 12.";
  const description = "This is short description";
  let formContainer = null;

  test.beforeEach(async ({ page, request }) => {
    await openPage(page, testURL);
    formContainer = await page.evaluate(() => myForm);

    const response = await page.request.get(page.url());
    expect(response.status()).toBe(200);
  });

  test('html changes are reflected in model', async ({ page }) => {
    const input = 23;
    for (const [id, field] of Object.entries(formContainer._fields)) {
      const model = field._jsonModel;
      if (model.visible && model.enabled) {
        const inputElement = page.locator(`#${id}`);
        await inputElement.fill('');
        await inputElement.fill(input.toString());
        await inputElement.blur();
        const model = await getFieldModel(page, id);
        expect(Number(model.value)).toBe(input);
      }
    }
  });

  test('non-number html changes are reflected in model', async ({ page }) => {
    const input = 23;
    for (const [id, field] of Object.entries(formContainer._fields)) {
      const model = field._jsonModel;
      if (model.visible && model.enabled) {
        const inputElement = page.locator(`#${id}`);
        await inputElement.fill('');
        await inputElement.fill(input.toString());
        await inputElement.blur();
        const model = await getFieldModel(page, id);
        expect(Number(model.value)).toBe(input);
      }
    }
  });

  test('should toggle description and tooltip', async ({ page }) => {
    const [number4] = Object.entries(formContainer._fields)[3];
    const tooltip = page.locator(`#${number4}`);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('title', description);
  });


  test('should show and hide other fields on a certain number input', async ({ page }) => {
    const [numberInput1, numberInput1FieldView] = Object.entries(formContainer._fields)[0];
    const [numberInput2, numberInput2FieldView] = Object.entries(formContainer._fields)[1];
    const [numberInput3, numberInput3FieldView] = Object.entries(formContainer._fields)[2];

    const input = "93";
    await page.locator(`#${numberInput1}`).fill(input);
    await page.locator(`#${numberInput1}`).blur();
    await expect(page.locator(`#${numberInput2}`)).toBeVisible();
    await expect(page.locator(`#${numberInput3}`)).not.toBeVisible();
  });

  test('should enable and disable other numberfields on a certain number input', async ({ page }) => {
    const [numberInput1, numberInput1FieldView] = Object.entries(formContainer._fields)[0];
    const [numberInput3, numberInput3FieldView] = Object.entries(formContainer._fields)[2];
    const [numberInput4, numberInput4FieldView] = Object.entries(formContainer._fields)[3];

    const input = "123";
    await page.locator(`#${numberInput1}`).fill(input);
    await page.locator(`#${numberInput1}`).blur();
    await expect(page.locator(`#${numberInput3}`)).toBeEnabled();
    await expect(page.locator(`#${numberInput4}`)).toBeDisabled();
  });

  test('should show validation error messages based on expression rules', async ({ page }) => {
    const [numberInput4, numberInput4FieldView] = Object.entries(formContainer._fields)[3];
    const incorrectInput = "42";
    const correctInput = "64";

    await page.locator(`#${numberInput4}`).fill(incorrectInput);
    await page.locator(`#${numberInput4}`).blur();
    const errorMessageLocator = page.locator(`#${numberInput4} + div.field-description`);
    await expect(errorMessageLocator).toHaveAttribute('id', `${numberInput4}-description`);
    await expect(errorMessageLocator).toHaveText(errorMessage);
    await page.locator(`#${numberInput4}`).fill(correctInput);
    await page.locator(`#${numberInput4}`).blur();
    await expect(errorMessageLocator).not.toHaveText(errorMessage);
  });

  test('number input should not have aria-disabled attribute if enable is false', async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[2];
    const number2Input = page.locator(`#${id}`);
    await expect(number2Input).toHaveAttribute('disabled');
  });

  test('should set and clear value based on rules', async ({ page }) => {
    const [numberInput1, numberInput1FieldView] = Object.entries(formContainer._fields)[0];
    const [numberInput4, numberInput4FieldView] = Object.entries(formContainer._fields)[3];
    const [numberInput5, numberInput5FieldView] = Object.entries(formContainer._fields)[4];

    const input = "4502";
    await page.locator(`#${numberInput1}`).fill("495");
    await page.locator(`#${numberInput5}`).fill(input);
    await page.locator(`#${numberInput5}`).blur();
    await expect(page.locator(`#${numberInput1}`)).toHaveValue("");
    await expect(page.locator(`#${numberInput4}`)).toHaveValue("400");
  });

  test('display pattern on numeric input should update the display value', async ({ page }) => {
    const [id, numberInput6FieldView] = Object.entries(formContainer._fields)[5];
    const input = "12212";

    await page.locator(`#${id}`).fill(input);
    await page.locator(`#${id}`).blur();
    const model = await getFieldModel(page, id);
    expect(Number(model.value)).toBe(Number(input));
  });

  test('integer type should not accept decimal', async ({ page }) => {
    const [numberInput7, numberInput7FieldView] = Object.entries(formContainer._fields)[6];
    const invalidInput = "11.22";
    const validInput = "11";

    // Fill the invalid value and blur
    await page.locator(`#${numberInput7}`).fill(invalidInput);
    await page.locator(`#${numberInput7}`).blur();

    // Validate the error message
    const errorMessageLocator = page.locator(`#${numberInput7} + div.field-description`);
    await expect(errorMessageLocator).toHaveText(errorMessage1);

    // Fill the valid value and blur
    await page.locator(`#${numberInput7}`).fill(validInput);
    await page.locator(`#${numberInput7}`).blur();

    // Validate that the error message is no longer displayed
    await expect(errorMessageLocator).not.toBeVisible();
  });
});
