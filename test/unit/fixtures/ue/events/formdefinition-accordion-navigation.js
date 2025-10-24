// eslint-disable-next-line import/prefer-default-export
export const ueFormDefForAccordionNavigationTest = {
  id: 'L2NvbnRlbnQvZm9ybXMvYWYvYWNjb3JkaW9u',
  fieldType: 'form',
  lang: 'en-US',
  title: 'accordion',
  action: '/adobe/forms/af/submit/L2NvbnRlbnQvZm9ybXMvYWYvYWNjb3JkaW9u',
  properties: {
    themeRef: '',
    'fd:dor': {
      dorType: 'none',
    },
    'fd:path': '/content/forms/af/accordion/jcr:content/root/section/form',
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
      label: {
        value: 'Accordion',
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
        'fd:path': '/content/forms/af/accordion/jcr:content/root/section/form/panelcontainer',
      },
      ':itemsOrder': [
        'panelcontainer',
        'panelcontainer_1490397225',
      ],
      ':type': 'accordion',
      ':items': {
        panelcontainer: {
          id: 'panelcontainer-c49bd83fb9',
          fieldType: 'panel',
          name: 'panelcontainer1736402997568',
          visible: true,
          enabled: true,
          label: {
            value: 'Panel',
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
            'fd:path': '/content/forms/af/accordion/jcr:content/root/section/form/panelcontainer/panelcontainer',
          },
          ':itemsOrder': [
            'emailinput',
          ],
          ':type': 'core/fd/components/form/panelcontainer/v1/panelcontainer',
          ':items': {
            emailinput: {
              id: 'emailinput-8110743bb8',
              fieldType: 'email',
              name: 'emailinput1736403046407',
              visible: true,
              type: 'string',
              enabled: true,
              label: {
                value: 'Email Input',
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
                'fd:path': '/content/forms/af/accordion/jcr:content/root/section/form/panelcontainer/panelcontainer/emailinput',
              },
              ':type': 'core/fd/components/form/emailinput/v1/emailinput',
            },
          },
        },
        panelcontainer_1490397225: {
          id: 'panelcontainer-d5a2c8d340',
          fieldType: 'panel',
          name: 'panelcontainer_14903972251736403053452',
          visible: true,
          enabled: true,
          label: {
            value: 'Panel',
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
            'fd:path': '/content/forms/af/accordion/jcr:content/root/section/form/panelcontainer/panelcontainer_1490397225',
          },
          ':itemsOrder': [
            'numberinput',
          ],
          ':type': 'core/fd/components/form/panelcontainer/v1/panelcontainer',
          ':items': {
            numberinput: {
              id: 'numberinput-e71ffe0fbe',
              fieldType: 'number-input',
              name: 'numberinput1736403060023',
              visible: true,
              type: 'number',
              enabled: true,
              label: {
                value: 'Number Input',
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
                'fd:path': '/content/forms/af/accordion/jcr:content/root/section/form/panelcontainer/panelcontainer_1490397225/numberinput',
              },
              ':type': 'core/fd/components/form/numberinput/v1/numberinput',
            },
          },
        },
      },
    },
  },
};
