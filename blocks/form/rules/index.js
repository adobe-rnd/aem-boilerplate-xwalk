/* eslint-disable one-var */
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
import { submitSuccess, submitFailure } from '../submit.js';
import {
  createHelpText,
  createLabel,
  updateOrCreateInvalidMsg,
  getCheckboxGroupValue,
  createDropdownUsingEnum,
  createRadioOrCheckboxUsingEnum,
  fetchData,
} from '../util.js';
import registerCustomFunctions, { preloadFunctionScripts } from './functionRegistration.js';
import { LOG_LEVEL } from '../constant.js';
import { createOptimizedPicture } from '../../../scripts/aem.js';

const formSubscriptions = {};
const formModels = {};
const renderPromises = {};

function disableElement(el, value) {
  el.toggleAttribute('disabled', value === true);
  el.toggleAttribute('aria-readonly', value === true);
}

function compare(fieldVal, htmlVal, type) {
  if (type === 'number') {
    return fieldVal === Number(htmlVal);
  }
  if (type === 'boolean') {
    return fieldVal?.toString() === htmlVal;
  }
  return fieldVal === htmlVal;
}

function handleActiveChild(id, form) {
  form.querySelectorAll('[data-active="true"]').forEach((ele) => ele.removeAttribute('data-active'));
  const field = form.querySelector(`#${id}`);
  if (field) {
    field.closest('.field-wrapper').dataset.active = true;
    field.focus();
    // prevent scroll into view when user clicks on a field.
    if (document.activeElement !== field && !field.contains(document.activeElement)) {
      field.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

async function fieldChanged(payload, form, generateFormRendition) {
  const { changes, field: fieldModel } = payload;
  const {
    id, name, fieldType, ':type': componentType, readOnly, type, displayValue, displayFormat, displayValueExpression,
    activeChild, qualifiedName,
  } = fieldModel;
  const field = form.querySelector(`#${id}`);
  if (!field) {
    // Check if there's a pending render promise where qualifiedName is a substring
    if (qualifiedName) {
      const matchingKey = Object.keys(renderPromises).find((key) => qualifiedName.includes(key));
      if (matchingKey) {
        await renderPromises[matchingKey];
        // Clear the promise after it's resolved
        delete renderPromises[matchingKey];
        // Retry field changed after the render is complete
        await fieldChanged(payload, form, generateFormRendition);
      }
    }
    return;
  }
  const fieldWrapper = field?.closest('.field-wrapper');
  changes.forEach((change) => {
    const { propertyName, currentValue, prevValue } = change;
    switch (propertyName) {
      case 'required':
        if (currentValue === true) {
          fieldWrapper.dataset.required = '';
        } else {
          fieldWrapper.removeAttribute('data-required');
        }
        break;
      case 'validationMessage':
        {
          const { validity } = payload.field;
          if (field.setCustomValidity
            && (validity?.expressionMismatch || validity?.customConstraint)) {
            field.setCustomValidity(currentValue);
            updateOrCreateInvalidMsg(field, currentValue);
          }
        }
        break;
      case 'value':
        // Handle undefined currentValue to prevent "undefined" appearing in form fields
        // eslint-disable-next-line no-case-declarations
        const valueToSet = currentValue === undefined ? '' : currentValue;

        if (['number', 'date', 'text', 'email'].includes(field.type) && (displayFormat || displayValueExpression)) {
          field.setAttribute('edit-value', valueToSet);
          field.setAttribute('display-value', displayValue);
          if (document.activeElement !== field) {
            field.value = displayValue;
          }
        } else if (fieldType === 'radio-group' || fieldType === 'checkbox-group') {
          field.querySelectorAll(`input[name=${id}_${name}]`).forEach((el) => {
            const exists = (Array.isArray(valueToSet)
              && valueToSet.some((x) => compare(x, el.value, type.replace('[]', ''))))
              || compare(valueToSet, el.value, type);
            el.checked = exists;
          });
        } else if (fieldType === 'checkbox') {
          field.checked = compare(valueToSet, field.value, type);
        } else if (fieldType === 'plain-text') {
          field.innerHTML = valueToSet;
        } else if (fieldType === 'image') {
          const altText = field?.querySelector('img')?.alt || '';
          field.querySelector('picture')?.replaceWith(createOptimizedPicture(valueToSet, altText));
        } else if (field.type !== 'file') {
          field.value = valueToSet;
        }
        break;
      case 'visible':
        fieldWrapper.dataset.visible = currentValue;
        if (fieldType === 'panel' && fieldWrapper.querySelector('dialog')) {
          const dialog = fieldWrapper.querySelector('dialog');
          if (currentValue === false && dialog.open) {
            dialog.close(); // close triggers the event listener that removes the dialog overlay
          }
        }
        break;
      case 'enabled':
        // If checkboxgroup/radiogroup/drop-down is readOnly then it should remain disabled.
        if (fieldType === 'radio-group' || fieldType === 'checkbox-group') {
          if (readOnly === false) {
            field.querySelectorAll(`input[name=${id}_${name}]`).forEach((el) => {
              disableElement(el, !currentValue);
            });
          }
        } else if (fieldType === 'drop-down') {
          if (readOnly === false) {
            disableElement(field, !currentValue);
          }
        } else if (componentType === 'rating') {
          if (readOnly === false) {
            fieldWrapper.querySelector('.rating')?.classList.toggle('disabled', !currentValue);
          }
        } else {
          field.toggleAttribute('disabled', currentValue === false);
        }
        break;
      case 'readOnly':
        if (fieldType === 'radio-group' || fieldType === 'checkbox-group') {
          field.querySelectorAll(`input[name=${id}_${name}]`).forEach((el) => {
            disableElement(el, currentValue);
          });
        } else if (fieldType === 'drop-down') {
          disableElement(field, currentValue);
        } else if (componentType === 'rating') {
          fieldWrapper.querySelector('.rating')?.classList.toggle('disabled', currentValue === true);
        } else {
          field.toggleAttribute('disabled', currentValue === true);
        }
        break;
      case 'label':
        if (fieldWrapper) {
          let labelEl = fieldWrapper.querySelector('.field-label');
          if (labelEl) {
            labelEl.textContent = currentValue.value;
            labelEl.setAttribute('data-visible', currentValue.visible);
          } else if (fieldType === 'button') {
            field.textContent = currentValue.value;
          } else if (currentValue.value !== '') {
            labelEl = createLabel({
              id,
              label: currentValue,
            });
            fieldWrapper.prepend(labelEl);
          }
        }
        break;
      case 'description':
        if (fieldWrapper) {
          let descriptionEl = fieldWrapper.querySelector('.field-description');
          if (descriptionEl) {
            descriptionEl.innerHTML = currentValue;
          } else if (currentValue !== '') {
            descriptionEl = createHelpText({
              id,
              description: currentValue,
            });
            fieldWrapper.append(descriptionEl);
          }
        }
        break;
      case 'items':
        if (currentValue === null) {
          const removeId = prevValue.id;
          field?.querySelector(`#${removeId}`)?.remove();
        } else {
          const promise = generateFormRendition({ items: [currentValue] }, field?.querySelector('.repeat-wrapper'), form.dataset?.id);
          renderPromises[currentValue?.qualifiedName] = promise;
        }
        break;
      case 'activeChild': handleActiveChild(activeChild, form);
        break;
      case 'valid':
        if (currentValue === true) {
          updateOrCreateInvalidMsg(field, '');
          if (field.validity?.customError) {
            field?.setCustomValidity('');
          }
        }
        break;
      case 'enum':
      case 'enumNames':
        if (fieldType === 'radio-group' || fieldType === 'checkbox-group') {
          createRadioOrCheckboxUsingEnum(fieldModel, field);
        } else if (fieldType === 'drop-down') {
          createDropdownUsingEnum(fieldModel, field);
        }
        break;
      default:
        break;
    }
  });
}

function formChanged(payload, form) {
  const { changes } = payload;
  changes.forEach((change) => {
    const { propertyName, currentValue } = change;
    switch (propertyName) {
      case 'activeChild': handleActiveChild(currentValue?.id, form);
        break;
      default:
        break;
    }
  });
}

function handleRuleEngineEvent(e, form, generateFormRendition) {
  const { type, payload } = e;
  if (type === 'fieldChanged') {
    fieldChanged(payload, form, generateFormRendition);
  } else if (type === 'change') {
    formChanged(payload, form);
  } else if (type === 'submitSuccess') {
    submitSuccess(e, form);
  } else if (type === 'submitFailure') {
    submitFailure(e, form);
  }
}

function applyRuleEngine(htmlForm, form, captcha) {
  htmlForm.addEventListener('change', (e) => {
    const field = e.target;
    const { value, name, checked } = field;
    const { id } = field.closest('.field-wrapper').dataset;
    if ((field.type === 'checkbox' && field.dataset.fieldType === 'checkbox-group')) {
      const val = getCheckboxGroupValue(name, htmlForm);
      const el = form.getElement(id);
      el.value = val;
    } else if ((field.type === 'radio' && field.dataset.fieldType === 'radio-group')) {
      const el = form.getElement(id);
      el.value = value;
    } else if (field.type === 'checkbox') {
      form.getElement(id).value = checked ? value : field.dataset.uncheckedValue;
    } else if (field.type === 'file') {
      form.getElement(id).value = Array.from(e?.detail?.files || field.files);
    } else {
      form.getElement(id).value = value;
    }
    // console.log(JSON.stringify(form.exportData(), null, 2));
  });

  htmlForm.addEventListener('focusin', (e) => {
    const field = e.target;
    let { id } = field;
    if (['radio', 'checkbox'].includes(field?.type)) {
      id = field.closest('.field-wrapper').dataset.id;
    }
    form.getElement(id)?.focus();
  });

  htmlForm.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON') {
      const element = form.getElement(e.target.id);
      if (e.target.type === 'submit' && captcha) {
        const token = await captcha.getToken();
        form.getElement(captcha.id).value = token;
      }
      if (element) {
        element.dispatch({ type: 'click' });
      }
    }
  });
}

