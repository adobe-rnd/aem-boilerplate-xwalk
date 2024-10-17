import { formOpen, overlay } from '../blocks/applyloanform/applyloanforms.js';
import { statemasterGetStatesApi } from '../blocks/applyloanform/statemasterapi.js';
import { validationJSFunc } from '../blocks/applyloanform/validation.js';
import { toggleAllNavSections } from '../blocks/header/header.js';
import { applyLoanInteraction, selectBranchInteraction } from '../dl.js';
import {
  sampleRUM, loadHeader, loadFooter, decorateButtons, decorateIcons, decorateSections, decorateBlocks, decorateTemplateAndTheme, waitForLCP, loadBlocks, loadCSS, fetchPlaceholders,
} from './aem.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list

console.log('Main Branch 1.3');
/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

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

export function renderHelper(data, template, callBack) {
  const dom = document.createElement('div');
  dom.innerHTML = template;
  const loopEl = dom.getElementsByClassName('forName');
  Array.prototype.slice.call(loopEl).forEach((eachLoop) => {
    let templates = '';
    const localtemplate = eachLoop.innerHTML;
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        // data.forEach(function (element, index) {
        var dataItem = callBack ? callBack(element, key) : element;
        const keys = Object.keys(dataItem);
        var copyTemplate = localtemplate;
        copyTemplate.split('{').forEach((ecahKey) => {
          const key = ecahKey.split('}')[0];
          const keys = key.split('.');
          let value = dataItem;
          keys.forEach((key) => {
            if (value && value.hasOwnProperty(key)) {
              // if (key === 'data-src') {
              //   key = 'src';
              // }
              value = value[key];
            } else {
              value = '';
            }
          });
          copyTemplate = copyTemplate.replace(`{${key}}`, value);
        });
        templates += copyTemplate;
        // });
      }
    }
    eachLoop.outerHTML = templates;
  });
  return dom.innerHTML;
}

export function fetchAPI(method, url, data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (method === 'GET') {
        const resp = await fetch(url);
        resolve(resp);
      } else if (method === 'POST') {
        data.headerJson = data.headerJson || {
          'Content-Type': 'application/json',
        };

        if (data.headerJson['Content-Type'] == 'remove') {
          data.headerJson['Content-Type'] = '';
        } else {
          data.headerJson['Content-Type'] = data.headerJson['Content-Type'] ? data.headerJson['Content-Type'] : 'application/json';
        }

        /* Optimzie Code */
        /* data.headerJson = data.headerJson || {};
        data.headerJson["Content-Type"] = data.headerJson["Content-Type"] === 'remove' ? '' : data.headerJson["Content-Type"] || "application/json"; */

        const request = new Request(url, {
          method: 'POST',
          body: JSON.stringify(data.requestJson),
          headers: data.headerJson,
        });
        const response = await fetch(request);
        const json = await response.json();
        resolve({ responseJson: json });
      }
    } catch (error) {
      console.warn(error);
      reject(error);
    }
  });
}

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

export function getProps(block, config) {
  return Array.from(block.children).map((el, index) => {
    if (config?.picture) {
      return el.innerHTML.includes('picture') ? el.querySelector('picture') : el.innerText.trim();
    } if (config?.index && config?.index.includes(index)) {
      return el;
    }
    return el.innerHTML.includes('picture') ? el.querySelector('img').src.trim() : el.innerText.trim();
  });
}

export function currenyCommaSeperation(x) {
  if (typeof x === 'number') {
    x = x.toString();
  }

  // Split the number into integral and decimal parts
  const parts = x.split('.');
  let integralPart = parts[0];
  const decimalPart = parts[1] ? `.${parts[1]}` : '';

  // Add commas after every two digits from the right in the integral part
  integralPart = integralPart.replace(/\d(?=(\d{2})+\d$)/g, '$&,');

  return integralPart + decimalPart;
}

