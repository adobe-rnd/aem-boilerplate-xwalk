import { decorateIcons } from "../../scripts/aem.js";
import { decoratePlaceholder } from "../../scripts/scripts.js";
import { decodeHtmlSymbols } from "../../scripts/common.js";
import { mobileHeaderAnalytics } from "./code-analytics.js";
import { decorateTable } from "./table.js";
export default async function decorate(block) {
  // console.log(block.classList.toString());
  block.innerHTML = await decoratePlaceholder(block);
  if (block.classList.contains('table')) {
    decorateTable(block)
    return block
  }
  const titleData = decodeHtmlSymbols(block.children[0]?.querySelector('p')?.innerHTML.trim() || '');
  block.innerHTML = '';
  if (titleData) {
    const titleElement = document.createElement('div');
    titleElement.innerHTML = titleData;
    const theads = titleElement.querySelectorAll('tr');
    theads.forEach(function (thead, index) {
      Array.from(thead.children).forEach(function (eachTd) {
        if (!index) {
          eachTd.remove();
          const th = document.createElement('th');
          th.innerHTML = (eachTd.innerHTML);
          thead.append(th)
        }

        if (eachTd.innerHTML.includes('img') && eachTd.textContent.trim()) {
          const p = document.createElement('p');
          const span = document.createElement('span');
          span.append(eachTd.textContent.trim());
          p.append(eachTd.querySelector('img'))
          p.append(span)
          eachTd.innerHTML = '';
          eachTd.append(p);
        } else if (eachTd.innerHTML.includes('img')) {
          // eachTd.remove();
          // debugger
          const img = eachTd.querySelector('img');
          eachTd.innerHTML = '';
          eachTd.append(img);
        } else {
          eachTd.innerHTML = eachTd.innerHTML;
        }
      })
    })
    block.append(titleElement);
  }
  const iframe = block.querySelectorAll('iframe');
  if (iframe.length != 0) {
    block.parentElement.classList.add('iframe-width');
  }
  // adding relative url to table image src
  block.querySelectorAll('img').forEach((img) => {
    const url = new URL(img.src);
    img.src = url.pathname;
  });
  mobileHeaderAnalytics(block);
}