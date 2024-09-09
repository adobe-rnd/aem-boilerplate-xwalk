import { fetchAPI } from "../../scripts/scripts.js";
import { branchLocatorObject } from "../branchlocator/jsonobject.js";

let setLocationObj = {};

setLocationObj.getExcelData = dropDownStateCity(); // await while calling API
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
};
setLocationObj.seturl = {
  city: "",
  state: "",
  location: "",
};

export default async function decorate(block) {

    const props = Array.from(block.children, (row) => row.firstElementChild);

    const  [title, desktopdes, mobiledes, openingtime, info, image, imagealt] = props;

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

    let locationCodeURL = location.href.split('/').pop().split('-').pop();

    if(locationCodeURL){
        
        let splitURL = location.href.split('/');

        if (splitURL[4]) {
            setLocationObj.geoInfo.state = splitURL[4];
            setLocationObj.geoInfo.state = setLocationObj.geoInfo.state.charAt(0).toUpperCase() + setLocationObj.geoInfo.state.slice(1).replace('-', ' ');
        }
    
        // City Check
        if (splitURL[5]) {
            setLocationObj.geoInfo.city = splitURL[5];
            setLocationObj.geoInfo.city = setLocationObj.geoInfo.city.charAt(0).toUpperCase() + setLocationObj.geoInfo.city.slice(1).replace('-', ' ');
        }

        // Location Code Check
        if (splitURL[6]) {
            setLocationObj.geoInfo.locationcode = splitURL[6].split("-").pop();
        }

        let defaultLatLng = setLocationObj.getExcelData[setLocationObj.geoInfo.state]?.find(eachLocationCode =>
            eachLocationCode['Location Code'] == locationCodeURL
        );

        if(defaultLatLng){
            setLocationObj.geoInfo.city = defaultLatLng['City'];
            setLocationObj.geoInfo.state = defaultLatLng['State'];
            setLocationObj.lat = defaultLatLng['Latitude'];
            setLocationObj.lng = defaultLatLng['Longitude'];
            setLocationObj.address = defaultLatLng['Address'];
        }

        await getStateCity(setLocationObj.lat, setLocationObj.lng);
        let reviewRating = await getReviewRating();
        
    
        // let {lat, lng} = await returnLatLan();
    
    }
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
          debugger;
          if (results[0]) {
            let getPlaceID = results[0].place_id;

            /* let city, region, country;
            for (var j = 0; j < results.length; j++) {
              // if (results[j].types[0] === "locality") {
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
              // }
            }
          
            setLocationObj.geoInfo.city = city.long_name;
            setLocationObj.geoInfo.state = region.long_name;
            setLocationObj.geoInfo.country = country.long_name; */
            setLocationObj.placeid = getPlaceID;
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

  export function dropDownStateCity(){
    const result = Object.groupBy(branchLocatorObject['branch-locator'], ({ State }) => {
        const lowercaseLocation = State.toLowerCase();
        return lowercaseLocation.charAt(0).toUpperCase() + lowercaseLocation.slice(1);
    });
    return result;
  }


async function getReviewRating(){
  return new Promise(function(resolve, reject){
    fetchAPI('GET', `https://maps.googleapis.com/maps/api/place/details/json?place_id=${setLocationObj.placeid}&key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k`).then((res)=>{
      resolve(res);
    })
    .catch(function(err){
      resolve(err);
    })
  })
}