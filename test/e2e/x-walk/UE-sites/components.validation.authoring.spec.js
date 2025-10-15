import { test, expect } from '../../fixtures.js';
import { UniversalEditorBase } from '../../main/page/universalEditorBasePage.js';
import { ComponentUtils } from '../../main/utils/componentUtils.js';

const componentUtils = new ComponentUtils();
const universalEditorBase = new UniversalEditorBase();
const componentName = 'Text Input';
const component = 'textinput';

test.describe('Forms Authoring in Universal Editor tests', () => {
  const testURL = 'https://author-p133911-e1313554.adobeaemcloud.com/ui#/@formsinternal01/aem/universal-editor/canvas/author-p133911-e1313554.adobeaemcloud.com/content/aem-boilerplate-forms-xwalk-collaterals/componentValidation.html';
  let frame, iframe, properties, componentPathInUE;

  test.beforeEach(async ({ page }) => {
    await page.goto(testURL, { waitUntil: 'load' });
    frame = page.frameLocator(universalEditorBase.selectors.iFrame);
    iframe = frame.frameLocator(universalEditorBase.selectors.iFrameEditor);
    properties = frame.locator(universalEditorBase.selectors.propertyPagePath);
    componentPathInUE = frame.locator(universalEditorBase.componentLocatorForUe(component));
    const adaptiveFormPathInUE = frame.locator(universalEditorBase.selectors.adaptiveFormPathInUE).first();
    const ruleEditor = frame.locator(universalEditorBase.selectors.ruleEditor);

    await expect(await properties).toBeVisible();
    try {
      await expect(adaptiveFormPathInUE).toBeVisible({ timeout: 16000 });
    } catch (error) {
      await expect(ruleEditor).toBeVisible({ timeout: 10000 });
      await expect(adaptiveFormPathInUE).toBeVisible({ timeout: 10000 });
    }
    await page.reload();
    await componentUtils.verifyAndClickContentTree(frame);
    await expect(frame.locator(universalEditorBase.selectors.panelHeaders)).toHaveText('Content tree');

    try {
      await componentPathInUE.first().waitFor({ state: 'visible', timeout: 10000 });
      await universalEditorBase.verifyComponentDelete(page, frame, component);
    } catch (error) {}
  });

  test('Adding a new component and checking the markup @chromium-only', async ({page}) => {
    const formPath = frame.locator(universalEditorBase.selectors.formPathInUeSites);
    await formPath.scrollIntoViewIfNeeded();
    await formPath.click();
    await universalEditorBase.verifyComponentInsert({frame, iframe,  componentName, component});
  });

  test.afterEach(async ({ page }) => {
    await page.goto(testURL, { waitUntil: 'load' });
    await componentUtils.verifyAndClickContentTree(frame);
    await expect(frame.locator(universalEditorBase.selectors.adaptiveFormPathInUE).first()).toBeVisible({ timeout: 10000 });
    if(await componentPathInUE.first().isVisible({ timeout: 10000 })) {
      await universalEditorBase.verifyComponentDelete(page, frame, component);
    }
  });
});
