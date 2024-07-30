import { footerInteraction } from '../../dl.js';
import { getMetadata } from '../../scripts/aem.js';
import { targetObject } from '../../scripts/scripts.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
  try {
    block.querySelectorAll("li,p").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.stopPropagation();
        if (e.target.closest(".footer-section-first") || e.target.closest(".footer-section-second")) {
          //console.log("click_text :: ", e.target.innerText);
          //console.log("menu_category :: ", e.target.closest("ul")?.closest("li")?.querySelector("p")?.innerText);
          try {
            const click_text = e.target.innerText
            const menu_category = e.target.closest("ul")?.closest("li")?.querySelector("p")?.innerText
            footerInteraction(click_text, menu_category, null, targetObject.pageName);
          } catch (error) {
            console.warn(error);
          }
        }
      })
    });
    
    if(block.closest('body').querySelector('.mobile-sticky-button')){
      block.querySelector('.footer-last-wrapper').classList.add('padding-bottom-footer')
    } 

  } catch (error) {
    console.warn(error);
  }
}
