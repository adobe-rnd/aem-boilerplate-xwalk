

export default async function decorate(block) {
    

    const content = document.createRange().createContextualFragment(`qdsqsd
    `);

    block.textContent = '';
    block.append(content);

    
}

