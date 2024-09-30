import { workflowHomeLoanCalculation } from "../emiandeligiblitycalc/calhelpers.js";

export function renderCalculatorData(calculator) {
    let calType = getCalType(calculator);

    workflowHomeLoanCalculation(calculator, calType);

    calculator.addEventListener("change", function({currentTarget}) {
        let calType = getCalType(currentTarget);
        workflowHomeLoanCalculation(currentTarget, calType);
    });

    if(calType != "emi") {
        let calTabs = calculator.querySelectorAll(".onetab, .twotab");
        calTabs.forEach(t => t.addEventListener("click", function({currentTarget}){ 
            let calculator = currentTarget.closest(".homeloancalculator");
            let calType = getCalType(calculator);
            workflowHomeLoanCalculation(calculator, calType);
        }));
    }
}

export function getCalType(calculator) {
    return calculator.querySelector(".home-loan-calculator-parent.emi") ? "emi" : "eligibility"
}