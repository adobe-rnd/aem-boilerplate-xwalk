import { expect, test } from '../../fixtures.js';

import { UniversalEditorBase } from '../../main/page/universalEditorBasePage.js';
const universalEditorBase = new UniversalEditorBase();
const textInputValue = 'Adobe';
const emailId = 'adobe@test.com';
const componentNames = ['textinput', 'emailinput', 'button'];
test.describe('Preview Validation in UE', async () => {
  const testURL = 'https://author-p133911-e1313554.adobeaemcloud.com/ui#/@formsinternal01/aem/universal-editor/canvas/author-p133911-e1313554.adobeaemcloud.com/content/aem-boilerplate-forms-xwalk-collaterals/ruleValidationInPreview.html';

  test('Rules validation in UE preview mode @chromium-only', async ({ page }) => {
    await page.goto(testURL);
    const frame = page.frameLocator(universalEditorBase.selectors.iFrame);
    const iframeEditor = frame.frameLocator(universalEditorBase.selectors.iFrameEditor);
    const componentPathInUE = await iframeEditor.locator(`${universalEditorBase.selectors.componentPath + componentNames[2]}"]`);
    await expect(frame.locator(universalEditorBase.selectors.propertyPagePath)).toBeVisible();
    await expect(componentPathInUE).toBeVisible({ timeout: 16000 });
    const previewButton = frame.locator(universalEditorBase.selectors.preview);
    await expect(previewButton).toBeVisible();
    await previewButton.click();
    await expect(frame.locator(universalEditorBase.selectors.iFrameInPreview)).toBeVisible();
    const iframe = frame.frameLocator(universalEditorBase.selectors.iFrameInPreview);
    for (const componentName of componentNames) {
      const componentLocator = universalEditorBase.componentLocatorForPreview(componentName);
      if (componentName === 'button') {
        await expect(iframe.locator(componentLocator)).toBeHidden();
      } else {
        await expect(iframe.locator(componentLocator)).toBeVisible();
      }
    }
    const textInput = iframe.locator(universalEditorBase.componentLocatorForPreview(componentNames[0])).locator('input');
    const button = iframe.locator(universalEditorBase.componentLocatorForPreview(componentNames[2]));
    const emailInput = iframe.locator(universalEditorBase.componentLocatorForPreview(componentNames[1]));
    await textInput.click();
    await page.keyboard.type(textInputValue, { delay: 100 });
    await textInput.blur();
    await expect(button).toBeVisible();
    await button.locator('button').click();
    expect(await emailInput.locator('input').inputValue()).toBe(emailId);
  });
});
