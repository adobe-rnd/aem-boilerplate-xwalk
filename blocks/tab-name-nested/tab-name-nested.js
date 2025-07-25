import { createButton, createCarousle, getProps } from '../../scripts/common.js';
import { generateTabName } from '../tab-name/tab-name.js';

export default function decorate(block) {
  const [parentTabName, parentTabId, child1TabName, child1TabId, child2TabName, child2TabId, prev, next, child1Type, child2Type] = getProps(block, {
    picture: true,
  });
  // const names = parentTabName.split(",");
  const ids = parentTabId.split(',');
  // const child1names = child1TabName.split(",");
  // const child1ids = child1TabId.split(",");
  // const child2names = child2TabName.split(",");
  // const child2ids = child2TabId.split(",");
  const copyblock = copyElements(block);
  block.innerHTML = '';
  const child1 = generateTabName(createBlockElement([copyblock.children[2], copyblock.children[3], '', child1Type, prev, next]));
  const child2 = generateTabName(createBlockElement([copyblock.children[4], copyblock.children[5], '', child2Type, prev, next]));
  child1.dataset.id = ids[0];
  child2.dataset.id = ids[1];
  child1.classList.add('nested-tab-name-child', 'active');
  child2.classList.add('nested-tab-name-child', 'dp-none');
  block.append(generateTabName(createBlockElement([copyblock.children[0], copyblock.children[1], '', '', '<', '>'])));
  block.append(child1);
  block.append(child2);

  if (child1Type == 'glider') {
    child1.classList.add('glider-int');
    createGlidder(child1, prev, next);
  }
  if (child2Type == 'glider') {
    child2.classList.add('glider-int');
    createGlidder(child2, prev, next);
  }
}

function copyElements(el) {
  const div = document.createElement('div');
  div.innerHTML = el.innerHTML ? el.innerHTML : el;
  return div;
}
function createBlockElement(children) {
  const block = document.createElement('div');
  children.forEach((child) => {
    block.append(copyElements(child));
  });
  return block;
}

function createGlidder(childGilder, prev, next) {
  const gliderPrevButton = createGliderButton('prev', prev?.outerHTML);
  const gliderNextButton = createGliderButton('next', next?.outerHTML);

  childGilder.append(gliderPrevButton);
  childGilder.append(gliderNextButton);
  const currentPrevButton = childGilder.querySelector('.glider-prev');
  const currentNextButton = childGilder.querySelector('.glider-next');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        new Glider(childGilder.querySelector('.carousel-inner'), {
          slidesToShow: 2,
          slidesToScroll: 1,
          scrollLock: true,
          draggable: true,
          arrows: {
            prev: currentPrevButton,
            next: currentNextButton,
          },
          responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              },
            },
          ],
        });
      }
    });
  });
  observer.observe(childGilder);
}

function createGliderButton(text, picture) {
  const button = document.createElement('button');
  button.classList.add(`glider-${text}`, text);
  button.innerHTML = picture;
  return button;
}
