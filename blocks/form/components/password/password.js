export default function passwordLayout(fieldDiv) {
  const inputField = fieldDiv.querySelector('input[type="text"]');
  inputField.type = 'password';

  const togglePasswordIcon = document.createElement('i');
  togglePasswordIcon.classList.add('bi-eye-slash');
  togglePasswordIcon.id = 'togglePassword';
  inputField.insertAdjacentElement('afterend', togglePasswordIcon);

  togglePasswordIcon.addEventListener('click', () => {
    const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
    inputField.setAttribute('type', type);
    togglePasswordIcon.classList.toggle('bi-eye', type !== 'password');
    togglePasswordIcon.classList.toggle('bi-eye-slash', type === 'password');
  });
  return fieldDiv;
}
