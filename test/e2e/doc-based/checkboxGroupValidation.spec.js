import { test, expect } from '../fixtures.js';
import {openPage} from "../utils.js";

let requestPayload = null;
const expectedPayload = {
  'check-opiton1': null,
  'check-opiton2': null,
  'check-opiton3': null,
  'check-opiton4': 'on',
};

const expectedPayload2 = {
  'check-opiton1': null,
  'check-opiton2': 'on',
  'check-opiton3': 'on',
  'check-opiton4': 'on',
};

const expectedPayload3 = {
  'check-opiton1': 'on',
  'check-opiton2': null,
  'check-opiton3': null,
  'check-opiton4': null,
};

function getCheckboxLocator(option) {
  return `div[class*="field-check-opiton${option}"] input[name="check-opiton${option}"]`;
}

async function formSubmission(page) {
  const submit = page.getByText('Submit');
  await expect(submit).toBeVisible();
  await submit.click();
}

// eslint-disable-next-line no-shadow
async function validatePayload(requestPayload, expectedPayload) {
  const parsedPayload = JSON.parse(requestPayload);
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in expectedPayload) {
    expect(parsedPayload.data[key]).toBe(expectedPayload[key]);
  }
}

async function validateCheckboxOption(page, option) {
  const selector = getCheckboxLocator(option);
  await page.check(selector);
  const isChecked = await page.isChecked(selector);
  expect(isChecked).toBe(true);
}

test.describe('Checkbox Group Validation in Doc-based Form', () => {
  const testURL = '/checkboxgroupoptionvalidation';

  test('Verify Payload Accuracy with Last Checkbox Option Selection', async ({ page }) => {
    await openPage(page, testURL, 'docbased');
    page.on('request', (request) => {
      requestPayload = request.postData();
    });
    await validateCheckboxOption(page, 4);
    await formSubmission(page);
    await validatePayload(requestPayload, expectedPayload);
  });

  test('Verify Payload Accuracy with multiple Checkbox Option Selection including last option', async ({ page }) => {
    await openPage(page, testURL, 'docbased');
    page.on('request', (request) => {
      requestPayload = request.postData();
    });
    await validateCheckboxOption(page, 2);
    await validateCheckboxOption(page, 3);
    await validateCheckboxOption(page, 4);
    await formSubmission(page);
    await validatePayload(requestPayload, expectedPayload2);
  });

  test('Verify Payload Accuracy with first Checkbox Option Selection', async ({ page }) => {
    await openPage(page, testURL, 'docbased');
    page.on('request', (request) => {
      requestPayload = request.postData();
    });
    await validateCheckboxOption(page, 1);
    await formSubmission(page);
    await validatePayload(requestPayload, expectedPayload3);
  });
});
