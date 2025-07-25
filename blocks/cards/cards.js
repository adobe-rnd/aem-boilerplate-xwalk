import { ctaClickInteraction } from '../../dl.js';
import { createOptimizedPicture } from '../../scripts/aem.js';
import { decoratePlaceholder } from '../../scripts/scripts.js';
import { moveInstrumentation } from '../../scripts/common.js';

export default async function decorate(block) {
  /* change to ul, li */
  block.innerHTML = await decoratePlaceholder(block);
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);

  try {
    if (block.closest('.section.ratings-card-wrapper')) {
      block.closest('.section.ratings-card-wrapper').querySelectorAll('a').forEach((eachAnchor) => {
        eachAnchor.addEventListener('click', (e) => {
          const data = {};
          data.click_text = e.target.textContent.trim();
          data.cta_position = e.target.closest('.section').querySelector('.default-content-wrapper').querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();
          ctaClickInteraction(data);
        });
      });
    }
  } catch (error) {
    console.warn(error);
  }
}
