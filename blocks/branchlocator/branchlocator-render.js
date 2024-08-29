import { onClickCity, onClickState } from "./branchlocator-biz.js";
import { setLocationObj } from "./branchlocator-init.js";

export function renderState(block, setLocationObj){
    let renderStateLi = block.closest('.section').querySelector('.state-wrapper > .option-wrapper');
    renderStateLi.innerHTML = setLocationObj.stateLi;
    hideshowState(block);
    searchStateCity(block);
    onClickState(block);
}

function hideshowState(block){
        block.closest('.section').querySelector('.deafult-state-selected').addEventListener('click', function (e) {
            e.stopImmediatePropagation();
            if(this.parentElement.querySelector('.dropdown-option-wrapper').classList.contains('dp-none')){
                this.parentElement.querySelector('.dropdown-option-wrapper').classList.remove('dp-none');
            }else{
                this.parentElement.querySelector('.dropdown-option-wrapper').classList.add('dp-none');
            }
        });
}

function hideshowCity(block){
        block.closest('.section').querySelector('.deafult-city-selected').addEventListener('click', function (e) {
            e.stopImmediatePropagation();
            if(this.parentElement.querySelector('.dropdown-option-wrapper').classList.contains('dp-none')){
                this.parentElement.querySelector('.dropdown-option-wrapper').classList.remove('dp-none');
            }else{
                this.parentElement.querySelector('.dropdown-option-wrapper').classList.add('dp-none');
            }
        });
}

function searchStateCity(block){
    block.closest('.section').querySelectorAll('.search-input').forEach(function (eachSearch){
        eachSearch.addEventListener('input', function (e) {
            let currValue = e.target?.value.toLowerCase();
            let allValue = eachSearch.parentElement.querySelectorAll('[data-info]');
            allValue.forEach(eachLi => {
                if (eachLi.textContent.toLowerCase().includes(currValue)) {
                    eachLi.classList.remove('dp-none'); // Show the matching item
                } else {
                    eachLi.classList.add('dp-none'); // Hide non-matching items
                }
            });
        });
    });
}

export function renderCity(block){
    let renderCityLi = block.closest('.section').querySelector('.city-wrapper > .option-wrapper');
    renderCityLi.innerHTML = setLocationObj.cityLi;
    hideshowCity(block);
    searchStateCity(block);
    onClickCity(block);
}

  
