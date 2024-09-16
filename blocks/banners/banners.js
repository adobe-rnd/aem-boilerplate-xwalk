
export default async function decorate(block) {
    const reponse = await fetch("https://main--xwalk-automation--fornacif.hlx.page/banners.json");
    const banners = await reponse.json();

    const content = document.createRange().createContextualFragment(`
        <div>
            Banners
        </div>
    `);

    block.textContent = '';
    block.append(content);
}

