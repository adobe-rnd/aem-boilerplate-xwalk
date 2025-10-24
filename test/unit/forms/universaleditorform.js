// eslint-disable-next-line import/prefer-default-export
export const ueFormDef = {
  id: '$form',
  fieldType: 'form',
  ':items': {
    textinput: {
      id: 'text-input',
      fieldType: 'text-input',
      label: {
        value: 'Text Input',
      },
      properties: {
        'fd:path': '/content/test2/index/jcr:content/root/section_0/form/textinput',
      },
    },
    text: {
      id: 'text-1971d3e4a8',
      fieldType: 'plain-text',
      name: 'text1723553177950',
      value: '\u003Cp\u003Ethis is a test\u003C/p\u003E',
      visible: true,
      richText: true,
      properties: {
        'fd:path': '/content/test2/index/jcr:content/root/section_0/form/text',
      },
      ':type': 'core/fd/components/form/text/v1/text',
    },
    rating: {
      id: 'rating-input',
      fieldType: 'text-input',
      label: {
        value: 'Text Input',
      },
      properties: {
        'fd:path': '/content/test2/index/jcr:content/root/section_0/form/textinput',
      },
      ':type': 'rating',
    },
    panelcontainer: {
      id: 'panelcontainer-084914a499',
      fieldType: 'panel',
      name: 'panelcontainer1716813758388',
      label: {
        value: 'Panel',
      },
      properties: {
        'fd:path': '/content/test2/index/jcr:content/root/section_0/form/panelcontainer',
      },
      ':itemsOrder': [
        'textinput',
      ],
      ':type': 'core/fd/components/form/panelcontainer/v1/panelcontainer',
      ':items': {
        textinput: {
          id: 'textinput-d330c9b8e7',
          fieldType: 'text-input',
          name: 'textinput1716813763576',
          type: 'string',
          label: {
            value: 'Text Input',
          },
          properties: {
            'fd:path': '/content/test2/index/jcr:content/root/section_0/form/panelcontainer/textinput',
          },
          ':type': 'core/fd/components/form/textinput/v1/textinput',
        },
      },
    },
    fragment_1198843043: {
      id: 'fragment-1c5674199a',
      fieldType: 'panel',
      name: 'fragment_11988430431717085995616',
      properties: {
        'fd:path': '/content/test2/index/jcr:content/root/section_0/form/fragment_1198843043',
        'fd:fragment': true,
      },
      label: {
        value: 'Fragment new',
      },
      ':items': {
        textinput_360975137: {
          id: 'textinput-105b08b11c',
          fieldType: 'text-input',
          name: 'textinput1716794906685',
          type: 'string',
          label: {
            value: 'street address',
          },
          properties: {
            'fd:path': '/content/test2/formfrag3/jcr:content/root/section/form/textinput',
          },
          ':type': 'core/fd/components/form/textinput/v1/textinput',
        },
      },
      ':itemsOrder': [
        'textinput_360975137',
      ],
      ':type': 'core/fd/components/form/panelcontainer/v1/panelcontainer',
    },
    empty_fragment: {
      id: 'fragment-empty',
      fieldType: 'panel',
      name: 'empty_fragment',
      properties: {
        'fd:path': '/content/test2/index/jcr:content/root/section_0/form/empty_fragment',
        'fd:fragment': true,
      },
      label: {
        value: 'Empty Fragment',
      },
      ':items': {},
      ':itemsOrder': [],
      ':type': 'core/fd/components/form/panelcontainer/v1/panelcontainer',
    },
    panelcontainer_1558601327: {
      id: 'panelcontainer-4ea210a289',
      fieldType: 'panel',
      name: 'panelcontainer_15586013271719389324331',
      label: {
        value: 'Wizard',
      },
      properties: {
        'fd:path': '/content/forms-demo-ng/index/jcr:content/root/section_0/form_329757644/panelcontainer_1558601327',
      },
      ':itemsOrder': [
        'textinput',
      ],
      ':items': {
        textinput: {
          id: 'textinput-748372f950',
          fieldType: 'text-input',
          name: 'textinput1719389342149',
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
            'fd:path': '/content/forms-demo-ng/index/jcr:content/root/section_0/form_329757644/panelcontainer_1558601327/textinput',
          },
          ':type': 'core/fd/components/form/textinput/v1/textinput',
        },
      },
      ':type': 'wizard',
    },
    modal: {
      id: 'modal-id',
      fieldType: 'panel',
      name: 'modal',
      visible: false,
      enabled: true,
      label: {
        visible: true,
        value: 'Modal',
      },
      properties: {
        'fd:path': '/content/forms-demo-ng/index/jcr:content/root/section_0/form_329757644/modal',
      },
      ':itemsOrder': [
        'textinput',
      ],
      ':items': {
        textinput: {
          id: 'textinput-4494a13328',
          fieldType: 'text-input',
          name: 'firstName',
          visible: true,
          type: 'string',
          enabled: true,
          label: {
            value: 'First Name',
          },
          properties: {
            'fd:path': '/content/forms-demo-ng/index/jcr:content/root/section_0/form_329757644/modal/textinput',
          },
          ':type': 'core/fd/components/form/textinput/v1/textinput',
        },
      },
      ':type': 'modal',
    },
  },
  ':itemsOrder': ['textinput', 'text', 'panelcontainer', 'fragment_1198843043', 'empty_fragment', 'modal'],
};
