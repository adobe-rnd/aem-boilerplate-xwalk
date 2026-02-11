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

const preloadedUrls = new Set();

/**
 * Preloads script URLs so the browser fetches them once; main and worker
 * then get cache on import(). Call as soon as formDef is available (runtime).
 * customFunctionsPath comes from form JSON (formDef.properties.customFunctionsPath).
 * @param {string} [customFunctionsPath] - From formDef.properties.customFunctionsPath
 * @param {string} [codeBasePath] - e.g. window.hlx?.codeBasePath
 */
export function preloadFunctionScripts(customFunctionsPath, codeBasePath) {
  if (typeof document === 'undefined' || !document?.head) return;
  const base = (typeof codeBasePath === 'string' && codeBasePath !== '')
    ? codeBasePath.replace(/\/$/, '')
    : '';
  const prefix = base ? `${base}/` : '/';
  const paths = [`${prefix}blocks/form/rules/functions.js`];
  if (typeof customFunctionsPath === 'string' && customFunctionsPath.trim() !== '') {
    paths.push(`${prefix}${customFunctionsPath.replace(/^\//, '').trim()}`);
  }
  paths.forEach((href) => {
    try {
      const url = href.startsWith('http') ? href : new URL(href, window.location.origin).href;
      if (preloadedUrls.has(url)) return;
      preloadedUrls.add(url);
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = url;
      document.head.appendChild(link);
    } catch {
      // Skip invalid URL or DOM error; do not break form init
    }
  });
}

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
