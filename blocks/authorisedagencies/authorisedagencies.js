import { fetchAPI } from "../../scripts/scripts.js";

export default async function decorate(block) {
    let cfURL = block.textContent.trim();
    const cfRepsonse = await fetchApiCall(cfURL);
    const repsonseData = cfRepsonse.data[0].data;
    const jsonResponseData = JSON.parse(repsonseData);

    let cardContainer = document.createElement('div');
    cardContainer.className = "card-container";
    let selectContainer = document.createElement('div');
    let selectCity = document.createElement('select');
    let selectText = document.createElement('p');
    selectText.textContent = "Select Location";

    let cities = Object.keys(jsonResponseData); //converting into array
    cities.forEach(city => {
        let option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        selectCity.appendChild(option);
    })

    function createAndAppend(node, value) {
        let newNode = document.createElement(node);
        newNode.textContent = value;
        return newNode;
    }

    function displayCards(selectedCityName){
        // console.log(selectedCityName);
        cardContainer.innerHTML = "";

        let dataToDisplay = selectedCityName ? { [selectedCityName]: jsonResponseData[selectedCityName] } : jsonResponseData;
        // console.log(dataToDisplay);
        for (let city in dataToDisplay) {

        dataToDisplay[city].forEach(data => {
            // let card = createAndAppend('div', '');
            let card = document.createElement('div');
            card.className = "card";
            // console.log(data);

            let elementLocation = createAndAppend('div', '');
            let location = createAndAppend('p', 'Location');
            elementLocation.appendChild(location);
            let locationValue = createAndAppend('p', data['Location']);
            elementLocation.appendChild(locationValue);
            card.appendChild(elementLocation);

            let elementAgencyAddress = createAndAppend('div', '');
            let agencyAddress = createAndAppend('p', 'Agency Address');
            let agencyAddressValue = createAndAppend('p', data['Agency Address']);
            elementAgencyAddress.appendChild(agencyAddress);
            elementAgencyAddress.appendChild(agencyAddressValue);
            card.appendChild(elementAgencyAddress);

            let elementVendorName = createAndAppend('div', '');
            let vendorName = createAndAppend('p', 'Vendor Name:');
            let vendorNameValue = createAndAppend('p', data['Vendor Name']);
            elementVendorName.appendChild(vendorName);
            elementVendorName.appendChild(vendorNameValue);
            card.appendChild(elementVendorName);

            let elementAgreementDate = createAndAppend('div', '');
            let agreementDate = createAndAppend('p', 'Date of Agreement:');
            let agreementDateValue = createAndAppend('p', data['Date of Agreement']);
            elementAgreementDate.appendChild(agreementDate);
            elementAgreementDate.appendChild(agreementDateValue);
            card.appendChild(elementAgreementDate);

            let elementExpirytDate = createAndAppend('div', '');
            let ExpiryDate = createAndAppend('p', 'Date of Expiry:');
            let ExpiryDateValue = createAndAppend('p', data['Date of Expiry']);
            elementExpirytDate.appendChild(ExpiryDate);
            elementExpirytDate.appendChild(ExpiryDateValue);
            card.appendChild(elementExpirytDate);

            let elementTenure = createAndAppend('div', '');
            let tenure = createAndAppend('p', 'Tenure:');
            let tenureValue = createAndAppend('p', data['Tenure']);
            elementTenure.appendChild(tenure);
            elementTenure.appendChild(tenureValue);
            card.appendChild(elementTenure);

            let elementAgencySignatory = createAndAppend('div', '');
            let agencySignatory = createAndAppend('p', 'Agency Signatory:');
            let agencySignatoryValue = createAndAppend('p', data['Agency owner']);
            elementAgencySignatory.appendChild(agencySignatory);
            elementAgencySignatory.appendChild(agencySignatoryValue);
            card.appendChild(elementAgencySignatory);

            let elementContactNo = createAndAppend('div', '');
            let contactNo = createAndAppend('p', 'Contact No.:');
            let contactNoValue = createAndAppend('p', data['Contact No']);
            elementContactNo.appendChild(contactNo);
            elementContactNo.appendChild(contactNoValue);
            card.appendChild(elementContactNo);

            cardContainer.appendChild(card);
            block.appendChild(cardContainer);
        })
    }
    }

    selectCity.addEventListener('change', ()=> {
        let selectedCityName = selectCity.value;
        if(selectedCityName) {
            displayCards(selectedCityName);
        }
        else{
            cardContainer.innerHTML = "";
        }
    })
    selectContainer.appendChild(selectText);
    selectContainer.appendChild(selectCity);
    block.appendChild(selectContainer);
    displayCards();
}   
export async function fetchApiCall(cfurl) {
    const response = await fetchAPI("GET", cfurl);
    const responseJson = await response.json();
    return responseJson;
}



