import { fetchAPI, getProps, renderHelper } from "../../scripts/scripts.js";

export default async function decorate(block) {
    const props = getProps(block);
    const [url, type, sortType] = props;
    block.innerHTML = "";
    try {
        const resp = await fetchAPI("GET", url);
        const data = await resp.json();
        const years = data.result[0];
        let sortedYears;
        if (sortType === 'ascending') {
        sortedYears = Object.keys(years).sort((a, b) => a - b)
        }
        else{
        sortedYears = Object.keys(years).sort((a, b) => b - a)
        }
        // Object.keys(years).forEach(function (year) {
        const monthOrder = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        sortedYears.forEach(function (year) {
            const months = years[year][0];
            let sortedMonths;
            if (sortType === 'ascending') {
                sortedMonths = Object.keys(months).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
            } else {
                sortedMonths = Object.keys(months).sort((a, b) => monthOrder.indexOf(b) - monthOrder.indexOf(a));
            }
            let monthsli = '';
            // Object.keys(months).forEach(function (month) {
            sortedMonths.forEach(function (month) {
                monthsli += `  
                                <div class="subAccordianContent" style="display: nona;">
                                    <div class="publicDisclosuresWrap">
                                        <div class="innersubAccordianContent">
                                            <a href="javascript:;" class="innersubAccordianTitle">${month}</a>
                                            <div class="publicDisclosuresWrap innerSubAccordianData" style="display: none;">
                                                <ul> ${renderHelper(months[month], `
                                                    <div class="forName">    
                                                        <li>
                                                            <a href="{PdfPath}" data-category="{Pdf_Category}" target="_blank">
                                                                <span class="created-date">{Created_Date}</span>
                                                                {Title}</a>
                                                        </li>
                                                    </div>
                                                    `)} 
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
            });
            block.innerHTML += `
                        <section class="accordianpdf-section">
                            <div class="container boxContainer">
                                <div class="accordianContent">
                                    <div class="accordianBox">
                                        <div class="subAccordianWrap">
                                            <div class="subAccordianBox">
                                                <a href="javascript:;" class="subAccordianTitle"
                                                    data-accordianpdf-folderpath="/content/dam/piramalfinance/pdf/stakeholder/financial-reports/2024"
                                                    data-accordianpdf-folderdepth="2">${year}</a>
                                                    <div class="grey-border" style="display: none;">
                                                ${monthsli}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    `
        })

        // Set initial display to none for all subAccordianContent elements
        var subAccordianContents = block.querySelectorAll('.subAccordianContent');
        subAccordianContents.forEach(function (content) {
            content.style.display = 'none';
        });


        // Function to handle click on main accordion titles
        function handleMainAccordionClick(event) {
            block.querySelectorAll(".subAccordianBox").forEach(function (el) {
                if (!event.target.parentElement.classList.contains("active")) {
                    el.classList.remove("active")
                    el.querySelectorAll('.subAccordianContent,.grey-border').forEach(function (ele) {
                        ele.style.display = "none";
                    });
                }
            })
            var parent = event.target.parentNode;
            var siblings = getSiblings(parent);

            parent.classList.toggle('active');
            siblings.forEach(function (sibling) {
                sibling.classList.remove('active');
            });

            var content = parent.querySelectorAll('.subAccordianContent');
            content.forEach(function (el) {
                var computedStyle = window.getComputedStyle(el);
                el.parentElement.style.display = computedStyle.getPropertyValue('display') === 'none' ? 'block' : 'none';
                el.style.display = computedStyle.getPropertyValue('display') === 'none' ? 'block' : 'none';
            })

            siblings.forEach(function (sibling) {
                var siblingContent = sibling.querySelector('.subAccordianContent');
                var siblingComputedStyle = window.getComputedStyle(siblingContent);
                if (siblingComputedStyle.getPropertyValue('display') === 'block') {
                    siblingContent.style.display = 'none';
                }
            });
        }


        // Event listeners for main accordion titles
        var mainAccordionTitles = block.querySelectorAll('.subAccordianTitle');
        mainAccordionTitles.forEach(function (title) {
            title.addEventListener('click', handleMainAccordionClick);
        });



        // Event listeners for inner accordion titles
        var innerAccordionTitles = block.querySelectorAll('.innersubAccordianTitle');
        innerAccordionTitles.forEach(function (title) {
            title.addEventListener('click', handleInnerAccordionClick);
        });
    } catch (error) {
        console.error(error);
    }
    // renderHelper()
}

// import { getSiblings, handleInnerAccordionClick } from "./accordianclick";
// Function to handle click on inner accordion titles
export function handleInnerAccordionClick(event) {
    var parent = event.target.parentNode;
    parent.closest('.grey-border').querySelectorAll('.subAccordianContent').forEach(function (el) {

        console.log(event.target);
        if (event.target.closest(".subAccordianContent") === el) {

        } else {
            el.querySelectorAll('.innersubAccordianContent').forEach(function (each) {
                each.classList.remove("active");
            })
            el.querySelectorAll('.innerSubAccordianData').forEach(function (each) {
                each.style.display = "none";
            })
        }
    });
    var siblings = getSiblings(parent);

    parent.classList.toggle('active');
    siblings.forEach(function (sibling) {
        sibling.classList.remove('active');
    });

    var content = parent.querySelector('.innerSubAccordianData');
    var computedStyle = window.getComputedStyle(content);
    content.style.display = computedStyle.getPropertyValue('display') === 'none' ? 'block' : 'none';

    siblings.forEach(function (sibling) {
        var siblingContent = sibling.querySelector('.innerSubAccordianData');
        var siblingComputedStyle = window.getComputedStyle(siblingContent);
        if (siblingComputedStyle.getPropertyValue('display') === 'block') {
            siblingContent.style.display = 'none';
        }
    });
}

// Function to get siblings of an element
export function getSiblings(elem) {
    var siblings = [];
    var sibling = elem.parentNode.firstChild;
    for (; sibling; sibling = sibling.nextSibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
    }
    return siblings;
}