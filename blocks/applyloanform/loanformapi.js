// import { ProductLogics } from "./loadformlogic";
// import { otpPopupFailureFun, removeLoader } from "../../../../clientlibs/support/otppopup/js/otppopup";
import {
  errorPopUp, formInteraction, generateLead, lpOtpValidate, resendOtp, thankYouPopUp, verifyOtp,
} from '../../dl.js';
import { targetObject } from '../../scripts/scripts.js';
import { fetchAPI } from '../../scripts/common.js';
import {
  accessTokenURL, generateOTPURL, leadAPIURL, otpTokenURL, resendOTPUrl, smsURL, verifyOTPURL,
} from './loanformapiurls.js';
import {
  cutomerEmployment, cutomerNo, loanFromBtn, loanOtpInput, loanProduct,
} from './loanformdom.js';
import { ProductLogics } from './loanformlogic.js';

let loanStatus = 'Rejected';

let formLoanType;
let formName;
let formLoanAmount;
let formCustomerName;
let formCustomerNo;
let Occupation;
let formIncome;
let formDOB;
let formState;
let formBranchCity;

export function buttonCLick() {
  /* try {
        updateFormValuve();
        formInteraction(formLoanType, "Form Open", targetObject.pageName);
    } catch (error) {
        console.warn(error);
    } */

  loanFromBtn().addEventListener('click', ({ currentTarget }) => {
    currentTarget.closest('.loan-form-button-container').classList.add('loader-initialized');
    loanOtpInput().value = '';
    workFlow();
    try {
      updateFormValuve();
      formInteraction(formLoanType, 'Form Submit', targetObject.pageName);
      generateLead(formName, formLoanType, formLoanAmount, formState, formBranchCity, targetObject.pageName);
    } catch (error) {
      console.warn(error);
    }
  });
}

export function getAccessToken() {
  return new Promise((resolve) => {
    if (!isTimePassed(sessionStorage.getItem('tokenexpiretime'))) {
      resolve(sessionStorage.getItem('accesstoken'));
    } else {
      AccessTokenAPI()
        .then((accessTokenRsp) => {
          const accessTokenRspObj = getJsonObj(accessTokenRsp);
          sessionStorage.setItem('accesstoken', accessTokenRspObj.responseJson.accesstoken);
          sessionStorage.setItem('tokenexpiretime', accessTokenRspObj.responseJson.tokenexpiretime);
          resolve(accessTokenRspObj.responseJson.accesstoken);
        });
    }
  });
}

export function AccessTokenAPI() {
  const requestJson = {
    requestJson: {
      client_id: '270762d6d2544ce695908b3496d25e06',
      client_secret: '5c2e50eedd8f484387ad432be9897ce4',
      source: 'WebApp',
    },
  };

  return new Promise(async (resolve, reject) => {
    try {
      // const request = new Request(accessTokenURL, {
      //     method: "POST",
      //     body: JSON.stringify(requestJson),
      // });

      const response = await fetchAPI('POST', accessTokenURL, requestJson);
      resolve(response);
    } catch (error) {
      reject(error);
      showNetworkFailedScreen(error);
    }
    // callPostAPI(accessTokenURL, requestJson)
    //     .then(function (response) {
    //         resolve(response);
    //     })
    //     .catch(function (error) {
    //         console.warn(error);
    //         reject(error);
    //         showNetworkFailedScreen(error);
    //     });
  });
}

export function generateOTPAPI(access_token, mobileno, productName, source) {
  const requesObj = {
    requestJson: {
      mobileno,
      source,
      productName,
    },
    headerJson: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetchAPI('POST', generateOTPURL, requesObj)
      .then((generateOTPRsp, reject) => {
        const generateOTPRspObj = getJsonObj(generateOTPRsp);
        const otpAuthId = generateOTPRspObj.responseJson.authUniqueId;
        sessionStorage.setItem('otpAuthId', otpAuthId);
        resolve(generateOTPRspObj.responseJson);
      })
      .catch((error) => {
        console.warn(error);
        showNetworkFailedScreen(error);
      });
  });
}

