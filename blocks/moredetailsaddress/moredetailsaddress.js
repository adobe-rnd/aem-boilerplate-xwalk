import { getMetadata } from "../../scripts/aem.js";
import { CFApiCall, fetchAPI, getDay } from "../../scripts/scripts.js";

export const setLocationObj = {
  getExcelData: null,
  geoInfo: {
    city: "",
    state: "",
    country: "",
    location: "",
    locationcode: "",
  },
};

const GOOGLE_MAPS_API_KEY = "AIzaSyDx1HwnCLjSSIm_gADqaYAZhSBh7hgcwTQ";


const locationInLatLan = {};

export default async function decorate(block) {
  const props = Array.from(block.children, (row) => row.firstElementChild);
  const [title, desktopdes, mobiledes, openingtime, info, image, imagealt, linkURL] = props;

  const url = linkURL.textContent.trim();
  const urlResponse = await CFApiCall(url);
  const jsonResponseData = urlResponse?.data;

  setLocationObj.getExcelData = sessionStorage.getItem("data")
    ? JSON.parse(sessionStorage.getItem("data"))
    : dropDownStateCity(jsonResponseData);

  if (!sessionStorage.getItem("data")) {
    sessionStorage.setItem("data", JSON.stringify(setLocationObj.getExcelData));
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


async function onbranchDetails() {
  const searchBranchURL = location.href;
  const splitSearch = searchBranchURL.split("/").pop();

  if (splitSearch.includes("loans-in")) {
    const currentLocation = searchBranchURL.split("/").pop().split("-").pop();
    const flatLocationData = Object.values(setLocationObj.getExcelData).flat();
    const foundLocation = flatLocationData.find((location) => location["Location Code"] == currentLocation);

    if (foundLocation) {
      Object.assign(setLocationObj.geoInfo, {
        state: firstLetterCap(foundLocation.State),
        city: firstLetterCap(foundLocation.City),
        locationcode: foundLocation["Location Code"],
        location: foundLocation.Location,
      });
      Object.assign(setLocationObj, {
        lat: foundLocation.Latitude,
        lng: foundLocation.Longitude,
        address: foundLocation.Address,
        pincode: foundLocation.Pincode,
        pagecontent: foundLocation["On Page Content"],
      });
    }
  }

  // await getStateCity(setLocationObj.lat, setLocationObj.lng);

  renderData();

  const userLocation = await returnLatLan();
  if (userLocation) {
    setLocationObj.distance = calculateDistance(setLocationObj.lat, setLocationObj.lng, userLocation.lat, userLocation.lng);
    const distanceElement = document.createElement("li");
    const addressUl = document.querySelector(".address-info ul");
    if (setLocationObj.distance <= 40) {
      distanceElement.innerText = `${setLocationObj.distance.toFixed()} Km away from your location`;
      addressUl.appendChild(distanceElement)
    } else {
      distanceElement.remove();
    }
  }

  // setLocationObj.storedata = sortingNearestBranch(setLocationObj.lat, setLocationObj.lng, setLocationObj.getExcelData);
  setLocationObj.storedata = sortByCityandState(setLocationObj.getExcelData[setLocationObj.geoInfo.state]);

  // setTimeout(reviewRender, 3000);
/*   const reviewRatingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        reviewRender();
        reviewRatingObserver.unobserve(document.querySelector(".branchcustomer-review-cards"))
      }
    });
  }, { rootMargin: "150px" })
  reviewRatingObserver.observe(document.querySelector(".branchcustomer-review-cards")); */

}

/* async function getStateCity(lat, lng) {
  try {
    const response = await getStateName(lat, lng);
    const { results } = await response.json();
    if (results && results[0]?.place_id) {
      // for (const result of results) {
      //   if (result.place_id) {
          // const reviewRating = await getReviewRating(result.place_id);
          const reviewRating = await getReviewRating(results[0].place_id);
          if (reviewRating.result.reviews && reviewRating.result?.opening_hours?.weekday_text) {
            setLocationObj.review = reviewRating.result.reviews;
            setLocationObj.working = reviewRating.result.opening_hours.weekday_text;
            // break;
          }
      //   }
      // }
    }
  } catch (err) {
    console.error(err);
  }
} */

/* function getStateName(lat, lan) {
  return fetchAPI("GET", `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&sensor=true&key=${GOOGLE_MAPS_API_KEY}`);
} */

function returnLatLan() {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          locationInLatLan.lat = position.coords.latitude;
          locationInLatLan.lng = position.coords.longitude;
          resolve(locationInLatLan);
        },
        (error) => {
          console.error("Error getting user location:", error);
          resolve(null);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      resolve(null);
    }
  });
}

/* async function getReviewRating(placeID) {
  const response = await fetchAPI("GET", `/content/piramalfinance/api/mapapi.json?place_id=${placeID}&key=${GOOGLE_MAPS_API_KEY}`);
  // const response = await fetchAPI("GET", `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=${GOOGLE_MAPS_API_KEY}`);
  return response.json();
} */

function renderData() {
  document.querySelector(".address-title h1").innerText = setLocationObj.geoInfo.location;
  document.querySelector(".address-desktop p").innerText = setLocationObj.address;
  document.querySelector(".address-mobile p").innerText = setLocationObj.address;
 /*  const currentDay = getDay();
  setLocationObj.working?.forEach((element) => {
    if (element.includes(currentDay)) {
      // document.querySelector(".address-timing p").innerText = `${element}`;
    }
  }); */
}

