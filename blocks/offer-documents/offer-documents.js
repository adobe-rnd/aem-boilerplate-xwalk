import { ctaClickInteraction } from '../../dl.js';
import { getProps } from '../../scripts/common.js';

export default function decorate(block) {
  const [mainTitle, title, subTitle, content, button, buttonURL, type, image] = getProps(block, {
    index: [3, 7],
  });

  if (type === 'secondary') {
    block.innerHTML = `
            <div class="richtext text boxContainer stakeholder-container popup-rich-text">
                <div  class="cmp-text">
                    <p>
                        <a href="${buttonURL}" target="_blank" rel="noopener noreferrer"> ${mainTitle}</a>
                    </p>
                </div>
            </div>    
        `;
    return;
  }
  block.innerHTML = `
            <div class="richtext text boxContainer stakeholder-container popup-rich-text modal-cta">
                <div  class="cmp-text">
                    <p>${image.outerHTML.includes('picture') ? image.outerHTML : mainTitle}</p>
                </div>
                <div class="stake-pop-up dp-none">
                    <div class="popup stake-document-popup">
                        <div class="text popupText">
                            <div class="cmp-text">
                                <div class="cpm-sub-text">
                                    <p><span class="title">${title}</span></p>
                                    <p><span class="description">${subTitle}</span></p>
                                    <p class="cross-container">
                                        <img src="/content/dam/piramalfinance/company/about-us/partnership/close.png" alt="close">
                                    </p>
                                </div>
                                <div class="popup-parent-cont">
                                    <div class="popupContainer">
                                        ${content.innerHTML}
                                        <p>
                                            <span class="popupbutton">
                                                <a href="${buttonURL}"
                                                    target="_blank">
                                                    ${button}
                                                </a>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
    `;

  block.querySelectorAll('.offer-documents.block .modal-cta >.cmp-text').forEach((blockCards) => {
    blockCards.addEventListener('click', function (e) {
      e.stopImmediatePropagation();

      /* lending Partners Modal Open Analytics Start */

      try {
        const data = {};
        data.click_text = this.querySelector('img').getAttribute('alt');
        data.cta_position = e.target.closest('.section').querySelector('.default-content-wrapper').querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();
        ctaClickInteraction(data);
      } catch (error) {
        console.warn(error);
      }

      /* lending Partners Modal Open Analytics End */

      e.target.closest('.cmp-text').classList.add('active');
      const targetModal = e.target.closest('.popup-rich-text').querySelector('.stake-pop-up');
      if (targetModal.classList.contains('dp-none')) {
        targetModal.classList.add('dp-block');
        document.body.style.overflow = 'hidden';
        targetModal.classList.remove('dp-none');
        document.querySelector('.modal-overlay').classList.add('overlay');
        document.querySelector('.modal-overlay').classList.remove('dp-none');
      } else {
        targetModal.classList.add('dp-none');
        targetModal.classList.remove('dp-block');
        document.body.removeChild(overlay);
        document.body.style.overflow = 'auto';
        document.querySelector('.modal-overlay').classList.remove('overlay');
        document.querySelector('.modal-overlay').classList.add('dp-none');
      }
      e.stopPropagation();
      if (e.target.classList.contains('cross-container')) {
        alert;
      }
    });
  });

  document.querySelectorAll('.stake-pop-up .text.popupText .cmp-text .cross-container img').forEach((ele) => {
    ele.addEventListener('click', function (currentEle) {
      /* lending Partners Modal Open Analytics Start */

      try {
        const data = {};
        data.click_text = this.closest('.offer-documents-wrapper').querySelector('.stake-pop-up .stake-document-popup .cpm-sub-text p').textContent.trim();
        data.cta_position = currentEle.target.closest('.section').querySelector('.default-content-wrapper').querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();
        ctaClickInteraction(data);
      } catch (error) {
        console.warn(error);
      }

      /* lending Partners Modal Open Analytics End */

      currentEle.stopImmediatePropagation();
      if (document.querySelector('.cmp-text.active')) document.querySelector('.cmp-text.active').classList.remove('active');
      currentEle.target.closest('.stake-pop-up').classList.remove('dp-block');
      currentEle.target.closest('.stake-pop-up').classList.add('dp-none');
      document.body.style.overflow = 'auto';
      document.querySelector('.modal-overlay').classList.remove('overlay');
      document.querySelector('.modal-overlay').classList.add('dp-none');
    });
  });
}

//     block.addEventListener("click", function (e) {
//         document.body.classList.add("popup-active");
//     });

//     document.querySelector(".cross-container").addEventListener("click", function (e) {
//         e.stopPropagation();
//         document.body.classList.remove("popup-active");
//     });
// }

// // Create and append the overlay to the body
// const overlay = document.createElement('div');
// overlay.className = 'overlay';
// document.body.appendChild(overlay);

// // Add click event to overlay to close the popup
// overlay.addEventListener('click', function () {
//     document.body.classList.remove('popup-active');
// });
