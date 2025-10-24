// eslint-disable-next-line import/prefer-default-export
export const uePatchTitleEvent = {
  request: {
    connections: [
      {
        name: 'aemconnection',
        protocol: 'xwalk',
        uri: 'https://author-p10652-e203356-cmstg.adobeaemcloud.com',
      },
    ],
    target: {
      resource: 'urn:aemconnection:/content/ng-test1/index/jcr:content/root/section_0/form/panelcontainer_968965795/textinput',
      type: 'component',
      prop: '',
    },
    patch: [
      {
        op: 'replace',
        path: '/jcr:title',
        value: 'Text Input new',
      },
    ],
  },
  response: {
    updates: [
      {
        resource: 'urn:aemconnection:/content/ng-test1/index/jcr:content/root/section_0/form',
        content: '\n<div class="form" data-aue-type="container" data-aue-behavior="component" data-aue-model="form" data-aue-label="Adaptive Form" data-aue-filter="form" data-aue-resource="urn:aemconnection:/content/ng-test1/index/jcr:content/root/section_0/form">\n    <div>\n        <div>\n            <pre>\n                <code>"{\\"id\\":\\"L2NvbnRlbnQvbmctdGVzdDEvaW5kZXgvamNyOmNvbnRlbnQvcm9vdC9zZWN0aW9uXzAvZm9ybQ==\\",\\"fieldType\\":\\"form\\",\\"lang\\":\\"en-US\\",\\"action\\":\\"\\/adobe\\/forms\\/af\\/submit\\/L2NvbnRlbnQvbmctdGVzdDEvaW5kZXgvamNyOmNvbnRlbnQvcm9vdC9zZWN0aW9uXzAvZm9ybQ==\\",\\"properties\\":{\\"fd:path\\":\\"\\/content\\/ng-test1\\/index\\/jcr:content\\/root\\/section_0\\/form\\",\\"fd:schemaType\\":\\"BASIC\\",\\"fd:roleAttribute\\":null,\\"fd:formDataEnabled\\":false},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\":itemsOrder\\":[\\"panelcontainer_968965795\\"],\\"metadata\\":{\\"version\\":\\"1.0.0\\",\\"grammar\\":\\"json-formula-1.0.0\\"},\\"adaptiveform\\":\\"0.14.0\\",\\":type\\":\\"fd\\/franklin\\/components\\/form\\/v1\\/form\\",\\":items\\":{\\"panelcontainer_968965795\\":{\\"id\\":\\"panelcontainer-5012648f84\\",\\"fieldType\\":\\"panel\\",\\"name\\":\\"panelcontainer_9689657951723632917367\\",\\"visible\\":true,\\"enabled\\":true,\\"label\\":{\\"value\\":\\"Panel\\"},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\"properties\\":{\\"fd:dor\\":{\\"dorExclusion\\":false,\\"dorExcludeTitle\\":false,\\"dorExcludeDescription\\":false},\\"fd:path\\":\\"\\/content\\/ng-test1\\/index\\/jcr:content\\/root\\/section_0\\/form\\/panelcontainer_968965795\\"},\\":itemsOrder\\":[\\"textinput\\"],\\":type\\":\\"core\\/fd\\/components\\/form\\/panelcontainer\\/v1\\/panelcontainer\\",\\":items\\":{\\"textinput\\":{\\"id\\":\\"textinput-3eb2e7d0b6\\",\\"fieldType\\":\\"text-input\\",\\"name\\":\\"textinput1723788365526\\",\\"visible\\":true,\\"type\\":\\"string\\",\\"enabled\\":true,\\"label\\":{\\"value\\":\\"Text Input new\\"},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\"properties\\":{\\"fd:dor\\":{\\"dorExclusion\\":false},\\"fd:path\\":\\"\\/content\\/ng-test1\\/index\\/jcr:content\\/root\\/section_0\\/form\\/panelcontainer_968965795\\/textinput\\"},\\":type\\":\\"core\\/fd\\/components\\/form\\/textinput\\/v1\\/textinput\\"}}}}}"</code>\n            </pre>\n        </div>\n    </div>\n</div>\n',
      },
    ],
  },
  patch: {
    name: 'jcr:title',
    value: 'Text Input new',
  },
};
