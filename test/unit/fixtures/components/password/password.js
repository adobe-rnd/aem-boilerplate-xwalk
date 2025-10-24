// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
    items: [{
        id: 'password-123',
        fieldType: 'text-input',
        name: 'password',
        visible: true,
        type: 'string',
        required: false,
        enabled: true,
        readOnly: false,
        description: '<p>This is a help text.</p>',
        label: {
            visible: true,
            value: 'Password',
        },
        events: {
            'custom:setProperty': [
                '$event.payload',
            ],
        },
        ':type': 'password',
    },
    ],
};
