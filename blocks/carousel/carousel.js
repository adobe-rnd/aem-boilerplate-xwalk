import { targetObject } from '../../scripts/scripts.js';
import { body, createCarousle } from '../../scripts/common.js';
import { applyLoanFormClick, formOpen } from '../applyloanform/applyloanforms.js';
import { buttonCLick } from '../applyloanform/loanformapi.js';
import { loanutmForm } from '../applyloanform/loanutm.js';
import { stateMasterApi, statemasterGetStatesApi } from '../applyloanform/statemasterapi.js';
import { validationJSFunc } from '../applyloanform/validation.js';
import { generateDetailedTeaserDOM } from '../detailed-teaser/detailed-teaser.js';
import { generateTeaserDOM } from '../teaser/teaser.js';
import gliderMin from './glider.js';

const carouselContainerMapping = {};
carouselContainerMapping['detailed-teaser'] = generateDetailedTeaserDOM;
carouselContainerMapping['ss-teaser'] = generateDetailedTeaserDOM;

// callback for touch based scrolling event
function updateButtons(entries) {
  entries.forEach((entry) => {
    // if panel has become > 60% visible
    if (entry.isIntersecting) {
      // get the buttons
      // const carouselButtons = entry.target.parentNode.parentNode.querySelector('.button-container');
      const carouselButtons = entry.target.parentNode.parentNode.lastChild;
      // remove selected state from whatever button has it
      [...carouselButtons.querySelectorAll(':scope button')].forEach((b) => b.classList.remove('selected'));
      // add selected state to proper button
      carouselButtons
        .querySelector(`:scope button[data-panel='${entry.target.dataset.panel}']`)
        .classList.add('selected');
    }
  });
}

// intersection observer for touch based scrolling detection
const observer = new IntersectionObserver(updateButtons, { threshold: 0.6, rootMargin: '500px 0px' });

