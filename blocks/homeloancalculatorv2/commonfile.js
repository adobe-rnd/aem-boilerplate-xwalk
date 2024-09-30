/* import { resetCalculator } from "./resetCalculator.js";


/* export function xfShowHideBodyClick(findSectionXFShow) {
  
  body.addEventListener("click", function (e) {
    
  });
} *)

export function firstTabActive(cuurentSection) {
  let calculator = cuurentSection.querySelector(".show .homeloancalculator");
  let firstTab = calculator.querySelector(".tab-emi-calc");
  let firstCalDiv = calculator.querySelector(".emicalculator");
  resetCalculator(firstCalDiv);
  firstTab.click();
}
 */