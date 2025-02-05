import { setLocationObj } from "./branchlocator-init.js";

export function initMap(sortedLat, sortedLng) {
  const directionsService = new window.google.maps.DirectionsService();
  const directionsRenderer = new window.google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.querySelector(".map-container"), {
    zoom: 8,
    center: { lat: 19.07596, lng: 72.87764 },
  });
  const request = {
    origin: new google.maps.LatLng(setLocationObj.lat, setLocationObj.lng),
    destination: new google.maps.LatLng(sortedLat, sortedLng),
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true,
  };
  directionsService.route(request, (result, status) => {
    if (status == "OK") {
      directionsRenderer.setDirections(result);
    }
  });
  directionsRenderer.setMap(map);
}

export async function searchBranchByURL() {
  const url = new URL(location.href);
  const pathSegments = url.pathname.split('/').filter(Boolean);
  
  if (!pathSegments.includes('branch-locator')) {
    return false;
  }

  const stateIndex = pathSegments.indexOf('branch-locator') + 1;
  const state = pathSegments[stateIndex];
  const city = pathSegments[stateIndex + 1];

  if (!state) {
    return false;
  }

  const formatString = (str) => 
    str.charAt(0).toUpperCase() + 
    str.slice(1).replaceAll('-', ' ');

  setLocationObj.geoInfo = {
    state: formatString(state),
    city: city ? formatString(city) : '',
    country: 'India'
  };

  if (setLocationObj.geoInfo.state && setLocationObj.geoInfo.city) {
    const stateData = setLocationObj.getExcelData[setLocationObj.geoInfo.state];
    const cityData = stateData?.find(
      entry => entry.City.toLowerCae() === setLocationObj.geoInfo.city.toLowerCase()
    );

    if(!cityData){
      return false;
    }

    if (cityData) {
      setLocationObj.lat = cityData.Latitude;
      setLocationObj.lng = cityData.Longitude;
      setLocationObj.geoInfo.location = cityData.Location;
    }
  }

  return true;
}

