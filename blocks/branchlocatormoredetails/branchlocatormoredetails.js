import { loadScript } from "../../scripts/aem.js";
import returnLatLan from "../select-tag/getSelectedLanguage.js";

export default function decorate(block){
    block.innerHTML = `
                    <div class='map-title'>
                        <h1 class='title'> Location on Map  </h1>
                    </div>
                    <div class='map-container'></div>`
}

function myMap(lat, long) {
    var mapProp = {
        center: new google.maps.LatLng(lat, long),
        zoom: 15,
    };
    var map = new google.maps.Map(document.querySelector('.map-container'), mapProp);
}

returnLatLan().then(function ({ lat, lng }) {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCJr5F6tJXVCcA_VIJreibOtqG9Vf_rb0k").then((resolve) => {
        myMap(lat, lng);
    });
}); 