import { locateMeInteraction, selectBranchInteraction } from "../../dl.js";
import { getMetadata, loadScript } from "../../scripts/aem.js";
import { branchURLStr, fetchAPI, selectBranchDetails } from "../../scripts/common.js";
import returnLatLan from "./sort.js";
import { initMap, searchBranchByURL } from "./branchlocator-api.js";
import { setLocationObj } from "./branchlocator-init.js";
import { renderCity, renderState } from "./branchlocator-render.js";
import { innerBranchFunc } from "./branchlocator.js";

const GOOGLE_MAPS_API_KEY = "AIzaSyDx1HwnCLjSSIm_gADqaYAZhSBh7hgcwTQ";

export const dropDownStateCity = (response) => {
  return response.reduce((acc, location) => {
    const state = location.State.charAt(0).toUpperCase() + location.State.slice(1).toLowerCase();
    if (!acc[state]) acc[state] = [];
    acc[state].push(location);
    return acc;
  }, {});
};

export async function onloadBranchLocator(block) {
  try {
    if (await searchBranchByURL()) {
      console.log("Search By URL");
    } else if (setLocationObj.lat && setLocationObj.lng) {
      await getStateCity(setLocationObj.lat, setLocationObj.lng);
    } else {
      setDefaultLocation();
    }

    updateURL();
    const branchList = getBranchList();
    await loadGoogleMapsAndRender(branchList);
    updateUI(block, branchList);
  } catch (error) {
    console.error("Error in onloadBranchLocator:", error);
  }
}

function setDefaultLocation() {
  const { geoInfo, getExcelData } = setLocationObj;
  geoInfo.city = "Mumbai";
  geoInfo.state = "Maharashtra";
  geoInfo.country = "India";

  const defaultLatLng = getExcelData[geoInfo.state]?.find((city) => city.City === geoInfo.city);
  if (defaultLatLng) {
    Object.assign(setLocationObj, {
      lat: defaultLatLng.Latitude,
      lng: defaultLatLng.Longitude,
      "geoInfo.location": defaultLatLng.Location,
    });
  }
}

async function updateURL() {
  const { geoInfo } = setLocationObj;
  const URLstate = formatURLString(geoInfo.state);
  const URLcity = formatURLString(geoInfo.city);

  if (!location.href.includes("author") && !location.href.includes(URLstate)) {
    var branchUrl = geoInfo.state && geoInfo.city ? branchURLStr(geoInfo.location, geoInfo.city, geoInfo.state, "shorthand") : branchURLStr(geoInfo.location, geoInfo.city, geoInfo.state, "shorthandstate");
    const resp = await fetch(branchUrl);
    if (resp.ok) {
      location.href = branchUrl
    } else {
      location.href = getMetadata("lang-path")+'/branch-locator/maharashtra/mumbai';
    }
  }
}

/* function getBranchList() {
  return setLocationObj.geoInfo.state && !setLocationObj.geoInfo.city
    ? sortByState(setLocationObj.getExcelData)
    : sortingNearestBranch(setLocationObj.lat, setLocationObj.lng, setLocationObj.getExcelData);
} */

function getBranchList() {
  if (setLocationObj.geoInfo.state && !setLocationObj.geoInfo.city) {
    return sortByState(setLocationObj.getExcelData)
  } else {
    return sortByCityandState(setLocationObj.getExcelData[setLocationObj.geoInfo.state]);
  }
}

function sortByCityandState(data = []) {
  var fliterLocation = data.filter(function (location) {
    return location.City.toLowerCase() === setLocationObj.geoInfo.city.toLowerCase();
  });
  return fliterLocation;
  // return sortingNearestBranch(setLocationObj.lat, setLocationObj.lng, filteredLocations);
}

