import { fetchAPI } from "../../scripts/scripts.js";

export default async function decorate(block) {

    let cfURL = block.textContent.trim();
    const cfRepsonse = await fetchApiCall(cfURL);
    debugger;
    const repsonseData = cfRepsonse.data[0].data;
    const jsonResponseData = JSON.parse(repsonseData);
    console.log("poooooooja" ,jsonResponseData);

}

export async function fetchApiCall(cfurl) {
    const response = await fetchAPI("GET", cfurl);
    const responseJson = await response.json();
    return responseJson;
  }
  