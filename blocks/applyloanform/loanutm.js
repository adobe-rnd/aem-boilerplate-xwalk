import { fetchPlaceholders } from "../../scripts/aem.js";

export const isMobile = {
  Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows() {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  },
};

export function loanutmForm() {
  const utmBtns = document.querySelectorAll('.loan-form-utm');

  if (utmBtns.length) {
    utmBtns.forEach((btn) => {
      btn.addEventListener('click', loanFormUTM);
    });
  }
}

export async function loanFormUTM(makewebFormURL) {
  const placeholders = await fetchPlaceholders();
  let redirectionLink = placeholders.formredirectionlink; //'https://www.piramalfinance.com/loan';
  const utm_device = isMobile.any() ? 'MWEB' : 'DWEB';
  const utm_source = window.lo
  cation.pathname.split('/').pop().replace(/\.html$/, '');

  // redirectionLink = `${redirectionLink}?utm_device=${utm_device}&utm_source=website-leadform-${utm_source}`;
  redirectionLink = `${redirectionLink}?utm_device=${utm_device}&utm_source=website-leadform-${makewebFormURL}`;
  window.open(redirectionLink, '_self');
}

export function loginFormUTM() {
  let redirectionLink = document.querySelector('.location-link').innerHTML;

  const utm_device = isMobile.any() ? 'MWEB' : 'DWEB';
  const utm_source = window.location.pathname.split('/').pop().replace(/\.html$/, '');

  redirectionLink = `${redirectionLink}?utm_device=${utm_device}&utm_source=website-pl-${utm_source}`;
  window.open(redirectionLink, '_self');
}
