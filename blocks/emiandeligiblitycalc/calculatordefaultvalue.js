let calDefaultValueObj = {};

window.addEventListener("DOMContentLoaded", function() {
    let calculators = document.querySelectorAll(".homeloancalculator .calctabs .commoncalculator");
    
    calculators.forEach((cal, index) => {
        const resetId = "calid-" + index;
        cal.dataset.resetId = resetId;
        calDefaultValueObj[resetId] = Object.fromEntries([...cal.querySelectorAll("input[type=range]")].map(input => [input.id, input.value]));
    });

    sessionStorage.setItem("calDefaultValueObj", JSON.stringify(calDefaultValueObj));
});