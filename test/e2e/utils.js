import { execSync } from 'node:child_process';
import {expect} from "./fixtures.js";

function executeGitCommand(command) {
  return execSync(command)
    .toString('utf8')
    .replace(/[\n\r\s]+$/, '');
}

export async function getFieldModel(page, id) {
  return await page.evaluate(id => {
    return window.myForm._fields[id]._jsonModel;
  }, id);
}

export async function testRepeatablePanel(page, panelLocator) {
  const panel = page.locator(panelLocator);
  const addButton = page.getByText('Add');
  const deleteButtons = page.getByText('Delete');
  await expect(panel).toHaveCount(1);
  await expect(addButton).toBeVisible();
  await addButton.click();
  await expect(panel).toHaveCount(2);
  const panelCount = await panel.count();
  for (let i = 0; i < panelCount; i++) {
    await expect(panel.nth(i)).toBeVisible();
  }
  await expect(addButton).toBeHidden();
  await expect(deleteButtons).toHaveCount(2);
  await expect(deleteButtons.last()).toBeVisible();
  await deleteButtons.last().click();
  await expect(addButton).toBeVisible();
  await expect(panel).toHaveCount(1);
}

// eslint-disable-next-line max-len
export async function fillField(page, componentTitle, inputValues) {
  switch (componentTitle) {
    case 'Text Input':
      await page.getByLabel(componentTitle).fill(inputValues.textInput);
      break;
    case 'Email Input':
      await page.getByLabel(componentTitle).fill(inputValues.emailInput);
      break;
    case 'Telephone Input':
    case 'Number Input':
      await page.getByLabel(componentTitle).fill(inputValues.numberInput);
      break;
    case 'Check Box Group':
      await page.getByRole('checkbox', { name: 'Item 1' }).click();
      break;
    case 'Radio Button':
      await page.getByRole('radio', { name: 'Item 2' }).click();
      break;
    case 'Dropdown':
      await page.getByLabel(componentTitle).selectOption(inputValues.dropDown);
      break;
    case 'File Attachment':
      await page.getByLabel(componentTitle).setInputFiles(inputValues.FilePath);
      break;
    case 'Date Input':
      await page.getByLabel(componentTitle).focus();
      await page.getByLabel(componentTitle).fill(inputValues.dataInput);
      break;
    default:
      console.error(`${componentTitle} Title is not visible`);
      break;
  }
}

const getCurrentBranch = () => executeGitCommand('git rev-parse --abbrev-ref HEAD');
const openPage = async (page, relativeURL, type='xwalk') => {
  let site = null
  if(type === 'docbased') {
    site = '--aem-boilerplate-forms-doc-based--adobe-rnd.aem.live'
  } else if(type === 'xwalk') {
    site = '--aem-boilerplate-forms--adobe-rnd.aem.live';
  }
  const url = `https://${getCurrentBranch()}${site}${relativeURL}`;
  await page.goto(url, { waitUntil: 'networkidle' });
};

export { openPage, getCurrentBranch };