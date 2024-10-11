// eslint-disable-next-line import/no-cycle
import { fetchPlaceholders, sampleRUM } from './aem.js';



// Core Web Vitals RUM collection
sampleRUM('cwv');


function loadServiceWorker(){
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('../scripts/serviceworker.js').then((reg) => {
          console.log('Service Worker registered.', reg);
        }).catch((err) => {
          console.log('Service Worker **not** registered', err);
        })
      });
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

async function loadMoengage(){
  const placeholders = await fetchPlaceholders();

  const scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript';
  
	var moeDataCenter = "dc_3"; // placeholders.monenage_dc; // Replace "DC" with the actual Data center value from the above table
	var moeAppID = "MSLKV5SKRDLGUKY8FB8NXQM3"; // placeholders.monenage_appid; // Replace "WorkspaceID" available in the settings page of MoEngage Dashboard.
  var debug_logs = 1; // placeholders.monegage_debuglog // MoEngage Web SDK uses a parameter debug_logs: 1 to detect that you are integrating in TEST environment. When you decide to take your website LIVE, just pass the parameter debug_logs: 0 and all data about your actual users would start appearing in LIVE environment
	var sdkVersion = ''; // Replace this value with the version of Web SDK that you intend to use. It is recommended to use the format x (major);
	      
  scriptTag.innerHTML = `
  console.log('MoEngage Web SDK');
	!function(e,n,i,t,a,r,o,d){if(${!moeDataCenter}||${!moeDataCenter}.match(/^dc_[0-9]+$/gm))return console.error("Data center has not been passed correctly. Please follow the SDK installation instruction carefully.");var s=e[a]=e[a]||[];if(s.invoked=0,s.initialised>0||s.invoked>0)return console.error("MoEngage Web SDK initialised multiple times. Please integrate the Web SDK only once!"),!1;e.moengage_object=a;var l={},g=function n(i){return function(){for(var n=arguments.length,t=Array(n),a=0;a<n;a++)t[a]=arguments[a];(e.moengage_q=e.moengage_q||[]).push({f:i,a:t})}},u=["track_event","add_user_attribute","add_first_name","add_last_name","add_email","add_mobile","add_user_name","add_gender","add_birthday","destroy_session","add_unique_user_id","update_unique_user_id","moe_events","call_web_push","track","location_type_attribute"],m={onsite:["getData","registerCallback"]};for(var c in u)l[u[c]]=g(u[c]);for(var v in m)for(var f in m[v])null==l[v]&&(l[v]={}),l[v][m[v][f]]=g(v+"."+m[v][f]);r=n.createElement(i),o=n.getElementsByTagName("head")[0],r.async=1,r.src=t,o.appendChild(r),e.moe=e.moe||function(){return(s.invoked=s.invoked+1,s.invoked>1)?(console.error("MoEngage Web SDK initialised multiple times. Please integrate the Web SDK only once!"),!1):(d=arguments.length<=0?void 0:arguments[0],l)},r.addEventListener("load",function(){if(d)return e[a]=e.moe(d),e[a].initialised=e[a].initialised+1||1,!0}),r.addEventListener("error",function(){return console.error("Moengage Web SDK loading failed."),!1})}(window,document,"script","https://cdn.moengage.com/release/${moeDataCenter}/moe_webSdk.min.latest.js","Moengage");`;

  document.head.append(scriptTag);
	 
	Moengage = moe({
	  app_id: moeAppID,
	  debug_logs: debug_logs
	});
	
}

if (!window.location.hostname.includes('localhost') && !window.location.hostname.includes('author')) {
  loadServiceWorker();
  loadHeadGTM();
  loadBodyGTM();
  // loadMoengage();
}
