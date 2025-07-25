import { targetObject } from '../../scripts/scripts.js';
import { CFApiCall, fetchAPI } from '../../scripts/common.js';

export default async function decorate(block) {
  const cfURL = block.textContent.trim();
  const cfRepsonse = await CFApiCall(cfURL);
  const repsonseData = cfRepsonse.data;
  let respLength = 0;
  repsonseData.length < 60 ? respLength = repsonseData.length : respLength = 60;
  if (targetObject.isTab || targetObject.isMobile) {
    makeTable(block, repsonseData, 20)
  }
  else {
    makeTable(block, repsonseData, respLength)
  }
  // block.addEventListener("scroll",() => makeTable(block, repsonseData))
  let onceScroll = false;

  window.onscroll = () => {
      if (!onceScroll) {
          makeTable(block, repsonseData);  
          onceScroll = true;  
      }
  };
}

function makeTable(block, repsonseData, count) {
  let headLi = ''
  let rowLi = ''
  let key = [];
  repsonseData.slice(0, count).forEach(function (eachData, index) {
    if (!index) {
      key = getFilterTableCell(eachData);
      headLi = createHead(key);
    }
    rowLi += createRow(eachData, key)
  })
  block.innerHTML = `<table> ${headLi + rowLi} <table>`;
}

function createRow(data, key) {
  const td = key.map(function (key) {
    var value = data[key]
    if (data[key + " URL"]) {
      return `<td><a target="_blank" href="${data[key + " URL"]}">${value}</a></td>`;
    }
    return `<td>${value}</td>`;
  })
  return `<tr>${td.join('')}</tr>`
}

function createHead(data) {
  return `
            <tr>
                ${(data).map((header) => `<th>${header}</th>`).join('')}
            </tr>
        `;
}

function getFilterTableCell(data) {
  return Object.keys(data).filter((key) => !key.includes("URL") || Object.keys(data).includes(key + " URL"))
}