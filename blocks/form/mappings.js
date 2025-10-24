import { loadCSS } from '../../scripts/aem.js';

let customComponents = ['range'];
const OOTBComponentDecorators = ['accordion', 'file', 'modal', 'password', 'rating', 'repeat', 'tnc', 'toggleable-link', 'wizard'];

export function setCustomComponents(components) {
  customComponents = components;
}

export function getOOTBComponents() {
  return OOTBComponentDecorators;
}

export function getCustomComponents() {
  return customComponents;
}

/**
 * Loads a component from the components directory
 * @param {string} componentName - The name of the component to load
 * @param {HTMLElement} element - The DOM element to decorate
 * @param {Object} fd - The form definition object
 * @param {HTMLElement} container - The container element
 * @param {string} formId - The form ID
 * @returns {Promise<HTMLElement>} The decorated element
 */
async function loadComponent(componentName, element, fd, container, formId) {
  const status = element.dataset.componentStatus;
  if (status !== 'loading' && status !== 'loaded') {
    element.dataset.componentStatus = 'loading';
    const { blockName } = element.dataset;
    try {
      loadCSS(`${window.hlx.codeBasePath}/blocks/form/components/${componentName}/${componentName}.css`);
      const decorationComplete = new Promise((resolve) => {
        (async () => {
          try {
            const mod = await import(
              `${window.hlx.codeBasePath}/blocks/form/components/${componentName}/${componentName}.js`
            );
            if (mod.default) {
              await mod.default(element, fd, container, formId);
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(`failed to load component for ${blockName}`, error);
          }
          resolve();
        })();
      });
      await Promise.all([decorationComplete]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`failed to load component ${blockName}`, error);
    }
    element.dataset.componentStatus = 'loaded';
  }
  return element;
}

/**
 * returns a decorator to decorate the field definition
 *
 * */
export default async function componentDecorator(element, fd, container, formId) {
  const { ':type': type = '', fieldType } = fd;
  if (fieldType === 'file-input') {
    await loadComponent('file', element, fd, container, formId);
  }

  if (type.endsWith('wizard')) {
    await loadComponent('wizard', element, fd, container, formId);
  }

  if (getCustomComponents().includes(type) || getOOTBComponents().includes(type)) {
    await loadComponent(type, element, fd, container, formId);
  }

  return null;
}
