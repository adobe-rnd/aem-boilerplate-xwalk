/* eslint-env mocha */
import assert from 'assert';
import path from 'path';
import fs from 'fs';
import {
  annotateFormForEditing, getItems, getFieldById, applyChanges, handleWizardNavigation,
  getContainerChildNodes,
} from '../../scripts/form-editor-support.js';
import { generateFormRendition } from '../../blocks/form/form.js';
import { ueFormDef } from './forms/universaleditorform.js';
import { ueAddEvent } from './fixtures/ue/events/event-add.js';
import { ueAddEventForWizardNavigation } from './fixtures/ue/events/event-add-wizardnavigation.js';
import { uePatchEvent } from './fixtures/ue/events/event-patch.js';
import { uePatchTitleEvent } from './fixtures/ue/events/event-patch-title.js';
import { uePatchEmptyTitleEvent } from './fixtures/ue/events/event-patch-empty-title.js';
import { ueFormDefForAddTest } from './fixtures/ue/events/formdefinition-add.js';
import { ueFormDefForPatchTest } from './fixtures/ue/events/formdefinition-patch.js';
import { ueFormDefForPatchTitleTest } from './fixtures/ue/events/formdefinition-patch-title.js';
import { ueFormDefForPatchEmptyTitleTest } from './fixtures/ue/events/formdefinition-patch-empty-title.js';
import { ueFormDefForWizardNavigationTest } from './fixtures/ue/events/formdefinition-wizardnavigation.js';
import { renderForm } from './testUtils.js';
import { ueFormDefForAccordionNavigationTest } from './fixtures/ue/events/formdefinition-accordion-navigation.js';
import { handleAccordionNavigation } from '../../blocks/form/components/accordion/accordion.js';
import { ueFormDefForRepeatablePanelTest } from './fixtures/ue/events/formdefinition-repeatable-panel.js';
import { uePatchEventForRepeatablePanel } from './fixtures/ue/events/event-patch-repeatable-panel.js';
import { handleEditorSelect } from '../../scripts/form-editor-support.js';

