export function partPaymentCalHTML(callJson) {
  const isMobile = window.matchMedia('(max-width: 768px)');
  let buttonLink1 = callJson.button1link;
  let buttonLink2 = callJson.button2link;
  if (isMobile.matches && buttonLink1 && buttonLink2) {
    buttonLink1 = callJson.button1link.replace('DWEB', 'MWEB');
    buttonLink2 = callJson.button2link.replace('DWEB', 'MWEB');
  }

  const salaried = callJson.salaried?.salariedcheck
    ? `
    <li id="salaryTab" class="firsttab onetab">
        <div class="customecheck">
            <div class="salary-parent">
                <input type="radio" id="${callJson.salaried.salariedtabid}" name="${callJson.salaried.salariedtabname}"
                    class="input_salary_checkbox" data-cal-foir="salaried" value="${callJson.salaried.salariedtabvalue}"
                    checked>
                <label for="${callJson.salaried.salariedtabid}">${callJson.salaried.salariedtabtext}</label>
                <div class="blackborder">
                    <div class="black">
    
                    </div>
                </div>
            </div>
            <div class="customimage">
                <img data-src="${callJson.salaried.calculatorsalariedimg}" class="customer lozad"
                    alt="${callJson.salaried.calculatorsalariedimgalt}" src="${callJson.salaried.calculatorsalariedimg}"
                    data-loaded="true">
            </div>
    
        </div>
    </li>`
    : '';

  const business = callJson.business?.businesscheck
    ? `
    <li id="${callJson.business.businesstabid}" class="firsttab secondtab twotab">
        <div class="customecheck">
            <div class="salary-parent business-parent">
                <input type="radio" id="${callJson.business.businesstabid}" name="${callJson.business.businesstabname}"
                    class="input_business_checkbox" data-cal-foir="biz" value="${callJson.business.businesstabvalue}">
                <label for="${callJson.business.businesstabid}">${callJson.business.businesstabtext}</label>
                <div class="blackborder">
                    <div class="black">
    
                    </div>
                </div>
    
            </div>
            <div class="customimage">
                <img data-src="${callJson.business.calculatorbusinessimg}"
                    class=" customer lozad" alt="${callJson.business.calculatorbusinessimgalt}"
                    src="${callJson.business.calculatorbusinessimg}"
                    data-loaded="true">
            </div>
        </div>
    
    </li> `
    : '';

  let emiinputdiv = '';
  callJson.chechboxemiobj.chechboxemi
      && callJson.chechboxemiobj.loanamout.forEach((each, index) => {
        emiinputdiv += `<div class="loanamount">
              <div class="data">
                  <label class="description">${each.label}</label>
                  <!-- add class yearstext for displaying textvalue -->
                  <div class="inputdivs ${each.labelyearsvalue ? 'yearstext' : ''} ">
          
                      <span class="rupee">${each.rupeesign}</span>
          
                      <label for="calcemi-${index}" aria-label="calculateemi"></label>
                      <input type="text" class="inputvalue slider-value" value=""
                          id="calcemi-${index}" data-slider="${each.dataslider}" data-cal-input="${each.dataattr}">
          
                      <span class="textvalue">${each.labelyearsvalue}</span>
          
                  </div>
              </div>
              <div class="rangediv">
                  <input type="range" min="${each.rangeminvalue}" step="${each.rangestep}" max="${each.rangemaxvalue}"
                      value="${each.displayvalue}" id="${each.dataslider}" class="range-slider__range">
                  <div class="values">
                      <span class="text">${each.minvaluetext}</span>
                      <span class="text">${each.maxvaluetext}</span>
                  </div>
              </div>
          </div>`;
      });

  let eligibilityinputdiv = '';
  callJson.chechboxelibilityobj.chechboxemi
      && callJson.chechboxelibilityobj.loanamout.forEach((each, index) => {
        eligibilityinputdiv += `<div class="loanamount">
              <div class="data">
                  <label class="description">${each.label}</label>
                  <!-- add class yearstext for displaying textvalue -->
                  <div class="inputdivs ${each.labelyearsvalue ? 'yearstext' : ''} ">
          
                      <span class="rupee">${each.rupeesign}</span>
          
                      <label for="calcemi-${index}" aria-label="calculateemi"></label>
                      <input type="text" class="inputvalue slider-value" value=""
                          id="calcemi-${index}" data-slider="${each.dataslider}" data-cal-input="${each.dataattr}">
          
                      <span class="textvalue">${each.labelyearsvalue}</span>
          
                  </div>
              </div>
              <div class="rangediv">
                  <input type="range" min="${each.rangeminvalue}" step="${each.rangestep}" max="${each.rangemaxvalue}"
                      value="${each.displayvalue}" id="${each.dataslider}" class="range-slider__range">
                  <div class="values">
                      <span class="text">${each.minvaluetext}</span>
                      <span class="text">${each.maxvaluetext}</span>
                  </div>
              </div>
          </div>`;
      });

  const rightSideAmount = callJson.principaltext
    ? `<div class="amountdiv">
                          <div class="firstamout">
                              <p>${callJson.principaltext}</p>
                              <p class="amount"><span>₹</span><span
                                      data-cal-result="principalAmt">25,00,000</span>
                              </p>
                          </div>
                          <div class="secondamount firstamout">
                              <p>${callJson.interesttext}</p>
                              <p class="amount"><span>₹</span><span
                                      data-cal-result="interestAmt">16,32,560</span>
                              </p>
                          </div>
      </div>`
    : '';

  // Part Payment Start
  let partpaymentoutputDiv = '';
  callJson.partpayment
      && callJson.partpayment.forEach((eachDiv, index) => {
        partpaymentoutputDiv += `<div class="parpaymentmainoutputcontainer">
              <div class="text-and-img">
                  <img data-src="${eachDiv.rightimage}" class="outputimg lozad" alt="roi"
                      src="${eachDiv.rightimage}" data-loaded="true">
                  <div class="amountContainer">
                      <p class="outputdes desc-${index + 1}">
                          ${eachDiv.resulttext}
                      </p>
                      <div class="outputans" data-cal-result="resultAmt"><span class="outputans">${eachDiv.sign}</span><span
                              class="amount-${index + 1}">${eachDiv.resultAmount}</span>
                      </div>
                  </div>
              </div>
          </div>`;
      });

  const partpaymentlogic = callJson.partpaymentlogic
    ? `<div class="partpaymentSection">
      <div class="loanamount partPayment">
          <div class="data">
              <label class="description">${callJson.partpaymentlogic.firstLoanEmiDate}</label>
              <!-- add class yearstext for displaying textvalue -->
              <div class="inputdivs">
                  <input type="text" class="inputvalue" placeholder="${callJson.partpaymentlogic.datePlaceHolder}" id="firstLoan"
                      readonly>
                  <img data-src="${callJson.partpaymentlogic.firstLoanDateImage}" src="${callJson.partpaymentlogic.firstLoanDateImage}" alt="${callJson.partpaymentlogic.dateImageAlt}" class="lozad">
              </div>
          </div>
      </div>
      <div class="paymentInputContainer">
          <div class="loanamount clearAll">
              <div class="data">
                  <label class="description">${callJson.partpaymentlogic.partPaymentTitleText}</label>
                  <!-- add class yearstext for displaying textvalue -->
                  <div class="clearAllText">${callJson.partpaymentlogic.resetText}</div>
              </div>
          </div>
          <div class="boxCont" data-date="scds">
              <div class="loanamount partPayment partpaymentCardContainer" id="partpaymentCardContainer1">
                  <div class="data">
                      <label class="description">${callJson.partpaymentlogic.partPaymentCardlabel}</label>
                      <!-- add class yearstext for displaying textvalue -->
                      <div class="inputdivs dt">
                          <input type="text" class="inputvalue " placeholder="${callJson.partpaymentlogic.datePlaceHolder}" readonly
                              id="partpayment1" disabled>
                          <img data-src="${callJson.partpaymentlogic.firstLoanDateImage}"  src="${callJson.partpaymentlogic.firstLoanDateImage}" alt="${callJson.partpaymentlogic.dateImageAlt}" class="lozad">
                      </div>
                  </div>
                  <div class="loanamount">
                      <div class="data">
                          <label class="description">${callJson.partpaymentlogic.partPaymentSecondLevelAmoutnText}</label>
                          <!-- add class yearstext for displaying textvalue -->
                          <div class="inputdivs ">
  
                              <span class="rupee">${callJson.partpaymentlogic.currencySign}</span>
                              <input type="text" class="inputvalue  slider-value" value="" data-slider="partPayment1"
                                  value="${callJson.partpaymentlogic.rangeValue}">
                              <span class="textvalue"></span>
  
                          </div>
  
  
                      </div>
                      <div class="rangediv">
                          <input type="range" min="${callJson.partpaymentlogic.minAmount}" step="${callJson.partpaymentlogic.steps}"
                              max="${callJson.partpaymentlogic.maxAmount}" value="${callJson.partpaymentlogic.minAmount}" class="range-slider__range"
                              id="partPayment1"
                              style="background: linear-gradient(90deg, rgb(218, 77, 52) 4.0404%, rgb(219, 215, 216) 4.0404%);">
                          <div class="values">
                              <span class="text">${callJson.partpaymentlogic.minAmountText}</span>
                              <span class="text">${callJson.partpaymentlogic.maxAmountText}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
  
  
      </div>
      <div class="add-more-part-payment-btn disabled">
          <img data-src="${callJson.partpaymentlogic.moreSign}" src="${callJson.partpaymentlogic.moreSign}" alt="${callJson.partpaymentlogic.signImgAlt}" class="lozad">
          <span class="addMorePartPayment">${callJson.partpaymentlogic.payMorePartPayment}</span>
      </div>
  </div>`
    : '';

  // Part Payment End

  const emidiv = callJson.chechboxemiobj.chechboxemi
    ? `
    <div class="emicalculator commoncalculator">
        <div class="parent-emi" id="emic">
            <div class="inputDiv">
                ${emiinputdiv}
                ${partpaymentlogic}
            </div>
            <div class="outputdiv">
                <div class="output-parent">
                    <div class="mainoutput partPaymentMainOutPut">
                        
                      ${partpaymentoutputDiv}
    
                    </div>
    
                    ${rightSideAmount}
    
                </div>
            </div>
        </div>
    </div>`
    : '';

  const eligibilitydiv = callJson.chechboxelibilityobj.chechboxemi
    ? `
    <div class="eligibilitycalculator calculator commoncalculator">
        <div class="parent-emi parent-eligibility" id="emic">
            <div class="inputDiv">
                ${eligibilityinputdiv}
            </div>
            <div class="outputdiv">
                <div class="output-parent">
                    <div class="mainoutput">
                        <img data-src="${callJson.calendarmobileelg}"
                            class="outputimg lozad" alt="calendar" src="${callJson.calendarmobileelg}">
                        <img data-src="${callJson.calendarmobileelgmobile}"
                            class="outputimg2 lozad" alt="calendar"
                            src="${callJson.calendarmobileelgmobile}"
                            data-loaded="true">
    
                        <p class="outputdes">
                            ${callJson.outputtext2}
                        </p>
                        <div class="outputans" data-cal-result="resultAmt">₹34,438/-</div>
    
                    </div>
    
                    ${rightSideAmount}
    
                </div>
            </div>
        </div>
    </div>`
    : '';

  const discalimerDiv = callJson.disclaimertitle
    ? `<div class='discalimer-calc'> 
          <span class='title'>${callJson.disclaimertitle}</span>
          <p class='discalimer-first-para'>${callJson.discalimerpara1}</p>
          <div class="disclaimer-container dp-none">
              <p class='discalimer-second-para'>${callJson.discalimerpara2}</p>
              <p class='discalimer-thrid-para'>${callJson.discalimerpara3}</p> 
          </div>
          <button class='read-more-discalimer-calc'>Read more</button>
      </div>`
    : '';

  return `
     <div class="container responsivegrid show">
          <div id="container-7dfdb51cd4" class="cmp-container">
              <div class="title home-loan-title">
                  <div id="title-bd2a9ac3b1" class="cmp-title">
                      <h3 class="cmp-title__text">${callJson.title || ''}</h3>
                  </div>
              </div>
              <div class="homeloancalculator ${callJson.tabcenterclass || ''} ">
                  <div class="home-loan-calculator-parent combined-emi-eligibility ${callJson.mainheadingclass || ''} ${callJson.emiclass || ''}">
      
                      <div class="hlc-subparent">
                          <ul class="radiotab">
      
                          ${salaried}
      
                            ${business} 
                                
                          </ul>
                      </div>
                  </div>
      
                  <div class="calculator-parent ${callJson.handleclass || ''}">
                      <div class="calculator-parent-child">
                          <div class="cp-child">
                              <div class="mainheading ${callJson.dpnoneclass || ''}">
                                  <p class="first-head">${callJson.selectloantype.subheading || ''}</p>
                                    <p class="second-head">${callJson.selectloantype.subheadingtow || ''}</p>
                              </div>
                              <div class="headingtabs ${callJson.dpnoneclass || ''}">
                                  <ul class="headul">
    
    
                                      <li class="tab-emi-calc tab-common active">
                                          <p>${callJson.tabname.firsttabbname || ''}</p>
                                      </li>
      
                                      <li class="tab-eligibility-calc tab-common">
                                          <p>${callJson.tabname.secondtabbname || ''}</p>
                                      </li>
    
                                      <li class="tab-eligibility-calc tab-common gst-third-tab">
                                          <p>${callJson.tabname.thridtabname || ''}</p>
                                      </li>
      
      
                                  </ul>
                              </div>
                              <div class="calctabs">
    
    
                                    ${emidiv}
                                    ${eligibilitydiv}
      
                              </div>
      
                              <div class="customerbuttons ${callJson.button1text ? '' : 'dp-none'}">
      
                                  <a href="${buttonLink1 || ''}" target="_self">
      
                                      <button class="expert">${callJson.button1text || ''}</button>
                                  </a>
                                  <a href="${buttonLink2 || ''}" target="_self">
      
                                      <button class="expert orangeexpert">${callJson.button2text || ''}</button>
                                  </a>
      
                              </div>
                          </div>
                          </div>
                              <div class="discalimer-details dp-none">
                                      ${discalimerDiv}
                              </div>
                  </div>
      
                  <div class="homepagemobiledesign"></div>
                  <input type="hidden" name="product type" id="calculator-product-type" value="${callJson.pageproperties || ''}">
                  <!-- tab-center--calculator -->
              </div>
          </div>
      </div>
      `;
}
