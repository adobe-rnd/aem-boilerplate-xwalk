import { loadScript } from "../../scripts/aem.js";
import { fetchAPI } from "../../scripts/scripts.js";
import returnLatLan from "../select-tag/getSelectedLanguage.js";
import { initMap } from "./branchlocator-api.js";
import { setLocationObj } from "./branchlocator-init.js";
import { renderCity, renderState } from "./branchlocator-render.js";
import { branchLocatorObject } from "./jsonobject.js";

const { getExcelData } = setLocationObj;

export function dropDownStateCity(){
  const result = Object.groupBy(branchLocatorObject['branch-locator'], ({ State }) => {
      const lowercaseLocation = State.toLowerCase();
      return lowercaseLocation.charAt(0).toUpperCase() + lowercaseLocation.slice(1);
  });
  return result;
}

export async function onloadBranchLocator(block) {
  if (setLocationObj.lat && setLocationObj.lng) {
    await getStateCity(setLocationObj.lat, setLocationObj.lng);
  } else {
    // Deafult Option
    setLocationObj.geoInfo.city = "Mumbai";
    setLocationObj.geoInfo.state = "Maharashtra";
    setLocationObj.geoInfo.country = "India";
    
    let defaultLatLng = getExcelData[setLocationObj.geoInfo.state]?.find(eachCityCheck =>
      eachCityCheck.City === setLocationObj.geoInfo.city
    );
    setLocationObj.lat = defaultLatLng['Latitude'];
    setLocationObj.lng = defaultLatLng['Longitude'];
  }  

  let branchhList = sortingNearestBranch(setLocationObj.lat, setLocationObj.lng, getExcelData);
  loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k").then((resolve) => {
    myMap(setLocationObj.lat, setLocationObj.lng, branchhList);
  });
  bizStateDD(getExcelData, block);
  bizCityDD(getExcelData, block);
  defaultSelectedCityState(block);
  renderCity(block, setLocationObj);
  renderState(block, setLocationObj);
  block.closest('.section').querySelector('.title-to-show').innerText = `Find all ${setLocationObj.geoInfo.city} Branches here`;
}

