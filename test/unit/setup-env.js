/* eslint-disable no-underscore-dangle */
import 'jsdom-global';
import 'jsdom-global/register.js';
import fetch from 'node-fetch';
import sinon from 'sinon';

global.MutationObserver = sinon.stub().returns({
  observe: sinon.spy(),
  disconnect: sinon.spy(),
});

class Headers {
  constructor() {
    this.headers = {};
  }

  set(key, value) {
    this.headers[key] = value;
  }

  get(key) {
    return this.headers[key];
  }
}

global.Headers = Headers;

global.fetch = (url, opts) => {
  let finalUrl = url;
  if (!(url.startsWith('https') || url.startsWith('http'))) {
    finalUrl = `http://localhost:3000${url}`;
  }

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  if (global.fetch?.mockData?.[finalUrl]) {
    return {
      headers,
      json: () => (global.fetch?.mockData?.[finalUrl] || {}),
    };
  } return fetch(finalUrl, opts);
};

global.fetch.mockData = {};

global.HTMLElement.prototype.scrollIntoView = function empty() {};

global.DataTransfer = function DataTransfer() {
  this.items = {
    add: (f) => {
      this.files.push(f);
    },
  };
  this.files = [];
  return this;
};

global.DOMParser = window.DOMParser;

Object.defineProperties(HTMLInputElement.prototype, {
  files: {
    set(v) {
      this._files = v;
    },
    get() {
      return this._files;
    },
  },
});
