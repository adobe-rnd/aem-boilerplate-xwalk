/* eslint-env mocha */
import assert from 'assert';
import * as dom from 'dom-compare';
import fs from 'fs';
import jsdom from 'jsdom';
import path from 'path';
import Sinon from 'sinon';
import decorate, { DELAY_MS, generateFormRendition } from '../../blocks/form/form.js';
import { getCustomComponents, setCustomComponents } from '../../blocks/form/mappings.js';
import { resetIds } from '../../blocks/form/util.js';
import { annotateFormForEditing, getItems } from '../../scripts/form-editor-support.js';

function escapeHTML(str) {
  return (str.replace(/[&<>'"]/g, (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[tag])));
}

export function createBlock(def) {
  const pre = `<pre><code>
    ${escapeHTML(JSON.stringify(JSON.stringify(def)))}
  </code></pre>`;
  const div = document.createElement('div');
  div.innerHTML = pre;
  return div;
}

export function createBlockWithUrl(def, url) {
  global.fetch.mockData = {
    [url]: def,
  };
  const anchor = `<a href="${url}"></a>`;
  const div = document.createElement('div');
  div.innerHTML = anchor;
  return div;
}

function createElementFromHTML(htmlString, fieldDef) {
  const { action } = fieldDef;
  const source = fieldDef?.[':type'] || 'aem';
  const form = document.createElement('form');
  form.innerHTML = htmlString.trim();
  form.dataset.action = action;
  form.dataset.source = source;
  form.dataset.rules = source === 'aem';
  form.dataset.redirectUrl = fieldDef.redirectUrl || '';
  form.dataset.thankYouMsg = fieldDef.thankYouMsg || '';
  form.dataset.id = fieldDef.id;
  form.noValidate = true;
  // Change this to div.childNodes to support multiple top-level nodes.
  return form;
}

export function testBasicMarkup(filePath, bUrlMode = false, customComponents = [], codeBasePath = '../..') {
  it(`Rendering of ${filePath?.substr(filePath.lastIndexOf('/') + 1)}`, async () => {
    resetIds();
    const module = await import(filePath);
    const {
      fieldDef, expectedDiffs = 0, extraChecks, formPath, ignore = false,
    } = module;
    if (ignore) {
      return;
    }
    let { markUp } = module;
    const htmlFile = `${filePath.substr(0, filePath.lastIndexOf('/') + 1)}${filePath?.substr(filePath.lastIndexOf('/') + 1).split('.').slice(0, -1).join('.')}.html`;
    // read html file async
    if (!markUp) {
      markUp = fs.readFileSync(htmlFile, 'utf8').replace(/\n\s+/g, ' ');
    }
    if (bUrlMode && !formPath) {
      assert.equal(true, false, 'formpath is not defined');
    }
    const oldCustomComponents = getCustomComponents();
    global.window = new jsdom.JSDOM('', { url: 'http://localhost:2000/test/path' }).window;
    window.hlx = { codeBasePath };
    setCustomComponents(customComponents);
    const block = bUrlMode ? createBlockWithUrl(fieldDef, `${formPath}`) : createBlock(fieldDef);
    if (fieldDef && markUp) {
      await decorate(block);
      const form = block.querySelector('form');
      console.log('----------Actual----------');
      console.log(form.outerHTML);
      console.log('----------Expected----------');
      console.log(createElementFromHTML(markUp, fieldDef).outerHTML);
      const result = dom.default.compare(createElementFromHTML(markUp, fieldDef), form);
      const differences = result.getDifferences();
      console.log('---------diff--------');
      console.log(differences);
      if (Array.isArray(expectedDiffs)) {
        assert.equal(differences.length, Array.isArray(expectedDiffs) ? expectedDiffs.length : expectedDiffs, 'Number of differences do not match expected differences');
        const computedDiffs = differences.map((d) => {
          const match = d.message.match(/Attribute '([^']+)':/);
          return {
            node: d.node,
            attribute: match?.[1],
          };
        });
        assert.deepStrictEqual(computedDiffs, expectedDiffs);
      } else if (expectedDiffs) {
        const diffs = differences.filter((d) => {
          const match = d.message.match(/Attribute '([^']+)': expected value '([^']+)'/);
          return ['id', 'for', 'data-id'].includes(match?.[1]) && match?.[2]?.startsWith('uniqueId');
        });
        assert.equal(diffs.length, expectedDiffs, 'expected diffs do not match');
      } else {
        assert.equal(differences.length, 0, 'HTML do not match');
      }
      if (extraChecks) {
        extraChecks.forEach((check) => check(form));
      }
    }
    setCustomComponents(oldCustomComponents);
  });
}

function runAfterdelay(fn, delay) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      fn();
      resolve();
    }, delay);
  });
}

