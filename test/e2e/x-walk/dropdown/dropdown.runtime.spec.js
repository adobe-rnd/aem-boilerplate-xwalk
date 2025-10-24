import { test, expect } from '@playwright/test';
import { openPage } from '../../utils.js';

test.describe('Form with Dropdown', () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/dropdown-validation/basic';
  let formContainer = null;
  const errorMessage = "Please enter a valid value.";
  const description = "This is short description";

  test.beforeEach(async ({ page }) => {
    await openPage(page, testURL);
    formContainer = await page.evaluate(() => myForm);

    const response = await page.request.get(page.url());
    expect(response.status()).toBe(200);

  });

  test("Single Select: html changes are reflected in model", async ({ page }) => {
    const [idDropdown] = Object.entries(formContainer._fields)[0];
    await page.locator(`#${idDropdown}`).selectOption({ label: "cauliflower" });
    const model = await page.evaluate(id => {
      return window.myForm._fields[id]._jsonModel;
    }, idDropdown);
    expect(model.value).toBe('c');
  });

  test('should toggle description and tooltip', async ({ page }) => {
    const [idDropdown] = Object.entries(formContainer._fields)[2];
    const tooltip = page.locator(`#${idDropdown}`);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('title', description);
  });

  test('Single Select: Test clear dropdown using rule editor', async ({ page }) => {
    const [idDropdown] = Object.entries(formContainer._fields)[0];
    const [idButton] = Object.entries(formContainer._fields)[5];
    await page.locator(`#${idButton}`).click();
    const model = await page.evaluate(id => {
      return window.myForm._fields[id]._jsonModel;
    }, idDropdown);
    expect(model.value).toBeNull();
    await expect(page.locator(`#${idDropdown} select option:checked`)).toHaveCount(0);
  });

  // Multi Select scenario is not in the product
  test.skip('Multi Select: Test clear dropdown using rule editor', async ({ page }) => {
    const [idDropdown1] = Object.entries(formContainer._fields)[1];
    const [idButton] = Object.entries(formContainer._fields)[6];
    await page.locator(`#${idButton}`).click();
    const model = await page.evaluate(id => {
      return window.myForm._fields[id]._jsonModel;
    }, idDropdown1);
    expect(model.value).toBeNull();
    await expect(page.locator(`#${idDropdown1} select option:checked`)).toHaveCount(0);
  });

  test('should show and hide components on certain dropdown select', async ({ page }) => {
    const [dropdown] = Object.entries(formContainer._fields)[0];
    const [dropdown3] = Object.entries(formContainer._fields)[3];
    const [dropdown4] = Object.entries(formContainer._fields)[4];
    await page.locator(`#${dropdown}`).selectOption({ label: "cauliflower" });
    await expect(page.locator(`#${dropdown3}`)).toBeVisible();
    await expect(page.locator(`#${dropdown4}`)).toBeHidden();
  });

  test('should enable and disable components on certain dropdown select', async ({ page }) => {
    const [dropdown] = Object.entries(formContainer._fields)[0];
    const [dropdown2] = Object.entries(formContainer._fields)[2];
    const [dropdown3] = Object.entries(formContainer._fields)[3];
    await page.locator(`#${dropdown}`).selectOption({ label: "apple" });
    await expect(page.locator(`#${dropdown3}`)).toBeEnabled();
    await expect(page.locator(`#${dropdown2}`)).toBeDisabled();
  });

  test('should show validation error messages based on expression rules', async ({ page }) => {
    const [dropdown4] = Object.entries(formContainer._fields)[2];
    const [dropdown7] = Object.entries(formContainer._fields)[7];
    await page.locator(`#${dropdown4}`).selectOption({ label: "cauliflower" });
    await page.locator(`#${dropdown7}`).selectOption({ label: "beans" });
    const errorMessageLocator = page.locator(`#${dropdown7} + div.field-description`);
    await expect(errorMessageLocator).toHaveAttribute('id', `${dropdown7}-description`);
    await expect(errorMessageLocator).toHaveText(errorMessage);
    await page.locator(`#${dropdown7}`).selectOption({ label: "carrot" });
    await expect(errorMessageLocator).toBeHidden();
  });

  test('Dropdown should have disabled attribute if enable is false', async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[4];
    await expect(page.locator(`#${id}`)).toHaveAttribute('disabled', '');
  });

  test('should update enum values on providing duplicate enums', async ({ page }) => {
    const [dropdown7] = Object.entries(formContainer._fields)[8];
    const dropdownOptions = page.locator(`#${dropdown7} option`);
    await expect(dropdownOptions).toHaveCount(2);
    const optionTexts = await dropdownOptions.evaluateAll(options =>
      options.map(option => option.textContent.trim())
    );
    const expectedNames = ['Item 3', 'Item 2'];
    await expect(optionTexts).toEqual(expectedNames);
    expect(optionTexts).not.toContain('Item 1');
  });

  test('should have empty placeholder checked when default option is not configured', async ({ page }) => {
    const [idDropdown] = Object.entries(formContainer._fields)[9];
    const selectValue = await page.locator(`#${idDropdown}`).inputValue();
    expect(selectValue).toBe('');
  });
});
