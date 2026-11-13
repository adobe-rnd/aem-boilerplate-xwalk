// import { formOpen, overlay } from '../blocks/applyloanform/applyloanforms.js';
// import { statemasterGetStatesApi } from '../blocks/applyloanform/statemasterapi.js';
// import { validationJSFunc } from '../blocks/applyloanform/validation.js';
import { ctaClick } from '../dl.js';
import {
  sampleRUM, loadHeader, loadFooter, decorateButtons, decorateIcons, decorateSections, decorateBlocks, decorateTemplateAndTheme, waitForLCP, loadBlocks, loadCSS, fetchPlaceholders,
  getMetadata,
  getExtension,
  loadBlock,
} from './aem.js';
import {
  div,
  h4,
  form,
  select,
  option,
  input,
  textarea,
  button,
  span,
} from './dom-helper.js';

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

export async function decoratePlaceholder(block, path) {
  try {
    const resp = await fetchPlaceholders(path);
    // return renderHelper([resp], `<div class="forName">${block.innerHTML}</div>`);
    block.querySelectorAll('*').forEach((el, index) => {
      if (el.firstChild instanceof Text) {
        Object.keys(resp).forEach((key) => {
          const value = resp[key];
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
}

export async function decorateAnchorTag(main) {
  try {
    main.querySelectorAll('a').forEach((anchor) => {
      const { body } = document;
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
  document.documentElement.lang = 'en-IN';
  // Main styles are already loading from head.html; load them here only if that did not run
  const stylesLoaded = window.stylesLoaded || loadCSS(`${window.hlx.codeBasePath}/styles/styles${getExtension('css')}`);
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    // await waitForLCP(LCP_BLOCKS);
    await stylesLoaded.catch(() => {});
    document.body.classList.add('appear');
    await loadHeader(doc.querySelector('header'));
    await loadBlock(main.querySelector(".section"));
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

// function autoloadForm(doc) {
//   doc.querySelectorAll('a').forEach((anchor) => {
//     if (anchor.href && anchor.href.includes('/leadform/')) {
//       anchor.addEventListener('click', async (e) => {
//         e.preventDefault();
//         const {onCLickApplyFormOpen} = await import('../blocks/applyloanform/applyloanforms.js');
//         onCLickApplyFormOpen(e);
//         // document.querySelector('.expert.orangeexpert').click();
//       })
//     }
//   });
// }

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */

/**
 * Safely move card sections into tab panels
 */
function moveCardsToTabPanels() {
  try {
    const generatedSection = document.querySelector('.press-release-cards.cards-container');
    const tabPanel = document.querySelector('.stay-informed #tab-panel-1-0');
    if (generatedSection && tabPanel) {
      tabPanel.appendChild(generatedSection);
    }

    const generatedSectiontwo = document.querySelector('.media-mention-cards.cards-container');
    const tabPanelTwo = document.querySelector('.stay-informed #tab-panel-1-1');
    if (generatedSectiontwo && tabPanelTwo) {
      tabPanelTwo.appendChild(generatedSectiontwo);
    }
  } catch (error) {
    console.warn('Error moving cards to tab panels:', error);
  }
}


async function initSwiperForCards(block) {
  if (!block) return;

  const ul = block.querySelector('ul');
  const lis = block.querySelectorAll('li');

  if (!ul || !lis.length) return;

  const isMobile = window.innerWidth <= 767;
  const cardCount = lis.length;

  // Add Swiper Classes dynamically
  block.classList.add('swiper', 'piramal-swiper');
  ul.classList.add('swiper-wrapper');

  lis.forEach((li) => {
    li.classList.add('swiper-slide');
  });

  // Inject Navigation Arrows & Pagination only if needed
  // For mobile: always show. For desktop: only if more than 3 cards
  const shouldShowNavigation = isMobile || cardCount > 3;

  if (shouldShowNavigation && !block.querySelector('.swiper-button-next')) {
    const navHTML = `
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    `;
    block.insertAdjacentHTML('beforeend', navHTML);
  }

  // Load Swiper library if not already loaded
  if (typeof Swiper === 'undefined') {
    try {
      await loadCSS(`${window.hlx.codeBasePath}/blocks/banner-carousel/swiper-bundle.min.css`);
      const { default: SwiperModule } = await import(`${window.hlx.codeBasePath}/blocks/banner-carousel/swiper-bundle.min.js`);
      window.Swiper = SwiperModule;
    } catch (error) {
      console.error('Error loading Swiper library:', error);
      return;
    }
  }

  // Initialize Swiper with responsive configuration
  try {
    const swiperConfig = {
      observer: true,
      observeParents: true,
      pagination: {
        el: block.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: block.querySelector('.swiper-button-next'),
        prevEl: block.querySelector('.swiper-button-prev'),
      },
      on: {
        init: function () {
          console.log('Swiper initialized successfully for cards');
          // Add class if swiper is disabled
          if (this.params.enabled === false) {
            this.el.classList.add('swiper-disabled');
          }
        },
        update: function () {
          // Update disabled class based on state
          if (this.params.enabled === false || !this.allowSlideNext) {
            this.el.classList.add('swiper-disabled');
          } else {
            this.el.classList.remove('swiper-disabled');
          }
        },
      },
    };

    // Mobile configuration
    if (isMobile) {
      swiperConfig.slidesPerView = 1;
      swiperConfig.spaceBetween = 16;
      swiperConfig.centeredSlides = true;
      swiperConfig.loop = false;
      swiperConfig.allowTouchMove = true;
      swiperConfig.simulateTouch = true;
      swiperConfig.touchRatio = 1;
      swiperConfig.touchAngle = 45;
      swiperConfig.grabCursor = true;
      swiperConfig.centerInsufficientSlides = true;
    } else {
      // Desktop configuration
      swiperConfig.slidesPerView = 3;
      swiperConfig.spaceBetween = 30;
      swiperConfig.slidesPerGroup = 3;
      swiperConfig.allowTouchMove = true;
      swiperConfig.simulateTouch = true;
      swiperConfig.touchRatio = 1;
      swiperConfig.grabCursor = true;

      // Enable navigation only if more than 3 cards
      if (cardCount > 3) {
        swiperConfig.loop = false;
      } else {
        swiperConfig.enabled = false;
        swiperConfig.loop = false;
      }
    }

    const swiperInstance = new Swiper(block, swiperConfig);
    console.log('Swiper instance created:', swiperInstance);
  } catch (error) {
    console.error('Error initializing Swiper:', error);
  }
}

async function initPiramalCards() {
  // Initialize for stay-informed section
  const stayInformedBlock = document.querySelector('.section.stay-informed .cards.block');
  if (stayInformedBlock) {
    await initSwiperForCards(stayInformedBlock);
  }

  // Initialize for press-release-cards in tab panel
  const pressReleaseCards = document.querySelector('#tab-panel-1-0 .cards.block');
  if (pressReleaseCards) {
    await initSwiperForCards(pressReleaseCards);
  }

  // Initialize for media-mention-cards in tab panel
  const mediaMentionCards = document.querySelector('#tab-panel-1-1 .cards.block');
  if (mediaMentionCards) {
    await initSwiperForCards(mediaMentionCards);
  }

  // Initialize for any other tab panels that contain cards
  const otherTabPanelCards = document.querySelectorAll('.section.stay-informed .tab-panel .cards.block');
  if (otherTabPanelCards.length > 0) {
    for (const cardBlock of otherTabPanelCards) {
      // Skip if already initialized
      if (!cardBlock.classList.contains('swiper')) {
        await initSwiperForCards(cardBlock);
      }
    }
  }
}

// async function initLeadershipCards() {
//   // Select the main wrapper
//   const leadershipWrapper = document.querySelector('.section.leadership-wrapper');

//   if (!leadershipWrapper) return;

//   // Find card blocks in Directors tab (tab-panel-0-0)
//   const directorsCards = leadershipWrapper.querySelectorAll('#tab-panel-0-0 .cards.block');
//   if (directorsCards.length > 0) {
//     for (const cardBlock of directorsCards) {
//       // Avoid double initialization
//       if (!cardBlock.classList.contains('swiper')) {
//         await initSwiperForCards(cardBlock);
//       }
//     }
//   }

//   // Find card blocks in Management Team tab (tab-panel-0-1)
//   const managementCards = leadershipWrapper.querySelectorAll('#tab-panel-0-1 .cards.block');
//   if (managementCards.length > 0) {
//     for (const cardBlock of managementCards) {
//       // Avoid double initialization
//       if (!cardBlock.classList.contains('swiper')) {
//         await initSwiperForCards(cardBlock);
//       }
//     }
//   }
// }

function moveDirectorsToTabPanel() {
  try {
    // 1. Move Directors content to Tab 1
    const directorsSection = document.querySelector('.directors-wrapper.cards-container');
    const directorsTabPanel = document.querySelector('#tab-panel-0-0');
    if (directorsSection && directorsTabPanel) {
      directorsTabPanel.appendChild(directorsSection);
    }

    // 2. Move Management Team content to Tab 2
    const managementSection = document.querySelector('.management-team.cards-container');
    const managementTabPanel = document.querySelector('#tab-panel-0-1');
    if (managementSection && managementTabPanel) {
      managementTabPanel.appendChild(managementSection);
    }

  } catch (error) {
    console.warn('Error moving cards to tab panels:', error);
  }
}

/**
 * Main initialization function for the Connect Us section
 */
function initConnectUsSection() {
  try {
    // 1. Render the Form in the Right Column
    renderContactForm();

    // 2. Format the Contact Info in the Left Column
    formatContactInfo();
  } catch (error) {
    console.error('Error initializing Connect Us section:', error);
  }
}

/**
 * Renders the HTML form into the second column of the block
 */
function renderContactForm() {
  try {
    // Scope selection to the specific section to avoid conflicts
    const section = document.querySelector('.section.connect-us');
    if (!section) return;

    const columns = section.querySelectorAll('.columns.block > div');

    // Ensure we have at least 2 columns before trying to access index 1
    if (!columns || columns.length < 2) {
      console.warn('Connect Us: Columns structure mismatch. Expected at least 2 columns.');
      return;
    }

    const formContainer = columns[1]; // The second column

    // Check if form is already rendered to prevent duplicates if init runs twice
    if (formContainer.querySelector('.form-card')) return;

    // Create the form card using DOM helpers
    const formCard = div({ class: 'form-card' },
      div({ class: 'form-header' },
        h4('Send Us A Message')
      ),
      form({ class: 'custom-form', id: 'contactForm', onsubmit: (e) => { e.preventDefault(); return false; } },
        // Enquiry Type
        div({ class: 'form-group' },
          select({ class: 'form-control', name: 'enquiryType', required: true },
            option({ value: '', disabled: true, selected: true }, 'Select Enquiry Type'),
            option({ value: 'investor' }, 'Investor Relations'),
            option({ value: 'general' }, 'General Inquiry'),
            option({ value: 'media' }, 'Media')
          )
        ),
        // Country
        div({ class: 'form-group' },
          select({ class: 'form-control', name: 'country' },
            option({ value: '', disabled: true, selected: true }, 'Select Country'),
            option({ value: 'india' }, 'India'),
            option({ value: 'usa' }, 'USA'),
            option({ value: 'uk' }, 'UK')
          )
        ),
        // State
        div({ class: 'form-group' },
          select({ class: 'form-control', name: 'state' },
            option({ value: '', disabled: true, selected: true }, 'Select State'),
            option({ value: 'maharashtra' }, 'Maharashtra'),
            option({ value: 'delhi' }, 'Delhi')
          )
        ),
        // City
        div({ class: 'form-group' },
          select({ class: 'form-control', name: 'city' },
            option({ value: '', disabled: true, selected: true }, 'Select City'),
            option({ value: 'mumbai' }, 'Mumbai'),
            option({ value: 'pune' }, 'Pune')
          )
        ),
        // First Name
        div({ class: 'form-group' },
          input({ type: 'text', class: 'form-control', name: 'firstName', placeholder: 'First Name', required: true })
        ),
        // Last Name
        div({ class: 'form-group' },
          input({ type: 'text', class: 'form-control', name: 'lastName', placeholder: 'Last Name', required: true })
        ),
        // Email
        div({ class: 'form-group' },
          input({ type: 'email', class: 'form-control', name: 'email', placeholder: 'Email ID', required: true })
        ),
        // Contact Number
        div({ class: 'form-group' },
          input({ type: 'tel', class: 'form-control', name: 'contactNumber', placeholder: 'Contact Number' })
        ),
        // Message
        div({ class: 'form-group full-width' },
          textarea({ class: 'form-control', name: 'message', placeholder: 'Message', rows: '4' })
        ),
        // Submit Button
        div({ class: 'form-group' },
          button({ type: 'button', class: 'btn-submit', onclick: function () { handleFormSubmit(this); } },
            'Submit ',
            span({ class: 'btn-arrow' }, '→')
          )
        )
      )
    );

    // Clear and append the form
    formContainer.innerHTML = '';
    formContainer.appendChild(formCard);

  } catch (error) {
    console.error('Error rendering contact form:', error);
  }
}

/**
 * Formats the raw text content in the first column into styled icons and text
 */
function formatContactInfo() {
  try {
    const section = document.querySelector('.section.connect-us');
    if (!section) return;

    const columns = section.querySelectorAll('.columns.block > div');
    if (!columns || columns.length < 1) return;

    const infoContainer = columns[0];
    const pTag = infoContainer.querySelector('p');

    if (!pTag) return;

    // Get raw html to preserve <br> tags
    const rawContent = pTag.innerHTML;

    // Split by double break (<br><br>) which indicates a new section in the AEM authoring
    const sections = rawContent.split('<br><br>');

    const icons = {
      phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
      email: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
      map: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
    };

    let newHTML = '<div class="contact-info-list">';

    // 1. Phone Section (First block)
    if (sections[0]) {
      newHTML += createContactItem(icons.phone, sections[0]);
    }

    // 2. Email Section (Second block)
    if (sections[1]) {
      // Regex to make emails clickable
      let emailContent = sections[1].replace(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
        '<a href="mailto:$1">$1</a>'
      );
      newHTML += createContactItem(icons.email, emailContent);
    }

    // 3. Address Section (Third block)
    if (sections[2]) {
      newHTML += createContactItem(icons.map, sections[2]);
    }

    newHTML += '</div>';

    infoContainer.innerHTML = newHTML;

  } catch (error) {
    console.error('Error formatting contact info:', error);
  }
}

/**
 * Helper to create HTML string for a single item
 */
function createContactItem(iconSvg, content) {
  try {
    return `
            <div class="contact-item">
                <div class="contact-icon-box">
                    ${iconSvg}
                </div>
                <div class="contact-text">
                    ${content}
                </div>
            </div>
        `;
  } catch (error) {
    console.error('Error creating contact item:', error);
    return '';
  }
}

/**
 * Handles form submission
 */
function handleFormSubmit(buttonElement) {
  try {
    const form = buttonElement.closest('form');

    // Basic validation check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Gather form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Form Submitted with data:', data);
    alert("Form submitted successfully! (Check console for data)");

    // Optional: Reset form
    form.reset();

  } catch (error) {
    console.error('Error handling form submission:', error);
    alert('An error occurred while submitting the form. Please try again.');
  }
}

// Call the function
// moveCardsToTabPanels();

// Execute the function


// 5. Call the function when DOM is ready
// document.addEventListener('DOMContentLoaded', initPiramalCards);

// document.addEventListener('DOMContentLoaded', initPiramalCards);



// Run logic

function autoloadForm(doc) {
  doc.querySelectorAll('a').forEach((anchor) => {
    if (anchor.href && anchor.href.includes('/leadform/')) {
      anchor.addEventListener('click', async (e) => {
        e.preventDefault();
        const {onCLickApplyFormOpen} = await import('../blocks/applyloanform/applyloanforms.js');
        onCLickApplyFormOpen(e);
        // document.querySelector('.expert.orangeexpert').click();
      })
    }
  });
}


async function loadLazy(doc) {
  autolinkModals(doc);
  autoloadForm(doc);
  const main = doc.querySelector('main');
  await loadBlocks(main);

  // Move cards tozz tab panels
  moveCardsToTabPanels();
  initPiramalCards();
  moveDirectorsToTabPanel();
  // initLeadershipCards();
  initConnectUsSection();

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  // loadHeader(doc.querySelector("header"));
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
  const startEvent = new Event('load-event');
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
  // const templateName = getMetadata('template');
  if (false) {
    // await loadTemplate(document, templateName);
  } else {
    loadingCustomCss();
  }

  // loadCSS(`${window.hlx.codeBasePath}/styles/styles${getExtension('css')}`);

  //  loadResetCss();
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();

async function loadingCustomCss() {
  // load custom css files
  // const loadCssArray = [
  //   `${window.hlx.codeBasePath}/styles/reset${getExtension('css')}`
  // ];
  const loadCssArray = [];
  if (!getMetadata('template')) {
    loadCssArray.push(`${window.hlx.codeBasePath}/styles/common/common${getExtension('css')}`);
  }
  loadCssArray.forEach(async (eachCss) => {
    await loadCSS(eachCss);
  });
}

async function loadResetCss() {
  const resetCssPath = `${window.hlx.codeBasePath}/styles/reset${getExtension('css')}`;
  await loadCSS(resetCssPath);
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
    const readAllBTNSection = el.querySelector('.section.carousel-articles-wrapper');
    const readAllBTN = readAllBTNSection.querySelector('.default-content-wrapper p a');
    readAllBTN.addEventListener('click', onClickReadAllBtn);
  } catch (error) {
  }
}

function onClickReadAllBtn(e) {
  try {
    if (e.target.closest('.section.read-all-dl')) {
      const click_text = e.target.textContent.trim();
      const cta_position = e.target.closest('.section').querySelector('.default-content-wrapper').querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();
      const cta_category = '';
      ctaClick(click_text, cta_category, cta_position, targetObject.pageName);
    }
  } catch (error) {
    console.log('read all not found Analytics');
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
    .find((className) => className.startsWith('neeyat-button-'))
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

;

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
    models.forEach((model) => {
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
