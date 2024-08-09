export default function decorate(block) {
    let count = 0;
    let className = '';
    const parents = Array.from(block.querySelector('h2').parentElement.children);
    parents.forEach(function (eachEl, index) {
        if (eachEl instanceof HTMLHeadingElement) {
            className = 'accordian-' + count++;
            eachEl.classList.add(className)
            eachEl.addEventListener('click', function (e) {
                block.querySelectorAll('.accordian,[aria-hidden="false"]').forEach(function (eachLi) {
                    if (eachLi.classList[1] !== e.target.classList[0]) {
                        eachLi.setAttribute('aria-hidden', 'true');
                    }
                })
                block.querySelectorAll('.' + e.target.classList[0]).forEach(function (eachLi) {
                    if (eachEl !== eachLi) {
                        toggleHidden(eachLi);
                    }
                })
            })
        } else {
            eachEl.classList.add('accordian', className)
            toggleHidden(eachEl);
            toggleList(eachEl);
        }
    })
}


function toggleList(el) {
    el.querySelectorAll('li').forEach(function (eachLi) {
        eachLi.querySelectorAll('ul').forEach(function (eachUl) {
            toggleHidden(eachUl);
            eachLi.addEventListener('click', function (e) {
                toggleHidden(eachUl)
            })
        })
    })
}

function toggleHidden(el) {
    const val = el.getAttribute('aria-hidden') != 'true' ? 'true' : 'false';
    el.setAttribute('aria-hidden', val);

}