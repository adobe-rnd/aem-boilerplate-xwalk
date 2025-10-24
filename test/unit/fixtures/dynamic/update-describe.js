import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'textinput-d75607c6f5',
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
          "if(contains($event.payload.changes[].propertyName, 'value'), if($field.$value == 'fname', dispatchEvent(lastname, 'custom:setProperty', {description : 'please fill lastname'}), {}), {})",
        ],
        'custom:setProperty': [
          '$event.payload',
        ],
      },
    },
    {
      id: 'textinput-5931f78b8c',
      fieldType: 'text-input',
      name: 'lastname',
      visible: true,
      type: 'string',
      enabled: true,
      readOnly: false,
      label: {
        visible: true,
        value: 'lastname',
      },
      events: {
        'custom:setProperty': [
          '$event.payload',
        ],
      },
    },
  ],
};

function getValue(block, id) {
  const input = block.querySelector(id);
  const inputtext = input.textContent;
  return inputtext;
}

export function op(block) {
  const inputEle1 = block.querySelector('#textinput-d75607c6f5');
  inputEle1.dispatchEvent(new Event('focus'));
  inputEle1.value = 'fname';
  inputEle1.dispatchEvent(new Event('change', { bubbles: true }));
  inputEle1.dispatchEvent(new Event('blur'));
}

export function expect(block) {
  assert.equal(getValue(block, '#textinput-5931f78b8c-description'), 'please fill lastname');
}
