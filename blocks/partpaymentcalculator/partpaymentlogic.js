// let partPayments = [
//     { monthDifference: 6, partPayAmount: 60000 },

import { currenyCommaSeperation } from "../../scripts/scripts.js";

//   ];
function displayingDataFromElement(emi, effInt, totalSavings, monthCounter, interestAmtSum) {
  document.querySelector("[data-cal-result=principalAmt]").innerText = currenyCommaSeperation(interestAmtSum || 0);
  document.querySelector("[data-cal-result=interestAmt]").innerText = currenyCommaSeperation(emi);
  document.querySelector(".amount-1").innerText = Number(effInt).toFixed(2) + "%";
  document.querySelector(".amount-2").innerText = currenyCommaSeperation(totalSavings);
  document.querySelector(".amount-3").innerText = monthCounter + " Months";
}

export function updatePartPayment(rateIn, principal_outstanding, LT, partPayments) {
  let unchangedPricipalAmoutn = principal_outstanding.replace(/,/g, "");
  let rate = rateIn / 12; // rate per period (1 period = 1 month)
  let monthCounter = 1; // keeping 1 to maintain the negative amount in last EMI
  let interestAmtSum = 0;

  principal_outstanding = principal_outstanding.replace(/,/g, "");
  LT = LT;
  let EMIValue = calculatePMT(principal_outstanding, rate, LT);
  //console.log("Emi Value" + EMIValue);

  if (partPayments.length == 0) {
    let interest = EMIValue * LT * 12 - unchangedPricipalAmoutn;
    let totalPayment = interest + Number(unchangedPricipalAmoutn);
    displayingDataFromElement(EMIValue, rateIn, 0, 0, totalPayment);
    return;
  }
  for (let i = 0; i <= LT * 12 - 1; i++) {
    // loops over each period
    // for periodic part payment
    let periodicPartPayment = 0;
    for (let p = 0; p < partPayments.length; p++) {
      if (partPayments[p].monthDifference === i + 1) {
        periodicPartPayment = partPayments[p].partPayAmount.replace(/,/g, "");
      }
    }
    let monthly_interest = Math.round((rate / 100) * principal_outstanding);
    let monthly_principal = +EMIValue - +monthly_interest + +periodicPartPayment;
    principal_outstanding = principal_outstanding - monthly_principal;
    // payment schedule
    if (principal_outstanding >= 0) {
      monthCounter = monthCounter + 1;
      interestAmtSum = interestAmtSum + monthly_interest;
    }
  }

  let reductionInTenure = LT * 12 - monthCounter;
  //console.log("monthCounter: ", reductionInTenure);

  let totalInterest = EMIValue * 12 * LT - unchangedPricipalAmoutn;
  let totalSavings = totalInterest - interestAmtSum;

  //console.log("totalsavings:", totalSavings);
  let effit = calculateEIR(LT, EMIValue, totalSavings, unchangedPricipalAmoutn);
  //console.log("net effictive roi: ", effit);

  let totalPayment = interestAmtSum + Number(unchangedPricipalAmoutn);

  displayingDataFromElement(EMIValue, effit, totalSavings, reductionInTenure, totalPayment);
}

//   updatePartPayment();
function calculatePMT(principal, annualInterestRate, numberOfYears) {
  // Convert annual interest rate to monthly rate
  let monthlyInterestRate = annualInterestRate / 100;
  // Convert number of years to number of months
  let numberOfMonths = numberOfYears * 12;
  // Calculate PMT using the formula
  let PMT = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));
  return Math.round(PMT);
}
function calculateEIR(LT, EMIValue, totalSavings, LA, effInt) {
  if (EMIValue > 0 && LA > 0) {
    let effInt = CalculateEffectiveInterest(LT * 12, -EMIValue, +LA + totalSavings, 0, 0, 0.1);
    // let effInt = CalculateEffectiveInterest(60,-12968, 513627,0, 0, 0.1)
    return (effInt * 1200).toFixed(2);
  }
}
function CalculateEffectiveInterest(nper, pmt, pv, fv, type, guess) {
  // Sets default values for missing parameters
  fv = typeof fv !== "undefined" ? fv : 0;
  type = typeof type !== "undefined" ? type : 0;
  guess = typeof guess !== "undefined" ? guess : 0.1;
  // Sets the limits for possible guesses to any
  // number between 0% and 100%
  var lowLimit = 0;
  var highLimit = 1;
  // Defines a tolerance of up to +/- 0.00005% of pmt, to accept
  // the solution as valid.
  var tolerance = Math.abs(0.00000005 * pmt);
  // Tries at most 40 times to find a solution within the tolerance.
  for (var i = 0; i < 40; i++) {
    // Resets the balance to the original pv.
    var balance = pv;
    // Calculates the balance at the end of the loan, based
    // on loan conditions.
    for (var j = 0; j < nper; j++) {
      if (type == 0) {
        // Interests applied before payment
        balance = balance * (1 + guess) + pmt;
      } else {
        // Payments applied before insterests
        balance = (balance + pmt) * (1 + guess);
      }
    }
    // Returns the guess if balance is within tolerance. If not, adjusts
    // the limits and starts with a new guess.
    if (Math.abs(balance + fv) < tolerance) {
      return guess;
    } else if (balance + fv > 0) {
      // Sets a new highLimit knowing that
      // the current guess was too big.
      highLimit = guess;
    } else {
      // Sets a new lowLimit knowing that
      // the current guess was too small.
      lowLimit = guess;
    }
    // Calculates the new guess.
    guess = (highLimit + lowLimit) / 2;
  }
  // Returns null if no acceptable result was found after 40 tries.
  return null;
}