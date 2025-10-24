// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [
    {
      id: 'modal',
      fieldType: 'panel',
      name: 'modal',
      visible: false,
      enabled: true,
      label: {
        visible: true,
        value: 'Modal',
      },
      items: [{
        id: 'textinput-id',
        fieldType: 'text-input',
        name: 'firstName',
        visible: true,
        type: 'string',
        label: {
          value: 'First Name',
        },
        ':type': 'core/fd/components/form/textinput/v1/textinput',
      },
      ],
      ':type': 'modal',
    },
  ],
};
