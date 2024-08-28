import { fetchAPI } from "../../scripts/scripts.js";
import { lat, lng, setLocationObj } from "./branchlocator-init.js";
import { branchLocatorObject } from "./jsonobject.js";

export function onloadBranchLocator(block) {
  if (lat && lng) {
    const { getExcelData, cityhash} = setLocationObj;
    debugger;
    getStateCity(lat, lng);
    bizStateDD(getExcelData, block);
    bizCityDD(getExcelData, block);
  }else{

  }
}



export function bizStateDD(getExcelData, block){
    setLocationObj.stateLi = Object.keys(getExcelData)
      .map((state) => `<li class='state-option option' data-state-info="${state}">${state}</li>`)
      .join("");
}

export function bizCityDD(getExcelData, block){
    debugger;
    setLocationObj.cityLi = Object.values(getExcelData)
      .flat()
      .reduce((acc, { City }) => {
        if (!cityhash.hasOwnProperty(City)) {
          cityhash[City] = City;
          acc += `<li class='city-option option' data-city-info=${City}>${City}</li>`;
        }
        return acc;
      }, "");
}

export function dropDownStateCity(){
    const result = Object.groupBy(branchLocatorObject['branch-locator'], ({ State }) => {
        const lowercaseLocation = State.toLowerCase();
        return lowercaseLocation.charAt(0).toUpperCase() + lowercaseLocation.slice(1);
    });
    return result;
}

function getStateCity(lat, lng) {
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

  getStateName(lat, lng).then(async function (response) {
    response = await response.json();
    let results = response.results;
    if (results[1]) {
      var indice = 0;
      let city, region, country;
      for (var j = 0; j < results.length; j++) {
        if (results[j].types[0] == "locality") {
          indice = j;
          break;
        }
      }
      for (var i = 0; i < results[j].address_components.length; i++) {
        if (results[j].address_components[i].types[0] == "locality") {
          //this is the object you are looking for City
          city = results[j].address_components[i];
        }
        if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
          //this is the object you are looking for State
          region = results[j].address_components[i];
        }
        if (results[j].address_components[i].types[0] == "country") {
          //this is the object you are looking for
          country = results[j].address_components[i];
        }
      }

      //city data
      setLocationObj.geoInfo.city = city.long_name;
      setLocationObj.geoInfo.state = region.long_name;
      setLocationObj.geoInfo.country = country.short_name;
    }
  });
}