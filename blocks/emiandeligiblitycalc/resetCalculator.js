export function resetCalculator(calculator) {
  const calDefaultValueObj = JSON.parse(sessionStorage.getItem('calDefaultValueObj'));

  const calId = calculator.dataset.resetId;

  if (calDefaultValueObj == null) return;
  const calObj = calDefaultValueObj[calId] || {};

  for (const id in calObj) {
    const rangeInput = calculator.querySelector(`[id=${id}]`);
    rangeInput.value = calObj[id];
    rangeInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // calculator.dispatchEvent(new Event("change", {bubbles: true}));
}
