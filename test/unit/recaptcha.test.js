/* eslint-env mocha */
import assert from 'assert';
import sinon from 'sinon';
import jsdom from 'jsdom';
import GoogleReCaptcha from '../../blocks/form/integrations/recaptcha.js';

const siteKey = 'test-site-key';
const testToken = 'token123';

const configv3 = {
  siteKey,
  uri: 'https://www.recaptcha.net/recaptcha/api.js?render=',
};
const configEnterprise = {
  siteKey,
  uri: 'https://www.recaptcha.net/recaptcha/enterprise.js',
  version: 'enterprise',
};
const configNull = {
  siteKey: null,
  uri: 'https://www.google.com/recaptcha/api.js',
};

let form;

describe('Google recaptcha Integeration', () => {
  beforeEach(() => {
    global.window.grecaptcha = {
      ready: (callback) => {
        callback();
      },
      enterprise: {
        ready: (callback) => {
          callback();
        },
        execute: (key, options) => {
          if (key === siteKey && options.action === 'submit_site123_cap123') {
            return Promise.resolve(testToken);
          }
          return Promise.resolve(null);
        },
      },
      execute: (key, options) => {
        if (key === siteKey && options.action === 'submit') {
          return Promise.resolve(testToken);
        }
        return Promise.resolve(null);
      },
    };
    // Mock the IntersectionObserver
    global.IntersectionObserver = sinon.stub().returns({
      observe: sinon.spy(),
      disconnect: sinon.spy(),
    });

    // Mock the form and button
    const { JSDOM } = jsdom;
    const dom = new JSDOM('<!DOCTYPE html><form><button type="submit"></button></form>');
    form = dom.window.document.querySelector('form');
    dom.window.grecaptcha = global.grecaptcha;
  });

  it('should load the captcha when the submit button is intersecting', () => {
    const recaptcha = new GoogleReCaptcha(configv3, 123, 'cap123', 'site123');
    recaptcha.loadCaptcha(form);

    // Simulate the IntersectionObserver callback
    const callback = global.IntersectionObserver.getCall(0).args[0];
    callback([{ isIntersecting: true }]);

    const script = document.head.querySelector('script');
    assert.equal(script.src, `https://www.google.com/recaptcha/api.js?render=${siteKey}`, 'Expected the script to be loaded');
  });

  it('should load the captcha when the submit button is intersecting for enterprise', () => {
    const recaptcha = new GoogleReCaptcha(configEnterprise, 123, 'cap123', 'site123');
    document.head.querySelector('script')?.remove();
    recaptcha.loadCaptcha(form);

    // Simulate the IntersectionObserver callback
    const callback = global.IntersectionObserver.getCall(0).args[0];
    callback([{ isIntersecting: true }]);

    const script = document.head.querySelector('script');
    assert.equal(script.src, `${configEnterprise.uri}?render=${configEnterprise.siteKey}`, 'Expected the script to be loaded');
  });

  it('getToken should return null if siteKey is not set', async () => {
    const recaptcha = new GoogleReCaptcha(configNull, 123, 'cap123', 'site123');
    const token = await recaptcha.getToken();
    assert.equal(token, null, 'Expected token to be null');
  });

  it('getToken should return token for v3', async () => {
    const recaptcha = new GoogleReCaptcha(configv3, 123, 'cap123', 'site123');
    const token = await recaptcha.getToken();
    assert.equal(token, testToken, 'Expected token to be not null');
  });

  it('getToken should return token for enterprise', async () => {
    const recaptcha = new GoogleReCaptcha(configEnterprise, 123, 'cap123', 'site123');
    const token = await recaptcha.getToken();
    assert.equal(token, testToken, 'Expected token to be not null');
  });
});
