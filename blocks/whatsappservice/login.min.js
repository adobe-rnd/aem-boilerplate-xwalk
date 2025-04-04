import { close, failedPopupClose, sucessPopupCloe } from './otppopup.js';

export function onloadLoginCall(block) {
  const section = block.closest('.section');
  const button = section.querySelector('.input-field .desktopButton button') || section.querySelector('.mobile-button');
  button.disabled = true;
  const checkBox = section.querySelector('.checkbox-field .cmp-form-options__field--checkbox');
  const inputField = section.querySelector('.input-field input');
  inputField.addEventListener('input', (ele) => {
    // Replace non-digit characters (excluding spaces and dots)
    if (/\D/.test(ele.target.value)) {
      ele.target.value = ele.target.value.replace(/[^\d]/g, '');
      return;
    }

    // Check if the input is between 0 and 5
    const numValue = parseFloat(ele.target.value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 5) {
      ele.target.value = ''; // Clear the input value
      return;
    }

    // Retrieve the length of the input field after the value has been updated
    const incNumber = document.querySelector('.incnumber');
    if (incNumber) {
      incNumber.innerText = ele.target.value.length;
    }
    if (ele.target.value.length == 10) {
      if (checkBox.checked) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    } else {
      button.disabled = true;
    }
  });

  inputField.addEventListener('keypress', function (ele) {
    if (this.value.length == 10) {
      ele.preventDefault();
    }
  });

  inputField.addEventListener('keyup', (e) => {
    const { target } = e;
    const key = e.key.toLowerCase();

    if (key == 'backspace' || key == 'delete') {
      if (target.value === '') {
        document.querySelector('.incnumber').innerText = 0;
      }
    }
  });

  checkBox.addEventListener('change', (event) => {
    const checkbox = event.target;
    if (checkbox.checked && inputField.value.length == 10) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
  const loanFormParent = document.querySelector('.loan-form-sub-parent');
  const loanForm = document.querySelector('.loan-form-sub-parent .cmp-container');

  loanFormParent.addEventListener('click', (event) => {
    if (!loanForm.contains(event.target)) {
      close();
      sucessPopupCloe();
      failedPopupClose();
      // document.querySelector('.successContainer').style.display='none';
    }
  });
}
