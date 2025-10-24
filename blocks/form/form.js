import { createOptimizedPicture } from '../../scripts/aem.js';
import transferRepeatableDOM, { insertAddButton, insertRemoveButton } from './components/repeat/repeat.js';
import { emailPattern, getSubmitBaseUrl, SUBMISSION_SERVICE } from './constant.js';
import GoogleReCaptcha from './integrations/recaptcha.js';
import componentDecorator from './mappings.js';
import { handleSubmit } from './submit.js';
import DocBasedFormToAF from './transform.js';
import {
  checkValidation,
  createButton,
  createDropdownUsingEnum,
  createFieldWrapper,
  createHelpText,
  createLabel,
  createRadioOrCheckboxUsingEnum,
  extractIdFromUrl,
  getHTMLRenderType,
  getSitePageName,
  setConstraints,
  setPlaceholder,
  stripTags,
  createRadioOrCheckbox,
  createInput,
} from './util.js';

export const DELAY_MS = 0;
let captchaField;
let afModule;

const withFieldWrapper = (element) => (fd) => {
  const wrapper = createFieldWrapper(fd);
  wrapper.append(element(fd));
  return wrapper;
};

const createTextArea = withFieldWrapper((fd) => {
  const input = document.createElement('textarea');
  setPlaceholder(input, fd);
  return input;
});

const createSelect = withFieldWrapper((fd) => {
  const select = document.createElement('select');
  createDropdownUsingEnum(fd, select);
  return select;
});

function createHeading(fd) {
  const wrapper = createFieldWrapper(fd);
  const heading = document.createElement('h2');
  heading.textContent = fd.value || fd.label.value;
  heading.id = fd.id;
  wrapper.append(heading);

  return wrapper;
}

function createLegend(fd) {
  return createLabel(fd, 'legend');
}

function createRepeatablePanel(wrapper, fd) {
  setConstraints(wrapper, fd);
  wrapper.dataset.repeatable = true;
  wrapper.dataset.index = fd.index || 0;
  if (fd.properties) {
    Object.keys(fd.properties).forEach((key) => {
      if (!key.startsWith('fd:')) {
        wrapper.dataset[key] = fd.properties[key];
      }
    });
  }
  if ((!fd.index || fd?.index === 0) && fd.properties?.variant !== 'noButtons') {
    insertAddButton(wrapper, wrapper);
    insertRemoveButton(wrapper, wrapper);
  }
}

function createFieldSet(fd) {
  const wrapper = createFieldWrapper(fd, 'fieldset', createLegend);
  wrapper.id = fd.id;
  wrapper.name = fd.name;
  if (fd.fieldType === 'panel') {
    wrapper.classList.add('panel-wrapper');
  }
  if (fd.repeatable === true) {
    createRepeatablePanel(wrapper, fd);
  }
  return wrapper;
}

function setConstraintsMessage(field, messages = {}) {
  Object.keys(messages).forEach((key) => {
    field.dataset[`${key}ErrorMessage`] = messages[key];
  });
}

function createRadioOrCheckboxGroup(fd) {
  const wrapper = createFieldSet({ ...fd });
  createRadioOrCheckboxUsingEnum(fd, wrapper);
  wrapper.dataset.required = fd.required;
  if (fd.tooltip) {
    wrapper.title = stripTags(fd.tooltip, '');
  }
  setConstraintsMessage(wrapper, fd.constraintMessages);
  return wrapper;
}

function createPlainText(fd) {
  const paragraph = document.createElement('p');
  if (fd.richText) {
    paragraph.innerHTML = stripTags(fd.value);
  } else {
    paragraph.textContent = fd.value;
  }
  const wrapper = createFieldWrapper(fd);
  wrapper.id = fd.id;
  wrapper.replaceChildren(paragraph);
  return wrapper;
}

function createImage(fd) {
  const field = createFieldWrapper(fd);
  field.id = fd?.id;
  const imagePath = fd.value || fd.properties['fd:repoPath'] || '';
  const altText = fd.altText || fd.name;
  field.append(createOptimizedPicture(imagePath, altText));
  return field;
}

const fieldRenderers = {
  'drop-down': createSelect,
  'plain-text': createPlainText,
  checkbox: createRadioOrCheckbox,
  button: createButton,
  multiline: createTextArea,
  panel: createFieldSet,
  radio: createRadioOrCheckbox,
  'radio-group': createRadioOrCheckboxGroup,
  'checkbox-group': createRadioOrCheckboxGroup,
  image: createImage,
  heading: createHeading,
};

