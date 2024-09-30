import { resetCalculator } from "./resetCalculator.js";


export default function overlayCalculator() {
  var emiCalDiv = document.querySelector(".cmp-teaser--emicalculatorteaser");
  var elgCalDiv = document.querySelector(".cmp-teaser--elgcalculatorteaser");
  var emiOverlay = document.querySelector(".cmp-container--emicaloverlay");
  var elgOverlay = document.querySelector(".cmp-container--elgcaloverlay");
  var overlay = document.querySelector(".modal-overlay");

  let calculatorType = "";
  if (emiCalDiv) {
    emiCalDiv.addEventListener("click", function (element) {
      if (!emiOverlay.classList.contains("show")) {
        calculatorType = "emi";
        emiOverlay.classList.add("show");
        overlay.classList.add("show");
        document.body.style.overflow = "hidden";
        renderCalculatorData(calculatorType);
        firstTabActive();
      } else {
        emi; //overlay.classList.remove("show");
        document.querySelector(".modal-overlay").classList.remove("overlay");
        document.querySelector(".modal-overlay").classList.add("dp-none");
        //overlay.classList.remove("show");
        document.querySelector(".modal-overlay").classList.remove("overlay");
        document.querySelector(".modal-overlay").classList.add("dp-none");
        document.body.style.overflow = "auto";
      }
    });
  }
  if (elgCalDiv) {
    elgCalDiv.addEventListener("click", function (element) {
      if (!elgOverlay.classList.contains("show")) {
        calculatorType = "eligibility";
        elgOverlay.classList.add("show");
        overlay.classList.add("show");
        document.body.style.overflow = "hidden";
        renderCalculatorData(calculatorType);
        firstTabActive();
      } else {
        elg; //overlay.classList.remove("show");
        document.querySelector(".modal-overlay").classList.remove("overlay");
        document.querySelector(".modal-overlay").classList.add("dp-none");
        //overlay.classList.remove("show");
        document.querySelector(".modal-overlay").classList.remove("overlay");
        document.querySelector(".modal-overlay").classList.add("dp-none");

        document.body.style.overflow = "auto";
      }
    });
  }

  overlay.addEventListener("click", function () {
    //overlay.classList.remove("show");
    document.querySelector(".modal-overlay").classList.remove("overlay");
    document.querySelector(".modal-overlay").classList.add("dp-none");
    document.body.style.overflow = "auto";
    emi; //overlay.classList.remove("show");
    document.querySelector(".modal-overlay").classList.remove("overlay");
    document.querySelector(".modal-overlay").classList.add("dp-none");
    elg; //overlay.classList.remove("show");
    document.querySelector(".modal-overlay").classList.remove("overlay");
    document.querySelector(".modal-overlay").classList.add("dp-none");
  });

  function firstTabActive() {
    let calculator = document.querySelector(".overlayDiv.show .homeloancalculator");
    let firstTab = calculator.querySelector(".tab-emi-calc");
    let firstCalDiv = calculator.querySelector(".emicalculator");
    resetCalculator(firstCalDiv);
    firstTab.click();
  }
}
