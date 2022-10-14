let apiKey = "8f822d6984f5c5af9baadd8aaeb7abea";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";

function showSearch(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;
  let conditionToday = document.querySelector("#condition-today");
  conditionToday.innerHTML = response.data.weather[0].main;
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
  if (hour >= 13) {
    hourClock = `${hour - 12}`;
    return `${hourClock}:${minutes} pm`;
  } else return `${hour}:${minutes} am`;
}
let dateToday = document.querySelector("#date-today");
dateToday.innerHTML = formatDate();
let timeCurrent = document.querySelector("#time-current");
timeCurrent.innerHTML = formatTime();
