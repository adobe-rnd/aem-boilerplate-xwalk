import { getId } from '../../util.js';

function update(fieldset, index, labelTemplate) {
  const legend = fieldset.querySelector(':scope>.field-label')?.firstChild;
  const text = labelTemplate?.replace('#', index + 1);
  if (legend) {
    legend.textContent = text;
  }
  if (typeof fieldset.id === 'undefined') {
    fieldset.id = getId(fieldset.name);
  }
  fieldset.setAttribute('data-index', index);
  if (index > 0) {
    fieldset.querySelectorAll('.field-wrapper').forEach((f) => {
      const [label, input, description] = ['label', 'input,select,button,textarea', 'description']
        .map((x) => f.querySelector(x));
      if (input) {
        input.id = getId(input.name);
      }
      if (label) {
        label.htmlFor = input.id;
      }
      if (description) {
        input.setAttribute('aria-describedby', `${input.Id}-description`);
        description.id = `${input.id}-description`;
      }
    });
  }
}

function createButton(label, icon) {
  const button = document.createElement('button');
  button.className = `item-${icon}`;
  button.type = 'button';
  const text = document.createElement('span');
  text.textContent = label;
  button.append(document.createElement('i'), text);
  return button;
}

export function insertRemoveButton(fieldset, wrapper, form) {
  const label = fieldset.dataset?.repeatDeleteButtonLabel || 'Delete';
  const removeButton = createButton(label, 'remove');
  removeButton.addEventListener('click', () => {
    fieldset.remove();
    wrapper.querySelector('.item-add').setAttribute('data-visible', 'true');
    wrapper.querySelectorAll('[data-repeatable="true"]').forEach((el, index) => {
      update(el, index, wrapper['#repeat-template-label']);
    });
    const event = new CustomEvent('item:remove', {
      detail: { item: { name: fieldset.name, id: fieldset.id } },
      bubbles: false,
    });
    form.dispatchEvent(event);
  });
  fieldset.append(removeButton);
}

export const add = (wrapper, form, actions) => (e) => {
  const fieldset = wrapper['#repeat-template'];
  const max = wrapper.getAttribute('data-max');
  const min = wrapper.getAttribute('data-min');
  const childCount = wrapper.children.length - 1;
  const newFieldset = fieldset.cloneNode(true);
  newFieldset.setAttribute('data-index', childCount);
  update(newFieldset, childCount, wrapper['#repeat-template-label']);
  if (childCount >= +min) {
    insertRemoveButton(newFieldset, wrapper, form);
  }
  if (+max !== -1 && +max <= childCount + 1) {
    e.currentTarget.setAttribute('data-visible', 'false');
  }
  actions.insertAdjacentElement('beforebegin', newFieldset);
  const event = new CustomEvent('item:add', {
    detail: { item: { name: newFieldset.name, id: newFieldset.id } },
    bubbles: false,
  });
  form.dispatchEvent(event);
};

function getInstances(el) {
  let nextSibling = el.nextElementSibling;
  const siblings = [el];
  while (nextSibling && nextSibling.matches('[data-repeatable="true"]:not([data-repeatable="0"])')) {
    siblings.push(nextSibling);
    nextSibling = nextSibling.nextElementSibling;
  }
  return siblings;
}

export function insertAddButton(wrapper, form) {
  const actions = document.createElement('div');
  actions.className = 'repeat-actions';
  const addLabel = wrapper?.dataset?.repeatAddButtonLabel || 'Add';
  const addButton = createButton(addLabel, 'add');
  addButton.addEventListener('click', add(wrapper, form, actions));
  actions.appendChild(addButton);
  wrapper.append(actions);
}

export default function transferRepeatableDOM(form) {
  form.querySelectorAll('[data-repeatable="true"][data-index="0"]').forEach((el) => {
    const instances = getInstances(el);
    const wrapper = document.createElement('div');
    wrapper.dataset.min = el.dataset.min || 0;
    wrapper.dataset.max = el.dataset.max;
    wrapper.dataset.variant = el.dataset.variant || 'addDeleteButtons';
    wrapper.dataset.repeatAddButtonLabel = el.dataset?.repeatAddButtonLabel ? el.dataset.repeatAddButtonLabel : 'Add';
    wrapper.dataset.repeatDeleteButtonLabel = el.dataset?.repeatDeleteButtonLabel ? el.dataset.repeatDeleteButtonLabel : 'Remove';
    el.insertAdjacentElement('beforebegin', wrapper);
    wrapper.append(...instances);
    wrapper.querySelectorAll('.item-remove').forEach((element) => element.remove());
    wrapper.querySelectorAll('.repeat-actions').forEach((element) => element.remove());
    const cloneNode = el.cloneNode(true);
    cloneNode.removeAttribute('id');
    wrapper['#repeat-template'] = cloneNode;
    wrapper['#repeat-template-label'] = el.querySelector(':scope>.field-label')?.textContent;
    if (+el.min === 0) {
      el.remove();
    } else {
      update(el, 0, wrapper['#repeat-template-label']);
      el.setAttribute('data-index', 0);
    }
    if (el.dataset.variant !== 'noButtons') {
      insertAddButton(wrapper, form);
    }
    wrapper.className = 'repeat-wrapper';
  });
}
