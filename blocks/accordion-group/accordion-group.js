import { ctaClick, ctaClickInteraction, documentRequiredInteraction, faqInteraction } from '../../dl.js';
import { fetchPlaceholders } from '../../scripts/aem.js';
import { targetObject } from '../../scripts/scripts.js';
import { documentRequired, generateAccordionDOM } from '../accordion/accordion.js';

const faqQA = [];
export default async function decorate(block) {
  const resp = await fetchPlaceholders();
  // each row is an accordion entry
  const accordions = [...block.children];

  // loop through all accordion blocks
  [...accordions].forEach((accordion) => {
    // generate the accordion
    const accordionDOM = generateAccordionDOM(accordion);
    // empty the content ,keep root element with UE instrumentation
    accordion.textContent = '';
    // add block classes
    accordion.classList.add('accordion', 'block');
    accordion.append(accordionDOM);

    if (accordion.closest('.section.faq-section-wrapper')) {
      let faqQuestion = accordion?.querySelector("summary >div >p")?.textContent?.trim()|| "";
      let faqAnsText = accordion?.querySelector("details >div")?.textContent?.trim() || "";
      let faqAns= faqAnsText?.replace(/\s+/g, ' ')?.trim()?.replace(/\n/g, ' ') || "";
      faqQA.push({
        "@type": "Question",
        "name": faqQuestion,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faqAns
        }
      })
    }

    try {
      mediaLiClickAnalytics(accordionDOM);
    } catch (error) {
      console.warn(error);
    }
  });
  // if (block.closest('.section.faq-section-wrapper')) {
  //   faqSchemaQA(faqQA);
  // }
  // use same styling as shade-box from /docs
  block.classList.add('shade-box');
  try {
    openFunctionFAQ(block);
    block.closest('.faq-view-more-logic') ? viewMoreLogicFAQ() : '';
    if (document.querySelector('.documents-required-brown')) {
      documentRequired();
    }
  } catch (error) {
    console.warn(error);
  }
}

function openFunctionFAQ(block) {
  const titles = block.querySelectorAll('details summary');

  titles.forEach((title) => {
    title.addEventListener('click', function (e) {
      if (this.classList.contains('active')) {
        setTimeout(() => {
          this.closest('details').removeAttribute('open');
        });
        this.classList.remove('active');
      } else {
        titles.forEach((title) => {
          title.closest('details').removeAttribute('open');
          title.classList.remove('active');
        });

        /*  FAQ Analytics Start */
        try {
          const dataAnalytics = {};
          if (title.closest('.documents-required-brown')) {
            dataAnalytics.click_text = title.querySelector('h3').textContent.trim();
            documentRequiredInteraction(dataAnalytics);
            const click_text = title.querySelector('h3').textContent.trim();
            const cta_position = '';
            const cta_category = title.closest('.section').querySelector('.default-content-wrapper').querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();
            ctaClick(click_text, cta_category, cta_position, targetObject.pageName);
          } else {
            dataAnalytics.click_text = title.textContent.trim();
            faqInteraction(dataAnalytics);
          }
        } catch (error) {
          console.warn(error);
        }
        /*  FAQ Analytics End */

        this.classList.toggle('active');
      }
    });
  });
}

function viewMoreLogicFAQ() {
  document.querySelectorAll('.faq-section-wrapper.faq-view-more-logic').forEach((each) => {
    const allFAQSection = each.querySelectorAll('.accordion.block');

    allFAQSection.forEach((eachFAQ, index) => {
      if (index == 5) {
        eachFAQ.classList.add('faq-blur');
      }
      eachFAQ.classList.toggle('dp-none', index > 5);
    });

    const buttonContainer = each.querySelector('.button-container');
    if (buttonContainer) {
      const buttonText = buttonContainer.querySelector('a').textContent.trim();
      buttonContainer.innerHTML = buttonText;
      viewMoreFAQ(each);
    }
  });
}
function viewMoreFAQ(eachs) {
  const faqButtonContainer = eachs.querySelector('.faq-section-wrapper .button-container');
  faqButtonContainer.addEventListener('click', function () {
    try {
      const data = {};
      data.click_text = this.textContent.trim();
      data.cta_position = this.closest('.section').querySelector('.default-content-wrapper').querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();
      ctaClickInteraction(data);
    } catch (error) {
      console.warn(error);
    }

    const isViewMoreFAQ = this.textContent.toLowerCase() === 'view more';
    this.innerText = isViewMoreFAQ ? 'View Less' : 'View More';

    eachs.querySelectorAll('.accordion.block').forEach((eachFAQ, index) => {
      if (index == 5) {
        const checkBlurClass = eachFAQ.classList.contains('faq-blur');
        checkBlurClass ? eachFAQ.classList.remove('faq-blur') : eachFAQ.classList.add('faq-blur');
      }
      eachFAQ.classList.toggle('dp-none', !isViewMoreFAQ && index > 5);
    });
  });
}

function mediaLiClickAnalytics(accordionDOM) {
  accordionDOM.querySelectorAll('ul > li > a').forEach((eachHref) => {
    eachHref.addEventListener('click', function () {
      const data = {};
      data.click_text = this.textContent.trim();
      data.cta_position = this.closest('.accordion').querySelector('summary').textContent.trim();
      ctaClickInteraction(data);
    });
  });
}


function faqSchemaQA(faqQA) {
  let faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqQA
  }
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(faqSchema) || "";
  document.head.append(script);
}