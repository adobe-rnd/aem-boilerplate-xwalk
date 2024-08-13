import { getProps } from "../../scripts/scripts.js";

export default function decorate(block) {
    //console.log(block);
    const [name, labels, values, disabled, defaultValue] = getProps(block);
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
    block.append(selectTag);
}