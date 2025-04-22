import {
  applyLoanNow, formInteraction, resendOtp, talkToExpert,
} from '../../dl.js';
import { targetObject } from '../../scripts/scripts.js';
import {
  branchInput,
  cutomerEmployment,
  cutomerIncome,
  cutomerName,
  cutomerNo,
  formDobInput,
  formLoanAmt,
  formTc,
  loanFormContainer,
  loanFormOtpBtn,
  loanOtpInput,
  loanProduct,
  otpNumChange,
  otpPhoneNum,
  stateInput,
} from './loanformdom.js';
import { loanTypeDropdownSelect } from './utm.js';

export let overlay; export let emiOverlay; export let elgOverlay; export let loaninnerform; export let
  bodyElement;

export function createOverlay(el) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.style.zIndex = 1209;
  return {
    hide() {
      el.querySelector('.overlay').remove();
    },
    show() {
      el.append(overlay);
    },
  };
}

export let formOverlay = {};

export function applyLoanFormClick() {
  loaninnerform = document.querySelector('.loan-form-sub-parent');
  loaninnerform = document.querySelector('.loan-form-sub-parent');
  const homeloancalcontainer = document.querySelector('.homeloancalculator.block') || document.createElement('div');
  formOverlay = createOverlay(homeloancalcontainer);
  if (loaninnerform) {
    // checkbox logic
    const checkboxDiv = document.querySelectorAll('.cmp-form-option-parent');

    checkboxDiv[0].style.border = '1px solid #f26841';

    checkboxDiv.forEach((e) => {
      e.addEventListener('click', function () {
        const radioButton = this.querySelector('input[type="radio"]');
        radioButton.checked = true;
        checkboxDiv.forEach((e) => {
          e.style.border = '1px solid #AFB9C3';
        });
        e.style.border = '1px solid #f26841';
      });
    });

    //  Display of form
    const crossIcon = document.querySelectorAll('.crossimage, .failformcross');
    const buttonExpert = document.querySelectorAll('.expert');
    overlay = document.querySelector('.modal-overlay');
    const firstformbtn = document.querySelector('.first-form-button .cmp-container');
    bodyElement = document.body;
    const secondformbtn = document.querySelector('.loan-form-otp-button-container .cmp-container');
    const otparrow = document.querySelector('.leftarrow');
    const documentWhatsAppBtn = document.querySelector('.cmp-container--documentrequired .cmp-container .extendedbutton');
    const productBannerButton = document.querySelector('#loan-banner .cmp-teaser__content .cmp-teaser__action-container .cmp-teaser__action-link');
    const stickyFooter = document.getElementById('sticky-btn-loan-form');
    const locationCardButton = document.querySelectorAll(
      '.cmp-container--branches .cmp-contentfragmentlist .cmp-contentfragment .cmp-contentfragment__elements .cmp-contentfragment__element--ctaName .cmp-contentfragment__element-value',
    );
    const bannerFormButton = document.querySelectorAll('.cmp-teaser--open-form-action .cmp-teaser .cmp-teaser__action-container .cmp-teaser__action-link');
    const neeyatBtn = document.querySelectorAll('.open-form-btn');
    const cardlink = document.querySelector('.location-link');

    buttonExpert.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const anchor = button.closest('a');
        if (anchor && anchor.getAttribute('href')) {
          try {
            const emiName = e.target?.closest('.section')?.querySelector('.tab-common.active p')?.textContent.trim();
            const ctaPos = e.target?.closest('.section')?.querySelector('.calculator-parent p')?.textContent.trim();
            if (e.target.innerText.trim() === 'Talk to loan expert') {
              talkToExpert('calculator', emiName, ctaPos, targetObject.pageName);
            } else if (e.target.innerText.trim() === 'Apply loan now') {
              applyLoanNow('calculator', emiName, ctaPos, targetObject.pageName);
            }
          } catch (error) {
            console.warn(error);
          }
          const link = anchor.getAttribute('href');
          const target = anchor.getAttribute('target');
          if (target === '_blank') {
            window.open(link, target); // Open the link using the target attribute specified by the user
          } else {
            // Default behavior: open the link in the same tab
            window.location.href = link;
          }
        } else {
          formOpen();
          resetLoanForm();
          firstformbtn.classList.remove('loader-initialized');
          loaninnerform.classList.remove('loan-form-sub-otp', 'loan-form-success', 'loan-form-request-fail', 'loan-form-something-wrong');
          try {
            const emiName = e.target?.closest('.section')?.querySelector('.tab-common.active p')?.textContent.trim();
            const ctaPos = e.target?.closest('.section')?.querySelector('.calculator-parent p')?.textContent.trim();
            if (e.target.innerText.trim() === 'Talk to loan expert') {
              talkToExpert('calculator', emiName, ctaPos, targetObject.pageName);
              formInteraction(emiName,"Form Open",targetObject.pageName)
            } else if (e.target.innerText.trim() === 'Apply loan now') {
              applyLoanNow('calculator', emiName, ctaPos, targetObject.pageName);
              formInteraction(targetObject.pageName,"Form Open",targetObject.pageName)
            }
          } catch (error) {
            console.warn(error);
          }
        }

        /* if(loaninnerform){
          let ulFormBranch = document.createElement('li');
          ulFormBranch.textContent = "No options";
          ulFormBranch.classList.add('orangepoints');
          loaninnerform.querySelector('#branchcontainer ul').innerHTML = ulFormBranch.outerHTML;
        } */

        loaninnerform.querySelector('#statecontainer').style.visibility = 'hidden';
        loaninnerform.querySelector('#branchcontainer').style.visibility = 'hidden';
      });
    });

    if (documentWhatsAppBtn) {
      documentWhatsAppBtn.addEventListener('click', (e) => {
        e.preventDefault();
        formOpen();
      });
    }
    if (bannerFormButton) {
      bannerFormButton.forEach((element) => {
        element.addEventListener('click', () => {
          formOpen();
        });
      });
    }
    if (neeyatBtn) {
      neeyatBtn.forEach((element) => {
        element.addEventListener('click', () => {
          formOpen();
        });
      });
    }

    if (productBannerButton && !cardlink) {
      productBannerButton.addEventListener('click', (e) => {
        e.preventDefault();
        formOpen();
      });
    }

    if (stickyFooter && !cardlink) {
      stickyFooter.addEventListener('click', (e) => {
        // e.preventDefault();
        formOpen();
      });
    }

    if (locationCardButton && !cardlink) {
      locationCardButton.forEach((card) => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          formOpen();
        });
      });
    }

    loanTypeDropdownSelect();

    crossIcon.forEach((e) => {
      e.addEventListener('click', (e) => {
        e.stopImmediatePropagation();

        /* Form Close Analytics */
        try {
          formInteraction(targetObject.pageName, 'Form Close', targetObject.pageName);
        } catch (error) {
          console.warn(error);
        }

        // formOverlay.hide()
        const checkingFormopen = document.querySelector('.home-page-calculator-call-xf');
        /* if (emiOverlay || elgOverlay) {
          if (emiOverlay.classList.contains("show") || elgOverlay.classList.contains("show")) { */
        if (checkingFormopen) {
          if (checkingFormopen.querySelector('.homeloancalculator-wrapper .show') || checkingFormopen.querySelector('.eligibilitycalculator-wrapper .show')) {
            
            loaninnerform.querySelector('#statecontainer').style.visibility = 'hidden';
            loaninnerform.querySelector('#branchcontainer').style.visibility = 'hidden';

            loaninnerform.style.visibility = 'hidden';
            overlay.style.zIndex = '1111';

            if (loaninnerform.classList.contains('loan-form-success')) {
              loaninnerform.classList.remove('loan-form-success');
              loaninnerform.classList.remove('loan-form-sub-otp');
            }
          } else {
            loaninnerform.classList.remove('loan-form--open');
            // overlay.classList.remove("show");

            document.querySelector('.modal-overlay').classList.remove('overlay');
            document.querySelector('.modal-overlay').classList.add('dp-none');

            loaninnerform.querySelector('#statecontainer').style.visibility = 'hidden';
            loaninnerform.querySelector('#branchcontainer').style.visibility = 'hidden';

            bodyElement.style.overflowY = 'auto';
            loaninnerform.style.visibility = 'hidden';
            resetLoanForm();
            loaninnerform.classList.remove('loan-form-sub-otp', 'loan-form-success', 'loan-form-request-fail', 'loan-form-something-wrong');
            if (loaninnerform.classList.contains('loan-form-success')) {
              loaninnerform.classList.remove('loan-form-success');
              loaninnerform.classList.remove('loan-form-sub-otp');
            }
          }
        } else {
          loaninnerform.classList.remove('loan-form--open');
          // overlay.classList.remove("show");

          document.querySelector('.modal-overlay').classList.remove('overlay');
          document.querySelector('.modal-overlay').classList.add('dp-none');


          loaninnerform.querySelector('#statecontainer').style.visibility = 'hidden';
          loaninnerform.querySelector('#branchcontainer').style.visibility = 'hidden';

          bodyElement.style.overflowY = 'auto';
          loaninnerform.style.visibility = 'hidden';
          // resetLoanForm();
          // loaninnerform.classList.remove("loan-form-sub-otp", "loan-form-success", "loan-form-request-fail", "loan-form-something-wrong");
          if (loaninnerform.classList.contains('loan-form-success')) {
            loaninnerform.classList.remove('loan-form-success');
            loaninnerform.classList.remove('loan-form-sub-otp');
          }
        }

        /* if(loaninnerform){
          let ulFormBranch = document.createElement('li');
          ulFormBranch.textContent = "No options";
          ulFormBranch.classList.add('orangepoints');
          loaninnerform.querySelector('#branchcontainer ul').innerHTML = ulFormBranch.outerHTML;
        } */

        resetLoanForm();
        loaninnerform.classList.remove('loan-form-sub-otp', 'loan-form-success', 'loan-form-request-fail', 'loan-form-something-wrong');
      });
    });
    if (firstformbtn) {
      firstformbtn.addEventListener('click', () => {
        loaninnerform.classList.add('loan-form-sub-otp');
        otpPhoneNum().textContent = cutomerNo().value;
        document.querySelector('.wrongotpmessage').style.display = 'none';
        startTimer(footer_time_limit, footer_time_out);
        const timerElement = document.querySelector('.applyloanform .timer');
        if (timerElement) {
          timerElement.style.display = 'block';
        }
        loanOtpInput().value = '';

        document.querySelector('#otp-digits').textContent = '0/4 Digits';
      });
    }

    const resendOtpBtn = document.querySelector('#loan-form-resend-otp');
    if (resendOtpBtn) {
      resendOtpBtn.addEventListener('click', () => {
        startTimer(footer_time_limit, footer_time_out);
      });
    }

    otparrow.addEventListener('click', (e) => {
      loaninnerform.classList.remove('loan-form-sub-otp');
      document.querySelector('.wrongotpmessage').style.display = 'none';
      clearInterval(intervalTime);
      loanOtpInput().value = '';
    });

    const loanSubParent = document.querySelector('.loan-form-sub-parent .cmp-container');
    emiOverlay = document.querySelector('.cmp-container--emicaloverlay');
    elgOverlay = document.querySelector('.cmp-container--elgcaloverlay');

    loaninnerform.addEventListener('click', (event) => {
      if (event.target.classList.contains('subpoints')) {
        const inputId = event.target.dataset.getInput;
        const input = document.querySelector(`#${inputId}`);
        input.value = event.target.textContent.trim();

        if (input.id == 'form-loan-type') {
          const { loanType, loanName } = event.target.dataset;
          input.dataset.loanType = loanType;
          input.dataset.loanName = loanName;
          stateInput().value = '';
          loanProduct().dispatchEvent(new Event('change'));
        }

        if (input.id != 'form-loan-type') {
          input.dispatchEvent(new Event('change'));
          input.classList.add('place-selected');
        }

        input.dispatchEvent(new Event('input', { bubbles: true }));

        return;
      }

      if (!loanSubParent.contains(event.target)) {
        if (emiOverlay || elgOverlay) {
          if (emiOverlay.classList.contains('show') || elgOverlay.classList.contains('show')) {
            loaninnerform.querySelector('#statecontainer').style.visibility = 'hidden';
            loaninnerform.querySelector('#branchcontainer').style.visibility = 'hidden';
            loaninnerform.style.visibility = 'hidden';
            overlay.style.zIndex = '1000';
          } else {
            // overlay.classList.remove("show");
            document.querySelector('.modal-overlay').classList.remove('overlay');
            document.querySelector('.modal-overlay').classList.add('dp-none');
            loaninnerform.querySelector('#statecontainer').style.visibility = 'hidden';
            loaninnerform.querySelector('#branchcontainer').style.visibility = 'hidden';
            loaninnerform.style.visibility = 'hidden';
            document.body.style.overflowY = 'auto';
            resetLoanForm();
            clearInterval(intervalTime);
            loanOtpInput().value = '';
            loaninnerform.classList.remove('loan-form-sub-otp', 'loan-form-success', 'loan-form-request-fail', 'loan-form-something-wrong');
          }
        } else {
          // overlay.classList.remove("show");
          document.querySelector('.modal-overlay').classList.remove('overlay');
          document.querySelector('.modal-overlay').classList.add('dp-none');
          loaninnerform.querySelector('#statecontainer').style.visibility = 'hidden';
          loaninnerform.querySelector('#branchcontainer').style.visibility = 'hidden';
          loaninnerform.style.visibility = 'hidden';
          document.body.style.overflowY = 'auto';
          resetLoanForm();
          clearInterval(intervalTime);
          loanOtpInput().value = '';
          loaninnerform.classList.remove('loan-form-sub-otp', 'loan-form-success', 'loan-form-request-fail', 'loan-form-something-wrong');
        }

        /* if(loaninnerform){
          let ulFormBranch = document.createElement('li');
          ulFormBranch.textContent = "No options";
          ulFormBranch.classList.add('orangepoints');
          loaninnerform.querySelector('#branchcontainer ul').innerHTML = ulFormBranch.outerHTML;
        } */

      }
    });

    overlay.addEventListener('click', (event) => {
      if (window.matchMedia('(max-width: 1024px)').matches) {
        // overlay.classList.remove("show");
        document.querySelector('.modal-overlay').classList.remove('overlay');
        document.querySelector('.modal-overlay').classList.add('dp-none');
        loaninnerform.querySelector('#statecontainer').style.visibility = 'hidden';
        loaninnerform.querySelector('#branchcontainer').style.visibility = 'hidden';
        loaninnerform.style.visibility = 'hidden';
        bodyElement.style.overflowY = 'auto';

        /* if(loaninnerform){
          let ulFormBranch = document.createElement('li');
          ulFormBranch.textContent = "No options";
          ulFormBranch.classList.add('orangepoints');
          loaninnerform.querySelector('#branchcontainer ul').innerHTML = ulFormBranch.outerHTML;
        } */
      }
    });

    // })

    function toggleOptionForm(optionFormParent) {
      if (optionFormParent.style.display === 'block') {
        optionFormParent.style.display = 'none';
      } else {
        optionFormParent.style.display = 'block';
      }
    }
    function toggleOptionSelect(optionFormParent) {
      const computedStyle = window.getComputedStyle(optionFormParent);
      const visibility = computedStyle.getPropertyValue('visibility');
      if (visibility === 'hidden') {
        optionFormParent.style.visibility = 'visible';
      } else {
        optionFormParent.style.visibility = 'hidden';
      }
    }

    function toggleArrowImage(arrowImage) {
      arrowImage.classList.toggle('inverted');
    }

    const statecontainer = document.getElementById('statecontainer');
    const stateparent = document.getElementById('stateparent');
    const branchcontainer = document.getElementById('branchcontainer');
    const branchparent = document.getElementById('branchparent');
    const multiSelect = document.querySelector('.multiselectoptions');
    const multiSelectDropdown = multiSelect.nextElementSibling;
    // let multiSelectContainer=document.querySelector(".multiselectoptions");

    let isStateContainerVisible = false;
    let isBranchContainerVisible = false;
    let isLoanContainerVisible = false;

    document.addEventListener('click', handleClickOutside);

    function handleClickOutside(event) {
      if (
        (event.target.closest('#statecontainer') && event.target.classList.contains('subpoints'))
        || (isStateContainerVisible && !stateparent.contains(event.target) && !statecontainer.contains(event.target))
      ) {
        toggleOptionSelect(statecontainer);
        toggleArrowImage(stateparent.querySelector('.arrowimage'));
        loaninnerform.querySelector('#statecontainer').style.visibility = 'hidden';
        isStateContainerVisible = false;
      }
      if (
        (event.target.closest('#branchcontainer') && event.target.classList.contains('subpoints'))
        || (isBranchContainerVisible && !branchparent.contains(event.target) && !branchcontainer.contains(event.target))
      ) {
        toggleOptionSelect(branchcontainer);
        toggleArrowImage(branchparent.querySelector('.arrowimage'));
        loaninnerform.querySelector('#branchcontainer').style.visibility = 'hidden';
        isBranchContainerVisible = false;
      }
      if (
        (event.target.closest('.cmp-form-text') && event.target.classList.contains('subpoints'))
        || (isLoanContainerVisible && !multiSelect.contains(event.target) && !multiSelectDropdown.contains(event.target))
      ) {
        const optionFormParent = multiSelect.nextElementSibling;
        toggleOptionForm(optionFormParent);
        toggleArrowImage(this.querySelector('.arrowimage'));
        isLoanContainerVisible = false;
      }
    }

    const branchArrowImg = document.querySelector('#branchparent .arrowimage');
    stateparent.addEventListener('click', function (event) {
      branchcontainer.style.visibility = 'hidden';
      branchArrowImg.classList.remove('inverted');
      isBranchContainerVisible = false;

      toggleOptionSelect(statecontainer);
      toggleArrowImage(this.querySelector('.arrowimage'));
      isStateContainerVisible = !isStateContainerVisible;

      event.stopPropagation();
    });

    const stateArrowImg = document.querySelector('#stateparent .arrowimage');
    branchparent.addEventListener('click', function (event) {
      statecontainer.style.visibility = 'hidden';
      stateArrowImg.classList.remove('inverted');
      isStateContainerVisible = false;

      toggleOptionSelect(branchcontainer);
      toggleArrowImage(this.querySelector('.arrowimage'));
      isBranchContainerVisible = !isBranchContainerVisible;

      event.stopPropagation();
    });

    multiSelect.addEventListener('click', function (event) {
      branchcontainer.style.visibility = 'hidden';
      branchArrowImg.classList.remove('inverted');
      isBranchContainerVisible = false;

      statecontainer.style.visibility = 'hidden';
      stateArrowImg.classList.remove('inverted');
      isStateContainerVisible = false;

      const optionFormParent = this.nextElementSibling;
      toggleOptionForm(optionFormParent);
      toggleArrowImage(this.querySelector('.arrowimage'));
      isLoanContainerVisible = !isLoanContainerVisible;
      event.stopPropagation();
    });

    const checkbox = document.getElementById('loanformcheck');
    const circle = document.querySelector('.circle');

    checkbox.addEventListener('change', function () {
      if (this.checked) {
        circle.classList.add('movecircle');
        circle.classList.remove('animate');
      } else {
        circle.classList.remove('movecircle');
        circle.classList.add('animate');
      }
    });

    function resetLoanForm() {
      const applyloanform = document.querySelector('.applyloanform');
      const errorMessages = applyloanform.querySelectorAll('.loan-form-err');

      errorMessages.forEach((errMsg) => {
        errMsg.style.display = 'none';
      });

      const inputs = [loanProduct(), formLoanAmt(), cutomerName(), cutomerIncome(), formDobInput(), stateInput(), branchInput(), cutomerNo()];

      inputs.forEach((i) => (i.value = ''));

      formTc().checked = false;
      document.querySelector('#radio-salary').checked = true;

      const submitBtns = document.querySelectorAll('.loan-form-button-container .cmp-container');
      submitBtns.forEach((btn) => {
        btn.classList.remove('loan-form-button-active');
      });
    }

    let footer_time_limit = 30;
    let footer_time_out;
    let intervalTime;

    otpNumChange().addEventListener('click', () => {
      const loaninnerform = document.querySelector('.loan-form-sub-parent');
      loaninnerform.classList.remove('loan-form-sub-otp');
      document.querySelector('.wrongotpmessage').style.display = 'none';
      clearInterval(intervalTime);
      loanOtpInput().value = '';
    });

    // loanFormOtpBtn().addEventListener('click', () => {
    //   clearInterval(intervalTime);
    // });
    

    function startTimer(footer_time_limit, footer_time_out) {
      clearInterval(footer_time_out);
      clearInterval(intervalTime);
      const resendOtpBtn = document.querySelector('#loan-form-resend-otp');
      intervalTime = setInterval(() => {
        if (footer_time_limit >= 0) {
          document.querySelector('.applyloanform .timer').style.display = 'block';
          if (footer_time_limit <= 9) {
            document.querySelector('.applyloanform .timer').innerHTML = '00:' + `0${footer_time_limit}`;
          } else {
            document.querySelector('.applyloanform .timer').innerHTML = `00:${footer_time_limit}`;
          }
          footer_time_limit--;
          resendOtpBtn.style.pointerEvents = 'none';
        } else {
          clearInterval(footer_time_out);
          document.querySelector('.applyloanform .timer').style.display = 'none';
          resendOtpBtn.style.pointerEvents = 'unset';
        }
      }, 1000);
    }
  }
}

