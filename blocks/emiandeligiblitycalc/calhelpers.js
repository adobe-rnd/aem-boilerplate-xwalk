import { currenyCommaSeperation } from '../../scripts/common.js';
import { calculator } from './bizemielical.js';
import { getCalculatorInput } from './getcalculatordata.js';

export function workflowHomeLoanCalculation(currentCalculator, calType) {
  const resultObj = getCalculationResult(currentCalculator, calType);
  // console.log(resultObj);

  if (resultObj != null) {
    renderData(currentCalculator, resultObj);
  }
}

export function getCalculationResult(currentCalculator, calculatorType) {
  const calDataObj = getCalculatorInput(currentCalculator, calculatorType);
  const fn = calculator(calDataObj);
  return fn ? fn.result() : null;
}

export function renderData(parentElement, resultObj) {
  const nullDom = {};
  const resultAmtElement = parentElement.querySelector('[data-cal-result=resultAmt]') || nullDom;
  const principalAmtElement = parentElement.querySelector('[data-cal-result=principalAmt]') || nullDom;
  const interestAmtElement = parentElement.querySelector('[data-cal-result=interestAmt]') || nullDom;
  // console.log(JSON.stringify(resultObj));
  resultAmtElement.textContent = `₹${currenyCommaSeperation(resultObj.result ? resultObj.result : 0)}/-`;
  principalAmtElement.textContent = currenyCommaSeperation(resultObj.principalAmt ? resultObj.principalAmt : 0);
  interestAmtElement.textContent = currenyCommaSeperation(resultObj.interestAmt ? resultObj.interestAmt : 0);
}
