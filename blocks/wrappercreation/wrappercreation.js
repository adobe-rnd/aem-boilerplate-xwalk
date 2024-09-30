export default function decorate(block) {
    const mainParentContainer = block.parentElement.closest('.section');
    const mainParentContainerChildren = Array.from(mainParentContainer.children);
    let wrapperChecker = false;
    let currentIndex, contentDiv;
    contentDiv = document.createElement('div');
    contentDiv.classList.add('wrapper-creation-container')

    mainParentContainerChildren.forEach( (child, index) => {
        if( ((currentIndex + 1) == index) || wrapperChecker){
            wrapperChecker = true;
            contentDiv.append(child);
        }else if(child.classList.contains('wrappercreation-wrapper')){
            currentIndex = index;
        }
    });

    block.innerHTML = '';
    block.appendChild(contentDiv);
}