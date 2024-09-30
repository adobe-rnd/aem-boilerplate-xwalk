// import { createTag } from '../../scripts/scripts.js';

/**
 * Helper function to create DOM elements
 * @param {string} tag DOM element to be created
 * @param {array} attributes attributes to be added
 */
function createTag(tag, attributes, html) {
    const el = document.createElement(tag);
    if (html) {
      if (html instanceof HTMLElement || html instanceof SVGElement) {
        el.append(html);
      } else {
        el.insertAdjacentHTML('beforeend', html);
      }
    }
    if (attributes) {
      Object.entries(attributes).forEach(([key, val]) => {
        el.setAttribute(key, val);
      });
    }
    return el;
  }

function changeTabs(e) {
  const { target } = e;
  const tabMenu = target.parentNode;
  const tabContent = tabMenu.nextElementSibling;

  tabMenu.querySelectorAll('[aria-selected="true"]').forEach((t) => t.setAttribute('aria-selected', false));

  target.setAttribute('aria-selected', true);

  tabContent.querySelectorAll('[role="tabpanel"]').forEach((p) => p.classList.remove('active'));

  tabContent.parentNode.querySelector(`#${target.getAttribute('aria-controls')}`).classList.add('active');
}

function initTabs(block) {
  const tabs = block.querySelectorAll('[role="tab"]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabs);
  });
}

let initCount = 0;
export default function decorate(block) {
  const tabList = createTag('div', { class: 'tab-list', role: 'tablist' });
  const tabContent = createTag('div', { class: 'tab-content' });

  const tabNames = [];
  const tabContents = [];
  // list of Universal Editor instrumented 'tab content' divs
  const tabInstrumentedDiv = [];

  [...block.children].forEach((child) => {
    // keep the div that has been instrumented for UE
    tabInstrumentedDiv.push(child);

    [...child.children].forEach((el, index) => {
      if (index === 0) {
        tabNames.push(el.textContent.trim());
      } else {
        tabContents.push(el.childNodes);
      }
    });
  });

  tabNames.forEach((name, i) => {
    const tabBtnAttributes = {
      role: 'tab',
      class: 'tab-title',
      id: `tab-${initCount}-${i}`,
      tabindex: i > 0 ? '0' : '-1',
      'aria-selected': i === 0 ? 'true' : 'false',
      'aria-controls': `tab-panel-${initCount}-${i}`,
      'aria-label': name,
      'data-tab-id': i,
    };

    const tabNameDiv = createTag('button', tabBtnAttributes);
    tabNameDiv.textContent = name;
    tabList.appendChild(tabNameDiv);
  });

  tabContents.forEach((content, i) => {
    const tabContentAttributes = {
      id: `tab-panel-${initCount}-${i}`,
      role: 'tabpanel',
      class: 'tabpanel',
      tabindex: '0',
      'aria-labelledby': `tab-${initCount}-${i}`,
    };

    // get the instrumented div
    const tabContentDiv = tabInstrumentedDiv[i];
    // add all additional attributes
    Object.entries(tabContentAttributes).forEach(([key, val]) => {
      tabContentDiv.setAttribute(key, val);
    });

    // default first tab is active
    if (i === 0) tabContentDiv.classList.add('active');
    tabContentDiv.replaceChildren(...Array.from(content));
    tabContent.appendChild(tabContentDiv);
  });

  // Replace the existing content with the new tab list and tab content
  block.innerHTML = ''; // Clear the existing content
  block.appendChild(tabList);
  block.appendChild(tabContent);

  initTabs(block);
  initCount += 1;
}
