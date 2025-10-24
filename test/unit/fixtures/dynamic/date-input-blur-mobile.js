import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'datepicker-6dd0c75352',
      fieldType: 'date-input',
      name: 'dob',
      visible: true,
      type: 'string',
      enabled: true,
      readOnly: false,
      displayFormat: 'd MMMM, y',
      default: '2000-02-13',
      label: {
        visible: true,
        value: 'Date Of Birth',
      },
      events: {
        'custom:setProperty': ['$event.payload'],
      },
      format: 'date',
    },
  ],
};

function getValue(block, id, property = 'value') {
  const input = block.querySelector(id);
  return input[property];
}

export function expect(block) {
  const inputEle = block.querySelector('#datepicker-6dd0c75352');
  inputEle.dispatchEvent(new Event('touchstart'));
  assert.equal(inputEle.type, 'date', 'Input type should change to date after touchstart');
  inputEle.dispatchEvent(new Event('focus'));
  assert.equal(inputEle.type, 'date', 'Input type should stay as date');
}
