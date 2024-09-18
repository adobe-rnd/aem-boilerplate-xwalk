import { ctaClick, ctaClickInteraction, outboundClick } from "../../dl.js";
import { targetObject } from "../../scripts/scripts.js";

export default function decorate(block) {
  const newDiv = createImageWithLink(block);
  if (newDiv) {
    block.innerHTML = "";
    block.appendChild(newDiv);
    if (document.querySelectorAll('.download-piramal-wrapper')) {
      var desktopLinks = document.querySelectorAll('.download-piramal-wrapper .image-href-desktop a');
      var mobileLinks = document.querySelectorAll('.download-piramal-wrapper .image-href-mobile a');
      var anchor_class = desktopLinks.length > 0 ? desktopLinks : mobileLinks;
      anchor_class[0].removeAttribute('href');
      // document.querySelectorAll('.download-piramal-wrapper .image-href-desktop a')[0].removeAttribute('href');
    }
    aTagPreventDefault();
  }
}

function createImageWithLink(block) {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const blockDiv = document.createElement("div");
  const len = block.children.length;
  const click_textel = block.children[len - 2];
  const menu_categoryel = block.children[len - 1];
  click_textel.remove();
  menu_categoryel.remove();
  blockDiv.innerHTML = block.innerHTML.trim();
  const pictureIndex = isMobile ? 3 : 0;
  const textIndex = isMobile ? 5 : 2;
  const blockPic = blockDiv.children[pictureIndex]?.querySelector("picture") || blockDiv.children[0]?.querySelector("picture");
  const hrefElem = blockDiv.children[textIndex]?.innerText.trim() || blockDiv.children[2]?.innerText.trim() || blockDiv.children[textIndex]?.querySelector('a').getAttribute('href') || "";

  if (!blockPic) {
    console.warn("Required elements not found in the block.");
    return document.createElement("div");
  }

  const createHref = document.createElement("a");
  createHref.href = hrefElem;
  createHref.target = "_blank";
  createHref.classList.add("anchor-event-link");
  createHref.appendChild(blockPic);

  const createDiv = document.createElement("div");
  createDiv.classList.add(isMobile ? "image-href-mobile" : "image-href-desktop");
  createDiv.appendChild(createHref);

  createDiv?.addEventListener("click", function (e) {
    try {
      const click_text = click_textel.innerText.trim();
      const menu_category = menu_categoryel.innerText.trim();
      if (block.closest(".footer") && click_text && menu_category) outboundClick(click_text, menu_category, "footer", targetObject.pageName);
      else if (block.closest(".download-piramal-wrapper") && click_text && menu_category) ctaClick(click_text, menu_category, menu_category, targetObject.pageName);
      else if(block.closest('.section.career-social-cards')){
          let data = {};
          let urlText = e.target.closest('a').getAttribute('href').split('/')[2];
          const pattern = /^www\.|\.com$/g;
          const result = urlText.replace(pattern, '');
          data.click_text = result;
          data.cta_position = e.target.closest('.section').querySelector('.wrapper-creation-container .default-content-wrapper p').textContent.trim();
          ctaClickInteraction(data);
      }
    } catch (error) {
      console.warn(error);
    }
  })
  return createDiv;
}

function aTagPreventDefault() {
  const anchorLinks = document.querySelectorAll('.anchor-event-link');

  anchorLinks?.forEach(link => {
    if (link.getAttribute('href') === '#') {
      link.addEventListener('click', e => e.preventDefault());
    }
  });
}