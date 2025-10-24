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
export default async function applyRuleEngine(form, formTag) {
  try {
    const { fieldIdMap, rules } = form.properties.rules;
    if (rules.length > 0) {
      const RuleEngine = (await import('./RuleEngine.js')).default;
      const ruleEngine = new RuleEngine(rules, fieldIdMap, formTag);
      ruleEngine.enable();
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('unable to apply rules ', e);
  }
}
