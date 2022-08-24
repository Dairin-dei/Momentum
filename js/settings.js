export function setEventListenersVisibility() {
  let idChbTime = document.getElementById("id-ch-time");
  let idChbDate = document.getElementById("id-ch-date");
  let idChbQuotes = document.getElementById("id-ch-quotes");
  let idChbGreeting = document.getElementById("id-ch-greeting");
  let idChbWeather = document.getElementById("id-ch-forecast");
  let idChbPlayer = document.getElementById("id-ch-player");

  let idTime = document.querySelector(".time");
  let idDate = document.querySelector(".date");
  let idGreeting = document.querySelector(".greeting-container");
  let idQuote = document.querySelector(".quote");
  let idAuthor = document.querySelector(".author");
  let idWeather = document.querySelector(".weather");
  let idPlayer = document.querySelector(".player");

  idChbTime.addEventListener("change", () => showoff(idChbTime, idTime));
  idChbDate.addEventListener("change", () => showoff(idChbDate, idDate));
  idChbGreeting.addEventListener("change", () =>
    showoff(idChbGreeting, idGreeting)
  );
  idChbQuotes.addEventListener("change", () => {
    showoff(idChbQuotes, idQuote);
    showoff(idChbQuotes, idAuthor);
  });
  idChbWeather.addEventListener("change", () =>
    showoff(idChbWeather, idWeather)
  );
  idChbPlayer.addEventListener("change", () => showoff(idChbPlayer, idPlayer));

  function showoff(elem, obj) {
    if (elem.checked) {
      obj.classList.add("visibility-hidden");
      obj.classList.remove("visibility-show");
    } else {
      obj.classList.remove("visibility-hidden");
      obj.classList.add("visibility-show");
    }
  }
}

export function showSettings() {
  let buttonSettings = document.querySelector(".button-settings");
  let buttonClose = document.querySelector(".close-settings");

  let popupWindow = document.querySelector(".settings");
  let isShow = false;
  document.addEventListener("click", closePopupFromWindow);
  buttonSettings.addEventListener("click", showPopup);
  buttonClose.addEventListener("click", closePopup);

  function showPopup(event) {
    event.stopPropagation();
    if (!isShow) {
      let currentSourceOfImages = localStorage.getItem("currentSourceOfImages");
      popupWindow.classList.add("settings-show");
      isShow = true;

      addBorder(currentSourceOfImages);
    } else {
      popupWindow.classList.remove("settings-show");
      isShow = false;

      removeBorder();
    }
  }

  function closePopup() {
    if (isShow) {
      popupWindow.classList.remove("settings-show");
      isShow = false;
      removeBorder();
    }
  }

  function closePopupFromWindow(event) {
    let menu = document.querySelector(".settings-show");
    if (menu && event.target !== menu && !menu.contains(event.target)) {
      popupWindow.classList.remove("settings-show");
      isShow = false;
      removeBorder();
    }
  }
}

export function addBorder(currentSourceOfImages) {
  let buttonGitHub = document.querySelector(".source-images-github");
  let buttonUnsplash = document.querySelector(".source-images-unsplash");
  let buttonFlickr = document.querySelector(".source-images-flickr");

  if (currentSourceOfImages == "github") {
    buttonGitHub.classList.add("source-active");
  } else if (currentSourceOfImages == "unsplash") {
    buttonUnsplash.classList.add("source-active");
  } else {
    buttonFlickr.classList.add("source-active");
  }
}
export function removeBorder() {
  let buttonGitHub = document.querySelector(".source-images-github");
  let buttonUnsplash = document.querySelector(".source-images-unsplash");
  let buttonFlickr = document.querySelector(".source-images-flickr");

  buttonGitHub.classList.remove("source-active");
  buttonUnsplash.classList.remove("source-active");
  buttonFlickr.classList.remove("source-active");
}

export function changeLanguage() {
  let currentLanguage = localStorage.getItem("userLanguage");

  let changeLanguage = document.querySelector(".change-language");
  let changeSource = document.querySelector(".change-source");
  let labelTag = document.querySelector(".label-tag");
  let hideShow = document.querySelector(".hide-show");
  let labelChangeTime = document.querySelector(".lb-ch-time");
  let labelChangeDate = document.querySelector(".lb-ch-date");
  let labelChangeGreeting = document.querySelector(".lb-ch-greeting");
  let labelChangeQuotes = document.querySelector(".lb-ch-quotes");
  let labelChangeForecast = document.querySelector(".lb-ch-forecast");
  let labelChangePlayer = document.querySelector(".lb-ch-player");

  if (currentLanguage == "russian") {
    changeLanguage.textContent = "Смена языка";
    changeSource.textContent = "Смена источника изображений";
    labelTag.textContent = "Смена темы изображений";
    hideShow.textContent = "Показать / скрыть элементы";
    labelChangeTime.textContent = "Скрыть время";
    labelChangeDate.textContent = "Скрыть дату";
    labelChangeGreeting.textContent = "Скрыть приветствие";
    labelChangeQuotes.textContent = "Скрыть цитаты";
    labelChangeForecast.textContent = "Скрыть прогноз";
    labelChangePlayer.textContent = "Скрыть плеер";
  } else {
    changeLanguage.textContent = "Change language";
    changeSource.textContent = "Change source for images";
    labelTag.textContent = "Change theme of images";
    hideShow.textContent = "Hide / show elements on screen";
    labelChangeTime.textContent = "Hide time";
    labelChangeDate.textContent = "Hide date";
    labelChangeGreeting.textContent = "Hide greeting";
    labelChangeQuotes.textContent = "Hide quotes";
    labelChangeForecast.textContent = "Hide forecast";
    labelChangePlayer.textContent = "Hide player";
  }
}
