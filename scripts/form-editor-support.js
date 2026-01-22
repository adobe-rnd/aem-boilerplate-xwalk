/** ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.

 * Adobe permits you to use and modify this file solely in accordance with
 * the terms of the Adobe license agreement accompanying it.
 ************************************************************************ */
import decorate, { generateFormRendition, fetchForm } from '../blocks/form/form.js';
import { loadCSS } from './aem.js';
import { handleAccordionNavigation } from '../blocks/form/components/accordion/accordion.js';
import { createButton as createRepeatButton } from '../blocks/form/components/repeat/repeat.js';

window.currentMode = 'preview';
let activeWizardStep;
let activeAccordionPanel;
const OOTBViewTypeComponentsWithoutModel = ['wizard', 'toggleable-link', 'modal'];

export function getItems(container) {
  if (container[':itemsOrder'] && container[':items']) {
    return container[':itemsOrder'].map((itemKey) => container[':items'][itemKey]);
  }
  return [];
}

export function getFieldById(panel, id, formFieldMap) {
  let field;

  if (panel.id === id) {
    field = panel;
  } else if (formFieldMap[id]) {
    field = formFieldMap[id];
  } else {
    const items = getItems(panel);
    items.forEach((item) => {
      formFieldMap[item.id] = item;
      if (item.id === id) {
        field = item;
      } else if (item.fieldType === 'panel') {
        field = getFieldById(item, id, formFieldMap);
      }
    });
  }
  return field;
}

export function handleWizardNavigation(wizardEl, navigateTo) {
  const existingSelectedEl = wizardEl.querySelector('.current-wizard-step');
  existingSelectedEl.classList.remove('current-wizard-step');
  navigateTo.classList.add('current-wizard-step');
  activeWizardStep = navigateTo.dataset.id;
  const navigateToMenuItem = wizardEl.querySelector(`li[data-index="${navigateTo.dataset.index}"]`);
  const currentMenuItem = wizardEl.querySelector('.wizard-menu-active-item');
  currentMenuItem.classList.remove('wizard-menu-active-item');
  navigateToMenuItem.classList.add('wizard-menu-active-item');
}

function handleAccordionNavigationInEditor(accordionEl, navigateTo) {
  handleAccordionNavigation(accordionEl, navigateTo, true);
  activeAccordionPanel = navigateTo.dataset.id;
}

function annotateFormFragment(fragmentFieldWrapper, fragmentDefinition) {
  if (!fragmentFieldWrapper || !fragmentDefinition || !fragmentDefinition.properties) {
    console.warn('Invalid arguments passed to annotateFormFragment');
    return;
  }
  if (!fragmentDefinition.properties['fd:path']) {
    console.warn('Missing fd:path in fragmentDefinition properties');
    return;
  }
  fragmentFieldWrapper.classList.add('fragment-wrapper', 'edit-mode');
  fragmentFieldWrapper.setAttribute('data-aue-type', 'component');
  fragmentFieldWrapper.setAttribute('data-aue-resource', `urn:aemconnection:${fragmentDefinition.properties['fd:path']}`);
  fragmentFieldWrapper.setAttribute('data-aue-model', 'form-fragment');
  fragmentFieldWrapper.setAttribute('data-aue-label', fragmentDefinition.label?.value || fragmentDefinition.name);
}

function getPropertyModel(fd) {
  if (!fd[':type'] || fd[':type'].startsWith('core/fd/components') || OOTBViewTypeComponentsWithoutModel.includes(fd[':type'])) {
    return fd.fieldType === 'image' || fd.fieldType === 'button' ? `form-${fd.fieldType}` : fd.fieldType;
  }
  return fd[':type'];
}

function annotateContainer(fieldWrapper, fd) {
  fieldWrapper.setAttribute('data-aue-resource', `urn:aemconnection:${fd.properties['fd:path']}`);
  fieldWrapper.setAttribute('data-aue-model', getPropertyModel(fd));
  fieldWrapper.setAttribute('data-aue-label', fd.label?.value || fd.name);
  fieldWrapper.setAttribute('data-aue-type', 'container');
  fieldWrapper.setAttribute('data-aue-behavior', 'component');
  fieldWrapper.setAttribute('data-aue-filter', 'form');
}

function annotateRepeatablePanel(fieldWrapper) {
  const hasAddButton = fieldWrapper.querySelector('.repeat-actions .item-add');
  const hasRemoveButton = fieldWrapper.querySelector('.item-remove');

  if (!hasAddButton) {
    let repeatActions = fieldWrapper.querySelector('.repeat-actions');
    if (!repeatActions) {
      repeatActions = document.createElement('div');
      repeatActions.className = 'repeat-actions';
      const legend = fieldWrapper.querySelector('legend');
      if (legend) {
        legend.insertAdjacentElement('afterend', repeatActions);
      } else {
        fieldWrapper.insertAdjacentElement('afterbegin', repeatActions);
      }
    }
    const addButton = createRepeatButton('Add', 'add');
    repeatActions.appendChild(addButton);
  }

  if (!hasRemoveButton) {
    const removeButton = createRepeatButton('Delete', 'remove');
    fieldWrapper.appendChild(removeButton);
  }
}

