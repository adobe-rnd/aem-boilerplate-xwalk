import { ctaClick, ctaClickInteraction } from '../../dl.js';
import { autoLinkLangPath } from '../../scripts/aem.js';
import { renderHelper, targetObject } from '../../scripts/scripts.js';
import { loanProductsAnalytics } from './teaserv2-analytics.js';

export default async function decorate(block) {
  const props = Array.from(block.children, (row) => row.firstElementChild);
  const renderTeaserHTML = renderTeaserHTMLFactory(props, block);
  block.innerHTML = '';
  block.append(renderTeaserHTML);
  loanProductsAnalytics(block);
  if (block.closest('.section.neeyat-banner')) {
    block.querySelector('a').target = '_blank';
  }

  // Analytics
  try {
    if (block.closest('.support-contact-us-wrapper')) {
      block.querySelector('a').getAttribute('href')
        && block.querySelector('a').addEventListener('click', (e) => {
          const data = {};
          data.click_text = e.target.textContent.trim();
          data.cta_position = 'Redirection';
          ctaClickInteraction(data);
        });
    }
  } catch (error) {
    console.warn(error);
  }
  if (block.closest('.calculator-section-wrapper')) {
    const bgImg = block.querySelector('a');
    const tryBTN = bgImg.querySelector('.button-container-text');
    let isCurrentTarget;
    tryBTN.addEventListener('click', (e) => {
      isCurrentTarget = e.currentTarget.textContent.trim().toLowerCase();
      const title = e.target.closest('.calculator-section-wrapper').querySelector('.default-content-wrapper h2')?.innerText;
      const blockTitle = e.target.closest('.calculator-section-wrapper .block').querySelector('.title')?.innerText;
      const clicktext = e.target.closest('.calculator-section-wrapper ').querySelector('a .button-container-text')?.textContent.trim();
      ctaClick(clicktext, blockTitle, title, targetObject.pageName);
    });
    bgImg.addEventListener('click', (e) => {
      if (!(isCurrentTarget == 'try now')) {
        const title = e.target.closest('.calculator-section-wrapper').querySelector('.default-content-wrapper h2')?.innerText;
        const blockTitle = e.target.closest('.calculator-section-wrapper .block').querySelector('.title')?.innerText;
        const clicktext = e.target.closest('.calculator-section-wrapper ').querySelector('a .button-container-text')?.textContent.trim();
        ctaClick(clicktext, blockTitle, title, targetObject.pageName);
      }
    });
  }
}

export function renderTeaserHTMLFactory(props, block) {
  const isDesktop = window.matchMedia('(min-width: 768px)');
  const isMobile = window.matchMedia('(max-width: 767px)');

  const [mainHref, bgImage, frontImage, title, description, mobileDescription, button, buttonHref, bgColor, teaserv2Attr, textwithinnerhtml, mobileImg] = props;

  const createElement = (tag, className, content) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content || '';
    return element;
  };

  const mainLink = mainHref?.textContent.trim() || '';
  const container = document.createElement('a');
  container.href = mainLink ||  'javascript:void(0)';

  let bgImageSrc = bgImage?.querySelector('picture > img')?.src || '';
  let mobileSrc = mobileImg?.querySelector('picture > img')?.src || '';
  const bgBannerColor = bgColor?.textContent.trim()?.src || '';
  const bgImageDiv = createElement('div', 'bg-image');

  if (block?.closest('.section').classList.contains('corporate-financing-banner-wrapper')) {
    if (isDesktop.matches) {
      bgImageSrc = bgImageSrc.split('?')[0];
    } else if (isMobile.matches) {
      mobileSrc = mobileSrc.split('?')[0];
    }
  }

  if (isDesktop.matches) {
    if (bgImageSrc) bgImageDiv.style.backgroundImage = `url(${bgImageSrc})`;
  } else if (isMobile.matches) {
    if (mobileSrc) bgImageDiv.style.backgroundImage = `url(${mobileSrc})`;
  }

  if (bgBannerColor) bgImageDiv.style.backgroundColor = bgBannerColor;

  const frontImagePic = frontImage?.querySelector('picture');
  const frontImageDiv = createElement('div', 'front-image');
  if (frontImagePic) frontImageDiv.append(frontImagePic);

  const titleDiv = createElement('div', 'title', title?.textContent.trim() || '');
  const descriptionDiv = createElement('div', 'description', description?.textContent.trim() || '');

  let newButtonTag = '';
  const buttonHrefAnchor = buttonHref?.querySelector('a') || '';
  if (buttonHrefAnchor) {
    buttonHrefAnchor.innerText = button?.textContent.trim() || '';
    newButtonTag = buttonHrefAnchor.outerHTML;
  } else if (button) {
    newButtonTag = createElement('div', 'button-container-text', button?.textContent.trim() || '');
  }

  const textwithDiv = document.createElement('div');
  textwithDiv.innerHTML = textwithinnerhtml?.innerHTML || '';
  textwithDiv.classList.add('rte-text-description');

  bgImageDiv.append(frontImageDiv, titleDiv, descriptionDiv, newButtonTag, textwithDiv);

  const teaserv2AttrGet = teaserv2Attr?.textContent?.trim() || '';
  teaserv2Attr.closest('.teaserv2-wrapper')?.setAttribute('data-teaserv2-xf', teaserv2AttrGet);

  if (container.tagName === 'A') {
    container.append(bgImageDiv);
    autoLinkLangPath(container);
  }

  /* if (container.tagName === "A" && container.href !== '') {
    container.append(bgImageDiv);
    return container;
  }else{
    return bgImageDiv;
  } */

  return container;
}
