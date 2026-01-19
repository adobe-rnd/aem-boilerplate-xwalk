import { chromium, expect } from '@playwright/test';

const filePath = './LoginAuth.json';
const baseUrl = 'https://author-p133911-e1313554.adobeaemcloud.com/aem/start.html';
const emailId = process.env.AEM_userName;
const password = process.env.AEM_password;

const selectors = {
  iFrame: 'iframe[id*="exc-app-sandbox"]',
  continueButton : 'div[class*="EmailPage"] button[type="submit"]',
  submitButton: 'div[class$="PasswordPage"] button[type="submit"]'
};

async function globalSetup() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setDefaultTimeout(60000);
  page.setDefaultNavigationTimeout(60000);
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Sign in with Adobe' }).click();
  await expect(page.getByText('Create an account').last()).toBeVisible();
  await page.getByLabel('Email address').fill(emailId);
  await page.locator(selectors.continueButton).click();
  await expect(page.getByText('Enter your password')).toBeVisible();
  await page.getByLabel('Password').first().fill(password);
  await page.locator(selectors.submitButton).click();

  const frame = page.frameLocator(selectors.iFrame);
  await expect(frame.getByText('Navigation').first()).toBeVisible({ timeout: 45000 });
  await page.context().storageState({ path: filePath });
  await context.close();
  await browser.close();
}

export default globalSetup;

