import {
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem.js';

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
      to?.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
  );
}

/**
 * Format time string to show only hours and minutes (HH:MM)
 */
function formatTime(timeString) {
  const parts = timeString.trim().split(':');
  if (parts.length >= 2) {
    return `${parts[0]}:${parts[1]}`;
  }
  return timeString;
}

function updateLabel(element, startLabel) {
  const timeCell = element.querySelector('div:first-child');
  const timeParagraphs = timeCell ? Array.from(timeCell.querySelectorAll('p')) : [];
  const timeText = timeParagraphs
    .map((p) => formatTime(p.textContent.trim()))
    .filter(Boolean)
    .join(' - ');

  // Get title from strong tag in any cell
  const strongText = element.querySelector('strong')?.textContent;

  let breakTitle = startLabel;
  if (timeText && strongText) {
    breakTitle = `${timeText} - ${strongText}`;
  } else if (timeText) {
    breakTitle = timeText;
  } else if (strongText) {
    breakTitle = strongText;
  }

  element.setAttribute('data-aue-label', breakTitle);
}

export function updateUEInstrumentation() {
  const main = document.querySelector('main');

  // update day label
  main?.querySelectorAll('[data-aue-label="Day"]')?.forEach((element) => {
    const strongText = element.querySelector('strong')?.textContent;
    const dayTitle = strongText || 'Day';
    element.setAttribute('data-aue-label', dayTitle);
  });

  // update venue label
  main?.querySelectorAll('[data-aue-label="Venue"]')?.forEach((element) => {
    const strongText = element.querySelector('strong')?.textContent;
    const venueTitle = strongText || 'Venue';
    element.setAttribute('data-aue-label', venueTitle);
  });

  // update break label
  main?.querySelectorAll('[data-aue-label="Break"]')?.forEach((element) => {
    updateLabel(element, 'Break');
  });

  main?.querySelectorAll('[data-aue-label="Session"]')?.forEach((element) => {
    updateLabel(element, 'Session');
  });
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
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
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
    await loadSection(main.querySelector('.section'), waitForFirstImage);
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
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  updateUEInstrumentation();
  await loadLazy(document);
  loadDelayed();
}

loadPage();
