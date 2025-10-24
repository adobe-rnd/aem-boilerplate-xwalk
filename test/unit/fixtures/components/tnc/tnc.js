import sinon from 'sinon';

global.IntersectionObserver = sinon.stub().returns({
  observe: sinon.spy(),
  unobserve: sinon.spy(),
});

// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [
    {
      id: 'termsandconditions-a3e8065f4f',
      fieldType: 'panel',
      name: 'termsandconditions1725421129697',
      description: '<p>This is a help text.</p>',
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
        'text',
        'approvalcheckbox',
      ],
      allowedComponents: {
        applicable: false,
        components: [],
      },
      items: [
        {
          id: 'text-e9e5c0bb43',
          dataRef: null,
          fieldType: 'plain-text',
          name: 'text1725421129728',
          value: 'Text related to the terms and conditions come here.',
          richText: true,
          events: {
            'custom:setProperty': [
              '$event.payload',
            ],
          },
          properties: {
            'fd:dor': {
              dorExclusion: false,
            },
            'fd:path': '/content/talmiz-test-site/index/jcr:content/root/section_2/form/termsandconditions/text',
          },
          ':type': 'core/fd/components/form/text/v1/text',
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
