import { test, expect } from '@playwright/test';
import { getFieldModel, openPage } from '../../utils.js';

test.describe('Form Runtime with Date Picker', () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/date-picker/basic';
  const errorMessage = "Please enter a valid value.";
  const shortDescription = "This is short description";
  const longDescription = "This is long description";
  let formContainer = null;

  test.beforeEach(async ({ page }) => {
    await openPage(page, testURL);
    formContainer = await page.evaluate(() => myForm);
  });

  test('html changes are reflected in model', async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[0];
    const input = "2020-10-10";
    const inputElement = page.locator(`#${id}`);
    await inputElement.focus();
    await inputElement.fill(input);
    await inputElement.blur();
    const model = await getFieldModel(page, id);
    expect(model.value).toBe(input);
  });

  test('should toggle description and tooltip', async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[3];
    const tooltip = page.locator(`#${id}`);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('title', shortDescription);
    const longDescriptionLocator = page.locator(`#${id} ~ .field-description`);
    await expect(longDescriptionLocator).toHaveAttribute('id', `${id}-description`);
    await expect(longDescriptionLocator).toHaveText(longDescription);
  });

  test('should show and hide components on certain date input', async ({ page }) => {
    const [datePicker1] = Object.entries(formContainer._fields)[0];
    const [datePicker3] = Object.entries(formContainer._fields)[2];
    const [datePicker4] = Object.entries(formContainer._fields)[3];
    const input = '2022-12-23';
    const InputElement = page.locator(`#${datePicker1}`);
    await InputElement.focus();
    await InputElement.fill(input);
    await InputElement.blur();
    await expect(page.locator(`#${datePicker3}`)).toBeVisible();
    await expect(page.locator(`#${datePicker4}`)).toBeHidden();
  });

  test('should enable and disable components on certain date input', async ({ page }) => {
    const [datePicker1] = Object.entries(formContainer._fields)[0];
    const [datePicker2] = Object.entries(formContainer._fields)[1];
    const [datePicker4] = Object.entries(formContainer._fields)[3];
    const input = '2023-01-01';
    const InputElement = page.locator(`#${datePicker1}`);
    await InputElement.focus();
    await InputElement.fill(input);
    await InputElement.blur();
    await expect(page.locator(`#${datePicker2}`)).toBeEnabled();
    await expect(page.locator(`#${datePicker4}`)).toBeDisabled();
  });

  test('should show validation error messages based on expression rules', async ({ page }) => {
    const [datePicker4] = Object.entries(formContainer._fields)[3];
    const incorrectInput = "2023-01-02";
    const correctInput = "2023-01-01";
    let InputElement = page.locator(`#${datePicker4}`);
    await InputElement.focus();
    await InputElement.fill(incorrectInput);
    await InputElement.blur();
    const errorMessageLocator = page.locator(`#${datePicker4} + div.field-description`);
    await expect(errorMessageLocator).toHaveAttribute('id', `${datePicker4}-description`);
    await expect(errorMessageLocator).toHaveText(errorMessage);
    InputElement = page.locator(`#${datePicker4}`);
    await InputElement.focus();
    await InputElement.fill(correctInput);
    await InputElement.blur();
    await expect(errorMessageLocator).not.toHaveText(errorMessage);
    await expect(errorMessageLocator).toHaveText(longDescription);
  });

  test('Datepicker should not have aria-disabled attribute if enable is false', async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[1];
    const checkBoxGroup1 = page.locator(`#${id}`);
    await expect(checkBoxGroup1).toHaveAttribute('disabled');
  });

  test('should set and clear value based on rules', async ({ page }) => {
    const [datePicker1] = Object.entries(formContainer._fields)[0];
    const [datePicker4] = Object.entries(formContainer._fields)[3];
    const [datePicker6] = Object.entries(formContainer._fields)[5];
    const input = "2023-01-12";
    await page.locator(`#${datePicker1}`).focus();
    await page.locator(`#${datePicker1}`).fill('2022-05-18');
    await page.locator(`#${datePicker6}`).focus();
    await page.locator(`#${datePicker6}`).fill(input);
    await page.locator(`#${datePicker6}`).blur();

    await expect(page.locator(`#${datePicker1}`)).toHaveValue("");
    await expect(page.locator(`#${datePicker4}`)).toHaveValue("1/1/23");
  });

  test('Should not show calendar widget if marked readonly', async ({ page }) => {
    const [id ] = Object.entries(formContainer._fields)[9];
    await page.locator(`#${id}`).focus();
    await page.locator(`#${id}`).blur();
    const model = await getFieldModel(page, id);
    await expect(model.readOnly).toBe(true);
    await expect(page.locator(`#${id}`)).toHaveValue('8 April, 2024');
  });

});
