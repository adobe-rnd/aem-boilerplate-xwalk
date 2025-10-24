import assert from 'assert';

import { fieldDef } from '../form/claim.js';
import { setValue } from '../../testUtils.js';

export const sample = fieldDef;

export function op(block) {
  setValue(block, '#textinput-5d4030d204', 'Aya Tan');
  const input = block.querySelector('#fileinput-9d805e9eca');
  const file1 = new File([new ArrayBuffer(1024)], 'file1.png', { type: 'image/png' });
  const event = new Event('change', {
    bubbles: true,
    cancelable: true,
  });
  input.files = [file1];
  input.dispatchEvent(event);
  const fileList = block.querySelector('.files-list');
  assert.equal(fileList.children.length, 1, 'Should render file1');
  assert.equal(fileList.innerHTML.includes('file1.png'), true, 'Should show file1.png');
  const nxt = block.querySelector('.wizard .field-next');
  nxt.click();
  const instances = block.querySelector('.wizard-menu-active-item');
  assert.equal(instances?.dataset.index, 1);
  const resetButton = block.querySelector('#reset-0d74964a9e');
  resetButton.click();
  const form = block.querySelector('form');
  form.dispatchEvent(new Event('reset'));
}

export function expect(block) {
  const instances = block.querySelector('.wizard-menu-active-item');
  assert.equal(instances?.dataset.index, 0);
  assert.equal(block.querySelector('#textinput-5d4030d204').value, '');
  const fileList = block.querySelector('.files-list');
  assert.equal(fileList.children.length, 0, 'Should not render file1');
  assert.equal(fileList.innerHTML.includes('file1.png'), false, 'Should not show file1.png');
}

export const refresh = true;
