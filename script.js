import * as datetimeFn from "./js/datetime.js";
import * as imagesFn from "./js/images.js";
import * as weatherFn from "./js/weather.js";
import * as quotesFn from "./js/quotes.js";
import * as audioFn from "./js/audio.js";
import * as playlistFn from "./js/playlist.js";
import * as languagesFn from "./js/languages.js";
import * as settingsFn from "./js/settings.js";

let currentLanguage;
let timeOfDay;
let oldTimeOfDay;
let currentGreeting;
let beginDay;
let source;
let currentSourceOfImages;
let tagForImages;

languagesFn.manageLanguage();
currentLanguage = languagesFn.landingLanguage;

setBaseParameters();
weatherFn.mainForWeather(currentLanguage);
quotesFn.setQuoteOnTheScreen(currentLanguage);
audioFn.audioFunctions(playlistFn.gatherMusic());
manageLanguageChange();

function setBaseParameters() {
  let tagName = document.querySelector(".name");
  localStorage.setItem("countOfImagesFromUnsplash", "0");
  tagName.placeholder = "[Enter name]";
  datetimeFn.manageName(tagName);
  setDateTimeGreetingOnScreen();
  timeOfDay = datetimeFn.defineTimeOfDay();
  localStorage.setItem("tagForImages", timeOfDay);

  ////
  /* if (localStorage.getItem("tagForImages") != null) {
    if (localStorage.getItem("tagForImages") != undefined) {
      tagForImages = localStorage.getItem("tagForImages");
    }
  }*/
  if (localStorage.getItem("userName") != null) {
    if (localStorage.getItem("userName") != undefined) {
      tagName.value = localStorage.getItem("userName");
    }
  }
  if (localStorage.getItem("currentSourceOfImages") != null) {
    if (localStorage.getItem("currentSourceOfImages") != undefined) {
      currentSourceOfImages = localStorage.getItem("currentSourceOfImages");
    } else {
      currentSourceOfImages = "github";
    }
  } else {
    currentSourceOfImages = "github";
  }
  ////

  imagesFn.listImages(currentSourceOfImages);
  imagesFn.managePicture(currentSourceOfImages, timeOfDay);
}

function setDateTimeGreetingOnScreen() {
  let tagGreeting = document.querySelector(".greeting");

  beginDay = new Date();
  beginDay.setHours(0, 0, 0);
  let nowDay = new Date();
  let difference = (nowDay - beginDay) / 3600000;
  timeOfDay = datetimeFn.defineTimeOfDay(difference);
  tagGreeting.textContent = datetimeFn.defineGreeting(
    timeOfDay,
    currentLanguage
  );
  oldTimeOfDay = timeOfDay;
  getData();
}

function manageLanguageChange() {
  let btnLangEng = document.querySelector(".lang-eng");
  let btnLangRus = document.querySelector(".lang-rus");
  let city = document.querySelector(".city");

  btnLangEng.addEventListener("click", () => {
    currentLanguage = "english";
    datetimeFn.changeLanguage(
      beginDay,
      currentLanguage,
      timeOfDay,
      currentGreeting
    );
    weatherFn.getWeather(city.value, currentLanguage);
    quotesFn.getQuotes(currentLanguage);
  });
  btnLangRus.addEventListener("click", () => {
    currentLanguage = "russian";
    datetimeFn.changeLanguage(
      beginDay,
      currentLanguage,
      timeOfDay,
      currentGreeting
    );

    weatherFn.getWeather(city.value, currentLanguage);
    quotesFn.getQuotes(currentLanguage);
  });
}

function getData() {
  let currentDate = new Date();
  let screenDate;
  let tagTime = document.querySelector(".time");
  let tagGreetingContainer = document.querySelector(".greeting-container");
  let tagGreeting = document.querySelector(".greeting");
  let tagDate = document.querySelector(".date");
  let t;

  tagTime.textContent = currentDate.toLocaleTimeString();

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
    setTimeout(() => {
      imagesFn.managePicture(timeOfDay, source);
      currentGreeting = datetimeFn.defineGreeting(timeOfDay, currentLanguage);
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

let buttonGitHub = document.querySelector(".source-images-github");
let buttonUnsplash = document.querySelector(".source-images-unsplash");
buttonGitHub.addEventListener("click", () => {
  if (currentSourceOfImages != "github") {
    currentSourceOfImages = "github";
    localStorage.setItem("currentSourceOfImages", currentSourceOfImages);

    imagesFn.managePicture(currentSourceOfImages, timeOfDay);
  }
});
buttonUnsplash.addEventListener("click", () => {
  if (currentSourceOfImages != "unsplash") {
    currentSourceOfImages = "unsplash";
    localStorage.setItem("currentSourceOfImages", currentSourceOfImages);

    imagesFn.getLinkToImage();
  }
});

let inputTag = document.querySelector(".name-for-images");

inputTag.addEventListener("change", () => {
  if (currentSourceOfImages == "unsplash") {
    localStorage.setItem("tagForImages", inputTag.value);
    imagesFn.getLinkToImage(inputTag.value.trim());
    localStorage.setItem("countOfImagesFromUnsplash", "0");
  }
});
