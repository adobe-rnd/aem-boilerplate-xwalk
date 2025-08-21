import {
  brachDropDownUl, branchInput, loanProduct, stateDropDownUL, stateInput,
} from './loanformdom.js';
import { statemasterDataMap } from './statemasterDataMapping.js';
import { clearPLLoanError, checkAllFieldValidation, validatePLLoan } from './validation.js';
import { statemasterGetStatesApi } from './statemasterapi.js';

let statemasterGlobal = statemasterDataMap.get('statemasterGlobal') || {};
let productStatemaster = {};
let productStates = [];
let loanProductListenerAttached = false;

let ulFormBranch = document.createElement('li');
ulFormBranch.textContent = "No options";
ulFormBranch.classList.add('orangepoints');

const defaultCityLi = brachDropDownUl()?.querySelector('.orangepoints') || ulFormBranch;

export function stateMasterProcessGraphqlData(statemasterRaw) {
  const statemasterArr = statemasterRaw.filter((stateobj) => Boolean(stateobj.state) && stateobj.state != '#N/A');
  const statemaster = statemasterArr.reduce((statemasterObj, obj) => {
    const stateObj = {};
    const innerObj = {};
    innerObj.data = obj.data.map((d) => JSON.parse(d));
    innerObj.cities = innerObj.data.reduce((cityArr, cityObj) => (cityArr.includes(cityObj.city) ? cityArr : (cityArr.push(cityObj.city), cityArr)), []);
    stateObj[obj.state.trim()] = innerObj;
    Object.assign(statemasterObj, stateObj);
    return statemasterObj;
  }, {});
  return statemaster;
}

export function stateMasterProcessApiData(rawData) {
  const statemaster = {};

  rawData.forEach(entry => {
    if (!entry.State) return;

    const stateName = entry.State.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

    if (!statemaster[stateName]) {
      statemaster[stateName] = {
        cities: [],
        data: []
      };
    }

    const cityName = entry.location.trim();

    if (!statemaster[stateName].cities.includes(cityName)) {
      statemaster[stateName].cities.push(cityName);
    }

    statemaster[stateName].data.push({
      city: cityName,
      locationID: null,
      product: entry["Product Code"] ? entry["Product Code"].toLowerCase() : null
    });
  });
  return statemaster;
}

function  renderStatemaster(statemaster) {
  const states = Object.keys(statemaster).sort();

  renderDefaultStates(states);

  if (!loanProductListenerAttached) {
    const buttonExpert = document.querySelectorAll('.expert');
    buttonExpert.forEach((btn) => {
      btn.addEventListener('click', () => {
        renderDefaultStates(states);
        brachDropDownUl().replaceChildren(defaultCityLi);
        productStatemaster = {};
        productStates = [];
      });
    });

    stateInput().addEventListener('change', ({ currentTarget }) => {
      const state = (productStates.length ? productStates : states).filter((state) => state.toLowerCase() === currentTarget.value.toLowerCase())[0];
      if (state) {
        renderCities(state);
        currentTarget.classList.add('place-selected');
      } else {
        renderCities([]);
        currentTarget.classList.remove('place-selected');
      }
  
      branchInput().value = '';
    });
  
    loanProduct().addEventListener('change', ({ currentTarget }) => {
      stateLoanFilter(currentTarget.dataset.loanType);
      clearPLLoanError();
      validatePLLoan();
      const allowedtype = ['pl', 'las', 'lamf'].includes(currentTarget.dataset.loanType);
      const isAllowed = statemasterDataMap.get('allowedType');
      const checkedType = typeof isAllowed === 'boolean' ? isAllowed : false;
  
      if (allowedtype && !checkedType) {
        statemasterGetStatesApi(currentTarget.dataset.loanType);
        statemasterDataMap.set('allowedType', true);
      }
      else if (!allowedtype && checkedType) {
        statemasterGetStatesApi(currentTarget.dataset.loanType);
        statemasterDataMap.set('allowedType', false);
      }
    });
  
    stateInput().addEventListener('keyup', ({ currentTarget }) => {
      const ul = stateDropDownUL();
  
      const searchStates = (productStates.length ? productStates : states).filter((state) => state.toLocaleLowerCase().includes(currentTarget.value.trim().toLocaleLowerCase()));
      const serachFragment = searchStates.length > 0 ? renderHelper(searchStates, 'form-state', 'States') : renderHelper(searchStates, 'form-state', 'No options');
      ul.replaceChildren(serachFragment);
    });
  
    stateInput().addEventListener('input', ({ currentTarget }) => {
      const isState = (productStates.length && loanProduct().value ? productStates : states).map((s) => s.toLocaleLowerCase()).includes(currentTarget.value.trim().toLocaleLowerCase());
      if (isState) {
        currentTarget.classList.add('place-selected');
      } else {
        currentTarget.classList.remove('place-selected');
      }
    });
    loanProductListenerAttached = true;
  }
}

