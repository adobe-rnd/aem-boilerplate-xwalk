import assert from 'assert';

// Comprehensive test for repeat button visibility covering all scenarios
export const sample = {
  total: 6,
  offset: 0,
  limit: 6,
  data: [{
    Name: 'item', Type: 'fieldset', Description: '', Placeholder: '', Label: 'Test Item', 'Read Only': '', Mandatory: '', Pattern: '', Step: '', Min: '1', Max: '3', Value: '', Options: '', OptionNames: '', Fieldset: '', Repeatable: 'true',
  }, {
    Name: 'name', Type: 'text', Description: '', Placeholder: '', Label: 'Name', 'Read Only': '', Mandatory: '', Pattern: '', Step: '', Min: '', Max: '', Value: '', Options: '', OptionNames: '', Fieldset: 'item', Repeatable: '',
  }],
  ':type': 'sheet',
};

export function op(block) {
  const addBtn = block.querySelector('.repeat-wrapper > .repeat-actions > .item-add');
  
  // Test complete cycle: min -> add -> add to max -> remove -> remove to min
  // 1. Add first instance (1 -> 2)
  addBtn.click();
  
  // 2. Add second instance to reach max (2 -> 3)  
  addBtn.click();
  
  // 3. Remove one instance (3 -> 2)
  const firstRemoveBtn = block.querySelector('.item-remove');
  firstRemoveBtn.click();
  
  // 4. Remove another to reach min (2 -> 1)
  const secondRemoveBtn = block.querySelector('.item-remove');
  secondRemoveBtn.click();
}

export function expect(block) {
  const wrapper = block.querySelector('.repeat-wrapper');
  
  // Final state: should be back to 1 instance (min)
  const instances = block.querySelectorAll('.repeat-wrapper > fieldset[data-repeatable="true"]');
  assert.equal(instances.length, 1, 'Should have 1 instance at end (min)');
  
  // At min: verify data attributes
  assert.equal(wrapper.dataset.removeInstance, 'false', 'Should not be able to remove (at min)');
  assert.equal(wrapper.dataset.addInstance, 'true', 'Should be able to add (not at max)');
  assert.equal(wrapper.dataset.instanceCount, '1', 'Instance count should be 1');
  
  // Test adding back to max to verify max limit behavior
  const addBtn = block.querySelector('.repeat-wrapper > .repeat-actions > .item-add');
  addBtn.click(); // 1 -> 2
  
  // At 2 (between min and max): verify data attributes
  assert.equal(wrapper.dataset.removeInstance, 'true', 'Should be able to remove (not at min)');
  assert.equal(wrapper.dataset.addInstance, 'true', 'Should be able to add (not at max)');
  assert.equal(wrapper.dataset.instanceCount, '2', 'Instance count should be 2');
  
  addBtn.click(); // 2 -> 3 (max)
  
  // At max: verify data attributes
  assert.equal(wrapper.dataset.addInstance, 'false', 'Should not be able to add (at max)');
  assert.equal(wrapper.dataset.removeInstance, 'true', 'Should be able to remove (not at min)');
  assert.equal(wrapper.dataset.instanceCount, '3', 'Instance count should be 3');
} 