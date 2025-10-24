import { test, expect } from '../fixtures.js';
import { openPage } from '../utils.js';

const panelLocator = 'fieldset[class*="panel-wrapper field-panel-1 field-wrapper"]';
test.describe('Repeatability test in Doc-based forms', () => {
  const testURL = '/repeatablepanel';

  test('test the behaviour of correctly add and remove repeatable panel in Doc-based forms', async ({ page }) => {
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
});
