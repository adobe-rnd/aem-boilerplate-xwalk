// eslint-disable-next-line import/prefer-default-export
export const ueAddEvent = {
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
        resource: 'urn:aemconnection:/content/ng-new/index/jcr:content/root/section_0/form/panelcontainer',
        type: 'container',
        prop: '',
      },
    },
    content: {
      name: 'panel',
      xwalk: {
        page: {
          resourceType: 'core/fd/components/form/panelcontainer/v1/panelcontainer',
          template: {
            'jcr:title': 'Panel',
            fieldType: 'panel',
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
        resource: 'urn:aemconnection:/content/ng-new/index/jcr:content/root/section_0/form',
        type: 'container',
        content: '\n<div class="form" data-aue-type="container" data-aue-behavior="component" data-aue-model="form" data-aue-label="Adaptive Form" data-aue-filter="form" data-aue-resource="urn:aemconnection:/content/ng-new/index/jcr:content/root/section_0/form">\n    <div>\n        <div>\n            <pre>\n                <code>"{\\"id\\":\\"L2NvbnRlbnQvbmctbmV3L2luZGV4L2pjcjpjb250ZW50L3Jvb3Qvc2VjdGlvbl8wL2Zvcm0=\\",\\"fieldType\\":\\"form\\",\\"lang\\":\\"en-US\\",\\"action\\":\\"\\/adobe\\/forms\\/af\\/submit\\/L2NvbnRlbnQvbmctbmV3L2luZGV4L2pjcjpjb250ZW50L3Jvb3Qvc2VjdGlvbl8wL2Zvcm0=\\",\\"properties\\":{\\"fd:path\\":\\"\\/content\\/ng-new\\/index\\/jcr:content\\/root\\/section_0\\/form\\",\\"fd:schemaType\\":\\"BASIC\\",\\"fd:roleAttribute\\":null,\\"fd:formDataEnabled\\":false},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\":itemsOrder\\":[\\"panelcontainer\\"],\\"metadata\\":{\\"version\\":\\"1.0.0\\",\\"grammar\\":\\"json-formula-1.0.0\\"},\\"adaptiveform\\":\\"0.14.0\\",\\":type\\":\\"fd\\/franklin\\/components\\/form\\/v1\\/form\\",\\":items\\":{\\"panelcontainer\\":{\\"id\\":\\"panelcontainer-c39a980bad\\",\\"fieldType\\":\\"panel\\",\\"name\\":\\"panelcontainer1721825915375\\",\\"visible\\":true,\\"enabled\\":true,\\"label\\":{\\"value\\":\\"Wizard\\"},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\"properties\\":{\\"fd:dor\\":{\\"dorExclusion\\":false,\\"dorExcludeTitle\\":false,\\"dorExcludeDescription\\":false},\\"fd:path\\":\\"\\/content\\/ng-new\\/index\\/jcr:content\\/root\\/section_0\\/form\\/panelcontainer\\"},\\":itemsOrder\\":[\\"panelcontainer\\"],\\":type\\":\\"wizard\\",\\":items\\":{\\"panelcontainer\\":{\\"id\\":\\"panelcontainer-215d71f184\\",\\"fieldType\\":\\"panel\\",\\"name\\":\\"panelcontainer\\",\\"visible\\":true,\\"enabled\\":true,\\"label\\":{\\"value\\":\\"Panel\\"},\\"events\\":{\\"custom:setProperty\\":[\\"$event.payload\\"]},\\"properties\\":{\\"fd:dor\\":{\\"dorExclusion\\":false,\\"dorExcludeTitle\\":false,\\"dorExcludeDescription\\":false},\\"fd:path\\":\\"\\/content\\/ng-new\\/index\\/jcr:content\\/root\\/section_0\\/form\\/panelcontainer\\/panelcontainer\\"},\\":type\\":\\"core\\/fd\\/components\\/form\\/panelcontainer\\/v1\\/panelcontainer\\"}}}}}"</code>\n            </pre>\n        </div>\n    </div>\n</div>\n',
      },
    ],
    resource: 'urn:aemconnection:/content/ng-new/index/jcr:content/root/section_0/form/panelcontainer/panelcontainer',
  },
};
