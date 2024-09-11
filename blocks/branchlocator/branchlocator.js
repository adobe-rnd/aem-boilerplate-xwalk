import { fetchAPI } from "../../scripts/scripts.js";
import { dropDownStateCity, locateMeClick, onloadBranchLocator } from "./branchlocator-biz.js";
import { setLocationObj } from "./branchlocator-init.js";


export function branchLocator_dropdown(_block){

   let html =  `<div class='container dropdown-container'> 
                                <div class='dropdown-wrapper'>

                                    <div class='state-dropdown dropdown dropdown-li-logic'>
                                        <div class='dropdown-selectvalue default-state-selected'> Maharashtra </div>
                                        <ul class='state-vlaue-option dropdown-option-wrapper state-wrapper dp-none'>
                                            <input type='text' placeholder='State' id='search' class="search-input"/>
                                             <div class='option-wrapper'>
                                             </div>
                                        </ul>
                                    </div>

                                    <div class='city-dropdown dropdown dropdown-li-logic'>
                                        <div class='dropdown-selectvalue default-city-selected'> Mumbai </div>
                                        <ul class='city-vlaue-option dropdown-option-wrapper city-wrapper dp-none'>
                                            <input type='text' placeholder='City' id='search' class="search-input"/>
                                            <div class='option-wrapper'>
                                            </div>
                                        </ul>
                                    </div>

                                </div>
                          </div>`;

                          return html
}

export function branchLocator_Map(_block){

    let html = `<div class='container map-container-wrapper mt-30 mob-mt-15'>

                        <div class='map-branchinfo-wrapper'>

                            <div class='branch-info-container'>
                                 <p class="nearest-txt">Find The Nearest Branch From Your Place</p>
                                 <div class="branch-deatils dp-none">
                                    <p class="branch-addr">Branch - Borivali east</p>
                                    <p class="branch-distance">Distance - 1.4km </p>
                                 </div>
                                    <button class="btn-locate"><img src='/images/location-pointer.svg' class="locate-me-img" alt="locate-me-img">
                                    <span>Locate Me</span>
                                    </button>
                                 <a class="btn-locate-details dp-none">Branch Details</a>
                            </div>

                            <div class='map-container'><div>

                        </div>
                    </div>
                    `
    return html
}


export function branchLocator() {

    let branch_cards = `<div class='cards-branches cards-branches-container mt-45 mb-40 mob-mb-45'>
            <div class='title'>
                 <h2 class="title-to-show"> Find all Mumbai Branches here </h2>
            </div>

            <div class='cards-container'>

                    <div class='cards-wrapper branch-list-wrapper'>

                            

                    </div>

            </div>
        </div>`;
    return branch_cards;
}

export function innerBranchFunc(branchhList){
  let innerBranch = "";
  branchhList.forEach(eachBranch => {
    let eachState = eachBranch['State'].charAt(0).toLowerCase() + eachBranch['State'].slice(1).replace(' ', '-');
    let eachCity = eachBranch['City'].charAt(0).toLowerCase() + eachBranch['City'].slice(1).replace(' ', '-');
    let eachLocationCode = eachBranch['Location Code'];
    innerBranch +=
                `<div class='card-box'>
              <h3 class='card-title'> ${eachBranch['Location']} </h3>
              <p class='card-address'>${eachBranch['Address']}</p>
              <p class='card-gmail'> <span> <img src='/images/gmail.svg' alt='gmail-icon'/> </span> customercare@piramal.com </p>
              <a href="/branch-locator/${eachState}/${eachCity}/loans-in-${eachCity}-${eachState}-${eachLocationCode}" id='more-details-btn'> More details </a>
            </div>`;
  });
  return innerBranch;
}

export async function CFApiCall(cfurl) {
    const response = await fetchAPI("GET", cfurl);
    const responseJson = await response.json();
    return responseJson;
  }


export default async function decorate(block) {

    const props = Array.from(block.children, (row) => row.firstElementChild);

    let [ linkURL ] = props;

    let url = linkURL.textContent.trim();
    let urlRepoonse = await CFApiCall(url);
    const jsonResponseData = JSON.parse(urlRepoonse?.data[0]?.branchlocatorobj);

    setLocationObj.getExcelData = dropDownStateCity(jsonResponseData); 

    block.innerHTML = branchLocator_dropdown(block);    ;
    block.innerHTML += branchLocator_Map(block);
    block.innerHTML += branchLocator();

    onloadBranchLocator(block);
    locateMeClick(block);

    /* function myMap(lat, long) {
      var mapProp = {
          center: new google.maps.LatLng(lat, long),
          zoom: 15,
      };
      var map = new google.maps.Map(block.closest('.section').querySelector('.map-container'), mapProp);
  }
  
    returnLatLan().then(function ({ lat, lng }) {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k").then((resolve) => {
            myMap(lat, lng);
        });
    }); */

}


