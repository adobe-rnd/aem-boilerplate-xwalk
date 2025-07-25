import { ctaClick } from '../../dl.js';
import { targetObject } from '../../scripts/scripts.js';
import { currenyCommaSeperation } from '../../scripts/common.js';
import { renderCalculatorData } from './renderhpcal.js';
import { resetCalculator } from './resetCalculator.js';

/* document.addEventListener("DOMContentLoaded", function () {
  homeLoanCalcFunc();
}); */

export function homeLoanCalcFunc(currentSection) {
  const salariedDivs = currentSection.querySelectorAll('.onetab');
  const businessDivs = currentSection.querySelectorAll('.twotab');

  const salariedRadios = currentSection.querySelectorAll('.input_salary_checkbox');
  const businessRadios = currentSection.querySelectorAll('.input_business_checkbox');

  // just below heading tabs color changes and input click  code start
  salariedDivs.forEach((salariedDiv, index) => {
    salariedDiv.addEventListener('click', () => {
      handleTabClick(salariedDiv, true, index);
    });
  });
  businessDivs.forEach((businessDiv, index) => {
    businessDiv.addEventListener('click', () => {
      handleTabClick(businessDiv, false, index);
    });
  });

  function handleTabClick(tabDiv, isSalaried, index) {
    try {
      const click_text = tabDiv.textContent.trim();
      const cta_position = '';
      const cta_category = tabDiv.closest('.section')?.previousElementSibling.querySelector(".default-content-wrapper").querySelector('h1, h2, h3, h4, h5, h6').textContent.trim() || '';
      ctaClick(click_text, cta_category, cta_position, targetObject.pageName);
    } catch (error) {
        console.log(error);
    }
    const backgroundDiv = tabDiv.closest('.home-loan-calculator-parent');
    const calculatorDiv = tabDiv.parentElement.closest('.home-loan-calculator-parent ').nextElementSibling;
    const radioInput = isSalaried ? salariedRadios[index] : businessRadios[index];
    const docRequiredBackground = document.querySelector('.documents-required-brown');
    const docSalaries = document.querySelectorAll('.cmp-text--doc-salary');
    const docBusinesses = document.querySelectorAll('.cmp-text--doc-business');

    radioInput.checked = true;
    tabDiv.style.background = isSalaried ? '#fff7f4' : '#eef3ff';
    const otherTabDiv = isSalaried ? businessDivs[index] : salariedDivs[index];
    otherTabDiv.style.background = '#ffffff';

    calculatorDiv.style.background = isSalaried ? '#fff7f4' : '#eef3ff';
    backgroundDiv.style.background = isSalaried ? '-webkit-linear-gradient(right, #fff 50%, #fff7f4 50%)' : '-webkit-linear-gradient(right, #eef3ff 50%, #fff 50%)';
    if (docRequiredBackground) {
      docRequiredBackground.style.background = isSalaried ? '#fff7f4' : '#eef3ff';
    }
    if (docSalaries) {
      docSalaries.forEach((docSalary) => {
        docSalary.style.display = isSalaried ? 'block' : 'none';
      });

      docBusinesses.forEach((docBusiness) => {
        docBusiness.style.display = isSalaried ? 'none' : 'block';
      });
    }
  }

  // just below heading tabs color changes and input click  code end.

  // blueTabparent and redparent
  //  var bluetabParent = document.querySelector(".blue-tab");
  //  var lightredParent = document.querySelector(".light-red-tab");

  //     if (bluetabParent) {
  //         salariedDivs.forEach(function(salariedDiv, index) {
  //             salariedDiv.removeEventListener("click", function() {
  //                 handleTabClick(salariedDiv, true, index);
  //             });
  //         });
  //     }

  //     if (lightredParent) {
  //         businessDivs.forEach(function(businessDiv, index) {
  //             businessDiv.removeEventListener("click", function() {
  //                 handleTabClick(businessDiv, false, index);
  //             });
  //         });
  //     }

  // this for emi and elg calculator click

  const emiTabs = document.querySelectorAll('.tab-emi-calc');
  const elgTabs = document.querySelectorAll('.tab-eligibility-calc');
  const emiDivs = document.querySelectorAll('.emicalculator');
  const elgDivs = document.querySelectorAll('.eligibilitycalculator');
  const firstHead = document.querySelector('.first-head');
  const secondHead = document.querySelector('.second-head');
  const gstBtn = document.querySelector('.gst-third-tab');

  // Function to handle click on emi tabs
  function handleEmiTabClick(index) {
    // Activate emi tab and deactivate eligibility tab
    const isAlreadyActive = emiTabs[index].classList.contains('active');
    emiTabs[index].classList.add('active');
    elgTabs[index].classList.remove('active');

    // Show emi div and hide eligibility div
    emiDivs[index].style.display = 'block';
    elgDivs[index].style.display = 'none';

    if (isAlreadyActive == false) {
      resetCalculator(emiDivs[index]);
    }

    if (secondHead) {
      secondHead.style.display = 'block';
      firstHead.style.display = 'block';
    }
  }

  // Function to handle click on eligibility tabs
  function handleElgTabClick(index) {
    // Activate eligibility tab and deactivate emi tab
    const isAlreadyActive = elgTabs[index].classList.contains('active');

    elgTabs[index].classList.add('active');
    emiTabs[index].classList.remove('active');

    // Show eligibility div and hide emi div
    elgDivs[index].style.display = 'block';
    emiDivs[index].style.display = 'none';

    if (isAlreadyActive == false) {
      resetCalculator(elgDivs[index]);
    }

    if (secondHead) {
      firstHead.style.display = 'block';
      secondHead.style.display = 'block';
    }
  }

  function handleSalaryTabClickNone(index) {
    const salariedDivs = currentSection.querySelectorAll('.onetab');

    salariedDivs[index].style.display = 'none';
  }
  function handleSalaryTabClickBlock(index) {
    const salariedDivs = currentSection.querySelectorAll('.onetab');

    salariedDivs[index].style.display = 'block';
  }

  // Add event listeners to emi tabs
  if (emiTabs[0]) {
    emiTabs[0].addEventListener('click', () => {
      handleEmiTabClick(0);
      if (gstBtn) {
        gstBtn.classList.remove('active');
      }
    });
  }

  if (emiTabs[1]) {
    emiTabs[1].addEventListener('click', () => {
      handleEmiTabClick(1);
      // handleSalaryTabClickBlock(1);
    });
  }
  if (gstBtn) {
    gstBtn.addEventListener('click', () => {
      elgTabs[0].classList.remove('active');
      emiTabs[0].classList.remove('active');
      gstBtn.classList.add('active');
      elgDivs[0].style.display = 'block';
      emiDivs[0].style.display = 'none';
    });
  }
  // Add event listeners to eligibility tabs
  if (elgTabs[0]) {
    elgTabs[0].addEventListener('click', () => {
      handleElgTabClick(0);
      if (gstBtn) {
        gstBtn.classList.remove('active');
      }
      // handleSalaryTabClickNone(0);
    });
  }
  if (elgTabs[1]) {
    elgTabs[1].addEventListener('click', () => {
      handleElgTabClick(1);

      // handleSalaryTabClickNone(1);
    });
  }

  //  Slider linear gradient and slider value and input value code start
  const sliderValues = currentSection.querySelectorAll('.slider-value');

  sliderValues.forEach((sliderValue) => {
    const sliderId = sliderValue.dataset.slider;
    const myRangeSlider = currentSection.querySelector(`#${sliderId}`);
    const { calInput } = myRangeSlider.dataset;

    sliderValue.value = formatIndianNumber(myRangeSlider.value);

    myRangeSlider.addEventListener('input', () => {
      updateInputValue();
      sliderValue.value = formatIndianNumber(myRangeSlider.value);
    });

    sliderValue.addEventListener('focusout', function () {
      let parsedValue = parseFloat(sliderValue.value.replaceAll(',', '')) || 0;
      const minValue = parseFloat(myRangeSlider.min);
      const maxValue = parseFloat(myRangeSlider.max);
      if (parsedValue < minValue) {
        parsedValue = minValue;
      }
      if (parsedValue > maxValue) {
        parsedValue = maxValue;
      }
      myRangeSlider.value = parsedValue;
      if (this.dataset.calInput === 'roi') {
        sliderValue.value = parseFloat(parsedValue);
      } else {
        sliderValue.value = formatIndianNumber(parsedValue);
      }
      updateInputValue();

      sliderValue.dispatchEvent(new Event('change', { bubbles: true }));
    });

    function updateInputValue() {
      const valPercent = ((myRangeSlider.value - myRangeSlider.min) / (myRangeSlider.max - myRangeSlider.min)) * 100;
      myRangeSlider.style.background = `linear-gradient(90deg, #da4d34 ${valPercent}%, #dbd7d8 ${valPercent}%)`;
    }

    myRangeSlider.dispatchEvent(new Event('input'));

    function formatIndianNumber(value) {
      //  let newvalue = value.replace(/,/g, "");
      const val = value;
      return isNaN(Number(val)) ? 0 : currenyCommaSeperation(val);
    }

    sliderValue.addEventListener('input', function (number) {
      const inputValue = sliderValue.value;

      // Remove non-numeric characters except the decimal point
      let cleanedValue = inputValue.replace(/[^\d.]/g, '');
      const inputType = this.dataset.calInput;
      // not accept decimal point

      let parsedValue = cleanedValue;
      cleanedValue = String(cleanedValue);

      if (inputType === 'roi') {
        parsedValue = parsedValue;
      } else if (inputType === 'tenure') {
        parsedValue = cleanedValue.replace(/\./g, '').replaceAll(',', '');
      } else {
        parsedValue = formatIndianNumber(parsedValue);
      }

      sliderValue.value = parsedValue;
    });

    sliderValue.addEventListener('change', function (e) {
      const inputValue = sliderValue.value;

      // Remove non-numeric characters except the decimal point
      let cleanedValue = inputValue.replace(/[^\d.]/g, '');
      const inputType = this.dataset.calInput;
      // not accept decimal point

      const minValue = parseFloat(myRangeSlider.min);
      const maxValue = parseFloat(myRangeSlider.max);

      if (cleanedValue < minValue) {
        cleanedValue = minValue;
      }
      if (cleanedValue > maxValue) {
        cleanedValue = maxValue;
      }

      let parsedValue = String(cleanedValue);

      if (inputType === 'roi') {
        parsedValue = parsedValue;
      } else if (inputType === 'tenure') {
        parsedValue = parsedValue.replace(/\./g, '').replaceAll(',', '');
      } else {
        parsedValue = formatIndianNumber(parsedValue);
      }

      sliderValue.value = parsedValue;
      myRangeSlider.value = cleanedValue;
      updateInputValue();
    });
  });

  //  Slider linear gradient and slider value and input value code end
}
