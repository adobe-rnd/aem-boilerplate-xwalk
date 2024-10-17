import { CFApiCall, fetchAPI } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const cfURL = block.textContent.trim();
  const cfRepsonse = await CFApiCall(cfURL);
  const repsonseData = cfRepsonse.data;
  let headLi = ''
  let rowLi = ''
  let key = [];

  repsonseData.forEach(function (eachData, index) {
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