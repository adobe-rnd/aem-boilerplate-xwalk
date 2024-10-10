export default function decorate(block) {
  let count = 0;
  let className = '';
  const parents = Array.from(block.querySelector('h2').parentElement.children);
  parents.forEach((eachEl, index) => {
    if (eachEl instanceof HTMLHeadingElement) {
      // eachEl.setAttribute('aria-hidden', 'false')
      // toggleHidden(eachEl)
      className = `accordian-${count++}`;
      eachEl.classList.add(className);
      eachEl.addEventListener('click', (e) => {
        // block.querySelectorAll('.' + e.target.classList[0]).forEach(function (eachLi) {
        // /*
        block.querySelectorAll('[aria-hidden="false"]').forEach((eachLi) => {
          eachLi.setAttribute('aria-hidden', 'true');
        });
        block.querySelectorAll('.accordian').forEach((eachLi) => {
          if (eachEl === eachLi) {
            eachLi.setAttribute('aria-hidden', 'true');
          }
        });
        block.querySelectorAll(`.${e.target.classList[0]}`).forEach((eachLi) => {
          if (eachEl !== eachLi) {
            // eachLi.setAttribute('aria-hidden', 'false')
            toggleHidden(eachLi);
          }
        });
        // */
        // block.querySelectorAll('.accordian[]').forEach(function (eachLi) {
        //     if (eachEl !== eachLi) {
        //         toggleHidden(eachLi);
        //     } else {
        //     }
        // })
      });
    } else {
      eachEl.classList.add('accordian', className);
      // eachEl.setAttribute('aria-hidden', 'true');
      toggleHidden(eachEl);
      toggleList(eachEl);
    }
  });
}

function toggleList(el) {
  el.querySelectorAll('li').forEach((eachLi) => {
    eachLi.querySelectorAll('ul').forEach((eachUl) => {
      // eachUl.setAttribute('aria-hidden', 'true');
      toggleHidden(eachUl);
      eachLi.addEventListener('click', (e) => {
        toggleHidden(eachUl);
        // .setAttribute('aria-hidden', 'false');
      });
    });
  });
}

function toggleHidden(el) {
  const val = el.getAttribute('aria-hidden') != 'true' ? 'true' : 'false';
  el.setAttribute('aria-hidden', val);
}
// function addAccordian(ul) {
//     ul.querySelectorAll('li').forEach(function (eachLi) {
//         // eachLi.setAttribute('aria-hidden', 'true');
//         eachLi.addEventListener('click', function (e) {
//             eachLi.setAttribute('aria-hidden', 'false');
//         })
//     })

// }