function getOtpToken(generateOtpAuthId) {
  const requesObj = {
    requestJson: 'client_id=gx7vVKKAcOCGIpWc6O7kBYRo209OAHhq&client_secret=L3pARR8QWmanaNVC&grant_type=client_credentials',
  };

  // return new Promise((resolve, reject) => {
  //     callPostAPI(otpTokenURL, requesObj)
  //         .then(function(otpTokenRsp) {
  //             let otpTokenRspObj = getJsonObj(otpTokenRsp);
  //             resolve(otpTokenRspObj);
  //         })
  //         .catch(function(error) {
  //             console.warn(error);
  //         });
  // });

  return new Promise((resolve, reject) => {
    const data = 'client_id=gx7vVKKAcOCGIpWc6O7kBYRo209OAHhq&client_secret=L3pARR8QWmanaNVC&grant_type=client_credentials';

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(new Error(`Request failed with status ${this.status}`));
        }
      }
    });

    xhr.open('POST', otpTokenURL);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // WARNING: Cookies will be stripped away by the browser before sending the request.
    xhr.setRequestHeader('Cookie', 'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1');

    xhr.send(data);
  });

  return new Promise((resolve, reject) => {
    resolve('8jy1AFXCXeV3Hv4Xwh34LVRbZdYE');
  });
}

function smsAPI(accessToken) {
  const requesObj = {
    requestJson: {},
    headerJson: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetchAPI('POST', smsURL, requesObj)
      .then((smsURLRes) => {
        const smsURLResObj = getJsonObj(smsURLRes);
        resolve(smsURLResObj.responseJson.access_token);
      })
      .catch((error) => {
        console.warn(error);
        showNetworkFailedScreen(error);
      });
  });
}

function leadAPI(accessToken, authUniqueId) {
  const requestObj = {
    requestJson: getLeadFormData(loanStatus, authUniqueId),
    headerJson: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetchAPI('POST', leadAPIURL, requestObj)
      .then((response) => {
        // console.log("Data inserted successfully.");
        resolve('Data inserted successfully.');
      });
  });
}

export function verfyOtpAPI(otp) {
  const requestObj = {
    requestJson: {
      authUniqueId: sessionStorage.getItem('otpAuthId'),
      source: 'External',
      otp,
    },
    headerJson: {
      Authorization: `Bearer ${sessionStorage.getItem('accesstoken')}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetchAPI(
      'POST',
      verifyOTPURL,
      requestObj,
    )
      .then((response) => {
        resolve(response.responseJson);
      }).catch((err) => {
        showNetworkFailedScreen(err);
      });
  });
}

export function resendOtpAPI(source) {
  const requesObj = {
    requestJson: {
      authUniqueId: sessionStorage.getItem('otpAuthId'),
      source,
    },
    headerJson: {
      Authorization: `Bearer ${sessionStorage.getItem('accesstoken')}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetchAPI('POST', resendOTPUrl, requesObj)
      .then((response) => {
        resolve(response);
      }).catch((err) => {
        showNetworkFailedScreen(err);
      });
  });
}

export function workFlow() {
  getAccessToken()
    .then((accesstoken) => generateOTPAPI(accesstoken, cutomerNo().value, loanProduct().dataset.loanName, 'Leadform'))
    .then(() => {
      // console.log("Data inserted successfully");
      verifyOtpBtnClick();
      resendOtpBtnClick();
    })
    .catch((err) => {
      console.warn(err, err.message);
      showNetworkFailedScreen(err);
    })
    .finally(() => {
      loanFromBtn().closest('.loan-form-button-container').classList.remove('loader-initialized');
    });
}

function updateFormValuve() {
  formLoanType = document.querySelector('#form-loan-type')?.value;
  formName = document.querySelector('.loan-form-heading-parent').innerText;
  formLoanAmount = document.querySelector('#form-loan-amount')?.value;
  formCustomerName = document.querySelector('#form-customer-name')?.value;
  formCustomerNo = document.querySelector('#form-customer-no')?.value;
  Occupation = document.querySelector('[name=emplyoment]:checked').id == 'radio-salary' ? 'Salaried' : 'Business';
  formIncome = document.querySelector('#form-income')?.value;
  formDOB = document.querySelector('#loan-form-dob')?.value;
  formState = document.querySelector('#form-state')?.value;
  formBranchCity = document.querySelector('#form-branch-city')?.value;
}
function getLeadFormData(loanStatus, authUniqueId) {
  updateFormValuve();
  const leadDataObj = {
    Name: formCustomerName,
    MobileNumber: formCustomerNo,
    Occupation: Occupation,
    LoanProduct: formLoanType,
    MonthlyIncome: formIncome,
    LoanAmount: formLoanAmount,
    DateOfBirth: formDOB,
    State: formState,
    Branch: formBranchCity,
    RejectStatus: loanStatus,
    AuthUniqueId: authUniqueId,
  };

  return { LeadData: leadDataObj };
}

function getJsonObj(data) {
  return typeof data === 'string' ? JSON.parse(data) : data;
}

