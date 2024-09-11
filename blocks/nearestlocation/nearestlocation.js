import { setLocationObj } from "../moredetailsaddress/moredetailsaddress";

export function nearestLoction() {

    if(!setLocationObj.storedata.length > 1){
        return false;
    }
    
    let branch_cards = "";
    setLocationObj.storedata.forEach(element => {
        debugger;
        branch_cards += `<div class='cards-branches cards-branches-container mt-45 mb-40 mob-mb-45'>
                <div class='title'>
                     <h2 class="title-to-show"> Find all Mumbai Branches here </h2>
                </div>
                <div class='cards-container'>
                    <div class='cards-wrapper branch-list-wrapper'>
                        <div class='card-box'>
                            <h3 class='card-title'>Kandivali (West)</h3>
                            <p class='card-address'>Om Plaza, 3rd Floor, Opposite Railway Station, Kandivali (West), Mumbai-400067, Maharashtra</p>
                            <p class='card-gmail'> <span> <img src='/images/gmail.svg' alt='gmail-icon'/> </span> customercare@piramal.com</p>
                            <a href="#" id='more-details-btn'> More details </a>
                        </div> 
                    </div>
                </div>
            </div>`;
    });
       
    return branch_cards;
}