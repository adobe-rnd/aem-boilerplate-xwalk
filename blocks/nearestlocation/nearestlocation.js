import { branchURLStr } from "../../scripts/scripts.js";
import { setLocationObj } from "../moredetailsaddress/moredetailsaddress.js";

export function nearestLoction() {

    let {storedata} = setLocationObj;
    if(storedata.length == 0){
        return false;
    }


    let branch_cards = "";
    let cityName = storedata[0]['City'];
    storedata.forEach(eachLocation => {
        let eachState = eachLocation['State']
        let eachCity = eachLocation['City']
        let eachLocationCode = eachLocation['Location Code'];
        let eachLocationAdd = eachLocation['Location'];
        branch_cards += `
        <div class='card-box'>
        <h3 class='card-title'>${eachLocation['Location']}</h3>
        <p class='card-address'>${eachLocation['Address']}</p>
        <p class='card-gmail'> <span> <img src='/images/gmail.svg' alt='gmail-icon'/> </span> customercare@piramal.com</p>
        <a href="${branchURLStr(eachLocationAdd ,eachCity, eachState, "loans", eachLocationCode)}" id='more-details-btn'> More details </a>
        </div>`;
        // <a href="/branch-locator/${eachState}/${eachCity}/loans-in-${eachCity}-${eachState}-${eachLocationCode}" id='more-details-btn'> More details </a>
    });

    let mainWrapperNearest = 
    `<div class='cards-branches cards-branches-container mt-45 mb-40 mob-mb-45'>
            <div class='title'>
                 <h2 class="title-to-show"> Find all ${cityName} Branches here </h2>
            </div>
            <div class='cards-container'>
                <div class='cards-wrapper branch-list-wrapper'>
                    ${branch_cards}
                </div>
            </div>
        </div>`;
      
    return mainWrapperNearest;
}

export default function decorate(block) {
    let DOMnearestBranch = nearestLoction(block);
    if(DOMnearestBranch){
        block.innerHTML = DOMnearestBranch;
    }
}