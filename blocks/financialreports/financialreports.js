import { fetchAPI, getProps, renderHelper } from "../../scripts/scripts.js";

export default async function decorate(block) {
    const props = getProps(block);
    const [url, type] = props;
    block.innerHTML = "";
    try {
        // const resp = await fetchAPI("GET", url);
        // const data = await resp.json();
        const data = { "result": [{ "2019": [{ "March": [{ "Title": "Financial and Audit Report for the year ended March 31,2019", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2019/march/pchfl-financials-and-audit-report-for-year-ended-31-03-2019.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2019/march" }, { "Title": "Extract Annual Return in Form No. MGT - 9 2018-19", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2019/march/extract-annual-return-in-form-no-mgt-9.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2019/march" }], "September": [{ "Title": "Financials and Auditors Report for half year ended September 30,2019 and Certificate from Debenture Trustee", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2019/september/pchfl-2.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2019/september" }] }], "2018": [{ "March": [{ "Title": "Financial and auditors report for the year ended March 31,2018", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2018/march/phfl-financials-mar-2018.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2018/march" }] }], "2017": [{ "September": [{ "Title": "HALF YEARLY CONSOLIDATED RESULTS 30-09-2017", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2017/september/consolidated-results.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2017/september" }] }], "2024": [{ "March": [{ "Title": "Audited Financial Results (Standalone and Consolidated) for the year ended 31st March, 2024.", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2024/march/pchfl-s-bm-outcome-08052024-s.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2024/march" }] }], "2023": [{ "March": [{ "Title": "Audited Financial Results (Standalone and consolidated) for the quarter and year ended 31st March 2023", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2023/march/audited-financial-results-for-the-quarter-and-year-ended-31st-march-2023.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2023/march" }], "June": [{ "Title": "Un-audited Financial Results (Standalone) for the quarter ended 30th June 2023", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2023/june/results-30062023-s.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2023/june" }], "September": [{ "Title": "Un-audited Financial Results (Standalone) for the quarter and half-year ended 30th September 2023", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2023/september/se-results-30092023-s1.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2023/september" }], "December": [{ "Title": "Un-audited Financial Results (Standalone) for the quarter and nine months ended 31st December, 2023", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2023/december/se-pchfl-outcome-of-board-meeting-29012024-s.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2023/december" }, { "Title": "Utilisation Certificate with respect to use of Commercial Paper proceeds for the quarter ended 31st December, 2023 under provisions of the SEBI Master Circular no. SEBI/HO/DDHS/PoD1/P/CIR/2023/119", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2023/december/pchfl-cp-certificate-31122023-s.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2023/december" }] }], "2022": [{ "March": [{ "Title": "Outcome of the Board Meeting for the year ended 31st March 2022", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2022/march/outcome-of-board-meeting-dt-26052022-signed.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2022/march" }], "June": [{ "Title": "Un-audited Financial Results (Standalone) for the quarter ended 30th June 2022", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2022/june/outcome-of-board-meeting-for-the-qtr-ended-on-30-06-2022.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2022/june" }], "September": [{ "Title": "Un-audited Financial Results (Standalone) for the quarter and half year ended 30th September, 2022", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2022/september/outcome-of-board-meeting-dated-09-11-2022-signed1.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2022/september" }], "December": [{ "Title": "Un-audited Financial Results (Standalone) for the quarter and nine months ended 31st December, 2022", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2022/december/outcome-of-board-meeting-dt-s-08022023.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2022/december" }] }], "2021": [{ "March": [{ "Title": "Submission of Unaudited Financial Results(Standalone and Consolidated) for the fourtc quarter/financial year ended 31st March 2021", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/march/edhfl-results-as-31-03-2021.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/march" }, { "Title": "Financial and Audit Report for the year ended March 31,2021 - Newspaper Advertisement", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/march/pchfl-bs-15-05-2021.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/march" }, { "Title": "Financial and Audit Report for the year ended March 31,2021", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/march/pchfl-reg-52-financial-results.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/march" }], "June": [{ "Title": "Submission of Unaudited Financial Results(Standalone and Consolidated) for the quarter ended June 30, 2021", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/june/1993-outcome-of-mc-meeting-financial-results-quarter-30-june-2021.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/june" }], "September": [{ "Title": "Financial and Unaudited Report for half year ended September 30,2021", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/september/piramal-capital-newspaper-publication-financials-september-2020.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/september" }, { "Title": "Un-audited financial results for the quarter and half year ended 30th September 2021", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/september/outcome-of-the-board-meeting-for-the-financial-results-for-the-period-ended-on-30-09-2021-pchfl.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/september" }], "December": [{ "Title": "Un-audited financial results for the quarter and nine months ended 31st December 2021", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/december/pchfl-outcome-financial-results-qtr-31-dec-2021-final-signed-dt-10-02-20221.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2021/december" }] }], "2020": [{ "March": [{ "Title": "Financial and Audit Report for the year ended March 31,2020", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2020/march/financial-and-audit-report-for-the-year-ended-march-31-2020.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2020/march" }, { "Title": "Extract Annual Return in Form No. MGT - 9 2019-20", "PdfPath": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2020/march/extract-annual-return-in-form-no-mgt-9-2019-20.pdf", "Created_Date": "", "Pdf_Category": "/content/dam/piramalfinance/pdf/stakeholder/financial-report/2020/march" }] }] }] }
        const years = data.result[0];
        Object.keys(years).forEach(function (year) {
            const months = years[year][0];
            let monthsli = '';
            Object.keys(months).forEach(function (month) {
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