export default function decorate(block) {
  try {
    if (window.location.pathname === '/personal-loan' && window.location.search && block.closest('.camp-btn')) {
      const a = block.querySelector('a');
      const mobA = document.querySelectorAll('.camp-btn')[1].querySelector('a');
      const url = new URL(a.href)
      a.href = (url.origin + url.pathname + window.location.search);
      mobA.href = (url.origin + url.pathname + window.location.search);
      // console.log(mobA, '/n', a);
    }
  } catch (error) {
    console.warn(error);
  }
  
  // the panels container
  const panelContainer = document.createElement('div');
  panelContainer.classList.add('panel-container', 'carousel-inner');
  panelContainer.id = 'carouselInner';

  // the buttons container
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  const slideNavButtons = document.createElement('div');
  slideNavButtons.classList.add('carousel-navigation-buttons');
  slideNavButtons.innerHTML = `
    <button type="button" class="slide-prev glider-prev" aria-label="${'Previous Slide'
    }">${block.children[0].outerHTML || '<'}</button>
    <button type="button" class="slide-next glider-next" aria-label="${'Next Slide'
    }">${block.children[1].outerHTML || '>'}</button>
  `;
  // block.appendChild(slideNavButtons);

  const carouselshowtype = block.children[2].innerText.trim() || 'primary';
  const rotatetype = block.children[3].innerText.trim() || 'rotate-off';
  const version = block.children[4].innerText.trim() || 'One';
  const configData = block.children[5].innerText.trim() || '';

  const isOldversion = targetObject.isMobile || version === 'One';
  // const isOldversion = false;
  const isrotate = rotatetype === 'rotate-on';
  block.classList.add(carouselshowtype, version);

  // get all children elements
  // const panels = [...block.children];
  const panels = Array.from(block.children).slice(6);

  // loop through all children blocks
  [...panels].forEach((panel, i) => {
    // generate the  panel
    const [imagebg, image, classList, ...rest] = panel.children;
    const bgColorCode = rest[rest.length - 2].textContent.trim();
    const bgLinearGradientColor = rest[rest.length - 1].textContent.trim();
    const classesText = classList.textContent.trim();
    const classes = (classesText ? classesText.split(',') : []).map((c) => c && c.trim()).filter((c) => !!c);
    let blockType = 'teaser';
    // const blockType = [...classes].includes('detailed-teaser') ? 'detailed-teaser' : 'teaser';
    // check if we have to render teaser or a detailed teaser
    // const teaserDOM =
    //   blockType === 'detailed-teaser'
    //     ? generateDetailedTeaserDOM([imagebg, image, ...rest], classes)
    //     : generateTeaserDOM([imagebg, image, ...rest], classes);
    let generateOtherComponent = null;
    classes.forEach((className) => {
      if (carouselContainerMapping[className]) {
        blockType = className;
        generateOtherComponent = carouselContainerMapping[className];
      }
    });
    generateOtherComponent = generateOtherComponent ? generateOtherComponent([imagebg, image, ...rest], classes) : generateTeaserDOM([imagebg, image, ...rest], classes);
    panel.textContent = '';
    panel.classList.add(blockType, 'block', 'carousel-item');
    classes.forEach((c) => panel.classList.add(c.trim()));
    panel.dataset.panel = `panel_${i}`;
    panel.append(generateOtherComponent);
    bgColorCode ? (panel.style.backgroundColor = bgColorCode) : "";
    bgLinearGradientColor ? (panel.style.backgroundImage = bgLinearGradientColor) : "";
    panelContainer.append(panel);

    if (panels.length > 1) {
      // generate the button
      const button = document.createElement('button');
      buttonContainer.append(button);
      button.title = `Slide ${i + 1}`;
      button.dataset.panel = `panel_${i}`;
      panels[i].classList.forEach((panelclass) => {
        if (!['teaser', 'block', 'carousel-item'].includes(panelclass)) {
          button.classList.add(panelclass);
        }
      });
      if (!i) button.classList.add('selected');

      if (version === 'Glider') {

      } else if (isOldversion) {
        observer.observe(panel);
      }

      // add event listener to button
      button.addEventListener('click', () => {
        panelContainer.scrollTo({ top: 0, left: panel.offsetLeft - panel.parentNode.offsetLeft, behavior: 'smooth' });
      });
    }
  });

  block.textContent = '';
  block.append(panelContainer);
  block.append(slideNavButtons);
  const slidePrev = block.querySelector('.slide-prev');
  const slideNext = block.querySelector('.slide-next');

  // /*
  if (version === 'Glider') {
    const configJson = JSON.parse(configData);
    // console.log(configJson);
    configJson.arrows = {};
    configJson.arrows.prev = slidePrev;
    configJson.arrows.next = slideNext;
    configJson.dots = buttonContainer;

    block.append(buttonContainer);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            new Glider(panelContainer, configJson);
          }
        });
      },
    );

    observer.observe(block);
  } else if (isOldversion) {
    function activePanelContainer(panel) {
      panelContainer.scrollTo({ top: 0, left: panel.offsetLeft - panel.parentNode.offsetLeft, behavior: 'smooth' });
    }
    function slidePrevEventHandler() {
      const actviveBtn = buttonContainer.querySelector('.selected');
      const activePanel = block.querySelector(`[data-panel=${actviveBtn.dataset.panel}]`);
      const panel = activePanel.previousElementSibling;
      if (panel) activePanelContainer(panel);
    }
    function slideNextEventHandler() {
      const actviveBtn = buttonContainer.querySelector('.selected');
      const activePanel = block.querySelector(`[data-panel=${actviveBtn.dataset.panel}]`);
      if (isrotate) {
        const panel = activePanel.nextElementSibling ? activePanel.nextElementSibling : block.querySelector('[data-panel');
        if (panel) activePanelContainer(panel);
      } else {
        const panel = activePanel.nextElementSibling;
        if (panel) {
          activePanelContainer(panel);
        } else {
          // slideNext.classList.add("disabled")
        }
      }
    }
    slidePrev?.addEventListener('click', (e) => {
      slidePrevEventHandler();
    });
    slideNext.addEventListener('click', (e) => {
      slideNextEventHandler();
    });

    /* try {
      document.querySelectorAll('.open-form-on-click') && document.querySelectorAll('.open-form-on-click .button-container').forEach(function (eachApplyFormClick) {
        eachApplyFormClick.addEventListener('click', async (e) => {
          statemasterGetStatesApi();
          validationJSFunc();
          formOpen();
          e.preventDefault();
        });
      });
    } catch (error) {
      console.warn(error);
    } */

    if (buttonContainer.children.length) {
      block.append(buttonContainer);
      isrotate && setInterval(() => {
        if ((body.style.overflowY != 'hidden')) {
          slideNextEventHandler();
        }
      }, 7000);
    }
  } else if (buttonContainer.children.length) {
    block.append(buttonContainer);
    createCarousle(block, slidePrev, slideNext);
  }
}
