import { fetchAPI } from '../../scripts/common.js';

let data;
const gooleMapKey = "AIzaSyDx1HwnCLjSSIm_gADqaYAZhSBh7hgcwTQ";


export async function getSelectedLanguage(selectedLanguage = '', apiUrl = '/api/neeyat-muti-lang.json') {
  if (!data) {
    const resp = await fetchAPI('GET', apiUrl);
    data = await resp.json();
  }
  const selectedLanguageData = data.data.filter((data) => (selectedLanguage.toLowerCase() === data.language.toLowerCase()));
  if (selectedLanguageData.length) {
    return selectedLanguageData[0];
  }
  return data.data.filter((data) => (data.language === 'english'))[0];
}

export default function returnLatLan() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
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
          console.error('Error getting user location:', error);
        },
      );
    } else {
      // Geolocation is not supported by the browser
      console.error('Geolocation is not supported by this browser.');
    }
  });
}

function getStateName(lat, lan) {
  return new Promise((resolve, reject) => {
    fetchAPI('GET', `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&sensor=true&key=${gooleMapKey}`).then((res) => {
      resolve(res);
    }).catch((err) => {
      resolve(err);
    });
  });
}

export let locationInLatLan = {
  lat: '',
  lng: '',
};

export async function getLanguageByLocation() {
  return new Promise((resolve, reject) => {
    returnLatLan().then(() => {
      getStateName(locationInLatLan.lat, locationInLatLan.lng).then(async (response) => {
        response = await response.json();
        let divisionName = response.results[0].address_components.filter((ele) => {
          if (ele.types.includes('administrative_area_level_1')) {
            return ele.long_name;
          }
        });
        divisionName = (divisionName[0].long_name).toLowerCase();
        const countryName = response.results[response.results.length - 1].formatted_address;
        const resolveObj = {
          location: divisionName,
          countryName,
        };
        resolve(resolveObj);
      }).catch((error) => {
        resolve(error);
      });
    }).catch((error) => {
      resolve(error);
    });
  });
}

export async function getLanguageByState() {
  const langResp = await fetchAPI('GET', '/api/language-by-state.json');
  const data = await langResp?.json();
  const locationByLanguage = {};
  data?.data.forEach((each) => {
    locationByLanguage[each.state] = each.language;
  });
  return locationByLanguage;
}
