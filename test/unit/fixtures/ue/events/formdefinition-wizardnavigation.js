// eslint-disable-next-line import/prefer-default-export
export const ueFormDefForWizardNavigationTest = {
  id: 'L2NvbnRlbnQvbmctdGVzdDEvaW5kZXgvamNyOmNvbnRlbnQvcm9vdC9zZWN0aW9uXzAvZm9ybQ==',
  fieldType: 'form',
  lang: 'en',
  action: '/adobe/forms/af/submit/L2NvbnRlbnQvbmctdGVzdDEvaW5kZXgvamNyOmNvbnRlbnQvcm9vdC9zZWN0aW9uXzAvZm9ybQ==',
  properties: {
    'fd:path': '/content/ng-test1/index/jcr:content/root/section_0/form',
  },
  ':itemsOrder': [
    'panelcontainer_1310348320',
  ],
  metadata: {
    version: '1.0.0',
    grammar: 'json-formula-1.0.0',
  },
  adaptiveform: '0.14.0',
  ':items': {
    panelcontainer_1310348320: {
      id: 'panelcontainer-b74ae79557',
      fieldType: 'panel',
      name: 'panelcontainer_13103483201723535065766',
      visible: true,
      enabled: true,
      label: {
        value: 'Wizard',
      },
      properties: {
        'fd:path': '/content/ng-test1/index/jcr:content/root/section_0/form/panelcontainer_1310348320',
      },
      ':itemsOrder': [
        'panelcontainer',
        'panelcontainer_1137531211',
      ],
      ':items': {
        panelcontainer: {
          id: 'panelcontainer-4a4625c3cf',
          fieldType: 'panel',
          name: 'panelcontainer1723535076091',
          visible: true,
          enabled: true,
          label: {
            value: 'Panel',
          },
          properties: {
            'fd:path': '/content/ng-test1/index/jcr:content/root/section_0/form/panelcontainer_1310348320/panelcontainer',
          },
          ':itemsOrder': [
            'nested_panel',
          ],
          ':items': {
            nested_panel: {
              id: 'panelcontainer-nested',
              fieldType: 'panel',
              name: 'nested_panel',
              visible: true,
              enabled: true,
              label: {
                value: 'Nested Panel',
              },
              properties: {
                'fd:path': '/content/ng-test1/index/jcr:content/root/section_0/form/panelcontainer_1310348320/panelcontainer/nested_panel',
              },
              ':type': 'core/fd/components/form/panelcontainer/v1/panelcontainer',
            },
          },
          ':type': 'core/fd/components/form/panelcontainer/v1/panelcontainer',
        },
        panelcontainer_1137531211: {
          id: 'panelcontainer-6a979252b1',
          fieldType: 'panel',
          name: 'panelcontainer_11375312111723535082103',
          visible: true,
          enabled: true,
          label: {
            value: 'Panel',
          },
          properties: {
            'fd:path': '/content/ng-test1/index/jcr:content/root/section_0/form/panelcontainer_1310348320/panelcontainer_1137531211',
          },
          ':type': 'core/fd/components/form/panelcontainer/v1/panelcontainer',
        },
      },
      ':type': 'wizard',
    },
  },
  ':type': 'fd/franklin/components/form/v1/form',
};
