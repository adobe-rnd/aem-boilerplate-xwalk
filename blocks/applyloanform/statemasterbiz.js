
import { brachDropDownUl, branchInput, loanProduct, stateDropDownUL, stateInput } from "./loanformdom.js";
import { statemasterDataMap } from "./statemasterDataMapping.js";

let statemasterGlobal = statemasterDataMap.get("statemasterGlobal") || {};
let productStatemaster = {};
let productStates = [];

let defaultCityLi = brachDropDownUl().querySelector(".orangepoints");


function stateMasterProcessData(statemasterRaw) {
    const statemasterArr = statemasterRaw.filter(stateobj => Boolean(stateobj.state) && stateobj.state != "#N/A");
    let statemaster = statemasterArr.reduce((statemasterObj, obj) => {
        let stateObj = {};
        let innerObj = {};
        innerObj.data = obj.data.map(d => JSON.parse(d));
        innerObj.cities = innerObj.data.reduce((cityArr, cityObj) => (cityArr.includes(cityObj.city) ? cityArr : (cityArr.push(cityObj.city), cityArr)), []);
        stateObj[obj.state.trim()] = innerObj;
        Object.assign(statemasterObj, stateObj);
        return statemasterObj;
    }, {});
    //console.log(statemaster);
    return statemaster;    
}

function renderStatemaster(statemaster) {
    let states = Object.keys(statemaster).sort();

    renderDefaultStates(states);

    let buttonExpert = document.querySelectorAll(".expert");
    buttonExpert.forEach(function(btn) {
        btn.addEventListener("click", function() {
            renderDefaultStates(states);
            brachDropDownUl().replaceChildren(defaultCityLi);
            productStatemaster = {};
            productStates = [];
        });
    });

    stateInput().addEventListener("change", function({currentTarget}) {
        let state = (productStates.length ? productStates : states).filter(state => state.toLowerCase() === currentTarget.value.toLowerCase())[0];
        if(state) {
            renderCities(state);
            currentTarget.classList.add("place-selected");
        } else {
            renderCities([]);
            currentTarget.classList.remove("place-selected");
        }

        branchInput().value = "";

    });

    loanProduct().addEventListener("change", function({currentTarget}) {
        stateLoanFilter(currentTarget.dataset.loanType);
    });

    stateInput().addEventListener("keyup", function({currentTarget}) {
        const ul = stateDropDownUL();

        let searchStates = (productStates.length ? productStates : states).filter(state => state.toLocaleLowerCase().includes(currentTarget.value.trim().toLocaleLowerCase()));
        let serachFragment = searchStates.length > 0 ? renderHelper(searchStates, "form-state", "States") : renderHelper(searchStates, "form-state", "No options");
        ul.replaceChildren(serachFragment);
    });

    stateInput().addEventListener("input", function({currentTarget}) {
        let isState = (productStates.length && loanProduct().value ? productStates : states).map(s => s.toLocaleLowerCase()).includes(currentTarget.value.trim().toLocaleLowerCase());
        if(isState) {
            currentTarget.classList.add("place-selected");
        } 
        else {
            currentTarget.classList.remove("place-selected");
        }
    });
}

function renderCities(state) {
    const ul = brachDropDownUl();
    
    let isProduct = loanProduct().value.trim() != "";
    let cities = (isProduct ? productStatemaster[state]?.cities : statemasterGlobal[state]?.cities) || [];
    let fragment = cities.length > 0 ? renderHelper(cities, "form-branch-city", "Cities") : renderHelper(cities, "form-branch-city", "No options");
    ul.replaceChildren(fragment);

    statemasterDataMap.set("loanCities", cities);

    if(!ul.dataset.keyup) {
        branchInput().addEventListener("keyup", function({currentTarget}) {
        let cities = statemasterDataMap.get("loanCities");

        let serachCities = cities.filter(city => city.toLocaleLowerCase().includes(currentTarget.value.trim().toLocaleLowerCase()));

        let serachFragment = serachCities.length > 0 ? renderHelper(serachCities, "form-branch-city", "Cities") : renderHelper(serachCities, "form-branch-city", "No options");
            ul.replaceChildren(serachFragment);
        });

        ul.dataset.keyup = true;
    }


    if(!ul.dataset.input) {
        branchInput().addEventListener("input", function({currentTarget}) {
            let cities = statemasterDataMap.get("loanCities");

            let isCity = cities.map(city => city.toLocaleLowerCase()).includes(currentTarget.value.trim().toLocaleLowerCase());
            if(isCity) {
                currentTarget.classList.add("place-selected");
            }
            else {
                currentTarget.classList.remove("place-selected");
            }
        });
        ul.dataset.input = true;
    }
}

function renderHelper(arr, attr, txt) {
    const fragment = new DocumentFragment();

    const placeholder = document.createElement("li");
    placeholder.textContent = txt;
    placeholder.classList.add("orangepoints");
    fragment.append(placeholder);

    for (const element of arr) {
        const li = document.createElement("li");
        li.dataset.getInput = attr;
        li.textContent = element;
        li.classList.add("subpoints");
        fragment.append(li);
    }

    return fragment;
}

function getDefaultStatesFragment(stateFragment) {
    return stateFragment.cloneNode(true)
}

export function workFlowStatemaster(rawStatemaster) {
    let statemaster = stateMasterProcessData(rawStatemaster);
    renderStatemaster(statemaster);
    statemasterDataMap.set("statemasterGlobal", statemaster);
    statemasterGlobal = statemaster;
}

function renderDefaultStates(states) {
    const ul = stateDropDownUL();

    let masterFragment = renderHelper(states, "form-state", "States");
    let fragment = getDefaultStatesFragment(masterFragment)
    ul.replaceChildren(fragment);
}

function stateLoanFilter(loanType) {
    let loanProduct = loanType;
    let newStates = {};

    for(let state in statemasterGlobal) {
        let stateDataArr = statemasterGlobal[state].data;
        let stateObj = {
            cities: []
        };

        for(let i = 0 ; i < stateDataArr.length; i++) {
            let isCityExists = stateObj.cities.includes(stateDataArr[i].city);
            let isCityLimit = stateObj.cities.length == statemasterGlobal[state].cities.length;

            if(isCityLimit) break;
            
            if(isCityExists) continue;
                    
            let productsOffered = stateDataArr[i].product.split(",");
            if(productsOffered.length == 4) {
                stateObj.cities.push(stateDataArr[i].city);
                continue;
            }

            if(productsOffered.includes(loanProduct)) {
                stateObj.cities.push(stateDataArr[i].city);
            }
        }

        if(stateObj.cities.length) {
            newStates[state] = stateObj;
        }
    }

    //console.log(newStates);
    
    let states = Object.keys(newStates).sort();
    let fragment = states.length > 0 ? renderHelper(states, "form-state", "States") : renderHelper(states, "form-state", "No options");
    let ul = stateDropDownUL();
    ul.replaceChildren(fragment);
    statemasterDataMap.set("productStatemaster", newStates);
    productStatemaster = statemasterDataMap.get("productStatemaster");

    statemasterDataMap.set("productStates", states);
    productStates = statemasterDataMap.get("productStates");
}