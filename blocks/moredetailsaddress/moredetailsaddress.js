export default function decorate(block) {

    const props = Array.from(block.children, (row) => row.firstElementChild);

    const  [title, desktopdes, mobiledes, openingtime, info, image, imagealt] = props;

    image?.querySelector("picture > img")?.setAttribute("alt", imagealt?.textContent?.trim() || "");

    const html = `
        <div class="address-wrapper">
            <div class="address-title">${title.innerHTML}</div>
            <div class="address-desktop">${desktopdes.innerHTML}</div>
            <div class="address-mobile">${mobiledes.innerHTML}</div>
            <div class="address-timing">${openingtime.innerHTML}</div>
            <div class="address-info">${info.innerHTML}</div>
            <div class="address-img">${image.innerHTML}</div>
        </div>
    `;

    block.innerHTML = html;
}