async function getStateCity(lat, lng) {
  return new Promise((resolve, reject) => {
    getStateName(lat, lng)
      .then(async function (response) {
        response = await response.json();
        let results = response.results;
        if (results[1]) {
          let city, region, country;
          for (var j = 0; j < results.length; j++) {
            if (results[j].types[0] === "locality") {
              for (var i = 0; i < results[j].address_components.length; i++) {
                if (results[j].address_components[i].types[0] === "locality") {
                  city = results[j].address_components[i];
                }
                if (results[j].address_components[i].types[0] === "administrative_area_level_1") {
                  region = results[j].address_components[i];
                }
                if (results[j].address_components[i].types[0] === "country") {
                  country = results[j].address_components[i];
                }
              }
              break;
            }
          }

          setLocationObj.geoInfo.city = city.long_name;
          setLocationObj.geoInfo.state = region.long_name;
          setLocationObj.geoInfo.country = country.long_name;
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

function sortingNearestBranch(lat, lng, getExcelData) {
  const filteredLocations = Object.values(getExcelData)
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
          title: eachLagLong['Address'],
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

export function bizStateDD(getExcelData, block){
    setLocationObj.stateLi = Object.keys(getExcelData)
      .map((state) => `<li class='state-option option' data-info="${state}">${state}</li>`)
      .join("");
}

export function bizCityDD(getExcelData, block){
    setLocationObj.cityhash = {};
    setLocationObj.cityLi = Object.values(getExcelData[setLocationObj.geoInfo.state])
      .reduce((acc, { City }) => {
        if (!setLocationObj.cityhash.hasOwnProperty(City)) {
          setLocationObj.cityhash[City] = City;
          acc += `<li class='city-option option' data-info=${City}>${City}</li>`;
        }
        return acc;
      }, "");
}

function defaultSelectedCityState(block){
    let selectState = block.closest('.section').querySelector('.deafult-state-selected');
    let selectCity = block.closest('.section').querySelector('.deafult-city-selected');
    selectState.innerText = setLocationObj.geoInfo.state;
    selectCity.innerText = setLocationObj.geoInfo.city;
}

export function onClickState(block){
  block.closest('.section').querySelectorAll('.state-option').forEach(function (eachState){
      eachState.addEventListener('click', function (e) {
        setLocationObj.geoInfo.state = e.target.dataset.info;
        let excelValueObj = Object.values(getExcelData[setLocationObj.geoInfo.state]);
        setLocationObj.geoInfo.city = excelValueObj[0]['City'];
        setLocationObj.lat = excelValueObj[0]['Latitude'];
        setLocationObj.lng = excelValueObj[0]['Longitude'];
        bizCityDD(getExcelData);
        defaultSelectedCityState(block);  
        renderCity(block);
        let branchhList = sortingNearestBranch(setLocationObj.lat, setLocationObj.lng, getExcelData);
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k").then((resolve) => {
          myMap(setLocationObj.lat, setLocationObj.lng, branchhList);
        });
        e.target.closest('ul').classList.add('dp-none');
      });
  });
}

export function onClickCity(block){
  block.closest('.section').querySelectorAll('.city-option').forEach(function (eachCity){
      eachCity.addEventListener('click', function (e) {
        setLocationObj.geoInfo.city = e.target.dataset.info;
        let excelValueObj = Object.values(getExcelData[setLocationObj.geoInfo.state]).filter(eachCityCheck => 
          eachCityCheck.City === setLocationObj.geoInfo.city
        );
        setLocationObj.lat = excelValueObj[0]['Latitude'];
        setLocationObj.lng = excelValueObj[0]['Longitude'];
        defaultSelectedCityState(block);
        let branchhList = sortingNearestBranch(setLocationObj.lat, setLocationObj.lng, getExcelData);
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k").then((resolve) => {
          myMap(setLocationObj.lat, setLocationObj.lng, branchhList);
        });
        e.target.closest('ul').classList.add('dp-none');
        block.closest('.section').querySelector('.title-to-show').innerText = `Find all ${setLocationObj.geoInfo.city} Branches here`;
      });
  });
}  


export function locateMeClick(block){
    let locateMeEvent = block.closest('.section').querySelector('.btn-locate');
    locateMeEvent.addEventListener('click', async function (e){
        let {lat, lng} = await returnLatLan();
        setLocationObj.lat = lat;
        setLocationObj.lng = lng;
        if(setLocationObj.lat && setLocationObj.lng){
        await getStateCity(setLocationObj.lat, setLocationObj.lng);
        let branchhList = sortingNearestBranch(setLocationObj.lat, setLocationObj.lng, getExcelData);
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k").then((resolve) => {
          myMap(setLocationObj.lat, setLocationObj.lng, branchhList);
          let gettingStortedBranchlat = branchhList[0]["Latitude"];
          let gettingStortedBranchlag = branchhList[0]["Longitude"];
          initMap(gettingStortedBranchlat, gettingStortedBranchlag);
          let currentDistance = calculateDistance(setLocationObj.lat, setLocationObj.lng, gettingStortedBranchlat, gettingStortedBranchlag);
          block.closest('.section').querySelector('.branch-addr').innerText = `Branch - ${branchhList[0]['Location']}`;
          block.closest('.section').querySelector('.branch-distance').innerText = `Distance - ${Math.round(currentDistance)} km `;
          block.closest('.section').querySelector('.title-to-show').innerText = `Find all ${setLocationObj.geoInfo.city} Branches here`;
          block.closest('.section').querySelector('.btn-locate').classList.add('dp-none');
          block.closest('.section').querySelector('.btn-locate-details').classList.remove('dp-none');
          block.closest('.section').querySelector('.branch-deatils').classList.remove('dp-none');
        });
        bizStateDD(getExcelData, block);
        bizCityDD(getExcelData, block);
        defaultSelectedCityState(block);
        renderCity(block, setLocationObj);
        renderState(block, setLocationObj);        
        }else{
          block.closest('.section').querySelector('.nearest-txt').innerText = "Kindly enable your Location and Refersh the page";
          this.classList.add('dp-none');
        }
    });
}


