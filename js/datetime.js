export function defineTimeOfDay(diff) {
  if (diff < 6) {
    return "night";
  } else if (diff < 12) {
    return "morning";
  } else if (diff < 18) {
    return "day";
  } else {
    return "evening";
  }
}
export function defineGreeting() {
  let greetings;
  let timeOfDay = localStorage.getItem("timeOfDay");
  let currentLanguage = localStorage.getItem("userLanguage");
  if (currentLanguage == "english") {
    greetings = [
      "Good morning, ",
      "Good afternoon, ",
      "Good evening, ",
      "Good night, ",
    ];
  } else {
    greetings = [
      "Доброе утро, ",
      "Добрый день, ",
      "Добрый вечер, ",
      "Доброй ночи, ",
    ];
  }

  if (timeOfDay == "night") {
    return greetings[3];
  } else if (timeOfDay == "morning") {
    return greetings[0];
  } else if (timeOfDay == "day") {
    return greetings[1];
  } else {
    return greetings[2];
  }
}

export function changeLanguage(beginDay) {
  let tagGreetingContainer = document.querySelector(".greeting-container");
  let tagGreeting = document.querySelector(".greeting");
  let btnLangEng = document.querySelector(".lang-eng");
  let btnLangRus = document.querySelector(".lang-rus");
  let currentLanguage = localStorage.getItem("userLanguage");
  let tagName = document.querySelector(".name");

  let currentGreeting;

  let currentDate = new Date();
  let difference = (currentDate - beginDay) / 3600000;

  localStorage.setItem("timeOfDay", defineTimeOfDay(difference));
  currentGreeting = defineGreeting();

  btnLangEng.classList.toggle("lang-second");
  btnLangRus.classList.toggle("lang-second");

  tagGreetingContainer.classList.add("fade");

  if (currentLanguage == "english") {
    tagName.placeholder = "[Enter name]";
  } else {
    tagName.placeholder = "[Познакомимся?]";
  }

  setTimeout(() => {
    tagGreeting.textContent = currentGreeting;
  }, 1000);
  setTimeout(() => {
    tagGreetingContainer.classList.add("appear");
    tagGreetingContainer.classList.remove("appear");

    tagGreetingContainer.classList.remove("fade");
  }, 1000);
}

export function manageName(tagName) {
  tagName.addEventListener("input", () => {
    localStorage.setItem("userName", tagName.value);
  });
}
