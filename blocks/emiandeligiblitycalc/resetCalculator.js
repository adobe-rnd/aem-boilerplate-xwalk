export function resetCalculator(calculator) {
    let calDefaultValueObj = JSON.parse(sessionStorage.getItem("calDefaultValueObj"));

    let calId = calculator.dataset.resetId;

    if(calDefaultValueObj == null) return;
    let calObj = calDefaultValueObj[calId] || {};

    for(let id in calObj) {
        let rangeInput = calculator.querySelector("[id=" + id + "]");
        rangeInput.value = calObj[id];
        rangeInput.dispatchEvent(new Event("input", {bubbles: true}));
    }

    // calculator.dispatchEvent(new Event("change", {bubbles: true}));
}