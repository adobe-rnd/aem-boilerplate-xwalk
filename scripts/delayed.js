// eslint-disable-next-line import/no-cycle
import { fetchPlaceholders, getMetadata, sampleRUM } from './aem.js';
import eventInit from './events.js';



// Core Web Vitals RUM collection
sampleRUM('cwv');

eventInit();

function loadServiceWorker() {
  if ('serviceWorker' in navigator) {
    // window.addEventListener('load', () => {
    navigator.serviceWorker.register('../scripts/serviceworker.js').then((reg) => {
      console.log('Service Worker registered.', reg);
    }).catch((err) => {
      console.log('Service Worker **not** registered', err);
    })
    // });
  } else {
    console.log('Service workers are not supported in this browser.');
  }
}

// add more delayed functionality here
function loadHeadGTM() {
  const scriptTag = document.createElement('script');

  scriptTag.innerHTML = `// Google Tag Manager 
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T5MTVQ9');`;

  document.head.prepend(scriptTag);
}

function loadBodyGTM() {
  const noScriptTag = document.createElement('noscript');

  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-T5MTVQ9';
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noScriptTag.appendChild(iframe);

  document.body.prepend(noScriptTag);
}

async function loadMoengage() {
  const placeholders = await fetchPlaceholders();

  const scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript';

  var moeDataCenter = placeholders.monenageDc; // Replace "DC" with the actual Data center value from the above table
  var moeAppID = placeholders.monenageAppid; // Replace "WorkspaceID" available in the settings page of MoEngage Dashboard.
  var debug_logs = placeholders.monegageDebuglog;  // MoEngage Web SDK uses a parameter debug_logs: 1 to detect that you are integrating in TEST environment. When you decide to take your website LIVE, just pass the parameter debug_logs: 0 and all data about your actual users would start appearing in LIVE environment
  var sdkVersion = placeholders.monegageSdkversion; // Replace this value with the version of Web SDK that you intend to use. It is recommended to use the format x (major);

  scriptTag.innerHTML = `
  console.log('MoEngage Web SDK');
  !function(e,n,i,t,a,r,o,d){if(!"${moeDataCenter}"||!"${moeDataCenter}".match(/^dc_[0-9]+$/gm))return console.error("Data center has not been passed correctly. Please follow the SDK installation instruction carefully.");var s=e[a]=e[a]||[];if(s.invoked=0,s.initialised>0||s.invoked>0)return console.error("MoEngage Web SDK initialised multiple times. Please integrate the Web SDK only once!"),!1;e.moengage_object=a;var l={},g=function n(i){return function(){for(var n=arguments.length,t=Array(n),a=0;a<n;a++)t[a]=arguments[a];(e.moengage_q=e.moengage_q||[]).push({f:i,a:t})}},u=["track_event","add_user_attribute","add_first_name","add_last_name","add_email","add_mobile","add_user_name","add_gender","add_birthday","destroy_session","add_unique_user_id","update_unique_user_id","moe_events","call_web_push","track","location_type_attribute"],m={onsite:["getData","registerCallback"]};for(var c in u)l[u[c]]=g(u[c]);for(var v in m)for(var f in m[v])null==l[v]&&(l[v]={}),l[v][m[v][f]]=g(v+"."+m[v][f]);r=n.createElement(i),o=n.getElementsByTagName("head")[0],r.async=1,r.src=t,o.appendChild(r),e.moe=e.moe||function(){return(s.invoked=s.invoked+1,s.invoked>1)?(console.error("MoEngage Web SDK initialised multiple times. Please integrate the Web SDK only once!"),!1):(d=arguments.length<=0?void 0:arguments[0],l)},r.addEventListener("load",function(){if(d)return e[a]=e.moe(d),e[a].initialised=e[a].initialised+1||1,!0}),r.addEventListener("error",function(){return console.error("Moengage Web SDK loading failed."),!1})}(window,document,"script","https://cdn.moengage.com/release/${moeDataCenter}/versions/${sdkVersion}/moe_webSdk.min.latest.js","Moengage");`;

  document.head.append(scriptTag);

  Moengage = moe({
    app_id: moeAppID,
    debug_logs: debug_logs
  });

  try {
    let moengageContainer = document.getElementById("moengage-container");
    if (!moengageContainer) return false;
    let navWrapper = document.querySelector(".nav-wrapper");
    let heightMoengage = moengageContainer.clientHeight;
    window.addEventListener('scroll', function (event) {
      navWrapper.style.marginTop = `${heightMoengage}px`;
      if (window.scrollY > 50) {
        navWrapper.style.marginTop = "0px"
      } else {
        navWrapper.style.marginTop = `${heightMoengage}px`;
      }
    })
  } catch (error) {
    console.warn("Moengage Error :: ", error);
  }
}

async function loadAdobeScript() {
  const placeholders = await fetchPlaceholders();
  const checkingEnv = location.href;
  let adobeScript;
  if (checkingEnv.includes("uatmarketing.piramalfinance") || checkingEnv.includes("main--piramalfinance")) {
    adobeScript = placeholders.adobescriptstage;
  }
  else if (checkingEnv.includes("www.piramalfinance") || checkingEnv.includes("main--prodpiramalfinance")) {
    adobeScript = placeholders.adobescriptprod;
  }
  // Create a script element
  const script = document.createElement('script');

  // Set the script's src attribute
  script.src = adobeScript;

  // Set the async attribute
  script.async = true;

  // Append the script to the document head
  document.head.appendChild(script);
}

// const handlePathname = (anchor, placeholders) => {
//   const pathname = new URL(anchor?.href)?.pathname;
//   const excludedPaths = placeholders.excludedpaths?.split(',');
//   const primaryLangPath = getMetadata("lang-path");
//   if (pathname?.startsWith('/') && !excludedPaths.some(path => pathname.startsWith(path) || pathname == '/')) {
//     const newPath = primaryLangPath ? primaryLangPath + pathname : pathname;

//     if (anchor.textContent.trim()?.startsWith('/')) {
//       anchor.textContent = newPath;
//     }

//     anchor.href = newPath;
//   }
// }

// const handleReltags = async () => {
//   const anchors = document.querySelectorAll('a');
//   const placeholders = await fetchPlaceholders();

//   anchors.forEach(anchor => {
//     handlePathname(anchor, placeholders);
//     const getHref = anchor.href;
//     const relParamCheck = 'rel';
//     if(!getHref) return false;
//     const url = new URL(getHref);
//     const params = new URLSearchParams(url.search);
//     if(params.has(relParamCheck)){
//       let newRelContent = params.get(relParamCheck);
//       if(newRelContent.includes(',')){
//         anchor.rel = newRelContent.replaceAll(',', '');
//       }else{
//         anchor.rel = newRelContent;
//       }

//       // Remove the parameter from the URL
//       function removeRelParameter(url) {
//         const urlObj = new URL(url); // Parse the URL
//         const searchParams = urlObj.searchParams; // Access query parameters

//         searchParams.delete(relParamCheck); // Remove the 'rel' parameter

//         return urlObj.toString(); // Return the modified URL
//       }

//       anchor.href = removeRelParameter(getHref);

//     }
//   })
// };


if (!window.location.hostname.includes('localhost') && !window.location.hostname.includes('author')) {
  loadServiceWorker();
  loadHeadGTM();
  loadBodyGTM();
  loadMoengage();
  // handleReltags();
  loadAdobeScript();
}
