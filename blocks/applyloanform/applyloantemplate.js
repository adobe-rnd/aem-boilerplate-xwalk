export function appplyLoanTemplate(a){function l(){const c=document.createElement("div");return a.options.forEach(i=>{const t=document.createElement("ul");for(const[d,r]of Object.entries(i)){const e=document.createElement("li");e.textContent=d,e.setAttribute("data-get-input","form-loan-type"),e.classList.add("subpoints"),t.appendChild(e),r.forEach(o=>{const s=document.createElement("li");s.textContent=o.litext,s.setAttribute("data-loan-type",o.loantype),s.setAttribute("data-loan-name",o.loanname),s.setAttribute("data-get-input","form-loan-type"),s.classList.add("subpoints"),t.appendChild(s)})}c.appendChild(t)}),c.innerHTML}const n=l();return`<div class="loan-form-sub-parent">
        <div class="cmp-container">
             <div class="loan-form">
                <div class="cmp-container">
                        <div class="loan-form-heading-parent ">
                            <div class="cmp-container">
                                <div class="image">
                                    <img data-src="${a.rupeeIcon}" src="${a.rupeeIcon}"
                                        class="cmp-image__image lozad"  alt="send">
                                </div>
                                <div class="text">
                                    <p>${a.mainFormHeading}</p>
                                </div>
                                <div class="image crossimage">
                                    <img data-src="${a.crossOne}" src="${a.crossOne}"
                                        class="cmp-image__image lozad" alt="close-icon">
                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <form  
                                id="loan-main-form" name="loan-main-form" class="cmp-form">
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${a.loanType}<span>*</span></label>
                                        <div class="cmp-form-text-parent multiselectoptions">
                                            <input class="cmp-form-text__text" type="text" id="form-loan-type"
                                                placeholder="${a.loanTypePlaceholder}" readonly  autocomplete="off">
                                            <span class="arrowimage"><img class="lozad" src="/images/down-arrow.png"
                                                    data-src="/images/down-arrow.png" alt="arrowimage" src="/images/down-arrow.png">
                                            </span>
                                        </div>
                                        <div class="option-form-parent">
                                            <div class="option-form loan-form-drpdown">

                                               
                                                   ${n}
                                                   
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${a.loanAmount}<span>*</span></label>
                                        <div class="cmp-form-text-parent">
                                            <span class="rupee">\u20B9</span>
                                            <input class="cmp-form-text__text" type="text" data-value-type="money" id="form-loan-amount"  placeholder=""
                                            autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${a.fullNames}<span>*</span></label>
                                        <div class="cmp-form-text-parent">
                                            <input class="cmp-form-text__text" id="form-customer-name" data-value-type="name"  type="text" placeholder="${a.fullNamesPlaceholder}"
                                                autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${a.mobileNumber}<span>*</span></label>
                                        <div class="cmp-form-text-parent">
                                            <input class="cmp-form-text__text" type="text" id="form-customer-no" maxlength="10" data-validation="isvalidNumber" data-isvalid="false"
                                                placeholder="${a.mobileNumberPlaceholder}" name="contact" inputmode="numeric" autocomplete="off">
                                            <span class="loan-form-err invalid-no-msg">
                                                First digit should be 6 or 7 or 8 or 9.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="loan-form-checkbox">
                                    <fieldset class="cmp-form-options--radio">
                                        <legend class="cmp-form-options__legend">${a.checkboxTitle}</legend>
                                        <div class="cmp-field-parent-parent">
                                            <div class="cmp-form-option-parent">
                                                <label for="radio-salary" id="radio-salary-id"
                                                    class="cmp-form-options__field-label">
                                                    <div class="cmp-form-input-parent">
                                                        <input class="cmp-form-options__field--radio" id="radio-salary"
                                                            name="emplyoment" checked type="radio">
                                                        <span
                                                            class="cmp-form-options__field-description">${a.firstCheckText}</span>
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
                                                        <span class="cmp-form-options__field-description">${a.secondCheckText}</span>
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
                                        <label for="form-text">${a.monthlyIncome}<span>*</span></label>
                                        <div class="cmp-form-text-parent">
                                            <span class="rupee">\u20B9</span>
                                            <input class="cmp-form-text__text" id="form-income" data-value-type="money"  type="text" placeholder="" name="text" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${a.datePicker}<span>*</span></label>
                                        <div class="cmp-form-text-parent" id="dob-container">
                                            <input class="cmp-form-text__text dobclass" type="text" placeholder="${a.datePickerPlaceholder}"
                                                id="loan-form-dob" name="text" maxlength="10" autocomplete="off" data-value-type="date">
                                            <span class="arrowimage dobarrow" id="loan-form-cal-id"><img class="lozad" src="/images/calendar.png"
                                                data-src="/images/calendar.png" alt="dobarrow">
                                            </span>
    
                                            <span class="loan-form-err invalid-date-msg">
                                                Kindly enter proper date of birth
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text">
                                    <div class="cmp-form-text">
                                        <label for="form-text">${a.state}<span>*</span></label>
                                        <div class="cmp-form-text-parent stateparent laststate checkInputRegx" id="stateparent">
                                            <input class="cmp-form-text__text" type="text" placeholder="${a.statePlaceholder}"  autocomplete="off"
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
                                        <label for="form-text">${a.branch}<span>*</span></label>
                                        <div class="cmp-form-text-parent  branchparent checkInputRegx" id="branchparent">
                                            <input class="cmp-form-text__text" type="text"
                                                placeholder="${a.branchPlaceholder}" id="form-branch-city" name="text"  autocomplete="off">
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
                            <p class="checkboxtext">${a.checkboxText}<a target="_blank" href="${a.checkboxAnchorTextLink}" class="spantext"><span>${a.checkboxAnchorText}</span></a></p>
                            
                        </div>
                        <div class="loan-form-otp">
                            
                            <div class="loan-form-otp-parent">
                                <img class="leftarrow lozad" src="/images/back-arrow.png" data-src="/images/back-arrow.png" alt="arrow">
                                <p class="otphead">${a.verifyHead}</p>
                                <div class="otpsubheadcontainer">
                                    <p class="otpsubhead">${a.otpsubhead} <span class="otp-phone-num" id="loan-form-otpnum">${a.otpnumber}</span></p>
                                    <p class="otp-change-num" id="otp-change-num">${a.otpchangetext}</p>
                                </div>
                               
                                <p class="otpsubsubhead">${a.otpsubsubhead}<code></code></p>
                                 <div class="inputotp">
                                    <input type="text" id="loan-form-otp-input" maxlength="4">
                                    <span id="otp-digits">${a.otpdigits}</span>
                                 </div>
                                 <div class="wrongotpmessage">
                                    ${a.wrongotpmessage}
                                 </div>
                                 <div class="resendtext">
                                    <p>
                                        ${a.resendtext}
                                    </p>
                                    <button type="button" id="loan-form-resend-otp">${a.resendtextotp}</button>
                                    <span class="timer">${a.resendtimer}</span>
                            </div>
                           
                             </div>
    
                               
    
                        </div>
                        <div class="sucess-form">
                            <div class="sucess-form-parent">
                                <div class="cross">
                                    <img  class="loansucess lozad" src="${a.sucessFirstImg}" data-src="${a.sucessFirstImg}" alt="loan-sucess-img">
                                    <img class="crossimage lozad" data-src="${a.crossTwo}" src="${a.crossTwo}" alt="cross-img">
    
                                </div>
                                <p class="loan-request-text">${a.FirstLineText}</p>
                                <p class="qrcode-text">${a.SecondLineText}</p>
                                <div class="barcode-parent">
    
                                    <img class="barcode lozad" src="${a.sucessSecondImg}" data-src="${a.sucessSecondImg}" alt="barcode">
                                </div>
                                <div class="mobilescanner">
                                    <p class="mobilescannertext">${a.MobileLineText}</p>
                                    <div class="mobilebuttons">
                                        <a href="${a.scanImgOneLink}"><img data-src="${a.scanImgOne}" src="${a.scanImgOne}" alt="Play Store" class="first-img lozad"></a>
                                        <a href="${a.scanImgTwoLink}"><img data-src="${a.scanImgTwo}" src="${a.scanImgTwo}" alt="App Store" class="second-img lozad"></a>
                                        
                                    </div>
                                </div>
                               
    
                            </div>
                        </div>
                        <div class="loan-request-fail-form">
                               <div class="images">
                                   
    
                                        <img class="errorimage lozad" data-src="${a.errorImage}" src="${a.errorImage}" alt="error">
                                  
                                    
                                        <img class= "failformcross lozad" src="${a.crossThree}" data-src="${a.crossThree}" alt="cross">
                                
                               </div>
                               <p class="main-heading">${a.errorhead}</p>
                               <p class="main-sub-heading">${a.errorSubhead}</p>
                               <div class="redbox">
                                <img class= "alertimg lozad" src="${a.errorwarning}" data-src="${a.errorwarning}" alt="error-warning">
                                
                                <P>${a.RedBoxText}</P>
                               </div>
    
                        </div>
                        <div class="loan-sw-wrong">
                            <div class="images">
                                
    
                                <img class="errorimage lozad" src="${a.errorImage2}" data-src="${a.errorImage2}" alt="error">
                               
                                 
                                 <img class="failformcross sw-wrongcross lozad" src="${a.crossFour}" data-src="${a.crossFour}" alt="cross">
                             
                            </div>
                            <p class="main-heading">${a.errorMessageOne}</p>
                            <p class="main-sub-heading">${a.errorMessageTwo}</p>
                            
                        </div>
                </div>
                
              
              
                    
                
            </div>
            <div class="loan-form-button-container first-form-button">
                <button id="loan-form-button" class="cmp-container"> 
                    <div class="btn-text">${a.buttonOne}</div>
                    <div class="loader loader-initialized"></div>
                </button>
            </div>
            <div class="loan-form-button-container  loan-form-otp-button-container">
                <button id="loan-from-otp-verify" class="cmp-container">
                    <div class="btn-text"> ${a.buttonTwo}</div>
                    <div class="loader"></div>
                </button>
            </div> 
            <div class="sw-wrong-button-container">
                <button  class="cmp-container">${a.buttonThree}
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
    </div>`}
    
