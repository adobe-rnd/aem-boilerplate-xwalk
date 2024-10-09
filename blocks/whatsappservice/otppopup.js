import { fetchAPI } from "../../scripts/scripts.js";
import { generateOTPAPI, getAccessToken, resendOtpAPI, showNetworkFailedScreen, verfyOtpAPI } from "../applyloanform/loanformapi.js";
import { getWhatAPIAuthURL, getWhatAPIURL } from "../applyloanform/loanformapiurls.js";

let time_limit = 30;
let time_out;
let intervalTime;
let mobileNumber;
// let nullDOm;
let count = 0;

let otpStage = {
  atWhichStage: "",
};

export function otpPopupCall(block) {
  const section = block.closest(".section");
  otpStage.atWhichStage = "generateOtp";
  let nullDOm = document.createElement("div");
  let whatsappButton = section.querySelector(".input-field .desktopButton button");
  let inputField = section.querySelector(".input-field input");
  //   let whatsappButton = document.querySelector(".whatsappBannerLeft .desktopButton button") || nullDOm;
  let whatsappTryBtn = document.querySelector(".failureTryAgain") || nullDOm;
  // on click on button generate otp call

  whatsappButton.addEventListener("click", function (params) {
    mobileNumber = inputField.value;
    document.querySelector(".pageLoaderText").innerText = "Sending OTP to mobile number " + mobileNumber;
    addLoaderWithBlur(); 1
    afterGenerateOtp();
    getAccessToken().then((accesstoken) => {
      generateOTPAPI(accesstoken, mobileNumber, "Whatsapp", "Whatsapp").then(function (response) {
        if (response.returnResponse.statusCode == 100) {
          removeLoader();
        }
      });
    });
  });

  whatsappTryBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    mobileNumber = inputField.value;
    document.querySelector(".pageLoaderText").innerText = "Sending OTP to mobile number " + mobileNumber;
    addLoaderWithBlur();
    if (otpStage.atWhichStage == "generateOtp") {
      afterGenerateOtp();
      getAccessToken().then((accesstoken) => {
        generateOTPAPI(accesstoken, mobileNumber, "Whatsapp", "Whatsapp").then(function (response) {
          if (response.returnResponse.statusCode == 100) {
            removeLoader();
            document.querySelector(".failedContainer").style.display = "none";
            sessionStorage.removeItem("count");
          } else {
            removeLoader();
            sessionStorage.getItem("count");
            if (sessionStorage.getItem("count") <= 5) {
              document.querySelector(".modal-overlay").classList.add("overlay");
              document.querySelector(".modal-overlay").classList.remove("dp-none");
              //   document.querySelector(".modal-overlay").classList.add("show");
              document.querySelector(".otppopup").style.display = "block";
              document.querySelector(".loan-form-heading-parent").style.display = "none";
              document.querySelector(".loan-form-otp").style.display = "none";
              document.querySelector(".successContainer").style.display = "none";
              document.querySelector(".failedContainer").style.display = "block";
              document.querySelector(".loan-form-otp-button-container").style.display = "none";
              // removeLoader();
              // removeLoader
              removeLoader();
              sessionStorage.setItem("count", count + 1);
            } else {
              document.querySelector(".tryAgainBtnText").style.display = "none";
              sessionStorage.removeItem("count");
            }
          }
        });
      });
    } else if (otpStage.atWhichStage == "verifyOtp") {
      let otpValue = document.querySelector("#loan-form-otp-input").value;
      verfiyOtp(otpValue);
    }
  });

  //resend button functionality
  let resendOtpBtn = document.querySelector("#loan-form-resend-otp") || nullDOm;
  resendOtpBtn.addEventListener("click", function () {
    addLoaderWithBlur();
    startTimer(time_limit, time_out);
    resendOtpAPI("Whatsapp")
      .then(function ({ responseJson }) {
        let otpAuthId = responseJson.authUniqueId;
        sessionStorage.setItem("otpAuthId", otpAuthId);
        removeLoader();
      })
      .catch(function (error) {
        console.warn("resendOtpErr: " + error);
        showNetworkFailedScreen(error);
      });
  });

  // On cLick of edit
  let editText = document.querySelector("#otp-change-num") || nullDOm;
  editText.addEventListener("click", function () {
    close();
  });
  //  on click of back arrow
  let back = document.querySelector(".loan-form-otp-parent .leftarrow") || nullDOm;
  back.addEventListener("click", function () {
    close();
  });

  // otp popup inputField Input functionality
  let inputFieldPopup = document.querySelector("#loan-form-otp-input") || nullDOm;
  inputFieldPopup.addEventListener("input", function (ele) {
    document.querySelector(".changeableDigit").innerText = ele.target.value.length;
    if (ele.target.value.length == 4) {
      document.querySelector("#loan-from-otp-verify").style.pointerEvents = "unset";
      document.querySelector("#loan-from-otp-verify").style.background = "#F26841";
    } else {
      document.querySelector("#loan-from-otp-verify").style.pointerEvents = "none";
      document.querySelector("#loan-from-otp-verify").style.background = "#FAC3B3";
    }

    if (isNaN(ele.target.value)) {
      ele.target.value = ele.target.value.replace(/\D/g, "");
      return;
    }
  });

  //on key up on input field when input lenght is 0 it will set the digit to zero on right side
  let otpInput = document.querySelector("#loan-form-otp-input") || nullDOm;
  otpInput.addEventListener("keyup", function (e) {
    const target = e.target;
    const key = e.key.toLowerCase();

    if (key == "backspace" || key == "delete") {
      if (target.value === "") {
        document.querySelector(".changeableDigit").innerText = 0;
      }
    }
  });

  // on click on verfiy otp Button

  let verifyOtpBtn = document.querySelector("#loan-from-otp-verify") || nullDOm;
  verifyOtpBtn.addEventListener("click", function () {
    let otpValue = document.querySelector("#loan-form-otp-input").value;
    otpStage.atWhichStage = "verifyOtp";
    addLoaderWithBlur();
    verfiyOtp(otpValue);
  });

  let closeButton = document.querySelector(".closeImg") || nullDOm;
  closeButton.addEventListener("click", function () {
    sucessPopupCloe();
  });
  let failedContainer = document.querySelector(".failedContainer img") || nullDOm;
  failedContainer.addEventListener("click", function () {
    failedPopupClose();
  });
}

