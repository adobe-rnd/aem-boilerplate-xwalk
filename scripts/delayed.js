// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
function loadHeadGTM() {
  const scriptTag = document.createElement("script");
  
  scriptTag.innerHTML = `<!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T5MTVQ9');</script>
        <!-- End Google Tag Manager -->`;

  document.head.prepend(scriptTag);
}

function loadBodyGTM() {
  const scriptTag = document.createElement("script");
  
  scriptTag.innerHTML = `<!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T5MTVQ9"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->`;
        
  document.body.prepend(scriptTag);
}



if(!window.location.hostname.includes('localhost') && !window.location.hostname.includes('author')) {
    loadHeadGTM();
    loadBodyGTM();
} 
