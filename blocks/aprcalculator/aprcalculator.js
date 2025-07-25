import { calculatorFlatStrLogic, CFApiCall, fetchAPI } from '../../scripts/common.js';
import { homeLoanCalcFunc } from '../emiandeligiblitycalc/homeloancalculators.js';
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
      document.querySelector('.homeloancalculator').querySelector('.eligibilitycalculator')
        && (document.querySelector('.homeloancalculator').querySelector('.eligibilitycalculator').style.display = 'block');
    }

    homeLoanCalcFunc(currentSection);
    onloadAPRCalc();
    readMoreFucn(block);
  } catch (error) {
    console.warn(error);
  }
}

function onloadAPRCalc() {
  const isAprCalculator = document.querySelector('.homeloancalculator .apr');
  if (isAprCalculator) {
    const parentElement = isAprCalculator.closest('.homeloancalculator');
    const resultElement = parentElement.querySelector('[data-cal-result=resultAmt]');

    const {
      loanAmt, loanOrigination, roi, tenure,
    } = getApiInputs();
    const aprValue = CheckAprRate(loanAmt, loanOrigination, roi, tenure);
    renderAprValue(resultElement, aprValue);

    parentElement.addEventListener('change', ({ target }) => {
      if (target.tagName != 'INPUT') return;

      const {
        loanAmt, loanOrigination, roi, tenure,
      } = getApiInputs();
      const aprValue = CheckAprRate(loanAmt, loanOrigination, roi, tenure);
      renderAprValue(resultElement, aprValue);
    });

    function getApiInputs() {
      const obj = {};

      obj.loanAmt = parentElement.querySelector('[data-cal-input=loanamt]')?.value.replaceAll(',', '');
      obj.roi = parentElement.querySelector('[data-cal-input=roi]')?.value.replaceAll(',', '');
      obj.tenure = parentElement.querySelector('[data-cal-input=tenure]')?.value;
      obj.loanOrigination = parentElement.querySelector('[data-cal-input=origincharges')?.value.replaceAll(',', '');

      return obj;
    }
  }
}

function renderAprValue(element, value) {
  element.textContent = `${value}%`;
}

export const CheckAprRate = (LA, LO, IR, LT) => {
  const present = LA - LO;
  const guess = 0.01;
  const future = 0;
  const type = 0;
  const ROI = IR / 100;
  const rateI = ROI / 12;
  const fv = 0;
  const pvif = (1 + rateI) ** LT;
  const pmt = (rateI / (pvif - 1)) * -(LA * pvif + fv);
  const payment = pmt;

  // Set maximum epsilon for end of iteration
  const epsMax = 1e-10;
  // Set maximum number of iterations
  const iterMax = 10;

  // Implement Newton's method
  let y;
  let y0;
  let y1;
  let x0;
  let x1 = 0;
  let f = 0;
  let i = 0;
  let rate = guess;
  if (Math.abs(rate) < epsMax) {
    y = present * (1 + LT * rate) + payment * (1 + rate * type) * LT + future;
  } else {
    f = Math.exp(LT * Math.log(1 + rate));
    y = present * f + payment * (1 / rate + type) * (f - 1) + future;
  }
  y0 = present + payment * LT + future;
  y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
  i = x0 = 0;
  x1 = rate;
  while (Math.abs(y0 - y1) > epsMax && i < iterMax) {
    rate = (y1 * x0 - y0 * x1) / (y1 - y0);
    x0 = x1;
    x1 = rate;
    if (Math.abs(rate) < epsMax) {
      y = present * (1 + LT * rate) + payment * (1 + rate * type) * LT + future;
    } else {
      f = Math.exp(LT * Math.log(1 + rate));
      y = present * f + payment * (1 / rate + type) * (f - 1) + future;
    }
    y0 = y1;
    y1 = y;
    ++i;
  }
  const rate1 = rate * 100;
  let ddk = rate1 * 12;
  ddk = isNaN(ddk) ? 0 : ddk;

  return ddk.toFixed(2);
};

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
