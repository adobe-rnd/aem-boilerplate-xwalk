import { CFApiCall, fetchAPI } from '../../scripts/scripts.js';
import { featureDropDownClick } from '../keyfeatures/keyfeatures.js';
import { setLocationObj } from '../moredetailsaddress/moredetailsaddress.js';

export default async function decorate(block) {
  const {
    geoInfo: { city },
  } = setLocationObj;
  const linkURL = block.textContent.trim();

  if (!linkURL) {
    return false;
  }

  const keyFeatureDiv = document.createElement('div');

  const cfRepsonse = linkURL && (await CFApiCall(linkURL));
  const repsonseData = cfRepsonse && cfRepsonse.data[0].branchloanmapping;
  const jsonResponseData = repsonseData && JSON.parse(repsonseData);

  Object.keys(jsonResponseData).forEach((eachKey) => {
    if (jsonResponseData[eachKey].includes(city)) {
      const getKeyFeatureEle = document.querySelector(`.${eachKey}-key-feature`);
      if (getKeyFeatureEle) {
        getKeyFeatureEle.querySelectorAll('.keyfeatures-wrapper').forEach((eachKeyFeatureEle) => {
          keyFeatureDiv.append(eachKeyFeatureEle);
        });
      }
    }
  });

  document.querySelectorAll('.loans-fragment').forEach((eachEle) => {
    eachEle.remove();
  });

  document.querySelector('.view-more-less-js .wrapper-creation-container').insertAdjacentHTML('beforeend', keyFeatureDiv.innerHTML);

  document.querySelectorAll('.view-more-less-js .wrapper-creation-container .keyfeatures-wrapper').forEach((eackfeatures, index) => {
    if (index <= 2) {
      eackfeatures.classList.remove('dp-none');
    } else {
      eackfeatures.classList.add('dp-none');
    }
  });

  const featurePlus = document.querySelector('.view-more-less-js .wrapper-creation-container');
  try {
    featureDropDownClick(featurePlus);
  } catch (error) {
    console.warn(error);
  }

  block.classList.add('dp-none');
}
