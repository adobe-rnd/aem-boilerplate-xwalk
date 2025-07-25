import { calculatorFlatStrLogic, CFApiCall, currenyCommaSeperation, fetchAPI } from '../../scripts/common.js';
import { homeLoanCalcFunc } from '../emiandeligiblitycalc/homeloancalculators.js';
import { homeloanCalHTML } from '../homeloancalculatorv2/templatehtmlv2.js';

export default async function decorate(block) {
  const cfURL = block.textContent.trim();

  const cfRepsonse = cfURL && await CFApiCall(cfURL);
  const repsonseData = cfRepsonse.data;
  const jsonResponseData = calculatorFlatStrLogic(repsonseData);

  block.innerHTML = homeloanCalHTML(jsonResponseData);

let elgCalDiv; let elgOverlay;

  try {
    elgCalDiv = document.querySelector('.home-page-calculator-call-xf');
    elgOverlay = elgCalDiv.querySelector('.cmp-container--caloverlay');

    const currentSection = document.querySelector('.home-page-calculator-call-xf');

    if (document.querySelector('.home-loan-calculator-parent').classList.contains('combined-emi-eligibility')) {
      document.querySelector('.home-loan-calculator-parent').classList.remove('combined-emi-eligibility');
      /* document.querySelector(".homeloancalculator").querySelector(".eligibilitycalculator") &&
        (document.querySelector(".homeloancalculator").querySelector(".eligibilitycalculator").style.display = "block"); */
    }

    homeLoanCalcFunc(currentSection);
    onloadGSTCalc();
    readMoreFucn(block);
  } catch (error) {
    console.warn(error);
  }
}


function onloadGSTCalc() {
  const isGstCalculator = document.querySelector('.homeloancalculator .gst');

  if (isGstCalculator) {
    const parentElement = isGstCalculator.closest('.homeloancalculator');

    const firstTab = parentElement.querySelector('.tab-emi-calc');
    const secondTab = parentElement.querySelector('.tab-eligibility-calc');
    const gstThirdTab = parentElement.querySelector('.gst-third-tab');
    gstThirdTab.style.display = 'unset';

    [firstTab, secondTab].forEach((tab) => {
      tab.addEventListener('click', () => {
        gstThirdTab.classList.remove('active');
        renderGstCalculatorResult(tab);
      });
    });

    const activeTab = parentElement.querySelector('.headul .tab-common.active');
    let result = 0;

    renderGstCalculatorResult(activeTab);
    parentElement.addEventListener('change', ({ target }) => {
      if (target.tagName == 'INPUT') {
        const currentTab = parentElement.querySelector('.headul .tab-common.active');
        renderGstCalculatorResult(currentTab);
      }
    });

    gstThirdTab.addEventListener('click', () => {
      secondTab.click();
      secondTab.classList.remove('active');
      gstThirdTab.classList.add('active');
    });

    function renderGstCalculatorResult(currentTab) {
      const calculators = parentElement.querySelector('.calctabs').children;
      const currentCalculator = Array.from(calculators).filter((element) => element.style.display != 'none')[0];
      const resultElement = currentCalculator.querySelector('[data-cal-result=resultAmt]');

      if (currentTab == firstTab) {
        const { netPrice, gstRate } = getGstCalculatorInputs(currentCalculator);
        result = buyerCalculation(netPrice, gstRate);
      } else {
        const { productionCost, gstRate, profitRatio } = getGstCalculatorInputs(currentCalculator);
        result = sellerCalculation(productionCost, profitRatio, gstRate);
      }

      resultElement.textContent = `₹${currenyCommaSeperation(Math.round(result))}/-`;
    }
  }
}

function buyerCalculation(netPrice, gstRate) {
  // formula: N*(1+S)
  let value = netPrice * (1 + gstRate * 0.01);
  value = isNaN(value) ? 0 : value;

  return value;
}

function sellerCalculation(productionCost, profitRatio, gstRate) {
  // formula: C*(1+6)*(1+G)
  let value = productionCost * (1 + profitRatio * 0.01) * (1 + gstRate * 0.01);
  value = isNaN(value) ? 0 : value;

  return value;
}

function getGstCalculatorInputs(parentElement) {
  const obj = {};

  obj.netPrice = parentElement.querySelector('[data-cal-input=netprice]')?.value.replaceAll(',', '');
  obj.productionCost = parentElement.querySelector('[data-cal-input=productioncost]')?.value.replaceAll(',', '');
  obj.gstRate = parentElement.querySelector('[data-cal-input=gstrate]')?.value;
  obj.profitRatio = parentElement.querySelector('[data-cal-input=profitratio]')?.value;

  return obj;
}

function readMoreFucn(block) {
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
