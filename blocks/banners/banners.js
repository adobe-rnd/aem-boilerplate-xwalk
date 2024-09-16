

export default async function decorate(block) {
    const content = document.createRange().createContextualFragment(`
        <div>
            Banners
        </div>
    `);

    block.textContent = '';
    block.append(content);
}

