import { expect } from '../../fixtures.js';
import { ComponentUtils } from '../utils/componentUtils.js';
import { CanvasUtils } from '../utils/canvasUtils.js';

export class UniversalEditorBase {
  selectors = {
    ruleEditor: 'button[aria-label="Rule Editor"]',
    preview: '[aria-label="Preview"]',
    contentTree: 'button[aria-label="Content tree"]',
    dataSource: 'button[aria-label="Data Sources"]',
    mainInContentTree: 'li > [class*="content expandable collapsed"]',
    adaptiveFormPathInUE: 'main[class="Canvas"] button[data-resource$="content/root/section/form"]',
    adaptiveFormDropdown: 'li[data-resource*="content/root/section/form"] button[aria-label]',
    adaptiveFormInContentTree: 'li[data-resource*="content/root/section/form"] label[title="Adaptive Form"]',
    componentPath: 'div[class="form block edit-mode"] [data-aue-resource*="/',
    componentSelectorValidation: 'li[data-resource*="/textinput"] [class="node-content selected"]',
    insertComponent: 'div[data-testid="right-rail-tools"] button[aria-haspopup]',
    formPathInContentTree: 'li[data-resource*="/root/section/form"] p[class*="node-content"]',
    formPathInUeSites: 'button[data-resource$="root/section/form"]',
    sectionTwoPath: 'li[data-resource*="content/root/section"] div[class*="content expandable"]',
    defaultAndBlockMenu: 'div[role="presentation"][class*="Submenu-wrapper"]',
    adaptiveFormPathInBlockMenu: 'div[role="presentation"] div[data-key="blocks_form"]',
    formReplace: 'button[aria-label="Forms Replace"]',
    replaceFrameLocator: 'iframe[name="uix-guest-Forms"]',
    iFrame: 'iframe[name="Main Content"]',
    iFrameEditor: 'iframe[title="Editable app frame"]',
    iFrameInPreview: 'iframe[class="penpal"]',
    panelHeaders: 'div[class="PanelHeader"]',
    propertyPagePath: 'button[aria-label="Properties"]',
    componentTitleInProperties: 'textarea[aria-label="Title"]',
    deleteButton: 'button[aria-label="Delete"]',
    deleteConfirmationButton: '[data-variant="negative"][class*="aaz5ma_spectrum-ButtonGroup-Button"]',
    deletePopup: 'section[class*="spectrum-Dialog--destructive"]',
    replaceTextLocator: 'div[role="presentation"] input[type="text"]'
  };

  datasource  = {
    expandAllButton : 'button[type="button"][aria-label="Expand All"]',
    addButton : 'button[type="button"] span:has-text("Add")',
    bindRef: 'label:has-text("Bind Reference")',
    dataSourceFrame : 'iframe[name*="AEM Forms Datasource"]',
    datasourceIFrame: 'div[id="datasource"] iframe[id*="datasource"]',
    bindRefInput: 'div[id="datasource"] input[type="text"]',
    bindRefSelectButton: 'button[type="button"][aria-label="Select Bindref from Tree"]',
    selectButton : 'button[type="button"] span:has-text("Select")',
  }

  componentUtils = new ComponentUtils();
  canvasUtils = new CanvasUtils();

  componentLocatorForPreview(componentName) {
    return `div[data-id*="${componentName}"]`;
  }

  componentLocatorForUe(component) {
    return `main[class="Canvas"] [data-resource*="/${component}"]`;
  }

  async waitForCountToDecreaseByOne(adaptiveFormPath, initialCount) {
    while (await adaptiveFormPath.count() !== initialCount - 1) {
      await adaptiveFormPath.page().waitForTimeout(100);
    }
  }

  async verifyComponentInsert({frame, iframe, componentName, component}) {
    await expect(frame.locator(this.selectors.insertComponent)).toBeVisible({ timeout: 10000 });
    await frame.locator(this.selectors.insertComponent).click();
    await this.componentUtils.addComponent(frame, componentName);
    await expect(frame.locator(this.selectors.adaptiveFormDropdown)).toBeVisible({ timeout: 15000 });
    const componentPath = `${this.selectors.componentPath}${component}"]`;
    await expect(iframe.locator(componentPath)).toBeVisible({ timeout: 20000 });
    await iframe.locator(componentPath).click({ force: true });
    await expect(frame.locator(`li[data-resource*="${component}"]`)).toBeVisible({ timeout: 2000 });
  }

  async verifyComponentDelete(page, frame, component) {
    let componentPathInUE = frame.locator(this.componentLocatorForUe(component));
    let count = await componentPathInUE.count();
    while (count > 0) {
      await this.canvasUtils.isComponentPresent(frame, component, 2000);
      await this.canvasUtils.selectComponent(frame, component);
      await this.canvasUtils.isComponentSelected(frame, component, 2000);
      await this.componentUtils.deleteComponent(frame);
      await this.waitForCountToDecreaseByOne(componentPathInUE, count);
      componentPathInUE = await frame.locator(this.componentLocatorForUe(component));
      count = await componentPathInUE.count();
    }
    await expect(componentPathInUE).toHaveCount(0);
  }

  // This function expands the tree nodes in the content tree to reach a specific field.
  // Do not include leaf nodes (fields) in the path that do not have an expand/collapse button.
  // Only intermediate nodes with expandable behavior should be part of the path.
  async expandContentTreeField(page, frame,  path) {
    await this.componentUtils.verifyAndClickContentTree(frame);
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
}
