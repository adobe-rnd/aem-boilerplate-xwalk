import { getProps, renderHelper } from "../../scripts/scripts.js";
import getSelectedLanguage from "./getSelectedLanguage.js";


let defaultLanguageData = await getSelectedLanguage('english');
export default async function decorate(block) {
    //console.log(block);
    const [name, labels, values, disabled, defaultValue, apiUrl] = getProps(block);

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
        const isSelected = defaultValue === valueArr[index] ? ' selected ' : ''
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