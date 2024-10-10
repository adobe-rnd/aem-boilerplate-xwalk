import { workflowHomeLoanCalculation } from './calhelpers.js';

window.addEventListener('DOMContentLoaded', () => {

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
  const tabs = parentElement.querySelectorAll('.radiotab li');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      renderEmiEligibility(parentElement);
    });
  });
}

export function calculatorTypeTabClick(parentElement) {
  const calculators = parentElement.querySelectorAll('.tab-common');
  calculators.forEach((cal) => {
    cal.addEventListener('click', () => {
      renderEmiEligibility(parentElement);
    });
  });
}

export function renderEmiEligibility(parentElement) {
  const calculators = parentElement.querySelector('.calctabs').children;
  const currentCalculator = Array.from(calculators).filter((element) => element.style.display != 'none')[0];
  const calculatorType = currentCalculator && currentCalculator.classList.contains('emicalculator') ? 'emi' : 'eligibility';

  workflowHomeLoanCalculation(currentCalculator, calculatorType);
}
