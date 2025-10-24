import { test, expect } from '../fixtures.js';
import {fillField, openPage} from '../utils.js';

const inputValues = {
  textInput: 'adobe',
  numberInput: '123',
  dropDown: 'Orange',
  FilePath: './test/e2e/upload/empty.pdf',
  dataInput: '2022-12-23',
};
const expectedPayload = {
  textInput: 'adobe',
  'check-opiton': 'on',
  'check-opiton1': null,
  number: '123',
  'radio-opiton': 'on',
  telInput: '123',
  fileAttachment: null,
  dropdown: 'Orange',
  dateInput: '2022-12-23',
  name: 'Test',
  emailName: 'test@adobe.com',
};
const emailinput = 'test@adobe.com';
const titles = ['Text Input', 'Check Box Group', 'Number Input', 'Radio Button', 'Telephone Input', 'File Attachment', 'Dropdown', 'Date Input'];
// eslint-disable-next-line no-unused-vars
let requestPayload = null;

test.describe('Form Rendering and Submission Validation', async () => {
  const testURL = '/submissionvalidation';

  test('Validate Doc-Based Form components and submission payload @chromium-only', async ({ page }) => {
    await openPage(page, testURL, 'docbased');
    await expect(page.getByLabel('Text Input')).toBeVisible();

    // listeners to fetch payload form submission.
    page.on('request', async (request) => {
      requestPayload = request.postData();
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const title of titles) {
      // eslint-disable-next-line no-await-in-loop,max-len
      await fillField(page, title, inputValues);
    }
    const emailInput = page.getByLabel('Email');
    await expect(emailInput).toBeHidden();
    const TextInput = page.getByLabel('Test Name');
    await TextInput.fill('Test');
    await TextInput.blur();
    await expect(emailInput).toBeVisible();
    await emailInput.fill(emailinput);
    const submit = page.getByText('Submit');
    await expect(submit).toBeVisible();
    await submit.click();
    const parsedPayload = JSON.parse(requestPayload);
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in expectedPayload) {
      expect(parsedPayload.data[key]).toBe(expectedPayload[key]);
    }
  });
});
