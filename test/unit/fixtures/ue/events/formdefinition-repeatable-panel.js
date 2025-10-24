// eslint-disable-next-line import/prefer-default-export
export const ueFormDefForRepeatablePanelTest = {
  id: 'L2NvbnRlbnQvZm9ybXMvYWYvcmVwZWF0YWJsZS1wYW5lbA',
  fieldType: 'form',
  lang: 'en-US',
  title: 'Repeatable Panel Test',
  action: '/adobe/forms/af/submit/L2NvbnRlbnQvZm9ybXMvYWYvcmVwZWF0YWJsZS1wYW5lbA',
  properties: {
    themeRef: '',
    'fd:dor': {
      dorType: 'none',
    },
    'fd:path': '/content/forms/af/repeatable-panel/jcr:content/root/section/form',
    'fd:schemaType': 'BASIC',
    'fd:roleAttribute': null,
    'fd:formDataEnabled': false,
    'fd:autoSave': {
      'fd:enableAutoSave': false,
    },
  },
  events: {
    'custom:setProperty': [
      '$event.payload',
    ],
  },
  ':itemsOrder': [
    'panelcontainer',
  ],
  adaptiveform: '0.14.0',
  metadata: {
    grammar: 'json-formula-1.0.0',
    version: '1.0.0',
  },
  ':type': 'fd/franklin/components/form/v1/form',
  ':items': {
    panelcontainer: {
      id: 'panelcontainer-88e4f7e22c',
      fieldType: 'panel',
      name: 'panelcontainer1736402985167',
      visible: true,
      enabled: true,
      repeatable: true,
      variant: 'addDeleteButtons',
      repeatAddButtonLabel: 'Add',
      repeatDeleteButtonLabel: 'Delete',
      label: {
        value: 'Repeatable Panel',
      },
      events: {
        'custom:setProperty': [
          '$event.payload',
        ],
      },
      properties: {
        'fd:dor': {
          dorExclusion: false,
          dorExcludeTitle: false,
          dorExcludeDescription: false,
        },
        'fd:path': '/content/forms/af/repeatable-panel/jcr:content/root/section/form/panelcontainer',
      },
      ':itemsOrder': [
        'textinput',
      ],
      ':type': 'core/fd/components/form/panelcontainer/v1/panelcontainer',
      ':items': {
        textinput: {
          id: 'textinput-8110743bb8',
          fieldType: 'text-input',
          name: 'textinput1736403046407',
          visible: true,
          type: 'string',
          enabled: true,
          label: {
            value: 'Text Input',
          },
          events: {
            'custom:setProperty': [
              '$event.payload',
            ],
          },
          properties: {
            'fd:dor': {
              dorExclusion: false,
            },
            'fd:path': '/content/forms/af/repeatable-panel/jcr:content/root/section/form/panelcontainer/textinput',
          },
        },
      },
    },
  },
}; 