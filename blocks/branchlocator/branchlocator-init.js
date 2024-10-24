import returnLatLan from "./sort.js";

export const locationInLatLan = {};
export const setLocationObj = {
  lat: 0,
  lng: 0,
  stateLi: "",
  cityLi: "",
  cityhash: {},
  geoInfo: {
    city: "",
    state: "",
    country: "",
    location: "",
    locationcode: "",
  },
};

async function initializeLocation() {
  try {
    const { lat, lng } = await returnLatLan();
    Object.assign(setLocationObj, { lat, lng });
  } catch (error) {
    console.error("Error initializing location:", error);
  }
}

// Call this function to initialize the location
await initializeLocation();
