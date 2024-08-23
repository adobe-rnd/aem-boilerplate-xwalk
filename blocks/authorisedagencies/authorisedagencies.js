import { fetchAPI } from "../../scripts/scripts.js";

export default async function decorate(block) {
    let cfURL = block.textContent.trim();
    const cfRepsonse = await fetchApiCall(cfURL);
    const repsonseData = cfRepsonse.data[0].data;
    const jsonResponseData = JSON.parse(repsonseData);
    let selectContainerWrapper = createAndAppend('div', "", "select-container-wrapper");
    let selectContainer = createAndAppend('div', "", "select-container");
    let cardContainer = createAndAppend('div', "", "card-container");

    let selectText = createAndAppend('label', "", "");
    selectText.textContent = "Select Location";

    var inputLocationValue;

    let inputLocation = createAndAppend('input', "", "toggleCityContainer");
    inputLocation.readOnly = true;
    inputLocation.value = inputLocationValue ? inputLocationValue : 'Location ';

    let citiesContainer = createAndAppend('div', "", "cities-container");

    let cityDropdown = createAndAppend('fieldset', "", "");
    let legendField = createAndAppend('legend', "", "");
    legendField.textContent = "locations";
    cityDropdown.appendChild(legendField);
    citiesContainer.appendChild(cityDropdown);
    let sortedCities = Object.keys(jsonResponseData).sort((a, b) =>a.localeCompare(b, undefined, { sensitivity: 'base' }))
    // let cities = Object.keys(jsonResponseData);
    sortedCities.forEach(city => {
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'radio';
        input.value = city;
        input.name = "branchlocation";
        input.addEventListener('change', () => {
            displayCards(city);
            inputLocationValue = city;
            inputLocation.value = city;
            inputLocation.className = 'cityBlack';
            citiesContainer.style.display = 'none';
            selectContainer.classList.toggle('open');
        })
        let span = document.createElement('span');  
        span.textContent = city;
        label.appendChild(input);
        label.appendChild(span);
        cityDropdown.appendChild(label);
    })

    citiesContainer.style.display = 'none';
    inputLocation.addEventListener('click', () => {
        citiesContainer.style.display = citiesContainer.style.display === 'none' ? 'block' : 'none';
        selectContainer.classList.toggle('open');
    })

    function createAndAppend(node, value, className) {
        let newNode = document.createElement(node);
        newNode.textContent = value;
        newNode.className = className;
        return newNode;
    }

    function displayCards(selectedCityName) {
        cardContainer.innerHTML = "";
        let dataToDisplay = selectedCityName ? { [selectedCityName]: jsonResponseData[selectedCityName] } : jsonResponseData;

        for (let city in dataToDisplay) {
            dataToDisplay[city].forEach(data => {
                let card = document.createElement('div');
                card.className = "card";

                let elementLocation = createAndAppend('div', '', '');
                let location = createAndAppend('p', 'Location', '');
                elementLocation.appendChild(location);

                let arr = data['Location'].split(' ');
                let locationValue = document.createElement('p');

                arr.forEach(item => {
                    let location = item.toLowerCase();
                    let newLocation = location.charAt(0).toUpperCase() + location.slice(1);
                    locationValue.textContent += newLocation + ' ';
                })
                elementLocation.appendChild(locationValue);
                card.appendChild(elementLocation);

                function createSection(card, label, value) {
                    let element = createAndAppend('div', '', '');
                    let labelElement = createAndAppend('p', label, '');
                    let valueElement = createAndAppend('p', value, '');
                    element.appendChild(labelElement);
                    element.appendChild(valueElement);
                    card.appendChild(element);
                }

                createSection(card, 'Agency Address', data['Agency Address']);
                createSection(card, 'Vendor Name:', data['Vendor Name']);
                createSection(card, 'Date of Agreement:', data['Date of Agreement']);
                createSection(card, 'Date of Expiry:', data['Date of Expiry']);
                createSection(card, 'Tenure:', data['Tenure']);
                createSection(card, 'Agency Signatory:', data['Agency owner']);
                createSection(card, 'Contact No.:', data['Contact No']);

                cardContainer.appendChild(card);
                block.appendChild(cardContainer);
            })
        }
    }
    selectContainer.appendChild(selectText);
    selectContainer.appendChild(inputLocation);

    selectContainerWrapper.appendChild(selectContainer);
    selectContainerWrapper.appendChild(citiesContainer);

    block.appendChild(selectContainerWrapper);
    displayCards();
    block.closest("body").addEventListener("click" , function(e){
            if(!e.target.closest(".toggleCityContainer") && !e.target.closest(".select-container")  && !e.target.closest("fieldset") && !e.target.closest("cityBlack")){
                if(block.querySelector(".select-container.open")){
                    if(block.querySelector(".cities-container").style.display =="block"){
                    block.querySelector(".cities-container").style.display ="none";
                    block.querySelector(".select-container").classList.remove("open");
                }
                }
            }})

}
export async function fetchApiCall(cfurl) {
    const response = await fetchAPI("GET", cfurl);
    const responseJson = await response.json();
    return responseJson;
}



