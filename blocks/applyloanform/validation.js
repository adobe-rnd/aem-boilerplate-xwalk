import { dpObj } from "./applyloanpopper.js";
import { branchInput, cutomerIncome, cutomerName, cutomerNo, formDobInput, formLoanAmt, formTc, loanFormContainer, loanFormOtpBtn, loanFromBtn, loanOtpInput, loanProduct, stateInput } from "./loanformdom.js";


export function validationJSFunc(){
    let checkNumberFor = [cutomerNo()];
    let checkEmptyFor = [loanProduct(), formLoanAmt(), cutomerName(), cutomerIncome(), stateInput(), branchInput(), formTc()];
    let checkDateFor = [formDobInput()];
    let checkValidPlaceFor = [stateInput(), branchInput()];
    
    loanFormContainer().addEventListener("input", function({target}) {
        if(target.tagName != "INPUT") return;
    
        if(target.dataset.valueType == "money") {
            let inputValue = target.value;
            inputValue = inputValue.replace(/^0|\D/g, '');
            target.value =  currenyCommaSeperation(inputValue);
    
            return false;
        }
    
        if(target.dataset.valueType == "name") {
            target.value = target.value.replace(/[^a-zA-Z ]+/g, '');
        }
    
        if(target.dataset.valueType == "date") {
            target.value = target.value.replace(/\D/g, '');
        }
    
        let isEmptyValidations = checkEmptyFor.every(isEmpty);
        let isNUmberValidations = checkNumberFor.every((input) => isValidNumber(input, target));
        let isPlaceValidations = checkValidPlaceFor.every((input) => isValidPlace(input, target));
        let isDateValidations = checkDateFor.every((input) => validateAndFormatDate(input, target));
    
        if(isEmptyValidations && isNUmberValidations && isPlaceValidations && isDateValidations) {
            loanFromBtn().classList.add("loan-form-button-active");
        } else {
            loanFromBtn().classList.remove("loan-form-button-active");
        }
    });

    loanOtpInput().addEventListener("input", function({currentTarget}) {
        let inputValue = currentTarget.value.trim();
        currentTarget.value = inputValue.replace(/\D/g, '');
        document.querySelector("#otp-digits").textContent = currentTarget.value.length + "/4 Digits";
        
        if(currentTarget.value.length == 4) {
            loanFormOtpBtn().classList.add("loan-form-button-active");
        } else {
            loanFormOtpBtn().classList.remove("loan-form-button-active");
        }
    });

    let StateBranchRegx = document.querySelectorAll('.checkInputRegx input');

    StateBranchRegx.forEach(input => {
        input.addEventListener("input", function({currentTarget}) {
            let inputValue = currentTarget.value;
            currentTarget.value = inputValue.replace(/[^a-zA-Z ]+/g, '');
        });
    });
}


function isEmpty(input) {
    if(input.value == null) return false;

    if(input.type == "checkbox" || input.type == "radio") {
        return input.checked;
    }

    return input.value.trim() != "";
}

function isValidNumber(input, target) {
    let inputValue = input.value.trim();
    if(inputValue.charAt(0) === '0') {
        input.value = "";
        return false;
    }

    input.value = inputValue.replace(/^0|\D/g, '');

    let mobRegex = /^[6-9]\d*$/.test(input.value);
    let mobileErrorMsg = document.querySelector(".invalid-no-msg");
    if(input == target) {
        if(mobRegex) {
            mobileErrorMsg.style.display = "none";
        } else {
            mobileErrorMsg.style.display = "block";
        }
    }

    return mobRegex && inputValue.length == 10;
}

function isValidPlace(input, target) {
    let isSelected = input.classList.contains("place-selected");

    if(input == target) {
        let errMsg = input.closest(".cmp-form-text-parent").querySelector(".loan-form-err");
        if(isSelected) {
            errMsg.style.display = "none";
        } else {
            errMsg.style.display = "block";
        }
    }

    return isSelected;
}

function validateAndFormatDate(input, target) {
    const inputField = input;
    let inputValue = inputField.value;
    let isDate = false;
    if(inputValue.length > 2) {
        const formattedDate = numberToDate(inputValue.replaceAll("/", ""));
        if(input == target) {
            inputField.value = formattedDate;
        }
        
        if(formattedDate.length == 10) {
            if(isValidDate(formattedDate, input, target)) {
                isDate = true;
            }

            if(input == target) {
                let errMsg = input.closest(".cmp-form-text-parent").querySelector(".loan-form-err");
                if(isDate) {
                    errMsg.style.display = "none";
                } else {
                    errMsg.style.display = "block";
                }
            }
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

    let isValidDate =  (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
    );

    if(isValidDate && (input == target)) {
        dpObj.selectDate(year + "-" + (Number(month)+1) + "-" + day);
        dpObj.setViewDate(year + "-" + (Number(month)+1) + "-" + day);

        dpObj.show();

        setTimeout(()=> {
            dpObj.hide();
        }, 1000);
    }

    return isValidDate;
}

function numberToDate(num) {
    let numStr = num.toString();
    if (numStr.length === 3) {
        return numStr.slice(0, 2) + '/' + numStr.slice(2);
    } else if (numStr.length === 4) {
        return numStr.slice(0, 2) + '/' + numStr.slice(2);
    } else if (numStr.length >= 5) {
        return numStr.slice(0, 2) + '/' + numStr.slice(2, 4) + '/' + numStr.slice(4);
    } else {
        return "Invalid number format";
    }
}

function currenyCommaSeperation(x) {
    if (typeof x === "number") {
        x = x.toString();
    }
    // Split the number into integral and decimal parts
    const parts = x.split(".");
    let integralPart = parts[0];
    const decimalPart = parts[1] ? `.${parts[1]}` : '';
    // Add commas after every two digits from the right in the integral part
    integralPart = integralPart.replace(/\d(?=(\d{2})+\d$)/g, '$&,');
    return integralPart + decimalPart;
}

