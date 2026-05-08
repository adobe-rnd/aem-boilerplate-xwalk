import accordion from '../../../blocks/form/components/accordion/accordion.js';
import file from '../../../blocks/form/components/file/file.js';
import modal from '../../../blocks/form/components/modal/modal.js';
import password from '../../../blocks/form/components/password/password.js';
import range from '../../../blocks/form/components/range/range.js';
import rating from '../../../blocks/form/components/rating/rating.js';
import repeat from '../../../blocks/form/components/repeat/repeat.js';
import tnc from '../../../blocks/form/components/tnc/tnc.js';
import toggleableLink from '../../../blocks/form/components/toggleable-link/toggleable-link.js';
import wizard from '../../../blocks/form/components/wizard/wizard.js';

const registry = {
  accordion,
  file,
  modal,
  password,
  range,
  rating,
  repeat,
  tnc,
  'toggleable-link': toggleableLink,
  wizard,
};

let customComponents = ['range'];
const OOTBComponentDecorators = Object.keys(registry);

export function setCustomComponents(components) {
  customComponents = components;
}

export function getOOTBComponents() {
  return OOTBComponentDecorators;
}

export function getCustomComponents() {
  return customComponents;
}

export default async function componentDecorator(element, fd, container, formId) {
  const { ':type': type = '', fieldType } = fd;

  const toLoad = [];
  if (type.endsWith('wizard')) toLoad.push('wizard');
  if (registry[type] && !toLoad.includes(type)) toLoad.push(type);
  if (fieldType === 'file-input' && !toLoad.includes('file')) toLoad.push('file');

  for (const key of toLoad) {
    const mod = registry[key];
    if (mod?.default) {
      // eslint-disable-next-line no-await-in-loop
      await mod.default(element, fd, container, formId);
    }
  }

  return null;
}
