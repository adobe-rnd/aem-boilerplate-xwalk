
export default async function decorate(block) {
    const bannersResponse = await fetch("https://main--xwalk-automation--fornacif.hlx.page/banners.json");
    const bannerIndex = await bannersResponse.json();
    const bannerPages = bannerIndex.data;

    const bannerContents = [];

    for (const bannerPage of bannerPages) {
        const bannerPath = bannerPage.path;

        const bannerResponse = await fetch(bannerPath);
        const bannerContent = await bannerResponse.text();

        bannerContents.push(bannerContent);
    }

    let htmlContent = '<div>';

    for (const bannerContent of bannerContents) {
        htmlContent += bannerContent;
    }
    
    htmlContent += '</div>';

    const content = document.createRange().createContextualFragment(htmlContent);

    block.textContent = htmlContent;
}

