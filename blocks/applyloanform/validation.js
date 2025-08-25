import { dpObj, validateDOBForPL } from './applyloanpopper.js';
import {
  branchInput, cutomerIncome, cutomerName, cutomerNo, formDobInput, formLoanAmt, formTc, loanFormContainer, loanFormOtpBtn, loanFromBtn, loanOtpInput, loanProduct, stateInput,
} from './loanformdom.js';

export function clearPLLoanError() {
  const loanMsgErrorMsg = document.querySelector('.invalid-loanamount-msg');
  const monthlyMsgErrorMsg = document.querySelector('.invalid-monthlyincome-msg');
  const dateErrorMsg = document.querySelector('.invalid-date-msg');
  loanMsgErrorMsg.style.display = 'none';
  monthlyMsgErrorMsg.style.display = 'none';
  dateErrorMsg.style.display = 'none';
}
export function validatePLLoan() {
        if((loanProduct().dataset.loanType !== "pl") || (loanProduct().dataset.loanType !== "las") || (loanProduct().dataset.loanType !== "lamf")){
        if(loanProduct().dataset.loanType !== "pl"){
          clearPLLoanError();
        }else{
          clearLasOrLamfLoanError();
        }
        return
      }
  const checkLoanAmtFor = [formLoanAmt()];
  const checkDateFor = [formDobInput()];
  const checkcustomerIncome = [cutomerIncome()];
  const isLoanAmtValidation = checkLoanAmtFor.every((input) => isValidLoanAmt(input, formLoanAmt()));
  const isCustIncomeValidation = checkcustomerIncome.every((input) => isValidIncome(input, cutomerIncome()));
  const isDobValidation = checkDateFor.every((input) => isValidDob(input));
  validateDOBForPL();
  if(isCustIncomeValidation && isLoanAmtValidation && isDobValidation){
        loanFromBtn().classList.add('loan-form-button-active');
      }else {
        loanFromBtn().classList.remove('loan-form-button-active');
      }
}
export function validationJSFunc() {
  const checkNumberFor = [cutomerNo()];
  const checkEmptyFor = [loanProduct(), formLoanAmt(), cutomerName(), cutomerIncome(), stateInput(), branchInput(), formTc()];
  const checkDateFor = [formDobInput()];
  const checkValidPlaceFor = [stateInput(), branchInput()];

  // cutomerIncome().addEventListener('input', function (e) {
  //   isValidIncome(e.target);
  // })

  // formLoanAmt().addEventListener('input', function (e) {
  //   isValidLoanAmt(e.target);
  // })
  

loanFormContainer().addEventListener('input', ({ target }) => {

  if (target.tagName != 'INPUT') return;
  if (target.dataset.valueType == 'money') {
    let inputValue = target.value;
    inputValue = inputValue.replace(/^0|\D/g, '');
    target.value = currenyCommaSeperation(inputValue);

    const isPLLoan = loanProduct().dataset.loanType === "pl";
    const isLasLoan = loanProduct().dataset.loanType === "las";
    const isLamfLoan = loanProduct().dataset.loanType === "lamf";

    if(isPLLoan || isLasLoan || isLamfLoan){
      if (target.id === 'form-income') {
        isValidIncome(target);
      }

      if (target.id === 'form-loan-amount') {
        isValidLoanAmt(target);
      }
    }else {
      // clearPLLoanError();
      if (!clearPLLoanError()) {
        clearLasOrLamfLoanError();
      }else{
        clearPLLoanError()
      }
    }
  }

  if (target.dataset.valueType == 'name') {
    target.value = target.value.replace(/[^a-zA-Z ]+/g, '');
  }

  if (target.dataset.valueType == 'date') {
    target.value = target.value.replace(/\D/g, '');
  }
  const isEmptyValidations = checkEmptyFor.every(isEmpty);
  const isNUmberValidations = checkNumberFor.every((input) => isValidNumber(input, target));
  const isPlaceValidations = checkValidPlaceFor.every((input) => isValidPlace(input, target));
  const isDateValidations = checkDateFor.every((input) => validateAndFormatDate(input, target));


  if (isEmptyValidations && isNUmberValidations && isPlaceValidations && isDateValidations ) {
    if(loanProduct().dataset.loanType === "pl"){
      validatePLLoan();
    }else if((loanProduct().dataset.loanType === "las") || (loanProduct().dataset.loanType === "lamf")){
      validateLasOrLamfLoan();
    }else{
      loanFromBtn().classList.add('loan-form-button-active');
    }
  } else {
    loanFromBtn().classList.remove('loan-form-button-active');
  }
  checkAllFieldValidation();
});

loanOtpInput().addEventListener('input', ({ currentTarget }) => {
  const inputValue = currentTarget.value.trim();
  currentTarget.value = inputValue.replace(/\D/g, '');
  document.querySelector('#otp-digits').textContent = `${currentTarget.value.length}/4 Digits`;

  if (currentTarget.value.length == 4) {
    loanFormOtpBtn().classList.add('loan-form-button-active');
  } else {
    loanFormOtpBtn().classList.remove('loan-form-button-active');
  }
});

const StateBranchRegx = document.querySelectorAll('.checkInputRegx input');

StateBranchRegx.forEach((input) => {
  input.addEventListener('input', ({ currentTarget }) => {
    const inputValue = currentTarget.value;
    currentTarget.value = inputValue.replace(/[^a-zA-Z ]+/g, '');
  });
});
}