export async function loadRuleEngine(formDef, htmlForm, captcha, genFormRendition, data) {
  const ruleEngine = await import('./model/afb-runtime.js');
  const form = ruleEngine.restoreFormInstance(formDef, data, { logLevel: LOG_LEVEL });
  window.myForm = form;
  formModels[htmlForm.dataset?.id] = form;
  const subscriptions = formSubscriptions[htmlForm.dataset?.id];
  subscriptions?.forEach((subscription, id) => {
    const { callback, fieldDiv } = subscription;
    const model = form.getElement(id);
    callback(fieldDiv, model, 'register');
  });

  form.subscribe((e) => {
    handleRuleEngineEvent(e, htmlForm, genFormRendition);
  }, 'fieldChanged');

  form.subscribe((e) => {
    handleRuleEngineEvent(e, htmlForm, genFormRendition);
  }, 'change');

  form.subscribe((e) => {
    handleRuleEngineEvent(e, htmlForm);
  }, 'submitSuccess');

  form.subscribe((e) => {
    handleRuleEngineEvent(e, htmlForm);
  }, 'submitFailure');

  form.subscribe((e) => {
    handleRuleEngineEvent(e, htmlForm);
  }, 'submitError');
  applyRuleEngine(htmlForm, form, captcha);
}

async function initializeRuleEngineWorker(formDef, renderHTMLForm) {
  if (typeof Worker === 'undefined') {
    // No worker: fetch prefill only when enabled (worker path does the same in RuleEngineWorker.js)
    const needsPrefill = formDef?.properties?.['fd:formDataEnabled'] === true;
    const data = needsPrefill ? await fetchData(formDef?.id, window.location.search || '') : null;
    const ruleEngine = await import('./model/afb-runtime.js');
    const formDefWithData = { ...formDef, ...(data != null && { data }) };
    const form = ruleEngine.createFormInstance(formDefWithData, undefined, LOG_LEVEL);
    return renderHTMLForm(form.getState(true), data);
  }
  const myWorker = new Worker(`${window.hlx.codeBasePath}/blocks/form/rules/RuleEngineWorker.js`, { type: 'module' });
  // Pass the current URL to the worker for log level determination
  const currentUrl = window.location.href;
  // Trigger the worker to start form initialization
  myWorker.postMessage({
    name: 'init',
    payload: {
      ...formDef,
      search: window.location.search || '',
    },
    codeBasePath: window.hlx.codeBasePath,
    url: currentUrl, // Pass URL for log level determination
  });

  return new Promise((resolve) => {
    let form,
      captcha,
      data,
      generateFormRendition;
    myWorker.addEventListener('message', async (e) => {
      // main thread starts html rendering
      if (e.data.name === 'init') {
        const response = await renderHTMLForm(e.data.payload);
        form = response.form;
        captcha = response.captcha;
        data = response.data;
        generateFormRendition = response.generateFormRendition;
        form?.classList.add('loading');
        // informing the worker that html form rendition is complete
        myWorker.postMessage({
          name: 'decorated',
        });
        resolve(response);
      }

      if (e.data.name === 'restore') {
        loadRuleEngine(e.data.payload, form, captcha, generateFormRendition, data);
      }

      if (e.data.name === 'fieldChanged') {
        await fieldChanged(e.data.payload, form, generateFormRendition);
      }

      if (e.data.name === 'sync-complete') {
        form?.classList.remove('loading');
      }
    });
  });
}