function colSpanDecorator(field, element) {
  const colSpan = field['Column Span'] || field.properties?.colspan;
  if (colSpan && element) {
    element.classList.add(`col-${colSpan}`);
  }
}

const handleFocus = (input, field) => {
  const editValue = input.getAttribute('edit-value');
  input.type = field.type;
  input.value = editValue;
};

const handleFocusOut = (input) => {
  const displayValue = input.getAttribute('display-value');
  input.type = 'text';
  input.value = displayValue;
};

function inputDecorator(field, element) {
  const input = element?.querySelector('input,textarea,select');
  if (input) {
    input.id = field.id;
    input.name = field.name;
    if (field.tooltip) {
      input.title = stripTags(field.tooltip, '');
    }
    input.readOnly = field.readOnly;
    input.autocomplete = field.autoComplete ?? 'off';
    input.disabled = field.enabled === false;
    if (field.fieldType === 'drop-down' && field.readOnly) {
      input.disabled = true;
    }
    const fieldType = getHTMLRenderType(field);
    if (['number', 'date', 'text', 'email'].includes(fieldType) && (field.displayFormat || field.displayValueExpression)) {
      field.type = fieldType;
      input.setAttribute('edit-value', field.value ?? '');
      input.setAttribute('display-value', field.displayValue ?? '');
      input.type = 'text';
      input.value = field.displayValue ?? '';
      // Handle mobile touch events to enable native date picker
      let isMobileTouch = false;
      input.addEventListener('touchstart', () => {
        isMobileTouch = true;
        input.type = field.type;
        // Set the edit value immediately to prevent empty field
        const editValue = input.getAttribute('edit-value');
        if (editValue) {
          input.value = editValue;
        }
      });

      input.addEventListener('focus', () => {
        // Only change type on desktop or if not already changed by touchstart
        if (!isMobileTouch && input.type !== field.type) {
          input.type = field.type;
        }
        handleFocus(input, field);
        // Reset mobile touch flag
        isMobileTouch = false;
      });
      input.addEventListener('blur', () => handleFocusOut(input));
    } else if (input.type !== 'file') {
      input.value = field.value ?? '';
      if (input.type === 'radio' || input.type === 'checkbox') {
        input.value = field?.enum?.[0] ?? 'on';
        input.checked = field.value === input.value;
      }
    } else {
      input.multiple = field.type === 'file[]';
    }
    if (field.required) {
      input.setAttribute('required', 'required');
    }
    if (field.description) {
      input.setAttribute('aria-describedby', `${field.id}-description`);
    }
    if (field.minItems) {
      input.dataset.minItems = field.minItems;
    }
    if (field.maxItems) {
      input.dataset.maxItems = field.maxItems;
    }
    if (field.maxFileSize) {
      input.dataset.maxFileSize = field.maxFileSize;
    }
    if (field.default !== undefined) {
      input.setAttribute('value', field.default);
    }
    if (input.type === 'email') {
      input.pattern = emailPattern;
    }
    setConstraintsMessage(element, field.constraintMessages);
    element.dataset.required = field.required;
  }
}

function decoratePanelContainer(panelDefinition, panelContainer) {
  if (!panelContainer) return;

  const isPanelWrapper = (container) => container.classList?.contains('panel-wrapper');

  const shouldAddLabel = (container, panel) => panel.label && !container.querySelector(`legend[for=${container.dataset.id}]`);

  const isContainerRepeatable = (container) => container.dataset?.repeatable === 'true' && container.dataset?.variant !== 'noButtons';

  const needsAddButton = (container) => !container.querySelector(':scope > .repeat-actions');

  const needsRemoveButton = (container) => !container.querySelector(':scope > .item-remove');

  if (isPanelWrapper(panelContainer)) {
    if (shouldAddLabel(panelContainer, panelDefinition)) {
      const legend = createLegend(panelDefinition);
      if (legend) {
        panelContainer.insertAdjacentElement('afterbegin', legend);
      }
    }

    if (isContainerRepeatable(panelContainer)) {
      if (needsAddButton(panelContainer)) {
        insertAddButton(panelContainer, panelContainer);
      }
      if (needsRemoveButton(panelContainer)) {
        insertRemoveButton(panelContainer, panelContainer);
      }
    }
  }
}

function renderField(fd) {
  const fieldType = fd?.fieldType?.replace('-input', '') ?? 'text';
  const renderer = fieldRenderers[fieldType];
  let field;
  if (typeof renderer === 'function') {
    field = renderer(fd);
  } else {
    field = createFieldWrapper(fd);
    field.append(createInput(fd));
  }
  if (fd.description) {
    field.append(createHelpText(fd));
    field.dataset.description = fd.description; // In case overriden by error message
  }
  if (fd.fieldType !== 'radio-group' && fd.fieldType !== 'checkbox-group' && fd.fieldType !== 'captcha') {
    inputDecorator(fd, field);
  }
  return field;
}

