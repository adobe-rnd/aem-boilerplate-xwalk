import { CFApiCall, fetchAPI } from '../../scripts/common.js';
import { homeLoanCalcFunc } from '../emiandeligiblitycalc/homeloancalculators.js';
import { onloadDatePickerCalls } from './partpaymentdatepicker.js';
import { partPaymentCalHTML } from './partpaymenttemplate.js';

export default async function decorate(block) {
  const cfURL = block.textContent.trim();

  const cfRepsonse = await CFApiCall(cfURL);
  const repsonseData = cfRepsonse.data;
  const jsonResponseData = partPaymentStrCalc(repsonseData);
  // const jsonResponseData = JSON.parse(repsonseData);

  block.innerHTML = partPaymentCalHTML(jsonResponseData);

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
    onloadDatePickerCalls();
    readMoreFucn(block);
  } catch (error) {
    console.warn(error);
  }
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

function partPaymentStrCalc(data) {
  var mainObj = {};

  data.forEach(function (eachData) {
    const { Fieldset, Name, Type, Value, ID, View } = eachData;


    if (Type === "partpayment") {
      // Initialize as an array if View is "array"
      if (View === "array") {
        mainObj[Name] = mainObj[Name] || [];
      }
      
      // Proceed if ID is provided
      if (ID) {
        // Ensure partpayment exists in mainObj
        mainObj.partpayment = mainObj.partpayment || [];
        
        // Fetch or create the partPaymentItem for the given ID
        let partPaymentItem = mainObj.partpayment[ID] || {};
        
        // Assign the value to the dynamic Name key
        partPaymentItem[Name] = Value;
        
        // Update the main object with the new partPaymentItem
        mainObj.partpayment[ID] = partPaymentItem;
      }
    }
    

    if (Fieldset) {
      if (!mainObj[Fieldset]) {
        mainObj[Fieldset] = {};
      }

      if (Type === "loanamout") {
        if (!mainObj[Fieldset].loanamout) {
          mainObj[Fieldset].loanamout = [];
        }

        let loanItem = mainObj[Fieldset].loanamout[ID];
        if (!loanItem) {
          loanItem = {};
          mainObj[Fieldset].loanamout[ID] = loanItem;
        }

        loanItem[Name] = Value;
      }else if (Type === "array") {
        mainObj[Fieldset][Name] = [];
      } else {
        mainObj[Fieldset][Name] = Value;
      }
    } else {
      mainObj[Name] = Value;
    }
  });

  return mainObj;
}
