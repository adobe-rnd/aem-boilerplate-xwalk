/** ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.

 * Adobe permits you to use and modify this file solely in accordance with
 * the terms of the Adobe license agreement accompanying it.
 ************************************************************************ */
import { createFormInstance } from './model/afb-runtime.js';
import registerCustomFunctions from './functionRegistration.js';
import { fetchData } from '../util.js';
import { LOG_LEVEL } from '../constant.js';

let customFunctionRegistered = false;

export default class RuleEngine {
  rulesOrder = {};

  fieldChanges = [];

  constructor(formDef) {
    this.form = createFormInstance(formDef, undefined, LOG_LEVEL);
    this.form.subscribe((e) => {
      const { payload } = e;
      this.fieldChanges.push(payload);
    }, 'fieldChanged');
  }

  getState() {
    return this.form.getState(true);
  }

  getFieldChanges() {
    return this.fieldChanges;
  }

  getCustomFunctionsPath() {
    return this.form?.properties?.customFunctionsPath || '../functions.js';
  }
}

let ruleEngine; let initPayload;
onmessage = async (e) => {
  async function handleMessageEvent(event) {
    switch (event.data.name) {
      case 'init': {
        const { search, ...formDef } = event.data.payload;
        initPayload = event.data.payload;
        ruleEngine = new RuleEngine(formDef);
        const state = ruleEngine.getState();
        // Informing the main thread that the form is initialized
        postMessage({
          name: 'init',
          payload: state,
        });
        ruleEngine.dispatch = (msg) => {
          postMessage(msg);
        };
        break;
      }
      default:
        break;
    }
  }
  // prefills form data, waits for all async operations
  // to complete, then restores state and syncs field changes to main thread
  if (e.data.name === 'decorated') {
    const { search, ...formDef } = initPayload;
    const data = await fetchData(formDef.id, search);
    if (data) {
      ruleEngine.form.importData(data);
    }
    await ruleEngine.form.waitForPromises();
    postMessage({
      name: 'restore',
      payload: ruleEngine.getState(),
    });
    ruleEngine.getFieldChanges().forEach((changes) => {
      postMessage({
        name: 'fieldChanged',
        payload: changes,
      });
    });
    // informing the main thread that form is ready
    postMessage({
      name: 'sync-complete',
    });
  }

  if (!customFunctionRegistered) {
    const codeBasePath = e?.data?.codeBasePath;
    const customFunctionPath = e?.data?.payload?.properties?.customFunctionsPath;
    registerCustomFunctions(customFunctionPath, codeBasePath).then(() => {
      customFunctionRegistered = true;
      handleMessageEvent(e);
    });
  }
};
