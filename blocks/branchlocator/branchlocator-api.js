import { setLocationObj } from "./branchlocator-init.js";


export function initMap(sortedLat, sortedLng) {
  var directionsService = new window.google.maps.DirectionsService();
  var directionsRenderer = new window.google.maps.DirectionsRenderer();
  let map = new google.maps.Map(document.querySelector(".map-container"), {
    zoom: 8,
    center: { lat: 19.07596, lng: 72.87764 },
  });
  var request = {
    origin: new google.maps.LatLng(setLocationObj.lat, setLocationObj.lng),
    destination: new google.maps.LatLng(sortedLat, sortedLng),
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true,
  };
  directionsService.route(request, function (result, status) {
    if (status == "OK") {
      directionsRenderer.setDirections(result);
    }
  });
  directionsRenderer.setMap(map);
}

export async function searchBranchByURL() {
  let searchBranchURL = location.href;
  // let searchBranchURL = "https://www.piramalfinance.com/branch-locator/andhra-pradesh/adoni";
  let splitSearch = searchBranchURL.split("/");
    if (searchBranchURL.includes("/branch-locator/")) {

      // State Check
      if (splitSearch[4]) {
        setLocationObj.geoInfo.state = splitSearch[4];
        setLocationObj.geoInfo.state = setLocationObj.geoInfo.state.charAt(0).toUpperCase() + setLocationObj.geoInfo.state.slice(1).replace('-', ' ');
      } else {
        return false;
      }

      // City Check
      if (splitSearch[5]) {
        setLocationObj.geoInfo.city = splitSearch[5];
        setLocationObj.geoInfo.city = setLocationObj.geoInfo.city.charAt(0).toUpperCase() + setLocationObj.geoInfo.city.slice(1).replace('-', ' ');
      }
      

      /* // Location Code Check
      if (splitSearch[6]) {
        setLocationObj.geoInfo.locationcode = splitSearch[6].split("-").pop();
      }

      if (setLocationObj.geoInfo.locationcode) {
        let searchBranchLatLng = setLocationObj.getExcelData[setLocationObj.geoInfo.state]?.find((eachLocationCode) => eachLocationCode["Location Code"] == setLocationObj.geoInfo.locationcode);
        setLocationObj.lat = searchBranchLatLng["Latitude"];
        setLocationObj.lng = searchBranchLatLng["Longitude"];
      }  else */ 
      if (setLocationObj.geoInfo.state && setLocationObj.geoInfo.city) {
        let stateCityLatLng = setLocationObj.getExcelData[setLocationObj.geoInfo.state]?.find((eachCityCheck) => eachCityCheck.City === setLocationObj.geoInfo.city);
        setLocationObj.lat = stateCityLatLng["Latitude"];
        setLocationObj.lng = stateCityLatLng["Longitude"]; 
        setLocationObj.geoInfo.location = stateCityLatLng["Location"]; 
      } 

      // Country
      setLocationObj.geoInfo.country = "India";

      return true;
    }
} 

/* export async function searchBranchByURL() {
  let searchBranchURL = location.href;
  // let searchBranchURL = "https://www.piramalfinance.com/branch-locator/loans-in-anakapalle-andhra-pradesh-6391";

  let splitSearch = searchBranchURL.split("/").pop();
  if(splitSearch.includes('loans-in')){
    let currentLocation = searchBranchURL.split("/").pop().split("-").pop();
    const flatLocationData = Object.values(setLocationObj.getExcelData).flat(); // Flattening the nested arrays
    const foundLocation = flatLocationData.find(location => location["Location Code"] == currentLocation); 
    setLocationObj.geoInfo.state = foundLocation["State"]
    setLocationObj.geoInfo.city = foundLocation["City"]
    setLocationObj.geoInfo.locationcode = foundLocation["Location Code"]
    setLocationObj.lat = foundLocation["Latitude"]
    setLocationObj.lng = foundLocation["Longitude"]
    setLocationObj.geoInfo.country = "India"; // Country
  }
  return true;
}  */
