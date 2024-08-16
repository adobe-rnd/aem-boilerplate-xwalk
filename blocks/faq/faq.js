export default function decorate(block) {
    let count = 0;
    let className = '';
    block.id = 'faq';
    const parents = Array.from(block.querySelector('h2').parentElement.children);
    let wrapper;
    parents.forEach(function (eachEl, index) {
        if (eachEl instanceof HTMLHeadingElement) {
            wrapper && block.append(wrapper)
            wrapper = document.createElement('div');
            wrapper.id = 'accordian' + index;
            // wrapper.classList.add('');
            wrapper.append(eachEl);
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
                block.querySelectorAll("h6").forEach(function (ele) {
                    ele.classList.remove("active")
                })
            })
        } else {
            wrapper.append(eachEl);
            eachEl.classList.add('accordian', className)
            toggleHidden(eachEl);
            toggleList(eachEl);
        }
    })
    wrapper && block.append(wrapper)
}


function toggleList(el) {
    el.querySelectorAll('li').forEach(function (eachLi) {
        eachLi.querySelectorAll('ul,ol').forEach(function (eachUl) {
            toggleHidden(eachUl);
            eachLi.querySelector('ul,ol') && eachLi.addEventListener('click', function (e) {
                if (!(e.target instanceof HTMLLIElement)) {
                    eachLi.closest('ul').querySelectorAll('ul').forEach(function (li) {
                        if (e.target.nextElementSibling !== li) {
                            debugger;
                            li.previousElementSibling.classList.remove('active');
                            li.setAttribute('aria-hidden', 'true');
                        }
                    })
                    e.target.classList.toggle("active");
                    toggleHidden(eachUl);
                }
            })
        })
    })
}

function toggleHidden(el) {
    const val = el.getAttribute('aria-hidden') != 'true' ? 'true' : 'false';
    el.setAttribute('aria-hidden', val);

}