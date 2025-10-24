import assert from 'assert';
import { JSDOM } from 'jsdom';
import { createBlockWithUrl } from '../../testUtils.js';
import { fetchForm } from '../../../../blocks/form/form.js';

const data = {
  id: 'someid',
  items: [
    {
      fieldType: 'text-input',
      id: 'text-input',
      name: 'f2',
      rules: {
        value: 'f1',
      },
    },
    {
      fieldType: 'text-input',
      id: 'text-input-2',
      name: 'f1',
    },
    {
      fieldType: 'button',
      id: 'button',
      events: {
        click: 'submitForm()',
      },
    },
  ],
};

export function before() {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  const dom = new JSDOM('', { url: 'http://localhost:3000' });
  global.window = dom.window;
  createBlockWithUrl(data, 'http://localhost:3000/adobe/forms/myform.html');
}

export const formPath = 'http://localhost:3000/adobe/forms/myform.html';

export async function expect() {
  assert.equal(await fetchForm(formPath), JSON.stringify(data));
}

export function after() {
  global.fetch.mockData = {};
}

export function op() {}

export const opDelay = 100;
