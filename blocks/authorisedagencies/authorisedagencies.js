import { fetchAPI, targetObject } from '../../scripts/scripts.js';
import { ctaClickInteraction } from '../../dl.js';

export default async function decorate(block) {
  const cfURL = block.textContent.trim();
  const cfRepsonse = await fetchApiCall(cfURL);
  const repsonseData = cfRepsonse.data;
  const result = Object.groupBy(repsonseData, ({ Location }) => {
    const lowercaseLocation = Location.toLowerCase();
    return lowercaseLocation.charAt(0).toUpperCase() + lowercaseLocation.slice(1);
  });
  const jsonResponseData = (result);
  const selectContainerWrapper = createAndAppend('div', '', 'select-container-wrapper');
  const selectContainer = createAndAppend('div', '', 'select-container');
  const cardContainer = createAndAppend('div', '', 'card-container');

  const selectText = createAndAppend('label', '', '');
  selectText.textContent = 'Select Location';

  let inputLocationValue;

  const inputLocation = createAndAppend('input', '', 'toggleCityContainer');
  inputLocation.readOnly = true;
  inputLocation.value = inputLocationValue || 'Location ';

  const citiesContainer = createAndAppend('div', '', 'cities-container');

  const cityDropdown = createAndAppend('fieldset', '', '');
  const legendField = createAndAppend('legend', '', '');
  legendField.textContent = 'locations';
  cityDropdown.appendChild(legendField);
  citiesContainer.appendChild(cityDropdown);
  const sortedCities = Object.keys(jsonResponseData).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  // let cities = Object.keys(jsonResponseData);
  sortedCities.forEach((city) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.value = city;
    input.name = 'branchlocation';
    input.addEventListener('change', (e) => {
      window.onscroll = null;
      try {
        const data = {};
        data.click_text = e.target.closest('label').querySelector('span').textContent.trim();
        data.cta_position = 'Select Location';
        ctaClickInteraction(data);
      } catch (error) {
        console.warn(error);
      }
      displayCards(city);
      inputLocationValue = city;
      inputLocation.value = city;
      inputLocation.className = 'cityBlack';
      citiesContainer.style.display = 'none';
      selectContainer.classList.toggle('open');
    });
    const span = document.createElement('span');
    span.textContent = city;
    label.appendChild(input);
    label.appendChild(span);
    cityDropdown.appendChild(label);
  });

  citiesContainer.style.display = 'none';
  inputLocation.addEventListener('click', () => {
    citiesContainer.style.display = citiesContainer.style.display === 'none' ? 'block' : 'none';
    selectContainer.classList.toggle('open');
  });

  function createAndAppend(node, value, className) {
    const newNode = document.createElement(node);
    newNode.textContent = value;
    newNode.className = className;
    return newNode;
  }

  function displayCards(selectedCityName, index) {
    cardContainer.innerHTML = '';
    const dataToDisplay = selectedCityName ? { [selectedCityName]: jsonResponseData[selectedCityName] } : jsonResponseData;

    // let count = 0
    Object.keys(dataToDisplay).slice(0, index).forEach((city) => {
      dataToDisplay[city].forEach((data) => {
        const card = document.createElement('div');
        card.className = 'card';

        const elementLocation = createAndAppend('div', '', '');
        const location = createAndAppend('p', 'Location', '');
        elementLocation.appendChild(location);

        const arr = data.Location.split(' ');
        const locationValue = document.createElement('p');

        arr.forEach((item) => {
          const location = item.toLowerCase();
          const newLocation = location.charAt(0).toUpperCase() + location.slice(1);
          locationValue.textContent += `${newLocation} `;
        });
        elementLocation.appendChild(locationValue);
        card.appendChild(elementLocation);

        function createSection(card, label, value) {
          const element = createAndAppend('div', '', '');
          const labelElement = createAndAppend('p', label, '');
          const valueElement = createAndAppend('p', value, '');
          element.appendChild(labelElement);
          element.appendChild(valueElement);
          card.appendChild(element);
        }

        // if (count > 3) {
        //     card.style.display = 'none'
        // }
        // count++;
        createSection(card, 'Agency Address', data['Agency Address']);
        createSection(card, 'Vendor Name:', data['Vendor Name']);
        createSection(card, 'Date of Agreement:', data['Date of Agreement']);
        createSection(card, 'Date of Expiry:', data['Date of Expiry']);
        createSection(card, 'Tenure:', data.Tenure);
        createSection(card, 'Agency Signatory:', data['Agency owner']);
        createSection(card, 'Contact No.:', data['Contact No']);

        cardContainer.appendChild(card);
        block.appendChild(cardContainer);
      });
    });
    for (const city in dataToDisplay) {
    }
  }
  selectContainer.appendChild(selectText);
  selectContainer.appendChild(inputLocation);

  selectContainerWrapper.appendChild(selectContainer);
  selectContainerWrapper.appendChild(citiesContainer);

  block.appendChild(selectContainerWrapper);
  if (targetObject.isTab || targetObject.isMobile) {
    displayCards(undefined, 1);
  } else {
    displayCards(undefined, 2);
  }
  block.closest('body').addEventListener('click', (e) => {
    if (!e.target.closest('.toggleCityContainer') && !e.target.closest('.select-container') && !e.target.closest('fieldset') && !e.target.closest('cityBlack')) {
      if (block.querySelector('.select-container.open')) {
        if (block.querySelector('.cities-container').style.display == 'block') {
          block.querySelector('.cities-container').style.display = 'none';
          block.querySelector('.select-container').classList.remove('open');
        }
      }
    }
  });

  window.onscroll = function () {
    displayCards();
    // Array.from(document.querySelector('.card-container').children).forEach(function (each) {
    //     each.style.display = 'block'
    // })
  };
}
export async function fetchApiCall(cfurl) {
  const response = await fetchAPI('GET', cfurl);
  const responseJson = await response.json();
  return responseJson;
}
