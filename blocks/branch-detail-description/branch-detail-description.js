export default function decorate(block) {
    let data = `Piramal Finance, wholly owned subsidiary of Piramal Enterprises Limited (the flagship company of Piramal Group), 
    is registered as a housing finance company with National Housing Bank (NHB) and engaged in various financial services businesses. 
    It provides both wholesale and retail funding opportunities across sectors. In real estate, the platform provides housing finance 
    and other financing solutions across the entire capital stack ranging from early stage private equity, structured debt, senior 
    secured debt, construction finance and flexi lease rental discounting. Hospitality sector financing is a recent foray of Piramal 
    Finance. Here we are providing financing solutions to hotels which will be operated by branded players in established and emerging 
    markets. The wholesale business in the non-real estate sector includes separate verticals - Corporate Finance Group (CFG) and 
    Emerging Corporate Lending (ECL).`;

    let slicedData = data.split(" ").slice(0, 60).join(" ");
    
    block.innerHTML = `
        <div class="branch-description-wrapper">
            <h2 class="branch-heading">About Piramal Finance Andheri Branch</h2>
            <p>
                <span class="branch-description-content">${slicedData}</span>
                <button class="button-container">Read More</button>
            </p>
        </div>
    `;
    
    let button = block.querySelector(".button-container");
    let description = block.querySelector(".branch-description-content");

    button.addEventListener("click", () => {
        let isExpanded = button.textContent.toLowerCase() === "read more";
        button.textContent = isExpanded ? "Read Less" : "Read More";
        description.textContent = isExpanded ? data : slicedData;
    });
}
