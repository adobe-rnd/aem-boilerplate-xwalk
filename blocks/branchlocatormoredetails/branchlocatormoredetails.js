import { loadScript } from "../../scripts/aem.js";
import { setLocationObj } from "../moredetailsaddress/moredetailsaddress.js";

export default function decorate(block){
    block.innerHTML = 
    `<div class='map-title'>
        <h1 class='title'> Location on Map</h1>
    </div>
    <div class='map-container'></div>`;

    settingCurrentLoct(setLocationObj);
}

function myMap(lat, long) {
    var mapProp = {
        center: new google.maps.LatLng(lat, long),
        zoom: 10,
    };
    var map = new google.maps.Map(document.querySelector('.map-container'), mapProp);
    new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: "You are here",
        /* icon: {
          url: "../image/location-pin.svg",
          size: new google.maps.Size(48, 48),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(24, 42),
        }, */
        map: map,
    });
}

export function settingCurrentLoct(setLocationObj){
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k").then((resolve) => {
        myMap(setLocationObj.lat, setLocationObj.lng);
    });
}
/* returnLatLan().then(function ({ lat, lng }) {
});  */