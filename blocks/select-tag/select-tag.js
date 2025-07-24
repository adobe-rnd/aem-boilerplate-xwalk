import { getProps } from '../../scripts/common.js';
import { loader } from '../loader/loader.js';
import { getSelectedLanguage, getLanguageByLocation, getLanguageByState } from './getSelectedLanguage.js';

const defaultLanguageData = await getSelectedLanguage('english');

let locationByLanguage = {};
/* let locationByLanguage = {
    "maharashtra": 'marathi',
    "kerala": 'malayalam',
    "gujarat": "gujurati",
    "west bengal": "bengali",
    "karnataka": "kannada",
    "tamil nadu": "tamil",
    "andhra pradesh": "telugu",
    "default": 'hindi',
} */

export default async function decorate(block) {
  locationByLanguage = await getLanguageByState();
  const { location, countryName } = await getLanguageByLocation();
  // console.log(block);
  const [name, labels, values, disabled, , apiUrl] = getProps(block);

  let defaultValue = locationByLanguage[location] || locationByLanguage.default;
  if (countryName && countryName.toLowerCase() != 'india') {
    defaultValue = 'english';
  }
  let selectedLanguageData = await getSelectedLanguage(defaultValue, apiUrl);
  selectedLanguageData = await changeContent(defaultLanguageData, selectedLanguageData);
  const labelArr = labels.split(',');
  const valueArr = values.split(',');
  const disabledArr = disabled.split(',');
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('maindiv-lang-switch');
  const innerDiv = document.createElement('div');
  innerDiv.classList.add('inner-lang-switch');
  innerDiv.innerHTML = '<p>Change language</p>';
  const selectTag = document.createElement('ul');
  selectTag.name = name;
  let optionTag = '';
  labelArr.forEach((label, index) => {
    const isDisabled = disabledArr[index] === valueArr[index] ? ' data-disabled="false" ' : '';
    const isSelected = defaultValue.toLowerCase() === valueArr[index]?.toLowerCase() ? 'Select' : '';
    if (isSelected) {
      innerDiv.children[0].innerText = 'Change language';
    }
    // valueArr[index];

    optionTag += `  <li class="items ${isSelected}" ${isDisabled} data-value="${valueArr[index]}">${label}</li>`;
  });
  selectTag.innerHTML = optionTag;
  block.innerHTML = '';

  Array.from(selectTag.children).forEach((list) => {
    list.addEventListener('click', async function (e) {
      const val = this.dataset.value;

      if (this.getAttribute('data-disabled') == null) {
        selectTag.firstElementChild.setAttribute('data-disabled', true);
      }

      // selectTag.firstElementChild.setAttribute('data-disabled', true);
      if (this.getAttribute('data-disabled')) {
        selectTag.classList.add('dp-none');
      } else {
        Array.from(selectTag.children).forEach((list) => {
          list.classList.remove('active');
        });
        this.classList.add('active');
        innerDiv.children[0].innerText = val;

        selectTag.classList.add('dp-none');
        const data = await getSelectedLanguage(val);
        selectedLanguageData = await changeContent(selectedLanguageData, data);
      }

      const isMobile = window.matchMedia('(max-width <= 1024px)');

      if (isMobile.matches) {
        selectTag.style.left = '-80px';
      }
    });
  });

  innerDiv.addEventListener('click', (e) => {
    if (selectTag.classList.contains('dp-none')) {
      selectTag.classList.remove('dp-none');
    } else {
      selectTag.classList.add('dp-none');
    }
  });

  // selectTag.addEventListener('click', async function (e) {
  // });
  selectTag.classList.add('dp-none');
  mainDiv.append(innerDiv, selectTag);
  selectTag.firstElementChild.classList.add('active');
  block.append(mainDiv);
  loader(false);
}

function changeContent(currentLanguageData, selectedLanguageData) {
  let isChange = false;
  document.querySelector('main').querySelectorAll('*').forEach((el, index) => {
    if (el.firstChild instanceof HTMLAnchorElement) {
      Object.keys(currentLanguageData).forEach((key) => {
        if (currentLanguageData[key] && currentLanguageData[key].trim() === new URL(el.firstChild.href.trim()).pathname) {
          el.firstChild.href = selectedLanguageData[key];
          isChange = true;
          console.log(el);
        }
      });
    } else if (el.firstChild instanceof Text) {
      // console.log(index, el.firstChild);
      // console.log(index, el.firstChild);
      Object.keys(currentLanguageData).forEach((key) => {
        if (currentLanguageData[key] && currentLanguageData[key].trim() === el.firstChild.textContent.trim()) {
          el.firstChild.textContent = selectedLanguageData[key];
          isChange = true;
        }
      });
    }
  });
  if (isChange) {
    return selectedLanguageData;
  }
  return currentLanguageData;
}
