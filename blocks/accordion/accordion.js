import { fetchAPI } from '../../scripts/scripts.js';


/* this function also gets called by accordion-group */
export function generateAccordionDOM(block) {
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  details.append(summary);
  Array.from(block.children).forEach(async (element, i) => {
    if (i === 0) {
      // const heading = element.querySelector("h2,h3,h4,h5,h6");
      const heading = element;
      summary.append(heading || element.textContent.trim());
    } else {
      const url = element.innerText.trim();
      const isurl = url.includes('.json');
      const elementText = element.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      const elementDiv = document.createElement('div');
      if (isurl) {
        const data = await renderDataFromAPI(url);
        const documentHTMl = KYCDocuments(data);
        elementDiv.innerHTML = documentHTMl;
      } else {
        elementDiv.innerHTML = elementText;
      }

      details.append(elementDiv);
    }
  });

  return details;
}

export default function decorate(block) {
  const dom = generateAccordionDOM(block);
  block.textContent = '';
  block.append(dom);
}

async function renderDataFromAPI(url) {
  const resp = await fetchAPI('GET', url);
  const data = await resp.json();
  return data;
}

function KYCDocuments(data) {
  const dataList = data.data;
  let html = '';
  dataList.forEach((each) => {
    const spanDiv = each?.subtitle ? `<span class="description">${each.subtitle}</span>` : '';
    const imgDiv = each?.rowoneimg && each?.rowtwoimg
      ? `<td style="  text-align: right;"><img src="${each.rowoneimg}" alt=""></td>
    <td style=" text-align: right;"><img src="${each.rowtwoimg}" alt=""></td>`
      : '';
    html
      += `<table class="${each.class} " cellpadding="1" cellspacing="0" border="1">
        <tbody>
            <tr>
                <th style="text-align: left;">${each.title}
                    ${spanDiv}
                </th>
                <th style=" text-align: right;">${each.rowoneheading}</th>
                <th style=" text-align: right;">${each.rowtwoheading}</th>
                ${imgDiv}
            </tr>
        </tbody>
      </table>`;
  });
  return html;
}

export function documentRequired() {
  if (document.querySelector('.documents-required-brown').querySelectorAll('.accordion.block').length > 0) {
    const ulDiv = document.querySelector('.documents-required-brown').querySelectorAll('.accordion.block')[1]?.querySelectorAll('div > ul');
    if (ulDiv.length > 0) {
      const firstUl = ulDiv[0];
      firstUl.classList.add('cmp-text--doc-salary');
      const secondUl = ulDiv[1];
      secondUl?.classList.add('cmp-text--doc-business');
    }
  }
}
