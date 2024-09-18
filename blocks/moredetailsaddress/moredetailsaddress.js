import { fetchAPI, getDay } from "../../scripts/scripts.js";


export let setLocationObj = {};
let locationInLatLan = {};
setLocationObj.stateLi = "";
setLocationObj.cityLi = "";
setLocationObj.lat = "";
setLocationObj.lng = "";
setLocationObj.cityhash = {};
setLocationObj.address = "";
setLocationObj.geoInfo = {
  city: "",
  state: "",
  country: "",
  location: "",
  locationcode: "",
};

export default async function decorate(block) {

    const props = Array.from(block.children, (row) => row.firstElementChild);

    const  [title, desktopdes, mobiledes, openingtime, info, image, imagealt, linkURL] = props;

    let url = linkURL.textContent.trim();
    let urlRepoonse = await CFApiCall(url);
    const jsonResponseData = JSON.parse(urlRepoonse?.data[0]?.branchlocatorobj);

    if(sessionStorage.getItem('data')){
      setLocationObj.getExcelData = JSON.parse(sessionStorage.getItem('data'));
    }else{
        setLocationObj.getExcelData = dropDownStateCity(jsonResponseData);
        sessionStorage.setItem('data', JSON.stringify(setLocationObj.getExcelData));
    }

    image?.querySelector("picture > img")?.setAttribute("alt", imagealt?.textContent?.trim() || "");

    const html = `
        <div class="address-wrapper">
            <div class="address-title">${title.innerHTML}</div>
            <div class="address-desktop">${desktopdes.innerHTML}</div>
            <div class="address-mobile">${mobiledes.innerHTML}</div>
            <div class="address-timing">${openingtime.innerHTML}</div>
            <div class="address-info">${info.innerHTML}</div>
            <div class="address-img">${image.innerHTML}</div>
        </div>
    `;

    block.innerHTML = html;

    
    await onbranchDetails();
    nearBLBreadCrumb();
    
}

export function returnLatLan() {
    return new Promise(function (resolve, reject) {

        if ("geolocation" in navigator) {
            // Prompt user for permission to access their location
            navigator.geolocation.getCurrentPosition(
                // Success callback function
                (position) => {
                    // Get the user's latitude and longitude coordinates
                    locationInLatLan.lat = position.coords.latitude;
                    locationInLatLan.lng = position.coords.longitude;

                    resolve(locationInLatLan);
                    // Do something with the location data, e.g. display on a map
                },
                // Error callback function
                (error) => {
                    resolve(error);
                    // Handle errors, e.g. user denied location sharing permissions
                    console.error("Error getting user location:", error);
                }
            );
        } else {
            // Geolocation is not supported by the browser
            console.error("Geolocation is not supported by this browser.");
        }
    })
}

