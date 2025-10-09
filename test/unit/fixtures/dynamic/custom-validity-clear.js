import assert from 'assert';
import { setValue } from '../../testUtils.js';

export const sample = {
  action: 'http://localhost:3000/submit',
  items: [
    {
      fieldType: 'text-input',
      id: 'f1',
      name: 'f1_text',
      required: true,
      constraintMessages: {
        required: 'Please fill in this field.',
      },
    },
    {
      fieldType: 'button',
      id: 'button',
      buttonType: 'submit',
      events: {
        click: 'submitForm()',
      },
    },
  ],
};

export function op(block) {
  const btn = block.querySelector('#button');
  const field = block.querySelector('#f1');
  const form = block.querySelector('form');
  
  // First, set a custom validity error on the field
  field.setCustomValidity('Custom error message');
  
  // Verify the field has custom error
  assert.equal(field.validity.customError, true, 'Field should have custom error initially');
  assert.equal(field.validationMessage, 'Custom error message', 'Field should have custom validation message');
  
  // Click submit to trigger validation
  btn.click();
  // Now set a valid value to trigger the 'valid' case
  setValue(block, '#f1', 'valid value');
  
}

export function expect(block) {
  const field = block.querySelector('#f1');
  
  // Verify that custom validity has been cleared
  assert.equal(field.validity.customError, false, 'Custom error should be cleared when field becomes valid');
  assert.equal(field.validationMessage, '', 'Validation message should be empty after clearing custom validity');
  
  // Verify the field is now valid
  assert.equal(field.validity.valid, true, 'Field should be valid after clearing custom validity');
}

export const opDelay = 100;
