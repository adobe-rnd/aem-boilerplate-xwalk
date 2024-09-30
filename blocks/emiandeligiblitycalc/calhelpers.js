import { currenyCommaSeperation } from "../../scripts/scripts.js";
import { calculator } from "../emiandeligiblitycalc/bizemielical.js";
import { getCalculatorInput } from "../emiandeligiblitycalc/getcalculatordata.js";

export function workflowHomeLoanCalculation(currentCalculator, calType) {
    let resultObj = getCalculationResult(currentCalculator, calType);
    //console.log(resultObj);

    if(resultObj != null) {
        renderData(currentCalculator, resultObj);
    }
}

export function getCalculationResult(currentCalculator, calculatorType) {
    let calDataObj = getCalculatorInput(currentCalculator, calculatorType)
    const fn = calculator(calDataObj);
    return fn ? fn.result() : null;
}

export function renderData(parentElement, resultObj) {
    let nullDom = {};
    let resultAmtElement = parentElement.querySelector("[data-cal-result=resultAmt]") || nullDom;
    let principalAmtElement = parentElement.querySelector("[data-cal-result=principalAmt]") || nullDom;
    let interestAmtElement = parentElement.querySelector("[data-cal-result=interestAmt]") || nullDom;
    //console.log(JSON.stringify(resultObj));
    resultAmtElement.textContent = "₹" + currenyCommaSeperation(resultObj.result ? resultObj.result : 0) + "/-";
    principalAmtElement.textContent = currenyCommaSeperation(resultObj.principalAmt ? resultObj.principalAmt : 0);
    interestAmtElement.textContent = currenyCommaSeperation(resultObj.interestAmt ? resultObj.interestAmt : 0);   
}