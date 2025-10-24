import { expect } from '../../fixtures.js';

export class ComponentUtils {
  selectors = {
    contentTreeLabel: '[aria-label="Content tree"]',
    deleteButton: 'button[aria-label="Delete"]',
    componentList: 'div[role="presentation"][class$="spectrum-Submenu-wrapper"]'
  };

  async addComponent(frame, componentName) {
    await expect(frame.locator(this.selectors.componentList)).toBeVisible();
    await expect(frame.getByLabel(componentName)).toBeVisible();
    await frame.getByLabel(componentName).click();
  }

  async deleteComponent(frame) {
    await frame.locator(this.selectors.deleteButton).click();
    await expect(frame.getByText("The selected component will be permanently deleted.")).toBeVisible();
    await frame.getByText("OK").click();
  }
  async verifyAndClickContentTree(frame) {
    const contentTreeLabel = frame.locator(this.selectors.contentTreeLabel);
    await expect(contentTreeLabel).toBeVisible({ timeout: 10000 });
    await contentTreeLabel.click();
  }
}