export function createCarousle(block, prevButton, nextButton) {
  block.parentElement ? block.parentElement.append(prevButton) : block.append(prevButton);
  block.parentElement ? block.parentElement.append(nextButton) : block.append(nextButton);
  prevButton.addEventListener('click', function (e) {
    targetObject.carouselButton = this;
    targetObject.carouselButton.disabled = true;
    prevSlide(e);
  });
  targetObject.carouselButton = prevButton;
  nextButton.addEventListener('click', function (e) {
    targetObject.carouselButton = this;
    targetObject.carouselButton.disabled = true;
    nextSlide(e);
  });
  if (block.querySelectorAll('.carousel-item').length < 4 && !targetObject.isMobile) {
    prevButton.classList.add('dp-none');
    nextButton.classList.add('dp-none');
  }
  let currentSlide = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  const carousel = block;
  const carouselInner = block.querySelector('#carouselInner');
  const slides = block.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  let visibleSlides = getVisibleSlides(); // Get initial number of visible slides

  carousel.addEventListener('mousedown', dragStart);
  carousel.addEventListener('mouseup', dragEnd);
  carousel.addEventListener('mouseleave', dragEnd);
  carousel.addEventListener('mousemove', drag);

  carousel.addEventListener('touchstart', dragStart);
  carousel.addEventListener('touchend', dragEnd);
  carousel.addEventListener('touchmove', drag);

  carousel.addEventListener('wheel', scrollEvent); // Add scroll event listener
  function carouselResizeEventHandler() {
    visibleSlides = getVisibleSlides();
    setPositionByIndex();
  }

  window.addEventListener('resize', () => {
    targetObject.isTab = window.matchMedia('(max-width: 1024px)').matches;
    carouselResizeEventHandler();
  });

  function dragStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    carouselInner.style.transition = 'none';
  }

  function dragEnd() {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100) {
      nextSlide();
    } else if (movedBy > 100) {
      prevSlide();
    } else {
      setPositionByIndex();
    }
    targetObject.carouselButton.disabled = false;
  }

  function drag(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
      carouselInner.style.transform = `translateX(${currentTranslate}px)`;
    }
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  function getVisibleSlides() {
    if (targetObject.isMobile) {
      return 2;
    } if (targetObject.isTab) {
      return 3;
    }
    return 4;
  }

  function showSlide(index) {
    if (index >= slides.length) {
      // currentSlide = 0;
    } else if (index < 0) {
      // currentSlide = slides.length - 1;
    } else {
    }
    currentSlide = Math.max(0, Math.min(index, totalSlides - visibleSlides));
    setPositionByIndex();
    // console.log("targetObject.carouselButton :: ", targetObject.carouselButton);
    targetObject.carouselButton.disabled = false;
  }

  const setPositionByIndex = targetObject.isTab
    ? function () {
      // Tab
      currentTranslate = (currentSlide * -carouselInner.clientWidth) / (block.closest('.carousel-3pt5') ? 2 : visibleSlides);
      // console.log("currentSlide :: ", currentSlide);
      // console.log("-carouselInner.clientWidth :: ", -carouselInner.clientWidth);
      // console.log("visibleSlides :: ", visibleSlides);
      // console.log("currentTranslate :: ", currentTranslate);
      // console.log("length :: ", slides.length);
      // console.log("check length :: ", currentSlide + 4 == slides.length);
      // console.log("targetObject.isTab :: ", targetObject.isTab);
      prevTranslate = currentTranslate;
      carouselInner.style.transition = 'transform 0.5s ease';
      if (block.closest('.carousel-3pt5') && !targetObject.isTab && currentSlide + 4 == slides.length) {
        // Desktop View Logic 3.5 carousel
        // carouselInner.style.transform = `translateX(${-600}px)`
        // carouselInner.style.transform = `translateX(${currentTranslate }px)`;
        carouselInner.style.transform = `translateX(${currentTranslate - 200}px)`;
      } else if (block.closest('.carousel-3pt5') && targetObject.isTab && currentSlide) {
        // Tab View Logic 3.5 carousel
        if (currentSlide + 4 > slides.length) {
          // targetObject.currentTranslate = 40
          if (currentTranslate > -2100 && targetObject.currentTranslate < 50) {
            targetObject.currentTranslate = targetObject.currentTranslate ? (targetObject.currentTranslate += 340) : 40;
          }
        } else {
          targetObject.currentTranslate = 0;
        }
        carouselInner.style.transform = `translateX(${currentTranslate - targetObject.currentTranslate}px)`;
      } else if (block.closest('.carousel-3pt5') && currentSlide) {
        // Desktop View Logic 3.5 carousel
        carouselInner.style.transform = `translateX(${currentTranslate - 200}px)`;
      } else {
        carouselInner.style.transform = `translateX(${currentTranslate}px)`;
      }
    }
    : function () {
      // Desktop
      currentTranslate = (currentSlide * -carouselInner.clientWidth) / visibleSlides;
      // console.log("currentSlide :: ", currentSlide);
      // console.log("-carouselInner.clientWidth :: ", -carouselInner.clientWidth);
      // console.log("visibleSlides :: ", visibleSlides);
      // console.log("currentTranslate :: ", currentTranslate);
      // console.log("length :: ", slides.length);
      // console.log("check length :: ", currentSlide + 4 == slides.length);
      prevTranslate = currentTranslate;
      carouselInner.style.transition = 'transform 0.5s ease';
      if (block.closest('.carousel-3pt5') && currentSlide + 4 == slides.length) {
        // carouselInner.style.transform = `translateX(${-600}px)`
        carouselInner.style.transform = `translateX(${currentTranslate - 200}px)`;
      } else {
        carouselInner.style.transform = `translateX(${currentTranslate}px)`;
      }
    };

  function nextSlide(e) {
    // if (currentSlide) {
    //   nextButton.disabled = true;
    // }
    // if (e && !e.target.closest('.slide-next').classList.contains('light')) {
    showSlide(currentSlide + 1);
    checkLastChildVisibility();
    // }
  }

  function prevSlide() {
    // if (currentSlide) {
    //   prevButton.disabled = true;
    // }
    showSlide(currentSlide - 1);
    checkLastChildVisibility();
  }

  function scrollEvent(event) {
    if (event.deltaY < 0) {
      prevSlide();
    } else {
      nextSlide();
    }
    event.preventDefault();
  }

  // Initialize the carousel
  showSlide(currentSlide);

  // Check if the last child is visible in the viewport
  function checkLastChildVisibility() {
    const lastChild = carouselInner.lastElementChild;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            nextButton.classList.add('light');
            nextButton.disabled = true;
          } else {
            nextButton.disabled = false;
            nextButton.classList.remove('light');
          }
        });
      },
      {
        root: carousel,
        // threshold: block.closest(".carousel-3pt5") ? 1 : 0.1,
      },
    );

    observer.observe(lastChild);
    checkFirstChildVisibility();
  }
  function checkFirstChildVisibility() {
    const { firstChild } = carouselInner;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            prevButton.classList.add('light');
          } else {
            prevButton.classList.remove('light');
          }
        });
      },
      {
        root: carousel,
        threshold: block.closest('.carousel-3pt5') ? 1 : 0.1,
      },
    );

    observer.observe(firstChild);
  }

  // Initialize the observer for the first time
  checkLastChildVisibility();
}

