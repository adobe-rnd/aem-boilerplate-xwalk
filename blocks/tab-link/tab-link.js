import { ctaClickInteraction } from '../../dl.js';
import { targetObject } from '../../scripts/scripts.js';
import { createButton, createCarousle, getProps } from '../../scripts/common.js';
import Glider from '../carousel/glider.js';

export default function decorate(block) {
  const isDesktop = window.matchMedia('(min-width: 1025px)');
  const isTab = window.matchMedia('(max-width: 1024px)');
  // console.log("tab link block");
  const [, classes, prev, next, configData] = getProps(block, {
    picture: true,
  });
  if (classes === 'carousel' && !targetObject.isTab) {
    block.children[block.children.length - 1].remove();
    block.children[3].remove();
    block.children[2].remove();
    block.children[1].remove();
    block.classList.add(classes);
    block.querySelectorAll('ul').forEach((el) => {
      el.classList.add('carousel-inner');
      el.id = 'carouselInner';
    });
    block.querySelectorAll('li').forEach((el, index) => {
      el.classList.add('carousel-item');
    });
    const prevButton = createButton('prev', prev?.outerHTML);
    const nextButton = createButton('next', next?.outerHTML);
    prevButton.classList.add(classes === 'normal' ? 'dp-none' : 'dp-normal');
    nextButton.classList.add(classes === 'normal' ? 'dp-none' : 'dp-normal');
    createCarousle(block, prevButton, nextButton);
  } else if (classes.toLowerCase() === 'glider') {
    block.children[block.children.length - 1].remove();
    block.children[3].remove();
    block.children[2].remove();
    block.children[1].remove();
    block.classList.add(classes);
    if (!targetObject.isMobile && !targetObject.isTab) {
      const prevButton = createButton('glider-prev', prev?.outerHTML);
      const nextButton = createButton('glider-next', next?.outerHTML);

      const div = document.createElement('div');
      const btnContainer = document.createElement('div');
      btnContainer.append(prevButton);
      btnContainer.append(nextButton);
      const container = block.querySelector('ul');
      container?.querySelectorAll('li')?.forEach((eachLi) => {
        const eachLiText = eachLi.textContent.trim();
        if (eachLiText.includes('$') && isDesktop.matches) {
          eachLi.querySelector('a').innerText = eachLiText.split('$')[0]?.trim();
        }
      });

      div.append(container);
      div.append(btnContainer);
      block.append(div);

      const configJson = JSON.parse(configData);
      configJson.arrows = {};
      configJson.arrows.prev = prevButton;
      configJson.arrows.next = nextButton;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            new Glider(container, configJson);
          }
        });
      });
      observer.observe(block);
    }
  }
  const heading = block.querySelector('p');
  const activeTab = block.querySelector('strong');
  if (activeTab.textContent.trim().includes('$')) {
    activeTab.querySelector('a').innerText = activeTab.textContent.trim().split('$')[1]?.trim();
  }
  const div = document.createElement('div');
  // heading.remove();
  div.innerHTML = `
            <div class="text legal-mobile-text">
                <div id="text-4267ae00e4" class="cmp-text">
                    <p>${heading.innerText}</p>
                    <p class="active-tab-name">${activeTab.innerText}</p>
                </div>
            </div>`;
  // ${heading ? `<p>${heading.innerText}</p>` : ''}
  block.insertBefore(div, block.children[0]);
  const model = block.children[1];
  model?.querySelectorAll('li')?.forEach((eachLi) => {
    const eachLiText = eachLi.textContent.trim();
    if (eachLiText.includes('$') && isTab.matches) {
      eachLi.querySelector('a').innerText = eachLiText.split('$')[1]?.trim();
    }
  });
  model.classList.add('compony-details');
  div.querySelector('.active-tab-name').addEventListener('click', (e) => {
    /*  if (e.currentTarget.classList) {
            model.classList.add("model-mob-hide");
        } else {
            model.classList.remove("model-mob-hide");
        }
        if(model.closest('.section.financial-reports-carousel')){
            if (model.classList.contains("model-mob-hide")) {
                document.querySelector(".modal-overlay").classList.remove("overlay");
                document.querySelector(".modal-overlay").classList.add("dp-none");
                model.classList.remove("model-mob-hide");
            } else {
                document.querySelector(".modal-overlay").classList.add("overlay");
                document.querySelector(".modal-overlay").classList.remove("dp-none");
                model.classList.add("model-mob-hide");
            }
        }else{
            if (model.classList.contains("model-mob-hide")) {
                model.classList.remove("model-mob-hide");
                document.body.classList.remove("overlay-active");
                document.body.style.overflow="auto";
            } else {
                model.classList.add("model-mob-hide");
                document.querySelector("body").classList.add("overlay-active");
                document.body.style.overflow="hidden";
            }
        } */

    if (model.classList.contains('model-mob-hide')) {
      model.classList.remove('model-mob-hide');
      document.body.classList.remove('overlay-active');
      document.body.style.overflow = 'auto';
    } else {
      model.classList.add('model-mob-hide');
      document.querySelector('body').classList.add('overlay-active');
      document.body.style.overflow = 'hidden';
    }
  });

  // Add a click event to the overlay to close the modal
  const overlay = document.createElement('div');
  overlay.classList.add('body-overlay');
  document.body.appendChild(overlay);

  overlay.addEventListener('click', () => {
    model.classList.remove('model-mob-hide');
    document.body.classList.remove('overlay-active');
    document.body.style.overflow = 'auto';
  });

  document.addEventListener('load-event', () => {
    block.querySelector('.tab-link ul').scroll({
      left: block.querySelector('.tab-link ul li strong').getBoundingClientRect().left - block.querySelector('.tab-link ul li').getBoundingClientRect().width - 45,
      behavior: 'smooth',
    });
  }
  )
  // setTimeout(() => {
  //   block.querySelector('.tab-link ul').scroll({
  //     left: block.querySelector('.tab-link ul li strong').getBoundingClientRect().left - block.querySelector('.tab-link ul li').getBoundingClientRect().width - 45,
  //     behavior: 'smooth',
  //   });
  // }, 100);


  try {
    if (block.closest('.section.company-details-wrapper') && block.querySelector('.compony-details')) {
      block.querySelectorAll('.compony-details li').forEach((eachLi) => {
        eachLi.addEventListener('click', function () {
          const data = {};
          data.click_text = this.textContent.trim();
          ctaClickInteraction(data);
        });
      });
    }
  } catch (error) {
    console.warn(error);
  }

  // document.addEventListener('load-event', hoverhandler);
  // // document.removeEventListener('load-event', hoverhandler);
  // function hoverhandler() {
  //   block.querySelector('.tab-link ul').scroll({
  //     left: block.querySelector('.tab-link ul li strong').getBoundingClientRect().left - block.querySelector('.tab-link ul li').getBoundingClientRect().width - 45,
  //     behavior: 'smooth',
  //   });
  // }
}
