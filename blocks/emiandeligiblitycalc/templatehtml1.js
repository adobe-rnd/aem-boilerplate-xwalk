export function CalcHTM(callJson) {
  const salaried = callJson.salaried?.salariedcheck
    ? `
<li id="salaryTab" class="firsttab onetab" style="display: block; background: rgb(255, 255, 255);">
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
    : "";

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
    : "";

let emiinputdiv = "";
  callJson["chechboxemiobj"]["chechboxemi"] &&
    callJson["chechboxemiobj"].loanamout.forEach(function (each, index) {
      emiinputdiv += `<div class="loanamount">
          <div class="data">
              <label class="description">${each.label}</label>
              <!-- add class yearstext for displaying textvalue -->
              <div class="inputdivs ${each.labelyearsvalue ? "yearstext" : ''} ">
      
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

let eligibilityinputdiv = "";
  callJson["chechboxelibilityobj"]["chechboxemi"] &&
    callJson["chechboxelibilityobj"].loanamout.forEach(function (each, index) {
        eligibilityinputdiv += `<div class="loanamount">
          <div class="data">
              <label class="description">${each.label}</label>
              <!-- add class yearstext for displaying textvalue -->
              <div class="inputdivs ${each.labelyearsvalue ? "yearstext" : ''} ">
      
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
    : "";

  const emidiv = callJson.chechboxemiobj.chechboxemi
    ? `
<div class="emicalculator commoncalculator">
    <div class="parent-emi" id="emic">
        <div class="inputDiv">
            ${emiinputdiv}
        </div>
        <div class="outputdiv">
            <div class="output-parent">
                <div class="mainoutput">
                    <img data-src="${callJson.calendarboxemi}"
                        class="outputimg lozad" alt="calendar" src="${callJson.calendarboxemi}">
                    <img data-src="${callJson.calendarboxemimobile}"
                        class="outputimg2 lozad" alt="calendar"
                        src="${callJson.calendarboxemimobile}"
                        data-loaded="true">

                    <p class="outputdes">
                        ${callJson.outputtext1}
                    </p>
                    <div class="outputans" data-cal-result="resultAmt">₹34,438/-</div>

                </div>

                ${rightSideAmount}

            </div>
        </div>
    </div>
</div>`
    : "";


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
    : "";

  return `
 <div class="container responsivegrid overlayDiv cmp-container--caloverlay">
      <div id="container-7dfdb51cd4" class="cmp-container">
          <div class="title home-loan-title">
              <div id="title-bd2a9ac3b1" class="cmp-title">
                  <h3 class="cmp-title__text">${callJson.title}</h3>
              </div>
          </div>
          <div class="homeloancalculator">
              <div class="home-loan-calculator-parent ${callJson.maindivbackground}">
  
                  <div class="hlc-subparent">
                      <ul class="radiotab">
  
                      ${salaried}
  
                        ${business} 
                            
                      </ul>
                  </div>
              </div>
  
              <div class="calculator-parent">
                  <div class="calculator-parent-child">
                      <div class="cp-child">
                          <div class="mainheading ${callJson.mainheadingclass}">
                              <p class="first-head">${callJson.selectloantype.subheading || ""}</p>
                                <p class="second-head">${callJson.selectloantype.subheadingtow || ""}</p>
                          </div>
                          <div class="headingtabs ${callJson.mainheadingclass}">
                              <ul class="headul">


                                  <li class="tab-emi-calc tab-common active">
                                      <p>${callJson.tabname.firsttabbname || ""}</p>
                                  </li>
  
                                  <li class="tab-eligibility-calc tab-common">
                                      <p>${callJson.tabname.secondtabbname || ""}</p>
                                  </li>

                                  <li class="tab-eligibility-calc tab-common gst-third-tab">
                                      <p>${callJson.tabname.thridtabname}</p>
                                  </li>
  
  
                              </ul>
                          </div>
                          <div class="calctabs">


                                ${emidiv}
                                ${eligibilitydiv}
  
                          </div>
  
                          <div class="customerbuttons ${callJson.button1text ? "" : "dp-none"}">
  
                              <a href="${callJson.button1link}" target="_self">
  
                                  <button class="expert">${callJson.button1text}</button>
                              </a>
                              <a href="${callJson.button2link}" target="_self">
  
                                  <button class="expert orangeexpert">${callJson.button2text}</button>
                              </a>
  
                          </div>
                      </div>
                  </div>
              </div>
  
              <div class="homepagemobiledesign"></div>
              <input type="hidden" name="product type" id="calculator-product-type" value="${callJson.pageproperties}">
              <!-- tab-center--calculator -->
          </div>
      </div>
  </div>
  `;
}
