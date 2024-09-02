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

export async function searchBranchByURL(){
  // let searchBranchURL = location.href;
  let searchBranchURL = 'http://localhost:3000/branch-locator/delhi';
  let splitSearch = searchBranchURL.split('/');
  splitSearch.forEach(function (each){
      if(each.includes('branch-locator')){

        // Country
        setLocationObj.geoInfo.country = "India";

        // State Check
        if((splitSearch.length - 1) >= 4 && splitSearch[4]){
          setLocationObj.geoInfo.state = splitSearch[4];
        }else{
          return false;
        }
        
        // City Check
        if((splitSearch.length - 1) == 5 && splitSearch[5]){
          setLocationObj.geoInfo.city = splitSearch[5];
        }else{
          
        }

        // Location Code Check
        if((splitSearch.length - 1) == 6 && splitSearch[6]){
          setLocationObj.geoInfo.locationcode = splitSearch[6].split('-').pop();
        }

        let searchBranchLatLng = "";
        if(setLocationObj.geoInfo.locationcode){
          searchBranchLatLng = getExcelData[setLocationObj.geoInfo.state]?.find(eachLocationCode =>
            eachLocationCode["Location Code"] === setLocationObj.geoInfo.locationcode
          );
        }

        if(searchBranchLatLng){
          setLocationObj.lat = defaultLatLng['Latitude'];
          setLocationObj.lng = defaultLatLng['Longitude'];
        }else{
          if(setLocationObj.geoInfo.state && setLocationObj.geoInfo.city){
            let stateCityLatLng = getExcelData[setLocationObj.geoInfo.state]?.find(eachCityCheck =>
              eachCityCheck.City === setLocationObj.geoInfo.city
            );
            setLocationObj.lat = stateCityLatLng['Latitude'];
            setLocationObj.lng = stateCityLatLng['Longitude'];
          }else if(setLocationObj.geoInfo.state){
            let stateLatLng = getExcelData[setLocationObj.geoInfo.state][0];
            setLocationObj.lat = stateLatLng['Latitude'];
            setLocationObj.lng = stateLatLng['Longitude'];
          }
        }
        return true;
      }
  });
}
