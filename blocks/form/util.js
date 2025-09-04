// create a string containing head tags from h1 to h5
import { defaultErrorMessages } from './constant.js';
import { externalize } from './rules/functions.js';

const headings = Array.from({ length: 6 }, (_, i) => `<h${i + 1}>`).join('');
const allowedTags = `${headings}<a><b><p><i><em><strong><ul><li><ol><br><hr><u><sup><sub><s>`;

export function stripTags(input, allowd = allowedTags) {
  if (typeof input !== 'string') {
    return input;
  }
  const allowed = ((`${allowd || ''}`)
    .toLowerCase()
    .match(/<[a-z][a-z0-9]*>/g) || [])
    .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  const comments = /<!--[\s\S]*?-->/gi;
  const nbsp = /&nbsp;/g; // nbsp: non-breaking space character
  return input.replace(comments, '')
    .replace(tags, ($0, $1) => (allowed.indexOf(`<${$1.toLowerCase()}>`) > -1 ? $0 : ''))
    .replace(nbsp, '')
    .trim();
}

/**
 * Sanitizes a string for use as class name.
 * @param {string} name The unsanitized string
 * @returns {string} The class name
 */
export function toClassName(name) {
  return typeof name === 'string'
    ? name
      .toLowerCase()
      .replace(/[^0-9a-z]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    : '';
}

const clear = Symbol('clear');

export const getId = (function getId() {
  let ids = {};
  return (name) => {
    if (name === clear) {
      ids = {};
      return '';
    }
    const slug = toClassName(name);
    ids[slug] = ids[slug] || 0;
    const idSuffix = ids[slug] ? `-${ids[slug]}` : '';
    ids[slug] += 1;
    return `${slug}${idSuffix}`;
  };
}());

/**
 * Resets the ids for the getId function
 * @returns {void}
 */
export function resetIds() {
  getId(clear);
}

export function createLabel(fd, tagName = 'label') {
  if (fd.label && fd.label.value) {
    const label = document.createElement(tagName);
    label.setAttribute('for', fd.id);
    label.className = 'field-label';
    if (fd.label.richText === true) {
      label.innerHTML = stripTags(fd.label.value);
    } else {
      label.textContent = fd.label.value;
    }
    if (fd.label.visible === false) {
      label.dataset.visible = 'false';
    }
    if (fd.tooltip) {
      label.title = stripTags(fd.tooltip, '');
    }
    return label;
  }
  return null;
}

export function getHTMLRenderType(fd) {
  return fd?.fieldType?.replace('-input', '') ?? 'text';
}

export function createFieldWrapper(fd, tagName = 'div', labelFn = createLabel) {
  const fieldWrapper = document.createElement(tagName);
  const nameStyle = fd.name ? ` field-${toClassName(fd.name)}` : '';
  const renderType = getHTMLRenderType(fd);
  const fieldId = `${renderType}-wrapper${nameStyle}`;
  fieldWrapper.className = fieldId;
  if (fd.Fieldset) {
    fieldWrapper.dataset.fieldset = fd.Fieldset;
  }
  fieldWrapper.dataset.id = fd.id;
  if (fd.visible === false) {
    fieldWrapper.dataset.visible = fd.visible;
  }
  if (fd?.fieldType === 'number-input' && fd?.type) {
    fieldWrapper.dataset.type = fd.type;
  }
  fieldWrapper.classList.add('field-wrapper');
  if (fd.label && fd.label.value && typeof labelFn === 'function') {
    const label = labelFn(fd);
    if (label) { fieldWrapper.append(label); }
  }
  return fieldWrapper;
}

export function createButton(fd) {
  const wrapper = createFieldWrapper(fd);
  if (fd.buttonType) {
    wrapper.classList.add(`${fd?.buttonType}-wrapper`);
  }
  const button = document.createElement('button');
  button.textContent = fd?.label?.visible === false ? '' : fd?.label?.value;
  button.type = fd.buttonType || 'button';
  button.classList.add('button');
  button.id = fd.id;
  button.name = fd.name;
  if (fd?.label?.visible === false) {
    button.setAttribute('aria-label', fd?.label?.value || '');
  }
  if (fd.enabled === false) {
    button.disabled = true;
    button.setAttribute('disabled', '');
  }
  wrapper.replaceChildren(button);
  return wrapper;
}

// create a function to measure performance of another function
// export function perf(fn) {
//   return (...args) => {
//     const start = performance.now();
//     const result = fn(...args);
//     const end = performance.now();
//     // eslint-disable-next-line no-console
//     console.log(`${fn.name} took ${end - start} milliseconds.`);
//     return result;
//   };
// }

function getFieldContainer(fieldElement) {
  const wrapper = fieldElement?.closest('.field-wrapper');
  let container = wrapper;
  if ((fieldElement.type === 'radio' || fieldElement.type === 'checkbox') && wrapper.dataset.fieldset) {
    container = fieldElement?.closest(`fieldset[name=${wrapper.dataset.fieldset}]`);
  }
  return container;
}

export function createHelpText(fd) {
  const div = document.createElement('div');
  div.className = 'field-description';
  div.setAttribute('aria-live', 'polite');
  div.innerHTML = fd.description;
  div.id = `${fd.id}-description`;
  return div;
}

export function updateOrCreateInvalidMsg(fieldElement, msg) {
  const container = getFieldContainer(fieldElement);
  let element = container.querySelector(':scope > .field-description');
  if (!element) {
    element = createHelpText({ id: fieldElement.id });
    container.append(element);
  }
  if (msg) {
    container.classList.add('field-invalid');
    element.textContent = msg;
  } else if (container.dataset.description) {
    container.classList.remove('field-invalid');
    element.innerHTML = container.dataset.description;
  } else if (element) {
    element.remove();
    container?.classList?.remove('field-invalid');
  }
  return element;
}

function removeInvalidMsg(fieldElement) {
  return updateOrCreateInvalidMsg(fieldElement, '');
}

export const validityKeyMsgMap = {
  patternMismatch: { key: 'pattern', attribute: 'type' },
  rangeOverflow: { key: 'maximum', attribute: 'max' },
  rangeUnderflow: { key: 'minimum', attribute: 'min' },
  tooLong: { key: 'maxLength', attribute: 'maxlength' },
  tooShort: { key: 'minLength', attribute: 'minlength' },
  valueMissing: { key: 'required' },
};

export function getCheckboxGroupValue(name, htmlForm) {
  const val = [];
  htmlForm.querySelectorAll(`input[name="${name}"]`).forEach((x) => {
    if (x.checked) {
      val.push(x.value);
    }
  });
  return val;
}

function updateRequiredCheckboxGroup(name, htmlForm) {
  const checkboxGroup = htmlForm.querySelectorAll(`input[name="${name}"]`) || [];
  const value = getCheckboxGroupValue(name, htmlForm);
  checkboxGroup.forEach((checkbox) => {
    if (checkbox.checked || !value.length) {
      checkbox.setAttribute('required', true);
    } else {
      checkbox.removeAttribute('required');
    }
  });
}

function getValidationMessage(fieldElement, wrapper) {
  const [invalidProperty] = Object.keys(validityKeyMsgMap)
    .filter((state) => fieldElement.validity[state]);
  const { key, attribute } = validityKeyMsgMap[invalidProperty] || {};
  const message = wrapper.dataset[`${key}ErrorMessage`] || (attribute ? defaultErrorMessages[key].replace(/\$0/, fieldElement.getAttribute(attribute)) : defaultErrorMessages[key]);
  return message || fieldElement.validationMessage;
}

export function checkValidation(fieldElement) {
  const wrapper = fieldElement.closest('.field-wrapper');
  const isCheckboxGroup = fieldElement.dataset.fieldType === 'checkbox-group';
  const required = wrapper?.dataset?.required;
  if (isCheckboxGroup && required === 'true') {
    updateRequiredCheckboxGroup(fieldElement.name, fieldElement.form);
  }
  if (fieldElement.validity.valid && fieldElement.type !== 'file') {
    removeInvalidMsg(fieldElement);
    return;
  }

  const message = getValidationMessage(fieldElement, wrapper);
  updateOrCreateInvalidMsg(fieldElement, message);
}

export function getSitePageName(path) {
  if (path == null) return '';
  const index = path.lastIndexOf('/jcr:content');
  if (index === -1) {
    return '';
  }
  const mpath = path.substring(0, index);
  const pathArray = mpath.split('/');
  return pathArray[pathArray.length - 1].replaceAll('-', '_');
}

export function extractIdFromUrl(url) {
  const segments = url?.split('/');
  return segments?.[segments.length - 1];
}
const constraintsDef = Object.entries({
  'password|tel|email|text': [['maxLength', 'maxlength'], ['minLength', 'minlength'], 'pattern'],
  'number|range|date': [['maximum', 'Max'], ['minimum', 'Min'], 'step'],
  file: ['accept', 'Multiple'],
  panel: [['maxOccur', 'data-max'], ['minOccur', 'data-min']],
}).flatMap(([types, constraintDef]) => types.split('|')
  .map((type) => [type, constraintDef.map((cd) => (Array.isArray(cd) ? cd : [cd, cd]))]));

const constraintsObject = Object.fromEntries(constraintsDef);

export function setConstraints(element, fd) {
  const renderType = getHTMLRenderType(fd);
  const constraints = constraintsObject[renderType];
  if (constraints) {
    constraints
      .filter(([nm]) => fd[nm])
      .forEach(([nm, htmlNm]) => {
        element.setAttribute(htmlNm, fd[nm]);
      });
  }
}

export function setPlaceholder(element, fd) {
  if (fd.placeholder) {
    element.setAttribute('placeholder', fd.placeholder);
  }
}

export function createInput(fd) {
  const input = document.createElement('input');
  input.type = getHTMLRenderType(fd);
  if (fd.fieldType === 'number-input' && fd.type === 'number') {
    input.setAttribute('step', 'any');
  }
  setPlaceholder(input, fd);
  setConstraints(input, fd);
  return input;
}

export function createRadioOrCheckbox(fd) {
  const wrapper = createFieldWrapper(fd);
  const input = createInput(fd);
  const [value, uncheckedValue] = fd.enum || [];
  input.value = value;
  if (typeof uncheckedValue !== 'undefined') {
    input.dataset.uncheckedValue = uncheckedValue;
  }
  if (fd?.properties) {
    const { variant, alignment } = fd.properties;
    if (fd?.fieldType === 'checkbox' && variant === 'switch') {
      wrapper.classList.add(variant);
      if (alignment) {
        wrapper.classList.add(alignment);
      }
    }
  }
  wrapper.insertAdjacentElement('afterbegin', input);
  return wrapper;
}

export function createRadioOrCheckboxUsingEnum(fd, wrapper) {
  const legend = wrapper.querySelector('legend');
  wrapper.innerHTML = '';
  if (legend) {
    wrapper.append(legend);
  }
  const type = fd.fieldType.split('-')[0];
  const isSameLength = fd.enum?.length === fd.enumNames?.length;
  fd.enum.forEach((value, index) => {
    let labelValues = fd?.enumNames;
    if (!isSameLength) {
      labelValues = fd?.enum;
    }
    const label = (typeof labelValues?.[index] === 'object' && labelValues?.[index] !== null) ? labelValues[index].value : labelValues?.[index] || value;
    const id = getId(fd.name);
    const field = createRadioOrCheckbox({
      name: fd.name,
      id,
      label: { value: label },
      fieldType: type,
      enum: [value],
      required: fd.required,
    });
    const { variant, 'afs:layout': layout } = fd.properties;
    if (variant === 'cards') {
      wrapper.classList.add(variant);
    } else {
      wrapper.classList.remove('cards');
    }
    if (layout?.orientation === 'horizontal') {
      wrapper.classList.add('horizontal');
    }
    if (layout?.orientation === 'vertical') {
      wrapper.classList.remove('horizontal');
    }
    field.classList.remove('field-wrapper', `field-${toClassName(fd.name)}`);
    const input = field.querySelector('input');
    input.id = id;
    input.dataset.fieldType = fd.fieldType;
    input.name = fd.name;
    input.checked = Array.isArray(fd.value) ? fd.value.includes(value) : value === fd.value;
    if ((index === 0 && type === 'radio') || type === 'checkbox') {
      input.required = fd.required;
    }
    if (fd.enabled === false || fd.readOnly === true) {
      input.setAttribute('disabled', 'disabled');
    }
    wrapper.appendChild(field);
  });
}

export function createDropdownUsingEnum(fd, wrapper) {
  wrapper.innerHTML = '';
  wrapper.required = fd.required;
  wrapper.title = fd.tooltip ? stripTags(fd.tooltip, '') : '';
  wrapper.readOnly = fd.readOnly;
  wrapper.multiple = fd.type === 'string[]' || fd.type === 'boolean[]' || fd.type === 'number[]';
  let ph;
  if (fd.placeholder) {
    ph = document.createElement('option');
    ph.textContent = fd.placeholder;
    ph.setAttribute('disabled', '');
    ph.setAttribute('value', '');
    wrapper.append(ph);
  }
  let optionSelected = false;

  const addOption = (label, value) => {
    const option = document.createElement('option');
    option.textContent = label instanceof Object ? label?.value?.trim() : label?.trim();
    option.value = String(value)?.trim() || String(label)?.trim();
    if (fd.value === option.value || (Array.isArray(fd.value) && fd.value.includes(option.value))) {
      option.setAttribute('selected', '');
      optionSelected = true;
    }
    wrapper.append(option);
    return option;
  };

  const options = fd?.enum || [];
  const optionNames = fd?.enumNames ?? options;

  if (options.length === 1
    && options?.[0]?.startsWith('https://')) {
    const optionsUrl = new URL(options?.[0]);
    // using async to avoid rendering
    if (optionsUrl.hostname.endsWith('hlx.page')
      || optionsUrl.hostname.endsWith('hlx.live')
      || optionsUrl.hostname.endsWith('aem.live')
      || optionsUrl.hostname.endsWith('aem.page')) {
      fetch(`${optionsUrl.pathname}${optionsUrl.search}`)
        .then(async (response) => {
          const json = await response.json();
          const values = [];
          json.data.forEach((opt) => {
            addOption(opt.Option, opt.Value);
            values.push(opt.Value || opt.Option);
          });
        });
    }
  } else if (options?.length !== optionNames.length) {
    options.forEach((value) => addOption(value, value));
  } else {
    options.forEach((value, index) => addOption(optionNames?.[index] ?? value, value));
  }

  if (ph && optionSelected === false) {
    ph.setAttribute('selected', '');
  }
}

export async function fetchData(id, search = '') {
  try {
    const url = externalize(`/adobe/forms/af/data/${id}${search}`);
    const response = await fetch(url);
    const json = await response.json();
    const { data: prefillData } = json;
    const { data: { afData: { afBoundData: { data = {} } = {} } = {} } = {} } = json;
    return Object.keys(data).length > 0 ? data : (prefillData || json);
  } catch (ex) {
    return null;
  }
}
