import { test, expect } from '../../fixtures.js';
import { openPage } from '../../utils.js';

const accordionSelector = '[class$="field-wrapper accordion"] legend';
const panelOneLocator = 'fieldset fieldset:nth-of-type(1)';
const panelTwoLocator = 'fieldset fieldset:nth-of-type(2)';
const PanelClass = /accordion-collapse/;

test.describe('Accordion Validation', () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/accordion-component-validation';

  test('Accordion Panel Validation', async ({ page }) => {
    await openPage(page, testURL);
    const panelOneBaseLocator = page.locator(panelOneLocator);
    const panelTwoBaseLocator = page.locator(panelTwoLocator);
    const textInput = page.getByText('Text Input');
    const emailInput = page.getByText('Email Input');
    await expect(await page.locator(accordionSelector).first()).toHaveText('Accordion');

    // Check that the first panel is open and the second panel is closed
    await expect(panelOneBaseLocator).not.toHaveClass(PanelClass);
    await expect(textInput).toBeVisible();
    await expect(panelTwoBaseLocator).toHaveClass(PanelClass);
    await expect(emailInput).toBeHidden();

    // Click on the second panel to open it
    await panelTwoBaseLocator.locator('legend').click();

    // Check that the first panel is now closed and the second panel is open
    await expect(panelOneBaseLocator).toHaveClass(PanelClass);
    await expect(textInput).toBeHidden();
    await expect(panelTwoBaseLocator).not.toHaveClass(PanelClass);
    await expect(emailInput).toBeVisible();

    // Click on the second panel again to close it
    await panelTwoBaseLocator.locator('legend').click();

    // Check that the second panel is now closed
    await expect(panelOneBaseLocator).toHaveClass(PanelClass);
    await expect(panelTwoBaseLocator).toHaveClass(PanelClass);
    await expect(textInput).toBeHidden();
    await expect(emailInput).toBeHidden();
  });
});
