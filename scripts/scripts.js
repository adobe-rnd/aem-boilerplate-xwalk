// import { formOpen, overlay } from '../blocks/applyloanform/applyloanforms.js';
// import { statemasterGetStatesApi } from '../blocks/applyloanform/statemasterapi.js';
// import { validationJSFunc } from '../blocks/applyloanform/validation.js';
import {ctaClick } from '../dl.js';
import {
  sampleRUM, loadHeader, loadFooter, decorateButtons, decorateIcons, decorateSections, decorateBlocks, decorateTemplateAndTheme, waitForLCP, loadBlocks, loadCSS, fetchPlaceholders,
  getMetadata,
  getExtension,
} from './aem.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list

// console.log('Main Branch 1.3');
/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
/**
 * create an element.
 * @param {string} tagName the tag for the element
 * @param {string|Array<string>} classes classes to apply
 * @param {object} props properties to apply
 * @param {string|Element} html content to add
 * @returns the element
 */
export function createElement(tagName, classes, props, html) {
  const elem = document.createElement(tagName);
  if (classes) {
    const classesArr = typeof classes === 'string' ? [classes] : classes;
    elem.classList.add(...classesArr);
  }
  if (props) {
    Object.keys(props).forEach((propName) => {
      elem.setAttribute(propName, props[propName]);
    });
  }

  if (html) {
    const appendEl = (el) => {
      if (el instanceof HTMLElement || el instanceof SVGElement) {
        elem.append(el);
      } else {
        elem.insertAdjacentHTML('beforeend', el);
      }
    };

    if (Array.isArray(html)) {
      html.forEach(appendEl);
    } else {
      appendEl(html);
    }
  }

  return elem;
}
/* helper script start */
const pathname = location.pathname.replace('.html', '').split('/');
export const targetObject = {
  model: null,
  isMobile: window.matchMedia('(max-width: 767px)').matches,
  ctaPosition: 'Top Menu Bar',
  ctaPosition: 'Top Menu Bar',
  pageName: pathname[pathname.length - 1] || 'home-page',
  isTab: window.matchMedia('(max-width: 1024px)').matches,
};

function decorateImageIcons(element, prefix = '') {
  const anchors = element.querySelectorAll('a');

  anchors.forEach((anchor) => {
    const { href } = anchor;
    let imageName = '';

    if (href.includes('/play.google.com-s/')) {
      anchor.href = href.replace('play.google.com-s', 'play.google.com');
    } else if (href.includes('/apps.apple.com-s/')) {
      anchor.href = href.replace('apps.apple.com-s', 'apps.apple.com');
    } else if (href.includes('play.google.com')) {
      imageName = 'playstore';
    } else if (href.includes('apps.apple.com')) {
      imageName = 'appstore';
    }

    if (imageName) {
      anchor.textContent = '';
      const img = document.createElement('img');
      img.src = `${window.hlx.codeBasePath}${prefix}/images/${imageName}.webp`;
      img.alt = anchor.title;
      img.loading = 'lazy';
      anchor.appendChild(img);
    }
  });
}

window.addEventListener('resize', () => {
  targetObject.isTab = window.matchMedia('(max-width: 1024px)').matches;
});

export async function decoratePlaceholder(block, path) {
  try {
    const resp = await fetchPlaceholders(path);
    // return renderHelper([resp], `<div class="forName">${block.innerHTML}</div>`);
    block.querySelectorAll('*').forEach((el, index) => {
      if (el.firstChild instanceof Text) {
        Object.keys(resp).forEach((key) => {
          var value = resp[key];
          if (value && value.trim() && el.firstChild.textContent.trim() && el.firstChild.textContent.includes(`{${key}}`)) {
            el.innerHTML = el.firstChild.textContent.replaceAll(`{${key}}`, value);
          }
          // if (value && value.trim() && !value.includes('<') && el.firstChild.textContent.trim() && el.firstChild.textContent.includes(`{${key}}`)) {
          //   el.firstChild.textContent = el.firstChild.textContent.replaceAll(`{${key}}`, value);
          // }else {

          // }
        });
      }
    });
    return block.innerHTML;
  } catch (error) {
    console.warn(error);
  }
}