export function formOpen() {
  // formOverlay.show();
  if (window.matchMedia('(max-width: 1024px)').matches) {
    // overlay.classList.add("show");

    document.querySelector('.modal-overlay').classList.add('overlay');
    document.querySelector('.modal-overlay').classList.remove('dp-none');

    loaninnerform.classList.add('loan-form--open');
    loaninnerform.style.visibility = 'visible';

    bodyElement.style.overflowY = 'hidden';
  } else {
    // overlay.classList.add("show");

    document.querySelector('.modal-overlay').classList.add('overlay');
    document.querySelector('.modal-overlay').classList.remove('dp-none');

    /* if (emiOverlay || elgOverlay) {
      if (emiOverlay.classList.contains("show") || elgOverlay.classList.contains("show")) {
        overlay.style.zIndex = "1205";
      }
    } */
    const checkingFormopen = document.querySelector('.home-page-calculator-call-xf');

    if (checkingFormopen) {
      if (checkingFormopen.querySelector('.homeloancalculator-wrapper .show') || checkingFormopen.querySelector('.eligibilitycalculator-wrapper .show')) {
        overlay.style.zIndex = '1205';
      }
    }

    loaninnerform.style.visibility = 'visible';
    bodyElement.style.overflowY = 'hidden';
  }
}

window.addEventListener('pageshow', (event) => {
  // If the page is reloaded from the cache, perform a full refresh
  if (event.persisted) {
    window.location.reload();
  }
});
