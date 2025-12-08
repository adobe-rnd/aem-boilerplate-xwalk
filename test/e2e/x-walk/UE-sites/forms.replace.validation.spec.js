import { expect, test } from '../../fixtures.js';
import { UniversalEditorBase } from '../../main/page/universalEditorBasePage.js';
import * as componentPathInUE from '@testing-library/dom';

const universalEditorBase = new UniversalEditorBase();
const { selectors } = universalEditorBase;

// Component configuration
const component = 'emailinput';
const fieldPath = 'content/root/section/form';
const componentName1 = 'Email';
const componentName2 = 'Password';
const partialUrl1 = 'resource/scripts/dompurify.min.js';
const partialUrl2 = 'resource/blocks/form/components/password/password-hide-icon.png';
const waringMessage = 'Warning: Converting to a dissimilar type may cause existing functionality to break.';

const testURL =
  'https://author-p133911-e1313554.adobeaemcloud.com/ui#/@formsinternal01/aem/universal-editor/canvas/author-p133911-e1313554.adobeaemcloud.com/content/forms/af/forms-x-walk-collateral/formsreplace.html';

test.describe('Forms Replace Component', () => {

  test('Verify component replacement functionality in Forms Replace @chromium-only', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(testURL, { waitUntil: 'load' });
    const frame = page.frameLocator(selectors.iFrame);
    const iframeEditor = frame.frameLocator(selectors.iFrameEditor);
    const componentPathInUE = iframeEditor.locator(`${selectors.componentPath}${component}"]`);
    await expect(frame.locator(selectors.propertyPagePath)).toBeVisible();

    await universalEditorBase.expandContentTreeField(page, frame, 'content/root/section');
    try {
      await expect(frame.locator(`li[data-resource$="${fieldPath}"][class*="treenode"] button`)).toBeVisible({timeout: 6000});
    } catch (e) {
      await page.reload();
      await componentPathInUE.waitFor({ state: 'visible', timeout: 20000 });
    }
    await universalEditorBase.expandContentTreeField(page, frame, fieldPath);
    const componentPathInContentTree = frame.locator(`li[data-resource$="${fieldPath}/${component}"][class*="treenode"]`).first();
    await frame.locator(universalEditorBase.selectors.adaptiveFormInContentTree).locator('span').click();
    await expect(frame.locator(universalEditorBase.selectors.adaptiveFormInContentTree).locator('..')).toHaveAttribute('aria-selected', 'true');
    await expect(componentPathInContentTree).toBeVisible();
    await componentPathInContentTree.scrollIntoViewIfNeeded();
    await componentPathInContentTree.click({ force: true });
    const formReplaceButton = frame.locator(selectors.formReplace);
    await expect(formReplaceButton).toBeVisible({ timeout: 8000 });
    await formReplaceButton.click();
    const replaceIframe = frame.frameLocator(universalEditorBase.selectors.replaceFrameLocator);
    await expect(replaceIframe.locator('div[id="forms-replace"] div span:has-text("Selected Component")').first()).toBeVisible({ timeout: 6000 });
    const locator = replaceIframe.locator('div[id="forms-replace"] div span:has-text("Type:") + span');
    await expect(locator).toBeVisible({ timeout: 6000 });
    await expect(locator).not.toHaveText(/loading/i, { timeout: 6000 });
    const componentType = (await locator.textContent())?.trim();
    const replaceContext = { page, frame, replaceIframe };
    if (componentType === componentName1) {
      await replaceFormComponent(replaceContext, componentName2, partialUrl2);

    } else if (componentType === componentName2) {
      await replaceFormComponent(replaceContext, componentName1, partialUrl1);

    } else {
      throw new Error('Neither Email nor Password component was visible.');
    }
  });
});

async function waitForAndValidateResponse(page, partialUrl) {
  const response = await page.waitForResponse(resp =>
    resp.url().includes(partialUrl) && resp.status() === 200
  );
  expect(response.url()).toContain(partialUrl);
  expect(response.status()).toBe(200);
  expect(response.ok()).toBe(true);
}

async function replaceFormComponent(replaceContext, componentName, partialUrl) {
  const { page, frame, replaceIframe } = replaceContext;
  await replaceIframe.locator(selectors.replaceTextLocator + '+ button').click();
  await replaceIframe.locator(selectors.replaceTextLocator).type(componentName, { delay: 100 });
  const componentLocator = replaceIframe.getByText(componentName).last();
  await expect(componentLocator).toBeVisible();
  await componentLocator.waitFor({ state: 'visible' });
  await replaceIframe.getByText(componentName).last().click();
  await expect(replaceIframe.getByText(waringMessage)).toBeVisible();
  const replaceButton = replaceIframe.getByText('Replace').last();
  await replaceButton.page().waitForTimeout(300);
  await replaceButton.scrollIntoViewIfNeeded();
  await expect(replaceButton).toBeEnabled();
  await replaceButton.click();
  await waitForAndValidateResponse(page, partialUrl);
  const formReplaceButton = frame.locator(selectors.formReplace);
  await expect(formReplaceButton).toBeVisible();
  await formReplaceButton.click();
  await expect(
    replaceIframe
      .locator(`div[id="forms-replace"] div span:text-is("${componentName}")`)
      .first()
  ).toBeVisible({timeout: 8000});
}
