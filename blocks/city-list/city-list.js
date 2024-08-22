import { ctaClickInteraction } from "../../dl.js";
import { fetchAPI, getProps, renderHelper } from "../../scripts/scripts.js";

export default async function decorate(block) {
  const [url] = getProps(block);
  const resp = await fetchAPI("GET", url);
  const data = await resp.json();

  let li = renderHelper(
    data.data.sort(function (a, b) {
      if (a.text < b.text) {
        return -1;
      }
      if (a.text > b.text) {
        return 1;
      }
      return 0;
    }),
    `<div class="forName">
        <li><a href="{url}" title="{text}">{text}</a></li>    
    </div>`,
  );
  block.innerHTML = "<ul>" + li + "</ul>";
  cityListAnalytics(block);
}

function cityListAnalytics(block){
  block.querySelectorAll('li').forEach(eachLi => {
    eachLi.addEventListener('click', (e) => {
      let data = {};
      data.click_text = e.target.textContent.trim();
      data.cta_position = e.target.closest('.section').querySelector('.default-content-wrapper').querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();
      ctaClickInteraction(data);
    });
  });
}