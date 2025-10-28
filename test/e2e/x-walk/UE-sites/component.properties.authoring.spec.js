import { expect, test } from '../../fixtures.js';
import { UniversalEditorBase } from '../../main/page/universalEditorBasePage.js';

const universalEditorBase = new UniversalEditorBase();
const { selectors } = universalEditorBase;
const fieldPath = 'content/root/section/form';
const componentName = 'Email Input';
const component = 'emailinput';
const randomValues = Date.now();

test.describe('Component properties validation in UE', () => {
  const testURL = 'https://author-p133911-e1313554.adobeaemcloud.com/ui#/@formsinternal01/aem/universal-editor/canvas/author-p133911-e1313554.adobeaemcloud.com/content/aem-boilerplate-forms-xwalk-collaterals/componentPropertyValidation.html';

  test('Component title validation in UE @chromium-only', async ({ page }) => {
    await page.goto(testURL, { waitUntil: 'load' });

    const frame = page.frameLocator(selectors.iFrame);
    const iframeEditor = frame.frameLocator(selectors.iFrameEditor);
    const componentPathInUE = iframeEditor.locator(`${selectors.componentPath}${component}"]`);
    const componentTitlePathInUE = componentPathInUE.filter('input');
    const contentTree = frame.locator(selectors.contentTree);

    await expect(frame.locator(selectors.propertyPagePath)).toBeVisible();
    if (!await componentPathInUE.isVisible({ timeout: 20000 })) {
      await page.reload();
      await expect(componentPathInUE).toBeVisible({ timeout: 20000 });
    }
    await expect(contentTree).toBeVisible({ timeout: 10000 });
    await contentTree.click();
    const componentPathInContentTree = frame.locator(`li[data-resource$="${fieldPath}/${component}"][class*="treenode"]`).first();
    await expandContentTreeField(page, frame, fieldPath);
    await expect(componentPathInContentTree).toBeVisible();
    await componentPathInContentTree.scrollIntoViewIfNeeded();
    await componentPathInContentTree.click({ force: true });
    await frame.locator(selectors.propertyPagePath).click();
    const componentProperties = await frame.locator(selectors.panelHeaders).first();
    await expect(componentProperties).toBeVisible();
    await expect(componentProperties).toContainText(componentName);

    // Ensure property field is visible, reload if not
    const isPropertyVisible = frame.locator('.is-canvas [class*="TabsPanel-tabs"]').last();
    if (!await isPropertyVisible.isVisible({ timeout: 6000 })) {
      await page.reload();
      await expect(isPropertyVisible).toBeVisible({ timeout: 10000 });
    }

    // Fill and validate the component title
    const titleLocator = frame.locator(selectors.componentTitleInProperties);
    const componentTitle = `${componentName}-${randomValues}`;
    await titleLocator.fill(componentTitle);
    await titleLocator.blur();
    await expect(componentTitlePathInUE).toHaveText(componentTitle, { timeout: 5000 });
  });
});

// This function expands the tree nodes in the content tree to reach a specific field.
// Do not include leaf nodes (fields) in the path that do not have an expand/collapse button.
// Only intermediate nodes with expandable behavior should be part of the path.
async function expandContentTreeField(page, frame,  path) {
  const nodeNames = path.split('/').filter(Boolean);
  for (const nodeName of nodeNames) {
    const expandButtonSelector = `li[data-resource$="${nodeName}"][class*="treenode"] button`;
    const expandButton = frame.locator(expandButtonSelector).first();
    await expect(expandButton).toBeVisible({ timeout: 5000 });

    const ariaLabel = await expandButton.getAttribute('aria-label');
    if (ariaLabel.includes('Expand Node')) {
      await expandButton.click();
      await expect(expandButton).toHaveAttribute('aria-label', 'Collapse Node');
    }
  }
}



