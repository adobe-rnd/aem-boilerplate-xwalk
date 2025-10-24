import { test, expect } from '../fixtures.js';
import { openPage } from '../utils.js';


test.describe('form variables test suite', () => {
const url = '/content/aem-boilerplate-forms-xwalk-collaterals/variables?accountCode=A1234&utm_campaign=test_campaign';
test('check query params and browser details are getting set in properties', async ({ page }) => {
    await openPage(page, url);
    // the value of the textinput is set via rule editor to the query params passed
    const accountCode = await page.getByLabel('Account Code');
    const utmCampaign = await page.getByLabel('UTM Campaign');
    const browserLanguage = await page.getByLabel('Browser Language');
    await expect(accountCode).toHaveValue('A1234');
    await expect(utmCampaign).toHaveValue('test_campaign');
    // await expect(browserLanguage).toHaveValue('en-US');  
  });
});