import { ctaClickInteraction } from "../../dl.js";

export default function decorate(block) {
  if (block.closest(".section.partnership-tab-content")) {
    block.querySelectorAll(".rte-wrapper li").forEach((eachLi) => {
      eachLi.addEventListener("click", function (e) {
        let data = {};
        data.click_text = this.textContent.trim();
        data.cta_position = e.target.closest(".section").querySelector(".default-content-wrapper").querySelector("h1, h2, h3, h4, h5, h6").textContent.trim();
        ctaClickInteraction(data);
      });
    });
  }
}
