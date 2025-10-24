// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [
    {
      id: 'termsandconditions-a3e8065f4f',
      fieldType: 'panel',
      name: 'termsandconditions1725423902420',
      visible: true,
      enabled: true,
      properties: {
        'fd:dor': {
          dorExclusion: false,
          dorExcludeTitle: false,
          dorExcludeDescription: false,
        },
        'fd:path': '/content/talmiz-test-site/index/jcr:content/root/section_2/form/termsandconditions',
      },
      gridClassNames: 'aem-Grid aem-Grid--12 aem-Grid--default--12',
      columnCount: 12,
      columnClassNames: {
        approvalcheckbox: 'aem-GridColumn aem-GridColumn--default--12',
        link: 'aem-GridColumn aem-GridColumn--default--12',
        text: 'aem-GridColumn aem-GridColumn--default--12',
      },
      label: {
        value: 'Terms and conditions',
      },
      events: {
        'custom:setProperty': [
          '$event.payload',
        ],
      },
      ':itemsOrder': [
        'link',
        'approvalcheckbox',
      ],
      allowedComponents: {
        applicable: false,
        components: [],
      },
      items: [
        {
          id: 'checkboxgroup-4bc71e8509',
          fieldType: 'checkbox-group',
          name: 'link1725423922865',
          visible: true,
          type: 'string[]',
          enabled: true,
          enforceEnum: true,
          enumNames: [
            'Terms and conditions of the service.',
            'Privacy policy.',
          ],
          label: {
            value: '',
          },
          events: {
            change: [
              "if(length($field.$value) == length($field.$enum), dispatchEvent($parent.approvalcheckbox, 'custom:setProperty', {enabled : true()}), {})",
            ],
            'custom:setProperty': [
              '$event.payload',
            ],
          },
          properties: {
            'afs:layout': {
              orientation: 'horizontal',
            },
            'fd:dor': {
              dorExclusion: false,
            },
            'fd:path': '/content/talmiz-test-site/index/jcr:content/root/section_2/form/termsandconditions/link',
            'fd:rules': {
              validationStatus: 'valid',
            },
          },
          enum: [
            'dummy-link-1',
            'dummy-link-2',
          ],
          ':type': 'toggleable-link',
        },
        {
          id: 'checkbox-de8f4d881d',
          fieldType: 'checkbox',
          name: 'approvalcheckbox',
          visible: true,
          type: 'string',
          required: true,
          enabled: true,
          enforceEnum: true,
          label: {
            value: 'I agree to the terms & conditions.',
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
            'fd:path': '/content/talmiz-test-site/index/jcr:content/root/section_2/form/termsandconditions/approvalcheckbox',
          },
          ':type': 'core/fd/components/form/checkbox/v1/checkbox',
        },
      ],
      ':type': 'tnc',
    },
  ],
};
