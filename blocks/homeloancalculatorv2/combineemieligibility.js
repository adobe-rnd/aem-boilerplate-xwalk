import { workflowHomeLoanCalculation } from "./calhelpers.js";

window.addEventListener("DOMContentLoaded", function() {

   /*  let isCombinedEmiEligibility = document.querySelector(".combined-emi-eligibility");
    if(isCombinedEmiEligibility) {
        let parentElement = isCombinedEmiEligibility.closest(".homeloancalculator");
        renderEmiEligibility(parentElement);
        mainTabClick(parentElement);
        calculatorTypeTabClick(parentElement);

        parentElement.addEventListener("change", function({target}) {
            if(target.tagName != "INPUT") return;

            renderEmiEligibility(parentElement);
        });

    } */

});


export function mainTabClick(parentElement) {
    let tabs = parentElement.querySelectorAll(".radiotab li");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            renderEmiEligibility(parentElement);
        });
    });
}

export function calculatorTypeTabClick(parentElement) {
    let calculators = parentElement.querySelectorAll(".tab-common");
    calculators.forEach(cal => {
        cal.addEventListener("click", function() {
            renderEmiEligibility(parentElement);
        });
    });
}

export function renderEmiEligibility(parentElement) {
    
    let calculators = parentElement.querySelector(".calctabs").children;
    let currentCalculator = Array.from(calculators).filter( element => element.style.display != "none")[0];
    let calculatorType = currentCalculator && currentCalculator.classList.contains("emicalculator") ? "emi" : "eligibility";

    workflowHomeLoanCalculation(currentCalculator, calculatorType);
}

