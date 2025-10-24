import { test, expect } from '@playwright/test';
import { openPage } from '../../utils.js';

const titles = ['Text Input', 'Email Input', 'Number Input', 'Checkbox Group', 'Radio Group', 'Reset', 'Submit'];

test.describe("Form Runtime with Button Input", () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/embed-form-validation/basic';

  test.beforeEach(async ({ page, request }) => {
    await openPage(page, testURL);
    // Validate the page response
    const response = await request.get(page.url());
    if (!response.ok()) {
      throw new Error(`Failed to load page: ${response.status()} ${response.statusText()}`);
    }
    expect(response.status()).toBe(200);

  });

  test("Verify all components are visible by their titles", async ({ page }) => {
    await Promise.all(
      titles.map(async (title) => {
        await test.step(title, async () => {
          const locator = page.getByText(title, { exact: true });
          await expect(locator).toBeVisible();
        });
      })
    );
  });
});
