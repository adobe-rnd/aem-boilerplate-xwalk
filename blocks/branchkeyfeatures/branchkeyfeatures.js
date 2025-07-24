import { CFApiCall, groupAllKeys } from '../../scripts/common.js';
import { featureDropDownClick } from '../keyfeatures/keyfeatures.js';
import { setLocationObj } from '../moredetailsaddress/moredetailsaddress.js';

export default async function decorate(block) {
  const {
    geoInfo: { city },
  } = setLocationObj;
  const linkURL = block.textContent.trim();

  const keyFeatureDiv = document.createElement('div');

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
    if (jsonResponseData[eachKey].includes(city)) {
      const getKeyFeatureEle = document.querySelector(`.${eachKey}-key-feature`);
      if (getKeyFeatureEle) {
        getKeyFeatureEle.querySelectorAll('.keyfeatures-wrapper').forEach((eachKeyFeatureEle) => {
          keyFeatureDiv.append(eachKeyFeatureEle);
        });
      }
    }else{
      if(eachKey == 'personal-loan'){
        document.querySelector('.personal-loan-key-feature').querySelector('.wrapper-creation-container').querySelectorAll('.keyfeatures-wrapper').forEach(function (eachfeature) {
          eachfeature.remove();
        });
      }
    }
  });

  document.querySelectorAll('.loans-fragment').forEach((eachEle) => {
    eachEle.remove();
  });

  document.querySelector('.view-more-less-js .wrapper-creation-container').insertAdjacentHTML('beforeend', keyFeatureDiv.innerHTML);


  let mainFeatureDiv = document.querySelector('.view-more-less-js.wrappercreation-container');
  let featureWrapperCheck = document.querySelectorAll('.view-more-less-js .wrapper-creation-container .keyfeatures-wrapper').length;
  if(featureWrapperCheck > 0){
    document.querySelectorAll('.view-more-less-js .wrapper-creation-container .keyfeatures-wrapper').forEach((eackfeatures, index) => {
      if (index <= 2) {
        eackfeatures.classList.remove('dp-none');
      } else {
        eackfeatures.classList.add('dp-none');
      }
    });
  }else{
    mainFeatureDiv.classList.add('dp-none');
  }

  const featurePlus = document.querySelector('.view-more-less-js .wrapper-creation-container');

  try {
    featureDropDownClick(featurePlus);
  } catch (error) {
    console.warn(error);
  }

  block.classList.add('dp-none');
}
