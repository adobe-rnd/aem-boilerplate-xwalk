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
    inputLocation.placeholder = inputLocationValue ? inputLocationValue : 'Location ';

    let citiesContainer = createAndAppend('div', "", "cities-container");

    let cityDropdown = createAndAppend('fieldset', "", "");
    let legendField = createAndAppend('legend', "", "");
    legendField.textContent = "locations";
    cityDropdown.appendChild(legendField);
    citiesContainer.appendChild(cityDropdown);

    let cities = Object.keys(jsonResponseData);
    cities.forEach(city => {
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'radio';
        input.value = city;
        input.name = "branchlocation";
        input.addEventListener('change', ()=> {
            displayCards(city);
            inputLocationValue = city;
            inputLocation.placeholder = city;
            inputLocation.className = 'cityBlack' ;
            citiesContainer.style.display = 'none';
        })
        let span = document.createElement('span');
        span.textContent = city;
        label.appendChild(input);
        label.appendChild(span);
        cityDropdown.appendChild(label);
    })

    citiesContainer.style.display = 'none';
    inputLocation.addEventListener('click', ()=> {
        citiesContainer.style.display = citiesContainer.style.display === 'none'? 'block' : 'none';
        selectContainer.classList.toggle('open');
    })

    function createAndAppend(node, value, className) {
        let newNode = document.createElement(node);
        newNode.textContent = value;
        newNode.className = className;
        return newNode;
    }

    function displayCards(selectedCityName){
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

            arr.forEach(item =>{
                let location = item.toLowerCase();
                let newLocation = location.charAt(0).toUpperCase() + location.slice(1); 
                locationValue.textContent += newLocation + ' ';
            })
            
            elementLocation.appendChild(locationValue);
            card.appendChild(elementLocation);

            let elementAgencyAddress = createAndAppend('div', '', '');
            let agencyAddress = createAndAppend('p', 'Agency Address', '');
            let agencyAddressValue = createAndAppend('p', data['Agency Address'], '');
            elementAgencyAddress.appendChild(agencyAddress);
            elementAgencyAddress.appendChild(agencyAddressValue);
            card.appendChild(elementAgencyAddress);

            let elementVendorName = createAndAppend('div', '', '');
            let vendorName = createAndAppend('p', 'Vendor Name:', '');
            let vendorNameValue = createAndAppend('p', data['Vendor Name'], '');
            elementVendorName.appendChild(vendorName);
            elementVendorName.appendChild(vendorNameValue);
            card.appendChild(elementVendorName);

            let elementAgreementDate = createAndAppend('div', '', '');
            let agreementDate = createAndAppend('p', 'Date of Agreement:', '');
            let agreementDateValue = createAndAppend('p', data['Date of Agreement'], '');
            elementAgreementDate.appendChild(agreementDate);
            elementAgreementDate.appendChild(agreementDateValue);
            card.appendChild(elementAgreementDate);

            let elementExpirytDate = createAndAppend('div', '', '');
            let ExpiryDate = createAndAppend('p', 'Date of Expiry:', '');
            let ExpiryDateValue = createAndAppend('p', data['Date of Expiry'], '');
            elementExpirytDate.appendChild(ExpiryDate);
            elementExpirytDate.appendChild(ExpiryDateValue);
            card.appendChild(elementExpirytDate);

            let elementTenure = createAndAppend('div', '', '');
            let tenure = createAndAppend('p', 'Tenure:', '');
            let tenureValue = createAndAppend('p', data['Tenure'], '');
            elementTenure.appendChild(tenure);
            elementTenure.appendChild(tenureValue);
            card.appendChild(elementTenure);

            let elementAgencySignatory = createAndAppend('div', '', '');
            let agencySignatory = createAndAppend('p', 'Agency Signatory:', '');
            let agencySignatoryValue = createAndAppend('p', data['Agency owner'], '');
            elementAgencySignatory.appendChild(agencySignatory);
            elementAgencySignatory.appendChild(agencySignatoryValue);
            card.appendChild(elementAgencySignatory);

            let elementContactNo = createAndAppend('div', '', '');
            let contactNo = createAndAppend('p', 'Contact No.:', '');
            let contactNoValue = createAndAppend('p', data['Contact No'], '');
            elementContactNo.appendChild(contactNo);
            elementContactNo.appendChild(contactNoValue);
            card.appendChild(elementContactNo);

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
}   
export async function fetchApiCall(cfurl) {
    const response = await fetchAPI("GET", cfurl);
    const responseJson = await response.json();
    return responseJson;
}



