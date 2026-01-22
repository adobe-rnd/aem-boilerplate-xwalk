// eslint-disable-next-line import/prefer-default-export
export const renderFormBlockFormDef = {
  id: 'render-form-block-test',
  fieldType: 'form',
  lang: 'en',
  action: '/adobe/forms/af/submit/render-form-block-test',
  properties: {
    'fd:path': '/content/test/index/jcr:content/root/section_0/form',
    'fd:schemaType': 'BASIC',
  },
  ':itemsOrder': [
    'textinput',
  ],
  ':type': 'fd/franklin/components/form/v1/form',
  ':items': {
    textinput: {
      id: 'textinput-render-test',
      fieldType: 'text-input',
      name: 'textinput',
      visible: true,
      enabled: true,
      type: 'string',
      label: {
        value: 'Test Text Input',
      },
      properties: {
        'fd:path': '/content/test/index/jcr:content/root/section_0/form/textinput',
      },
      ':type': 'core/fd/components/form/textinput/v1/textinput',
    },
  },
};

export const renderFormBlockFormDefWithPanel = {
  id: 'render-form-block-panel-test',
  fieldType: 'form',
  lang: 'en',
  action: '/adobe/forms/af/submit/render-form-block-panel-test',
  properties: {
    'fd:path': '/content/test-panel/index/jcr:content/root/section_0/form',
  },
  ':itemsOrder': [
    'panelcontainer',
  ],
  ':type': 'fd/franklin/components/form/v1/form',
  ':items': {
    panelcontainer: {
      id: 'panelcontainer-render-test',
      fieldType: 'panel',
      name: 'panelcontainer',
      visible: true,
      enabled: true,
      label: {
        value: 'Test Panel',
      },
      properties: {
        'fd:path': '/content/test-panel/index/jcr:content/root/section_0/form/panelcontainer',
      },
      ':itemsOrder': [
        'textinput',
      ],
      ':type': 'core/fd/components/form/panelcontainer/v1/panelcontainer',
      ':items': {
        textinput: {
          id: 'textinput-in-panel',
          fieldType: 'text-input',
          name: 'textinput',
          visible: true,
          enabled: true,
          type: 'string',
          label: {
            value: 'Text Input in Panel',
          },
          properties: {
            'fd:path': '/content/test-panel/index/jcr:content/root/section_0/form/panelcontainer/textinput',
          },
          ':type': 'core/fd/components/form/textinput/v1/textinput',
        },
      },
    },
  },
};
