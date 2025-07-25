import { renderCalculatorData } from "../emiandeligiblitycalc/renderhpcal.js";
import { homeLoanCalcFunc } from "../emiandeligiblitycalc/homeloancalculators.js";
import { CalcHTM } from "../emiandeligiblitycalc/templatehtml1.js";
import { firstTabActive } from "../emiandeligiblitycalc/commonfile.js";
import { targetObject } from "../../scripts/scripts.js";
import { calculatorFlatStrLogic, CFApiCall, fetchAPI } from "../../scripts/common.js";

let calculatorType; let emiCalDiv; let emiOverlay; let
  overlay;

export default async function decorate(block) {
  const cfURL = block.textContent.trim();

  const cfRepsonse = await CFApiCall(cfURL);
  /* const repsonseData = cfRepsonse.data[0].data;
  const jsonResponseData = JSON.parse(repsonseData) */

  const repsonseData = cfRepsonse.data;
  const jsonResponseData = calculatorFlatStrLogic(repsonseData);

  /* const callJson = {
    total: 1,
    offset: 0,
    limit: 1,
    data: [
      {
        maindivbackground: "emi",
        title: "EMI Calculator",
        mainheadingclass: "",
        salaried: {
          salariedcheck: true,
          salariedtabid: "salariedTab",
          salariedtabname: "employementStatus",
          salariedtabvalue: "80",
          salariedtabtext: "I'm Salaried",
          calculatorsalariedimg: "/images/calculator-salaried.svg",
          calculatorsalariedimgalt: "salaried",
        },
        business: {
          businesscheck: true,
          businesstabid: "businessTab",
          businesstabname: "employementStatus",
          businesstabvalue: "60",
          businesstabtext: "I'm doing Business",
          calculatorbusinessimg: "/images/calculator-business.svg",
          calculatorbusinessimgalt: "business",
        },
        selectloantype: {
          checboxemitab: true,
          subheading: "Select loan type",
          subheadingtow: "",
        },
        tabname: {
          firsttabbname: "Home Loan",
          secondtabbname: "Business Loan",
          thridtabname: "",
        },
        chechboxemiobj: {
          chechboxemi: true,
          loanamout: [
            {
              label: "Loan amount (Rs.)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "em1",
              dataattr: "loanamt",
              rangeminvalue: "500000",
              rangemaxvalue: "50000000",
              rangestep: "10000",
              displayvalue: "2500000",
              minvaluetext: "5L",
              maxvaluetext: "5Cr",
            },
            {
              label: "Loan Tenure (Years)",
              labelyearsvalue: "Years",
              rupeesign: "",
              dataslider: "em2",
              dataattr: "tenure",
              rangeminvalue: "5",
              rangemaxvalue: "30",
              rangestep: "1",
              displayvalue: "10",
              minvaluetext: "5Y",
              maxvaluetext: "30Y",
            },
            {
              label: "Interest Rate (% p.a)",
              labelyearsvalue: "%",
              rupeesign: "",
              dataslider: "em3",
              dataattr: "roi",
              rangeminvalue: "10.5",
              rangemaxvalue: "20",
              rangestep: "0.1",
              displayvalue: "11",
              minvaluetext: "10.50%",
              maxvaluetext: "20%",
            },
          ],
        },
        chechboxelibilityobj: {
          chechboxemi: true,
          loanamout: [
            {
              label: "Loan amount (Rs.)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "el1",
              dataattr: "loanamt",
              rangeminvalue: "100000",
              rangemaxvalue: "20000000",
              rangestep: "100000",
              displayvalue: "800000",
              minvaluetext: "1L",
              maxvaluetext: "2Cr",
            },
            {
              label: "Loan Tenure (Years)",
              labelyearsvalue: "Years",
              rupeesign: "",
              dataslider: "el4",
              dataattr: "tenure",
              rangeminvalue: "1",
              rangemaxvalue: "4",
              rangestep: "1",
              displayvalue: "10",
              minvaluetext: "1Y",
              maxvaluetext: "4Y",
            },
            {
              label: "Interest Rate (% p.a)",
              labelyearsvalue: "%",
              rupeesign: "",
              dataslider: "el3",
              dataattr: "roi",
              rangeminvalue: "17",
              rangemaxvalue: "24",
              rangestep: "0.1",
              displayvalue: "20",
              minvaluetext: "17%",
              maxvaluetext: "24%",
            },
          ],
        },
        calendarbox: "/content/dam/piramalfinance/homepage/images/calc-calendar-mobile.webp",
        calendarmobile: "/content/dam/piramalfinance/homepage/images/calc-calendar-mobile.webp",
        outputtext1: "Your home loan EMI is",
        outputtext2: "Your business loan EMI is",
        principaltext: "Principal amount",
        interesttext: "Interest amount",
        button1text: "Talk to loan expert",
        button1link: "",
        button2text: "Apply loan now",
        button2link: "",
        pageproperties: "hl",
      },
    ],
    ":type": "sheet",
  }; */

  block.innerHTML = CalcHTM(jsonResponseData);
  try {
    emiCalDiv = document.querySelector('.home-page-calculator-call-xf .homeloancalculator-wrapper');
    emiOverlay = emiCalDiv.querySelector('.cmp-container--caloverlay');
    // overlay = emiCalDiv.querySelector(".modal-overlay");
    homeLoancalculatorCallXf();
  } catch (error) {
    console.warn(error);
  }
}

export function homeLoancalculatorCallXf() {
  document.querySelectorAll("[data-teaserv2-xf='home-page-calculator-call-xf']")
    && document.querySelectorAll("[data-teaserv2-xf='home-page-calculator-call-xf']").forEach((eachTeaserv2) => {
      eachTeaserv2.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
        const xfGetAttr = this.getAttribute('data-teaserv2-xf');
        const findSectionXFShow = document.querySelector(`.${xfGetAttr}`);
        const currentSection = document.querySelector('.home-page-calculator-call-xf .homeloancalculator-wrapper');
        findSectionXFShow.querySelector('.overlayDiv').classList.add('show');
        if (xfGetAttr == 'home-page-calculator-call-xf') {
          targetObject.calculatorType = 'EMI Calculator';
          findSectionXFShow.classList.remove('dp-none'); // look
          calculatorType = 'emi';
          emiOverlay.classList.add('show');
          document.querySelector('.modal-overlay').classList.add('overlay');
          document.querySelector('.modal-overlay').classList.remove('dp-none');
          // overlay.classList.add("show");
          document.body.style.overflow = 'hidden';
          homeLoanCalcFunc(currentSection);
          renderCalculatorData(currentSection, calculatorType);
          firstTabActive(currentSection);
        }
        targetObject.model = currentSection;
        // xfShowHideBodyClick(currentSection);
      });
    });
}
