import returnLatLan from "../select-tag/getSelectedLanguage.js";
import { dropDownStateCity } from "./branchlocator-biz.js";

export let setLocationObj = {};
export let {lat, lng} = await returnLatLan();

setLocationObj.getExcelData = dropDownStateCity(); // await while calling API
setLocationObj.stateLi = "";
setLocationObj.cityLi = "";
setLocationObj.cityhash = {};
setLocationObj.geoInfo = {
  city: "",
  state: "",
  country: "",
};
