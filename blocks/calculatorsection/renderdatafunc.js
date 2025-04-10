import { workflowHomeLoanCalculation } from '../emiandeligiblitycalc/calhelpers.js';

export function renderCalculatorData(calculator) {
  const calType = getCalType(calculator);

  workflowHomeLoanCalculation(calculator, calType);

  calculator.addEventListener('change', ({ currentTarget }) => {
    const calType = getCalType(currentTarget);
    workflowHomeLoanCalculation(currentTarget, calType);
  });

  if (calType != 'emi') {
    const calTabs = calculator.querySelectorAll('.onetab, .twotab');
    calTabs.forEach((t) => t.addEventListener('click', ({ currentTarget }) => {
      const calculator = currentTarget.closest('.homeloancalculator');
      const calType = getCalType(calculator);
      workflowHomeLoanCalculation(calculator, calType);
    }));
  }
}

export function getCalType(calculator) {
  return calculator.querySelector('.home-loan-calculator-parent.emi') ? 'emi' : 'eligibility';
}
