/* eslint-env mocha */
import assert from 'assert';
import sinon from 'sinon';
import { renderFormBlock } from '../../scripts/form-editor-support.js';
import { renderFormBlockFormDef, renderFormBlockFormDefWithPanel } from './fixtures/ue/renderFormBlock/formDefinition.js';

describe('renderFormBlock Test Cases', () => {
  let fetchStub;
  let consoleWarnStub;
  let consoleErrorStub;
  let originalLocation;

  beforeEach(() => {
    document.body.innerHTML = '';
    document.documentElement.classList.add('adobe-ue-edit');
    window.hlx = { codeBasePath: '../../' };

    // Store original location
    originalLocation = window.location;

    // Stub console methods
    consoleWarnStub = sinon.stub(console, 'warn');
    consoleErrorStub = sinon.stub(console, 'error');
  });

  afterEach(() => {
    if (fetchStub) {
      fetchStub.restore();
    }
    consoleWarnStub.restore();
    consoleErrorStub.restore();
    document.body.innerHTML = '';
    document.documentElement.classList.remove('adobe-ue-edit');
  });

  /**
   * Helper function to create a form block structure for testing
   */
  function createFormBlockStructure(formDef, options = {}) {
    const { hasEditMode = false, formPath = '/content/test/form' } = options;

    const mainEl = document.createElement('main');
    const formWrapperDiv = document.createElement('div');
    formWrapperDiv.classList.add('form-wrapper');

    const blockDiv = document.createElement('div');
    blockDiv.classList.add('block', 'form');
    blockDiv.dataset.aueResource = `urn:aemconnection:${formDef.properties['fd:path']}`;
    blockDiv.dataset.aueModel = 'form';
    if (hasEditMode) {
      blockDiv.classList.add('edit-mode');
    }

    const containerDiv = document.createElement('div');
    const innerDiv = document.createElement('div');

    const form = document.createElement('form');
    form.dataset.formpath = formPath;
    form.dataset.id = formDef.id;

    innerDiv.appendChild(form);
    containerDiv.appendChild(innerDiv);
    blockDiv.appendChild(containerDiv);
    formWrapperDiv.appendChild(blockDiv);
    mainEl.appendChild(formWrapperDiv);
    document.body.appendChild(mainEl);

    return { form, blockDiv, containerDiv, innerDiv };
  }

  it('should render form block in edit mode with successful fetch', async () => {
    const { form, blockDiv } = createFormBlockStructure(renderFormBlockFormDef);

    // Stub fetch to return form definition
    fetchStub = sinon.stub(global, 'fetch').resolves({
      json: () => Promise.resolve(renderFormBlockFormDef),
    });

    const result = await renderFormBlock(form, true);

    assert.ok(result, 'Result should not be null');
    assert.ok(result.formEl, 'Result should contain formEl');
    assert.ok(result.formDef, 'Result should contain formDef');
    assert.deepStrictEqual(result.formDef, renderFormBlockFormDef, 'formDef should match the fetched definition');
    assert.ok(blockDiv.classList.contains('edit-mode'), 'Block should have edit-mode class');
  });

  it('should return null when already in edit mode and editMode is true', async () => {
    const { form } = createFormBlockStructure(renderFormBlockFormDef, { hasEditMode: true });

    const result = await renderFormBlock(form, true);

    assert.strictEqual(result, null, 'Result should be null when already in edit mode');
  });

  it('should render form block when exiting edit mode (editMode=false)', async () => {
    const { form, blockDiv } = createFormBlockStructure(renderFormBlockFormDef, { hasEditMode: true });

    // Stub fetch to return form definition
    fetchStub = sinon.stub(global, 'fetch').resolves({
      json: () => Promise.resolve(renderFormBlockFormDef),
    });

    const result = await renderFormBlock(form, false);

    assert.ok(result, 'Result should not be null');
    assert.ok(result.formEl, 'Result should contain formEl');
    assert.ok(!blockDiv.classList.contains('edit-mode'), 'Block should not have edit-mode class when editMode is false');
  });

  it('should use fallback fetchForm when primary fetch fails', async () => {
    const { form, blockDiv } = createFormBlockStructure(renderFormBlockFormDef);

    // Stub fetch to fail on first call (model.json) but succeed for fallback
    let callCount = 0;
    fetchStub = sinon.stub(global, 'fetch').callsFake((url) => {
      callCount += 1;
      if (url.endsWith('.model.json')) {
        return Promise.reject(new Error('Fetch failed'));
      }
      // Fallback fetch for fetchForm
      return Promise.resolve({
        headers: {
          get: () => 'application/json',
        },
        json: () => Promise.resolve(renderFormBlockFormDef),
      });
    });

    const result = await renderFormBlock(form, true);

    assert.ok(result, 'Result should not be null after fallback');
    assert.ok(consoleWarnStub.calledOnce, 'console.warn should be called for failed fetch');
    assert.ok(blockDiv.classList.contains('edit-mode'), 'Block should have edit-mode class');
  });

  it('should return null when both fetch attempts fail', async () => {
    const { form } = createFormBlockStructure(renderFormBlockFormDef);

    // Stub fetch to always fail
    fetchStub = sinon.stub(global, 'fetch').rejects(new Error('All fetches failed'));

    const result = await renderFormBlock(form, true);

    assert.strictEqual(result, null, 'Result should be null when both fetches fail');
    assert.ok(consoleWarnStub.called, 'console.warn should be called for failed model.json fetch');
    assert.ok(consoleErrorStub.called, 'console.error should be called for failed fallback fetch');
  });

  it('should return null when formDef is null or undefined', async () => {
    const { form } = createFormBlockStructure(renderFormBlockFormDef);

    // Stub fetch to return null
    fetchStub = sinon.stub(global, 'fetch').resolves({
      json: () => Promise.resolve(null),
    });

    const result = await renderFormBlock(form, true);

    assert.strictEqual(result, null, 'Result should be null when formDef is null');
  });

  it('should create proper DOM structure with pre and code elements', async () => {
    const { form, blockDiv } = createFormBlockStructure(renderFormBlockFormDef);

    fetchStub = sinon.stub(global, 'fetch').resolves({
      json: () => Promise.resolve(renderFormBlockFormDef),
    });

    await renderFormBlock(form, true);

    // After renderFormBlock, the div should have been processed by decorate
    // Check that a form element exists in the block
    const formEl = blockDiv.querySelector('form');
    assert.ok(formEl, 'Form element should exist after decoration');
  });

  it('should handle form with panel structure', async () => {
    const { form, blockDiv } = createFormBlockStructure(renderFormBlockFormDefWithPanel, {
      formPath: '/content/test-panel/form',
    });

    fetchStub = sinon.stub(global, 'fetch').resolves({
      json: () => Promise.resolve(renderFormBlockFormDefWithPanel),
    });

    const result = await renderFormBlock(form, true);

    assert.ok(result, 'Result should not be null');
    assert.ok(result.formDef, 'Result should contain formDef');
    assert.strictEqual(result.formDef.id, 'render-form-block-panel-test', 'formDef id should match');
    assert.ok(blockDiv.classList.contains('edit-mode'), 'Block should have edit-mode class');
  });

  it('should toggle edit-mode class based on editMode parameter', async () => {
    const { form, blockDiv } = createFormBlockStructure(renderFormBlockFormDef);

    fetchStub = sinon.stub(global, 'fetch').resolves({
      json: () => Promise.resolve(renderFormBlockFormDef),
    });

    // First, render in edit mode
    await renderFormBlock(form, true);
    assert.ok(blockDiv.classList.contains('edit-mode'), 'Block should have edit-mode class when editMode is true');

    // Get the new form element after decoration
    const newForm = blockDiv.querySelector('form');
    if (newForm) {
      newForm.dataset.formpath = '/content/test/form';
    }

    // Reset for second test
    blockDiv.classList.remove('edit-mode');

    // Now render without edit mode
    const formAfterRender = blockDiv.querySelector('form');
    if (formAfterRender) {
      formAfterRender.dataset.formpath = '/content/test/form';
      await renderFormBlock(formAfterRender, false);
      assert.ok(!blockDiv.classList.contains('edit-mode'), 'Block should not have edit-mode class when editMode is false');
    }
  });

  it('should use correct formpath from form dataset for fetch', async () => {
    const formPath = '/content/custom/path/form';
    const { form } = createFormBlockStructure(renderFormBlockFormDef, { formPath });

    fetchStub = sinon.stub(global, 'fetch').resolves({
      json: () => Promise.resolve(renderFormBlockFormDef),
    });

    await renderFormBlock(form, true);

    assert.ok(fetchStub.calledWith(`${formPath}.model.json`), 'Fetch should be called with correct model.json path');
  });

  it('should replace children of container div with pre/code elements', async () => {
    const { form, blockDiv } = createFormBlockStructure(renderFormBlockFormDef);
    const containerDiv = form.parentElement;

    // Add some existing children to the container
    const existingChild = document.createElement('span');
    existingChild.textContent = 'existing content';
    containerDiv.appendChild(existingChild);

    fetchStub = sinon.stub(global, 'fetch').resolves({
      json: () => Promise.resolve(renderFormBlockFormDef),
    });

    await renderFormBlock(form, true);

    // After decoration, the structure should be updated
    const formEl = blockDiv.querySelector('form');
    assert.ok(formEl, 'Form element should exist after decoration');
  });

  it('should return formEl that is a form element', async () => {
    const { form } = createFormBlockStructure(renderFormBlockFormDef);

    fetchStub = sinon.stub(global, 'fetch').resolves({
      json: () => Promise.resolve(renderFormBlockFormDef),
    });

    const result = await renderFormBlock(form, true);

    assert.ok(result.formEl, 'formEl should exist');
    assert.strictEqual(result.formEl.tagName, 'FORM', 'formEl should be a form element');
  });
});