async function test(
  sample,
  before = () => {},
  op = () => {},
  expect = () => {},
  opDelay = DELAY_MS,
  after = () => {},
  bUrlMode = false,
  formPath = '',
  refresh = false,
) {
  let block = bUrlMode ? createBlockWithUrl(sample, formPath) : createBlock(sample);
  before();
  // console.log('before');
  await decorate(block);
  // console.log('decorate');
  await runAfterdelay(() => {
    // console.log('before op');
    op(block);
  }, opDelay);
  // console.log('op');
  if (refresh) {
    block = bUrlMode ? createBlockWithUrl(sample, formPath) : createBlock(sample);
    await decorate(block);
  }
  await runAfterdelay(() => {
    // console.log('before expect');
    expect(block);
  }, opDelay);
  // console.log('expect');
  after(block);
}

export async function testDynamism(filePath, bUrlMode = false) {
  const testName = `checking dynamic behaviour for ${filePath?.substr(filePath.lastIndexOf('/') + 1).split('.')[0]}`;
  let btoaStub;
  beforeEach(async () => {
    btoaStub = Sinon.stub(global, 'btoa').callsFake((str) => str);
  });
  afterEach(() => {
    btoaStub.restore();
  });

  it(testName, async () => {
    const {
      sample, before, op, expect, opDelay, after, formPath, ignore = false, refresh = false,
    } = await import(filePath);
    if (ignore) {
      return;
    }
    resetIds();
    await test(sample, before, op, expect, opDelay, after, bUrlMode, formPath, refresh);
  });
}

export function executeTestInFolder(folderPath = './test/fixtures/', testFn = testBasicMarkup, bUrlMode = false) {
  const fixturesFolderPath = path.resolve(folderPath);
  const folders = fs.readdirSync(fixturesFolderPath);
  folders.forEach((folder) => {
    const isDirectory = fs.lstatSync(`${fixturesFolderPath}/${folder}`).isDirectory();
    const name = isDirectory ? `${folder}` : `${folderPath.replace(/\/$/, '').split('/').slice(-1)[0]}-${folder}`;
    if (isDirectory || folder.endsWith('.js')) {
      describe(`Test suit for - ${name}${bUrlMode ? ' - with url' : ''}`, () => {
        if (fs.lstatSync(`${fixturesFolderPath}/${folder}`).isDirectory()) {
          const fileNames = fs.readdirSync(`${folderPath}${folder}`);
          fileNames.filter((f) => f.endsWith('.js')).forEach((fileName) => {
            testFn(`${fixturesFolderPath}/${folder}/${fileName}`, bUrlMode);
          });
        } else if (folder.endsWith('.js')) {
          testFn(`${fixturesFolderPath}/${folder}`, bUrlMode);
        }
      });
    }
  });
}

export function setValue(block, id, value) {
  const input = block.querySelector(id);
  input.value = value;
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

export function testFormFetch(filePath) {
  it(`Fetching of ${filePath?.substr(filePath.lastIndexOf('/') + 1)}`, async () => {
    resetIds();
    const module = await import(filePath);
    const {
      before, op, expect, ignore = false, opDelay, after,
    } = module;
    if (ignore) {
      return;
    }
    await test(null, before, op, expect, opDelay, after);
  });
}

export async function renderForm(formDef) {
  document.documentElement.classList.add('adobe-ue-edit');
  const mainEl = document.createElement('main');
  const divInsideMain = document.createElement('div');
  const formWrapperDiv = document.createElement('div');
  formWrapperDiv.classList.add('form-wrapper');
  const formBlockDiv = document.createElement('div');
  formBlockDiv.classList.add('block');
  formBlockDiv.classList.add('form');
  formBlockDiv.dataset.aueResource = `urn:aemconnection:${formDef.properties['fd:path']}`;
  formBlockDiv.dataset.aueModel = 'form';
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  div1.appendChild(div2);
  formBlockDiv.appendChild(div1);
  formWrapperDiv.appendChild(formBlockDiv);
  divInsideMain.appendChild(formWrapperDiv);
  const formEl = document.createElement('form');
  formEl.dataset.id = formDef.id;
  div2.appendChild(formEl);
  mainEl.appendChild(divInsideMain);
  await generateFormRendition(formDef, formEl, formDef?.id, getItems);
  annotateFormForEditing(formEl, formDef);
  document.body.appendChild(mainEl);
}
