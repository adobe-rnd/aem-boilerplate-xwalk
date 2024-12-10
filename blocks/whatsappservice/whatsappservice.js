/* import { onloadLoginCall } from './login.js';
import { otpPopupCall } from './otppopup.js';

function getValueAthor(val){
    return val.querySelector('img') ? val.querySelector('img').getAttribute('src') : val.textContent.trim();
}

export default function decorate(block) {
  const props = Array.from(block.children, (row) => row.firstElementChild);
  const [frontImage,
    description,
    buttonText,
    buttonHref,
    placeholder,
    spantext,
    uppertext,
    submitText,
    tnc,
    checkbox,
    whatsapplock,
    whatsapplockalt,
    otphead,
    otpsubhead,
    otpphonenum,
    otpchangenum,
    otpsubsubhead,
    changeableDigit,
    spanDigittext,
    resendtext,
    loanformresendotp,
    timer,
    namasteicon,
    namasteiconalt,
    namasteText,
    whatsappNumbertext,
    mobileNumber,
    somethingwrong,
    somethingwrongAlt,
    namasteFalied,
    namasteFaliedGrey,
    failureTryAgain,
    otpverify
   ] = props;

  const renderWhatsAppHTML = renderWhatsAppFactory(props, block);
  const otpPopupHtml = otpPopupWhatsAppHTML({
    whatsapplock,
    whatsapplockalt,
    otphead,
    otpsubhead,
    otpphonenum,
    otpchangenum,
    otpsubsubhead,
    changeableDigit,
    spanDigittext,
    resendtext,
    loanformresendotp,
    timer,
    namasteicon,
    namasteiconalt,
    namasteText,
    whatsappNumbertext,
    mobileNumber,
    somethingwrong,
    somethingwrongAlt,
    namasteFalied,
    namasteFaliedGrey,
    failureTryAgain,
    otpverify
  });
  block.innerHTML = renderWhatsAppHTML;
  block.innerHTML += otpPopupHtml;

  try {
    onloadLoginCall(block);
    otpPopupCall(block);
  } catch (error) {
    console.warn(error);
  }
}

function renderWhatsAppFactory(props, block) {
    const [frontImage,
        description,
        buttonText,
        buttonHref,
        placeholder,
        spantext,
        uppertext,
        submitText,
        tnc,
        checkbox,
        whatsapplock,
        whatsapplockalt,
        otphead,
        otpsubhead,
        otpphonenum,
        otpchangenum,
        otpsubsubhead,
        changeableDigit,
        spanDigittext,
        resendtext,
        loanformresendotp,
        timer,
        namasteicon,
        namasteiconalt,
        namasteText,
        whatsappNumbertext,
        mobileNumber,
        somethingwrong,
        somethingwrongAlt,
        namasteFalied,
        namasteFaliedGrey,
        failureTryAgain,
        otpverify
       ] = props;



  const checboxHtml = checkbox?.textContent.trim() === 'true'
    ? `<div class="checkbox-field">
            <label class="cmp-form-options__field-label">
                <input class="cmp-form-options__field cmp-form-options__field--checkbox" name="tnc" value="tnc"
                    type="checkbox">
                <span class="cmp-form-options__field-description">
                    ${tnc.innerHTML}
                </span>
            </label>
            </div>`
    : '';

  const html = `<div class="whats-app-service">
    <div class="front-image">${frontImage.innerHTML}</div>
    <div class="description">${description.innerHTML}</div>

    <a href="${buttonHref.textContent.trim()}" class="mobile-button">
        <button>${buttonText.innerHTML}</button>
    </a>

    <div class="input-field">

        <div class="cmp-form-text">
            <label for="form-text-1975602141">${uppertext.textContent.trim()}</label>
            <span class="inptContainer"><span class="countryCode">${spantext.textContent.trim()}</span>
                <input class="cmp-form-text__text" data-cmp-hook-form-text="input" type="text" maxlength="10" id="form-text-1975602141"
                    placeholder="${placeholder.textContent.trim()}" name="number" spellcheck="true"
                    aria-describedby="form-text-1975602141-helpMessage">
            </span>
        </div>

        <div class="button desktopButton">
            <button type="button" id="button" class="cmp-button" disabled="">
                <span class="cmp-button__text">${submitText.textContent.trim()}</span>
            </button>
        </div>
    </div>

    ${checboxHtml}

</div>`;

  return html;
}

function otpPopupWhatsAppHTML({
        whatsapplock,
        whatsapplockalt,
        otphead,
        otpsubhead,
        otpphonenum,
        otpchangenum,
        otpsubsubhead,
        changeableDigit,
        spanDigittext,
        resendtext,
        loanformresendotp,
        timer,
        namasteicon,
        namasteiconalt,
        namasteText,
        whatsappNumbertext,
        mobileNumber,
        somethingwrong,
        somethingwrongAlt,
        namasteFalied,
        namasteFaliedGrey,
        failureTryAgain,
        otpverify
}) {

  return `<div class="otppopup">
    <div class="applyloanform">
        <div class="loan-form-sub-parent">
            <div class="cmp-container">
                <div class="loan-form loan-form-sub-otp">
                    <div class="cmp-container">
                        <div class="loan-form-heading-parent ">
                            <div class="cmp-container">
                                <div class="image">
                                    <img data-src="${getValueAthor(whatsapplock)}"
                                        src="${getValueAthor(whatsapplock)}"
                                        class="cmp-image__image lozad" alt="${getValueAthor(whatsapplockalt)}">
                                </div>
                                <div class="image crossimage">
                                    <img src="/images/close-icon.svg"
                                        class="cmp-image__image lozad" alt="close-icon">
                                </div>
                            </div>
                        </div>
                        <div class="loan-form-otp">
                            <div class="loan-form-otp-parent">
                                <img class="leftarrow lozad"
                                    src="/images/back-arrow.png" alt="arrow">
                                <p class="otphead">${getValueAthor(otphead)}</p>
                                <div class="otpsubheadcontainer">
                                    <p class="otpsubhead">${getValueAthor(otpsubhead)} <span class="otp-phone-num"
                                            id="loan-form-otpnum">${getValueAthor(otpphonenum)}</span></p>
                                    <p class="otp-change-num" id="otp-change-num">${getValueAthor(otpchangenum)}</p>
                                </div>

                                <p class="otpsubsubhead">${getValueAthor(otpsubsubhead)}</p>
                                <div class="inputotp">
                                    <input type="text" id="loan-form-otp-input" maxlength="4">
                                    <div id="otp-digits"><span class="changeableDigit">${getValueAthor(changeableDigit)}</span>${getValueAthor(spanDigittext)}</div>
                                </div>
                                <div class="wrongotpmessage">

                                </div>
                                <div class="resendtext">
                                    <p>
                                    ${getValueAthor(resendtext)}
                                    </p>
                                    <button type="button" id="loan-form-resend-otp">${getValueAthor(loanformresendotp)}</button>
                                    <span class="timer">${getValueAthor(timer)}</span>
                                </div>

                            </div>



                        </div>

                        <div class="successContainer">
                            <img src="/images/close-icon.svg"
                                class="closeImg" alt="close-img">
                            <div class="imageContainer">
                                <img src="${getValueAthor(namasteicon)}" alt="${getValueAthor(namasteiconalt)}">
                            </div>
                            <div class="textContainer">
                                <div class="namasteText">
                                    <p><span class="boldtext">${getValueAthor(namasteText)}"</span></p>

                                </div>
                                <div class="whatsappNumberContainer">
                                    <div class="labelText">
                                        <p>${getValueAthor(whatsappNumbertext)}</p>

                                    </div>
                                    <div class="mobileNumber">
                                    ${getValueAthor(mobileNumber)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="failedContainer">
                            <img src="/images/close-icon.svg"
                                class="closeImg" alt="close-img">
                            <div class="imageContainer">
                                <img src="${getValueAthor(somethingwrong)}"
                                    alt="${getValueAthor(somethingwrongAlt)}">
                            </div>
                            <div class="textContainer">
                                <div class="namasteText">
                                    <p><span class="boldtext">${getValueAthor(namasteFalied)}</span></p>
                                    <p><span class="greyboldtext">${getValueAthor(namasteFaliedGrey)}</span></p>

                                </div>
                            </div>
                            <button class="failureTryAgain">${getValueAthor(failureTryAgain)}</button>
                        </div>
                    </div>
                </div>
                <div class="loan-form-button-container  loan-form-otp-button-container">
                    <button id="loan-from-otp-verify" class="cmp-container">
                        <div class="btn-text"> ${getValueAthor(otpverify)} </div>
                        <div class="loader"></div>
                    </button>
                </div>
                <!-- <div class="pageloader">
                <img src="/content/dam/piramalfinance/support/whatsaap/piramal-loader.svg" alt="loader" class="loaderImage">
                <div class="mudra-rotator"></div>
                <span class="pageLoaderText"></span>
            </div> -->


                <div data-testid="mudra_loader" class="pageloader xl">
                    <img src="/content/dam/piramalfinance/support/whatsaap/piramal-loader.svg" alt="loader"
                        class="loaderImage">
                    <div class="spinnerParent">
                        <div class="spinner xl" data-testid="mudra_loader_spinner"></div>
                    </div>
                    <span class="pageLoaderText"></span>
                </div>
            </div>
        </div>

    </div>
</div>`;
}
 */

