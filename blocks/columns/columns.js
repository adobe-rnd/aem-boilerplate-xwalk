import { decorateViewMore } from '../../scripts/common.js';
import { statemasterGetStatesApi } from '../applyloanform/statemasterapi.js';
import { validationJSFunc } from '../applyloanform/validation.js';
import { formOpen } from '../applyloanform/applyloanforms.js';

export default function decorate(block) {
  decorateViewMore(block);
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  try {
    openFormColumn(block);
  } catch (error) {
    console.warn(error);
  }
}

function openFormColumn(block) {
  const sectionBlock = block.closest('.section');
  if (sectionBlock.classList.contains('open-form-on-click-column')) {
    sectionBlock.querySelector('.open-form-on-click-column .columns-wrapper').querySelectorAll('.button-container').forEach((eachApplyFormClick) => {
      eachApplyFormClick.addEventListener('click', async (e) => {
        statemasterGetStatesApi();
        validationJSFunc();
        formOpen();
        e.preventDefault();
      });
    });
  }
}
