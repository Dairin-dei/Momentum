import * as datetimeFn from "./js/datetime.js";
import * as imagesFn from "./js/images.js";
import * as weatherFn from "./js/weather.js";
import * as quotesFn from "./js/quotes.js";
import * as audioFn from "./js/audio.js";
import * as playlistFn from "./js/playlist.js";
import * as settingsFn from "./js/settings.js";

let timeOfDay;
let oldTimeOfDay;
let currentGreeting;
let beginDay;
let inputTag = document.querySelector(".name-for-images");
let currentLanguage = "russian";

setBaseParameters();
weatherFn.mainForWeather();
quotesFn.setQuoteOnTheScreen();
audioFn.audioFunctions(playlistFn.gatherMusic());
manageLanguageChange();
settingsFn.setEventListenersVisibility();
settingsFn.showSettings();

function setBaseParameters() {
  if (localStorage.getItem("userLanguage") != null) {
    if (localStorage.getItem("userLanguage") != undefined) {
      currentLanguage = localStorage.getItem("userLanguage");
    } else {
      localStorage.setItem("userLanguage", "english");
    }
  } else {
    localStorage.setItem("userLanguage", "english");
  }

  let tagName = document.querySelector(".name");
  if (currentLanguage == "english") {
    tagName.placeholder = "[Enter name]";
  } else {
    tagName.placeholder = "[Познакомимся?]";
  }

  if (localStorage.getItem("userName") != null) {
    if (localStorage.getItem("userName") != undefined) {
      tagName.value = localStorage.getItem("userName");
    }
  }

  if (localStorage.getItem("currentSourceOfImages") == null) {
    localStorage.setItem("currentSourceOfImages", "github");
  }

  if (localStorage.getItem("tagForImages") != null) {
    if (localStorage.getItem("tagForImages") != undefined) {
      inputTag.value = localStorage.getItem("tagForImages");
    }
  }

  localStorage.setItem("countOfImagesFromWeb", "0");

  datetimeFn.manageName(tagName);
  setDateTimeGreetingOnScreen();

  imagesFn.listImages();
  imagesFn.managePicture();
  settingsFn.changeLanguage();
}

function setDateTimeGreetingOnScreen() {
  let tagGreeting = document.querySelector(".greeting");

  beginDay = new Date();
  beginDay.setHours(0, 0, 0);
  let nowDay = new Date();
  let difference = (nowDay - beginDay) / 3600000;
  timeOfDay = datetimeFn.defineTimeOfDay(difference);
  localStorage.setItem("timeOfDay", timeOfDay);
  tagGreeting.textContent = datetimeFn.defineGreeting();
  oldTimeOfDay = timeOfDay;
  getData();
}

function getData() {
  let currentDate = new Date();
  let screenDate;
  let tagTime = document.querySelector(".time");
  let tagGreetingContainer = document.querySelector(".greeting-container");
  let tagGreeting = document.querySelector(".greeting");
  let tagDate = document.querySelector(".date");
  let t;
  let currentLanguage = localStorage.getItem("userLanguage");

  tagTime.textContent = currentDate.toLocaleTimeString();
  tagTime.datetime = currentDate;

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  if (currentLanguage == "english") {
    screenDate = currentDate.toLocaleDateString("en-US", options);
  } else {
    screenDate = currentDate.toLocaleDateString("ru-Ru", options);
  }
  tagDate.textContent = screenDate;

  let difference = (currentDate - beginDay) / 3600000;

  timeOfDay = datetimeFn.defineTimeOfDay(difference);

  if (oldTimeOfDay != timeOfDay) {
    localStorage.setItem("timeOfDay", timeOfDay);
    setTimeout(() => {
      imagesFn.managePicture();
      currentGreeting = datetimeFn.defineGreeting();
      tagGreetingContainer.classList.add("fade");
      setTimeout(() => {
        tagGreeting.textContent = currentGreeting;
        tagGreetingContainer.classList.add("appear");
        tagGreetingContainer.classList.remove("appear");
        tagGreetingContainer.classList.remove("fade");
      }, 1000);
      oldTimeOfDay = timeOfDay;
    });
  }
  t = setTimeout(() => {
    getData();
  }, 1000);
}

function manageLanguageChange() {
  let btnLangEng = document.querySelector(".lang-eng");
  let btnLangRus = document.querySelector(".lang-rus");
  let city = document.querySelector(".city");

  if (localStorage.getItem("userLanguage") == "english") {
    btnLangRus.classList.remove("lang-second");
    btnLangEng.classList.add("lang-second");
  } else {
    btnLangEng.classList.remove("lang-second");
    btnLangRus.classList.add("lang-second");
  }

  btnLangEng.addEventListener("click", () => {
    if (city.value == "Минск") {
      city.value = "Minsk";
    }
    localStorage.setItem("userLanguage", "english");

    datetimeFn.changeLanguage(beginDay);
    weatherFn.getWeather(city.value);
    quotesFn.getQuotes();
    settingsFn.changeLanguage();
  });
  btnLangRus.addEventListener("click", () => {
    if (city.value == "Minsk") {
      city.value = "Минск";
    }
    localStorage.setItem("userLanguage", "russian");
    datetimeFn.changeLanguage(beginDay);

    weatherFn.getWeather(city.value);
    quotesFn.getQuotes();
    settingsFn.changeLanguage();
  });
}

let buttonGitHub = document.querySelector(".source-images-github");
let buttonUnsplash = document.querySelector(".source-images-unsplash");
let buttonFlickr = document.querySelector(".source-images-flickr");

buttonGitHub.addEventListener("click", () => {
  let currentSourceOfImages = imagesFn.getCurrentSourceOfImages();
  if (currentSourceOfImages != "github") {
    currentSourceOfImages = "github";
    settingsFn.removeBorder();
    settingsFn.addBorder(currentSourceOfImages);
    localStorage.setItem("currentSourceOfImages", currentSourceOfImages);

    imagesFn.managePicture();
  }
});
buttonUnsplash.addEventListener("click", () => {
  let currentSourceOfImages = imagesFn.getCurrentSourceOfImages();
  if (currentSourceOfImages != "unsplash") {
    currentSourceOfImages = "unsplash";
    settingsFn.removeBorder();
    settingsFn.addBorder(currentSourceOfImages);
    localStorage.setItem("currentSourceOfImages", currentSourceOfImages);

    imagesFn.getLinkToImage();
  }
});
buttonFlickr.addEventListener("click", () => {
  let currentSourceOfImages = imagesFn.getCurrentSourceOfImages();
  if (currentSourceOfImages != "flickr") {
    currentSourceOfImages = "flickr";
    settingsFn.removeBorder();
    settingsFn.addBorder(currentSourceOfImages);
    localStorage.setItem("currentSourceOfImages", currentSourceOfImages);

    imagesFn.getLinkToImage();
  }
});

inputTag.addEventListener("change", () => {
  let currentSourceOfImages = imagesFn.getCurrentSourceOfImages();
  if (currentSourceOfImages == "github") {
    imagesFn.managePicture();
  } else {
    localStorage.setItem("tagForImages", inputTag.value);
    imagesFn.getLinkToImage(inputTag.value.trim());
    localStorage.setItem("countOfImagesFromWeb", "0");
  }
});