import { onloadLoginCall } from "./login.js";
import { otpPopupCall } from "./otppopup.js";

// Helper functions
const getImageSrc = (element) => element?.querySelector("img")?.getAttribute("src");
const getText = (element) => element?.textContent.trim();
const getValueAthor = (element) => getImageSrc(element) || getText(element);

function createCheckboxHTML(checkbox, tnc) {
  if (getText(checkbox) !== "true") return "";

  return `
<div class="checkbox-field">
  <label class="cmp-form-options__field-label">
    <input class="cmp-form-options__field cmp-form-options__field--checkbox" name="tnc" value="tnc" type="checkbox">
    <span class="cmp-form-options__field-description">${tnc.innerHTML}</span>
  </label>
</div>`;
}

function createInputFieldHTML(uppertext, spantext, placeholder, submitText) {
  return `
<div class="input-field">
  <div class="cmp-form-text">
    <label for="form-text-1975602141">${getText(uppertext)}</label>
    <span class="inptContainer">
      <span class="countryCode">${getText(spantext)}</span>
      <input class="cmp-form-text__text" data-cmp-hook-form-text="input" type="text" maxlength="10"
        id="form-text-1975602141" placeholder="${getText(placeholder)}" name="number" spellcheck="true">
    </span>
  </div>
  <div class="button desktopButton">
    <button type="button" id="button" class="cmp-button" disabled>
      <span class="cmp-button__text">${getText(submitText)}</span>
    </button>
  </div>
</div>`;
}

