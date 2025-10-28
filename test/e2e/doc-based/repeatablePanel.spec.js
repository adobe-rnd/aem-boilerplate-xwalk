import { test, expect } from '../fixtures.js';
import { openPage } from '../utils.js';

const panelLocator = 'fieldset[class*="panel-wrapper field-panel-1 field-wrapper"]';
const radioButtonLocator = 'fieldset[class*="field-radio"]';
const checkboxGroupLocator = 'fieldset[class*="field-check"]';
test.describe('Repeatability test in Doc-based forms', () => {
  const testURL = '/repeatablepanel';

  test.skip('test the behaviour of correctly add and remove repeatable panel in Doc-based forms', async ({ page }) => {
    await openPage(page, testURL, 'docbased');
    const panel = page.locator(panelLocator);
    const addButton = page.getByText('Add');
    const deleteButton = page.getByText('Delete');
    await expect(panel).toHaveCount(1);
    await expect(addButton).toBeVisible();
    await addButton.click();
    await expect(panel).toHaveCount(2);
    const panelCount = await panel.count();
    for (let i = 0; i < panelCount; i++) {
      await expect(panel.nth(i)).toBeVisible();
    }
    await expect(addButton).toBeHidden();
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();
    await expect(addButton).toBeVisible();
    await expect(panel).toHaveCount(1);
  });

  test('Validation of repeatable panel radiobuttons are updated correctly', async ({ page }) => {
    await openPage(page, testURL, 'docbased');

    const panel = page.locator(panelLocator);
    const addBtn = page.getByText('Add');
    const getCheckbox = (i = 0) =>
      page.locator(checkboxGroupLocator).getByRole('checkbox', { name: 'Item 1' }).nth(i);
    const getRadio = (i = 0) =>
      page.locator(radioButtonLocator).getByRole('radio', { name: 'Item 2' }).nth(i);
    await expect(panel).toHaveCount(1);
    await expect(addBtn).toBeVisible();

    await getCheckbox().click();
    await getRadio().click();
    await addBtn.click();

    await expect(panel).toHaveCount(2);

    await getCheckbox(1).click();
    await getRadio(1).click();

    await Promise.all([
      expect(getCheckbox()).toBeChecked(),
      expect(getCheckbox(1)).toBeChecked(),
      expect(getRadio()).toBeChecked(),
      expect(getRadio(1)).toBeChecked(),
    ]);
  });
});