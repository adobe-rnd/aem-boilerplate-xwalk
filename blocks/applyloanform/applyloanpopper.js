import { formDobInput, loanFromBtn } from './loanformdom.js';
import { calculateAgeFromInput } from './validation.js';

export let dpObj;

export function applyLoanPopper() {
  const reference = document.getElementById('stateparent');
  const tooltip = document.getElementById('statecontainer');

  Popper.createPopper(reference, tooltip, {
    placement: 'bottom',
    // strategy: 'fixed',
    modifiers: [
      {
        name: 'flip',
        options: {
          // allowedAutoPlacements: ['top', 'bottom'],
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 0],
        },
      },

    ],
  });

  const reference2 = document.getElementById('branchparent');
  const tooltip2 = document.getElementById('branchcontainer');

  Popper.createPopper(reference2, tooltip2, {
    placement: 'bottom',
    // strategy: 'fixed',
    modifiers: [
      {
        name: 'flip',
        options: {
          // allowedAutoPlacements: ['top', 'bottom'],
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 0],
        },
      },

    ],
  });

  if (window.matchMedia('(max-width: 767px)').matches) {
    dpObj = new AirDatepicker('#loan-form-dob', {
      position({
        $datepicker, $target, $pointer, done,
      }) {
        const popper = Popper.createPopper($target, $datepicker, {
        // placement: 'top bottom',
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top', 'bottom'],
                padding: {
                  top: 10,
                },
                'z-index': 200,
              },
            },
            {
              name: 'offset',
              options: {
                offset: [0, 10],
              },
            },
            {
              name: 'arrow',
              options: {
                element: $pointer,
              },
            },
          ],
        });

        return function completeHide() {
          popper.destroy();
          done();
        };
      },

      // position:'top left',
      autoClose: true,
      maxDate: new Date(),

      onSelect({ formattedDate }) {
        const loanType = document.querySelector('#form-loan-type')?.value;
        const dobInput = formDobInput();
        if(!loanType || !dobInput) return;
        if (loanType.trim().toLowerCase() !== 'personal loan') return;
        
       const age =  calculateAgeFromInput(formattedDate);
       dobInput.dataset.validdate = age < 23 ? "false" : "true";

       const errMsg = document.querySelector('.invalid-date-msg');
       dobInput.dataset.validdate == "true" ? errMsg.style.display = "none" : errMsg.style.display = "block";
      //  dobInput.dataset.validdate == "true" ?  loanFromBtn().classList.add('loan-form-button-active') :  loanFromBtn().classList.remove('loan-form-button-active');
      },

      locale: {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'dd/MM/yyyy',
        firstDay: 0,
      },

    });
  } else {
    dpObj = new AirDatepicker('#loan-form-dob', {
      position({
        $datepicker, $target, $pointer, done,
      }) {
        const popper = Popper.createPopper($target, $datepicker, {
          placement: 'top',
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top', 'bottom'],
                padding: {
                  top: 10,
                },
                'z-index': 200,
              },
            },
            {
              name: 'offset',
              options: {
                offset: [0, 10],
              },
            },
            {
              name: 'arrow',
              options: {
                element: $pointer,
              },
            },
          ],
        });

        return function completeHide() {
          popper.destroy();
          done();
        };
      },

      // position:'top left',
      autoClose: true,
      maxDate: new Date(),

      onSelect({ formattedDate }) {
        const loanType = document.querySelector('#form-loan-type')?.value;
        const dobInput = formDobInput();
        if(!loanType || !dobInput) return;
        if (loanType.trim().toLowerCase() !== 'personal loan') return;

        
       const age =  calculateAgeFromInput(formattedDate);
       dobInput.dataset.validdate = age < 23 ? "false" : "true";

       const errMsg = document.querySelector('.invalid-date-msg');
       dobInput.dataset.validdate == "true" ? errMsg.style.display = "none" : errMsg.style.display = "block";
      //  dobInput.dataset.validdate == "true" ?  loanFromBtn().classList.add('loan-form-button-active') :  loanFromBtn().classList.remove('loan-form-button-active');
      },

      locale: {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'dd/MM/yyyy',
        firstDay: 0,
      },

    });
  }
}
