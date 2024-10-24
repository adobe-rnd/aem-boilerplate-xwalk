import { fetchPlaceholders } from "../../scripts/aem.js";

const placeholders = await fetchPlaceholders();

// V1 API URL
// const accessTokenURL = "https://mobileapi.pchf.in/api/mobile/access-token";

// V2 API URL
const accessTokenURL = placeholders.accesstokenurl; //'https://campaignapi.piramalfinance.com/api/account/access-token';

// V1 API URL
// const generateOTPURL= "https://mobileapi.pchf.in/api/website/generate-otp";

// V2 API URL
const generateOTPURL = placeholders.generateotpurl; //'https://campaignapi.piramalfinance.com/api/website/generate-otp';

// V1 API URL
// const resendOTPUrl = "https://mobileapi.pchf.in/api/website/resend-otp";

// V2 API URL
const resendOTPUrl = placeholders.resendotpurl; //'https://campaignapi.piramalfinance.com/api/website/resend-otp';

// V1 API URL
// const verifyOTPURL = "https://mobileapi.pchf.in/api/website/verify-otp";

// V2 API URL
const verifyOTPURL = placeholders.verifyotpurl; //'https://campaignapi.piramalfinance.com/api/website/verify-otp';

// V1 API URL
// const leadAPIURL = 'https://mobileapi.pchf.in/api/website/insert-lead-data';

// V2 API URL
const leadAPIURL = placeholders.leadapiurl; //'https://campaignapi.piramalfinance.com/api/website/insert-lead-data';

// V1 API URL
const otpTokenURL = placeholders.otptokenurl; //'https://apisit.piramal.com/oauth/v1/cc/accesstoken';
const smsURL = placeholders.smsurl; //'https://apisit.piramal.com/communication/v2/karix/sms-query?ver=1.0&key=HbUcyrewWm27hdKRZyj2zA%3D%3D&encrypt=0&send=PIRCHF&dest=8007359739&text=Please%20use%20this%20one-time%20password%20for%20Piramal%20User%20Account%20Verification%3A%209106.%20DO%20NOT%20SHARE%20THIS%20WITH%20ANYONE%20and%20it%20is%20valid%20for%205%20minutes%20only';
const getWhatAPIAuthURL = placeholders.getwhatapiauthurl; //'https://piramal.allincall.in/campaign/external/get-auth-token/';
const getWhatAPIURL = placeholders.getwhatapiurl; //'https://piramal.allincall.in/campaign/external/send-event-based-triggered-whatsapp-campaign/';

export {
  accessTokenURL, 
  generateOTPURL, 
  otpTokenURL, 
  smsURL, 
  leadAPIURL, 
  verifyOTPURL, 
  resendOTPUrl, 
  getWhatAPIAuthURL, 
  getWhatAPIURL,
};
