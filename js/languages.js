export let landingLanguage;

export function manageLanguage() {
  landingLanguage = "english";

  setEventListeners();
}

function setEventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("userLanguage") != null) {
      if (localStorage.getItem("userLanguage") != undefined) {
        landingLanguage = localStorage.getItem("userLanguage");
      }
    }
    setLanguageControls();
  });

  function setLanguageControls() {
    let btnLangEng = document.querySelector(".lang-eng");
    let btnLangRus = document.querySelector(".lang-rus");
    if (landingLanguage == "english") {
      btnLangEng.classList.add("lang-second");
      btnLangRus.classList.remove("lang-second");
    } else {
      btnLangEng.classList.remove("lang-second");
      btnLangRus.classList.add("lang-second");
    }
  }
}
