import { targetObject } from '../../scripts/scripts.js';
import { CFApiCall } from '../../scripts/common.js';
import { ctaClickInteraction } from '../../dl.js';

export default async function decorate(block) {
  const cfURL = block.textContent.trim();
  const cfRepsonse = await CFApiCall(cfURL);
  const repsonseData = cfRepsonse.data;
  
  const groupedLocations = groupAndSortLocations(repsonseData);
  renderLocationSelection(block, groupedLocations);
  initEventListeners(block, groupedLocations);
  if (targetObject.isTab || targetObject.isMobile) {
    displayCards(block,"",groupedLocations.grouped, 1);
  } else {
    displayCards(block, "", groupedLocations.grouped, 2);
  }
}

function groupAndSortLocations(data) {
  const grouped = data.reduce((acc, item) => {
    const location = item.Location.charAt(0).toUpperCase() + item.Location.slice(1).toLowerCase();
    acc[location] = acc[location] || [];
    acc[location].push(item);
    return acc;
  }, {});
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

  /* block.closest('body').addEventListener('click', (e) => {
    if (!e.target.closest('.toggleCityContainer') && !e.target.closest('.select-container') && !e.target.closest('fieldset') && !e.target.closest('cityBlack')) {
      if (selectContainer.classList.contains('open')) {
        citiesContainer.style.display = 'none';
        selectContainer.classList.remove('open');
      }
    }
  }); */

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


