/* import { renderCalculatorData } from "./renderhpcal.js";
import { firstTabActive } from "./commonfile.js"; */
import { homeloanCalHTML } from "./templatehtmlv2.js";
import { homeLoanCalcFunc } from "./homeloancalculators.js";
import { calculatorTypeTabClick, mainTabClick, renderEmiEligibility } from "./combineemieligibility.js";
import { fetchAPI } from "../../scripts/scripts.js";

 
let calculatorType, emiCalDiv, emiOverlay;

export default async function decorate(block) {
  let cfURL = block.textContent.trim();
  
  const cfRepsonse = cfURL && await CFApiCall(cfURL);
  const repsonseData = cfRepsonse && cfRepsonse.data[0].data;
  const jsonResponseData = repsonseData && JSON.parse(repsonseData)

  if(!jsonResponseData) return;

  block.innerHTML = homeloanCalHTML(jsonResponseData);

  try {
    let currentSection = document.querySelector(".home-page-calculator-call-xf");
    let calculatorType = currentSection.querySelector('.tab-emi-calc.active');

    if(calculatorType.classList.contains('tab-emi-calc')){
      calculatorType = 'emi';
    }else if(calculatorType.classList.contains('tab-eligibility-calc')){
      calculatorType = 'eligibility';
    }

    let calDefaultValueObj = {};

    let calculators = document.querySelectorAll(".homeloancalculator .calctabs .commoncalculator");
    
    calculators.forEach((cal, index) => {
        const resetId = "calid-" + index;
        cal.dataset.resetId = resetId;
        calDefaultValueObj[resetId] = Object.fromEntries([...cal.querySelectorAll("input[type=range]")].map(input => [input.id, input.value]));
    });

    sessionStorage.setItem("calDefaultValueObj", JSON.stringify(calDefaultValueObj));

    homeLoanCalcFunc(currentSection);

    let isCombinedEmiEligibility = document.querySelector(".combined-emi-eligibility");
    if(isCombinedEmiEligibility) {
        let parentElement = isCombinedEmiEligibility.closest(".homeloancalculator");
        renderEmiEligibility(parentElement);
        mainTabClick(parentElement);
        calculatorTypeTabClick(parentElement);

        parentElement.addEventListener("change", function({target}) {
            if(target.tagName != "INPUT") return;
            renderEmiEligibility(parentElement);
        });

    }

  /* renderCalculatorData(currentSection, calculatorType);
  firstTabActive(currentSection); */

  } catch (error) {
    console.warn(error);
  }
}

export async function CFApiCall(cfurl) {
  // const cfModification = cfurl?.replace("/content/dam/", "/api/assets/");
  const response = await fetchAPI("GET", cfurl);
  const responseJson = await response.json();
  return responseJson;
}

/* export function homeLoancalculatorCallXf() {
  document.querySelectorAll("[data-teaserv2-xf='home-page-calculator-call-xf']") &&
    document.querySelectorAll("[data-teaserv2-xf='home-page-calculator-call-xf']").forEach((eachTeaserv2) => {
      eachTeaserv2.addEventListener("click", function (e) {
        e.stopImmediatePropagation();
        const xfGetAttr = this.getAttribute("data-teaserv2-xf");
        const findSectionXFShow = document.querySelector("." + xfGetAttr);
        const currentSection = document.querySelector(".home-page-calculator-call-xf .homeloancalculator-wrapper");
        findSectionXFShow.querySelector(".overlayDiv").classList.add("show");
        if (xfGetAttr == "home-page-calculator-call-xf") {
          findSectionXFShow.classList.remove("dp-none"); // look
          calculatorType = "emi";
          emiOverlay.classList.add("show");
          document.querySelector(".modal-overlay").classList.add("overlay");
          document.querySelector(".modal-overlay").classList.remove("dp-none");
          document.body.style.overflow = "hidden";
          homeLoanCalcFunc(currentSection);
          renderCalculatorData(currentSection, calculatorType);
          firstTabActive(currentSection);
        }
        targetObject.model = currentSection;
        // xfShowHideBodyClick(currentSection);
      });
    });
} */

