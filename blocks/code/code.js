import { decoratePlaceholder } from "../../scripts/scripts.js";
import { mobileHeaderAnalytics } from "./code-analytics.js";

export default async function decorate(block) {
    block.innerHTML = await decoratePlaceholder(block);

    const titleData = block.children[0]?.querySelector('p')?.textContent.trim() || '';
    block.innerHTML = '';
    if (titleData) {
        const titleElement = document.createElement('div');
        titleElement.innerHTML = titleData;
        block.append(titleElement);
    }

    const iframe = block.querySelectorAll('iframe');
    if (iframe.length != 0) {
        block.parentElement.classList.add('iframe-width');
    }
    mobileHeaderAnalytics(block);
}