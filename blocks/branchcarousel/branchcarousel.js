import { fetchAPI } from "../../scripts/scripts.js";
import { setLocationObj } from "../moredetailsaddress/moredetailsaddress.js";

export default async function decorate(block){

    let { geoInfo:{city} } = setLocationObj;
    let linkURL = block.textContent.trim();

    if(!linkURL){
        return false;
    }

    const cfRepsonse = linkURL && await CFApiCall(linkURL);
    const repsonseData = cfRepsonse && cfRepsonse.data[0].branchloanmapping;
    const jsonResponseData = repsonseData && JSON.parse(repsonseData);

    Object.keys(jsonResponseData).forEach(function (eachKey) {
        if(!jsonResponseData[eachKey].includes(city)){
            let getDataPanel = document.querySelector(`.${eachKey}-branch-carousel`).getAttribute('data-panel');
            document.querySelectorAll(`[data-panel=${getDataPanel}]`).forEach(function (eachEle){
                eachEle.remove();
            });
        }
    });

    block.classList.add('dp-none');

}

export async function CFApiCall(linkURL) {
    const response = await fetchAPI("GET", linkURL);
    const responseJson = await response.json();
    return responseJson;
  }