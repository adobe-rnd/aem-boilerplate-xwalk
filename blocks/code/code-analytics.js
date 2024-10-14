import { headerInteraction } from '../../dl.js';
import { targetObject } from '../../scripts/scripts.js';

export function mobileHeaderAnalytics(block) {
  try {
    const mobileHeader = block.closest('.mobile-view-header');
    mobileHeader?.addEventListener('click', (e) => {
      const click_text = e.target.innerText;
      const menu_category = e.target.closest('ul')?.closest('li')?.querySelector('span')?.innerText;
      // console.log("click_text :: ", e.target.innerText);
      // console.log("menu_category :: ", e.target.closest("ul")?.closest("li")?.querySelector("span")?.innerText)
      // console.log(targetObject.ctaPosition);
      // console.log(targetObject.pageName);
      headerInteraction(click_text, menu_category, targetObject.ctaPosition, targetObject.pageName);
    });
  } catch (error) {
    console.warn(error);
  }
}
