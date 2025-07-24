import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';
import { branchURLStr, CFApiCall } from '../../scripts/common.js';
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

export function branchLocator_Map(_block, placeholders) {
  const html = `<div class='container map-container-wrapper mt-30 mob-mt-15'>

                        <div class='map-branchinfo-wrapper'>

                            <div class='branch-info-container'>
                                 <p class="nearest-txt">${placeholders.nearesttext}</p> 
                                 <div class="branch-deatils dp-none"> 
                                    <p class="branch-addr"></p>
                                    <p class="branch-distance"></p>
                                 </div>
                                    <button class="btn-locate"><img src='/images/location-pointer.svg' class="locate-me-img" alt="locate-me-img">
                                    <span>${placeholders.locatetext}</span>
                                    </button>
                                 <a class="btn-locate-details dp-none">${placeholders.branchdetailstext}</a>
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
                 <h2 class="title-to-show"></h2> 
            </div>

            <div class='cards-container'>

                    <div class='cards-wrapper branch-list-wrapper'>

                            

                    </div>

            </div>
        </div>`;
  return branch_cards;
}

export async function innerBranchFunc(branchhList) {
  let innerBranch = '';
  const placeholders = await fetchPlaceholders();
  branchhList.forEach((eachBranch) => {
    const eachState = eachBranch.State;
    const eachCity = eachBranch.City;
    const eachLocationCode = eachBranch['Location Code'];
    const eachLocation = eachBranch.Location;
    innerBranch
                += `<div class='card-box'>
              <h3 class='card-title'> ${eachBranch.Location} </h3>
              <p class='card-address'>${eachBranch.Address}</p>
              <p class='card-gmail'> <span> <img src='/images/gmail.svg' alt='gmail-icon'/> </span> ${placeholders.branchlocatorgmail} </p> 
              <a href="${branchURLStr(eachLocation, eachCity, eachState, 'loans', eachLocationCode)}" id='more-details-btn'>${placeholders.moredetailtext}  </a> 
            </div>`;
    // <a href="/branch-locator/${eachState}/${eachCity}/loans-in-${eachCity}-${eachState}-${eachLocationCode}" id='more-details-btn'> More details </a>
  });
  return innerBranch;
}

export default async function decorate(block) {

  const placeholders = await fetchPlaceholders();
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
  block.innerHTML += branchLocator_Map(block, placeholders);
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

  const breadcrumbItems = [`<a href="${getMetadata("lang-path")}/branch-locator/${newState}">${newSetState}</a>`];

  if (city) {
    const newCity = formatString(city);
    const newSetCity = formatString(city, true);
    breadcrumbItems.push(`<a href="${getMetadata("lang-path")}/branch-locator/${newState}/${newCity}">${newSetCity}</a>`);
  }

  const breadCrumb = breadcrumbItems.map(item => `${separator}${item}`).join('');

  block.closest('body').querySelector('.breadcrumb nav').insertAdjacentHTML('beforeend', breadCrumb);

  let existedBreadCrumb = block.closest('body').querySelectorAll('.breadcrumb nav a');
  const existedBreadCrumbSchema = [];
   existedBreadCrumb.forEach(((a,index)=>{
    existedBreadCrumbSchema.push({
      "@type": "ListItem",
      "position": index + 1,
      "name": a.textContent,
      "item": location.origin + a.getAttribute('href')
    });
  }))

  let branchLocatorBreadCrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": existedBreadCrumbSchema
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(branchLocatorBreadCrumbSchema);
  // document.head.append(script);

}
