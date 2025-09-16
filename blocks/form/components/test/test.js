/* eslint-disable no-unused-vars */
import { subscribe } from '../../rules/index.js';
/**
 * Custom test component
 * Based on: Date Input
 */

// configuration
const propertyChanges = [];
const customEvent = '';

let fieldModel = null;

/**
 * Update form field html based on current state
 * @param {HTMLElement} element - The DOM element to update
 * @param {Object} state - The current state data containing field values and properties
 */
function updateView(element, state) {
  if (element && state) {
    // logic to update view goes here..
  }
}

/**
 * Utility function to attach event listeners to the form model
 * Listens to property changes and custom events and updates the view accordingly.
 * @param {Object} model - The form field model instance
 * @param {HTMLElement} fieldDiv - The DOM element containing the field wrapper
 */
function attachEventListeners(model, fieldDiv) {
  model.subscribe((event) => {
    event?.payload?.changes?.forEach((change) => {
      if (propertyChanges.includes(change?.propertyName)) {
        updateView(fieldDiv, model.getState()); // updating the view on property change
      }
    });
  }, 'change');

  if (customEvent) {
    model.subscribe(() => {
      updateView(fieldDiv, model.getState()); // updating the view on custom event trigger
    }, customEvent);
  }
}

/**
 * Decorates a custom form field component
 * @param {HTMLElement} fieldDiv - The DOM element containing the field wrapper.
 * @param {Object} fieldJson - The form json object for the component.
 * @param {HTMLElement} parentElement - The parent element of the field.
 * @param {string} formId - The unique identifier of the form.
 */
export default async function decorate(fieldDiv, fieldJson, parentElement, formId) {
  updateView(fieldDiv, fieldJson); // updating the view on initalise
  subscribe(fieldDiv, formId, (element, model) => {
    fieldModel = model; // persisting the field model in global scope
    attachEventListeners(model, fieldDiv);
  });
}
