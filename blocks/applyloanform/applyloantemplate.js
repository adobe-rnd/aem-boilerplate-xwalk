import { getMetadata } from "../../scripts/aem.js";
export function appplyLoanTemplate(properties) {
    properties.checkboxAnchorTextLink = getMetadata('lang-path') + properties.checkboxAnchorTextLink;
  /* const properties = {
    rupeeIcon: "/images/rupee-icon.svg",
    mainFormHeading: "Apply Loan In A Minute",
    crossOne: "/images/close-icon.svg",
    loanType: "I am looking for? ",
    loanTypePlaceholder: "Select Loan Type",
    loanAmount: "I need loan amount of ",
    fullNames: "My full name is ",
    fullNamesPlaceholder: "Enter Full Name",
    mobileNumber: "My contact number is",
    mobileNumberPlaceholder: "Enter Mobile Number",
    checkboxTitle: "I am",
    firstCheckText: "Salaried",
    secondCheckText: "Doing business",
    monthlyIncome: "My monthy income is",
    datePicker: "My year of birth is",
    datePickerPlaceholder: "DD/MM/YYYY",
    state: "State",
    statePlaceholder: "Enter State",
    branch: "Branch",
    branchPlaceholder: "Enter Branch",
    checkboxText: "I accept the ",
    checkboxAnchorText: "terms and conditions",
    checkboxAnchorTextLink: "http://example.com",
    verifyHead: "Verify Your Mobile Number",
    sucessFirstImg: "/images/loan-sucess.png",
    crossTwo: "/images/close-icon.svg",
    FirstLineText: "Your request has been submitted successfully!",
    SecondLineText: "Here is your QR code",
    sucessSecondImg: "/images/scanner.svg",
    MobileLineText: "Scan the QR code with your mobile app",
    scanImgOne: "/content/dam/piramalfinance/homepage/banner-images/playstore.png",
    scanImgTwo: "/content/dam/piramalfinance/homepage/banner-images/appstore.png",
    errorImage: "/images/loan-error.png",
    crossThree: "/images/close-icon.svg",
    errorhead: "Request Failed",
    errorSubhead: "There was an error processing your request.",
    RedBoxText: "Please try again later.",
    errorImage2: "/images/loan-error.png",
    crossFour: " /images/close-icon.svg",
    errorMessageOne: "Something went wrong",
    errorMessageTwo: "Please try again.",
    buttonOne: "Submit",
    buttonTwo: "Verify OTP",
    buttonThree: "Try Again",
    options: [
      {
        "Personal Loans": [
          { litext: "Loan less than 5 Lacs", loantype: "pl" },
          { litext: "Loan more than 5 Lacs", loantype: "pl" },
        ],
      },
      {
        "Housing Loans": [{ litext: "Home Loan", loantype: "hl" }],
      },
      {
        "Business Loans": [
          { litext: "Business Loan", loantype: "ubl" },
          { litext: "Loan against property", loantype: "msme" },
          { litext: "Secured business loan", loantype: "msme" },
        ],
      },
      {
        "Other Loans": [{ litext: "Pre-owned Car Loan", loantype: "ucl" }],
      },
    ],
  }; */

  function createLoanTypeDropDown() {
    const container = document.createElement('div');

    properties.options.forEach((category) => {
      const ul = document.createElement('ul');
      for (const [key, value] of Object.entries(category)) {
        const liCategory = document.createElement('li');
        liCategory.textContent = key;
        liCategory.setAttribute('data-get-input', 'form-loan-type');
        liCategory.classList.add('subpoints');
        ul.appendChild(liCategory);

        value.forEach((item) => {
          const liItem = document.createElement('li');
          liItem.textContent = item.litext;
          liItem.setAttribute('data-loan-type', item.loantype);
          liItem.setAttribute('data-loan-name', item.loanname);
          liItem.setAttribute('data-get-input', 'form-loan-type');
          liItem.classList.add('subpoints');
          ul.appendChild(liItem);
        });
      }
      container.appendChild(ul);
    });

    return container.innerHTML;
  }

  const listofLoanTypes = createLoanTypeDropDown();

  const appplyLoanTemplate = `<div class="loan-form-sub-parent">
        <div class="cmp-container">
             <div class="loan-form">
                <div class="cmp-container">
                        <div class="loan-form-heading-parent ">
                            <div class="cmp-container">
                                <div class="image">
                                    <img data-src="${properties.rupeeIcon}" src="${properties.rupeeIcon}"
                                        class="cmp-image__image lozad"  alt="send">
                                </div>
                                <div class="text">
                                    <p>${properties.mainFormHeading}</p>
                                </div>
                                <div class="image crossimage">
                                    <img data-src="${properties.crossOne}" src="${properties.crossOne}"
                                        class="cmp-image__image lozad" alt="close-icon">
                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <form  
                                id="loan-main-form" name="loan-main-form" class="cmp-form">
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${properties.loanType}<span>*</span></label>
                                        <div class="cmp-form-text-parent multiselectoptions">
                                            <input class="cmp-form-text__text" type="text" id="form-loan-type"
                                                placeholder="${properties.loanTypePlaceholder}" readonly  autocomplete="off">
                                            <span class="arrowimage"><img class="lozad" src="/images/down-arrow.png"
                                                    data-src="/images/down-arrow.png" alt="arrowimage" src="/images/down-arrow.png">
                                            </span>
                                        </div>
                                        <div class="option-form-parent">
                                            <div class="option-form loan-form-drpdown">

                                               
                                                   ${listofLoanTypes}
                                                   
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${properties.loanAmount}<span>*</span></label>
                                        <div class="cmp-form-text-parent">
                                            <span class="rupee">₹</span>
                                            <input class="cmp-form-text__text" type="text" data-value-type="money" id="form-loan-amount" placeholder=""
                                            autocomplete="off">
                                            <span class="loan-form-err invalid-loanamount-msg">
                                                Minimum amount should be 1 lakh.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${properties.fullNames}<span>*</span></label>
                                        <div class="cmp-form-text-parent">
                                            <input class="cmp-form-text__text" id="form-customer-name" data-value-type="name"  type="text" placeholder="${properties.fullNamesPlaceholder}"
                                                autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${properties.mobileNumber}<span>*</span></label>
                                        <div class="cmp-form-text-parent">
                                            <input class="cmp-form-text__text" type="text" id="form-customer-no" maxlength="10" data-validation="isvalidNumber" data-isvalid="false"
                                                placeholder="${properties.mobileNumberPlaceholder}" name="contact" inputmode="numeric" autocomplete="off">
                                            <span class="loan-form-err invalid-no-msg">
                                                First digit should be 6 or 7 or 8 or 9.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="loan-form-checkbox">
                                    <fieldset class="cmp-form-options--radio">
                                        <legend class="cmp-form-options__legend">${properties.checkboxTitle}</legend>
                                        <div class="cmp-field-parent-parent">
                                            <div class="cmp-form-option-parent">
                                                <label for="radio-salary" id="radio-salary-id"
                                                    class="cmp-form-options__field-label">
                                                    <div class="cmp-form-input-parent">
                                                        <input class="cmp-form-options__field--radio" id="radio-salary"
                                                            name="emplyoment" checked type="radio">
                                                        <span
                                                            class="cmp-form-options__field-description">${properties.firstCheckText}</span>
                                                        <img id="" class="icon coloricon lozad"
                                                            data-src="/images/salaried-after-selected-icon.svg"
                                                            alt="salaried-after-selected-icon" src="/images/salaried-after-selected-icon.svg">
                                                        <img id="" class="icon blackicon lozad" src="/images/salaried-before-selected-icon.svg"
                                                            alt="salaried-before-selected-icon" data-src="/images/salaried-before-selected-icon.svg">
                                                    </div>
    
                                                        
        
                                                </label>
                                            </div>
                                            <div class="cmp-form-option-parent">
                                                <label for="radio-business" id="radio-business-id"
                                                    class="cmp-form-options__field-label">
                                                    <div class="cmp-form-input-parent">
                                                        <input class="cmp-form-options__field--radio"
                                                            id="radio-business" name="emplyoment" type="radio">
                                                        <span class="cmp-form-options__field-description">${properties.secondCheckText}</span>
                                                        <img id="" class="icon coloricon lozad" src="/images/business-loan-after-selected-icon.svg"
                                                            data-src="/images/business-loan-after-selected-icon.svg"
                                                            alt="business-loan-after-selected-icon">
                                                        <img id="" class="icon blackicon lozad" src="/images/business-loan-before-selcted-icon.svg"
                                                            data-src="/images/business-loan-before-selcted-icon.svg"
                                                            alt="business-loan-before-selcted-icon">
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${properties.monthlyIncome}<span>*</span></label>
                                        <div class="cmp-form-text-parent">
                                            <span class="rupee">₹</span>
                                            <input class="cmp-form-text__text" id="form-income" data-value-type="money"  type="text" placeholder="" name="text" autocomplete="off">
                                            <span class="loan-form-err invalid-monthlyincome-msg">
                                                Minimum salary should be 25,000.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${properties.datePicker}<span>*</span></label>
                                        <div class="cmp-form-text-parent" id="dob-container">
                                            <input class="cmp-form-text__text dobclass" type="text" placeholder="${properties.datePickerPlaceholder}" data-validdate=" "
                                                id="loan-form-dob" name="text" maxlength="10" autocomplete="off" data-value-type="date">
                                            <span class="arrowimage dobarrow" id="loan-form-cal-id"><img class="lozad" src="/images/calendar.png"
                                                data-src="/images/calendar.png" alt="dobarrow">
                                            </span>
                                            <span class="loan-form-err invalid-date-msg">
                                                Minimum age should be 23 years.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${properties.state}<span>*</span></label>
                                        <div class="cmp-form-text-parent stateparent laststate checkInputRegx" id="stateparent">
                                            <input class="cmp-form-text__text" type="text" placeholder="${properties.statePlaceholder}"  autocomplete="off"
                                                id="form-state" name="text" >
                                            <span class="arrowimage laststate"><img class="lozad" src="/images/down-arrow.png"
                                                data-src="/images/down-arrow.png" alt="arrowimage"></span>
                                            <span class="loan-form-err">
                                                Enter Valid State
                                            </span>
                                        </div>
                                       
                                     </div>
                                </div>
                                
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${properties.branch}<span>*</span></label>
                                        <div class="cmp-form-text-parent  branchparent checkInputRegx" id="branchparent">
                                            <input class="cmp-form-text__text" type="text"
                                                placeholder="${properties.branchPlaceholder}" id="form-branch-city" name="text"  autocomplete="off">
                                            <span class="arrowimage laststate"><img class="lozad" src="/images/down-arrow.png"
                                                data-src="/images/down-arrow.png" alt="arrowimage"></span>
                                            <span class="loan-form-err">
                                                Enter Valid branch
                                            </span>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="cmp-form-checkbox">
    
                            <div class="checkspan">
                                <div class="checkspan-child">
                                    <label class="checkboxcontainer">
                                        <div class="circle"></div>
                                        <input class="checkvalue" type="checkbox"  id="loanformcheck">
                                        <span class="checkmark"></span>
                                        
                                    </label>
                                </div>
                                
                            </div>
                            <p class="checkboxtext">${properties.checkboxText}<a target="_blank" href="${properties.checkboxAnchorTextLink}" class="spantext"><span>${properties.checkboxAnchorText}</span></a></p>
                            
                        </div>
                        <div class="loan-form-otp">
                            
                            <div class="loan-form-otp-parent">
                                <img class="leftarrow lozad" src="/images/back-arrow.png" data-src="/images/back-arrow.png" alt="arrow">
                                <p class="otphead">${properties.verifyHead}</p>
                                <div class="otpsubheadcontainer">
                                    <p class="otpsubhead">${properties.otpsubhead} <span class="otp-phone-num" id="loan-form-otpnum">${properties.otpnumber}</span></p>
                                    <p class="otp-change-num" id="otp-change-num">${properties.otpchangetext}</p>
                                </div>
                               
                                <p class="otpsubsubhead">${properties.otpsubsubhead}<code></code></p>
                                 <div class="inputotp">
                                    <input type="text" id="loan-form-otp-input" maxlength="4">
                                    <span id="otp-digits">${properties.otpdigits}</span>
                                 </div>
                                 <div class="wrongotpmessage">
                                    ${properties.wrongotpmessage}
                                 </div>
                                 <div class="resendtext">
                                    <p>
                                        ${properties.resendtext}
                                    </p>
                                    <button type="button" id="loan-form-resend-otp">${properties.resendtextotp}</button>
                                    <span class="timer">${properties.resendtimer}</span>
                            </div>
                           
                             </div>
    
                               
    
                        </div>
                        <div class="sucess-form">
                            <div class="sucess-form-parent">
                                <div class="cross">
                                    <img  class="loansucess lozad" src="${properties.sucessFirstImg}" data-src="${properties.sucessFirstImg}" alt="loan-sucess-img">
                                    <img class="crossimage lozad" data-src="${properties.crossTwo}" src="${properties.crossTwo}" alt="cross-img">
    
                                </div>
                                <p class="loan-request-text">${properties.FirstLineText}</p>
                                <p class="qrcode-text">${properties.SecondLineText}</p>
                                <div class="barcode-parent">
    
                                    <img class="barcode lozad" src="${properties.sucessSecondImg}" data-src="${properties.sucessSecondImg}" alt="barcode">
                                </div>
                                <div class="mobilescanner">
                                    <p class="mobilescannertext">${properties.MobileLineText}</p>
                                    <div class="mobilebuttons">
                                        <a href="${properties.scanImgOneLink}"><img data-src="${properties.scanImgOne}" src="${properties.scanImgOne}" alt="Play Store" class="first-img lozad"></a>
                                        <a href="${properties.scanImgTwoLink}"><img data-src="${properties.scanImgTwo}" src="${properties.scanImgTwo}" alt="App Store" class="second-img lozad"></a>
                                        
                                    </div>
                                </div>
                               
    
                            </div>
                        </div>
                        <div class="loan-request-fail-form">
                               <div class="images">
                                   
    
                                        <img class="errorimage lozad" data-src="${properties.errorImage}" src="${properties.errorImage}" alt="error">
                                  
                                    
                                        <img class= "failformcross lozad" src="${properties.crossThree}" data-src="${properties.crossThree}" alt="cross">
                                
                               </div>
                               <p class="main-heading">${properties.errorhead}</p>
                               <p class="main-sub-heading">${properties.errorSubhead}</p>
                               <div class="redbox">
                                <img class= "alertimg lozad" src="${properties.errorwarning}" data-src="${properties.errorwarning}" alt="error-warning">
                                
                                <P>${properties.RedBoxText}</P>
                               </div>
    
                        </div>
                        <div class="loan-sw-wrong">
                            <div class="images">
                                
    
                                <img class="errorimage lozad" src="${properties.errorImage2}" data-src="${properties.errorImage2}" alt="error">
                               
                                 
                                 <img class="failformcross sw-wrongcross lozad" src="${properties.crossFour}" data-src="${properties.crossFour}" alt="cross">
                             
                            </div>
                            <p class="main-heading">${properties.errorMessageOne}</p>
                            <p class="main-sub-heading">${properties.errorMessageTwo}</p>
                            
                        </div>
                </div>
                
              
              
                    
                
            </div>
            <div class="loan-form-button-container first-form-button">
                <button id="loan-form-button" class="cmp-container"> 
                    <div class="btn-text">${properties.buttonOne}</div>
                    <div class="loader loader-initialized"></div>
                </button>
            </div>
            <div class="loan-form-button-container  loan-form-otp-button-container">
                <button id="loan-from-otp-verify" class="cmp-container">
                    <div class="btn-text"> ${properties.buttonTwo}</div>
                    <div class="loader"></div>
                </button>
            </div> 
            <div class="sw-wrong-button-container">
                <button  class="cmp-container">${properties.buttonThree}
                </button>
            </div>
    
            <div class="option-form-parent" id="statecontainer"> 
                <div class="option-form">
                    <ul>
                    </ul>
                </div>
            </div>
            <div class="option-form-parent" id="branchcontainer">
                <div class="option-form">
                       <ul>
                            <li class="orangepoints">No options</li>
                       </ul>
                   </div> 
            </div> 
        </div>
    </div>`;

  return appplyLoanTemplate;
}

/* <!-- loan-form-sub-otp   loan-form-success  loan-form-request-fail  loan-form-something-wrong -->
<!-- btn-active loader-initialized --> */
