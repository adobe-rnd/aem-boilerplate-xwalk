import { fetchAPI } from "../../scripts/scripts.js";
import { featureDropDownClick } from "../keyfeatures/keyfeatures.js";
import { setLocationObj } from "../moredetailsaddress/moredetailsaddress.js";

export default async function decorate(block) {
  let {
    geoInfo: { city },
  } = setLocationObj;
  let linkURL = block.textContent.trim();

  if (!linkURL) {
    return false;
  }

  let keyFeatureDiv = document.createElement("div");

  const cfRepsonse = linkURL && (await CFApiCall(linkURL));
  const repsonseData = cfRepsonse && cfRepsonse.data[0].branchloanmapping;
  const jsonResponseData = repsonseData && JSON.parse(repsonseData);

  Object.keys(jsonResponseData).forEach(function (eachKey) {
    if (jsonResponseData[eachKey].includes(city)) {
      let getKeyFeatureEle = document.querySelector(`.${eachKey}-key-feature`);
      if (getKeyFeatureEle) {
        getKeyFeatureEle.querySelectorAll(".keyfeatures-wrapper").forEach(function (eachKeyFeatureEle) {
          keyFeatureDiv.append(eachKeyFeatureEle);
        });
      }
    }
  });


  document.querySelectorAll(".loans-fragment").forEach((eachEle) => {
    eachEle.remove();
  });

  document.querySelector(".view-more-less-js .wrapper-creation-container").insertAdjacentHTML("beforeend", keyFeatureDiv.innerHTML);

  document.querySelectorAll(".view-more-less-js .wrapper-creation-container .keyfeatures-wrapper").forEach(function (eackfeatures, index) {
    if (index <= 2) {
      eackfeatures.classList.remove("dp-none");
    } else {
      eackfeatures.classList.add("dp-none");
    }
  });

  let featurePlus = document.querySelector(".view-more-less-js .wrapper-creation-container");
  try {
    featureDropDownClick(featurePlus);
  } catch (error) {
    console.warn(error);
  }

  block.classList.add("dp-none");
}

export async function CFApiCall(linkURL) {
  const response = await fetchAPI("GET", linkURL);
  const responseJson = await response.json();
  return responseJson;
}
