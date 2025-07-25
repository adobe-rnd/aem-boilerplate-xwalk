import { toggleAllNavSections } from '../blocks/header/header.js';
import { body, showingStateCity } from './common.js'
import { targetObject } from './scripts.js';

export default function eventInit() {
    body?.addEventListener('click', (e) => {
        const target = e.target;
        const loaninnerform = document.querySelector('.loan-form-sub-parent');
        const modalOverlay = document.querySelector('.modal-overlay');
      
        try {
          handleModelClick(target, loaninnerform, modalOverlay);
          handleNavClick(target);
          handleOverlayClick(target);
          handleStakePopupClick(target);
          handleNeeyatLanguageDropdown(target);
          handleBranchLocatorDropdown(target);
          handleAuthoriseAgencies(target);
        } catch (error) {
          console.warn(error);
        }
      
      });
}

function handleModelClick(target, loaninnerform, modalOverlay) {
  if (!target.closest('.show') && targetObject.model && loaninnerform?.style.visibility !== 'visible') {
    targetObject.model?.querySelector('.overlayDiv').classList.remove('show');
    document.body.style.overflow = 'scroll';
    updateModalOverlay(modalOverlay);
    updateLoanInnerForm(loaninnerform);
  }
}

function handleNavClick(target) {
    if (!target.closest('.nav-drop')) {
      const nav = document.getElementById('nav');
      const navSections = nav.querySelector('.nav-sections');
      updateNavSections(navSections);
    }
  }

  function handleOverlayClick(target) {
    if (target.classList.contains('overlay')) {
      targetObject.models?.forEach(model => {
        model.classList.add('dp-none');
        model.classList.remove('overlay');
      });
    }
  }

  function handleStakePopupClick(target) {
    if (!target.closest('.stake-pop-up')) {
      if (!document.querySelector('.stake-pop-up')?.length > 0) return false;
      document.querySelector('.partnership-tab-content.partnership-image-popup .cmp-text.active')?.classList.remove('active');
      updateStakePopups();
    }
  }

  function handleNeeyatLanguageDropdown(target) {
    if (document.querySelector('.neeyat-header') && !target.closest('.inner-lang-switch')) {
      document.querySelector('.maindiv-lang-switch ul')?.classList.add('dp-none');
    }
  }
  
  function handleBranchLocatorDropdown(target) {
    if (document.querySelector('.branch-locater-banner')) {
      if (!target.classList.contains('search-input') &&
        (!target.closest('.default-state-selected') || !target.closest('.default-city-selected'))) {
        updateBranchLocator();
      }
    }
  }
  
  function handleAuthoriseAgencies(target) {
    if (!target.closest('.toggleCityContainer') && !target.closest('.select-container') && !target.closest('fieldset') && !target.closest('cityBlack')) {
      const selectContainer = document.querySelector('.select-container');
      const citiesContainer = document.querySelector('.cities-container');
      if (selectContainer?.classList.contains('open') && selectContainer && citiesContainer) {
        citiesContainer.style.display = 'none';
        selectContainer.classList.remove('open');
      }
    }
  }

  function updateModalOverlay(modalOverlay) {
    modalOverlay.classList.remove('overlay');
    modalOverlay.classList.add('dp-none');
    modalOverlay.style.zIndex = 'revert-layer';
  }
  
  function updateLoanInnerForm(loaninnerform) {
    if (loaninnerform) {
      const ulFormBranch = document.createElement('li');
      ulFormBranch.textContent = "No options";
      ulFormBranch.classList.add('orangepoints');
      loaninnerform.querySelector('#branchcontainer ul').innerHTML = ulFormBranch.outerHTML;
    }
  }

  function updateNavSections(navSections) {
    navSections?.children[0]?.classList.remove('active');
    navSections?.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach(navSection => {
      toggleAllNavSections(navSections);
      navSection.setAttribute('aria-expanded', 'false');
      navSections.setAttribute('aria-expanded', 'false');
      if (document.body.classList.contains('modal-open') && navSection.getAttribute('aria-expanded') === 'false') {
        document.body.classList.remove('modal-open');
      }
    });
  }

  function updateStakePopups() {
    document.querySelectorAll('.stake-pop-up').forEach(ele => {
      ele.classList.remove('dp-block');
      ele.classList.add('dp-none');
    });
    document.body.style.overflow = 'auto';
    document.querySelector('.modal-overlay').classList.remove('overlay');
    document.querySelector('.modal-overlay').classList.add('dp-none');
  }
  
  function updateBranchLocator() {
    const searchInput = document.querySelectorAll('.search-input');
    showingStateCity(searchInput);
    document.querySelector('.state-wrapper').classList.add('dp-none');
    document.querySelector('.city-wrapper').classList.add('dp-none');
    document.querySelector('.state-wrapper > input').value = '';
    document.querySelector('.city-wrapper > input').value = '';
  }