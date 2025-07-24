import { calculatorFlatStrLogic, CFApiCall, fetchAPI } from '../../scripts/common.js';
import { homeLoanCalcFunc } from '../emiandeligiblitycalc/homeloancalculators.js';
import { renderCalculatorData } from './renderdatafunc.js';
import { homeloanCalHTML } from '../homeloancalculatorv2/templatehtmlv2.js';

export default async function decorate(block) {
  const cfURL = block.textContent.trim();

  const cfRepsonse = cfURL && await CFApiCall(cfURL);
  const repsonseData = cfRepsonse.data;
  const jsonResponseData = calculatorFlatStrLogic(repsonseData);

  block.innerHTML = homeloanCalHTML(jsonResponseData);

  let elgCalDiv; let
    elgOverlay;

  try {
    elgCalDiv = document.querySelector('.home-page-calculator-call-xf');
    elgOverlay = elgCalDiv.querySelector('.cmp-container--caloverlay');

    const currentSection = document.querySelector('.home-page-calculator-call-xf');

    if (document.querySelector('.home-loan-calculator-parent').classList.contains('combined-emi-eligibility')) {
      document.querySelector('.home-loan-calculator-parent').classList.remove('combined-emi-eligibility');
      document.querySelector('.homeloancalculator').querySelector('.eligibilitycalculator') && (document.querySelector('.homeloancalculator').querySelector('.eligibilitycalculator').style.display = 'block');
    }

    homeLoanCalcFunc(currentSection);

    const calculators = document.querySelectorAll('.homeloancalculator');
    calculators.forEach((cal) => {
      renderCalculatorData(cal);
    });

    readMoreFucn(block);
  } catch (error) {
    console.warn(error);
  }
}

export function readMoreFucn(block) {
  document.querySelector('.discalimer-details').classList.remove('dp-none');
  if (block.querySelector('.discalimer-calc')) {
    const readMoreBtn = block.querySelector('.read-more-discalimer-calc');
    const discalimerContainer = block.querySelector('.disclaimer-container');
    readMoreBtn.addEventListener('click', (e) => {
      if (e.target.textContent.trim() == 'Read more') {
        discalimerContainer.classList.remove('dp-none');
        readMoreBtn.textContent = 'Read less';
      } else if (e.target.textContent.trim() == 'Read less') {
        discalimerContainer.classList.add('dp-none');
        readMoreBtn.textContent = 'Read more';
      }
    });
  }
}
