import { createCarousle, getProps } from "../../scripts/scripts.js";

function createButton(text, picture) {
    const button = document.createElement("button");
    button.classList.add("carousel-control", text);
    button.innerHTML = (picture)
    return button;
}
export function generateTabName(block) {
    // const [name, id, type] = block.children;
    // const names = name.innerText.split(",");
    // const ids = id.innerText.split(",");
    // const classes = type.innerText.trim();
    let [name, id, typename, classes, prev, next, nestedTabId, nestedTabActive, ...imageSrc] = getProps(block, {
        index: [4, 5]
    });
    const names = name.split(",");
    const ids = id.split(",");
    const imagesSrc = [...imageSrc];

    let tabsTemplate = '';
    block.innerHTML = '';
    block.classList.add(classes ? classes : "normal");
    const carouselInner = document.createElement("div");
    carouselInner.classList.add("carousel-inner");
    carouselInner.id = "carouselInner";
    names.forEach(function (eachName, index) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = imagesSrc[index];
        img.alt = eachName;
        img.id = ids[index].trim().replace(/ /g, '-');
        div.id = ids[index].trim().replace(/ /g, '-');
        if (index) {
            div.classList.add("carousel-item");
        } else {
            div.classList.add("carousel-item", "active");
        }
        div.append(imagesSrc[index] ? img : eachName.trim());
        carouselInner.append(div);
        // carouselInner.append(imagesSrc[index] ? img : div);
        // observer.observe(div);
        // tabsTemplate += `<div id="${ids[index].trim().replace(/ /g, '-')}">${eachName.trim()}</div>`
    });

    const prevButton = createButton("prev", prev?.outerHTML);
    const nextButton = createButton("next", next?.outerHTML);
    prevButton.classList.add(classes === "normal" ? "dp-none" : "dp-normal");
    nextButton.classList.add(classes === "normal" ? "dp-none" : "dp-normal");
    // <button class="carousel-control prev" onclick="prevSlide()">&#10094;</button>
    // <button class="carousel-control next" onclick="nextSlide()">&#10095;</button>
    block.append(carouselInner);
    // classes = classes == "normal" ? "glider" : classes; // Line to removed
    if(classes == "glider"){
        console.log("glider");
    }else if (classes === "carousel") {
        createCarousle(block, prevButton, nextButton);
    }

    block.addEventListener("click", function (e) {
        let currentEl = e.target;
        if(classes == "glider" && (currentEl.closest('.glider-prev') || currentEl.closest('.glider-next'))){
            currentEl = currentEl.closest('.nested-tab-name-child').querySelector('.carousel-item.active');
        }
        const id = currentEl.id;
        const tabContainer = id && document.querySelector('.tab-container[data-id=' + id + ']')
        const nestedTabName = id && document.querySelector('.nested-tab-name-child[data-id=' + id + ']');
        let firsttab;
        if (nestedTabName) {
            const section = nestedTabName.closest(".section");
            Array.from(nestedTabName.children[0].children).forEach(function (eachTab) {
                eachTab.classList.remove("active");
            })
            if(classes == "glider" || nestedTabName.querySelector('.carousel-inner.glider')){
                firsttab = nestedTabName.children[0].children[0].children[0];
            }else{
                firsttab = nestedTabName.children[0].children[0];
            }
            section.querySelectorAll('.tab-container[data-id]').forEach(function (el, index) {
                section.querySelector(".tab-name")?.children[0].children[index].classList.remove("active");
                section.querySelector(".nested-tab-name-child")?.children[0]?.children[index]?.classList.remove("active");
                el.classList.add("dp-none");
                el.classList.remove("active");
            })
            section.querySelector('.tab-container[data-id=' + firsttab.id + ']').classList.add("active")
            section.querySelector('.tab-container[data-id=' + firsttab.id + ']').classList.remove("dp-none")
            section.querySelectorAll(".nested-tab-name-child").forEach(function (el, index) {
                // section.querySelector(".tab-name").children[0].children[index].classList.remove("active");
                section.querySelector(".tab-name-nested").children[0].children[0].children[index].classList.remove("active");
                el.classList.add("dp-none");
                el.classList.remove("active");
            })
            firsttab.classList.add("active");
            nestedTabName.classList.remove("dp-none");
            nestedTabName.classList.add("active");
            currentEl.classList.add("active");
            currentEl.closest(".carousel-item")?.classList.add("active");
        } else if (tabContainer) {
            const section = tabContainer.closest(".section");
            section.querySelectorAll(".tab-container").forEach(function (el, index) {
                // section.querySelector(".tab-name").children[0].children[index].classList.remove("active");
                section.querySelector(".tab-name")?.children[0].children[index].classList.remove("active");
                if(classes == "glider"){
                    section.querySelector(".nested-tab-name-child.active")?.children[0]?.children[0]?.children[index]?.classList.remove("active");
                }else{
                    section.querySelector(".nested-tab-name-child.active")?.children[0]?.children[index]?.classList.remove("active");
                }
                el.classList.add("dp-none");
                el.classList.remove("active");
            })
            tabContainer.classList.remove("dp-none");
            tabContainer.classList.add("active");
            currentEl.classList.add("active");
            currentEl.closest(".carousel-item")?.classList.add("active");
        }
        if (document.querySelector(".section.tab-with-cards-wrapper .tab-name-wrapper")) {
            if (!(document.querySelector(".section.partnerships-cards-wrapper").classList.contains(id) && currentEl.classList.contains("active"))) {
                document.querySelector(".section.partnerships-cards-wrapper").classList.add("dp-none");
            }
            else {
                document.querySelector(".section.partnerships-cards-wrapper").classList.remove("dp-none")
            }
        }
    })
    return block;
}

export default function decorate(block) {
    return generateTabName(block);
}