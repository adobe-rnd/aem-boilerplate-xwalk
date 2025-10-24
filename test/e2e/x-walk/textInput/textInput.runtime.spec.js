import { test, expect } from '@playwright/test';
import { openPage, getFieldModel } from '../../utils.js';

test.describe("Form Runtime with Text Input", () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/text-input-validation/basic';
  let formContainer = null;
  const errorMessage = "Field is not valid";
  const description = "This is short description";

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

  test("should toggle description and tooltip", async ({ page }) => {
    const [textbox4] = Object.entries(formContainer._fields)[3];
    const tooltip = page.locator(`#${textbox4}`);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('title', description);
  });

  test("should show and hide other fields on a certain input", async ({ page }) => {
    const [textbox1] = Object.entries(formContainer._fields)[0];
    const [textbox2] = Object.entries(formContainer._fields)[1];
    const [textbox3] = Object.entries(formContainer._fields)[2];
    const input = "adobe";

    const inputElement = page.locator(`#${textbox1}`);
    await inputElement.fill(input);
    await inputElement.blur();

    await expect(page.locator(`#${textbox3}`)).toBeVisible();
    await expect(page.locator(`#${textbox2}`)).toBeHidden();
  });

  test("should enable and disable other textfields on a certain string input", async ({ page }) => {
    const [textbox1] = Object.entries(formContainer._fields)[0];
    const [textbox2] = Object.entries(formContainer._fields)[1];
    const [textbox4] = Object.entries(formContainer._fields)[3];
    const input = "aem";

    const inputElement = page.locator(`#${textbox1}`);
    await inputElement.fill(input);
    await inputElement.blur();

    await expect(page.locator(`#${textbox2}`)).toBeEnabled();
    await expect(page.locator(`#${textbox4}`)).toBeDisabled();
  });

  test("input field should not have aria-disabled attribute if enable is false", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[1];
    const textbox1Input = page.locator(`#${id}`);
    await expect(textbox1Input).toHaveAttribute('disabled');
  });

  test("should set valid to false and errorMessage other textfields on a certain string input", async ({ page }) => {
    const [textbox9] = Object.entries(formContainer._fields)[8];
    const [textbox10] = Object.entries(formContainer._fields)[9];

    const inputElement = page.locator(`#${textbox9}`);
    await inputElement.fill('text');
    await inputElement.blur();
    await expect(page.locator(`#${textbox10}`).locator('..')).toHaveAttribute('class', /field-invalid/);
    await expect(page.locator(`#${textbox10} + .field-description`)).toHaveText(errorMessage);
  });

  test("should set and clear value based on rules", async ({ page }) => {
    const [textbox1] = Object.entries(formContainer._fields)[0];
    const [textbox4] = Object.entries(formContainer._fields)[3];
    const [textbox5] = Object.entries(formContainer._fields)[4];

    const input = "aemforms";
    const textbox4Input = page.locator(`#${textbox4}`);
    await textbox4Input.fill("this must be cleared");

    const textbox5Input = page.locator(`#${textbox5}`);
    await textbox5Input.fill(input);
    await textbox5Input.blur();

    await expect(textbox4Input).toHaveValue("");
    await expect(page.locator(`#${textbox1}`)).toHaveValue("new value");
  });

});
