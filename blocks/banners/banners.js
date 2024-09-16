
export default async function decorate(block) {
    const bannersResponse = await fetch("/variations-index.json");
    const bannerIndex = await bannersResponse.json();
    const variationPages = bannerIndex.data;

    let htmlContent = `
        <h1>HTML Banners Automation - Canal+</h1>
    `;

    for (const variationPage of variationPages) {
        const variationPath = variationPage.path;
        const variationTitle = variationPage.title;

        const bannerIframe = `
            <h2>${variationTitle}</h2>
            <div class="iframe-row">
                <div class="iframe-container">
                    <div class="iframe-wrapper iframe-wrapper-728">
                        <iframe src="https://main--xwalk-automation--fornacif.hlx.live${variationPath}/banner1"></iframe>
                    </div>
                    <a class="external-link" href="https://main--xwalk-automation--fornacif.hlx.live${variationPath}/banner1" target="_blank">Open banner</a>
                </div>
                <div class="iframe-container">
                    <div class="iframe-wrapper iframe-wrapper-300">
                        <iframe src="https://main--xwalk-automation--fornacif.hlx.live${variationPath}/banner3"></iframe>
                    </div>
                    <a class="external-link" href="https://main--xwalk-automation--fornacif.hlx.live${variationPath}/banner3" target="_blank">Open banner</a>
                </div>
                <div class="iframe-container">
                    <div class="iframe-wrapper iframe-wrapper-160">
                        <iframe src="https://main--xwalk-automation--fornacif.hlx.live${variationPath}/banner2"></iframe>
                    </div>
                    <a class="external-link" href="https://main--xwalk-automation--fornacif.hlx.live${variationPath}/banner2" target="_blank">Open banner</a>
                </div>
            </div>
        `;
        htmlContent += bannerIframe;
    }

    const content = document.createRange().createContextualFragment(htmlContent);

    block.textContent = '';
    block.append(content);
}