export function getContainerChildNodes(container, fd) {
  if (fd[':type'] === 'modal') {
    return container.querySelector('.modal-content')?.childNodes;
  }
  return container.childNodes;
}

function annotateItems(items, formDefinition, formFieldMap) {
  try {
    for (let i = items.length - 1; i >= 0; i -= 1) {
      const fieldWrapper = items[i];
      if (fieldWrapper.classList?.contains('field-wrapper')) {
        const { id } = fieldWrapper.dataset;
        const fd = getFieldById(formDefinition, id, formFieldMap);
        if (fd && fd.properties) {
          if (fd.fieldType === 'plain-text') {
            fieldWrapper.setAttribute('data-aue-type', 'richtext');
            fieldWrapper.setAttribute('data-aue-behavior', 'component');
            fieldWrapper.setAttribute('data-aue-resource', `urn:aemconnection:${fd.properties['fd:path']}`);
            fieldWrapper.setAttribute('data-aue-model', getPropertyModel(fd));
            fieldWrapper.setAttribute('data-aue-label', 'Text');
            fieldWrapper.setAttribute('data-aue-prop', 'value');
          } else if (fd.fieldType === 'panel') {
            if (fd.properties['fd:fragment']) {
              annotateFormFragment(fieldWrapper, fd);
            } else {
              annotateContainer(fieldWrapper, fd);
              if (fd.repeatable === true) {
                annotateRepeatablePanel(fieldWrapper);
              }
              annotateItems(getContainerChildNodes(fieldWrapper, fd), formDefinition, formFieldMap);
              // retain wizard step selection
              if (activeWizardStep === fieldWrapper.dataset.id) {
                handleWizardNavigation(fieldWrapper.parentElement, fieldWrapper);
              }
              /* Check if this panel is in an accordion
                and should be expanded in authoring after a change */
              if (activeAccordionPanel === fieldWrapper.dataset.id && fieldWrapper.parentElement.classList.contains('accordion')) {
                handleAccordionNavigationInEditor(fieldWrapper.parentElement, fieldWrapper);
              }
            }
          } else {
            fieldWrapper.setAttribute('data-aue-type', 'component');
            fieldWrapper.setAttribute('data-aue-resource', `urn:aemconnection:${fd.properties['fd:path']}`);
            fieldWrapper.setAttribute('data-aue-model', getPropertyModel(fd));
            fieldWrapper.setAttribute('data-aue-label', fd.label?.value || fd.name);
          }
        } else {
          console.warn(`field ${id} not found in form definition`);
        }
      }
    }
  } catch (error) {
    console.error('Error while annotating form elements', error);
    window.alert('Error while annotating form elements');
  }
}

export function annotateFormForEditing(formEl, formDefinition) {
  if (document.documentElement.classList.contains('adobe-ue-edit')) {
    const block = formEl.closest('.block[data-aue-resource]');
    if (block) {
      block.setAttribute('data-aue-filter', 'form');
    }
    formEl.classList.add('edit-mode');
  }
  const formFieldMap = {};
  annotateItems(formEl.childNodes, formDefinition, formFieldMap);
}

function handleNavigation(container, resource, navigationHandler) {
  const el = container.querySelector(`[data-aue-resource='${resource}']`);
  if (!el) return;
  if (el.parentElement === container) {
    navigationHandler(container, el);
  } else {
    const directChild = Array.from(container.children)
      .find((child) => child.contains(el) || child === el);
    if (directChild) {
      navigationHandler(container, directChild);
    }
  }
}

/**
 * Event listener for aue:ui-select, selection of a component
 */
export function handleEditorSelect(event) {
  const { target, detail } = event;
  const { selected, resource } = detail;

  // Handle fragment expansion when selected
  if (target.classList.contains('fragment-wrapper') && target.classList.contains('edit-mode')) {
    target.classList.toggle('fragment-expanded', selected);
  }

  if (selected && target.closest('.wizard') && !target.classList.contains('wizard')) {
    handleNavigation(target.closest('.wizard'), resource, handleWizardNavigation);
  }
  if (selected && target.closest('.accordion')) {
    handleNavigation(target.closest('.accordion'), resource, handleAccordionNavigationInEditor);
  }
}

export async function renderFormBlock(form, editMode) {
  const block = form.closest('.block[data-aue-resource]');
  if ((editMode && !block.classList.contains('edit-mode')) || !editMode) {
    block.classList.toggle('edit-mode', editMode);
    const div = form.parentElement;
    let formDef;
    try {
      const formDefResp = await fetch(`${form.dataset.formpath}.model.json`);
      formDef = await formDefResp.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch form model json:', error);
      try {
        formDef = await fetchForm(document.location.pathname);
      } catch (fallbackError) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch fallback form definition:', fallbackError);
        return null;
      }
    }

    if (!formDef) {
      return null;
    }

    div.replaceChildren();
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = JSON.stringify(formDef);
    pre.appendChild(code);
    div.appendChild(pre);
    await decorate(block);
    return {
      formEl: block.querySelector('form'),
      formDef,
    };
  }
  return null;
}

