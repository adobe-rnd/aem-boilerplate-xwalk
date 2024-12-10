import { locationInLatLan } from "./branchlocator-init.js";

function comparator(a, b) {
  if (a.innerText < b.innerText) {
    return -1;
  }
  if (a.innerText > b.innerText) {
    return 1;
  }
  return 0;
}

// Function to sort Data
export function sortElements(el) {
  const subjectsArray = Array.from(el.children);
  const sorted = subjectsArray.sort(comparator);
  sorted.forEach((e) => el.appendChild(e));
}

export default function returnLatLan() {
  return new Promise((resolve, reject) => {
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
  });
}
