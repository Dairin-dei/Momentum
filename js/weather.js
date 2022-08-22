let currentLanguage;
export function mainForWeather(currentLanguage) {
  let city = document.querySelector(".city");
  let currentCity;
  let oldCity;

  document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("city")) {
      if (currentLanguage == "english") {
        currentCity = "Minsk";
      } else {
        currentCity = "Минск";
      }
    } else {
      currentCity = localStorage.getItem("city");
    }
    city.value = currentCity;
    getWeather(currentCity, currentLanguage);
  });

  city.addEventListener("change", () => {
    if (city.value.trim().length > 0) {
      currentCity = city.value.trim();
      getWeather(currentCity, currentLanguage);
      localStorage.setItem("city", currentCity);
    } else {
      if (currentLanguage == "english") {
        weatherError.textContent = "Please, enter the name of city!";
      } else {
        weatherError.textContent = "Введите имя города!";
      }
      weatherIcon.className = "weather-icon owf";
      temperature.textContent = "";
      weatherDescription.textContent = "";
      weatherHumidity.textContent = "";
      weatherWind.textContent = "";
    }
  });
}

export async function getWeather(city, currentLanguage) {
  const weatherError = document.querySelector(".weather-error");
  const weatherIcon = document.querySelector(".weather-icon");
  const temperature = document.querySelector(".temperature");
  const weatherDescription = document.querySelector(".weather-description");
  const weatherHumidity = document.querySelector(".humidity");
  const weatherWind = document.querySelector(".wind");
  let url;

  if (currentLanguage == "english") {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=c10210ea8dffbb10141ecee05b0e8a6f`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=c10210ea8dffbb10141ecee05b0e8a6f`;
  }
  const res = await fetch(url);

  if (res.status == 404) {
    if (currentLanguage == "english") {
      weatherError.textContent = `We are sorry, but ${city} does not exit in database!`;
    } else {
      weatherError.textContent = `К сожалению, города ${city} нет в нашей базе!`;
    }
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    weatherHumidity.textContent = "";
    weatherWind.textContent = "";
  } else {
    weatherError.textContent = "";
    const data = await res.json();
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (currentLanguage == "english") {
      weatherHumidity.textContent = `Humidity: ${data.main.humidity}%`;
      weatherWind.textContent = `Wind speed: ${data.wind.speed} m/s`;
    } else {
      weatherHumidity.textContent = `Влажность: ${data.main.humidity}%`;
      weatherWind.textContent = `Ветер: ${data.wind.speed} m/s`;
    }
  }
}