export async function generateFormRendition(panel, container, formId, getItems = (p) => p?.items) {
  const items = getItems(panel) || [];
  const promises = items.map(async (field) => {
    field.value = field.value ?? '';
    const { fieldType } = field;
    if (fieldType === 'captcha') {
      captchaField = field;
      const element = createFieldWrapper(field);
      element.textContent = 'CAPTCHA';
      return element;
    }
    const element = renderField(field);
    if (field.appliedCssClassNames) {
      element.className += ` ${field.appliedCssClassNames}`;
    }
    colSpanDecorator(field, element);
    if (field?.fieldType === 'panel') {
      await generateFormRendition(field, element, formId, getItems);
      return element;
    }
    await componentDecorator(element, field, container, formId);
    return element;
  });

  const children = await Promise.all(promises);
  container.append(...children.filter((_) => _ != null));
  decoratePanelContainer(panel, container);
  await componentDecorator(container, panel, null, formId);
}

function enableValidation(form) {
  form.querySelectorAll('input,textarea,select').forEach((input) => {
    input.addEventListener('invalid', (event) => {
      checkValidation(event.target);
    });
  });

  form.addEventListener('change', (event) => {
    checkValidation(event.target);
  });
}

async function createFormForAuthoring(formDef) {
  const form = document.createElement('form');
  await generateFormRendition(formDef, form, formDef.id, (container) => {
    if (container[':itemsOrder'] && container[':items']) {
      return container[':itemsOrder'].map((itemKey) => container[':items'][itemKey]);
    }
    return [];
  });
  return form;
}

export async function createForm(formDef, data) {
  const { action: formPath } = formDef;
  const form = document.createElement('form');
  form.dataset.action = formPath;
  form.noValidate = true;
  if (formDef.appliedCssClassNames) {
    form.className = formDef.appliedCssClassNames;
  }
  const formId = extractIdFromUrl(formPath); // formDef.id returns $form after getState()
  await generateFormRendition(formDef, form, formId);

  let captcha;
  if (captchaField) {
    let config = captchaField?.properties?.['fd:captcha']?.config;
    if (!config) {
      config = {
        siteKey: captchaField?.value,
        uri: captchaField?.uri,
        version: captchaField?.version,
      };
    }
    const pageName = getSitePageName(captchaField?.properties?.['fd:path']);
    captcha = new GoogleReCaptcha(config, captchaField.id, captchaField.name, pageName);
    captcha.loadCaptcha(form);
  }

  enableValidation(form);
  transferRepeatableDOM(form);

  if (afModule && typeof Worker === 'undefined') {
    window.setTimeout(async () => {
      afModule.loadRuleEngine(formDef, form, captcha, generateFormRendition, data);
    }, DELAY_MS);
  }

  form.addEventListener('reset', async () => {
    const response = await createForm(formDef);
    if (response?.form) {
      document.querySelector(`[data-action="${form?.dataset?.action}"]`)?.replaceWith(response?.form);
    }
  });

  form.addEventListener('submit', (e) => {
    handleSubmit(e, form, captcha);
  });

  return {
    form,
    captcha,
    generateFormRendition,
    data,
  };
}

function isDocumentBasedForm(formDef) {
  return formDef?.[':type'] === 'sheet' && formDef?.data;
}

function cleanUp(content) {
  const formDef = content.replaceAll('^(([^<>()\\\\[\\\\]\\\\\\\\.,;:\\\\s@\\"]+(\\\\.[^<>()\\\\[\\\\]\\\\\\\\.,;:\\\\s@\\"]+)*)|(\\".+\\"))@((\\\\[[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}])|(([a-zA-Z\\\\-0-9]+\\\\.)\\+[a-zA-Z]{2,}))$', '');
  return formDef?.replace(/\x83\n|\n|\s\s+/g, '');
}
/*
  Newer Clean up - Replace backslashes that are not followed by valid json escape characters
  function cleanUp(content) {
    return content.replace(/\\/g, (match, offset, string) => {
      const prevChar = string[offset - 1];
      const nextChar = string[offset + 1];
      const validEscapeChars = ['b', 'f', 'n', 'r', 't', '"', '\\'];
      if (validEscapeChars.includes(nextChar) || prevChar === '\\') {
        return match;
      }
      return '';
    });
  }
*/

