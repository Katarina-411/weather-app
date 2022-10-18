let apiKey = "8f822d6984f5c5af9baadd8aaeb7abea";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";

function showSearch(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;
  let conditionToday = document.querySelector("#condition-today");
  conditionToday.innerHTML = response.data.weather[0].main;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
  let todayMax = document.querySelector(".today-max");
  todayMax.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;
  let todayMin = document.querySelector(".today-min");
  todayMin.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.sys.country;
  let conditionIcon = document.querySelector("#condition-icon");
  conditionIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  conditionIcon.setAttribute("alt", response.data.weather[0].main);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let windDirection = document.querySelector("#wind-direction");
  windDirection.innerHTML = direction();
  function direction() {
    let directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    let deg = response.data.wind.deg;
    if (deg < 0) {
      deg = 360 - (Math.abs(deg) % 360);
    } else {
      deg = deg % 360;
    }
    let w = parseInt(deg / 45);
    return `${directions[w]}`;
  }
  let sunrise = document.querySelector("#sunrise");
  sunrise.innerHTML = sunTime(response.data.sys.sunrise * 1000);
  let sunset = document.querySelector("#sunset");
  sunset.innerHTML = sunTime(response.data.sys.sunset * 1000);

  celsiusTemperature = response.data.main.temp;
}
function locationSearch(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#search-location-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${locationInput.value}`;
  let city = `${locationInput.value}`;
  let apiUrlCity = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlCity).then(showSearch);
}
let searchLocation = document.querySelector("#search-location");
searchLocation.addEventListener("submit", locationSearch);

function showGeoSearch(response) {
  let geoCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${geoCity}`;
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;
  let conditionToday = document.querySelector("#condition-today");
  conditionToday.innerHTML = response.data.weather[0].main;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
  let todayMax = document.querySelector(".today-max");
  todayMax.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;
  let todayMin = document.querySelector(".today-min");
  todayMin.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.sys.country;
  let conditionIcon = document.querySelector("#condition-icon");
  conditionIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  conditionIcon.setAttribute("alt", response.data.weather[0].main);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let windDirection = document.querySelector("#wind-direction");
  windDirection.innerHTML = direction();
  function direction() {
    let directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    let deg = response.data.wind.deg;
    if (deg < 0) {
      deg = 360 - (Math.abs(deg) % 360);
    } else {
      deg = deg % 360;
    }
    let w = parseInt(deg / 45);
    return `${directions[w]}`;
  }
  let sunrise = document.querySelector("#sunrise");
  sunrise.innerHTML = sunTime(response.data.sys.sunrise * 1000);
  let sunset = document.querySelector("#sunset");
  sunset.innerHTML = sunTime(response.data.sys.sunset * 1000);

  celsiusTemperature = response.data.main.temp;
}

function geoLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlGeo = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlGeo).then(showGeoSearch);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoLocation);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentLocation);

function displayFarenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let farenheit = (celsiusTemperature * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(farenheit);
}
function displayCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
function formatDate() {
  return `${day}, ${date}  ${month}`;
}
function formatTime() {
  if (hour === 12) {
    return `${hour}:${minutes} pm`;
  }
  if (hour >= 13) {
    hourClock = `${hour - 12}`;
    return `${hourClock}:${minutes} pm`;
  } else {
    return `${hour}:${minutes} am`;
  }
}
let dateToday = document.querySelector("#date-today");
dateToday.innerHTML = formatDate();
let timeCurrent = document.querySelector("#time-current");
timeCurrent.innerHTML = formatTime();

function sunTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour === 12) {
    return `${hour}:${minutes} pm`;
  }
  if (hour >= 13) {
    hourClock = `${hour - 12}`;
    return `${hourClock}:${minutes} pm`;
  } else {
    return `${hour}:${minutes} am`;
  }
}
