// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [{
    id: 'repeatable-panel-id',
    fieldType: 'panel',
    name: 'repeatablePanel',
    visible: true,
    repeatable: true,
    minOccur: 2,
    maxOccur: -1,
    label: {
      visible: true,
      value: 'Repeatable Panel',
    },
    items: [{
      id: 'choice-radio-id',
      fieldType: 'radio-group',
      name: 'choiceRadio',
      visible: true,
      type: 'string',
      enumNames: [
        'Option A',
        'Option B',
      ],
      label: {
        visible: true,
        value: 'Choose Option',
      },
      enum: [
        'optionA',
        'optionB',
      ],
    }],
    ':type': 'forms-components-examples/components/form/panel',
  }],
};

export const expectedDiffs = [
  {
    node: 'FORM/FIELDSET',
    attribute: 'data-id',
  },
  {
    node: 'FORM/FIELDSET',
    attribute: 'id',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'repeatable-panel-id\']/FIELDSET/DIV[1]/INPUT',
    attribute: 'name',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'repeatable-panel-id\']/FIELDSET/DIV[2]/INPUT',
    attribute: 'name',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']',
    attribute: 'data-id',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']',
    attribute: 'id',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/LEGEND',
    attribute: 'for',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/FIELDSET',
    attribute: 'data-id',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/FIELDSET',
    attribute: 'id',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/FIELDSET/LEGEND',
    attribute: 'for',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/FIELDSET/DIV[1]/INPUT',
    attribute: 'name',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/FIELDSET/DIV[2]/INPUT',
    attribute: 'name',
  },
]; 