export function checkAllFieldValidation() {
  // Select all form fields to validate
  const formFields = [
    cutomerNo(),
    loanProduct(),
    formLoanAmt(),
    cutomerName(),
    cutomerIncome(),
    stateInput(),
    branchInput(),
    formTc(),
    formDobInput()
  ];

  // Check if the field is empty
  const isEmptyValidations = formFields.every(isEmpty);

  // Validate specific fields (phone number, loan amount, etc.)
  const isNumberValidations = isValidNumber(cutomerNo()); // Assuming you only need to check the phone number
  const isLoanAmtValidation = isValidLoanAmt(formLoanAmt());
  const isIncomeValidations = isValidIncome(cutomerIncome());
  const isDateValidations = isValidDob(formDobInput()); // Ensure this returns true if valid
  const isPlaceValidations = isValidPlace(stateInput()) && isValidPlace(branchInput());

  // Check if the loan amount and income are valid for personal loans
  const loanType = document.querySelector('#form-loan-type')?.value;

  const loanTypeValue = loanType.trim().toLowerCase();
  if (!['personal loan', 'loan against security', 'loan against mutual funds'].includes(loanTypeValue)) {
    return;
  }
  const isLoanValid = ['personal loan', 'loan against security', 'loan against mutual funds'].includes(loanTypeValue)
  ? isLoanAmtValidation && isIncomeValidations
  : true;

  // Check if all the validations pass
  if (isEmptyValidations && isNumberValidations && isLoanValid && isPlaceValidations && isDateValidations) {
    loanFromBtn().classList.add('loan-form-button-active');
  } else {
    loanFromBtn().classList.remove('loan-form-button-active');
  }
}


function isEmpty(input) {
  if (input.value == null) return false;

  if (input.type == 'checkbox' || input.type == 'radio') {
    return input.checked;
  }

  return input.value.trim() != '';
}

function isValidNumber(input, target) {
  const inputValue = input.value.trim();
  if (inputValue.charAt(0) === '0') {
    input.value = '';
    return false;
  }

  input.value = inputValue.replace(/^0|\D/g, '');

  const mobRegex = /^[6-9]\d*$/.test(input.value);
  const mobileErrorMsg = document.querySelector('.invalid-no-msg');
  if (input == target) {
    if (mobRegex) {
      mobileErrorMsg.style.display = 'none';
    } else {
      mobileErrorMsg.style.display = 'block';
    }
  }

  return mobRegex && inputValue.length == 10;
}

function isValidLoanAmt(input, target) {
  const inputValue = input.value.replace(/,/g, '');
  const amount = parseInt(inputValue, 10);

  const loanType = document.querySelector('#form-loan-type')?.value;

  const loanMsgErrorMsg = document.querySelector('.invalid-loanamount-msg');

  // if (loanType.trim().toLowerCase() !== 'personal loan') return true;

  if (
    loanType.trim().toLowerCase() !== 'personal loan' &&
    loanType.trim().toLowerCase() !== 'loan against security' &&
    loanType.trim().toLowerCase() !== 'loan against mutual funds'
  ) {
    return true;
  }

  if (amount < 100000) {
    loanMsgErrorMsg.style.display = 'block';
    return false;
  } else {
    loanMsgErrorMsg.style.display = 'none';
    return true;
  }
}

function isValidIncome(input, target) {
  const inputValue = input.value.replace(/,/g, '');
  const amount = parseInt(inputValue, 10);

  const loanType = document.querySelector('#form-loan-type')?.value;

  const mobileErrorMsg = document.querySelector('.invalid-monthlyincome-msg');
  // if (loanType.trim().toLowerCase() !== 'personal loan') return true;
  if (
    loanType.trim().toLowerCase() !== 'personal loan' &&
    loanType.trim().toLowerCase() !== 'loan against security' &&
    loanType.trim().toLowerCase() !== 'loan against mutual funds'
  ) {
    return true;
  }
  if (amount < 25000) {
    mobileErrorMsg.style.display = 'block';
    return false;
  } else {
    mobileErrorMsg.style.display = 'none';
    return true;
  } 
}