/* export function decorateAnchorTag(main) {
  try {
    main.querySelectorAll('a').forEach((anchor) => {
      if (anchor.innerHTML.includes('<sub>')) {
        anchor.target = '_blank';
      } else if (anchor.href.includes('/modal-popup/')) {
        const paths = anchor.href.split('/');
        const dataid = paths[paths.length - 1];
        anchor.dataset.modelId = dataid;
        targetObject.modelId = dataid;
        anchor.dataset.href = anchor.href;
        anchor.href = 'javascript:void(0)';
        anchor.addEventListener('click', (e) => {
          targetObject.models = document.querySelectorAll(`.${dataid}`);
          targetObject.models?.forEach((eachModel) => {
            eachModel.classList.add('dp-none');
            eachModel.remove();
            body.prepend(eachModel);
          });
          e.preventDefault();
          body.style.overflow = 'hidden';

          targetObject.models?.forEach((eachModel) => {
            eachModel.classList.remove('dp-none');
            eachModel.classList.add('overlay');
            const crossIcon = eachModel.querySelector('em');
            if (crossIcon.innerHTML.includes(':cross-icon')) {
              crossIcon.innerHTML = '';
              crossIcon.addEventListener('click', (e) => {
                eachModel.classList.remove('overlay');
                eachModel.classList.add('dp-none');
              });
            }
          });
        });
      }
    });
  } catch (error) {
    console.warn(error);
  }
} */


export async function decorateAnchorTag(main) {
  try {
    main.querySelectorAll('a').forEach((anchor) => {
      const body = document.body;
      processAnchor(anchor, body);
    });
  } catch (error) {
    console.warn(error);
  }
}

