/**
 * Helper function to load a form and ensure it's fully initialized
 * @param {Page} page - Playwright page object
 * @returns {Promise<void>}
 */
export async function loadForm(page) {
  // Wait for form container to be visible
  await page.waitForSelector('.cmp-adaptiveform-container', { state: 'visible' });
  
  // Wait for form to be fully initialized (adjust selector as needed)
  await page.waitForFunction(() => {
    return window.myForm !== undefined;
  });
  
  // Give a little time for all subscriptions to be processed
  await page.waitForTimeout(100);
} 