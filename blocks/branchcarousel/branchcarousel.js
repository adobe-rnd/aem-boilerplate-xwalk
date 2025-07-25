import { CFApiCall, groupAllKeys } from '../../scripts/common.js';
import { setLocationObj } from '../moredetailsaddress/moredetailsaddress.js';

export default async function decorate(block) {
  const { geoInfo: { city } } = setLocationObj;
  const linkURL = block.textContent.trim();

  let jsonResponseData = '';
  if(sessionStorage.getItem('branchloanmapping')){
    jsonResponseData = JSON.parse(sessionStorage.getItem('branchloanmapping'));
  }else{
    if (!linkURL) {
      return false;
    }
    const cfRepsonse = linkURL && await CFApiCall(linkURL);
    const reponseData = cfRepsonse && cfRepsonse.data;
    jsonResponseData = groupAllKeys(reponseData);
    sessionStorage.setItem('branchloanmapping', JSON.stringify(jsonResponseData));
    /* const repsonseData = cfRepsonse && cfRepsonse.data[0].branchloanmapping;
    const jsonResponseData = repsonseData && JSON.parse(repsonseData); */
  }


  Object.keys(jsonResponseData).forEach((eachKey) => {
    if (!jsonResponseData[eachKey].includes(city)) {
      const getDataPanel = document.querySelector(`.${eachKey}-branch-carousel`).getAttribute('data-panel');
      document.querySelectorAll(`[data-panel=${getDataPanel}]`).forEach((eachEle) => {
        eachEle.remove();
      });
    }
  });

  block.classList.add('dp-none');
}

