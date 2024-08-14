import { onloadLoginCall } from "./login.js";
import { otpPopupCall } from "./otppopup.js";

export default function decorate(block) {
  const props = Array.from(block.children, (row) => row.firstElementChild);
  const renderWhatsAppHTML = renderWhatsAppFactory(props, block);
  const otpPopupHtml = otpPopupWhatsAppHTML(); 
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
  const [frontImage, description, buttonText, buttonHref, placeholder, spantext, uppertext, submitText, tnc, checkbox] = props;

  const checboxHtml =
    checkbox?.textContent.trim() === "true"
      ? `<div class="checkbox-field">
            <label class="cmp-form-options__field-label">
                <input class="cmp-form-options__field cmp-form-options__field--checkbox" name="tnc" value="tnc"
                    type="checkbox">
                <span class="cmp-form-options__field-description">
                    ${tnc.innerHTML}
                </span>
            </label>
            </div>`
      : "";

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

function otpPopupWhatsAppHTML(){
    return `<div class="otppopup">
    <div class="applyloanform">
        <div class="loan-form-sub-parent">
            <div class="cmp-container">
                <div class="loan-form loan-form-sub-otp">
                    <div class="cmp-container">
                        <div class="loan-form-heading-parent ">
                            <div class="cmp-container">
                                <div class="image">
                                    <img data-src="/content/dam/piramalfinance/support/whatsaap/whatsapplock.svg"
                                        src="/content/dam/piramalfinance/support/whatsaap/whatsapplock.svg"
                                        class="cmp-image__image lozad" alt="send">
                                </div>
                                <div class="image crossimage">
                                    <img src="/content/dam/piramalfinance/product-page/home-loan/close-icon.svg"
                                        class="cmp-image__image lozad" alt="close-icon">
                                </div>
                            </div>
                        </div>
                        <div class="loan-form-otp">
                            <div class="loan-form-otp-parent">
                                <img class="leftarrow lozad"
                                    src="/content/dam/piramalfinance/product-page/home-loan/back-arrow.png" alt="arrow">
                                <p class="otphead">Enter OTP</p>
                                <div class="otpsubheadcontainer">
                                    <p class="otpsubhead">Enter the 4 digit OTP sent on <span class="otp-phone-num"
                                            id="loan-form-otpnum">7896543210</span></p>
                                    <p class="otp-change-num" id="otp-change-num">Change</p>
                                </div>

                                <p class="otpsubsubhead">4 Digit Code</p>
                                <div class="inputotp">
                                    <input type="text" id="loan-form-otp-input" maxlength="4">
                                    <div id="otp-digits"><span class="changeableDigit">0</span>/4 Digits</div>
                                </div>
                                <div class="wrongotpmessage">

                                </div>
                                <div class="resendtext">
                                    <p>
                                        Didn't recieve OTP?
                                    </p>
                                    <button type="button" id="loan-form-resend-otp">Resend OTP</button>
                                    <span class="timer">00:30</span>
                                </div>

                            </div>



                        </div>

                        <div class="successContainer">
                            <img src="/content/dam/piramalfinance/product-page/home-loan/close-icon.svg"
                                class="closeImg" alt="close-img">
                            <div class="imageContainer">
                                <img src="/content/dam/piramalfinance/support/whatsaap/namaste.png" alt="Success-Image">
                            </div>
                            <div class="textContainer">
                                <div class="namasteText">
                                    <p><span class="boldtext">We’ve sent a "Namaste! 🙏"</span></p>

                                </div>
                                <div class="whatsappNumberContainer">
                                    <div class="labelText">
                                        <p>On your WhatsApp Number</p>

                                    </div>
                                    <div class="mobileNumber">
                                        7896543210
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="failedContainer">
                            <img src="/content/dam/piramalfinance/product-page/home-loan/close-icon.svg"
                                class="closeImg" alt="close-img">
                            <div class="imageContainer">
                                <img src="/content/dam/piramalfinance/support/whatsaap/somethingwrong.png"
                                    alt="failed-Image">
                            </div>
                            <div class="textContainer">
                                <div class="namasteText">
                                    <p><span class="boldtext">Something went wrong</span></p>
                                    <p><span class="greyboldtext">Oops! We couldn't send you a message. We request you
                                            to please retry</span></p>

                                </div>
                            </div>
                            <button class="failureTryAgain">Try Again</button>
                        </div>
                    </div>
                </div>
                <div class="loan-form-button-container  loan-form-otp-button-container">
                    <button id="loan-from-otp-verify" class="cmp-container">
                        <div class="btn-text"> Verify OTP</div>
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
</div>`
}
