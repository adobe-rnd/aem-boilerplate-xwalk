// eslint-disable-next-line import/prefer-default-export
export const ueAddEventForWizardNavigation = {
  request: {
    connections: [
      {
        name: 'aemconnection',
        protocol: 'xwalk',
        uri: 'https://author-p10652-e203356-cmstg.adobeaemcloud.com',
      },
    ],
    target: {
      container: {
        resource: 'urn:aemconnection:/content/ng-test1/index/jcr:content/root/section_0/form/panelcontainer_1310348320/panelcontainer_1137531211',
        type: 'container',
        prop: '',
      },
    },
    content: {
      name: 'text-input',
      xwalk: {
        page: {
          resourceType: 'core/fd/components/form/textinput/v1/textinput',
          template: {
            'jcr:title': 'Text Input',
            fieldType: 'text-input',
            enabled: true,
            visible: true,
          },
        },
      },
    },
  },
  response: {
    updates: [
      {
        resource: 'urn:aemconnection:/content/ng-test1/index/jcr:content/root/section_0/form',
        type: 'container',
        content: '\n<div class="form" data-aue-type="container" data-aue-behavior="component" data-aue-model="form" data-aue-label="Adaptive Form" data-aue-filter="form" data-aue-resource="urn:aemconnection:/content/ng-test1/index/jcr:content/root/section_0/form">\n    <div>\n        <div>\n            <pre>\n                <code>"{\\"id\\":\\"L2NvbnRlbnQvbmctdGVzdDEvaW5kZXgvamNyOmNvbnRlbnQvcm9vdC9zZWN0aW9uXzAvZm9ybQ==\\",\\"fieldType\\":\\"form\\",\\"lang\\":\\"en-US\\",\\"action\\":\\"\\/adobe\\/forms\\/af\\/submit\\/L2NvbnRlbnQvbmctdGVzdDEvaW5kZXgvamNyOmNvbnRlbnQvcm9vdC9zZWN0aW9uXzAvZm9ybQ==\\",\\"properties\\":{\\"fd:path\\":\\"\\/content\\/ng-test1\\/index\\/jcr:content\\/root\\/section_0\\/form\\",\\"fd:schemaType\\":\\"BASIC\\",\\"fd:roleAttribute\\":null,\\"fd:formDataEnabled\\":false},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\":itemsOrder\\":[\\"panelcontainer_1310348320\\"],\\"metadata\\":{\\"version\\":\\"1.0.0\\",\\"grammar\\":\\"json-formula-1.0.0\\"},\\"adaptiveform\\":\\"0.14.0\\",\\":items\\":{\\"panelcontainer_1310348320\\":{\\"id\\":\\"panelcontainer-b74ae79557\\",\\"fieldType\\":\\"panel\\",\\"name\\":\\"panelcontainer_13103483201723535065766\\",\\"visible\\":true,\\"enabled\\":true,\\"label\\":{\\"value\\":\\"Wizard\\"},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\"properties\\":{\\"fd:dor\\":{\\"dorExclusion\\":false,\\"dorExcludeTitle\\":false,\\"dorExcludeDescription\\":false},\\"fd:path\\":\\"\\/content\\/ng-test1\\/index\\/jcr:content\\/root\\/section_0\\/form\\/panelcontainer_1310348320\\"},\\":itemsOrder\\":[\\"panelcontainer\\",\\"panelcontainer_1137531211\\"],\\":items\\":{\\"panelcontainer\\":{\\"id\\":\\"panelcontainer-4a4625c3cf\\",\\"fieldType\\":\\"panel\\",\\"name\\":\\"panelcontainer1723535076091\\",\\"visible\\":true,\\"enabled\\":true,\\"label\\":{\\"value\\":\\"Panel\\"},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\"properties\\":{\\"fd:dor\\":{\\"dorExclusion\\":false,\\"dorExcludeTitle\\":false,\\"dorExcludeDescription\\":false},\\"fd:path\\":\\"\\/content\\/ng-test1\\/index\\/jcr:content\\/root\\/section_0\\/form\\/panelcontainer_1310348320\\/panelcontainer\\"},\\":type\\":\\"core\\/fd\\/components\\/form\\/panelcontainer\\/v1\\/panelcontainer\\"},\\"panelcontainer_1137531211\\":{\\"id\\":\\"panelcontainer-6a979252b1\\",\\"fieldType\\":\\"panel\\",\\"name\\":\\"panelcontainer_11375312111723535082103\\",\\"visible\\":true,\\"enabled\\":true,\\"label\\":{\\"value\\":\\"Panel\\"},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\"properties\\":{\\"fd:dor\\":{\\"dorExclusion\\":false,\\"dorExcludeTitle\\":false,\\"dorExcludeDescription\\":false},\\"fd:path\\":\\"\\/content\\/ng-test1\\/index\\/jcr:content\\/root\\/section_0\\/form\\/panelcontainer_1310348320\\/panelcontainer_1137531211\\"},\\":itemsOrder\\":[\\"textinput\\"],\\":items\\":{\\"textinput\\":{\\"id\\":\\"textinput-13fde840f6\\",\\"fieldType\\":\\"text-input\\",\\"name\\":\\"textinput\\",\\"visible\\":true,\\"type\\":\\"string\\",\\"enabled\\":true,\\"label\\":{\\"value\\":\\"Text Input\\"},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\"properties\\":{\\"fd:dor\\":{\\"dorExclusion\\":false},\\"fd:path\\":\\"\\/content\\/ng-test1\\/index\\/jcr:content\\/root\\/section_0\\/form\\/panelcontainer_1310348320\\/panelcontainer_1137531211\\/textinput\\"},\\":type\\":\\"core\\/fd\\/components\\/form\\/textinput\\/v1\\/textinput\\"}},\\":type\\":\\"core\\/fd\\/components\\/form\\/panelcontainer\\/v1\\/panelcontainer\\"}},\\":type\\":\\"wizard\\"}},\\":type\\":\\"fd\\/franklin\\/components\\/form\\/v1\\/form\\"}"</code>\n            </pre>\n        </div>\n    </div>\n</div>\n',
      },
    ],
    resource: 'urn:aemconnection:/content/ng-test1/index/jcr:content/root/section_0/form/panelcontainer_1310348320/panelcontainer_1137531211/textinput',
  },
};
