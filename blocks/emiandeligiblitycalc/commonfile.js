import { resetCalculator } from './resetCalculator.js';

/* export function xfShowHideBodyClick(findSectionXFShow) {

  body.addEventListener("click", function (e) {

  });
} */

export function firstTabActive(cuurentSection) {
  const calculator = cuurentSection.querySelector('.overlayDiv.show .homeloancalculator');
  const firstTab = calculator.querySelector('.tab-emi-calc');
  const firstCalDiv = calculator.querySelector('.emicalculator');
  resetCalculator(firstCalDiv);
  firstTab.click();
}
