// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
function loadHeadGTM() {
  const scriptTag = document.createElement("script");
  
  scriptTag.innerHTML = `// Google Tag Manager 
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T5MTVQ9');`;

  document.head.prepend(scriptTag);
}

function loadBodyGTM() {
  const noScriptTag = document.createElement("noscript");

  let iframe = document.createElement("iframe");
  iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-T5MTVQ9";
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";
  noScriptTag.appendChild(iframe);
  
  document.body.prepend(noScriptTag);
}



if(!window.location.hostname.includes('localhost') && !window.location.hostname.includes('author')) {
    loadHeadGTM();
    loadBodyGTM();
} 