function verifyOtpBtnClick() {
  const verifyOtpBtn = document.querySelector('#loan-from-otp-verify');
  if (verifyOtpBtn.dataset.isEvent) {
    return;
  }
  verifyOtpBtn.addEventListener('click', (e) => {
    updateFormValuve();
    const otpValue = document.querySelector('#loan-form-otp-input').value;
    verifyOtpBtn.closest('.loan-form-button-container').classList.add('loader-initialized'); 
    formInteraction(formLoanType, 'verify', targetObject.pageName);
    try {
      const click_text = e.target.textContent.trim() || "";
      lpOtpValidate(click_text,formLoanType,targetObject.pageName)
    } catch (error) {
        console.warn(error)
    }
    if (otpValue) {
      verfyOtpAPI(otpValue)
        .then(({ returnResponse, authUniqueId }) => {
          const { statusCode } = returnResponse;
          verifyOtp(e.target.innerText, targetObject.pageName, '');
          const otpMsgElement = document.querySelector('.wrongotpmessage');
          if (statusCode != 100) {
            otpMsgElement.style.display = 'block';
            return;
          }
          otpMsgElement.style.display = 'none';

          const loaninnerform = document.querySelector('.loan-form-sub-parent');

          if (ProductLogics(loanFormCriteria())) {
            loaninnerform.classList.add('loan-form-success');
            loanStatus = 'Approved';
            // try {
            //   generateLead(formName, formLoanType, formLoanAmount, formState, formBranchCity, targetObject.pageName);
            // } catch (error) {
            //   console.warn(error);
            // }
            try {
              thankYouPopUp(formName, formLoanType, targetObject.pageName);
            } catch (error) {
              console.warn(error);
            }
          } else {
            loaninnerform.classList.add('loan-form-request-fail');
            loanStatus = 'Rejected';
            try {
              errorPopUp(formName, formLoanType, loaninnerform.querySelector('.redbox')?.innerText, targetObject.pageName);
            } catch (error) {
              console.warn(error);
            }
          }

          
          //   leadAPI(sessionStorage.getItem('accesstoken'), sessionStorage.getItem('otpAuthId'))
          leadAPI(sessionStorage.getItem('accesstoken'), authUniqueId)
            .catch((error) => {
              console.warn(error);
              showNetworkFailedScreen(error);
            });
        })
        .catch((error) => {
          console.warn(`verifyOtpErr: ${error}`);
          showNetworkFailedScreen(error);
        })
        .finally(() => {
          verifyOtpBtn.closest('.loan-form-button-container').classList.remove('loader-initialized');
        });
    }
  });
  verifyOtpBtn.dataset.isEvent = true;
}

function resendOtpBtnClick() {
  const resendOtpBtn = document.querySelector('#loan-form-resend-otp');
  if (resendOtpBtn.dataset.isEvent) {
    return;
  }

  resendOtpBtn.addEventListener('click', (e) => {
    try {
      resendOtp(e.target.innerText, targetObject.pageName);
    } catch (error) {
      console.warn(error);
    }
    resendOtpAPI('Leadform')
      .then(({ responseJson }) => {
        const otpAuthId = responseJson.authUniqueId;
        sessionStorage.setItem('otpAuthId', otpAuthId);
      })
      .catch((error) => {
        console.warn(`resendOtpErr: ${error}`);
        showNetworkFailedScreen(error);
      });
  });

  resendOtpBtn.dataset.isEvent = true;
}

function isTimePassed(timestamp) {
  if (!timestamp || timestamp == 'undefined') return true;
  const currentTime = new Date();
  const givenTime = new Date(timestamp);
  // console.log(givenTime, givenTime < currentTime);
  return givenTime < currentTime;
}

function loanFormCriteria() {
  const product = loanProduct().dataset.loanType;
  const occupation = cutomerEmployment().id == 'radio-salary' ? 'salaried' : 'business';

  return getProductMap(product, occupation);
}

function getProductMap(product, occupation) {
  if (product == 'hl' || product == 'msme') return occupation == 'salaried' ? 'otherLoanSAL' : 'otherLoanSE';

  if (product == 'ubl') return occupation == 'business' ? 'bussinessLoan' : false;

  if (product == 'pl') return occupation == 'salaried' ? 'personalLoan' : false;
  // if (product == 'pl') return occupation == 'salaried' ? 'personalLoan' : true;


  if (product == 'ucl') return occupation == 'salaried' ? 'preOwnedCarLoanSAL' : 'preOwnedCarLoanSE';

  if(product == 'las' || product == 'lamf') return 'loanAgainstSecurity' ;

  return false;
}

export function showNetworkFailedScreen(err) {
  if (err.code == 'ERR_NETWORK') {
    const loaninnerform = document.querySelector('.loan-form-sub-parent');
    loaninnerform.classList.add('loan-form-something-wrong');
    const otpPopupFailure = document.querySelector('.failedContainer');
    otpPopupFailureFun(otpPopupFailure);
  }
}
