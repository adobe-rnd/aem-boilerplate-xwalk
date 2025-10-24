import { test, expect } from '@playwright/test';
import { openPage } from '../../utils.js';

test.describe("Form Runtime with Button Input", () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/button-validation';
  let formContainer = null;

  test.beforeEach(async ({ page, request }) => {
    await openPage(page, testURL);
    formContainer = await page.evaluate(() => myForm);

    const response = await request.get(page.url());
    expect(response.status()).toBe(200);

  });

  const checkHTML = async (page, id, state) => {
    const { visible, enabled, value } = state;

    await page.evaluate(({ id, visible, enabled, value }) => {
      const element = document.getElementById(id);
      if (element) {
        element.style.display = visible ? '' : 'none';
        if (enabled) {
          element.removeAttribute('disabled');
        } else {
          element.setAttribute('disabled', '');
        }
        element.setAttribute('value', value || '');
      }
    }, { id, visible, enabled, value });

    const button = page.locator(`#${id}`);
    if (visible) {
      await expect(button).toBeVisible();
    } else {
      await expect(button).not.toBeVisible();
    }

    if (enabled) {
      await expect(button).not.toHaveAttribute('disabled');
    } else {
      await expect(button).toHaveAttribute('disabled', '');
    }
    await expect(button).toHaveAttribute('value', value);
  };

  test("model's changes are reflected in the html", async ({ page }) => {
    const [id, buttonField] = Object.entries(formContainer._fields)[0];
    const state = {
      visible: false,
      enabled: false,
      value: 'some other value',
    };
    await checkHTML(page, id, state);
  });

  test("Button should not have disabled attribute if enable is false", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[1];
    const buttonLocator = page.locator(`#${id}`);
    await expect(buttonLocator).toHaveAttribute('disabled');
  });

  test("should open a new window on click of button/", async ({ page, context }) => {
    const [id] = Object.entries(formContainer._fields)[4];
    const buttonLocator = page.locator(`#${id}`);
    const [newTab] = await Promise.all([
      page.waitForEvent('popup'),
      buttonLocator.click()
    ]);
    expect(newTab.url()).toContain("https://www.google.com/");
  });

  test("should have type as button/", async ({ page }) => {
    const [id] = Object.entries(formContainer._fields)[0];
    const buttonLocator = page.locator(`#${id}`);
    await expect(buttonLocator).toHaveAttribute('type', 'button');
  });

});
