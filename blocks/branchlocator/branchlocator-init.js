import returnLatLan from '../select-tag/getSelectedLanguage.js';

export const setLocationObj = {};
const { lat, lng } = await returnLatLan();

setLocationObj.lat = lat;
setLocationObj.lng = lng;
setLocationObj.stateLi = '';
setLocationObj.cityLi = '';
setLocationObj.cityhash = {};
setLocationObj.geoInfo = {
  city: '',
  state: '',
  country: '',
  location: '',
  locationcode: '',
};
