import { decoratePlaceholder } from "../../scripts/scripts.js";
import { mobileHeaderAnalytics } from "./code-analytics.js";
import { decorateTable } from "./table.js";

export default async function decorate(block) {
    block.innerHTML = await decoratePlaceholder(block);
    if(block.classList.contains('table')){
        decorateTable(block)
        return block
    }
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
    // adding relative url to table image src
    block.querySelectorAll('img').forEach((img)=>{
        let url = new URL(img.src);
        img.src = url.pathname;
    });
    mobileHeaderAnalytics(block);
}