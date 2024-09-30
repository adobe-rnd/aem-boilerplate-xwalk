import { appplyLoanTemplate } from "./applyloantemplate.js";
import { applyLoanFormClick } from "./applyloanforms.js";
import { applyLoanPopper } from "./applyloanpopper.js";
import { loanutmForm } from "./loanutm.js";
import { stateMasterApi } from "./statemasterapi.js";
import { validationJSFunc } from "./validation.js";
import AirDatepicker from "../datepickerlib/datepickerlib.js";
import Popper from "../datepickerlib/popper.js";
import { buttonCLick } from "./loanformapi.js";
import { fetchAPI } from "../../scripts/scripts.js";

export default async function decorate(block) {
  let cfURL = block.textContent.trim();

  const cfRepsonse = await CFApiCall(cfURL);
  const repsonseData = cfRepsonse.data[0].data;
  const jsonResponseData = JSON.parse(repsonseData);

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

export async function CFApiCall(cfurl) {
  const response = await fetchAPI("GET", cfurl);
  const responseJson = await response.json();
  return responseJson;
}
