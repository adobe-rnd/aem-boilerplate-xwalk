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
import { registerFunctions } from './model/afb-runtime.js';

export default async function registerCustomFunctions(customFunctionsPath, codeBasePath) {
  try {
    // eslint-disable-next-line no-inner-declarations
    function registerFunctionsInRuntime(module) {
      const keys = Object.keys(module);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < keys.length; i++) {
        const name = keys[i];
        const funcDef = module[keys[i]];
        if (typeof funcDef === 'function') {
          const functions = [];
          functions[name] = funcDef;
          registerFunctions(functions);
        }
      }
    }

    const ootbFunctionModule = await import('./functions.js');
    registerFunctionsInRuntime(ootbFunctionModule);
    if (codeBasePath != null && codeBasePath !== undefined && customFunctionsPath
      && customFunctionsPath !== undefined) {
      const customFunctionModule = await import(`${codeBasePath}${customFunctionsPath}`);
      registerFunctionsInRuntime(customFunctionModule);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`error occured while registering custom functions in web worker ${e.message}`);
  }
}
