import { subscribe } from '../../rules/index.js';
import { decorateIcons } from '../../../../scripts/aem.js';

export class Modal {
  constructor() {
    this.dialog = null;
    this.fieldModel = null;
    this.panel = null;
    this.modalWrapper = null;
    this.originalContent = null; // Store original content
  }

  createDialog(panel) {
    const dialog = document.createElement('dialog');
    const dialogContent = document.createElement('div');
    dialogContent.classList.add('modal-content');
    // First time initialization - store original content
    if (!this.originalContent) {
      this.originalContent = [...panel.childNodes];
    }

    // Move the original nodes to the dialog content
    // This preserves all event listeners and attached logic
    this.originalContent.forEach((node) => {
      dialogContent.appendChild(node);
    });
    dialog.append(dialogContent);
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.type = 'button';
    closeButton.innerHTML = '<span class="icon icon-close"></span>';
    dialog.append(closeButton);
    decorateIcons(closeButton);
    dialog.addEventListener('click', (event) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (event.clientX < dialogDimensions.left || event.clientX > dialogDimensions.right
        || event.clientY < dialogDimensions.top || event.clientY > dialogDimensions.bottom) {
        dialog.close();
      }
    });
    dialog.querySelector('.close-button').addEventListener('click', () => {
      dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      // Move the content back to the panel when dialog closes
      const modalContent = dialog.querySelector('.modal-content');
      while (modalContent.firstChild) {
        this.panel.appendChild(modalContent.firstChild);
      }

      dialog.remove();
      if (this.fieldModel) {
        this.fieldModel.visible = false;
      }
    });
    return dialog;
  }

  showModal() {
    // If dialog was previously removed, recreate it
    if (!this.dialog || !this.dialog.isConnected) {
      this.dialog = this.createDialog(this.panel);
      if (this.modalWrapper) {
        this.modalWrapper.appendChild(this.dialog);
      }
    }

    if (this.dialog.isConnected) {
      this.dialog.showModal();
      document.body.classList.add('modal-open');
      setTimeout(() => {
        this.dialog.querySelector('.modal-content').scrollTop = 0;
      }, 0);
    }
  }

  setFieldModel(model) {
    this.fieldModel = model;
  }

  wrapDialog(panel) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('modal');
    wrapper.appendChild(this.dialog);
    panel.appendChild(wrapper);
    this.modalWrapper = wrapper;
  }

  decorate(panel) {
    this.panel = panel;
    this.dialog = this.createDialog(panel);
    this.wrapDialog(panel);
  }
}

export default async function decorate(panel, panelJson, container, formId) {
  const modal = new Modal();
  modal.decorate(panel);
  subscribe(panel, formId, async (fieldDiv, fieldModel) => {
    modal.setFieldModel(fieldModel);
    fieldModel.subscribe((e) => {
      const { payload } = e;
      payload?.changes?.forEach((change) => {
        if (change?.propertyName === 'visible' && change?.currentValue === true) {
          modal.showModal();
        }
      });
    }, 'change');
  });
  return panel;
}
