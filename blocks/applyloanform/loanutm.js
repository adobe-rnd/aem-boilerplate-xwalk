export let isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

export function loanutmForm(){
      let utmBtns = document.querySelectorAll(".loan-form-utm");

      if(utmBtns.length) {
          utmBtns.forEach(btn => {
              btn.addEventListener("click", loanFormUTM);
          });
      }
}


export function loanFormUTM() {
    let redirectionLink = "https://www.piramalfinance.com/loan";
    let utm_device = isMobile.any() ? "MWEB" : "DWEB";
    let utm_source = window.location.pathname.split('/').pop().replace(/\.html$/, '');
 
    redirectionLink = redirectionLink + "?utm_device=" + utm_device + "&utm_source=website-leadform-" + utm_source;
    window.open(redirectionLink, "_self");
}


export function loginFormUTM() {
    let redirectionLink=document.querySelector(".location-link").innerHTML;
    
    
    let utm_device = isMobile.any() ? "MWEB" : "DWEB";
    let utm_source = window.location.pathname.split('/').pop().replace(/\.html$/, '');
 
    redirectionLink = redirectionLink + "?utm_device=" + utm_device + "&utm_source=website-pl-" + utm_source;
    window.open(redirectionLink, "_self");
}