/* eslint-env mocha */
import assert from 'assert';
import { getLogLevelFromURL } from '../../blocks/form/constant.js';

describe('getLogLevelFromURL', () => {
  let originalWindow;

  beforeEach(() => {
    // Save original window object
    originalWindow = global.window;
  });

  afterEach(() => {
    // Restore original window
    global.window = originalWindow;
  });

  describe('URL parameter-based log level', () => {
    it('should return "warn" when log=on', () => {
      global.window = {
        location: {
          href: 'https://example.com/form?log=on',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'warn');
    });

    it('should return "debug" when log=debug', () => {
      global.window = {
        location: {
          href: 'https://example.com/form?log=debug',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'debug');
    });

    it('should return "info" when log=info', () => {
      global.window = {
        location: {
          href: 'https://example.com/form?log=info',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'info');
    });

    it('should return "error" when log=error', () => {
      global.window = {
        location: {
          href: 'https://example.com/form?log=error',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'error');
    });

    it('should return "off" when log=off', () => {
      global.window = {
        location: {
          href: 'https://example.com/form?log=off',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'off');
    });

    it('should return "warn" when log=warn', () => {
      global.window = {
        location: {
          href: 'https://example.com/form?log=warn',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'warn');
    });

    it('should return "warn" for invalid log level', () => {
      global.window = {
        location: {
          href: 'https://example.com/form?log=invalid',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'warn');
    });

    it('should work with log parameter among other params', () => {
      global.window = {
        location: {
          href: 'https://example.com/form?foo=bar&log=debug&baz=qux',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'debug');
    });

    it('should return "warn" when log= (empty value)', () => {
      global.window = {
        location: {
          href: 'https://example.com/form?log=',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'warn');
    });
  });

  describe('AEM preview URL-based log level', () => {
    it('should return "warn" for .page domain (AEM preview)', () => {
      global.window = {
        location: {
          href: 'https://main--site--org.aem.page/form',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'warn');
    });

    it('should return "warn" for any subdomain with .page', () => {
      global.window = {
        location: {
          href: 'https://feature-branch--mysite--company.aem.page/form',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'warn');
    });

    it('should return "warn" for .live domain (AEM live)', () => {
      global.window = {
        location: {
          href: 'https://main--site--org.aem.live/form',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'warn');
    });

    it('should return "off" for custom production domains', () => {
      global.window = {
        location: {
          href: 'https://www.example.com/form',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'off');
    });
  });

  describe('URL parameter override of special domains', () => {
    it('should allow log=error to override .page domain default', () => {
      global.window = {
        location: {
          href: 'https://main--site--org.aem.page/form?log=error',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'error');
    });

    it('should allow log=off to disable logs on .page domain', () => {
      global.window = {
        location: {
          href: 'https://main--site--org.aem.page/form?log=off',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'off');
    });

    it('should allow log=off to disable logs on .live domain', () => {
      global.window = {
        location: {
          href: 'https://main--site--org.aem.live/form?log=off',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'off');
    });

    it('should allow log=debug to override localhost default', () => {
      global.window = {
        location: {
          href: 'http://localhost:3000/form?log=debug',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'debug');
    });

    it('should allow log=debug to enable debug on production domains', () => {
      global.window = {
        location: {
          href: 'https://www.production.com/form?log=debug',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'debug');
    });

    it('should prioritize log parameter over .page domain', () => {
      global.window = {
        location: {
          href: 'https://main--site--org.aem.page/form?log=warn',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'warn');
    });
  });

  describe('Worker context (URL string parameter)', () => {
    it('should return "warn" when passed .page URL string', () => {
      const urlString = 'https://main--site--org.aem.page/form?test=1';
      const logLevel = getLogLevelFromURL(urlString);
      assert.strictEqual(logLevel, 'warn');
    });

    it('should return "debug" when passed URL with log=debug', () => {
      const urlString = 'https://www.example.com/form?log=debug';
      const logLevel = getLogLevelFromURL(urlString);
      assert.strictEqual(logLevel, 'debug');
    });

    it('should return "warn" when passed URL with log=on', () => {
      const urlString = 'https://www.example.com/form?log=on';
      const logLevel = getLogLevelFromURL(urlString);
      assert.strictEqual(logLevel, 'warn');
    });

    it('should return "info" when passed URL with log=info', () => {
      const urlString = 'https://www.example.com/form?log=info';
      const logLevel = getLogLevelFromURL(urlString);
      assert.strictEqual(logLevel, 'info');
    });

    it('should return "off" when passed production URL', () => {
      const urlString = 'https://www.example.com/form';
      const logLevel = getLogLevelFromURL(urlString);
      assert.strictEqual(logLevel, 'off');
    });

    it('should return "warn" when passed .live URL', () => {
      const urlString = 'https://main--site--org.aem.live/form';
      const logLevel = getLogLevelFromURL(urlString);
      assert.strictEqual(logLevel, 'warn');
    });

    it('should return "warn" when passed localhost URL', () => {
      const urlString = 'http://localhost:3000/form';
      const logLevel = getLogLevelFromURL(urlString);
      assert.strictEqual(logLevel, 'warn');
    });
  });

  describe('Edge cases', () => {
    it('should return "off" when window is undefined', () => {
      global.window = undefined;
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'off');
    });

    it('should return "off" when window.location is undefined', () => {
      global.window = {};
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'off');
    });

    it('should return "off" when invalid URL string is passed', () => {
      const logLevel = getLogLevelFromURL('not-a-valid-url');
      assert.strictEqual(logLevel, 'off');
    });

    it('should return "warn" for localhost', () => {
      global.window = {
        location: {
          href: 'http://localhost:3000/form',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'warn');
    });

    it('should return "off" when no log parameter is provided', () => {
      global.window = {
        location: {
          href: 'https://example.com/form?other=param',
        },
      };
      const logLevel = getLogLevelFromURL();
      assert.strictEqual(logLevel, 'off');
    });
  });
});

