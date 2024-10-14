import { ctaClick } from '../../dl.js';
import { targetObject } from '../../scripts/scripts.js';

export function loanProductsAnalytics(block) {
  try {
    const loanProductsWrapper = block.closest('.loan-products-wrapper');
    const calculatorSectionWrapper = block.closest('.calculator-section-wrapper');
    const calculatorTryNowBtn = calculatorSectionWrapper && block.querySelector('.button-container-text');

    loanProductsWrapper && block.addEventListener('click', (e) => {
      const title = loanProductsWrapper.querySelector('.default-content-wrapper')?.innerText;
      ctaClick(e.target.innerText, title, title, targetObject.pageName);
    });
    calculatorTryNowBtn && calculatorTryNowBtn.addEventListener('click', (e) => {
      // e.stopImmediatePropagation();
      // console.log(e.target.innerText);
      // const title = calculatorSectionWrapper.querySelector(".default-content-wrapper h2")?.innerText;
      // const blockTitle = block.querySelector(".title")?.innerText;
      // ctaClick(e.target.innerText, blockTitle, title, targetObject.pageName);
    });
  } catch (error) {
    console.warn(error);
  }
}
