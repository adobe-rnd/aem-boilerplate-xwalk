import { test, expect } from '@playwright/test';
import { getFieldModel, openPage } from '../../utils.js';

test.describe('Form with Adaptive form text', () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/text-validation/basic';
  let formContainer = null;

  test.beforeEach(async ({ page }) => {
    await openPage(page, testURL);
    formContainer = await page.evaluate(() => myForm);

    const response = await page.request.get(page.url());
    expect(response.status()).toBe(200);

  });

  test('html changes are reflected in model', async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[0];
    const input = 'value';
    const inputElement = page.locator(`#${id}`);
    await inputElement.fill(input);
    await inputElement.blur();
    const model = await getFieldModel(page, id);
    expect(model.value).toBe(input);
  });

  test('test the rules editor', async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[1];
    const textInput1 =  Object.entries(formContainer._fields)[0];
    const textInput1Id = page.locator(`#${textInput1[0]}`);
    await textInput1Id.fill('Hide me');
    await textInput1Id.blur();
    await expect(page.locator(`#${id}`)).not.toBeVisible();
    await textInput1Id.fill('Show me');
    await textInput1Id.blur();
    await expect(page.locator(`#${id}`)).toBeVisible();
    await textInput1Id.fill('Change me');
    await textInput1Id.blur();
    await expect(page.locator(`#${id}`)).toContainText('CHANGED');
  });

  test('Reset should not reset Static Text', async ({ page }) => {
    const [id, fieldView] = Object.entries(formContainer._fields)[2];
    const [resetId, resetFieldView] = Object.entries(formContainer._fields)[3];
    let model = fieldView._jsonModel;
    const textValue = 'Test text';
    expect(model.value).toContain(textValue);
    await expect(page.locator(`#${id}`)).toContainText(textValue);
    const resetButton = page.locator(`#${resetId}`);
    await resetButton.click();
    model = await getFieldModel(page, id);
    expect(model.value).toContain(textValue);
    await expect(page.locator(`#${id}`)).toContainText(textValue);
  });

});
