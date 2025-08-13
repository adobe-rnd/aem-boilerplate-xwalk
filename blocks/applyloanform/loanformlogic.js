import { cutomerIncome, formDobInput, formLoanAmt } from './loanformdom.js';

const getIncome = () => cutomerIncome()?.value.replaceAll(',', '');
const getDob = () => formDobInput()?.value;
const getProfile = () => (document.querySelector('[name=emplyoment]:checked').id == 'radio-salary' ? 'sal' : 'se');

const isValidAge = (dob, min, max) => {
  const age = calculateAge(dob);
  return isInRange(age, min, max);
};

function calculateAge(dob) {
  // Format: DD/MM/YYYY
  if (!dob || !dob.match(/^\d{2}\/\d{2}\/\d{4}$/)) return false;
  const dobDate = new Date(dob.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
  if (isNaN(dobDate.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  if (today < new Date(today.getFullYear(), dobDate.getMonth(), dobDate.getDate())) age--;
  return age;
}

const loadProduct = {
  // income value: monthly
  otherLoanSAL: { location: 'branch', age: { min: 21 }, income: { min: 15000 } },
  otherLoanSE: { location: 'branch', age: { min: 23 }, income: { min: 15000 } },
  bussinessLoan: {
    location: 'branch selected', profile: 'se', age: { min: 21 }, income: { min: 15000 },
  },
  personalLoan: {
    location: 'branch selected', profile: 'sal', age: { min: 23, max: 60 }, income: { min: 25000 }, loan: { min: 100000 },
  },
  preOwnedCarLoanSAL: {
    location: 'branch selected', profile: 'sal', age: { min: 21, max: 60 }, income: { min: 16666 }, loan: { max: 1500000 },
  },
  preOwnedCarLoanSE: {
    location: 'branch selected', profile: 'se', age: { min: 23, max: 65 }, income: { min: 20833 }, loan: { max: 1500000 },
  },
};

export function ProductLogics(loanType) {
  const obj = {};
  const loanObj = loadProduct[loanType];
  if (loanObj == false || loanObj == null) return false;
  obj.age = isValidAge(getDob(), loanObj.age.min, loanObj.age.max);
  obj.income = isInRange(getIncome(), loanObj.income.min, loanObj.income.max);

  if (loanObj.profile) {
    obj.profile = loanObj.profile == getProfile();
  }

  if (loanObj.loan) {
    const loanAmt = formLoanAmt().value.trim().replaceAll(',', '');
    if (loanAmt == '') return false;

    const isMin = loanObj.loan.min ? loanAmt >= loanObj.loan.min : true;
    const isMax = loanObj.loan.max ? loanAmt <= loanObj.loan.max : true;

    obj.loan = isMin && isMax;
  }

  return Object.values(obj).every((value) => value === true);
}

function isInRange(value, min, max) {
  if (value == null) return false;

  if (max) {
    return value >= min && value <= max;
  }
  return value >= min;
}
