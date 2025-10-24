/** ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.

 * Adobe permits you to use and modify this file solely in accordance with
 * the terms of the Adobe license agreement accompanying it.
 ************************************************************************ */
import { getSubmitBaseUrl } from '../constant.js';
/**
 * Prefixes the URL with the context path.
 * @param {string} url - The URL to externalize.
 * @returns {string} - The externalized URL.
 */
function externalize(url) {
  const submitBaseUrl = getSubmitBaseUrl();
  if (submitBaseUrl) {
    return `${submitBaseUrl}${url}`;
  }
  return url;
}

/**
 * Validates if the given URL is correct.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if the URL is valid, false otherwise.
 */
function validateURL(url) {
  try {
    const validatedUrl = new URL(url, window.location.href);
    return (validatedUrl.protocol === 'http:' || validatedUrl.protocol === 'https:');
  } catch (err) {
    return false;
  }
}

/**
 * Converts a JSON string to an object.
 * @param {string} str - The JSON string to convert to an object.
 * @returns {object} - The parsed JSON object. Returns an empty object if an exception occurs.
 * @memberof module:FormView~customFunctions
 */
function toObject(str) {
  if (typeof str === 'string') {
    try {
      return JSON.parse(str);
    } catch (e) {
      return {};
    }
  }
  return str;
}

/**
 * Navigates to the specified URL.
 * @param {string} destinationURL - The URL to navigate to. If not specified, a new blank window will be opened.
 * @param {string} destinationType - The type of destination. Supports the following values: "_newwindow", "_blank", "_parent", "_self", "_top", or the name of the window.
 * @returns {Window} - The newly opened window.
 */
function navigateTo(destinationURL, destinationType) {
  let param = null;
  const windowParam = window;
  let arg = null;
  switch (destinationType) {
    case '_newwindow':
      param = '_blank';
      arg = 'width=1000,height=800';
      break;
  }
  if (!param) {
    if (destinationType) {
      param = destinationType;
    } else {
      param = '_blank';
    }
  }
  if (validateURL(destinationURL)) {
    windowParam.open(destinationURL, param, arg);
  }
}

/**
 * Default error handler for the invoke service API.
 * @param {object} response - The response body of the invoke service API.
 * @param {object} headers - The response headers of the invoke service API.
 * @param {scope} globals - An object containing read-only form instance, read-only target field instance and methods for form modifications.
 * @returns {void}
 */
function defaultErrorHandler(response, headers, globals) {
  if (response && response.validationErrors) {
    response.validationErrors?.forEach((violation) => {
      if (violation.details) {
        if (violation.fieldName) {
          globals.functions.markFieldAsInvalid(violation.fieldName, violation.details.join('\n'), { useQualifiedName: true });
        } else if (violation.dataRef) {
          globals.functions.markFieldAsInvalid(violation.dataRef, violation.details.join('\n'), { useDataRef: true });
        }
      }
    });
  }
}

/**
 * Handles the success response after a form submission.
 *
 * @param {scope} globals - An object containing read-only form instance, read-only target field instance and methods for form modifications.
 * @returns {void}
 */
function defaultSubmitSuccessHandler(globals) {
  const { event } = globals;
  const submitSuccessResponse = event?.payload?.body;
  const { form } = globals;
  if (submitSuccessResponse) {
    if (submitSuccessResponse.redirectUrl) {
      window.location.href = encodeURI(submitSuccessResponse.redirectUrl);
    } else if (submitSuccessResponse.thankYouMessage) {
      const formContainerElement = document.getElementById(`${form.$id}`);
      const thankYouMessage = document.createElement('div');
      thankYouMessage.setAttribute('class', 'tyMessage');
      thankYouMessage.setAttribute('tabindex', '-1');
      thankYouMessage.setAttribute('role', 'alertdialog');
      thankYouMessage.innerHTML = submitSuccessResponse.thankYouMessage;
      formContainerElement.replaceWith(thankYouMessage);
      thankYouMessage.focus();
    }
  }
}

/**
 * Handles the error response after a form submission.
 *
 * @param {string} defaultSubmitErrorMessage - The default error message.
 * @param {scope} globals - An object containing read-only form instance, read-only target field instance and methods for form modifications.
 * @returns {void}
 */
function defaultSubmitErrorHandler(defaultSubmitErrorMessage, globals) {
  // view layer should send localized error message here
  window.alert(defaultSubmitErrorMessage);
}

/**
 * Fetches the captcha token for the form.
 *
 * This function uses the Google reCAPTCHA Enterprise/turnstile service to fetch the captcha token.
 *
 * @async
 * @param {object} globals - An object containing read-only form instance, read-only target field instance and methods for form modifications.
 * @returns {string} - The captcha token.
 */
async function fetchCaptchaToken(globals) {
  return new Promise((resolve, reject) => {
    // successCallback and errorCallback can be reused for different captcha implementations
    const successCallback = function (token) {
      resolve(token);
    };

    const errorCallback = function (error) {
      reject(error);
    };

    try {
      const captcha = globals.form.$captcha;
      if (captcha.$captchaProvider === 'turnstile') {
        const turnstileContainer = document.getElementsByClassName('cmp-adaptiveform-turnstile__widget')[0];
        const turnstileParameters = {
          sitekey: captcha.$captchaSiteKey,
          callback: successCallback,
          'error-callback': errorCallback,
        };
        if (turnstile != undefined) {
          const widgetId = turnstile.render(turnstileContainer, turnstileParameters);
          if (widgetId) {
            turnstile.execute(widgetId);
          } else {
            reject({ error: 'Failed to render turnstile captcha' });
          }
        } else {
          reject({ error: 'Turnstile captcha not loaded' });
        }
      } else {
        const siteKey = captcha?.$properties['fd:captcha']?.config?.siteKey;
        const captchaElementName = captcha.$name.replaceAll('-', '_');
        let captchaPath = captcha?.$properties['fd:path'];
        const index = captchaPath.indexOf('/jcr:content');
        let formName = '';
        if (index > 0) {
          captchaPath = captchaPath.substring(0, index);
          formName = captchaPath.substring(captchaPath.lastIndexOf('/') + 1).replaceAll('-', '_');
        }
        const actionName = `submit_${formName}_${captchaElementName}`;
        grecaptcha.enterprise.ready(() => {
          grecaptcha.enterprise.execute(siteKey, { action: actionName })
            .then((token) => resolve(token))
            .catch((error) => reject(error));
        });
      }
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Converts a date to the number of days since the Unix epoch (1970-01-01).
 *
 * If the input date is a number, it is assumed to represent the number of days since the epoch,
 * including both integer and decimal parts. In this case, only the integer part is returned as the number of days.
 *
 * @param {string|Date|number} date - The date to convert.
 * Can be:
 * - An ISO string (yyyy-mm-dd)
 * - A Date object
 * - A number representing the days since the epoch, where the integer part is the number of days and the decimal part is the fraction of the day
 *
 * @returns {number} - The number of days since the Unix epoch
 */
function dateToDaysSinceEpoch(date) {
  let dateObj;
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (typeof date === 'number') {
    return Math.floor(date);
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    throw new Error('Invalid date input');
  }

  // Validate that date is valid after parsing
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date input');
  }
  return Math.floor(dateObj.getTime() / (1000 * 60 * 60 * 24));
}

export {
  externalize,
  validateURL,
  navigateTo,
  toObject,
  defaultErrorHandler,
  defaultSubmitSuccessHandler,
  defaultSubmitErrorHandler,
  fetchCaptchaToken,
  dateToDaysSinceEpoch,
};
