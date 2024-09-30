import { generateDetailedTeaserDOM } from '../detailed-teaser/detailed-teaser.js';
import { generateTeaserDOM } from '../teaser/teaser.js';
import { renderTeaserHTMLFactory } from '../teaserv2/teaserv2.js';

const carouselContainerMapping = {}
carouselContainerMapping["detailed-teaser"] = generateDetailedTeaserDOM;
carouselContainerMapping["teaserv2"] = renderTeaserHTMLFactory;

export default function decorate(block) {
    const tabid = block.children[0].innerText.trim();
    const tabclass = block.children[1].innerText.trim() || "dp-none";
    const section = block.closest(".section");
    const tabName = section.querySelector("#" + tabid);
    block.classList.add(tabclass);
    if (tabclass === "active") {
        tabName.classList.add("active");
    }
    const panelContainer = document.createElement('div');
    panelContainer.classList.add('panel-container');
    block.dataset.id = tabid.trim().replace(/ /g, '-');
    const panels = Array.from(block.children).slice(2);
    block.children[0].remove();
    block.children[1].remove();
    [...panels].forEach((panel, i) => {
        // generate the  panel
        const [imagebg, image, classList, ...rest] = panel.children;
        const classesText = classList.textContent.trim();
        const classes = (classesText ? classesText.split(',') : []).map((c) => c && c.trim()).filter((c) => !!c);
        let blockType = 'teaser';
        let generateOtherComponent = null;
        classes.forEach(function (className) {
            if (carouselContainerMapping[className]) {
                blockType = className;
                generateOtherComponent = carouselContainerMapping[className];
            }
        })
        generateOtherComponent = generateOtherComponent ? generateOtherComponent([imagebg, image, ...rest], classes) : generateTeaserDOM([imagebg, image, ...rest], classes);
        panel.textContent = '';
        panel.classList.add(blockType, 'block');
        classes.forEach((c) => panel.classList.add(c.trim()));
        panel.dataset.panel = `panel_${i}`;
        panel.append(generateOtherComponent);
        panelContainer.append(panel);
    });
    block.textContent = '';
    block.append(panelContainer);
}