export function otpPopupFailureFun(otpPopupFailure) {
  if (otpPopupFailure) {
    document.querySelector(".modal-overlay").classList.add("overlay");
    document.querySelector(".modal-overlay").classList.remove("dp-none");
    // document.querySelector(".modal-overlay").classList.add("block");
    document.querySelector(".otppopup").style.display = "block";
    document.querySelector(".loan-form-heading-parent").style.display = "none";
    document.querySelector(".loan-form-otp").style.display = "none";
    document.querySelector(".successContainer").style.display = "none";
    document.querySelector(".failedContainer").style.display = "block";
    document.querySelector(".loan-form-otp-button-container").style.display = "none";
    // removeLoader();
    // removeLoader
    removeLoader();
    if (sessionStorage.getItem("count")) {
      let count = parseInt(sessionStorage.getItem("count"));
      sessionStorage.setItem("count", count + 1);
    } else {
      sessionStorage.setItem("count", 1);
    }

    if (sessionStorage.getItem("count") > 5) {
      document.querySelector(".failureTryAgain").style.display = "none";
      sessionStorage.removeItem("count");
    }
  }
}

function startTimer(footer_time_limit, footer_time_out) {
  clearInterval(footer_time_out);
  clearInterval(intervalTime);
  let resendOtpBtn = document.querySelector("#loan-form-resend-otp");
  intervalTime = setInterval(() => {
    if (footer_time_limit >= 0) {
      document.querySelector(".applyloanform .timer").style.display = "block";
      if (footer_time_limit <= 9) {
        document.querySelector(".applyloanform .timer").innerHTML = "00:" + "0" + footer_time_limit;
      } else {
        document.querySelector(".applyloanform .timer").innerHTML = "00:" + footer_time_limit;
      }
      footer_time_limit--;
      resendOtpBtn.style.pointerEvents = "none";
    } else {
      clearInterval(footer_time_out);
      document.querySelector(".applyloanform .timer").style.display = "none";
      resendOtpBtn.style.pointerEvents = "unset";
    }
  }, 1000);
}

export function removeLoader() {
  document.querySelector(".pageloader").classList.add("loader-disppear");
  document.querySelector(".loan-form-otp-button-container").classList.remove("filterBlur");
  document.querySelector(".loan-form.loan-form-sub-otp").classList.remove("filterBlur");
  document.querySelector(".pageLoaderText").innerText = "";
}
export function close() {
  let loaninnerform = document.querySelector(".otppopup");
  loaninnerform.style.display = "none";
  clearInterval(intervalTime);
  document.querySelector(".modal-overlay").classList.remove("overlay");
  document.querySelector(".modal-overlay").classList.add("dp-none");
  //   document.querySelector(".modal-overlay").classList.remove("show");
  document.querySelector("#loan-form-otp-input").value = "";
  document.querySelector(".wrongotpmessage").style.display = "none";
  document.querySelector(".wrongotpmessage").textContent = "";
}

