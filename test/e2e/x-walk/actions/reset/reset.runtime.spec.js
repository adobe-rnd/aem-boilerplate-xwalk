import { test, expect } from '../../../fixtures.js';
import { fillField, openPage } from '../../../utils.js';

const wizardCount = ".repeat-wrapper fieldset[class='panel-wrapper field-wrapper wizard']";
const wizardPanelCount = 'ul.wizard-menu-items li.wizard-menu-item';
const titles = ['Text Input', 'Check Box Group', 'Number Input', 'Radio Button', 'Telephone Input', 'Email Input', 'File Attachment', 'Dropdown', 'Date Input'];
const fileName = 'empty.pdf';
const dropDownSelector = 'div.drop-down-wrapper select';
const inputValues = {
  textInput: 'adobe',
  emailInput: 'test@adobe.com',
  numberInput: '123',
  dropDown: 'Orange',
  FilePath: './test/e2e/upload/empty.pdf',
  dataInput: '2022-12-23',
};

test.describe('resetButton validation test', () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/wizard-validation';
  test('resetButton validation on wizard panels', async ({ page }) => {
    await openPage(page, testURL);
    for (let i = 0; i < 4; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await page.getByText('Button').click();
    }
    await page.getByRole('button', { name: 'Reset' }).click();
    const Count = await page.locator(wizardCount).count();
    expect(Count).toEqual(1);
  });

  test('resetButton validation on repeatable wizard', async ({ page }) => {
    await openPage(page, testURL);
    const count = await page.locator(wizardPanelCount).count();
    await page.pause();
    for (let i = 0; i < count - 1; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await page.getByRole('button', { name: 'Next' }).click({ force: true });
    }
    await page.getByRole('button', { name: 'Reset' }).click();
    await Promise.all(
      [
        expect(page.getByText('Next')).toBeVisible(),
        !expect(page.getByText('Back')).not.toBeVisible(),
      ],
    );
  });

  test('Check for reset functionality', async ({ page }) => {
    const testURL1 = '/content/aem-boilerplate-forms-xwalk-collaterals/reset-validation';
    await openPage(page, testURL1);
    // eslint-disable-next-line no-restricted-syntax
    for (const title of titles) {
      // eslint-disable-next-line no-await-in-loop,max-len
      await fillField(page, title, inputValues);
    }
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    // eslint-disable-next-line no-restricted-syntax
    for (const title of titles) {
      // eslint-disable-next-line no-await-in-loop,no-use-before-define
      await checkIfReset(page, title);
    }
  });

  test('Check reset for panel not populating fields with undefined', async ({ page }) => {
    const testURL1 = '/content/aem-boilerplate-forms-xwalk-collaterals/reset-validation';
    await openPage(page, testURL1);
    const emailInput = await page.getByRole('group', { name: 'Panel' }).getByLabel('Test Field');
    await emailInput.fill('test@adobe.com');
    await page.getByRole('button', { name: 'Reset Panel' }).click();
    await expect(emailInput).toHaveValue('');
  });
  // eslint-disable-next-line no-shadow
  const checkIfReset = async (page, ComponentsTitle) => {
    switch (ComponentsTitle) {
      case 'Text Input':
      case 'Email Input':
      case 'Telephone Input':
      case 'Date Input':
      case 'Number Input':
        expect(await page.getByLabel(ComponentsTitle).inputValue()).toBe('');
        break;
      case 'Check Box Group':
        expect(await page.getByRole('checkbox', { name: 'Item 1' }).isChecked()).toBe(false);
        break;
      case 'Radio Button':
        expect(await page.getByRole('radio', { name: 'Item 2' }).isChecked()).toBe(false);
        break;
      case 'Dropdown':
        // eslint-disable-next-line no-case-declarations
        await expect(page.locator(dropDownSelector)).toHaveValue('');
        break;
      case 'File Attachment':
        expect(await page.getByLabel(fileName).isVisible()).toBe(false);
        break;
      default:
        console.error(`${ComponentsTitle} Title is not visible`);
        break;
    }
  };
});
