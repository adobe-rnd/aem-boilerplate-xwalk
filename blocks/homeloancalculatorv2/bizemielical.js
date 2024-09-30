export const calculator = (loanDetails) => {
    // Parameter Validation
    if (!loanDetails || typeof loanDetails !== 'object') {
        console.warn("Invalid loan details provided.");
        return false;
    }

    const monthlyLoanTenure = loanDetails.tenure * 12;
    const roi = (loanDetails.roi * 0.01) / 12;
    
    return {
        monthlyLoanTenure,
        roi,
        loanDetails,
        "result": function () {
            return getResult(this);
        }
    };
};

const calculateEligibility = (calculatorObj) => {
    
    const loanDetails = calculatorObj.loanDetails;
    const applicableFoir = loanDetails.foir * 0.01;
    let result = 0;
    
    let productType = document.querySelector("#calculator-product-type").value;
    if(productType == "pl") {
        result = CalculateBusinessLoanEligibility(loanDetails.income, calculatorObj.monthlyLoanTenure, loanDetails.otherLoan, calculatorObj.roi);
        return {result};
    }

    //eligibility emi
    const eligibilityEmi = getProductBasedEmiEligibility(loanDetails.income, loanDetails.otherLoan, applicableFoir);

    // Not Eligible
    if (eligibilityEmi <= 0) {
        return 0;
    }

    const E = eligibilityEmi;
    const n = calculatorObj.monthlyLoanTenure;
    const R = calculatorObj.roi;


    // Formula: E*((1-(1/(1+R)^n))/R)
    result = Math.round(E * (1 - (1 / Math.pow((1 + R), n))) / R);


    return {result};
};

const calculateLoanEmi = (calculatorObj) => {

    let L = calculatorObj.loanDetails.loanAmt;
    let n = calculatorObj.monthlyLoanTenure;
    let R = calculatorObj.roi;

    let emi = (L * R * Math.pow(1 + R, n)) / (Math.pow(1 + R, n) - 1);
    emi = Math.round(emi);
    
    //Interest Amount Calculation
    //emi * monthly tenure - loan amount
    let interestAmt = emi * n - L;

    return {"result": emi, interestAmt, "principalAmt": L};
};


function getResult(calculatorObj) {
    let calType = calculatorObj.loanDetails.calType;
    //console.log(calculatorObj);
    if(calType) {
        if(calType == "emi"){
            return  calculateLoanEmi(calculatorObj);
        } else {
            return calculateEligibility(calculatorObj);
        }
    }
}


function getProductBasedEmiEligibility(income, otherLoan, applicableFoir) {
    let productType = document.querySelector("#calculator-product-type").value;
    //business loan eligibility emi formula: (income - otherloan) * applicablefoir
    let homePage = document.querySelector(".overlayDiv.show .homeloancalculator");
    if(homePage) {
        productType = homePage.querySelector("#calculator-product-type").value;
    }

    let eligibilityEmi = (income - otherLoan) * applicableFoir;

    if(productType == "hl") {
        //home loan eligibility emi formula: income * applicablefoir - otherloan
        eligibilityEmi = income * applicableFoir - otherLoan;
    } 

    return eligibilityEmi;
}

const CalculateBusinessLoanEligibility = (ic, y, ee, ir) => {
    // business loan Eligibility Calculator
    let applicableAmount = (ic - ee) * 0.5;
    let p= Math.pow(1 + ir, y);
    let eligibleLoanAmount = 1 / p;
    eligibleLoanAmount = (applicableAmount * (1 - eligibleLoanAmount)) / ir;
    eligibleLoanAmount = Math.round(eligibleLoanAmount);
    return eligibleLoanAmount <= 0 ? 0 : eligibleLoanAmount;
};