function decode(rawContent) {
  const content = rawContent.trim();
  if (content.startsWith('"') && content.endsWith('"')) {
    // In the new 'jsonString' context, Server side code comes as a string with escaped characters,
    // hence the double parse
    return JSON.parse(JSON.parse(content));
  }
  return JSON.parse(cleanUp(content));
}

function extractFormDefinition(block) {
  let formDef;
  const container = block.querySelector('pre');
  const codeEl = container?.querySelector('code');
  const content = codeEl?.textContent;
  if (content) {
    formDef = decode(content);
  }
  return { container, formDef };
}

export async function fetchForm(pathname) {
  // get the main form
  let data;
  let path = pathname;
  if (path.startsWith(window.location.origin) && !path.includes('.json')) {
    if (path.endsWith('.html')) {
      path = path.substring(0, path.lastIndexOf('.html'));
    }
    path += '/jcr:content/root/section/form.html';
  }
  let resp = await fetch(path);

  if (resp?.headers?.get('Content-Type')?.includes('application/json')) {
    data = await resp.json();
  } else if (resp?.headers?.get('Content-Type')?.includes('text/html')) {
    resp = await fetch(path);
    data = await resp.text().then((html) => {
      try {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        if (doc) {
          return extractFormDefinition(doc.body).formDef;
        }
        return doc;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Unable to fetch form definition for path', pathname, path);
        return null;
      }
    });
  }
  return data;
}

function addRequestContextToForm(formDef) {
  if (formDef && typeof formDef === 'object') {
    formDef.properties = formDef.properties || {};

    // Add URL parameters
    try {
      const urlParams = new URLSearchParams(window?.location?.search || '');
      if (!formDef.properties.queryParams) {
        formDef.properties.queryParams = {};
      }
      urlParams?.forEach((value, key) => {
        formDef.properties.queryParams[key?.toLowerCase()] = value;
      });
    } catch (e) {
      console.warn('Error reading URL parameters:', e);
    }

    // Add cookies
    try {
      const cookies = document?.cookie.split(';');
      formDef.properties.cookies = {};
      cookies?.forEach((cookie) => {
        if (cookie.trim()) {
          const [key, value] = cookie.trim().split('=');
          formDef.properties.cookies[key.trim()] = value || '';
        }
      });
    } catch (e) {
      console.warn('Error reading cookies:', e);
    }
  }
}

export default async function decorate(block) {
  let container = block.querySelector('a[href]');
  let formDef;
  let pathname;
  if (container) {
    ({ pathname } = new URL(container.href));
    formDef = await fetchForm(container.href);
  } else {
    ({ container, formDef } = extractFormDefinition(block));
  }
  let source = 'aem';
  let rules = true;
  let form;
  if (formDef) {
    const submitProps = formDef?.properties?.['fd:submit'];
    const actionType = submitProps?.actionName || formDef?.properties?.actionType;
    const spreadsheetUrl = submitProps?.spreadsheet?.spreadsheetUrl
      || formDef?.properties?.spreadsheetUrl;

    if (actionType === 'spreadsheet' && spreadsheetUrl) {
      // Check if we're in an iframe and use parent window path if available
      const iframePath = window.frameElement ? window.parent.location.pathname
        : window.location.pathname;
      formDef.action = SUBMISSION_SERVICE + btoa(pathname || iframePath);
    } else {
      formDef.action = getSubmitBaseUrl() + (formDef.action || '');
    }
    if (isDocumentBasedForm(formDef)) {
      const transform = new DocBasedFormToAF();
      formDef = transform.transform(formDef);
      source = 'sheet';
      const response = await createForm(formDef);
      form = response?.form;
      const docRuleEngine = await import('./rules-doc/index.js');
      docRuleEngine.default(formDef, form);
      rules = false;
    } else {
      afModule = await import('./rules/index.js');
      addRequestContextToForm(formDef);
      if (afModule && afModule.initAdaptiveForm && !block.classList.contains('edit-mode')) {
        form = await afModule.initAdaptiveForm(formDef, createForm);
      } else {
        form = await createFormForAuthoring(formDef);
      }
    }
    form.dataset.redirectUrl = formDef.redirectUrl || '';
    form.dataset.thankYouMsg = formDef.thankYouMsg || '';
    form.dataset.action = formDef.action || pathname?.split('.json')[0];
    form.dataset.source = source;
    form.dataset.rules = rules;
    form.dataset.id = formDef.id;
    if (source === 'aem' && formDef.properties && formDef.properties['fd:path']) {
      form.dataset.formpath = formDef.properties['fd:path'];
    }
    container.replaceWith(form);
  }
}
