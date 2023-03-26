function formatDate(date){
  let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response){
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${(response.data.weather[0].icon)}@2x.png`);
  iconElement.setAttribute("alt",  (response.data.weather[0].description));

  celsiusTemperature = response.data.main.temp;
}


function searchCity(city){
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition); 
}

function handleSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position){
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition); 
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);

}

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // remove active class from celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

}


// function convertToFahrenheit(event){
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = 66;
// }

// function convertToCelsius(event){
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML =19;
// }

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);



// Feature 1
let dateElement = document.querySelector("#list-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let celsiusTemperature = null;


// Feature 2
let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);



searchCity("Lagos");