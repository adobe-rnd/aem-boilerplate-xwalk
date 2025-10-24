// eslint-disable-next-line import/prefer-default-export
export const uePatchEventForRepeatablePanel = {
  request: {
    connections: [
      {
        name: 'aemconnection',
        protocol: 'xwalk',
        uri: 'https://author-p10652-e203356-cmstg.adobeaemcloud.com',
      },
    ],
    target: {
      resource: 'urn:aemconnection:/content/forms/af/repeatable-panel/jcr:content/root/section/form/panelcontainer',
      type: 'component',
      prop: '',
    },
    patch: [
      {
        op: 'replace',
        path: '/repeatAddButtonLabel',
        value: 'Add New',
      },
    ],
  },
  response: {
    updates: [
      {
        resource: 'urn:aemconnection:/content/forms/af/repeatable-panel/jcr:content/root/section/form',
        content: '\n<div class="form" data-aue-type="container" data-aue-behavior="component" data-aue-model="form" data-aue-label="Adaptive Form" data-aue-filter="form" data-aue-resource="urn:aemconnection:/content/forms/af/repeatable-panel/jcr:content/root/section/form">\n    <div>\n        <div>\n            <pre>\n                <code>"{\\"id\\":\\"L2NvbnRlbnQvZm9ybXMvYWYvcmVwZWF0YWJsZS1wYW5lbA\\",\\"fieldType\\":\\"form\\",\\"lang\\":\\"en-US\\",\\"action\\":\\"\\/adobe\\/forms\\/af\\/submit\\/L2NvbnRlbnQvZm9ybXMvYWYvcmVwZWF0YWJsZS1wYW5lbA==\\",\\"properties\\":{\\"fd:path\\":\\"\\/content\\/forms\\/af\\/repeatable-panel\\/jcr:content\\/root\\/section\\/form\\",\\"fd:schemaType\\":\\"BASIC\\",\\"fd:formDataEnabled\\":false},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\":itemsOrder\\":[\\"panelcontainer\\"],\\"metadata\\":{\\"version\\":\\"1.0.0\\",\\"grammar\\":\\"json-formula-1.0.0\\"},\\"adaptiveform\\":\\"0.14.0\\",\\":type\\":\\"fd\\/franklin\\/components\\/form\\/v1\\/form\\",\\":items\\":{\\"panelcontainer\\":{\\"id\\":\\"panelcontainer\\",\\"fieldType\\":\\"panel\\",\\"repeatable\\":true,\\"name\\":\\"panelcontainer\\",\\"visible\\":true,\\"enabled\\":true,\\"label\\":{\\"value\\":\\"Repeatable Panel\\"},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\"properties\\":{\\"fd:dor\\":{\\"dorExclusion\\":false,\\"dorExcludeTitle\\":false,\\"dorExcludeDescription\\":false},\\"fd:path\\":\\"\\/content\\/forms\\/af\\/repeatable-panel\\/jcr:content\\/root\\/section\\/form\\/panelcontainer\\",\\"variant\\":\\"addDeleteButtons\\",\\"repeatAddButtonLabel\\":\\"Add New\\",\\"repeatDeleteButtonLabel\\":\\"Delete\\"},\\":itemsOrder\\":[\\"textinput\\"],\\":type\\":\\"core\\/fd\\/components\\/form\\/panelcontainer\\/v1\\/panelcontainer\\",\\":items\\":{\\"textinput\\":{\\"id\\":\\"textinput-8110743bb8\\",\\"fieldType\\":\\"text-input\\",\\"name\\":\\"textinput1736403046407\\",\\"visible\\":true,\\"type\\":\\"string\\",\\"enabled\\":true,\\"label\\":{\\"value\\":\\"Text Input\\"},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\"properties\\":{\\"fd:dor\\":{\\"dorExclusion\\":false},\\"fd:path\\":\\"\\/content\\/forms\\/af\\/repeatable-panel\\/jcr:content\\/root\\/section\\/form\\/panelcontainer\\/textinput\\"},\\":type\\":\\"core\\/fd\\/components\\/form\\/textinput\\/v1\\/textinput\\"}}}}}"</code>\n            </pre>\n        </div>\n    </div>\n</div>\n',
      },
    ],
  }
}; 