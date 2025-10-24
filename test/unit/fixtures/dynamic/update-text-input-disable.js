import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'textinput-23810dfb63',
      fieldType: 'text-input',
      name: 'firstname',
      visible: true,
      type: 'string',
      enabled: true,
      readOnly: false,
      label: {
        visible: true,
        value: 'firstname',
      },
      events: {
        change: [
          "if(contains($event.payload.changes[].propertyName, 'value'), if($field.$value == 'fname', dispatchEvent(lastname, 'custom:setProperty', {enabled : false()}), {}), {})",
        ],
        'custom:setProperty': [
          '$event.payload',
        ],
      },
    },
    {
      id: 'textinput-8738b2081c',
      fieldType: 'text-input',
      name: 'lastname',
      type: 'string',
      label: {
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
  const inputEle1 = block.querySelector('#textinput-23810dfb63');
  inputEle1.dispatchEvent(new Event('focus'));
  inputEle1.value = 'fname';
  inputEle1.dispatchEvent(new Event('change', { bubbles: true }));
  inputEle1.dispatchEvent(new Event('blur'));
}

export function expect(block) {
  assert.equal(getValue(block, '#textinput-8738b2081c', 'disabled'), true);
}
