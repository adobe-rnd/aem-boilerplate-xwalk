import { branchURLStr, CFApiCall, fetchAPI } from '../../scripts/scripts.js';
import { dropDownStateCity, locateMeClick, onloadBranchLocator } from './branchlocator-biz.js';
import { setLocationObj } from './branchlocator-init.js';

export function branchLocator_dropdown(_block) {
  const html = `<div class='container dropdown-container'> 
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

  return html;
}

export function branchLocator_Map(_block) {
  const html = `<div class='container map-container-wrapper mt-30 mob-mt-15'>

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
                    `;
  return html;
}

export function branchLocator() {
  const branch_cards = `<div class='cards-branches cards-branches-container mt-45 mb-40 mob-mb-45'>
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

export function innerBranchFunc(branchhList) {
  let innerBranch = '';
  branchhList.forEach((eachBranch) => {
    const eachState = eachBranch.State;
    const eachCity = eachBranch.City;
    const eachLocationCode = eachBranch['Location Code'];
    const eachLocation = eachBranch.Location;
    innerBranch
                += `<div class='card-box'>
              <h3 class='card-title'> ${eachBranch.Location} </h3>
              <p class='card-address'>${eachBranch.Address}</p>
              <p class='card-gmail'> <span> <img src='/images/gmail.svg' alt='gmail-icon'/> </span> customercare@piramal.com </p>
              <a href="${branchURLStr(eachLocation, eachCity, eachState, 'loans', eachLocationCode)}" id='more-details-btn'> More details </a>
            </div>`;
    // <a href="/branch-locator/${eachState}/${eachCity}/loans-in-${eachCity}-${eachState}-${eachLocationCode}" id='more-details-btn'> More details </a>
  });
  return innerBranch;
}

export default async function decorate(block) {
  const props = Array.from(block.children, (row) => row.firstElementChild);

  const [linkURL] = props;

  const url = linkURL.textContent.trim();
  const urlRepoonse = await CFApiCall(url);
  // const jsonResponseData = JSON.parse(urlRepoonse?.data[0]?.branchlocatorobj);
  const jsonResponseData = urlRepoonse?.data;

  if (sessionStorage.getItem('data')) {
    setLocationObj.getExcelData = JSON.parse(sessionStorage.getItem('data'));
  } else {
    setLocationObj.getExcelData = dropDownStateCity(jsonResponseData);
    sessionStorage.setItem('data', JSON.stringify(setLocationObj.getExcelData));
  }

  block.innerHTML = branchLocator_dropdown(block);
  block.innerHTML += branchLocator_Map(block);
  block.innerHTML += branchLocator();

  onloadBranchLocator(block);
  locateMeClick(block);
  BLNavUpdate(block);

  /* function myMap(lat, long) {
      var mapProp = {
          center: new google.maps.LatLng(lat, long),
          zoom: 15,
      };
      var map = new google.maps.Map(block.closest('.section').querySelector('.map-container'), mapProp);
  }

    returnLatLan().then(function ({ lat, lng }) {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDx1HwnCLjSSIm_gADqaYAZhSBh7hgcwTQ").then((resolve) => {
            myMap(lat, lng);
        });
    }); */
}

function BLNavUpdate(block) {
  const { state, city } = setLocationObj.geoInfo;

  if (!state) return;

  const formatString = (str, capitalize = false) => {
    const formatted = str.toLowerCase().replace(/\s+/g, '-');
    return capitalize ? formatted.charAt(0).toUpperCase() + formatted.slice(1) : formatted;
  };

  const newState = formatString(state);
  const newSetState = formatString(state, true);

  const separatorSVG = '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.00195L4.29293 5.70902C4.68182 5.32013 4.68182 4.68377 4.29293 4.29488L1 1.00195" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  const separator = `<span class="breadcrumb-separator">${separatorSVG}</span>`;

  const breadcrumbItems = [`<a href="/branch-locator/${newState}">${newSetState}</a>`];

  if (city) {
    const newCity = formatString(city);
    const newSetCity = formatString(city, true);
    breadcrumbItems.push(`<a href="/branch-locator/${newState}/${newCity}">${newSetCity}</a>`);
  }

  const breadCrumb = breadcrumbItems.map(item => `${separator}${item}`).join('');

  block.closest('body').querySelector('.breadcrumb nav').insertAdjacentHTML('beforeend', breadCrumb);
}
