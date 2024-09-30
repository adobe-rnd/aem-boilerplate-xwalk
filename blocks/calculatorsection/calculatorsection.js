import { fetchAPI } from "../../scripts/scripts.js";
import { homeLoanCalcFunc } from "../emiandeligiblitycalc/homeloancalculators.js";
import { renderCalculatorData } from "./renderdatafunc.js";
import { homeloanCalHTML } from "../homeloancalculatorv2/templatehtmlv2.js";

export default async function decorate(block) {
  let cfURL = block.textContent.trim();

  const cfRepsonse = await CFApiCall(cfURL);
  const repsonseData = cfRepsonse.data[0].data;
  const jsonResponseData = JSON.parse(repsonseData);

  block.innerHTML = homeloanCalHTML(jsonResponseData);

  let elgCalDiv, elgOverlay;

  try {
    elgCalDiv = document.querySelector(".home-page-calculator-call-xf");
    elgOverlay = elgCalDiv.querySelector(".cmp-container--caloverlay");

    const currentSection = document.querySelector(".home-page-calculator-call-xf");

    if (document.querySelector(".home-loan-calculator-parent").classList.contains("combined-emi-eligibility")) {
      document.querySelector(".home-loan-calculator-parent").classList.remove("combined-emi-eligibility");
      document.querySelector(".homeloancalculator").querySelector(".eligibilitycalculator") && (document.querySelector(".homeloancalculator").querySelector(".eligibilitycalculator").style.display = "block");
    }

    homeLoanCalcFunc(currentSection);

    let calculators = document.querySelectorAll(".homeloancalculator");
    calculators.forEach((cal) => {
      renderCalculatorData(cal);
    });

    readMoreFucn(block);
  } catch (error) {
    console.warn(error);
  }
}

export async function CFApiCall(cfurl) {
  const response = await fetchAPI("GET", cfurl);
  const responseJson = await response.json();
  return responseJson;
}

export function readMoreFucn(block) {
  document.querySelector('.discalimer-details').classList.remove('dp-none');
  if (block.querySelector(".discalimer-calc")) {
    const readMoreBtn = block.querySelector(".read-more-discalimer-calc");
    const discalimerContainer = block.querySelector(".disclaimer-container");
    readMoreBtn.addEventListener("click", (e) => {
      if(e.target.textContent.trim() == "Read more"){
        discalimerContainer.classList.remove('dp-none');
        readMoreBtn.textContent = "Read less"
      }else if(e.target.textContent.trim() == "Read less"){
        discalimerContainer.classList.add('dp-none');
        readMoreBtn.textContent = "Read more";
      }
    });
  }
}
