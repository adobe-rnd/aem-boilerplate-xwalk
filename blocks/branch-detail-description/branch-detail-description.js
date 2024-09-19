import { intertextLinkingInteraction } from "../../dl.js";
import { setLocationObj } from "../moredetailsaddress/moredetailsaddress.js";


export default function decorate(block) {
    
    let {pagecontent, geoInfo:{city}} = setLocationObj;

    if(!pagecontent){
      return false;
    }

    let slicedbold = pagecontent.split(" ").slice(0, 14).join(" ");
    let slicedData = pagecontent.split(" ").slice(14, 90).join(" ");
    let seemoreContent = pagecontent.split(" ").slice(90).join(" ");
    block.innerHTML = `
        <div class="branch-description-wrapper">
            <h2 class="branch-heading">About Piramal Finance ${city} Branch</h2>
            <p>
                <span class="branch-description-content">
                    <strong>${slicedbold}</strong>${slicedData}
                    <span class='dp-none'>${seemoreContent}</span>
                </span>
                <button class="button-container">Read More</button>
            </p>
        </div>
    `;

    let button = block.querySelector(".button-container");
    let description = block.querySelector(".branch-description-content");
    button.addEventListener("click", (e) => {
        try {
            const dataAnalytics = {}
            dataAnalytics.click_text = e.target.textContent.trim().toLowerCase()
            intertextLinkingInteraction(dataAnalytics)
        } catch (error) {
            console.warn(error);
        }
        description.querySelector('.dp-none').classList.remove('dp-none');
        button.classList = 'dp-none';
    });


}
