import { showingStateCity } from "../../scripts/common.js";
import { onClickCity, onClickState } from "./branchlocator-biz.js";
import { setLocationObj } from "./branchlocator-init.js";
import { sortElements } from "./sort.js";

export function renderState(block, setLocationObj) {
  const renderStateLi = block.closest(".section").querySelector(".state-wrapper > .option-wrapper");
  renderStateLi.innerHTML = setLocationObj.stateLi;
  sortElements(renderStateLi);
  setupStateInteractions(block);
}

export function renderCity(block) {
  const renderCityLi = block.closest(".section").querySelector(".city-wrapper > .option-wrapper");
  renderCityLi.innerHTML = setLocationObj.cityLi;
  sortElements(renderCityLi);
  setupCityInteractions(block);
}

function setupStateInteractions(block) {
  setupDropdownToggle(block, ".default-state-selected", ".city-wrapper");
  setupSearch(block);
  onClickState(block);
}

function setupCityInteractions(block) {
  setupDropdownToggle(block, ".default-city-selected", ".state-wrapper");
  setupSearch(block);
  onClickCity(block);
}

function setupDropdownToggle(block, toggleSelector, otherWrapperSelector) {
  const section = block.closest(".section");
  const toggleElement = section.querySelector(toggleSelector);
  const dropdownWrapper = toggleElement.parentElement.querySelector(".dropdown-option-wrapper");
  const otherWrapper = section.querySelector(otherWrapperSelector);

  toggleElement.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    const searchInputs = section.querySelectorAll(".search-input");
    showingStateCity(searchInputs);

    otherWrapper.classList.add("dp-none");
    otherWrapper.querySelector("input").value = "";
    dropdownWrapper.classList.toggle("dp-none");
  });
}

function setupSearch(block) {
  const searchInputs = block.closest(".section").querySelectorAll(".search-input");
  searchInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      const currValue = e.target.value.replace(/[^a-zA-Z ]+/g, "").toLowerCase();
      e.target.value = currValue;

      const allItems = input.parentElement.querySelectorAll("[data-info]");
      allItems.forEach((item) => {
        item.classList.toggle("dp-none", !item.textContent.toLowerCase().includes(currValue));
      });
    });
  });
}
