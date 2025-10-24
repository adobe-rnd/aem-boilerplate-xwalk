// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [{
    id: 'range-12345',
    fieldType: 'range',
    name: 'rating',
    visible: true,
    type: 'number',
    required: false,
    enabled: true,
    readOnly: false,
    step: 1,
    maximum: 100,
    minimum: 1,
    placeholder: '',
    label: {
      visible: true,
      value: 'Rating',
    },
    properties: {
      stepValue: 1,
      'fd:path': '/content/forms/af/sample/jcr:content/guideContainer/range',
    },
    ':type': 'forms-components-examples/components/form/range',
  }],
};
