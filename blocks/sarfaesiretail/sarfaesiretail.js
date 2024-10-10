import { fetchAPI } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const cfURL = block.textContent.trim();
  const cfRepsonse = await fetchApiCall(cfURL);
  const repsonseData = cfRepsonse.data;
  console.log(repsonseData);

  const headers = Object.keys(repsonseData[0]);
  const headerRow = `
        <tr>
            ${headers.map((header) => `<th>${header}</th>`).join('')}
        </tr>
    `;
  const rows = repsonseData.map((row) => `
        <tr>
            ${headers.map((header) => `<td>${row[header]}</td>`).join('')}
        </tr>
    `).join('');
  const tableHTML = `
        <table id="dataTable">
            <div>${headerRow}
            ${rows}</div>
        </table>
    `;

  block.innerHTML = `${tableHTML}`;
}
async function fetchApiCall(cfurl) {
  const response = await fetchAPI('GET', cfurl);
  const responseJson = await response.json();
  return responseJson;
}