async function annotateFormsForEditing(forms) {
  if (typeof window.currentMode !== 'undefined' && window.currentMode === 'preview') return;
  forms.forEach(async (form) => {
    const { formEl, formDef } = (await renderFormBlock(form, true)) || {};
    if (formEl && formDef) {
      annotateFormForEditing(formEl, formDef);
    }
  });
}

async function instrumentForms(mutationsList) {
  const formsEl = [];
  mutationsList.forEach((mutation) => {
    // Check if the mutation type is 'childList' and if nodes are added
    if (mutation.type === 'childList' && mutation.addedNodes.length) {
      mutation.addedNodes.forEach((node) => {
        // Check if the added node is a form element
        if (node.nodeName.toLowerCase() === 'form') {
          formsEl.push(node);
        }
      });
    }
  });
  annotateFormsForEditing(formsEl);
}

function cleanUp(content) {
  const formDef = content.replaceAll('^(([^<>()\\\\[\\\\]\\\\\\\\.,;:\\\\s@\\"]+(\\\\.[^<>()\\\\[\\\\]\\\\\\\\.,;:\\\\s@\\"]+)*)|(\\".+\\"))@((\\\\[[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}])|(([a-zA-Z\\\\-0-9]+\\\\.)\\+[a-zA-Z]{2,}))$', '');
  return formDef?.replace(/\x83\n|\n|\s\s+/g, '');
}

function decode(rawContent) {
  const content = rawContent.trim();
  if (content.startsWith('"') && content.endsWith('"')) {
    // In the new 'jsonString' context, Server side code comes as a string with escaped characters,
    // hence the double parse
    return JSON.parse(JSON.parse(content));
  }
  return JSON.parse(cleanUp(content));
}

export async function applyChanges(event) {
  // redecorate default content and blocks on patches (in the properties rail)
  const { detail } = event;

  const resource = detail?.request?.target?.resource // update, patch components
    || detail?.request?.target?.container?.resource // update, patch, add to sections
    || detail?.request?.to?.container?.resource; // move in sections
  if (!resource) return false;
  const updates = detail?.response?.updates;
  if (!updates.length) return false;
  const { content } = updates[0];
  if (!content) return false;

  const parsedUpdate = new DOMParser().parseFromString(content, 'text/html');
  let element = document.querySelector(`[data-aue-resource="${resource}"]`);

  if (element) {
    const block = element.parentElement?.closest('.block[data-aue-resource]') || element?.closest('.block[data-aue-resource]');
    if (block) {
      const blockResource = block.getAttribute('data-aue-resource');
      const newBlock = parsedUpdate.querySelector(`[data-aue-resource="${blockResource}"]`);
      if (block.dataset.aueModel === 'form') {
        const newContainer = newBlock.querySelector('pre');
        const codeEl = newContainer?.querySelector('code');
        const jsonContent = codeEl?.textContent;
        if (jsonContent) {
          const formDef = decode(jsonContent);
          if (element.classList.contains('panel-wrapper')) {
            element = element.parentNode;
          }
          const parent = element.closest('.panel-wrapper') || element.closest('form') || element.querySelector('form');
          const parentDef = getFieldById(formDef, parent.dataset.id, {});
          parent.replaceChildren();
          if (parent.hasAttribute('data-component-status')) {
            parent.removeAttribute('data-component-status');
          }
          await generateFormRendition(parentDef, parent, formDef?.id, getItems);
          annotateItems(getContainerChildNodes(parent, parentDef), formDef, {});
          return true;
        }
        return false;
      }
    }
  }
  return true;
}

export function attachEventListners(main) {
  [
    'aue:content-patch',
    'aue:content-update',
    'aue:content-add',
    'aue:content-move',
    'aue:content-remove',
  ].forEach((eventType) => main?.addEventListener(eventType, async (event) => {
    event.stopPropagation();
    const applied = await applyChanges(event);
    if (!applied) window.location.reload();
  }));

  main?.addEventListener('aue:ui-select', handleEditorSelect);

  document.body.addEventListener('aue:ui-preview', () => {
    window.currentMode = 'preview';
    const forms = document.querySelectorAll('form');
    forms.forEach(async (form) => {
      await renderFormBlock(form, false);
    });
  });

  const ueEditModeHandler = () => {
    window.currentMode = 'edit';
    const forms = document.querySelectorAll('form');
    annotateFormsForEditing(forms);
  };

  if (document.documentElement.classList.contains('adobe-ue-edit')) {
    ueEditModeHandler();
  }
  document.body.addEventListener('aue:ui-edit', ueEditModeHandler);
}

const observer = new MutationObserver(instrumentForms);
observer.observe(document, { childList: true, subtree: true, attributeFilter: ['form'] });
loadCSS(`${window.hlx.codeBasePath}/scripts/form-editor-support.css`);
