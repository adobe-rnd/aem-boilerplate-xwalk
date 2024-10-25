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
  const pathSegments = url.pathname.split("/").filter(Boolean);

  if (!pathSegments.includes("branch-locator") || pathSegments.length < 5) {
    return false;
  }

  const [, , , state, city] = pathSegments;

  setLocationObj.geoInfo = {
    state: capitalizeAndReplace(state),
    city: city ? capitalizeAndReplace(city) : "",
    country: "India",
  };

  if (setLocationObj.geoInfo.state && setLocationObj.geoInfo.city) {
    const stateCityData = setLocationObj.getExcelData[setLocationObj.geoInfo.state]?.find((entry) => entry.City === setLocationObj.geoInfo.city);

    if (stateCityData) {
      Object.assign(setLocationObj, {
        lat: stateCityData.Latitude,
        lng: stateCityData.Longitude,
        "geoInfo.location": stateCityData.Location,
      });
    }
  }

  return true;
}

function capitalizeAndReplace(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}
