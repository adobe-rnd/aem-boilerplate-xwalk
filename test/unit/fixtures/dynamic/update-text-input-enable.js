import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'textinput-44e6227ac3',
      fieldType: 'text-input',
      name: 'firstname',
      visible: true,
      type: 'string',
      enabled: true,
      label: {
        visible: true,
        value: 'firstname',
      },
      events: {
        change: [
          "if(contains($event.payload.changes[].propertyName, 'value'), if($field.$value == 'textinput', dispatchEvent(lastname, 'custom:setProperty', {readOnly : true()}), {}), {})",
        ],
        'custom:setProperty': [
          '$event.payload',
        ],
      },
    },
    {
      id: 'textinput-5dc4ea1da3',
      fieldType: 'text-input',
      name: 'lastname',
      type: 'string',
      enabled: true,
      readOnly: false,
      label: {
        visible: true,
        value: 'Text Input',
      },
      events: {
        'custom:setProperty': [
          '$event.payload',
        ],
      },
    },
  ],
};
function getValue(block, id, fieldType, property = 'disabled') {
  const fieldEl = block.querySelector(id);
  return fieldEl[property];
}
export function op(block) {
  const inputEle1 = block.querySelector('#textinput-44e6227ac3');
  inputEle1.dispatchEvent(new Event('focus'));
  inputEle1.value = 'textinput';
  inputEle1.dispatchEvent(new Event('change', { bubbles: true }));
  inputEle1.dispatchEvent(new Event('blur'));
}

export function expect(block) {
  assert.equal(getValue(block, '#textinput-5dc4ea1da3', 'disabled'), true);
}
