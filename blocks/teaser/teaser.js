import {
  applyLoanNow, bannerClick, ctaClick, ctaClickInteraction, readMoreInteraction,
} from '../../dl.js';
import { getMetadata } from '../../scripts/aem.js';
import { targetObject } from '../../scripts/scripts.js';

import { handleOpenFormOnClick } from '../applyloanform/applyloanforms.js';

export function decorateButtons(...buttons) {
  return buttons
    .map((div) => {
      const a = div.querySelector('a');
      if (a) {
        a.classList.add('button');
        if (a.parentElement.tagName === 'EM') a.classList.add('secondary');
        if (a.parentElement.tagName === 'STRONG') a.classList.add('primary');
        return a.outerHTML;
      }
      return '';
    })
    .join('');
}
function createAnchor(element) {
  const a = document.createElement('a');
  a.href = element.innerText.trim();
  return a;
}
export function generateTeaserDOM(props, classes) {
  // Extract properties, always same order as in model, empty string if not set
  const nullDom = document.createElement('a');
  nullDom.classList.add('null-dom');
  const [
    pictureBgContainer,
    pictureContainer,
    eyebrow,
    title,
    longDescr,
    shortDescr,
    firstCta,
    secondCta,
    ctaImage,
    ctaImageAlt,
    ctaImageUrl,
    imageText,
    ctaImage2,
    ctaImageAlt2,
    ctaImageUrl2,
    imageText2,
    ctaImage3,
    ctaImageAlt3,
    ctaImageUrl3,
    imageText3,
    mobileImage,
  ] = props;

  const bgPicture = pictureBgContainer.querySelector('picture');
  const picture = pictureContainer.querySelector('picture');
  const hasShortDescr = shortDescr.textContent.trim() !== '';
  // Build DOM
  const ctaImageAnchor = ctaImageUrl.querySelector('a') || createAnchor(ctaImageUrl);
  const ctaImageAnchor2 = ctaImageUrl2.querySelector('a') || createAnchor(ctaImageUrl2);
  const ctaImageAnchor3 = ctaImageUrl3.querySelector('a') || createAnchor(ctaImageUrl3);
  ctaImageAnchor.innerHTML = ctaImage.innerHTML;
  ctaImageAnchor2.innerHTML = ctaImage2.innerHTML;
  ctaImageAnchor3.innerHTML = ctaImage3.innerHTML;
  // const bgPictureStyle = bgPicture?.querySelector("img")?.src || '';
  let bgPictureStyle;
  if ([...classes].includes("original-img")) {
    bgPictureStyle = bgPicture?.querySelector('img')?.src && bgPicture?.querySelector('img').src ? ` style='background-image:url(${bgPicture?.querySelector('img').src.split("?")[0]})' ` : '';
  }
  else {
    bgPictureStyle = bgPicture?.querySelector('img')?.src && bgPicture?.querySelector('img').src ? ` style='background-image:url(${bgPicture?.querySelector('img').src})' ` : '';
  }
  // const bgPictureStyle = bgPicture?.querySelector('img')?.src && bgPicture?.querySelector('img').src ? ` style='background-image:url(${bgPicture?.querySelector('img').src})' ` : '';
  const mobileImageStyle = mobileImage?.querySelector('img')?.src ? ` style='background-image:url(${mobileImage?.querySelector('img')?.src})' ` : '';
  let bgImageAllow = bgPictureStyle;
  if (targetObject.isTab) {
    bgImageAllow = mobileImageStyle;
  }

  const teaserDOM = document.createRange().createContextualFragment(
    // <div class='background' style='background-image:url(${bgImageAllow})'>
    `
    <div class='background' ${bgImageAllow}'>
      <div class="front-picture">${picture ? picture.outerHTML : ''}</div>
      <div class='foreground'>
        <div class='text'>
          ${eyebrow.textContent.trim() !== ''
      ? `<div class='eyebrow'>${eyebrow.textContent.trim()}</div>`
      : ''
    }
          <div class='title'>${title.innerHTML}</div>
          <div class='long-description'>${longDescr.innerHTML}</div>
          <!-- <div class='short-description'>${hasShortDescr ? shortDescr.innerHTML : longDescr.innerHTML
    }</div>-->
          <div class='short-description'>${shortDescr.innerHTML}</div>
          <div class='cta-image-wrapper'>
            <div class="img-with-text-wrap">
              <div class="cta-image">${ctaImageAnchor ? ctaImageAnchor.outerHTML : ''
    }</div>
              <p class="cta-text">${imageText.innerText}</p>
            </div>
            <div class="img-with-text-wrap">
              <div class="cta-image">${ctaImageAnchor2 ? ctaImageAnchor2.outerHTML : ''
    }</div>
              <p class="cta-text">${imageText2.innerText}</p>
            </div>
            <div class="img-with-text-wrap">
              <div class="cta-image">${ctaImageAnchor3 ? ctaImageAnchor3.outerHTML : ''
    }</div>
              <p class="cta-text">${imageText3.innerText}</p>
            </div>
          </div>
          <div class='cta'>${decorateButtons(firstCta, secondCta)}</div>
        </div>
        <div class='spacer'></div>
      </div>
  `,

  );

  // set the mobile background color
  const backgroundColor = [...classes].find((cls) => cls.startsWith('bg-'));
  if (backgroundColor) {
    teaserDOM
      .querySelector('.foreground')
      .style.setProperty(
        '--teaser-background-color',
        `var(--${backgroundColor.substr(3)})`,
      );
  }

  teaserDOM?.querySelectorAll('a').forEach((el, index) => {
    el.addEventListener('click', function (e) {
      try {
        if (!e.target.closest('.calc-desktop-carousel-wrapper')) {
          if (!e.target.closest(".multi-calc-teaser-wrapper")) {
            if (index || e.target.closest('.cta')) {
              bannerClick(e.target.innerText, targetObject.pageName);
            }
          }
          if (e.target.closest(".multi-calc-teaser-wrapper")) {
            const click_text = e.target.textContent.trim();
            const cta_position = '';
            const cta_category = e.target.closest('.foreground').querySelector('.long-description').querySelector('p').textContent.trim()
            ctaClick(click_text, cta_category, cta_position, targetObject.pageName);
          }
          if (e.target.closest('.open-form-on-click')) {
            const formClickSection = e.target.closest('.open-form-on-click');
            handleOpenFormOnClick(formClickSection);
          }
        } else if (this.closest('.carousel-articles-wrapper')) {
          readMoreAnalytics(e);
        } else if (this.closest('.csr-committee-wrapper')) {
          csrfReportAnalytics(e);
        } else if (e.target.closest('.media-cards-wrapper')) {
          const data = {};
          data.click_text = e.target.closest('.long-description').querySelector('p').textContent.trim();
          data.cta_position = e.target.closest('.section').querySelector('.tab-name-wrapper .carousel-inner .active').textContent.trim();
          ctaClickInteraction(data);
        } else if (e.target.closest('.calc-desktop-carousel-wrapper')) {
          const data = {};
          data.click_text = e.target.closest('.text').querySelector('.long-description p').textContent.trim();
          data.cta_position = e.target.closest('.section').querySelector('.default-content-wrapper').textContent.trim();
          ctaClickInteraction(data);
        } else {
          applyLoanNow(
            `${eyebrow.textContent.trim()} ${title.textContent.trim()}`,
            targetObject.pageName,
            'banner',
            targetObject.pageName,
          );
        }
      } catch (error) {
        console.warn(error);
      }
    });
  });
  try {
    const checkClass = [...classes];
    if (checkClass?.includes('click-able')) {
      teaserDOM.children[0].addEventListener('click', function (e) {
        /* About Us Comapny Analytics Start */
        try {
          if (this.closest('.section.board-of-directors-wrapper')) {
            const data = {};
            data.click_text = this.querySelector('.title').textContent.trim();
            data.cta_position = this.closest('.section').querySelector('.default-content-wrapper').querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();
            ctaClickInteraction(data);
          }
        } catch (error) {
          console.warn(error);
        }
        /* About Us Comapny Analytics End */

        location.href = getMetadata('lang-path') + firstCta.innerText;
      });
    }
  } catch (error) {
  }
  // add final teaser DOM and classes if used as child component
  return teaserDOM;
}

export default function decorate(block) {
  // get the first and only cell from each row
  const props = [...block.children].map((row) => row.firstElementChild);
  const teaserDOM = generateTeaserDOM(props, block.classList);
  block.textContent = '';
  block.append(teaserDOM);
}

function readMoreAnalytics(e) {
  const data = {};
  data.article_name = e?.target.getAttribute('href').split('/').pop();
  data.cta_position = e?.target.closest('.section').querySelector('.default-content-wrapper').querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();
  data.click_header = e?.target.textContent.trim();
  readMoreInteraction(data);
}

function csrfReportAnalytics(e) {
  const data = {};
  data.click_text = e.target.textContent.trim();
  data.cta_position = e.target.closest('.section').querySelector('.default-content-wrapper').querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();
  ctaClickInteraction(data);
}
