import { showingStateCity } from '../../scripts/scripts.js';
import { onClickCity, onClickState } from './branchlocator-biz.js';
import { setLocationObj } from './branchlocator-init.js';
import { sortElements } from './sort.js';

export function renderState(block, setLocationObj) {
  const renderStateLi = block.closest('.section').querySelector('.state-wrapper > .option-wrapper');
  renderStateLi.innerHTML = setLocationObj.stateLi;
  sortElements(renderStateLi);
  hideshowState(block);
  searchStateCity(block);
  onClickState(block);
}

export function renderCity(block) {
  const renderCityLi = block.closest('.section').querySelector('.city-wrapper > .option-wrapper');
  renderCityLi.innerHTML = setLocationObj.cityLi;
  sortElements(renderCityLi);
  hideshowCity(block);
  searchStateCity(block);
  onClickCity(block);
}

function hideshowState(block) {
  block.closest('.section').querySelector('.default-state-selected').addEventListener('click', function (e) {
    e.stopImmediatePropagation();
    const searchInput = block.closest('.section').querySelectorAll('.search-input');
    showingStateCity(searchInput);
    block.closest('.section').querySelector('.city-wrapper').classList.add('dp-none');
    block.closest('.section').querySelector('.city-wrapper input').value = '';
    if (this.parentElement.querySelector('.dropdown-option-wrapper').classList.contains('dp-none')) {
      this.parentElement.querySelector('.dropdown-option-wrapper').classList.remove('dp-none');
    } else {
      this.parentElement.querySelector('.dropdown-option-wrapper').classList.add('dp-none');
    }
  });
}

function hideshowCity(block) {
  block.closest('.section').querySelector('.default-city-selected').addEventListener('click', function (e) {
    e.stopImmediatePropagation();
    const searchInput = block.closest('.section').querySelectorAll('.search-input');
    showingStateCity(searchInput);
    block.closest('.section').querySelector('.state-wrapper').classList.add('dp-none');
    block.closest('.section').querySelector('.state-wrapper input').value = '';
    if (this.parentElement.querySelector('.dropdown-option-wrapper').classList.contains('dp-none')) {
      this.parentElement.querySelector('.dropdown-option-wrapper').classList.remove('dp-none');
    } else {
      this.parentElement.querySelector('.dropdown-option-wrapper').classList.add('dp-none');
    }
  });
}

function searchStateCity(block) {
  block.closest('.section').querySelectorAll('.search-input').forEach((eachSearch) => {
    eachSearch.addEventListener('input', (e) => {
      e.target.value = e.target?.value.replace(/[^a-zA-Z ]+/g, '');
      const currValue = e.target?.value.toLowerCase();
      const allValue = eachSearch.parentElement.querySelectorAll('[data-info]');
      allValue.forEach((eachLi) => {
        if (eachLi.textContent.toLowerCase().includes(currValue)) {
          eachLi.classList.remove('dp-none'); // Show the matching item
        } else {
          eachLi.classList.add('dp-none'); // Hide non-matching items
        }
      });
    });
  });
}
