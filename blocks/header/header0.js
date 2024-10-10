import { headerInteraction, loignClick, navlogin } from '../../dl.js';
import { getMetadata } from '../../scripts/aem.js';
import { targetObject } from '../../scripts/scripts.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');
const isMobile = window.matchMedia('(max-width: 768px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
export function toggleAllNavSections(sections, expanded = false) {
  sections?.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  // const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  // button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections?.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops?.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        // drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops?.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', (e) => {
        // if (isDesktop.matches ) {
        if (isDesktop.matches && !e.target.children.length) {
          // if (isDesktop.matches && !e.target.children.length) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          try {
            const click_text = e.target.innerText;
            const menu_category = e.target.closest('ul').closest('li')?.querySelector('p')?.innerText;
            // console.log("click_text :: ", e.target.innerText);
            // console.log("menu_category :: ", e.target.closest("ul").closest("li")?.querySelector("p")?.innerText);
            // console.log("menu_category :: ", e.target.closest(".navigation-level-active")?.querySelector("p")?.innerText);
            // console.log(targetObject.ctaPosition);
            // console.log(targetObject.pageName);
            headerInteraction(click_text, menu_category, targetObject.ctaPosition, targetObject.pageName);
          } catch (error) {
            console.warn(error);
          }
        } else if (isMobile.matches) {
          // Custom Event Function
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavMobile(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // hamburger for mobile
  /* const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', (e) => {
    toggleMenu(nav, navSections)
    hamburgerHandler();
  }); */
  // nav.prepend(hamburger);
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<div class="hambuger-menu" aria-controls="nav" aria-label="Open navigation">
    <div class="hamburger-image-custom">
        <img src="/content/dam/piramalfinance/header-images/icons8-hamburger-menu-100.png" alt="hamburger-icon">
    </div>
    <div class="cross-image-custom">
        <img src="/content/dam/piramalfinance/header-images/icons8-cross-100.png" alt="cross-icon">
    </div>
</div>`;
  nav.prepend(hamburger);
  nav.querySelector('.hambuger-menu').addEventListener('click', function () {
    if (this.closest('.hambuger-menu').getAttribute('aria-label') == 'Open navigation') {
      targetObject.ctaPosition = 'Hamburger';
      this.closest('.hambuger-menu').setAttribute('aria-label', 'Close navigation');
    } else {
      targetObject.ctaPosition = 'Top Menu Bar';
      this.closest('.hambuger-menu').setAttribute('aria-label', 'Open navigation');
    }
    hamburgerHandler();
  });
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  try {
    clickToBlurHeader();
  } catch (error) {
    // console.log(error)
  }
  try {
    clickToShowMobileNavDropDown();
  } catch (error) {
    // console.log(error)
  }

  // Last element with Image
  try {
    block.querySelector('.nav-sections') && (block.querySelector('.nav-sections').querySelector('ul').lastElementChild.querySelector('p').innerHTML = '<img src="/content/dam/piramalfinance/header-images/language-black.svg" alt="language" class="leveloneimg">');
  } catch (error) {
    console.warn(error);
  }
  try {
    block.querySelector('.nav-tools')?.addEventListener('click', (e) => {
      loignClick(e.target.innerText, targetObject.pageName);
      navlogin(targetObject.pageName);
    });
  } catch (error) {
    console.warn(error);
  }
}

// Custom Event
function toggleAllNavMobile(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });
}

function clickToBlurHeader() {
  const headerDropDownList = document.querySelectorAll('.header-wrapper .section.nav-sections .default-content-wrapper ul:first-child > .nav-drop');
  headerDropDownList.forEach((eachHeaderdrop) => {
    eachHeaderdrop.addEventListener('click', function (e) {
      const siblings = document.querySelectorAll('.header-wrapper .section.nav-sections .default-content-wrapper ul:first-child > li');
      siblings.forEach((li) => li.classList.remove('navigation-level-active'));
      if (this.getAttribute('aria-expanded') == 'true') {
        this.closest('.default-content-wrapper').classList.add('active');
        this.classList.add('navigation-level-active');
      } else {
        this.closest('.default-content-wrapper').classList.remove('active');
        this.classList.remove('navigation-level-active');
      }
    });
  });
}

function clickToShowMobileNavDropDown() {
  const clickDropDownList = document.querySelectorAll('#nav > div.section.mobile-view-header.page-container.code-container > div > div > div > div > ul > li');
  clickDropDownList.forEach((eachList) => {
    eachList.addEventListener('click', function (e) {
      const ulElement = eachList.querySelector('ul');
      if (ulElement.style.display === 'block') {
        ulElement.style.display = 'none';
        this.classList.remove('active');
      } else {
        ulElement.style.display = 'block';
        this.classList.add('active');
      }
    });
  });
}

function hamburgerHandler() {
  if (document.querySelector('.nav-hamburger').querySelector('[aria-label]').ariaLabel.toLowerCase() == 'close navigation') {
    document.querySelector('.section.mobile-view-header').style.display = 'block';
    document.querySelector('.section.mobile-view-header').classList.add('mobile-slide-navigation');
  } else if (document.querySelector('.nav-hamburger').querySelector('[aria-label]').ariaLabel.toLowerCase() == 'open navigation') {
    document.querySelector('.section.mobile-view-header').style.display = 'none';
    document.querySelector('.section.mobile-view-header').classList.remove('mobile-slide-navigation');
  }
}