window.addEventListener('resize', () => {
  targetObject.isTab = window.matchMedia('(max-width: 1024px)').matches;
});
export function createButton(text, picture) {
  const button = document.createElement('button');
  button.classList.add('carousel-control', text);
  button.innerHTML = picture;
  return button;
}

export async function decoratePlaceholder(block, path) {
  try {
    const resp = await fetchPlaceholders(path);
    // return renderHelper([resp], `<div class="forName">${block.innerHTML}</div>`);
    block.querySelectorAll('*').forEach((el, index) => {
      if (el.firstChild instanceof Text) {
        Object.keys(resp).forEach((key) => {
          var value = resp[key];
          if (value && value.trim() && el.firstChild.textContent.trim() && el.firstChild.textContent.includes(`{${key}}`)) {
            console.log(el.innerHTML, " :: ", el.firstChild.textContent);
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

export function decorateViewMore(block) {
  const section = block.closest('.section');
  if (!section.classList.contains('view-more-btn')) return;

  const displayCount = parseInt(Array.from(section.classList)
    .find((cls) => cls.endsWith('-item-display'))
    ?.replace('-item-display', '') || '0');

  const items = block.classList.contains('columns')
    ? block.children
    : block.parentElement.parentElement.children;

  const toggleVisibility = (showAll = false) => {
    [...items].forEach((item, index) => {
      item.classList.toggle('dp-none', !showAll && index >= displayCount);
    });
  };

  toggleVisibility();

  const viewBtn = section.querySelector('.default-content-wrapper .button-container');
  const viewLink = viewBtn.querySelector('a');

  viewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isViewMore = viewLink.textContent.trim().toLowerCase() === 'view more';
    toggleVisibility(isViewMore);
    if (isViewMore) {
      viewLink.textContent = 'View less';
      viewLink.classList.add('view-less-more-column');
    } else {
      viewLink.textContent = 'View more';
      viewLink.classList.remove('view-less-more-column');
      scrollToComponentNearBranch(section);
    }
  });
}

export function decorateAnchorTag(main) {
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
}

export function decodeHtmlSymbols(str) {
  // Create a temporary DOM element
  let textarea = document.createElement('textarea');
  // Set the input string as the element's inner HTML
  textarea.innerHTML = str;
  // The browser automatically decodes any HTML entities in the innerHTML property
  return textarea.value;
}

function scrollToComponentNearBranch(component) {
  if (window.matchMedia('(max-width: 767px)').matches) {
    window.scroll({
      top: component.offsetTop + 20,
      left: 0,
      behavior: 'smooth',
    });
  } else if (window.matchMedia('(max-width: 1024px)').matches) {
    window.scroll({
      top: component.offsetTop + 20,
      left: 0,
      behavior: 'smooth',
    });
  } else {
    window.scroll({
      top: component.offsetTop - 30,
      left: 0,
      behavior: 'smooth',
    });
  }
}

/* helper script end */

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes].map(({ nodeName }) => nodeName).filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
  );
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
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
        `${window.hlx.codeBasePath}/blocks/modal/modal.js`
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

  /* loadHeader(doc.querySelector("header")); */
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
  // load anything that can be postponed to the latest here
  import('./sidekick.js').then(({ initSidekick }) => initSidekick());
}

async function loadPage() {
  loadHeader(document.querySelector('header'));
  await loadingCustomCss();
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();

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
    // `${window.hlx.codeBasePath}/styles/breadcrumb/breadcrumb.css`,
    `${window.hlx.codeBasePath}/styles/disclaimer/disclaimer.css`,
    `${window.hlx.codeBasePath}/styles/risk-gradation-popup/risk-gradation-popup.css`,
    `${window.hlx.codeBasePath}/styles/piramal-group-ajay-info/piramal-group-ajay-info.css`,
    `${window.hlx.codeBasePath}/styles/legal/legal.css`,
    `${window.hlx.codeBasePath}/styles/calculator-mob-carousel/calculator-mob-carousel.css`,
    `${window.hlx.codeBasePath}/styles/media/media-list.css`,
    // `${window.hlx.codeBasePath}/styles/authorisedagencies/authorisedagencies.css`,
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
}

export let body = document.querySelector('body');
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
});

export function showingStateCity(searchInputAll) {
  searchInputAll.forEach((eachinput) => {
    eachinput.parentElement.querySelectorAll('[data-info]').forEach((eachLi) => {
      eachLi.classList.remove('dp-none');
    });
  });
}

setTimeout(() => {
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
}, 5000);

function onCLickApplyFormOpen(e) {
  statemasterGetStatesApi();
  validationJSFunc();
  formOpen();
  try {
    if (!e.target.closest('.section').classList.contains('banner-carousel-wrapper')) {
      const data = {};
      data.click_text = e.target.textContent.trim();
      applyLoanInteraction(data);
    }
  } catch (error) {
    console.warn(error);
  }
  e.preventDefault();
}


export function getDay() {
  const date = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayOfWeek = daysOfWeek[date.getDay()];
  return currentDayOfWeek;
}

export function branchURLStr(location = '', city = '', state = '', urlstrhand, locationcode = '') {
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
}

export function selectBranchDetails(block) {
  const cards = block.closest('.section').querySelectorAll('.branch-list-wrapper a');
  cards.forEach((card) => {
    try {
      card.addEventListener('click', (e) => {
        const dataAnalytics = {};
        dataAnalytics.cta_position = e.target.closest('.cards-branches-container ')?.querySelector('.title h2')?.textContent.trim();
        dataAnalytics.branch_name = e.target.closest('.card-box')?.querySelector('.card-title')?.textContent.trim().replace(/\s+/g, ' ');
        selectBranchInteraction(dataAnalytics);
      });
    } catch (error) {
      console.warn(error);
    }
  })
}

export function calculatorFlatStrLogic(data) {
  var mainObj = {};

  data.forEach(function (eachData) {
    const { Fieldset, Name, Type, Value, ID } = eachData;

    if (Fieldset) {
      if (!mainObj[Fieldset]) {
        mainObj[Fieldset] = {};
      }

      if (Type === "loanamout") {
        if (!mainObj[Fieldset].loanamout) {
          mainObj[Fieldset].loanamout = [];
        }

        let loanItem = mainObj[Fieldset].loanamout[ID];
        if (!loanItem) {
          loanItem = {};
          mainObj[Fieldset].loanamout[ID] = loanItem;
        }

        loanItem[Name] = Value;
      } else if (Type === "array") {
        mainObj[Fieldset][Name] = [];
      } else {
        mainObj[Fieldset][Name] = Value;
      }
    } else {
      mainObj[Name] = Value;
    }
  });

  return mainObj;
}

export async function CFApiCall(cfurl) {
  const response = await fetchAPI('GET', cfurl);
  const responseJson = await response.json();
  return responseJson;
}
