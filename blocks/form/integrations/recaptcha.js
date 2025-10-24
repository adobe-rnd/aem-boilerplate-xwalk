export default class GoogleReCaptcha {
  id;

  name;

  config;

  formName;

  loadPromise;

  constructor(config, id, name, formName) {
    this.config = config;
    this.name = name;
    this.id = id;
    this.formName = formName;
  }

  #loadScript(url) {
    if (!this.loadPromise) {
      this.loadPromise = new Promise((resolve, reject) => {
        const head = document.head || document.querySelector('head');
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = () => resolve(window.grecaptcha);
        script.onerror = () => reject(new Error(`Failed to load script ${url}`));
        head.append(script);
      });
    }
  }

  loadCaptcha(form) {
    if (form && this.config.siteKey) {
      const submit = form.querySelector('button[type="submit"]');
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { siteKey } = this.config;
            const url = this.config.uri;
            if (this.config.version === 'enterprise') {
              this.#loadScript(`${url}?render=${siteKey}`);
            } else {
              this.#loadScript(`https://www.google.com/recaptcha/api.js?render=${siteKey}`);
            }
            obs.disconnect();
          }
        });
      });
      if (submit == null) {
        // eslint-disable-next-line no-console
        console.warn('Captcha can not be loaded. Submit button is missing.');
        // eslint-disable-next-line no-alert
        alert('Captcha can not be loaded. Add Submit button.');
      } else {
        obs.observe(submit);
      }
    } else {
      // eslint-disable-next-line no-console
      console.warn('Captcha configuration in missing.');
      // eslint-disable-next-line no-alert
      alert('Captcha can not be loaded. Captcha configuration in missing.');
    }
  }

  async getToken() {
    if (!this.config.siteKey) {
      return null;
    }
    return new Promise((resolve) => {
      const { grecaptcha } = window;
      if (this.config.version === 'enterprise') {
        grecaptcha.enterprise.ready(async () => {
          const submitAction = `submit_${this.formName}_${this.name}`;
          const token = await grecaptcha.enterprise.execute(
            this.config.siteKey,
            { action: submitAction },
          );
          resolve(token);
        });
      } else {
        grecaptcha.ready(async () => {
          const token = await grecaptcha.execute(this.config.siteKey, { action: 'submit' });
          resolve(token);
        });
      }
    });
  }
}
