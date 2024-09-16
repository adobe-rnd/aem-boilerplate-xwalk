import returnLatLan from "../select-tag/getSelectedLanguage.js";
import { dropDownStateCity } from "./branchlocator-biz.js";

export let setLocationObj = {};
let {lat, lng} = await returnLatLan();

setLocationObj.lat = lat;
setLocationObj.lng = lng;
// setLocationObj.getExcelData = dropDownStateCity(); // await while calling API
setLocationObj.stateLi = "";
setLocationObj.cityLi = "";
setLocationObj.cityhash = {};
setLocationObj.geoInfo = {
  city: "",
  state: "",
  country: "",
  location: "",
  locationcode: "",
};
setLocationObj.seturl = {
  city: "",
  state: "",
  location: "",
};