function renderCities(state) {
  const ul = brachDropDownUl();

  const isProduct = loanProduct().value.trim() != '';
  const product = loanProduct().dataset.loanType;
  const allowedtype = ['pl', 'las', 'lamf'].includes(product);

  const cities = (isProduct && !allowedtype ? productStatemaster[state]?.cities : statemasterGlobal[state]?.cities) || [];
  const fragment = cities.length > 0 ? renderHelper(cities, 'form-branch-city', 'Cities') : renderHelper(cities, 'form-branch-city', 'No options');
  ul.replaceChildren(fragment);

  statemasterDataMap.set('loanCities', cities);

  if (!ul.dataset.keyup) {
    branchInput().addEventListener('keyup', ({ currentTarget }) => {
      const cities = statemasterDataMap.get('loanCities');

      const normalize = (str) => str.toLowerCase().replace(/[^a-z]/g, '');

      const isCity = cities
        .map((city) => normalize(city))
        .includes(normalize(currentTarget.value));


      // const serachCities = cities.filter((city) => city.toLocaleLowerCase().includes(currentTarget.value.trim().toLocaleLowerCase()));

      const serachFragment = serachCities.length > 0 ? renderHelper(serachCities, 'form-branch-city', 'Cities') : renderHelper(serachCities, 'form-branch-city', 'No options');
      ul.replaceChildren(serachFragment);
    });

    ul.dataset.keyup = true;
  }

  if (!ul.dataset.input) {
    branchInput().addEventListener('input', ({ currentTarget }) => {
      const cities = statemasterDataMap.get('loanCities');

      const normalize = (str) => str.toLowerCase().replace(/[^a-z]/g, '');

      const isCity = cities
        .map((city) => normalize(city))
        .includes(normalize(currentTarget.value));


      // const isCity = cities.map((city) => city.toLocaleLowerCase()).includes(currentTarget.value.trim().toLocaleLowerCase());
      if (isCity) {
        currentTarget.classList.add('place-selected');
      } else {
        currentTarget.classList.remove('place-selected');
      }
    });
    ul.dataset.input = true;
  }
}

function renderHelper(arr, attr, txt) {
  const fragment = new DocumentFragment();

  const placeholder = document.createElement('li');
  placeholder.textContent = txt;
  placeholder.classList.add('orangepoints');
  fragment.append(placeholder);

  for (const element of arr) {
    const li = document.createElement('li');
    li.dataset.getInput = attr;
    li.textContent = element;
    li.classList.add('subpoints');
    fragment.append(li);
  }

  return fragment;
}

function getDefaultStatesFragment(stateFragment) {
  return stateFragment.cloneNode(true);
}

export function workFlowStatemaster(statemaster) {
  renderStatemaster(statemaster);
  statemasterDataMap.set('statemasterGlobal', statemaster);
  statemasterGlobal = statemaster;
}

function renderDefaultStates(states) {
  const ul = stateDropDownUL();

  const masterFragment = renderHelper(states, 'form-state', 'States');
  const fragment = getDefaultStatesFragment(masterFragment);
  ul.replaceChildren(fragment);
}

function stateLoanFilter(loanType) {
  const loanProduct = loanType;
  const newStates = {};

  for (const state in statemasterGlobal) {
    const stateDataArr = statemasterGlobal[state].data;
    const stateObj = {
      cities: [],
    };

    for (let i = 0; i < stateDataArr.length; i++) {
      const isCityExists = stateObj.cities.includes(stateDataArr[i].city);
      const isCityLimit = stateObj.cities.length == statemasterGlobal[state].cities.length;

      if (isCityLimit) break;

      if (isCityExists) continue;

      const productsOffered = stateDataArr[i].product.split(',').map(p => p.trim());

      if (productsOffered.length == 4) {
        stateObj.cities.push(stateDataArr[i].city);
        continue;
      }

      if (productsOffered.includes(loanProduct)) {
        stateObj.cities.push(stateDataArr[i].city);
      }
    }

    if (stateObj.cities.length) {
      newStates[state] = stateObj;
    }
  }


  const states = Object.keys(newStates).sort();
  const fragment = states.length > 0 ? renderHelper(states, 'form-state', 'States') : renderHelper(states, 'form-state', 'No options');
  const ul = stateDropDownUL();
  ul.replaceChildren(fragment);
  productStatemaster = newStates;
  statemasterDataMap.set('productStatemaster', newStates);

  productStates = newStates;
  statemasterDataMap.set('productStates', states);
}
