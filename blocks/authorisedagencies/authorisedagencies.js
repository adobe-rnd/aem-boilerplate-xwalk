import { CFApiCall, fetchAPI, targetObject } from '../../scripts/scripts.js';
import { ctaClickInteraction } from '../../dl.js';

/*
export default async function decorate(block) {
  const cfURL = block.textContent.trim();
  const cfRepsonse = await CFApiCall(cfURL);
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
*/

export default async function decorate(block) {
  const cfURL = block.textContent.trim();
  const cfRepsonse = await CFApiCall(cfURL);
  const repsonseData = cfRepsonse.data;
  
  const groupedLocations = groupAndSortLocations(repsonseData);
  renderLocationSelection(block, groupedLocations);
  initEventListeners(block, groupedLocations);
  if (targetObject.isTab || targetObject.isMobile) {
    displayCards(block,undefined,groupedLocations.grouped, 1);
  } else {
    displayCards(block, undefined, groupedLocations.grouped, 2);
  }
}

function groupAndSortLocations(data) {
  const grouped = Object.groupBy(data, ({ Location }) => {
    const lowercaseLocation = Location.toLowerCase();
    return lowercaseLocation.charAt(0).toUpperCase() + lowercaseLocation.slice(1);
  });

  const sortedCities = Object.keys(grouped).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  return { grouped, sortedCities };
}

function renderLocationSelection(block, { grouped, sortedCities }) {
  const inputHTML = sortedCities.map((city) => {
    return `
      <label>
        <input type="radio" value="${city}" name="branchlocation">
        <span>${city}</span>
      </label>
    `;
  }).join('');

  block.innerHTML = `
    <div class="select-container-wrapper">
      <div class="select-container">
        <label>Select Location</label>
        <input class="toggleCityContainer" readOnly value="Location">
      </div>
      <div class="cities-container" style="display:none;">
        <fieldset>
          <legend>locations</legend>
          ${inputHTML}
        </fieldset>
      </div>
    </div>
  `;
}

function initEventListeners(block, groupedLocations) {
  const selectContainer = block.querySelector('.select-container');
  const citiesContainer = block.querySelector('.cities-container');
  const inputLocation = block.querySelector('.toggleCityContainer');

  let inputLocationValue;

  inputLocation.addEventListener('click', () => {
    citiesContainer.style.display = citiesContainer.style.display === 'none' ? 'block' : 'none';
    selectContainer.classList.toggle('open');
  });

  citiesContainer.addEventListener('change', (e) => {
    const selectedCity = e.target.value;
    inputLocationValue = selectedCity;
    inputLocation.value = selectedCity;
    inputLocation.className = 'cityBlack';
    citiesContainer.style.display = 'none';
    selectContainer.classList.remove('open');

    try {
      const data = {};
      data.click_text = e.target.closest('label').querySelector('span').textContent.trim();
      data.cta_position = 'Select Location';
      ctaClickInteraction(data);
    } catch (error) {
      console.warn(error);
    }
    displayCards(block, selectedCity, groupedLocations.grouped);
  });

  block.closest('body').addEventListener('click', (e) => {
    if (!e.target.closest('.toggleCityContainer') && !e.target.closest('.select-container') && !e.target.closest('fieldset') && !e.target.closest('cityBlack')) {
      if (selectContainer.classList.contains('open')) {
        citiesContainer.style.display = 'none';
        selectContainer.classList.remove('open');
      }
    }
  });

  window.onscroll = () => displayCards(block, inputLocationValue, groupedLocations.grouped);
}


function displayCards(block, selectedCityName, groupedLocations,index) {
  const cardContainer = block.querySelector('.card-container') || document.createElement('div');
  cardContainer.className = 'card-container';
  cardContainer.innerHTML = ''; 
  block.appendChild(cardContainer);

  const dataToDisplay = selectedCityName ? { [selectedCityName]: groupedLocations[selectedCityName] } : groupedLocations;

  Object.keys(dataToDisplay).slice(0, index).forEach((city) => {
    dataToDisplay[city].forEach((data) => {
      const locationValue = formatLocation(data.Location);

      const cardHTML = `
        <div class="card">
          <div>
            <p>Location</p>
            <p>${locationValue}</p>
          </div>
          <div>
            <p>Agency Address</p>
            <p>${data['Agency Address']}</p>
          </div>
          <div>
            <p>Vendor Name:</p>
            <p>${data['Vendor Name']}</p>
          </div>
          <div>
            <p>Date of Agreement:</p>
            <p>${data['Date of Agreement']}</p>
          </div>
          <div>
            <p>Date of Expiry:</p>
            <p>${data['Date of Expiry']}</p>
          </div>
          <div>
            <p>Tenure:</p>
            <p>${data.Tenure}</p>
          </div>
          <div>
            <p>Agency Signatory:</p>
            <p>${data['Agency owner']}</p>
          </div>
          <div>
            <p>Contact No.:</p>
            <p>${data['Contact No']}</p>
          </div>
        </div>
      `;
      cardContainer.innerHTML += cardHTML; 
    });
  });
}

function formatLocation(location) {
  const arr = location.split(' ');
  return arr.map(item => {
    const lowercased = item.toLowerCase();
    return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
  }).join(' ');
}


