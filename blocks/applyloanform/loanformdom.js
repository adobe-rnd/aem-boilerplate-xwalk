export {loanInnerForm, loanFormContainer, loanProduct, formLoanAmt, cutomerName, cutomerNo, cutomerEmployment, cutomerIncome, 
    formDobInput, stateInput, stateDropDownContainer, stateDropDownUL, branchInput, 
    branchParent, brachDropDownUl, formTc, loanFromBtn, loanOtpInput, loanFormOtpBtn, otpPhoneNum, otpNumChange};

let nullDom = document.createElement("div");

const querySelectorFallback = (selector) => {
    return document.querySelector(selector) || nullDom;
};

const loanInnerForm = () => querySelectorFallback(".loan-form-sub-parent");

const loanFormContainer = () => querySelectorFallback(".applyloanform .cmp-container");

const loanProduct = () => querySelectorFallback("#form-loan-type");

const formLoanAmt = () => querySelectorFallback("#form-loan-amount");

const cutomerName = () => querySelectorFallback("#form-customer-name");

const cutomerNo = () => querySelectorFallback("#form-customer-no");

const cutomerEmployment = () => querySelectorFallback("[name=emplyoment]:checked");

const cutomerIncome = () => querySelectorFallback("#form-income");

const formDobInput = () => querySelectorFallback("#loan-form-dob");

const stateInput = () => querySelectorFallback("#form-state");
const stateDropDownContainer = () => querySelectorFallback("#statecontainer .option-form");
const stateDropDownUL = () => querySelectorFallback("#statecontainer .option-form ul");

const branchParent = () => querySelectorFallback("#branchparent");
const branchInput = () => querySelectorFallback("#form-branch-city");
const brachDropDownUl = () => querySelectorFallback("#branchcontainer .option-form ul");

const formTc = () => querySelectorFallback("#loanformcheck");

const loanFromBtn = () => querySelectorFallback("#loan-form-button");

const loanOtpInput = () => querySelectorFallback("#loan-form-otp-input");

const loanFormOtpBtn = () => querySelectorFallback("#loan-from-otp-verify");

const otpPhoneNum = () => querySelectorFallback("#loan-form-otpnum");

const otpNumChange = () => querySelectorFallback("#otp-change-num");