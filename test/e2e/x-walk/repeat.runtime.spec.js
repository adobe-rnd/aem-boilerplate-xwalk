import { test, expect } from '../fixtures.js';
import {openPage, testRepeatablePanel} from '../utils.js';
const panelsLocator = 'fieldset .panel-wrapper.field-wrapper';
const checkboxesLocator = 'div input[type="checkbox"]';
const radioButtonsLocator = 'div input[type="radio"]';
test.describe('Repeatability test', () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/repeat-panel';
  const testURL1 = '/content/aem-boilerplate-forms-xwalk-collaterals/repeat-panel/repeatable-panel-validation';
  test('test newly added panels are within div.repeat-wrapper', async ({ page }) => {
    await openPage(page, testURL);
    const childCount = await page.locator('.repeat-wrapper').evaluate((el) => Array.from(el.children).filter((child) => child.classList.contains('panel-wrapper')).length);
    await expect(childCount).toBe(5);
  });
  test('test colspan for repeated panels', async ({ page }) => {
    await openPage(page, testURL);
    const elements = await page.$$('main .form form .field-wrapper.col-4');
    expect(elements.length).toBe(5);
    // eslint-disable-next-line no-restricted-syntax
    for (const element of elements) {
      // eslint-disable-next-line no-await-in-loop
      const gridColumn = await element.evaluate((el) => getComputedStyle(el).getPropertyValue('grid-column'));
      expect(gridColumn).toBe('span 4');
    }
  });
  test('test the behaviour of radio button with same name for repeated panels', async ({ page }) => {
    await openPage(page, testURL);
    // Find all repeated panels using Locator in the Page
    const panels = page.locator(panelsLocator);
    await expect(panels).toHaveCount(5);
    const targetPanelIndex = 2;
    const targetPanel = panels.nth(targetPanelIndex);
    // Get radio buttons in the target panel
    const targetRadios = targetPanel.locator(radioButtonsLocator);
    await expect(targetRadios).toHaveCount(2);
    // Click "Item 2" (second radio)
    await expect(targetRadios.nth(1)).toBeVisible();
    await targetRadios.nth(1).click();
    // Assert "Item 2" is checked and "Item 1" is not checked in the target panel
    await expect(targetRadios.nth(1)).toBeChecked();
    await expect(targetRadios.nth(0)).not.toBeChecked();
    // Assert all radio buttons in other panels are not checked
    const panelCount = await panels.count();
    for (let i = 0; i < panelCount; i++) {
      if (i === targetPanelIndex) continue;
      const radios = panels.nth(i).locator(radioButtonsLocator);
      await expect(radios).toHaveCount(2);
      await radios.nth(1).scrollIntoViewIfNeeded();
      await expect(radios.nth(0)).not.toBeChecked();
      await expect(radios.nth(1)).not.toBeChecked();
    }
  });
  test('test the behaviour of checkbox group with same name for repeated panels', async ({ page }) => {
    await openPage(page, testURL);
    // Find all repeated panels using Locator in the Page
    const panels = page.locator(panelsLocator);
    await expect(panels).toHaveCount(5);
    const targetPanelIndex = 3;
    const targetPanel = panels.nth(targetPanelIndex);
    // Get Checkbox Group in the target panel
    const targetCheckboxGroup = targetPanel.locator(checkboxesLocator);
    await expect(targetCheckboxGroup).toHaveCount(2);
    // Click "Item 2" (second Checkbox Group)
    await expect(targetCheckboxGroup.nth(1)).toBeVisible();
    await targetCheckboxGroup.nth(1).click();
    // Assert "Item 2" is checked and "Item 1" is not checked in the target panel
    await expect(targetCheckboxGroup.nth(1)).toBeChecked();
    await expect(targetCheckboxGroup.nth(0)).not.toBeChecked();
    // Assert all Checkbox Group buttons in other panels are not checked
    const panelCount = await panels.count();
    for (let i = 0; i < panelCount; i++) {
      if (i === targetPanelIndex) continue;
      const checkboxes = panels.nth(i).locator(checkboxesLocator);
      await expect(checkboxes).toHaveCount(2);
      await checkboxes.nth(1).scrollIntoViewIfNeeded();
      await expect(checkboxes.nth(0)).not.toBeChecked();
      await expect(checkboxes.nth(1)).not.toBeChecked();
    }
  });
  test('test the behaviour of correctly add and remove repeatable panels', async ({ page }) => {
    await openPage(page, testURL1);
    await testRepeatablePanel(page, panelsLocator);
  });
});
