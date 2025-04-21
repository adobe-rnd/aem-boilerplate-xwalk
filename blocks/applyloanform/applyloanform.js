import { appplyLoanTemplate } from './applyloantemplate.js';
import { applyLoanFormClick } from './applyloanforms.js';
import { applyLoanPopper } from './applyloanpopper.js';
import { loanutmForm } from './loanutm.js';
import { stateMasterApi } from './statemasterapi.js';
import { validationJSFunc } from './validation.js';
import AirDatepicker from '../datepickerlib/datepickerlib.js';
import Popper from '../datepickerlib/popper.js';
import { buttonCLick } from './loanformapi.js';
import { CFApiCall, fetchAPI } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const cfURL = block.textContent.trim();

  const cfRepsonse = await CFApiCall(cfURL);
  const repsonseData = cfRepsonse.data;
  const jsonResponseData = applyLoanFormJson(repsonseData);
  // const jsonResponseData = JSON.parse(repsonseData);



  block.innerHTML = appplyLoanTemplate(jsonResponseData);
  try {
    applyLoanFormClick();
    applyLoanPopper();
    loanutmForm();
    stateMasterApi();
    validationJSFunc();
    buttonCLick();
  } catch (error) {
    console.warn(error);
  }
}

function applyLoanFormJson(data) {
  var mainObj = {};

  var loanCategories = {}; // Temporary storage for loan categories

  data.forEach(function (eachEle) {
    // Initialize an array for loan categories when fieldset is "array" and view is "options"
    if (eachEle.fieldset === "array" && eachEle.view === "options") {
      loanCategories[eachEle.name] = [];
    }else if (eachEle.fieldset === "array") {
      mainObj[eachEle.name] = [];
    } else {
      mainObj[eachEle.name] = eachEle.value;
    }

    // Populate loans under categories based on the view
    if (eachEle.view && loanCategories[eachEle.view]) {
      // Initialize the loan item if it doesn't exist yet
      let loanItem = loanCategories[eachEle.view][eachEle.id] || {};

      if (!loanItem.litext) {
        loanItem = {}; // Ensure loan item starts empty if not set yet
      }

      // Add loan details like litext, loantype, and loanname
      if (eachEle.fieldset === "") {
        loanItem[eachEle.name] = eachEle.value; // Add loan details (litext, loantype, loanname)
      }

      // Save the loan item back into the category
      loanCategories[eachEle.view][eachEle.id] = loanItem;
    }
  });

  // Now push categories into the mainObj.options array
  for (let category in loanCategories) {
    let obj = {};
    obj[category] = loanCategories[category]; // Assign the category's loan items
    mainObj.options.push(obj);
  }
  
  return mainObj; // Return the structured object
}
