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

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

   let days = ["Sun","Mon","Tue","Wed","Thu", "Fri", "Sat",];
   
  return days[day];
}

function displayForecast(response){
let forecast = (response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index){
  if (index < 6) {
forecastHTML = forecastHTML + `
                  <div class="col-sm-2">
                    <div class="forecaster">
                        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
                       <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"alt="weather icon" width="50"/>
                        <div class="forecaster-temp">
                            <span class="max-temp">${Math.round(forecastDay.temperature.maximum)}°</span>
                            <span class="min-temp">${Math.round(forecastDay.temperature.minimum)}°</span>
                        </div>
                    </div>
                </div>`;
 }
})
                forecastHTML = forecastHTML + `</div>`;
                forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let longitude = coordinates.longitude;
  let latitude = coordinates.latitude;
  let apiKey = "b1ffa750faa242739962f64fe0t9dod4";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response){
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.condition.description;
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute("src" , `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  iconElement.setAttribute("alt" , response.data.condition.description);


  getForecast(response.data.coordinates);
}


function searchCity(city){
  let apiKey = "b1ffa750faa242739962f64fe0t9dod4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature); 
}

function handleSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
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

let celsiusTemperature = null;


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let dateElement = document.querySelector("#list-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);


let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", handleSubmit);


searchCity("Lagos");