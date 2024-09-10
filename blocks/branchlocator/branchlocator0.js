import { loadScript } from "../../scripts/aem.js";
import returnLatLan from "../select-tag/getSelectedLanguage.js";
import { onloadBranchLocator } from "./branchlocator-biz.js";


let setLocationObj = {};

export function dropDownStateCity(response) {
  const groupedByState = {};

  response.forEach((location) => {
    // const state = location.State;
    let lowercaseLocation = location.State.toLowerCase();
    lowercaseLocation = lowercaseLocation.charAt(0).toUpperCase() + lowercaseLocation.slice(1);
    if (!groupedByState[lowercaseLocation]) {
      groupedByState[lowercaseLocation] = [];
    }
    groupedByState[lowercaseLocation].push(location);
  });

  return groupedByState;
}


export function branchLocator_dropdown(_block){

    let dropdown = _block.closest('.branchlocator-dropdown');

    setLocationObj.getExcelData = dropDownStateCity(); // await while calling APi
    setLocationObj.stateLi = "";
    setLocationObj.cityLi = "";
    setLocationObj.cityhash = {};
    setLocationObj.lanLogInfo = [];
    setLocationObj.geoInfo = {
        city : "",
        state : "",
        country : ""
    };


    const { getExcelData, cityhash} = setLocationObj;

    setLocationObj.cityLi = Object.values(setLocationObj.getExcelData)
      .flat()
      .reduce((acc, { City }) => {
        if (!cityhash.hasOwnProperty(City)) {
          cityhash[City] = City;
          acc += `<li class='city-option option' data-city-info=${City}>${City}</li>`;
        }
        return acc;
      }, "");

      /* setLocationObj.lanLogInfo = Object.values(setLocationObj.getExcelData)
      .flat().map(({ Latitude, Longitude }) => {
        return [Latitude,Longitude];
      }); */

    setLocationObj.stateLi = Object.keys(setLocationObj.getExcelData)
      .map((state) => `<li class='state-option option' data-state-info="${state}">${state}</li>`)
      .join("");


    dropdown.innerHTML = `<div class='container'> 
                                <div class='dropdown-wrapper'>

                                    <div class='state-dropdown dropdown dropdown-li-logic'>
                                        <div class='dropdown-selectvalue'>  </div>
                                        <ul class='state-vlaue-option dropdown-option-wrapper dp-none'>
                                            <input type='text' placeholder='State' id='search'/>
                                             <div class='option-wrapper selected-state'>${setLocationObj.stateLi}</div>
                                        </ul>
                                    </div>

                                    <div class='city-dropdown dropdown dropdown-li-logic'>
                                        <div class='dropdown-selectvalue'>  </div>
                                        <ul class='city-vlaue-option dropdown-option-wrapper dp-none'>
                                            <input type='text' placeholder='City' id='search'/>
                                            <div class='option-wrapper selected-city'>
                                                ${setLocationObj.cityLi}
                                            </div>
                                        </ul>
                                    </div>

                                </div>
                          </div>`;
    
    returnLatLan().then(function ({ lat, lng }) {
        if(lat && lng){
            let branchhList = sortingNearestBranch(lat, lng, setLocationObj.getExcelData);
            loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k").then((resolve) => {
                myMap(lat, lng, branchhList);
            });
            getStateCity(lat, lng)
        }
    });
    selectedStateCitytext(dropdown);
    hideshowDd(dropdown);
                       
}

function hideshowDd(dropdown){
    dropdown.querySelectorAll('.dropdown-li-logic').forEach(function (eachDropdown) {
        eachDropdown.querySelector('.dropdown-selectvalue').addEventListener('click', function (e) {
            if(eachDropdown.querySelector('.dropdown-option-wrapper').classList.contains('dp-none')){
                eachDropdown.querySelector('.dropdown-option-wrapper').classList.remove('dp-none');
            }else{
                eachDropdown.querySelector('.dropdown-option-wrapper').classList.add('dp-none');
            }
        });
    });
}

function selectedStateCitytext(dropdown){
    debugger;
}

export function branchLocator_Map(){

    let map = document.querySelector('.branchlocator-map');

    map.innerHTML = `<div class='container'>

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
}


export function branchLocator() {
    let branch_cards = `<div class='cards-branches'>
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

    onloadBranchLocator(block);
    // branchLocator_dropdown(block);
    // branchLocator_Map();
    // let stateOptions = ``;
    // let cityOptions = `<div class='value'> Thane </div>`;

    // stateOptions += `<div class='value'>Andhra Pradesh </div>`;

    /*block.innerHTML = `
        <div class="dropdowns">
            <div class="state-dropdown dropdown">
                <div class="option active">Maharashtra</div>
                 <div class="state-options options dp-none">
                     <input type='text' placeholder='city'/>
                    ${stateOptions}
                 </div>

            </div>

            <div class="city-dropdown dropdown">
                <div class="option active">Mumbai</div>
                 <div class="city-options options dp-none">
                         <input type='text' placeholder='city'/>
                        ${cityOptions}
                 </div>
            </div>
        </div>
        
       <div class="map-btn-wrapper">
            <div class="branch-info">
                <p>Find The Nearest Branch From Your Place</p>
                <p>Branch - Borivali east</p>
                <p> Distance - 1.4km </p>
                <button class="btn-locate">Locate me</button>
             </div>
            <div class="map-container">
            </div>
        </div>
        
        ${branchLocator()}
    `*/
    block.innerHTML = ` ${branchLocator()}`

    // block.querySelectorAll('.dropdown').forEach(function (value, index) {
    //     value.addEventListener('click', function (e) {
    //         if (value.querySelector('.state-options')) {
    //             value.querySelector('.state-options').classList.remove('dp-none');
    //             value.querySelector('.state-options').classList.add('active');
    //         } else {
    //             value.querySelector('.city-options').classList.remove('dp-none');
    //             value.querySelector('.city-options').classList.add('active');
    //         }
    //     });
    // });
}

function myMap(lat, long, sortedBranch) {
  var mapProp = {
    center: new google.maps.LatLng(lat, long),
    zoom: 10,
  };
  var map = new google.maps.Map(document.querySelector(".map-container"), mapProp);
  addMarkers();

  // adding the markers
  function addMarkers() {
    for (let eachLagLong of sortedBranch) {
      if (typeof eachLagLong["Latitude"] == "string" || typeof eachLagLong["Longitude"] == "string") {
        continue;
      }

        new google.maps.Marker({
          position: new google.maps.LatLng(eachLagLong["Latitude"], eachLagLong["Longitude"]),
          title: "Primal",
          map: map,
        });

    }
    new google.maps.Marker({
      position: new google.maps.LatLng(lat, long),
      title: "You are here",
      icon: {
        url: "./images/blue-icon.png",
        size: new google.maps.Size(48, 48),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(24, 42),
      },
      map: map,
    });
  }
}   


function sortingNearestBranch(lat, lng, data) {
  const filteredLocations = Object.values(setLocationObj.getExcelData)
    .flat()
    .map((location) => {
      return {
        ...location,
        distance: calculateDistance(lat, lng, location.Latitude, location.Longitude),
      };
    })
    .filter((location) => location.distance <= 40)
    .sort((a, b) => a.distance - b.distance);

    console.log(filteredLocations);

    return filteredLocations;

  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}