function renderWhatsAppSection(props) {
  const [frontImage, description, buttonText, buttonHref, placeholder, spantext, uppertext, submitText, tnc, checkbox, ...rest] = props;

  return `
<div class="whats-app-service">
  <div class="front-image">${frontImage.innerHTML}</div>
  <div class="description">${description.innerHTML}</div>
  <a href="${getText(buttonHref)}" class="mobile-button">
    <button>${buttonText.innerHTML}</button>
  </a>
  ${createInputFieldHTML(uppertext, spantext, placeholder, submitText)}
  ${createCheckboxHTML(checkbox, tnc)}
</div>`;
}

function createOtpPopupHTML(props) {
  // Extract required props
  const [
    frontImage,
    description,
    buttonText,
    buttonHref,
    placeholder,
    spantext,
    uppertext,
    submitText,
    tnc,
    checkbox,
    whatsapplock,
    whatsapplockalt,
    otphead,
    otpsubhead,
    otpphonenum,
    otpchangenum,
    otpsubsubhead,
    changeableDigit,
    spanDigittext,
    resendtext,
    loanformresendotp,
    timer,
    namasteicon,
    namasteiconalt,
    namasteText,
    whatsappNumbertext,
    mobileNumber,
    somethingwrong,
    somethingwrongAlt,
    namasteFalied,
    namasteFaliedGrey,
    failureTryAgain,
    otpverify,
  ] = props;

  return `<div class="otppopup">
  <div class="applyloanform">
    <div class="loan-form-sub-parent">
      <div class="cmp-container">
        <div class="loan-form loan-form-sub-otp">
          <div class="cmp-container">
            <div class="loan-form-heading-parent ">
              <div class="cmp-container">
                <div class="image">
                  <img data-src="${getValueAthor(whatsapplock)}" src="${getValueAthor(whatsapplock)}"
                    class="cmp-image__image lozad" alt="${getValueAthor(whatsapplockalt)}">
                </div>
                <div class="image crossimage">
                  <img src="/images/close-icon.svg" class="cmp-image__image lozad" alt="close-icon">
                </div>
              </div>
            </div>
            <div class="loan-form-otp">
              <div class="loan-form-otp-parent">
                <img class="leftarrow lozad" src="/images/back-arrow.png" alt="arrow">
                <p class="otphead">${getValueAthor(otphead)}</p>
                <div class="otpsubheadcontainer">
                  <p class="otpsubhead">${getValueAthor(otpsubhead)} <span class="otp-phone-num"
                      id="loan-form-otpnum">${getValueAthor(otpphonenum)}</span></p>
                  <p class="otp-change-num" id="otp-change-num">${getValueAthor(otpchangenum)}</p>
                </div>

                <p class="otpsubsubhead">${getValueAthor(otpsubsubhead)}</p>
                <div class="inputotp">
                  <input type="text" id="loan-form-otp-input" maxlength="4">
                  <div id="otp-digits"><span
                      class="changeableDigit">${getValueAthor(changeableDigit)}</span>${getValueAthor(spanDigittext)}
                  </div>
                </div>
                <div class="wrongotpmessage">

                </div>
                <div class="resendtext">
                  <p>
                    ${getValueAthor(resendtext)}
                  </p>
                  <button type="button" id="loan-form-resend-otp">${getValueAthor(loanformresendotp)}</button>
                  <span class="timer">${getValueAthor(timer)}</span>
                </div>

              </div>



            </div>

            <div class="successContainer">
              <img src="/images/close-icon.svg" class="closeImg" alt="close-img">
              <div class="imageContainer">
                <img src="${getValueAthor(namasteicon)}" alt="${getValueAthor(namasteiconalt)}">
              </div>
              <div class="textContainer">
                <div class="namasteText">
                  <p><span class="boldtext">${getValueAthor(namasteText)}"</span></p>

                </div>
                <div class="whatsappNumberContainer">
                  <div class="labelText">
                    <p>${getValueAthor(whatsappNumbertext)}</p>

                  </div>
                  <div class="mobileNumber">
                    ${getValueAthor(mobileNumber)}
                  </div>
                </div>
              </div>
            </div>
            <div class="failedContainer">
              <img src="/images/close-icon.svg" class="closeImg" alt="close-img">
              <div class="imageContainer">
                <img src="${getValueAthor(somethingwrong)}" alt="${getValueAthor(somethingwrongAlt)}">
              </div>
              <div class="textContainer">
                <div class="namasteText">
                  <p><span class="boldtext">${getValueAthor(namasteFalied)}</span></p>
                  <p><span class="greyboldtext">${getValueAthor(namasteFaliedGrey)}</span></p>

                </div>
              </div>
              <button class="failureTryAgain">${getValueAthor(failureTryAgain)}</button>
            </div>
          </div>
        </div>
        <div class="loan-form-button-container  loan-form-otp-button-container">
          <button id="loan-from-otp-verify" class="cmp-container">
            <div class="btn-text"> ${getValueAthor(otpverify)} </div>
            <div class="loader"></div>
          </button>
        </div>
        <!-- <div class="pageloader">
                <img src="/content/dam/piramalfinance/support/whatsaap/piramal-loader.svg" alt="loader" class="loaderImage">
                <div class="mudra-rotator"></div>
                <span class="pageLoaderText"></span>
            </div> -->


        <div data-testid="mudra_loader" class="pageloader xl">
          <img src="/content/dam/piramalfinance/support/whatsaap/piramal-loader.svg" alt="loader" class="loaderImage">
          <div class="spinnerParent">
            <div class="spinner xl" data-testid="mudra_loader_spinner"></div>
          </div>
          <span class="pageLoaderText"></span>
        </div>
      </div>
    </div>

  </div>
</div>`;
}

export default function decorate(block) {
  const props = Array.from(block.children, (row) => row.firstElementChild);

  const whatsAppHTML = renderWhatsAppSection(props);
  const otpPopupHTML = createOtpPopupHTML(props);

  block.innerHTML = whatsAppHTML + otpPopupHTML;

  try {
    onloadLoginCall(block);
    otpPopupCall(block);
  } catch (error) {
    console.warn("WhatsApp service initialization error:", error);
  }
}
