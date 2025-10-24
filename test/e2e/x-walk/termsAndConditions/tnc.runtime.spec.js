import { expect, test } from '../../fixtures.js';
import { openPage } from '../../utils.js';

let requestPayload = null;
const checkboxLocator = 'input[type="checkbox"]';
const termsAndConditionsLocator = 'div[class*="tnc-text-decoration"]';
const partialUrl = '/L2NvbnRlbnQvYWVtLWJvaWxlcnBsYXRlLWZvcm1zLXh3YWxrLWNvbGxhdGVyYWxzL3Rlcm1zLWFuZC1jb25kaXRpb24vamNyOmNvbnRlbnQvcm9vdC9zZWN0aW9uL2Zvcm0=';

test.describe('validation of components in UE publish mode', async () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/terms-and-condition';

  test('Terms and conditions validation in UE @chromium-only', async ({ page }) => {
    await openPage(page, testURL);
    // listeners to fetch payload form submission.
    page.on('request', async (request) => {
      if (request.url().includes(partialUrl)) {
        requestPayload = request.postData();
      }
    });

    await expect(page.getByText('Terms and conditions')).toBeVisible();
    const termsAndConditions = page.locator(termsAndConditionsLocator);
    await termsAndConditions.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });

    await expect(page.getByText('We are at the bottom of Terms & conditions.')).toBeVisible();
    await page.locator(checkboxLocator).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    expect(requestPayload.includes('on')).toBeTruthy();
  });
});
