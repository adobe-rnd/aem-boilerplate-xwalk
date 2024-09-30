import { loanFormUTM } from "./loanutm.js";

export function loanTypeDropdownSelect() {
  let loanTypeInput = document.querySelector("#form-loan-type");
  let loanTypeDrpParent = document.querySelector(".loan-form-drpdown");
  if(loanTypeDrpParent) {
    let loanOption = loanTypeDrpParent.querySelectorAll(".subpoints");
    const redirectionLonTypes = ["loan less than 5 lacs"];
    loanOption.forEach(option => {
      option.addEventListener("click", () => {
        let optionTxt = option.textContent.trim();
        loanTypeInput.value = optionTxt;
        if(redirectionLonTypes.includes(optionTxt.toLocaleLowerCase())) {
          loanFormUTM();
        }
      });
    });
  }
}