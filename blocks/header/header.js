import { headerInteraction, navlogin } from '../../dl.js';
import { autoLinkLangPath, fetchPlaceholders, getMetadata } from '../../scripts/aem.js';
import { body, targetObject } from '../../scripts/scripts.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 1201px)');

/**
 *
 * @param {Element} navSection
 */
const wrapListUE = (navSection) => {
  const p = document.createElement('p');
  if (!window.isEditor) return;
  if (navSection.firstElementChild.tagName !== 'P') {
    p.append(...[...navSection.childNodes].filter((n) => n.tagName !== 'UL'));
    navSection.prepend(p);
  }
  navSection.querySelectorAll(':scope > ul > li:not(:has( > a))').forEach((subSection) => {
    const icon = subSection.firstChild;
    const text = subSection.firstChild.nextSibling;
    const p2 = document.createElement('p');
    if (subSection.childNodes.length === 3) {
      p2.append(icon, text);
      subSection.prepend(p2);
    } else if (
      subSection.lastElementChild
            && subSection.lastElementChild.tagName !== 'UL'
            && subSection.lastElementChild.tagName !== 'P'
    ) {
      p2.append(...subSection.childNodes);
      subSection.prepend(p2);
    } else if (subSection.lastElementChild && subSection.lastElementChild.tagName === 'UL') {
      p2.append(...[...subSection.childNodes].filter((n) => n.tagName !== 'UL'));
      subSection.prepend(p2);
    }
  });
  // }else{
  //   p.append(...subSection.childNodes);
  //   navSection.prepend(p2);
  // }
};

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
  sections
    ?.querySelectorAll('.nav-sections .default-content-wrapper > ul > li')
    .forEach((section) => {
      // section.classList.toggle('active');
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
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = expanded || isDesktop.matches ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections?.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops?.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
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

function getDirectTextContent(menuItem) {
  const menuLink = menuItem.querySelector(':scope > :where(a,p)');
  if (menuLink) {
    return menuLink.textContent.trim();
  }
  return Array.from(menuItem.childNodes)
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .map((n) => n.textContent)
    .join(' ');
}

async function buildBreadcrumbsFromNavTree(nav, currentUrl) {
  const crumbs = [];

  const homeUrl = document.querySelector('.nav-brand a').href;

  let menuItem = Array.from(nav.querySelectorAll('a')).find((a) => a.href === currentUrl);
  if (menuItem) {
    do {
      const link = menuItem.querySelector(':scope > a');
      crumbs.unshift({ title: getDirectTextContent(menuItem), url: link ? link.href : null });
      menuItem = menuItem.closest('ul')?.closest('li');
    } while (menuItem);
  } else if (currentUrl !== homeUrl) {
    crumbs.unshift({ title: getMetadata('og:title'), url: currentUrl });
  }

  const placeholders = await fetchPlaceholders();
  const homePlaceholder = placeholders.breadcrumbsHomeLabel || 'Home';

  crumbs.unshift({ title: homePlaceholder, url: homeUrl });

  // last link is current page and should not be linked
  if (crumbs.length > 1) {
    crumbs[crumbs.length - 1].url = null;
  }
  crumbs[crumbs.length - 1]['aria-current'] = 'page';
  return crumbs;
}

async function buildBreadcrumbs() {
  const breadcrumbs = document.createElement('nav');
  breadcrumbs.className = 'breadcrumbs';

  const crumbs = await buildBreadcrumbsFromNavTree(
    document.querySelector('.nav-sections'),
    document.location.href,
  );

  const ol = document.createElement('ol');
  ol.append(
    ...crumbs.map((item) => {
      const li = document.createElement('li');
      if (item['aria-current']) li.setAttribute('aria-current', item['aria-current']);
      if (item.url) {
        const a = document.createElement('a');
        a.href = item.url;
        a.textContent = item.title;
        li.append(a);
      } else {
        li.textContent = item.title;
      }
      return li;
    }),
  );

  breadcrumbs.append(ol);
  return breadcrumbs;
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const path = getMetadata('nav') || '/nav';
  const fragment = await loadFragment(path);
  block.classList.add('dp-none');
  // decorate nav DOM
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);
  if (path.includes('/neeyat/')) {
    block.classList.remove('header');
    block.classList.add('header-neeyat-nav');
    // return block;
  }

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');

  const a = document.createElement('a');
  const image = navBrand.querySelector('picture');
  a.append(image);
  a.setAttribute('href', '/');
  navBrand.append(a);
  autoLinkLangPath(a);
  navBrand.replaceChild(a, navBrand.firstElementChild);
  let loginFlag = true;
  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    let loginNav = navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').length - 1;
    loginNav = navSections.querySelectorAll(':scope .default-content-wrapper > ul > li')[loginNav];
    loginNav.addEventListener('click', (e) => {
      navlogin(targetObject.pageName);
      loginFlag = false;
    });
    navSections
      .querySelectorAll(':scope .default-content-wrapper > ul > li')
      .forEach((navSection) => {
        wrapListUE(navSection);
        if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
        navSection.addEventListener('click', (e) => {
          if (isDesktop.matches) {
            if (loginFlag) {
              try {
                let click_text = '';
                if (e.target.tagName == 'IMG' || e.target.querySelector('icon-language')) {
                  click_text = e.target.getAttribute('data-icon-name');
                } else {
                  click_text = e.target.textContent.trim();
                }
                const menu_category = e.target.closest('ul').closest('li')?.querySelector('p')?.innerText || '';
                targetObject.ctaPosition = 'Top Menu Bar';
                headerInteraction(click_text, menu_category, targetObject.ctaPosition, targetObject.pageName);
              } catch (error) {
                console.warn(error);
              }
            }
            loginFlag = true;
            const expanded = navSection.getAttribute('aria-expanded') === 'true';
            toggleAllNavSections(navSections);
            if (navSection.classList.contains('nav-drop')) {
              navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
              navSections.setAttribute('aria-expanded', expanded ? 'false' : 'true');
              if (expanded) {
                body.classList.remove('modal-open');
              } else {
                body.classList.add('modal-open');
              }
            } else {
              body.classList.remove('modal-open');
              navSection.setAttribute('aria-expanded', 'false');
              navSections.setAttribute('aria-expanded', 'false');
            }
          }
        });
      });
    navSections.querySelectorAll('.button-container').forEach((buttonContainer) => {
      buttonContainer.classList.remove('button-container');
      buttonContainer.querySelector('.button').classList.remove('button');
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  let mobFragment = null;
  hamburger.addEventListener('click', async (e) => {
    if (!mobFragment) {
      mobFragment = await loadFragment(getMetadata('mobilenav'));
      const mobNav = mobFragment.querySelector('.default-content-wrapper');
      mobNav.classList.add('desk-dp-none');
      navBrand.prepend(mobNav);
      // navSections.prepend(mobFragment.lastElementChild.lastElementChild);
      mobNav.querySelectorAll(':scope > ul > li').forEach((navSection) => {
        wrapListUE(navSection);
      });
      mobNav.querySelectorAll('ul ul').forEach((el) => {
        el.querySelectorAll('ul p').forEach((elem) => {
          elem.addEventListener('click', (e) => {
            try {
              const click_text = e.target.textContent.trim();
              const menu_category = e.target.closest('li ul').parentNode.querySelector('p').textContent.trim();
              targetObject.ctaPosition = 'Hamburger';
              headerInteraction(click_text, menu_category, targetObject.ctaPosition, targetObject.pageName);
            } catch (error) {
              console.warn(error);
            }
          });
        });
        el.querySelectorAll('ul').forEach((ele) => {
          ele.setAttribute('aria-expanded', 'false');
          ele.parentElement.querySelector('p').addEventListener('click', (e) => {
            const expanded = ele.getAttribute('aria-expanded') === 'true';
            if (!expanded) {
              ele.style.maxHeight = `${ele.scrollHeight}px`;
            } else {
              ele.style.maxHeight = '0px';
            }
            ele.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            ele.parentElement.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            ele.parentElement.querySelector('p').classList.toggle('navlist-dropdown');
            ele.querySelectorAll('ul > li > a').forEach((eachHref) => {
              eachHref.addEventListener('click', (e) => {
                try {
                  const click_text = e.target.textContent.trim();
                  const menu_category = e.target?.closest('ul')?.parentNode?.querySelector('.navlist-dropdown')?.textContent.trim() || '';
                  targetObject.ctaPosition = 'Hamburger';
                  headerInteraction(click_text, menu_category, targetObject.ctaPosition, targetObject.pageName);
                } catch (error) {
                  console.warn(error);
                }
              });
            });
          });
        });
      });
    }
    toggleMenu(nav, navSections);
  });
  nav.prepend(hamburger);

  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  if (getMetadata('breadcrumbs').toLowerCase() === 'true') {
    navWrapper.append(await buildBreadcrumbs());
  }
  const mobileSections = document.querySelector('.nav-sections .default-content-wrapper');
  const mobileLogo = a.cloneNode(true);
  mobileLogo.classList.add('mobile-logo');
  mobileSections?.prepend(mobileLogo);
  block.classList.remove('dp-none');
}