describe('Universal Editor Authoring Test Cases', () => {

  beforeEach(async () => {
    document.body.innerHTML = '';
  });

  it('test UE patch event', async () => {
    await renderForm(ueFormDefForPatchTest);
    window.hlx.codeBasePath = '../../';
    const applied = await applyChanges({ detail: uePatchEvent });
    assert.equal(applied, true);
    const formEl = document.querySelector('form');
    assert.equal(formEl.childNodes.length, 1); // only 1 panel is there
    const panel = formEl.querySelector('.panel-wrapper');
    // 1 legend + wizard menu item + panel + wizard button wrapper
    assert.equal(panel.childNodes.length, 4);
    const labelEl = panel.querySelector('legend[for="panelcontainer-215d71f184"]');
    assert.equal(labelEl.textContent, 'Panel new');
    const wizardMenuItems = panel.querySelectorAll('.wizard-menu-item');
    assert.equal(wizardMenuItems.length, 1);
    document.body.replaceChildren();
  });

  it('test form annotation for UE', async () => {
    document.documentElement.classList.add('adobe-ue-edit');
    const formEl = document.createElement('form');
    window.hlx.codeBasePath = '../../';
    await generateFormRendition(ueFormDef, formEl, getItems);

    annotateFormForEditing(formEl, ueFormDef);

    assert.equal(formEl.classList.contains('edit-mode'), true, 'form is not having edit-mode class');

    const formFieldMap = {};

    function testAnnotation(node, fd, auetype, auemodel) {
      assert.equal(node.dataset.aueType, auetype, `data-aue-type not set ${fd.id}`);
      assert.equal(node.dataset.aueResource, `urn:aemconnection:${fd.properties['fd:path']}`, `data-aue-resource not set ${fd.id}`);
      assert.equal(node.dataset.aueModel, auemodel, `data-aue-model not set ${fd.id}`);
      assert.equal(node.dataset.aueLabel, fd.label.value, `data-aue-label not set ${fd.id}`);
      if (auetype === 'container') {
        assert.equal(node.dataset.aueFilter, 'form');
      }
    }

    function testPlainTextAnnotation(node, fd, auetype, auemodel) {
      assert.equal(node.dataset.aueType, auetype, `data-aue-type not set ${fd.id}`);
      assert.equal(node.dataset.aueResource, `urn:aemconnection:${fd.properties['fd:path']}`, `data-aue-resource not set ${fd.id}`);
      assert.equal(node.dataset.aueModel, auemodel, `data-aue-model not set ${fd.id}`);
      assert.equal(node.dataset.aueLabel, 'Text');
      assert.equal(node.dataset.aueProp, 'value');
      assert.equal(node.dataset.aueBehavior, 'component');
    }

    function testChildren(items, formDef, fieldMap) {
      items.forEach((node) => {
        if (node.classList.contains('field-wrapper')) {
          const fd = getFieldById(ueFormDef, node.dataset.id, formFieldMap);
          if (node.classList.contains('panel-wrapper') && !fd.properties['fd:fragment']) {
            if (fd[':type'] === 'wizard') {
              testAnnotation(node, fd, 'container', fd[':type']);
            } else {
              testAnnotation(node, fd, 'container', fd.fieldType);
            }
            testChildren(getContainerChildNodes(node, fd), formDef, fieldMap);
          } else if (fd.properties['fd:fragment'] && node.classList.contains('edit-mode')) {
            testAnnotation(node, fd, 'component', 'form-fragment');
            
            // Test fragment wrapper classes and structure
            assert.equal(node.classList.contains('fragment-wrapper'), true, 'Fragment should have fragment-wrapper class');
            assert.equal(node.classList.contains('edit-mode'), true, 'Fragment should have edit-mode class');
            
            if (Object.keys(fd[':items']).length === 0) {
              // Empty fragment - should match selector for "Adaptive Form Fragment" text
              assert.equal(node.matches('.fragment-wrapper.edit-mode:not(:has(> :not(legend)))'), true, 'Empty fragment should match selector for "Adaptive Form Fragment" text');
            } else {
              // Non-empty fragment - should match selector for "CLICK TO EXPAND" text
              assert.equal(node.matches('.fragment-wrapper.edit-mode:has(> :not(legend))'), true, 'Non-empty fragment should match selector for expand text');
              
              // Test expansion behavior
              handleEditorSelect({
                target: node,
                detail: {
                  selected: true,
                  resource: `urn:aemconnection:${fd.properties['fd:path']}`
                }
              });
              assert.equal(node.classList.contains('fragment-expanded'), true, 'Fragment should get expanded class on selection');
            }
          } else if (fd.fieldType === 'plain-text') {
            testPlainTextAnnotation(node, fd, 'richtext', fd.fieldType);
          } else if (fd[':type'] === 'rating') {
            testAnnotation(node, fd, 'component', fd[':type']);
          } else if (!fd.properties['fd:fragment']) {
            testAnnotation(node, fd, 'component', fd.fieldType);
          }
        }
      });
    }
    testChildren(formEl.childNodes, ueFormDef, formFieldMap);
  });

  // Skipping for now, as tests do not run pre-commit scripts, that sort the components in order
  it.skip('test form component definitions for UE', async () => {
    const definitionFilePath = path.resolve('component-definition.json');
    const modelsFilePath = path.resolve('component-models.json');
    const filtersFilePath = path.resolve('component-filters.json');
    const componentDefinitions = fs.readFileSync(definitionFilePath, 'utf8');
    const componentModels = fs.readFileSync(modelsFilePath, 'utf8');
    const filters = fs.readFileSync(filtersFilePath, 'utf8');

    const isSorted = (arr) => {
      const arrCopy = [...arr];
      arrCopy.sort();
      return JSON.stringify(arr) === JSON.stringify(arrCopy);
    };

    try {
      const definition = JSON.parse(componentDefinitions);
      const componentModelsArray = JSON.parse(componentModels);
      const filtersArray = JSON.parse(filters);
      const { components: formComponents } = filtersArray.find((filter) => filter.id === 'form');
      const idsArray = componentModelsArray.map((component) => component.id);

      if (!isSorted(formComponents, 'id')) {
        throw new Error('components in component-filters.json are not sorted in alphabetical order');
      }

      if (definition) {
        definition?.groups.forEach((group) => {
          if (group.id === 'form-general') {
            if (!isSorted(group.components.map((component) => component.title))) {
              throw new Error(`components in component-definition.json are not sorted in alphabetical order in ${group.id}`);
            }
            group.components.forEach((component) => {
              const cmpId = component.id;
              if (!formComponents.includes(cmpId)) {
                throw new Error(`component not present in filter ${component.id}`);
              }
              const { fieldType } = component.plugins.xwalk.page.template;
              let cmpIdfromFieldType = fieldType;
              if (fieldType === 'image' || fieldType === 'button') {
                cmpIdfromFieldType = `form-${fieldType}`;
              } else if (cmpId === 'form-fragment') {
                cmpIdfromFieldType = 'form-fragment';
              }
              if (!idsArray.includes(cmpIdfromFieldType)) {
                throw new Error(`component model not found for component ${component.id}`);
              }
            });
          }
        });
      }
    } catch (err) {
      assert.equal(true, false, err);
    }
  });

  it('test UE add event', async () => {
    await renderForm(ueFormDefForAddTest);
    window.hlx.codeBasePath = '../../';
    const applied = await applyChanges({ detail: ueAddEvent });
    assert.equal(applied, true);
    const formEl = document.querySelector('form');
    assert.equal(formEl.childNodes.length, 1); // only 1 panel is there
    const panel = formEl.querySelector('.panel-wrapper');
    // 1 legend + wizard menu item + panel + wizard button wrapper
    assert.equal(panel.childNodes.length, 4);
    document.body.replaceChildren();
  });

  it('test UE patch event for panel title', async () => {
    window.hlx.codeBasePath = '../../';
    await renderForm(ueFormDefForPatchTitleTest);
    const applied = await applyChanges({ detail: uePatchTitleEvent });
    assert.equal(applied, true);
    const formEl = document.querySelector('form');
    assert.equal(formEl.childNodes.length, 1); // only 1 panel is there
    const panel = formEl.querySelector('.panel-wrapper');
    // 1 legend + panel
    assert.equal(panel.childNodes.length, 2);
    const labelEl = panel.querySelector('legend[for="panelcontainer-5012648f84"]');
    assert.equal(labelEl.textContent, 'Panel');
    const textInputElLabel = panel.querySelector('label[for="textinput-3eb2e7d0b6"]');
    assert.equal(textInputElLabel.textContent, 'Text Input new');
    document.body.replaceChildren();
  });

  it('test UE patch event for panel empty title', async () => {
    await renderForm(ueFormDefForPatchEmptyTitleTest);
    window.hlx.codeBasePath = '../../';
    const applied = await applyChanges({ detail: uePatchEmptyTitleEvent });
    assert.equal(applied, true);
    const formEl = document.querySelector('form');
    assert.equal(formEl.childNodes.length, 1); // only 1 panel is there
    const panel = formEl.querySelector('.panel-wrapper');
    // only 1 text-input (no panel legend)
    assert.equal(panel.childNodes.length, 1);
    const labelEl = panel.querySelector('legend[for="panelcontainer-5012648f84"]');
    assert.equal(labelEl == null, true);
    const textInputElLabel = panel.querySelector('label[for="textinput-3eb2e7d0b6"]');
    assert.equal(textInputElLabel.textContent, 'Text Input new');
    document.body.replaceChildren();
  });

  it('test UE wizard navigation on add', async () => {
    window.hlx.codeBasePath = '../../';
    await renderForm(ueFormDefForWizardNavigationTest);
    const formElPrev = document.querySelector('form');
    handleWizardNavigation(formElPrev.querySelector('.wizard'), formElPrev.querySelector('fieldset[data-id="panelcontainer-6a979252b1"]'));
    const applied = await applyChanges({ detail: ueAddEventForWizardNavigation });
    assert.equal(applied, true);
    const formEl = document.querySelector('form');
    const currentActiveStep = formEl.querySelector('.current-wizard-step');
    assert.equal(currentActiveStep.dataset.id, 'panelcontainer-6a979252b1');
    const currentActiveMenuItem = currentActiveStep.parentElement.querySelector(`li[data-index="${currentActiveStep.dataset.index}"]`);
    // assert.equal(currentActiveMenuItem.classList.contains('wizard-menu-active-item'), true); // TODO: fix mutation observer for test cases
    document.body.replaceChildren();
  });

  it('test UE accordion navigation', async () => {
    await renderForm(ueFormDefForAccordionNavigationTest);
    const formElPrev = document.querySelector('form');
    let secondTab = formElPrev.querySelector('fieldset[data-id="panelcontainer-d5a2c8d340"]');
    let firstTab = formElPrev.querySelector('fieldset[data-id="panelcontainer-c49bd83fb9"]');
    assert.equal(firstTab.classList.contains('accordion-collapse'), false); // first tab open by default
    handleAccordionNavigation(formElPrev.querySelector('.accordion'), secondTab, true); // trigger second tab open
    assert.equal(secondTab.classList.contains('accordion-collapse'), false); // should be open
    assert.equal(firstTab.classList.contains('accordion-collapse'), false); 
    handleAccordionNavigation(formElPrev.querySelector('.accordion'), firstTab, true);
    assert.equal(firstTab.classList.contains('accordion-collapse'), false); // should also be open (not toggle case)
    document.body.replaceChildren();
  });

  it('test UE repeatable panel buttons', async () => {
    window.hlx.codeBasePath = '../../';
    await renderForm(ueFormDefForRepeatablePanelTest);
    const formEl = document.querySelector('form');
    const panel = formEl.querySelector('.panel-wrapper');

    // Verify panel is marked as repeatable
    assert.equal(panel.dataset.repeatable, 'true');

    // Verify add button exists with correct label
    const addButton = panel.querySelector('.repeat-actions .item-add');
    assert.ok(addButton, 'Add button should exist');
    assert.equal(addButton.querySelector('span').textContent, 'Add');

    // Verify remove button exists with correct label
    const removeButton = panel.querySelector('.item-remove');
    assert.ok(removeButton, 'Remove button should exist');
    assert.equal(removeButton.querySelector('span').textContent, 'Delete');

    // Verify panel index is set
    assert.equal(panel.dataset.index, '0');

    document.body.replaceChildren();
  });

  it('test UE patch event for repeatable panel buttons', async () => {
    window.hlx.codeBasePath = '../../';
    await renderForm(ueFormDefForRepeatablePanelTest);
    const applied = await applyChanges({ detail: uePatchEventForRepeatablePanel });
    assert.equal(applied, true);
    const formEl = document.querySelector('form');
    const panel = formEl.querySelector('.panel-wrapper');
    // Verify panel is still marked as repeatable
    assert.equal(panel.dataset.repeatable, 'true');
    assert.equal(panel.dataset.variant, 'addDeleteButtons');
    // Verify add button exists with updated label
    const addButton = panel.querySelector('.repeat-actions .item-add');
    assert.ok(addButton, 'Add button should exist');
    assert.equal(addButton.querySelector('span').textContent, 'Add New');
    document.body.replaceChildren();
  });

  it('test UE wizard navigation with nested panels', async () => {
    window.hlx.codeBasePath = '../../';
    await renderForm(ueFormDefForWizardNavigationTest);
    const formEl = document.querySelector('form');
    const wizardEl = formEl.querySelector('.wizard');
    
    // Find the nested panel element in the rendered HTML
    const nestedPanel = formEl.querySelector('[data-id="panelcontainer-nested"]');
    assert.ok(nestedPanel, 'Nested panel should exist');
    
    // Set up the event with the actual nested panel element
    const ueSelectNestedPanelEvent = {
      target: nestedPanel,
      detail: {
        selected: true,
        resource: 'urn:aemconnection:/content/ng-test1/index/jcr:content/root/section_0/form/panelcontainer_1310348320/panelcontainer/nested_panel',
      },
    };
    
    // Test that selecting the nested panel navigates to its parent panel
    handleEditorSelect(ueSelectNestedPanelEvent);
    
    // Verify that the parent panel is the current step, not the nested panel
    const currentStep = wizardEl.querySelector('.current-wizard-step');
    assert.equal(currentStep.dataset.id, 'panelcontainer-4a4625c3cf', 'Should navigate to parent panel, not nested panel');
    assert.equal(currentStep.querySelector('legend').textContent, 'Panel', 'Should show parent panel title');
    
    document.body.replaceChildren();
  });
});