async function loadGoogleMapsAndRender(branchList) {
  await loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`);
  myMap(setLocationObj.lat, setLocationObj.lng, branchList);
}

async function updateUI(block, branchList) {
  const section = block.closest(".section");
  bizStateDD(setLocationObj.getExcelData, block);
  bizCityDD(setLocationObj.getExcelData, block);
  defaultSelectedCityState(block);
  renderCity(block, setLocationObj);
  renderState(block, setLocationObj);

  const multipleBranch = await innerBranchFunc(branchList);
  section.querySelector(".title-to-show").textContent = `Find all ${setLocationObj.geoInfo.city} Branches here`;
  section.querySelector(".branch-list-wrapper").innerHTML = multipleBranch;

  selectBranchDetails(block);

  if (setLocationObj.geoInfo.state && !setLocationObj.geoInfo.city) {
    const cityWrapper = section.querySelector(".city-wrapper");
    cityWrapper.classList.remove("dp-none");
    cityWrapper.querySelector("input").focus();
  }
}

async function getStateCity(lat, lng) {
  try {
    const response = await getStateName(lat, lng);
    const { results } = await response.json();

    if (!results || results.length < 2) {
      throw new Error("No results found");
    }

    const addressComponents = results[1].address_components;
    const locationInfo = {
      city: "",
      state: "",
      country: "",
    };

    for (const component of addressComponents) {
      const type = component.types[0];
      if (type === "locality") {
        locationInfo.city = component.long_name;
      } else if (type === "administrative_area_level_1") {
        locationInfo.state = component.long_name;
      } else if (type === "country") {
        locationInfo.country = component.long_name;
      }

      if (locationInfo.city && locationInfo.state && locationInfo.country) {
        break;
      }
    }

    setLocationObj.geoInfo = locationInfo;

    // Uncomment and modify if needed:
    /* setLocationObj.getExcelData[locationInfo.state] = setLocationObj.getExcelData[locationInfo.state].filter((each) => {
      return each['Location'].includes(locationInfo.city);
    }); */
  } catch (error) {
    console.error("Error in getStateCity:", error);
    throw error;
  }
}

function getStateName(lat, lan) {
  return new Promise((resolve, reject) => {
    fetchAPI("GET", `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&sensor=true&key=AIzaSyDx1HwnCLjSSIm_gADqaYAZhSBh7hgcwTQ`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        resolve(err);
      });
  });
}

/* function sortingNearestBranch(lat, lng, data) {
  const filteredLocations = Object.values(data)
    .flat()
    .map((location) => ({
      ...location,
      distance: calculateDistance(lat, lng, location.Latitude, location.Longitude),
    }))
    .filter((location) => location.distance <= 40)
    .sort((a, b) => a.distance - b.distance);

  console.log(filteredLocations);

  return filteredLocations;
} */

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

function myMap(lat, long, sortedBranch) {
  const center = lat && long ? new google.maps.LatLng(lat, long) : new google.maps.LatLng(22.0, 75.0);

  const zoom = lat && long ? 10 : 5;

  const map = new google.maps.Map(document.querySelector(".map-container"), { center, zoom });
  addMarkers(map, sortedBranch, lat, long);
}

function addMarkers(map, sortedBranch, userLat, userLong) {
  sortedBranch.forEach((branch) => {
    new google.maps.Marker({
      position: new google.maps.LatLng(branch.Latitude, branch.Longitude),
      title: branch.Address,
      map,
    });
  });

  if (userLat && userLong) {
    new google.maps.Marker({
      position: new google.maps.LatLng(userLat, userLong),
      title: "You are here",
      icon: {
        url: "../image/location-pin.svg",
        size: new google.maps.Size(48, 48),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(24, 42),
      },
      map,
    });
  }
}

export function bizStateDD(data) {
  setLocationObj.stateLi = Object.keys(data)
    .map((state) => `<a href="${branchURLStr("", "", state, "shorthandstate")}"><li class="state-option option" data-info="${state}">${state}</li></a>`)
    .join("");
}

export function bizCityDD(data) {
  setLocationObj.cityhash = {};
  setLocationObj.cityLi = Object.values(data[setLocationObj.geoInfo.state]).reduce((acc, { City }) => {
    if (!setLocationObj.cityhash[City]) {
      setLocationObj.cityhash[City] = City;
      acc += `<a href="${branchURLStr("", City, setLocationObj.geoInfo.state, "shorthand")}"><li class="city-option option" data-info="${City}">${City}</li></a>`;
    }
    return acc;
  }, "");
}

function defaultSelectedCityState(block) {
  const section = block.closest(".section");
  section.querySelector(".default-state-selected").textContent = setLocationObj.geoInfo.state;
  section.querySelector(".default-city-selected").textContent = setLocationObj.geoInfo.city;
}

export function onClickState(block) {
  block
    .closest(".section")
    .querySelectorAll(".state-option")
    .forEach((eachState) => {
      eachState.addEventListener("click", (e) => handleStateClick(e, block));
    });
}

export function onClickCity(block) {
  block
    .closest(".section")
    .querySelectorAll(".city-option")
    .forEach((eachCity) => {
      eachCity.addEventListener("click", (e) => handleCityClick(e, block));
    });
}

export function locateMeClick(block) {
  const locateMeEvent = block.closest(".section").querySelector(".btn-locate");
  locateMeEvent.addEventListener("click", (e) => handleLocateMeClick(e, block));

  try {
    const branchDetailBtn = block.closest(".section").querySelector(".btn-locate-details");
    branchDetailBtn.addEventListener("click", handleBranchDetailClick);
  } catch (error) {
    console.warn(error);
  }
}

function formatURLString(str) {
  return str.charAt(0).toLowerCase() + str.slice(1).replaceAll(" ", "-").toLowerCase();
}

async function handleStateClick(e, block) {
  try {
    const state = e.target.dataset.info;
    setLocationObj.geoInfo.state = state;

    const excelValueObj = Object.values(setLocationObj.getExcelData[state])[0];
    setLocationObj.geoInfo.city = excelValueObj.City;
    setLocationObj.lat = excelValueObj.Latitude;
    setLocationObj.lng = excelValueObj.Longitude;

    bizCityDD(setLocationObj.getExcelData);
    defaultSelectedCityState(block);
    renderCity(block);

    // const branchList = sortingNearestBranch(setLocationObj.lat, setLocationObj.lng, setLocationObj.getExcelData);
    const branchList = sortByCityandState(setLocationObj.getExcelData[setLocationObj.geoInfo.state]);

    await loadGoogleMapsAndRender(branchList);

    const multipleBranch = await innerBranchFunc(branchList);
    block.closest(".section").querySelector(".branch-list-wrapper").innerHTML = multipleBranch;

    e.target.closest("ul").classList.add("dp-none");
  } catch (error) {
    console.error("Error in handleStateClick:", error);
  }
}

async function handleCityClick(e, block) {
  try {
    const city = e.target.dataset.info;
    setLocationObj.geoInfo.city = city;

    const excelValueObj = Object.values(setLocationObj.getExcelData[setLocationObj.geoInfo.state]).find((cityCheck) => cityCheck.City === city);

    setLocationObj.lat = excelValueObj.Latitude;
    setLocationObj.lng = excelValueObj.Longitude;

    defaultSelectedCityState(block);

    // const branchList = sortingNearestBranch(setLocationObj.lat, setLocationObj.lng, setLocationObj.getExcelData);
    const branchList = sortByCityandState(setLocationObj.getExcelData[setLocationObj.geoInfo.state]);

    await loadGoogleMapsAndRender(branchList);

    const multipleBranch = await innerBranchFunc(branchList);
    const section = block.closest(".section");
    section.querySelector(".branch-list-wrapper").innerHTML = multipleBranch;
    section.querySelector(".title-to-show").textContent = `Find all ${city} Branches here`;

    e.target.closest("ul").classList.add("dp-none");
  } catch (error) {
    console.error("Error in handleCityClick:", error);
  }
}

async function handleLocateMeClick(e, block) {
  try {
    locateMeInteraction();

    const { lat, lng } = await returnLatLan();
    if (!lat || !lng) {
      updateUIForNoLocation(block, e.target);
      return;
    }

    Object.assign(setLocationObj, { lat, lng });

    let perviousCity = setLocationObj.geoInfo.city;
    let perviousState = setLocationObj.geoInfo.state;

    await getStateCity(lat, lng);
    // const branchList = sortingNearestBranch(lat, lng, setLocationObj.getExcelData);
    setLocationObj.geoInfo.state = setLocationObj.geoInfo.state ? firstLetterCap(setLocationObj.geoInfo.state) : setLocationObj.geoInfo.state;
    
    let branchList = sortByCityandState(setLocationObj.getExcelData[setLocationObj.geoInfo.state]);

    if(branchList.length == 0){
      Object.assign(setLocationObj.geoInfo, { 
        state : perviousState,
        city : perviousCity
       });
      branchList = sortByCityandState(setLocationObj.getExcelData[setLocationObj.geoInfo.state]);
    }

    await loadGoogleMapsAndRender(branchList);

    const [nearestBranch] = branchList;
    initMap(nearestBranch.Latitude, nearestBranch.Longitude);

    const currentDistance = calculateDistance(lat, lng, nearestBranch.Latitude, nearestBranch.Longitude);
    updateUIAfterLocateMe(block, nearestBranch, currentDistance);

    await updateDropdownsAndRender(block);

    renderBranchList(block, branchList);
    selectBranchDetails(block);

  } catch (error) {
    console.error("Error in handleLocateMeClick:", error);
    // Consider adding user-friendly error handling here
  }
}

function updateUIForNoLocation(block, target) {
  block.closest(".section").querySelector(".nearest-txt").textContent = "Kindly enable your Location and Refresh the page";
  target.closest('.btn-locate > span').classList.add('dsp-none');
}

async function updateDropdownsAndRender(block) {
  bizStateDD(setLocationObj.getExcelData, block);
  bizCityDD(setLocationObj.getExcelData, block);
  defaultSelectedCityState(block);
  renderCity(block, setLocationObj);
  renderState(block, setLocationObj);
}

async function renderBranchList(block, branchList) {
  const multipleBranch = await innerBranchFunc(branchList);
  block.closest(".section").querySelector(".branch-list-wrapper").innerHTML = multipleBranch;
}


function handleBranchDetailClick(e) {
  try {
    const container = e.target.closest(".branch-info-container");
    const dataAnalytics = {
      cta_position: container?.querySelector(".nearest-txt")?.textContent.trim(),
      branch_name: container?.querySelector(".branch-deatils .branch-addr")?.textContent.trim().split("-")[1]?.trim(),
    };
    selectBranchInteraction(dataAnalytics);
  } catch (error) {
    console.warn("Error in handleBranchDetailClick:", error);
  }
}

// Helper functions

function updateUIAfterLocateMe(block, nearestBranch, currentDistance) {
  const section = block.closest(".section");
  section.querySelector(".branch-addr").textContent = `Branch - ${nearestBranch.Location}`;
  section.querySelector(".branch-distance").textContent = `Distance - ${currentDistance.toFixed(1)} km`;
  section.querySelector(".title-to-show").textContent = `Find all ${setLocationObj.geoInfo.city} Branches here`;
  section.querySelector(".btn-locate").classList.add("dp-none");
  section.querySelector(".btn-locate-details").classList.remove("dp-none");
  section.querySelector(".branch-deatils").classList.remove("dp-none");

  setLocationObj.geoInfo.locationcode = nearestBranch["Location Code"];
  setLocationObj.geoInfo.location = nearestBranch.Location;

  const settingBranchURL = branchURLStr(setLocationObj.geoInfo.location, setLocationObj.geoInfo.city, setLocationObj.geoInfo.state, "loans", setLocationObj.geoInfo.locationcode);
  section.querySelector(".btn-locate-details").setAttribute("href", settingBranchURL);
}

function sortByState(data) {
  return Object.values(data[setLocationObj.geoInfo.state]);
}

function firstLetterCap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