/* helper script end */

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts${getExtension('css')}`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

function autolinkModals(element) {
  element.addEventListener('click', async (e) => {
    const origin = e.target.closest('a');

    if (origin && origin.href && origin.href.includes('/modals/')) {
      e.preventDefault();
      const { openModal } = await import(
        `${window.hlx.codeBasePath}/blocks/modal/modal${getExtension('js')}`
      );
      openModal(origin.href);
    }
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  try {
    // TODO: add auto block, if needed
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export async function decorateMain(main) {
  decorateAnchorTag(main);
  decoratePlaceholder(main);
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  decorateImageIcons(main);
  // handleOpenFormOnClick(main);
  handleReadAll(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await waitForLCP(LCP_BLOCKS);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  autolinkModals(doc);

  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector("header"));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  const startEvent = new Event("load-event");
  document.dispatchEvent(startEvent);
  // load anything that can be postponed to the latest here
  import('./sidekick.js').then(({ initSidekick }) => initSidekick());
}

async function loadTemplate(doc, templateName) {
  try {
    const cssLoaded = new Promise((resolve) => {
      loadCSS(`${window.hlx.codeBasePath}/templates/${templateName}/${templateName}${getExtension('css')}`, resolve);
    });
    const decorationComplete = new Promise((resolve) => {
      (async () => {
        try {
          const mod = await import(`../templates/${templateName}/${templateName}${getExtension('js')}`);
          if (mod.default) {
            await mod.default(doc);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`failed to load module for ${templateName}`, error);
        }
        resolve();
      })();
    });
    await Promise.all([cssLoaded, decorationComplete]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`failed to load block ${templateName}`, error);
  }
}

async function loadPage() {
  // loadHeader(document.querySelector('header'));
  const templateName = getMetadata('template');
  if (templateName) {
    await loadTemplate(document, templateName);
  }
  await loadingCustomCss();
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();


async function loadingCustomCss() {
  // load custom css files
  const loadCssArray = [
    `${window.hlx.codeBasePath}/styles/reset${getExtension('css')}`
  ];
  if (!getMetadata('template')) {
    loadCssArray.push(`${window.hlx.codeBasePath}/styles/common/common${getExtension('css')}`)
  }
  loadCssArray.forEach(async (eachCss) => {
    await loadCSS(eachCss);
  });
}
/* 
async function loadingCustomCss() {
  // load custom css files
  const loadCssArray = [
    `${window.hlx.codeBasePath}/styles/loanproducts/loanproducts.css`,
    `${window.hlx.codeBasePath}/styles/calculator/calculator.css`,
    `${window.hlx.codeBasePath}/styles/choose-us/choose-us.css`,
    `${window.hlx.codeBasePath}/styles/download-piramal/download-piramal.css`,
    `${window.hlx.codeBasePath}/styles/our-media/our-media.css`,
    `${window.hlx.codeBasePath}/styles/piramal-since/piramal-since.css`,
    `${window.hlx.codeBasePath}/styles/about-us-company/about-us-company.css`,
    `${window.hlx.codeBasePath}/styles/reset.css`,
    `${window.hlx.codeBasePath}/styles/key-features/key-features.css`,
    `${window.hlx.codeBasePath}/styles/metro-cities/metro-cities.css`,
    `${window.hlx.codeBasePath}/styles/articles-carousel/articles-carousel.css`,
    `${window.hlx.codeBasePath}/styles/details-verification/details-verification.css`,
    `${window.hlx.codeBasePath}/styles/elgibility-criteria/elgibility-criteria.css`,
    `${window.hlx.codeBasePath}/styles/table/table.css`,
    `${window.hlx.codeBasePath}/styles/tab-with-cards/tab-with-cards.css`,
    `${window.hlx.codeBasePath}/styles/e-auction/e-auction.css`,
    `${window.hlx.codeBasePath}/styles/list-content/list-content.css`,
    `${window.hlx.codeBasePath}/styles/real-estate-banner/real-estate-banner.css`,
    `${window.hlx.codeBasePath}/styles/rte-wrapper/rte-wrapper.css`,
    `${window.hlx.codeBasePath}/styles/partnerships-cards/partnerships-cards.css`,
    `${window.hlx.codeBasePath}/styles/knowledge-card-carousel/knowledge-card-carousel.css`,
    `${window.hlx.codeBasePath}/styles/board-of-directors/board-of-directors.css`,
    `${window.hlx.codeBasePath}/styles/ratings-card/ratings-card.css`,
    `${window.hlx.codeBasePath}/styles/partnership-cards-tab/partnership-cards-tab.css`,
    `${window.hlx.codeBasePath}/styles/company-details/company-details.css`,
    `${window.hlx.codeBasePath}/styles/years-info-tab/years-info-tab.css`,
    `${window.hlx.codeBasePath}/styles/media/media.css`,
    `${window.hlx.codeBasePath}/styles/partnership/partnership.css`,
    `${window.hlx.codeBasePath}/styles/rupee-cards/rupee-card.css`,
    `${window.hlx.codeBasePath}/styles/interest-rates-disclosure/interest-rates-disclosure.css`,
    `${window.hlx.codeBasePath}/styles/annualreports/annualreports.css`,
    `${window.hlx.codeBasePath}/styles/awards-recognition/awards-recognition.css`,
    `${window.hlx.codeBasePath}/styles/multi-calculator/multi-calculator.css`,
    `${window.hlx.codeBasePath}/styles/career-social-cards/career-social-cards.css`,
    `${window.hlx.codeBasePath}/styles/available-facilities/available-facilities.css`,
    `${window.hlx.codeBasePath}/styles/nearest-branches/nearest-branches.css`,
    `${window.hlx.codeBasePath}/styles/steps-for-apply/steps-for-apply.css`,
    `${window.hlx.codeBasePath}/styles/csr-committee/csr-committee.css`,
    `${window.hlx.codeBasePath}/styles/grievance-redressal/grievance-redressal.css`,
    `${window.hlx.codeBasePath}/styles/documents-required/documents-required.css`,
    `${window.hlx.codeBasePath}/styles/mobile-sticky-button/mobile-sticky-button.css`,
    `${window.hlx.codeBasePath}/styles/disclaimer/disclaimer.css`,
    `${window.hlx.codeBasePath}/styles/risk-gradation-popup/risk-gradation-popup.css`,
    `${window.hlx.codeBasePath}/styles/piramal-group-ajay-info/piramal-group-ajay-info.css`,
    `${window.hlx.codeBasePath}/styles/legal/legal.css`,
    `${window.hlx.codeBasePath}/styles/calculator-mob-carousel/calculator-mob-carousel.css`,
    `${window.hlx.codeBasePath}/styles/media/media-list.css`,
    `${window.hlx.codeBasePath}/styles/table-whatsapp-btn/table-whatsapp-btn.css`,
    `${window.hlx.codeBasePath}/styles/financial-reports/financial-reports.css`,
    `${window.hlx.codeBasePath}/styles/support-quicklinks-wrapper/support-quicklinks-wrapper.css`,
    `${window.hlx.codeBasePath}/styles/support-contact-us/support-contact-us.css`,
    `${window.hlx.codeBasePath}/styles/whatsApp-service-wrapper/whatsApp-service-wrapper.css`,
    `${window.hlx.codeBasePath}/styles/sarfaesi-wholesale/sarfaesi-wholesale.css`,
    `${window.hlx.codeBasePath}/styles/whatsapp-service-loan-products/whatsapp-service-loan-products.css`,
    `${window.hlx.codeBasePath}/styles/forms-formats/forms-formats.css`,
    `${window.hlx.codeBasePath}/styles/whatsapp-service-banner/whatsapp-service-banner.css`,
    `${window.hlx.codeBasePath}/styles/support-contact-us/support-contact-popup.css`,
    `${window.hlx.codeBasePath}/styles/e-nach-registration/e-nach-registration.css`,
    `${window.hlx.codeBasePath}/styles/support-faq/support-faq.css`,
    `${window.hlx.codeBasePath}/styles/embed-carousel-wrapper/embed-carousel-wrapper.css`,
    `${window.hlx.codeBasePath}/styles/fixed-headset/fixed-headset.css`,
  ];

  loadCssArray.forEach(async (eachCss) => {
    await loadCSS(eachCss);
  });
} */

/* async function loadingCustomCss() {
  // load custom css files
  const loadCssArray = [
    `${window.hlx.codeBasePath}/styles/loanproducts/loanproducts.css`,
    `${window.hlx.codeBasePath}/styles/calculator/calculator.css`,
    `${window.hlx.codeBasePath}/styles/choose-us/choose-us.css`,
    `${window.hlx.codeBasePath}/styles/download-piramal/download-piramal.css`,
    `${window.hlx.codeBasePath}/styles/our-media/our-media.css`,
    `${window.hlx.codeBasePath}/styles/piramal-since/piramal-since.css`,
    `${window.hlx.codeBasePath}/styles/about-us-company/about-us-company.css`,
    `${window.hlx.codeBasePath}/styles/reset.css`,
    `${window.hlx.codeBasePath}/styles/key-features/key-features.css`,
    `${window.hlx.codeBasePath}/styles/metro-cities/metro-cities.css`,
    `${window.hlx.codeBasePath}/styles/articles-carousel/articles-carousel.css`,
    `${window.hlx.codeBasePath}/styles/details-verification/details-verification.css`,
    `${window.hlx.codeBasePath}/styles/elgibility-criteria/elgibility-criteria.css`,
    `${window.hlx.codeBasePath}/styles/table/table.css`,
    `${window.hlx.codeBasePath}/styles/tab-with-cards/tab-with-cards.css`,
    `${window.hlx.codeBasePath}/styles/fixed-headset/fixed-headset.css`,
  ];

  loadCssArray.forEach(async (eachCss) => {
    await loadCSS(eachCss);
  });
} */

/* export let body = document.querySelector('body');
body?.addEventListener('click', (e) => {
  // e.stopImmediatePropagation();
  const loaninnerform = document.querySelector('.loan-form-sub-parent') || '';
  if (!e.target.closest('.show') && targetObject.model && loaninnerform?.style.visibility != 'visible') {
    targetObject.model?.querySelector('.overlayDiv').classList.remove('show');
    document.body.style.overflow = 'scroll';
    document.querySelector('.modal-overlay').classList.remove('overlay');
    document.querySelector('.modal-overlay').classList.add('dp-none');
    document.querySelector('.modal-overlay').style.zIndex = 'revert-layer';
  } else if (!e.target.closest('.nav-drop')) {
    // console.log("don't close nav");

    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    navSections?.children[0]?.classList.remove('active');
    navSections?.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      toggleAllNavSections(navSections);
      navSection.setAttribute('aria-expanded', 'false');
      navSections.setAttribute('aria-expanded', 'false');
      if (document.querySelector('body').classList.contains('modal-open') && navSection.getAttribute('aria-expanded') === 'false') {
        document.querySelector('body').classList.remove('modal-open');
      }
    });
  }
  if (e.target.classList.contains('overlay')) {
    targetObject.models?.forEach((eachModel) => {
      eachModel.classList.add('dp-none');
      eachModel.classList.remove('overlay');
    });
  }
  if (!e.target.closest('.stake-pop-up')) {
    if (document.querySelector('.partnership-tab-content.partnership-image-popup .cmp-text.active')) document.querySelector('.cmp-text.active').classList.remove('active');
    document.querySelectorAll('.stake-pop-up').forEach((ele) => {
      ele.classList.remove('dp-block');
      ele.classList.add('dp-none');
      document.body.style.overflow = 'auto';
      document.querySelector('.modal-overlay').classList.remove('overlay');
      document.querySelector('.modal-overlay').classList.add('dp-none');
    });

    e.currentTarget.querySelector('.stake-pop-up.dp-block')?.classList.remove('dp-block');
  }

  // Neeyat Lagunage DropDown Closer
  if (document.querySelector('.neeyat-header') && !e.target.closest('.inner-lang-switch')) {
    document.querySelector('.maindiv-lang-switch ul').classList.add('dp-none');
  }

  // Branch Locator DropDown Closer
  if (document.querySelector('.branch-locater-banner') && e.target.classList.contains('search-input')) {

  } else if (document.querySelector('.branch-locater-banner') && (!e.target.closest('.default-state-selected') || !e.target.closest('.default-city-selected'))) {
    const searchInput = document.querySelectorAll('.search-input');
    showingStateCity(searchInput);
    document.querySelector('.state-wrapper').classList.add('dp-none');
    document.querySelector('.city-wrapper').classList.add('dp-none');
    document.querySelector('.state-wrapper > input').value = '';
    document.querySelector('.city-wrapper > input').value = '';
  }
}); */

/* setTimeout(() => {
  try {
    document.querySelectorAll('.open-form-on-click') && document.querySelectorAll('.open-form-on-click .button-container').forEach((eachApplyFormClick) => {
      eachApplyFormClick.addEventListener('click', async (e) => {
        onCLickApplyFormOpen(e);
      });
    });
  } catch (error) {
    console.warn(error);
  }

  // Neeyat Click
  try {
    document.querySelectorAll('.neeyat-click').length > 0 && document.querySelector('.neeyat-click').querySelectorAll('.block.carousel-item').forEach((eachApplyFormClick) => {
      const classListNeeyatBanner = document.querySelector('.neeyat-click').classList;
      let buttonClick;
      classListNeeyatBanner.forEach((eachClass) => {
        if (eachClass.includes('neeyat-button')) {
          buttonClick = eachClass.replace('neeyat-button-', '');
        }
      });
      eachApplyFormClick.querySelectorAll('.button-container')[buttonClick].addEventListener('click', (e) => {
        onCLickApplyFormOpen(e);
      });
    });
  } catch (error) {
    console.warn(error);
  }
}, 5000); */

/* setTimeout(() => {
  handleOpenFormOnClick();
  handleNeeyatClick();
}, 5000); */

// window.addEventListener("load", () => {
//   // Initialize IntersectionObserver
//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         if (entry.target.classList.contains("open-form-on-click")) {
//           handleOpenFormOnClick();
//         } else if (entry.target.classList.contains("neeyat-click")) {
//           handleNeeyatClick(entry.target);
//         }
//         observer.unobserve(entry.target);
//       }
//     });
//   }, { rootMargin: "50px" });

//   // Observe elements - Fixed version
//   const formSections = document.querySelectorAll('.open-form-on-click');
//   const neeyatSections = document.querySelectorAll('.neeyat-click');

//   // Handle formSections
//   if (formSections.length > 0) {
//     formSections.forEach(section => {
//       observer.observe(section);
//     });
//   }

//   // Handle neeyatSections
//   if (neeyatSections.length > 0) {
//     neeyatSections.forEach(section => {
//       observer.observe(section);
//     });
//   }
// });

export function handleReadAll(el) {
  try {
    const readAllBTNSection = el.querySelector(".section.carousel-articles-wrapper")
    let readAllBTN = readAllBTNSection.querySelector(".default-content-wrapper p a");
    readAllBTN.addEventListener("click", onClickReadAllBtn)
  } catch (error) {
  }
}

function onClickReadAllBtn(e) {
  try {
    if (e.target.closest(".section.read-all-dl")) {
      const click_text = e.target.textContent.trim();
      const cta_position = e.target.closest('.section').querySelector('.default-content-wrapper').querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();
      const cta_category = '';
      ctaClick(click_text, cta_category, cta_position, targetObject.pageName);
    }
  } catch (error) {
    console.log("read all not found Analytics")
  }
}


/* export function handleOpenFormOnClick(el) {
  const formButtons = el.querySelectorAll('.open-form-on-click .button-container');
  formButtons.forEach(button => {
    console.log(button);
    button.addEventListener('click', onCLickApplyFormOpen);
  });
} */

/* function handleNeeyatClick(neeyatClick) {
  if (!neeyatClick) return;

  const buttonIndex = getNeeyatButtonIndex(neeyatClick);
  const carouselItems = neeyatClick.querySelectorAll('.block.carousel-item');

  carouselItems.forEach(item => {
    const button = item.querySelectorAll('.button-container')[buttonIndex];
    if (button) {
      button.addEventListener('click', onCLickApplyFormOpen);
    }
  });
}
 */
function getNeeyatButtonIndex(element) {
  return Array.from(element.classList)
    .find(className => className.startsWith('neeyat-button-'))
    ?.replace('neeyat-button-', '') || 0;
}

/* function onCLickApplyFormOpen(e) {
  statemasterGetStatesApi();
  validationJSFunc();
  formOpen();
  try {
    if (!e.target.closest('.section').classList.contains('banner-carousel-wrapper')) {
      if (!e.target.closest('.section').classList.contains('documents-required-brown')) {
        const data = {};
        data.click_text = e.target.textContent.trim();
        applyLoanInteraction(data);
      }
    }
    if (e.target.closest('.section').classList.contains('documents-required-brown')) {
      const click_text = e.target.textContent.trim();
      const cta_category = e.target.closest('.section').querySelector('.default-content-wrapper').querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();
      const cta_position = '';
      ctaClick(click_text, cta_category, cta_position, targetObject.pageName);
    }
  } catch (error) {
    console.warn(error);
  }
  e.preventDefault();
} */


/* export function branchURLStr(location = '', city = '', state = '', urlstrhand, locationcode = '') {
  const locationAdd = location?.replace(/\s+/g, '-').replace(/[()/]/g, '').trim().toLowerCase();
  const cityStr = city?.replace(/\s+/g, '-').replace(/[()/]/g, '').trim().toLowerCase();
  const stateStr = state?.replace(/\s+/g, '-').replace(/[()/]/g, '').trim().toLowerCase();
  if (urlstrhand == 'shorthand') {
    return `/branch-locator/${stateStr}/${cityStr}`;
  } if (urlstrhand == 'shorthandstate') {
    return `/branch-locator/${stateStr}`;
  } if (urlstrhand == 'loans') {
    if (locationAdd == cityStr) {
      return `/branch-locator/loans-in-${cityStr}-${stateStr}-${locationcode}`;
    }
    return `/branch-locator/loans-in-${locationAdd}-${cityStr}-${stateStr}-${locationcode}`;
  }
} */

// Create a function to group all loans

// Main function
const processAnchor = (anchor, body) => {

  // Handle target attribute
  if (anchor.innerHTML.includes('<sub>')) {
    anchor.target = '_blank';
  }

  // Handle modal popup
  if (anchor.href.includes('/modal-popup/')) {
    handleModalPopup(anchor, body);
  }

};


const handleModalPopup = (anchor, body) => {
  const dataid = anchor.href.split('/').pop();
  // Set attributes
  anchor.dataset.modelId = dataid;
  targetObject.modelId = dataid;
  anchor.dataset.href = anchor.href;
  anchor.href = 'javascript:void(0)';
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const models = document.querySelectorAll(`.${dataid}`);
    targetObject.models = models;
    if (!models.length) return;
    // Handle models
    models.forEach(model => {
      model.classList.add('dp-none');
      model.remove();
      body.prepend(model);
      // Show modal
      model.classList.remove('dp-none');
      model.classList.add('overlay');
      // Handle close button
      const crossIcon = model.querySelector('em');
      if (crossIcon?.innerHTML.includes(':cross-icon')) {
        crossIcon.innerHTML = '';
        crossIcon.addEventListener('click', () => {
          model.classList.remove('overlay');
          model.classList.add('dp-none');
        });
      }
    });
    body.style.overflow = 'hidden';
  });
};

