import { fetchAPI, getProps, renderHelper } from "../../scripts/scripts.js";
import { loader } from "../loader/loader.js";
import { getSelectedLanguage, getLanguageByLocation, getLanguageByState } from "./getSelectedLanguage.js";


let defaultLanguageData = await getSelectedLanguage('english');
let locationByLanguage = {
    maharashtra: 'marathi',
    default: 'english',
}
export default async function decorate(block) {
    locationByLanguage = await getLanguageByState();
    const location = await getLanguageByLocation()
    //console.log(block);
    const [name, labels, values, disabled, , apiUrl] = getProps(block);

    const defaultValue = locationByLanguage[location] || locationByLanguage.default;
    let selectedLanguageData = await getSelectedLanguage(defaultValue, apiUrl);
    selectedLanguageData = await changeContent(defaultLanguageData, selectedLanguageData);


    const labelArr = labels.split(',');
    const valueArr = values.split(',');
    const disabledArr = disabled.split(',');
    const selectTag = document.createElement('select');
    selectTag.name = name;
    let optionTag = '';
    labelArr.forEach(function (label, index) {
        const isDisabled = disabledArr[index] === valueArr[index] ? ' disabled ' : ''
        const isSelected = defaultValue.toLowerCase() === valueArr[index]?.toLowerCase() ? ' selected ' : ''
        optionTag += `  <option value="${valueArr[index]}" ${isSelected} ${isDisabled}>${label}</option>
` ;
    })
    selectTag.innerHTML = optionTag;
    block.innerHTML = ''
    selectTag.addEventListener('change', async function (e) {
        const data = await getSelectedLanguage(e.target.value)
        selectedLanguageData = await changeContent(selectedLanguageData, data);
    })
    block.append(selectTag);
    loader(false)

}
function changeContent(currentLanguageData, selectedLanguageData) {
    let isChange = false;
    document.querySelector('main').querySelectorAll('*').forEach(function (el, index) {
        if (el.firstChild instanceof Text) {
            // console.log(index, el.firstChild);
            // console.log(index, el.firstChild);
            Object.keys(currentLanguageData).forEach(function (key) {
                if (currentLanguageData[key] && currentLanguageData[key].trim() === el.firstChild.textContent.trim()) {
                    el.firstChild.textContent = selectedLanguageData[key];
                    isChange = true;
                }
            })
        }
    })
    if (isChange) {
        return selectedLanguageData
    }
    return currentLanguageData
}