/* function reviewRender() {
  const ratingSpan = renderRatingDiv();
  if (!ratingSpan) {
    return false;
  }
  try {
    document.querySelector(".branchcustomer-review-cards").querySelector(".carousel-inner").innerHTML = ratingSpan;
    const reviewCards = document.querySelector(".branchcustomer-review-cards").querySelector(".carousel-inner")?.querySelectorAll(".carousel-item");
    const currentNextButton = document.querySelector(".branchcustomer-review-cards").querySelector(".glider-next");
    const currentPrevButton = document.querySelector(".branchcustomer-review-cards").querySelector(".glider-prev");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          const intersecting = entry.isIntersecting;
          if (intersecting) {
            new Glider(entry.target, {
              slidesToShow: 1,
              slidesToScroll: 1,
              draggable: true,
              scrollLock: true,
              arrows: {
                prev: currentPrevButton,
                next: currentNextButton,
              },
              responsive: [
                { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                {
                  breakpoint: 1025,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    scrollLock: true,
                    draggable: true,
                  },
                },
              ],
            });
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: "100px" }
      );
    });
    observer.observe(document.querySelector(".branchcustomer-review-cards").querySelector(".carousel-inner"));
  
    if (reviewCards.length <= 3) {
      document.querySelector(".branchcustomer-review-cards").querySelector(".carousel-navigation-buttons").classList.add("dp-none");
    }
  } catch (error) {
    console.error("Error: Review Rating Logic", error);
  }
} */

/* function renderRatingDiv() {
  if (!setLocationObj.review || setLocationObj.review.length === 0) {
    document.querySelector(".branchcustomer-review-cards").classList.add("dp-none");
    return "";
  }

  const starColorIcon = '<span class="icon icon-star_Color"><img data-icon-name="star_Color" src="/icons/star_Color.svg" alt="" loading="lazy" /></span>';
  const starOutlineIcon = '<span class="icon icon-star_outline"><img data-icon-name="star_outline" src="/icons/star_outline.svg" alt="" loading="lazy" /></span>';

  return setLocationObj.review.map(eachEle => {
    const starToShow = Math.floor(eachEle.rating);
    const remainingStars = 5 - starToShow;
    
    const starDiv = starColorIcon.repeat(starToShow) + starOutlineIcon.repeat(remainingStars);

    const subStringText = eachEle.text.length > 125 ? `${eachEle.text.substring(0, 125)}...` : eachEle.text;

    return `
      <div class="teaser block carousel-item light">
        <div class="background">
          <div class="front-picture"></div>
          <div class="foreground">
            <div class="text">
              <div class="title">
                <h3 id="${eachEle.author_name}">${eachEle.author_name}</h3>
              </div>
              <div class="long-description">
                <p>Posted on: ${eachEle.relative_time_description}</p>
                <p>${starDiv}</p>
              </div>
              <div class="short-description"><p>${subStringText}</p></div>
              <div class="cta"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
} */

function nearBLBreadCrumb() {
  const { city, location, locationcode, state } = setLocationObj.geoInfo;

  const formatString = (str, capitalize = false) => {
    const formatted = str.toLowerCase().replace(/\s+/g, '-');
    return capitalize ? formatted.charAt(0).toUpperCase() + formatted.slice(1) : formatted;
  };

  const newState = formatString(state);
  const newCity = formatString(city);
  const newLocation = formatString(location.replace(/[()/]/g, '').trim());
  const newSetState = formatString(state, true);
  const newSetCity = formatString(city, true);
  const newSetLocation = location.charAt(0).toUpperCase() + location.slice(1);

  const separatorSVG = '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.00195L4.29293 5.70902C4.68182 5.32013 4.68182 4.68377 4.29293 4.29488L1 1.00195" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  const separator = `<span class="breadcrumb-separator">${separatorSVG}</span>`;

  const breadcrumbItems = [
    `<a href="${getMetadata("lang-path")}/branch-locator/${newState}">${newSetState}</a>`,
  ];

  if (newCity == newLocation) {
    breadcrumbItems.push(`<a href="${getMetadata("lang-path")}/branch-locator/${newState}/${newCity}">${newSetCity}</a>`);
  }else if (newCity !== newLocation) {
    breadcrumbItems.push(`<a href="${getMetadata("lang-path")}/branch-locator/${newState}/${newCity}">${newSetCity}</a>`);
    breadcrumbItems.push(`<a href="${getMetadata("lang-path")}/branch-locator/loans-in-${newLocation}-${newCity}-${newState}-${locationcode}">${newSetLocation}</a>`);
  }

  const breadCrumb = breadcrumbItems.join(separator);

  document.querySelector("body .breadcrumb nav").insertAdjacentHTML("beforeend", separator + breadCrumb);
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

// function sortByCityandState(data) {
//   var fliterLocation = data.filter(function (location) {
//     return location.City.toLowerCase() === setLocationObj.geoInfo.city.toLowerCase();
//   });
//   return fliterLocation;
// }

/* function sortingNearestBranch(lat, lng, data) {
  const filteredLocations = Object.values(data)
    .flat()
    .map((location) => {
      if (location.Latitude != setLocationObj.lat && location.Longitude != setLocationObj.lng) {
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
} */

function dropDownStateCity(response) {
  return response.reduce((acc, location) => {
    const state = location.State.charAt(0).toUpperCase() + location.State.slice(1).toLowerCase();
    if (!acc[state]) {
      acc[state] = [];
    }
    acc[state].push(location);
    return acc;
  }, {});
}

function firstLetterCap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function sortByCityandState(data) {
  var fliterLocation = data.filter(function (location) {
    return location.City.toLowerCase() === setLocationObj.geoInfo.city.toLowerCase();
  });
  return fliterLocation;
}
