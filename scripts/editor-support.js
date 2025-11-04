import {
  decorateBlock,
  decorateBlocks,
  decorateButtons,
  decorateIcons,
  decorateSections,
  loadBlock,
  loadScript,
  loadSections,
} from './aem.js';
import { decorateRichtext } from './editor-support-rte.js';
import { decorateMain } from './scripts.js';

/* example hook to get the state of a block */
function getState(block) {
  // e.g store the currently selected slide before the update
}

/* example hook to set the state of a block */
function setState(block, state) {
  // e.g restore the previously selected slide on the updated carousel
}

function updateUEInstrumentation() {
  const main = document.querySelector('main');

  // update FAQ entry labels to show first 10 characters of the question
  main?.querySelectorAll('[data-aue-model="cub-teaser"]')?.forEach((teaser) => {
    const label = teaser.querySelector('[data-aue-prop="teaser_title"]')?.textContent.trim().slice(0, 10);
    if (label) {
      teaser.dataset.aueLabel = `Teaser: ${label} ...`;
    }

    // for demo purposes, only allow max 3 FAQ entries
    const numberOfFAQEntries = teaser.querySelectorAll('[data-aue-model="cub-teaser-faq"]').length || 0;
    if (numberOfFAQEntries >= 3) {
      teaser.dataset.aueFilter = 'empty';
    }
  });

  // update FAQ entry labels to show first 10 characters of the question
  main?.querySelectorAll('[data-aue-model="cub-teaser-faq"]')?.forEach((faqEntry) => {
    const label = faqEntry.firstElementChild.textContent.trim().slice(0, 10);
    if (label) {
      faqEntry.dataset.aueLabel = `FAQ: ${label}...`;
    }
  });
}

async function applyChanges(event) {
  // redecorate default content and blocks on patches (in the properties rail)
  const { detail } = event;

  const resource = detail?.request?.target?.resource // update, patch components
    || detail?.request?.target?.container?.resource // update, patch, add to sections
    || detail?.request?.to?.container?.resource; // move in sections
  if (!resource) return false;
  const updates = detail?.response?.updates;
  if (!updates.length) return false;
  const { content } = updates[0];
  if (!content) return false;

  // load dompurify
  await loadScript(`${window.hlx.codeBasePath}/scripts/dompurify.min.js`);

  const sanitizedContent = window.DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });
  const parsedUpdate = new DOMParser().parseFromString(sanitizedContent, 'text/html');
  const element = document.querySelector(`[data-aue-resource="${resource}"]`);

  if (element) {
    if (element.matches('main')) {
      const newMain = parsedUpdate.querySelector(`[data-aue-resource="${resource}"]`);
      newMain.style.display = 'none';
      element.insertAdjacentElement('afterend', newMain);
      decorateMain(newMain);
      decorateRichtext(newMain);
      await loadSections(newMain);
      element.remove();
      newMain.style.display = null;
      // eslint-disable-next-line no-use-before-define
      attachEventListners(newMain);
      return true;
    }

    const block = element.parentElement?.closest('.block[data-aue-resource]') || element?.closest('.block[data-aue-resource]');
    if (block) {
      const state = getState(block);
      const blockResource = block.getAttribute('data-aue-resource');
      const newBlock = parsedUpdate.querySelector(`[data-aue-resource="${blockResource}"]`);
      if (newBlock) {
        newBlock.style.display = 'none';
        block.insertAdjacentElement('afterend', newBlock);
        decorateButtons(newBlock);
        decorateIcons(newBlock);
        decorateBlock(newBlock);
        decorateRichtext(newBlock);
        await loadBlock(newBlock);
        block.remove();
        setState(newBlock, state);
        newBlock.style.display = null;
        return true;
      }
    } else {
      // sections and default content, may be multiple in the case of richtext
      const newElements = parsedUpdate.querySelectorAll(`[data-aue-resource="${resource}"],[data-richtext-resource="${resource}"]`);
      if (newElements.length) {
        const { parentElement } = element;
        if (element.matches('.section')) {
          const [newSection] = newElements;
          newSection.style.display = 'none';
          element.insertAdjacentElement('afterend', newSection);
          decorateButtons(newSection);
          decorateIcons(newSection);
          decorateRichtext(newSection);
          decorateSections(parentElement);
          decorateBlocks(parentElement);
          await loadSections(parentElement);
          element.remove();
          newSection.style.display = null;
        } else {
          element.replaceWith(...newElements);
          decorateButtons(parentElement);
          decorateIcons(parentElement);
          decorateRichtext(parentElement);
        }
        return true;
      }
    }
  }

  return false;
}

function handleSelection(event) {
  // get event details
  const { detail } = event;
  const resource = detail?.resource;

  if (resource) {
    // get the element that has that resource
    const element = document.querySelector(`[data-aue-resource="${resource}"]`);
    // if selected element is a FAQ item, make sure its open,
    //  so the question/answer are visible and editable
    if (element.dataset.aueModel === 'cub-teaser-faq') {
      element.classList.add('active');
    }
  }
}

function attachEventListners(main) {
  [
    'aue:content-patch',
    'aue:content-update',
    'aue:content-add',
    'aue:content-move',
    'aue:content-remove',
    'aue:content-copy',
  ].forEach((eventType) => main?.addEventListener(eventType, async (event) => {
    event.stopPropagation();
    const applied = await applyChanges(event);
    if (!applied) {
      window.location.reload();
    } else {
      updateUEInstrumentation();
    }
  }));

  // if a component is selected
  main?.addEventListener('aue:ui-select', handleSelection);
}

attachEventListners(document.querySelector('main'));

// decorate rich text
// this has to happen after decorateMain(), and everythime decorateBlocks() is called
decorateRichtext();
// in cases where the block decoration is not done in one synchronous iteration we need to listen
// for new richtext-instrumented elements. this happens for example when using experimentation.
const observer = new MutationObserver(() => decorateRichtext());
observer.observe(document, { attributeFilter: ['data-richtext-prop'], subtree: true });

// example hook: when entering edit mode ..
document.addEventListener('aue:ui-edit', () => {
  // e.g. stop animation of a carousel
});

// example hook: when entering preview mode ...
document.addEventListener('aue:ui-preview', () => {
  // e.g. restart animation of a carousel
});

// update the UE instrumentation on inital load
updateUEInstrumentation();
