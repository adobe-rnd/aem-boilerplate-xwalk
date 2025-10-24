import { expect } from '../../fixtures.js';

export class CanvasUtils {

  getSelectedComponentLocator(frame, component) {
    return frame.locator(`li[data-resource*="/${component}"] [class*="node-content selected"]`);
  }

  getComponentLocator(frame, component) {
    return frame.locator(`main[class="Canvas"] [data-resource*="/${component}"]`);
  }

  async isComponentPresent(frame, component, timeout) {
    await expect(this.getComponentLocator(frame, component).first()).toBeVisible({ timeout });
  }

  async selectComponent(frame, component) {
    await this.getComponentLocator(frame, component).first().click();
  }

  async isComponentSelected(frame, component, timeout) {
    await expect(this.getSelectedComponentLocator(frame, component).first()).toBeVisible({ timeout });
  }

}
