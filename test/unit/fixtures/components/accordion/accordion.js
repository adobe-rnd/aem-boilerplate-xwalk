// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [
    {
      id: 'panelcontainer-88e4f7e22c',
      fieldType: 'panel',
      ':type': 'accordion',
      name: 'panelcontainer1736402985167',
      visible: true,
      enabled: true,
      label: {
        value: 'Accordion',
      },
      events: {
        'custom:setProperty': ['$event.payload'],
      },
      properties: {
        'fd:dor': {
          dorExclusion: false,
          dorExcludeTitle: false,
          dorExcludeDescription: false,
        },
        'fd:path': '/content/forms/af/accordion/jcr:content/root/section/form/panelcontainer',
      },
      items: [
        {
          id: 'panelcontainer-c49bd83fb9',
          fieldType: 'panel',
          name: 'panelcontainer1736402997568',
          visible: true,
          enabled: true,
          label: {
            value: 'Panel',
          },
          events: {
            'custom:setProperty': ['$event.payload'],
          },
          properties: {
            'fd:dor': {
              dorExclusion: false,
              dorExcludeTitle: false,
              dorExcludeDescription: false,
            },
            'fd:path': '/content/forms/af/accordion/jcr:content/root/section/form/panelcontainer/panelcontainer',
          },
          items: [
            {
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
                'custom:setProperty': ['$event.payload'],
              },
              properties: {
                'fd:dor': {
                  dorExclusion: false,
                },
                'fd:path': '/content/forms/af/accordion/jcr:content/root/section/form/panelcontainer/panelcontainer/emailinput',
              },
            },
          ],
        },
        {
          id: 'panelcontainer-d5a2c8d340',
          fieldType: 'panel',
          name: 'panelcontainer_14903972251736403053452',
          visible: true,
          enabled: true,
          label: {
            value: 'Panel',
          },
          events: {
            'custom:setProperty': ['$event.payload'],
          },
          properties: {
            'fd:dor': {
              dorExclusion: false,
              dorExcludeTitle: false,
              dorExcludeDescription: false,
            },
            'fd:path': '/content/forms/af/accordion/jcr:content/root/section/form/panelcontainer/panelcontainer_1490397225',
          },
          items: [
            {
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
                'custom:setProperty': ['$event.payload'],
              },
              properties: {
                'fd:dor': {
                  dorExclusion: false,
                },
                'fd:path': '/content/forms/af/accordion/jcr:content/root/section/form/panelcontainer/panelcontainer_1490397225/numberinput',
              },
            },
          ],
        },
      ],
    },
  ],
};
