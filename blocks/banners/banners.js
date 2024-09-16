
export default async function decorate(block) {
    const bannersResponse = await fetch("https://main--xwalk-automation--fornacif.hlx.live/banners.json");
    const bannerIndex = await bannersResponse.json();
    const variationPages = bannerIndex.data;

    let htmlContent = `
        <h1>HTML Banners Automation - Canal+</h1>
    `;

    for (const variationPage of variationPages) {
        const variationPath = variationPage.path;
        const variationTitle = variationPage.title;

        if (variationPath.endsWith('variation-1') || variationPath.endsWith('variation-2')) {
            const bannerIframe = `
                <h2>${variationTitle}</h2>
                <div class="iframe-row">
                    <div class="iframe-container">
                        <div class="iframe-wrapper iframe-wrapper-728">
                            <iframe src="https://main--xwalk-automation--fornacif.hlx.live${variationPath}/728x90"></iframe>
                        </div>
                        <a class="external-link" href="https://main--xwalk-automation--fornacif.hlx.live${variationPath}/728x90" target="_blank">Open banner in new tab</a>
                    </div>
                    <div class="iframe-container">
                        <div class="iframe-wrapper iframe-wrapper-300">
                            <iframe src="https://main--xwalk-automation--fornacif.hlx.live${variationPath}/300x250"></iframe>
                        </div>
                        <a class="external-link" href="https://main--xwalk-automation--fornacif.hlx.live${variationPath}/300x250" target="_blank">Open banner in new tab</a>
                    </div>
                    <div class="iframe-container">
                        <div class="iframe-wrapper iframe-wrapper-160">
                            <iframe src="https://main--xwalk-automation--fornacif.hlx.live${variationPath}/160x600"></iframe>
                        </div>
                        <a class="external-link" href="https://main--xwalk-automation--fornacif.hlx.live${variationPath}/160x600" target="_blank">Open banner in new tab</a>
                    </div>
                </div>
            `;
            htmlContent += bannerIframe;
        }
    }

    const content = document.createRange().createContextualFragment(htmlContent);

    block.textContent = '';
    block.append(content);
}