export function failedPopupClose() {
  document.querySelector(".modal-overlay").classList.remove("overlay");
  document.querySelector(".modal-overlay").classList.add("dp-none");
  //   document.querySelector(".modal-overlay").classList.remove("show");
  document.querySelector(".otppopup").style.display = "none";
  document.querySelector(".loan-form-heading-parent").style.display = "block";
  document.querySelector(".loan-form-otp").style.display = "block";
  document.querySelector(".successContainer").style.display = "none";
  document.querySelector(".failedContainer").style.display = "none";
  document.querySelector(".loan-form-otp-button-container").style.display = "block";
}
// afterGenerateOtp function is being called once the user click on get otp button in which after success call below function will get called
function afterGenerateOtp() {
  document.querySelector(".otppopup").style.display = "block";
  document.querySelector(".modal-overlay").classList.add("overlay");
  document.querySelector(".modal-overlay").classList.remove("dp-none");
  //   document.querySelector(".modal-overlay").classList.add("show");
  document.querySelector(".loan-form-heading-parent").style.display = "block";
  document.querySelector(".loan-form-otp").style.display = "block";
  document.querySelector(".loan-form-button-container").style.display = "block";
  document.querySelector("#loan-form-otpnum").textContent = document.querySelector(".input-field input").value;
  startTimer(time_limit, time_out);
  const timerElement = document.querySelector(".applyloanform .timer");
  if (timerElement) {
    timerElement.style.display = "block";
  }
  document.querySelector("#loan-form-otp-input").value = "";

  document.querySelector("#otp-digits .changeableDigit").textContent = "0";
}

function addLoaderWithBlur() {
  if (document.querySelector(".pageloader").classList.contains("loader-disppear")) {
    document.querySelector(".pageloader").classList.remove("loader-disppear");
  }
  document.querySelector(".pageloader").style.display = "block";
  document.querySelector(".loan-form-otp-button-container").classList.add("filterBlur");
  document.querySelector(".loan-form.loan-form-sub-otp").classList.add("filterBlur");
}

function getWhatsappServicesApi(mobileNumber) {
  let requesObj = {
    headerJson: {
      "x-apikey": "7uPoKD0zsO527QGZ6oLI9SktlpEDwhsI",
      "Content-Type" : 'remove'
    },
  };

  return new Promise(function (resolve, reject) {
    let whatsappServiceUrl = "https://apisit.piramal.com/customer-orchestrator/v1/partner/campaign/+91" + mobileNumber + "/event-based-triggered";
    fetchAPI("POST", whatsappServiceUrl, requesObj).then(function (response) {
      resolve(response.responseJson);
    });
    /* callPostAPI(whatsappServiceUrl, requesObj).then(function (response) {
      resolve(response.responseJson);
    }); */
  });
}


export function getWhatAPIAuth() {
  let requestObj = {
    requestJson: {
      username: "test.kumar@getcogno.ai",
      password: "Success@123$",
      bot_id: "1",
    },
  };

  return new Promise(function (resolve, reject) {
    fetchAPI("POST", getWhatAPIAuthURL, requestObj)
      .then(function (response) {
        resolve(response.responseJson);
      })
      .catch(function (err) {
        showNetworkFailedScreen(err);
      });
  });
}

export function getWhatAPI(authToken, mobileNumber) {
  let requestObj = {
    requestJson: {
      authorization: authToken,
      campaign_id: "87",
      whatsapp_bsp: "6",
      client_data: {
        phone_number: "+91" + mobileNumber,
        name: "Name",
      },
    },
  };

  return new Promise(function (resolve, reject) {
    fetchAPI("POST", getWhatAPIURL, requestObj)
      .then(function (response) {
        resolve(response.responseJson);
      })
      .catch(function (err) {
        showNetworkFailedScreen(err);
      });
  });
}



export function sucessPopupCloe() {
  document.querySelector(".successContainer").style.display = "none";
  close();
}

function verfiyOtp(otpValue) {
  if (otpValue) {
    verfyOtpAPI(otpValue)
      .then(function (response) {
        if (response.returnResponse.statusCode == 100) {
          document.querySelector(".wrongotpmessage").style.display = "none";
          document.querySelector(".wrongotpmessage").textContent = "";
          getWhatAPIAuth().then(function ({status, auth_token}){
            if(status == 200){
              getWhatAPI(auth_token, mobileNumber).then(function (res) {
                document.querySelector(".successContainer").style.display = "block";
                document.querySelector(".loan-form-heading-parent").style.display = "none";
                document.querySelector(".loan-form-otp").style.display = "none";
                document.querySelector(".loan-form-button-container").style.display = "none";
                document.querySelector(".mobileNumber").innerText = mobileNumber;
                removeLoader();
              });
            }
          }).catch((error)=> {
            console.log(error);
          })
          // getWhatsappServicesApi(mobileNumber);
        } else {
          document.querySelector(".wrongotpmessage").textContent = response.returnResponse.message;
          document.querySelector(".wrongotpmessage").style.display = "block";

          document.querySelector(".loan-form-otp").style.display = "block";
          document.querySelector(".loan-form-button-container").style.display = "block";
          document.querySelector(".failedContainer").style.display = "none";

          removeLoader();
        }
        //console.log(response);
      })
      .catch(function (err) {
        // showNetworkFailedScreen(error);
        showNetworkFailedScreen(err);
      });
  }
}