async function getStateCity(lat, lng) {
    return new Promise((resolve, reject) => {
      getStateName(lat, lng)
        .then(async function (response) {
          response = await response.json();
          let results = response.results;
          let reviewRating = "";
          if (results[0]) {
            for (var j = 0; j < results.length; j++) {
                  if (results[j].place_id) {
                     reviewRating = await getReviewRating(results[j].place_id);
                    if(reviewRating.result.reviews && reviewRating.result.opening_hours.weekday_text){
                      setLocationObj.review = reviewRating.result.reviews;
                      setLocationObj.working = reviewRating.result.opening_hours.weekday_text;
                      console.log(reviewRating);
                      break;
                    }
                  } 
            }
        
            resolve();
          } else {
            reject("No results found");
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  function getStateName(lat, lan) {
    return new Promise(function (resolve, reject) {
      fetchAPI("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lan + "&sensor=true&key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k")
        .then(function (res) {
          resolve(res);
        })
        .catch(function (err) {
          resolve(err);
        });
    });
  }

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


async function getReviewRating(placeID){
  return new Promise(function(resolve, reject){
    fetchAPI('GET',`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k`) // api for the get request
    .then((response) => response.json())
    .then((data) => resolve(data)).catch(error => console.log(error));

    /* fetchAPI('GET', `https://maps.googleapis.com/maps/api/place/details/json?place_id=${setLocationObj.placeid}&key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k`).then((res)=>{
      resolve(res);
    })
    .catch(function(err){
      resolve(err);
    }) */

  })
}

export async function CFApiCall(cfurl) {
  const response = await fetchAPI("GET", cfurl);
  const responseJson = await response.json();
  return responseJson;
}

/* async function onbranchDetails(block) {
  let locationCodeURL = location.href.split("/").pop().split("-").pop();

  if (locationCodeURL && location.href.includes("/branch-locator/")) {
    let splitURL = location.href.split("/");

    if (splitURL[4]) {
      setLocationObj.geoInfo.state = splitURL[4];
      setLocationObj.geoInfo.state = setLocationObj.geoInfo.state.charAt(0).toUpperCase() + setLocationObj.geoInfo.state.slice(1).replace("-", " ");
    }

    // City Check
    if (splitURL[5]) {
      setLocationObj.geoInfo.city = splitURL[5];
      setLocationObj.geoInfo.city = setLocationObj.geoInfo.city.charAt(0).toUpperCase() + setLocationObj.geoInfo.city.slice(1).replace("-", " ");
    }

    // Location Code Check
    if (splitURL[6]) {
      setLocationObj.geoInfo.locationcode = splitURL[6].split("-").pop();
    }

    let defaultLatLng = setLocationObj.getExcelData[setLocationObj.geoInfo.state]?.find((eachLocationCode) => eachLocationCode["Location Code"] == locationCodeURL);

    if (defaultLatLng) {
      setLocationObj.geoInfo.city = defaultLatLng["City"];
      setLocationObj.geoInfo.state = defaultLatLng["State"];
      setLocationObj.lat = defaultLatLng["Latitude"];
      setLocationObj.lng = defaultLatLng["Longitude"];
      setLocationObj.address = defaultLatLng["Address"];
      setLocationObj.pincode = defaultLatLng["Pincode"];
    }

    await getStateCity(setLocationObj.lat, setLocationObj.lng);

    // review rating address no free-parking distance

    returnLatLan().then((res) => {
      if(locationInLatLan.lat && locationInLatLan.lng){
        setLocationObj.distance = calculateDistance(setLocationObj.lat,setLocationObj.lng, locationInLatLan.lat,locationInLatLan.lng);
        if(setLocationObj.distance.toFixed() <= 40){
          document.querySelectorAll('.address-info ul li')[2].innerText = `${setLocationObj.distance.toFixed()} Km away from your location`;
        }else{
          document.querySelectorAll('.address-info ul li')[2].remove();
        }
      }
    });

    let sortedBranch = sortingNearestBranch(setLocationObj.lat, setLocationObj.lng, setLocationObj.getExcelData);
    setLocationObj.storedata =  sortedBranch;
    
    renderData();
    setTimeout(() => {
      reviewRender();
      // settingCurrentLoct(setLocationObj);
    }, 3000);

  }
} */

async function onbranchDetails(block) {

  let searchBranchURL = location.href;
  // let searchBranchURL = "https://www.piramalfinance.com/branch-locator/loans-in-anakapalle-andhra-pradesh-6391";

  let splitSearch = searchBranchURL.split("/").pop();
  if (splitSearch.includes("loans-in")) {
    let currentLocation = searchBranchURL.split("/").pop().split("-").pop();
    const flatLocationData = Object.values(setLocationObj.getExcelData).flat(); // Flattening the nested arrays
    const foundLocation = flatLocationData.find((location) => location["Location Code"] == currentLocation);
    const { State, City, "Location Code": locationCode, Location, Latitude, Longitude, Address, Pincode, "On Page Content": pageContent } = foundLocation;
    setLocationObj.geoInfo.state = State;
    setLocationObj.geoInfo.city = City;
    setLocationObj.geoInfo.locationcode = locationCode;
    setLocationObj.geoInfo.location = Location;
    setLocationObj.lat = Latitude;
    setLocationObj.lng = Longitude;
    setLocationObj.geoInfo.country = "India"; // Country
    setLocationObj.address = Address;
    setLocationObj.pincode = Pincode;
    setLocationObj.pagecontent = pageContent;
  }

    await getStateCity(setLocationObj.lat, setLocationObj.lng);

    // review rating address no free-parking distance

    returnLatLan().then((res) => {
      if(locationInLatLan.lat && locationInLatLan.lng){
        setLocationObj.distance = calculateDistance(setLocationObj.lat,setLocationObj.lng, locationInLatLan.lat,locationInLatLan.lng);
        if(setLocationObj.distance.toFixed() <= 40){
          document.querySelectorAll('.address-info ul li')[2].innerText = `${setLocationObj.distance.toFixed()} Km away from your location`;
        }else{
          document.querySelectorAll('.address-info ul li')[2].remove();
        }
      }else{
        document.querySelectorAll('.address-info ul li')[2].remove();
      }
    });

    let sortedBranch = sortingNearestBranch(setLocationObj.lat, setLocationObj.lng, setLocationObj.getExcelData);
    setLocationObj.storedata =  sortedBranch;
    
    renderData();
    setTimeout(() => {
      reviewRender();
    }, 3000);

}

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

function sortingNearestBranch(lat, lng, data) {
  const filteredLocations = Object.values(data)
    .flat()
    .map((location) => {
      if(location['Latitude'] != setLocationObj.lat  && location['Longitude'] != setLocationObj.lng){
        return {
          ...location,
          distance: calculateDistance(lat, lng, location.Latitude, location.Longitude),
        };
      }
    })
    .filter((location) => location?.distance <= 40)
    .sort((a, b) => a.distance - b.distance);

    console.log(filteredLocations);

    return filteredLocations;

}


function renderData(){
  document.querySelector('.address-title h1').innerText = setLocationObj.geoInfo.city;
  document.querySelector('.address-desktop p').innerText = setLocationObj.address;
  document.querySelector('.address-mobile p').innerText = setLocationObj.address;
  let currentDay = getDay();
  setLocationObj.working?.forEach(element => {
    if(element.includes(currentDay)){
      document.querySelector('.address-timing p').innerText = `${element}`;
    }
  });

}

function reviewRender(){
  let ratingSpan = renderRatingDiv();
  if(!ratingSpan){
    return false;
  }
  document.querySelector(".branchcustomer-review-cards").querySelector(".carousel-inner").innerHTML = ratingSpan;
  let reviewCards = document.querySelector(".branchcustomer-review-cards").querySelector(".carousel-inner").querySelectorAll(".carousel-item");
  let currentNextButton = document.querySelector(".branchcustomer-review-cards").querySelector(".glider-next");
  let currentPrevButton = document.querySelector(".branchcustomer-review-cards").querySelector(".glider-prev");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const intersecting = entry.isIntersecting
      if(intersecting){
        new Glider(entry.target, {
            "slidesToShow": 1,
            "slidesToScroll": 1,
            "scrollLock": true,
            "draggable": true,
            "arrows": {
              prev: currentPrevButton,
              next: currentNextButton
            },
            "responsive": [
              { "breakpoint": 767, "settings": { "slidesToShow": 2, "slidesToScroll": 1 } },
              { "breakpoint": 1025, "settings": { "slidesToShow": 3, "slidesToScroll": 1, "scrollLock": true, "draggable": true, "settings": { "slidesToShow": 2, "slidesToScroll": 1, "duration": 0.25 } } }
            ]
          });
          // observer.unobserve(entry.target);
      }
    }, { rootMargin: "50px" });
  });
  observer.observe(document.querySelector(".branchcustomer-review-cards").querySelector(".carousel-inner"));

  if(reviewCards.length <= 3){
    document.querySelector(".branchcustomer-review-cards").querySelector(".carousel-inner").querySelector(".carousel-navigation-buttons").classList.add("dp-none");
  }
}

function renderRatingDiv () {
  let html = '';
  if(setLocationObj.review){
    setLocationObj.review.forEach(function (eachEle) {
  
      let starDiv = '';
      let starToShow = eachEle['rating'];
      if( (5 - eachEle['rating'] == 0)){
        for (let index = 0; index < starToShow; index++) {
          starDiv += `<span class="icon icon-star_Color"><img data-icon-name="star_Color" src="/icons/star_Color.svg" alt="" loading="lazy" /></span>`;
        }
      }else if(5 - eachEle['rating'] != 0){
        let subelem = 5 - eachEle['rating'];
        for (let index = 0; index < starToShow; index++) {
          starDiv += `<span class="icon icon-star_Color"><img data-icon-name="star_Color" src="/icons/star_Color.svg" alt="" loading="lazy" /></span>`;
        }
        for (let index = 0; index < subelem; index++) {
          starDiv += `<span class="icon icon-star_outline"><img data-icon-name="star_outline" src="/icons/star_outline.svg" alt="" loading="lazy" /></span>`;
        }
      }
      
     let subStringText = eachEle['text'].length > 125 ? eachEle['text']?.substring(0, 125) + '...' : eachEle['text'];
  
      html += 
      `<div class="teaser block carousel-item light">
      <div class="background">
        <div class="front-picture"></div>
        <div class="foreground">
          <div class="text">
            <div class="title">
              <h3 id="rushikesh-nasare">${eachEle['author_name']}</h3>
            </div>
            <div class="long-description">
              <p>Posted on: ${eachEle['relative_time_description']}</p>
              <p>
                ${starDiv}
              </p>
            </div>
            <div class="short-description"><p>${subStringText}</p></div>
            <div class="cta"></div>
          </div>
        </div>
      </div>
    </div>`;
    });
    return html;
  }else{
    document.querySelector(".branchcustomer-review-cards").classList.add("dp-none");
  }

}

function nearBLBreadCrumb() {
  const { city, location, locationcode, state } = setLocationObj.geoInfo;

  let breadCrumb = "";

  let newState = state.charAt(0).toLowerCase() + state.slice(1).replace(" ", "-").toLowerCase();
  let newCity = city.charAt(0).toLowerCase() + city.slice(1).replace(" ", "-").toLowerCase();
  let newLoaction = location.replace(/\s+/g, "-").replace(/[()/]/g, "").trim().toLowerCase();

  let newSetState = state.charAt(0).toUpperCase() + state.slice(1).replace(" ", "-").toLowerCase();
  let newSetCity = city.charAt(0).toUpperCase() + city.slice(1).replace(" ", "-").toLowerCase();
  let newSetLocation = location.charAt(0).toUpperCase() + location.slice(1).replace(" ", "-").toLowerCase();

  if (newCity == newLoaction) {
    breadCrumb = `<span class="breadcrumb-separator"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.00195L4.29293 5.70902C4.68182 5.32013 4.68182 4.68377 4.29293 4.29488L1 1.00195" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        <a href="/branch-locator/${newState}">${newSetState}</a>
        <span class="breadcrumb-separator"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.00195L4.29293 5.70902C4.68182 5.32013 4.68182 4.68377 4.29293 4.29488L1 1.00195" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        <a href="/branch-locator/loans-in-${newCity}-${newState}-${locationcode}">${newSetLocation}</a>
        `;
  } else {
    breadCrumb = `<span class="breadcrumb-separator"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.00195L4.29293 5.70902C4.68182 5.32013 4.68182 4.68377 4.29293 4.29488L1 1.00195" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        <a href="/branch-locator/${newState}">${newSetState}</a>
        <span class="breadcrumb-separator"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.00195L4.29293 5.70902C4.68182 5.32013 4.68182 4.68377 4.29293 4.29488L1 1.00195" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        <a href="/branch-locator/${newState}/${newCity}">${newSetCity}</a>
        <span class="breadcrumb-separator"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.00195L4.29293 5.70902C4.68182 5.32013 4.68182 4.68377 4.29293 4.29488L1 1.00195" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        <a href="/branch-locator/loans-in-${newLoaction}-${newCity}-${newState}-${locationcode}">${newSetLocation}</a>
      `;
  }
  document.querySelector("body").querySelector(".breadcrumb nav").insertAdjacentHTML("beforeend", breadCrumb);
}



/* function nearBybranch(){
  debugger;
  fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${setLocationObj.lat},${setLocationObj.lng}&radius=1500&key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k`)
  .then((response) => response.json())
  .then((data) => resolve(data)).catch(error => console.log(error));
} */
