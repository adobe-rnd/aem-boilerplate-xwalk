
export default async function decorate(block) {
    const reponse = await fetch("http://example.com/films.json");
    const films = await reponse.json();

    const content = document.createRange().createContextualFragment(`
        <div>
            Banners
        </div>
    `);

    block.textContent = '';
    block.append(content);
}

