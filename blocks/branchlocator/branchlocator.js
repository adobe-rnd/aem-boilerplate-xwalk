import { loadScript } from "../../scripts/aem.js";
import returnLatLan, { locationInLatLan } from "../select-tag/getSelectedLanguage.js";
import { onloadBranchLocator } from "./branchlocator-biz.js";


export function branchLocator_dropdown(_block){

   let html =  `<div class='container dropdown-container'> 
                                <div class='dropdown-wrapper'>

                                    <div class='state-dropdown dropdown dropdown-li-logic'>
                                        <div class='dropdown-selectvalue deafult-state-selected'> Maharashtra </div>
                                        <ul class='state-vlaue-option dropdown-option-wrapper state-wrapper dp-none'>
                                            <input type='text' placeholder='State' id='search' class="search-input"/>
                                             <div class='option-wrapper'>
                                             </div>
                                        </ul>
                                    </div>

                                    <div class='city-dropdown dropdown dropdown-li-logic'>
                                        <div class='dropdown-selectvalue deafult-city-selected'> Mumbai </div>
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
                                 <p>Find The Nearest Branch From Your Place</p>
                                 <p>Branch - Borivali east</p>
                                 <p> Distance - 1.4km </p>
                                 <button class="btn-locate">Branch details</button>
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
                 <h2> Find all Mumbai Branches here </h2>
            </div>

            <div class='cards-container'>

                    <div class='cards-wrapper'>

                            <div class='card-box'>
                                <h3 class='card-title'> Andheri </h3>
                                <p class='card-address'>Office No. 501 & 502, 
                                    5th Floor, Express Chambers, 
                                    Andheri Kurla Road, Andheri (East) 400069
                                </p>
                                <p class='card-gmail'> <span> <img src='/images/Vector.png' alt='gmail-icon'/> </span> customercare@piramal.com </p>
                                <button id='more-details-btn' type='button'> More details </button>
                            </div>

                              <div class='card-box'>
                                <h3 class='card-title'> Andheri </h3>
                                <p class='card-address'> Office No. 501 & 502, 
                                    5th Floor, Express Chambers, 
                                    Andheri Kurla Road, Andheri (East) 400069
                                </p>
                                <p class='card-gmail'> <span> <img src='/images/Vector.png' alt='gmail-icon'/> </span> customercare@piramal.com </p>
                                <button id='more-details-btn' type='button'> More details </button>
                            </div>

                              <div class='card-box'>
                                <h3 class='card-title'> Andheri </h3>
                                <p class='card-address'> Office No. 501 & 502, 
                                    5th Floor, Express Chambers, 
                                    Andheri Kurla Road, Andheri (East) 400069
                                </p>
                                <p class='card-gmail'> <span> <img src='/images/Vector.png' alt='gmail-icon'/> </span> customercare@piramal.com </p>
                                <button id='more-details-btn' type='button'> More details </button>
                            </div>

                              <div class='card-box'>
                                <h3 class='card-title'> Andheri </h3>
                                <p class='card-address'> Office No. 501 & 502, 
                                    5th Floor, Express Chambers, 
                                    Andheri Kurla Road, Andheri (East) 400069
                                </p>
                                <p class='card-gmail'> <span> <img src='/images/Vector.png' alt='gmail-icon'/> </span> customercare@piramal.com </p>
                                <button id='more-details-btn' type='button'> More details </button>
                            </div>

                              <div class='card-box'>
                                <h3 class='card-title'> Andheri </h3>
                                <p class='card-address'> Office No. 501 & 502, 
                                    5th Floor, Express Chambers, 
                                    Andheri Kurla Road, Andheri (East) 400069
                                </p>
                                <p class='card-gmail'> <span> <img src='/images/Vector.png' alt='gmail-icon'/> </span> customercare@piramal.com </p>
                                <button id='more-details-btn' type='button'> More details </button>
                            </div>

                              <div class='card-box'>
                                <h3 class='card-title'> Andheri </h3>
                                <p class='card-address'> Office No. 501 & 502, 
                                    5th Floor, Express Chambers, 
                                    Andheri Kurla Road, Andheri (East) 400069
                                </p>
                                <p class='card-gmail'> <span> <img src='/images/Vector.png' alt='gmail-icon'/> </span> customercare@piramal.com </p>
                                <button id='more-details-btn' type='button'> More details </button>
                            </div>
                    </div>

            </div>
        </div>`;
    return branch_cards;
}
export default function decorate(block) {
    
    block.innerHTML = `${branchLocator_dropdown(block)}`;
    block.innerHTML += `${branchLocator_Map(block)}`;
    block.innerHTML += `${branchLocator()}`;

    onloadBranchLocator(block);

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

