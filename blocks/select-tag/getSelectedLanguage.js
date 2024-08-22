import { fetchPlaceholders } from "../../scripts/aem.js";
import { fetchAPI } from "../../scripts/scripts.js";

let data;
export async function getSelectedLanguage(selectedLanguage = '', apiUrl = '/api/neeyat-muti-lang.json') {
    if (!data) {
        const resp = await fetchAPI('GET', apiUrl);
        data = await resp.json();
    }
    const selectedLanguageData = data.data.filter(data => (selectedLanguage.toLowerCase() === data.language.toLowerCase()))
    if (selectedLanguageData.length) {
        return selectedLanguageData[0]
    }
    return data.data.filter(data => (data.language === 'english'))[0];
}

function returnLatLan() {
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


async function getStateName(lat, lan) {
    return new Promise(async function (resolve, reject) {
        const data = await fetchPlaceholders();
        fetchAPI('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lan + '&sensor=true&key=' + data.gk).then(function (res) {
            resolve(res)
        }).catch(function (err) {
            resolve(err);
        })
    })
}

let locationInLatLan = {
    lat: '',
    lng: ''
}


export async function getLanguageByLocation() {
    return new Promise(function (resolve, reject) {
        returnLatLan().then(function () {
            getStateName(locationInLatLan.lat, locationInLatLan.lng).then(async function (response) {
                response = await response.json();
                let divisionName = response.results[0].address_components.filter(function (ele) {
                    if (ele.types.includes('administrative_area_level_1')) {
                        return ele.long_name;
                    }
                })
                divisionName = (divisionName[0].long_name).toLowerCase();
                resolve(divisionName);
            }).catch(function (error) {
                resolve(error)
            })
        }).catch(function (error) {
            resolve(error)
        })
    })
}

export async function getLanguageByState() {
    const langResp = await fetchAPI('GET', '/api/language-by-state.json');
    const data = await langResp?.json();
    const locationByLanguage = {};
    data?.data.forEach(function (each) {
        locationByLanguage[each.state] = each.language;

    })
    return locationByLanguage
}