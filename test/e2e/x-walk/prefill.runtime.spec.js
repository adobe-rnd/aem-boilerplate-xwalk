import { expect, test } from '@playwright/test';
import { openPage } from '../utils.js';

const submitUrl = 'https://publish-p133911-e1313554.adobeaemcloud.com/adobe/forms/af/submit/L2NvbnRlbnQvZm9ybXMvYWYveHdhbGstdGVzdC1jb2xsYXRlcmFsL2ZkbXByZWZpbGwvZmRtc3VibWlzc2lvbg==';
const dropDownSelector = 'div.drop-down-wrapper select';
const submitBaseUrl = 'https://publish-p133911-e1313554.adobeaemcloud.com';
const petName = 'adobe';
const id = '25';
const status = 'sold';
const ruleText = 'test';

test.describe.skip('test cases prefill', async () => {
  const testURL = '/drafts/tests/x-walk/fdmsubmission';
  const testURL1 = '/drafts/tests/x-walk/fdminvokeservice';
  test('test case for fdmSubmission, invokeService and custom prefill', async ({ page }) => {
    await openPage(page, testURL);
    await page.getByLabel('Name').fill(petName);
    // eslint-disable-next-line no-shadow
    await page.evaluate(async (submitUrl) => {
      // eslint-disable-next-line no-undef,no-underscore-dangle
      myForm._jsonModel.action = submitUrl;
    }, submitUrl);
    await page.getByLabel('id').fill(id);
    await page.getByLabel('Status').selectOption(status);
    await page.getByRole('button', { name: 'Submit' }).click();
    await openPage(page, testURL1);
    // eslint-disable-next-line no-use-before-define
    await setSubmitBaseUrl(page);
    await page.getByLabel('Text Input').fill(ruleText);
    await page.getByLabel('Text Input').blur();
    await expect(page.getByLabel('Name')).toHaveValue(petName);
    expect(await page.getByLabel('id').inputValue()).toBe(id);
    await expect(page.locator(dropDownSelector)).toHaveValue(status);
    // Upon hitting the button the page will be redirecting to EDS Pre-fill Form.
    await page.getByRole('button', { name: 'Button' }).click();
    // eslint-disable-next-line no-use-before-define
    await setSubmitBaseUrl(page);
    await expect(page.getByLabel('Name')).toBeVisible({ timeout: 15000 });
    expect(await page.getByLabel('Name').inputValue()).toBe(petName);
    expect(await page.getByLabel('id').inputValue()).toBe(id);
    await expect(page.locator(dropDownSelector)).toHaveValue(status);
  });

  const setSubmitBaseUrl = async (page) => {
    // eslint-disable-next-line no-shadow
    await page.evaluate(async (submitBaseUrl) => {
      /* eslint-disable import/no-absolute-path */
      // eslint-disable-next-line import/no-unresolved
      await import('/blocks/form/constant.js').then((module) => {
        module.setSubmitBaseUrl(submitBaseUrl);
      });
    }, submitBaseUrl);
  };
});