export async function initAdaptiveForm(formDef, createForm) {
  preloadFunctionScripts(formDef?.properties?.customFunctionsPath, window.hlx?.codeBasePath);
  await registerCustomFunctions(formDef?.properties?.customFunctionsPath || '/blocks/form/functions.js', window.hlx?.codeBasePath);
  const response = await initializeRuleEngineWorker(formDef, createForm);
  return response?.form;
}

/**
 * Subscribes to changes in the specified field element and triggers a callback
 * with access to formModel when the component is initialised
 * @param {HTMLElement} fieldDiv - The field element to observe for changes.
 * @param {Function} callback - The callback function to which returns fieldModel
 */
export function subscribe(fieldDiv, formId, callback) {
  if (callback) {
    // Check if a subscription map already exists for this form
    let subscriptions = formSubscriptions[formId];
    if (!subscriptions) {
      subscriptions = new Map();
      formSubscriptions[formId] = subscriptions;
    }
    // In case of custom components inside repeatable panels,
    //  the subscribe callback is triggered after form is initialised
    if (formModels[formId]) {
      const form = formModels[formId];
      callback(fieldDiv, form.getElement(fieldDiv?.dataset?.id), 'register');
    }
    // Add the new subscription to the existing map
    subscriptions.set(fieldDiv?.dataset?.id, { callback, fieldDiv });
  }
}
