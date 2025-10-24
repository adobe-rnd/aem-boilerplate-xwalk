import { test, expect } from '../../../fixtures.js';
import { fillField, openPage } from '../../../utils.js';

const inputValues = {
  textInput: 'adobe',
  emailInput: 'test@adobe.com',
  numberInput: '123',
  dropDown: 'Orange',
  FilePath: './test/e2e/upload/empty.pdf',
  dataInput: '2022-12-23',
};
const actionUrl = 'https://publish-p133911-e1313554.adobeaemcloud.com/adobe/forms/af/submit/L2NvbnRlbnQvYWVtLWJvaWxlcnBsYXRlLWZvcm1zLXh3YWxrLWNvbGxhdGVyYWxzL3N1Ym1pdFZhbGlkYXRpb24vc3VibWlzc2lvbi9qY3I6Y29udGVudC9yb290L3NlY3Rpb24vZm9ybQ==';
const partialUrl = '/L2NvbnRlbnQvYWVtLWJvaWxlcnBsYXRlLWZvcm1zLXh3YWxrLWNvbGxhdGVyYWxzL3N1Ym1pdFZhbGlkYXRpb24vc3VibWlzc2lvbi9qY3I6Y29udGVudC9yb290L3NlY3Rpb24vZm9ybQ==';
const titles = ['Text Input', 'Check Box Group', 'Number Input', 'Radio Button', 'Telephone Input', 'Email Input', 'File Attachment', 'Dropdown', 'Date Input'];

test.describe('Form with Submit Button', async () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/submitvalidation/submission';

  test('Clicking the button should submit the form', async ({ page }) => {
    await openPage(page, testURL);
    await page.evaluate((actionUrl) => {
      window.myForm._jsonModel.action = actionUrl;
    }, actionUrl);

    for (const title of titles) {
      await fillField(page, title, inputValues);
    }
    const responsePromise = page.waitForResponse(
      (response) => response.url().includes(partialUrl) && response.status() === 200
    );
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Thank you for submitting the form.')).toBeVisible();
    await responsePromise;
  });
});