function isValidPlace(input, target) {
  const isSelected = input.classList.contains('place-selected');

  if (input == target) {
    const errMsg = input.closest('.cmp-form-text-parent').querySelector('.loan-form-err');
    if (isSelected) {
      errMsg.style.display = 'none';
    } else {
      errMsg.style.display = 'block';
    }
  }

  return isSelected;
}

export function calculateAgeFromInput(dateString) {
  if (!dateString.includes('/')) return;

  const [day, month, year] = dateString.split('/');
  const birthDate = new Date(`${year}-${month}-${day}`);

  if (isNaN(birthDate)) {
    return;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function isValidDob(input) {
  const loanType = document.querySelector('#form-loan-type')?.value;
  // if (loanType.trim().toLowerCase() !== 'personal loan') return;
  if (
    loanType.trim().toLowerCase() !== 'personal loan' &&
    loanType.trim().toLowerCase() !== 'loan against security' &&
    loanType.trim().toLowerCase() !== 'loan against mutual funds'
  ) {
    return ;
  }
  return  input.dataset.validdate == "true";
}

function validateAndFormatDate(input, target) {
  const inputField = input;
  const inputValue = inputField.value;
  let isDate = false;
  if (inputValue.length > 2) {
    const formattedDate = numberToDate(inputValue.replaceAll('/', ''));
    if (input == target) {
      inputField.value = formattedDate;
    }

    if (formattedDate.length == 10) {
      if (isValidDate(formattedDate, input, target)) {
        isDate = true;
      }

      // if (input == target) {
      //   const errMsg = document.querySelector('.invalid-date-msg');
      //   input.dataset.validdate == "true" ? errMsg.style.display = "none" : errMsg.style.display = "block";
      // }
    }
  }

  return isDate;
}

function isValidDate(dateString, input, target) {
  const dateParts = dateString.split('/');
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Month is zero-based in JavaScript Date objects
  const year = parseInt(dateParts[2], 10);

  const date = new Date(year, month, day);

  const isValidDate = (
    date.getFullYear() === year
    && date.getMonth() === month
    && date.getDate() === day
  );

  if (isValidDate && (input == target)) {
    dpObj.selectDate(`${year}-${Number(month) + 1}-${day}`);
    dpObj.setViewDate(`${year}-${Number(month) + 1}-${day}`);

    dpObj.show();

    setTimeout(() => {
      dpObj.hide();
    }, 1000);
  }

  return isValidDate;
}

function numberToDate(num) {
  const numStr = num.toString();
  if (numStr.length === 3) {
    return `${numStr.slice(0, 2)}/${numStr.slice(2)}`;
  } if (numStr.length === 4) {
    return `${numStr.slice(0, 2)}/${numStr.slice(2)}`;
  } if (numStr.length >= 5) {
    return `${numStr.slice(0, 2)}/${numStr.slice(2, 4)}/${numStr.slice(4)}`;
  }
  return 'Invalid number format';
}

function currenyCommaSeperation(x) {
  if (typeof x === 'number') {
    x = x.toString();
  }
  // Split the number into integral and decimal parts
  const parts = x.split('.');
  let integralPart = parts[0];
  const decimalPart = parts[1] ? `.${parts[1]}` : '';
  // Add commas after every two digits from the right in the integral part
  integralPart = integralPart.replace(/\d(?=(\d{2})+\d$)/g, '$&,');
  return integralPart + decimalPart;
}

// Clearing error for loan against security and loan against mutual fund
export function clearLasOrLamfLoanError() {
  const loanMsgErrorMsg = document.querySelector('.invalid-loanamount-msg');
  const monthlyMsgErrorMsg = document.querySelector('.invalid-monthlyincome-msg');
  const dateErrorMsg = document.querySelector('.invalid-date-msg');
  loanMsgErrorMsg.style.display = 'none';
  monthlyMsgErrorMsg.style.display = 'none';
  dateErrorMsg.style.display = 'none';
}

// validation for loan against security and loan against mutual fund
export function validateLasOrLamfLoan() {
      if((loanProduct().dataset.loanType !== "las") || (loanProduct().dataset.loanType !== "lamf")){
        clearLasOrLamfLoanError();
        return
      }
  const checkLoanAmtFor = [formLoanAmt()];
  const checkDateFor = [formDobInput()];
  const checkcustomerIncome = [cutomerIncome()];
  const isLoanAmtValidation = checkLoanAmtFor.every((input) => isValidLoanAmt(input, formLoanAmt()));
  const isCustIncomeValidation = checkcustomerIncome.every((input) => isValidIncome(input, cutomerIncome()));
  const isDobValidation = checkDateFor.every((input) => isValidDob(input));
  validateDOBForPL();
  if(isCustIncomeValidation && isLoanAmtValidation && isDobValidation){
        loanFromBtn().classList.add('loan-form-button-active');
      }else {
        loanFromBtn().classList.remove('loan-form-button-active');
      }
}
