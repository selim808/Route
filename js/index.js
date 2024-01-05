///////////////////////////  Variables  /////////////////////////////////////////////////
// Today
let todayDay = document.getElementById("todayDay");
let todayDate = document.getElementById("todayDate");
let currentTemp = document.getElementById("currentTemp");
let Datalocation = document.getElementById("location");
let currentCondition = document.getElementById("currentCondition");
// Tomorrow
let tomorrowDayName = document.getElementById("tomorrowDayName");
let tomorrowMAx = document.getElementById("tomorrowMAx");
let tomorrowMin = document.getElementById("tomorrowMin");
let tomorrowCondition = document.getElementById("tomorrowCondition");
// AfterTomorrow
let AfterTomorrowDayName = document.getElementById("afterTomorrowDayName");
let AfterTomorrowMAx = document.getElementById("afterTomorrowMAx");
let AfterTomorrowMin = document.getElementById("afterTomorrowMin");
let AfterTomorrowCondition = document.getElementById("afterTomorrowCondition");
// search
let inputCity = document.getElementById("inputCity");
let searchCity = document.getElementById("searchCity");
////////////////////////////Event listner//////////////////////////////////////////////

searchCity.addEventListener("click", function (e) {
  e.preventDefault();
  let city = inputCity.value;
  getWeather(city);
});
inputCity.addEventListener("keyup", function () {
  let city = inputCity.value;
  getWeather(city);
  city === "" && getWeather("cairo");
});
/////////////////////////// Functions  //////////////////////////////////////////////////
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let loc = lat.toFixed(4) + "," + lon.toFixed(4);
  getWeather(loc);
}
async function getWeather(location) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=298811c068134b42b9d165523240401&q=${location}&days=3`
  );

  response = await response.json();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let conversionedDate = {
    day: new Date(response.current.last_updated).getDay(),
    dayName: days[new Date(response.current.last_updated).getDay()],
    MonthName: months[new Date(response.current.last_updated).getMonth()],
    tomorrowName:
      days[new Date(response.forecast.forecastday[1].date).getDay()],
    AfterTomorrowName:
      days[new Date(response.forecast.forecastday[2].date).getDay()],
  };

  let data = {
    today: {
      dayNumber: conversionedDate.day,
      dayName: conversionedDate.dayName,
      month: conversionedDate.MonthName,
      location: response.location.name,
      currentTemp: response.current.temp_c,
      currentCondition: response.current.condition.text,
    },
    tomorrow: {
      tomorrow: conversionedDate.tomorrowName,
      tomorrowMaxTemp: response.forecast.forecastday[1].day.maxtemp_c,
      tomorrowMinTemp: response.forecast.forecastday[1].day.mintemp_c,
      tomorrowCondition: response.forecast.forecastday[1].day.condition.text,
    },
    AfterTomorrow: {
      AfterTomorrow: conversionedDate.AfterTomorrowName,
      AfterTomorrowMaxTemp: response.forecast.forecastday[2].day.maxtemp_c,
      AfterTomorrowMinTemp: response.forecast.forecastday[2].day.mintemp_c,
      AfterTomorrowCondition:
        response.forecast.forecastday[2].day.condition.text,
    },
  };

  todayDay.innerHTML = data.today.dayName;
  todayDate.innerHTML = data.today.dayNumber + " " + data.today.month;
  Datalocation.innerHTML = data.today.location;
  currentTemp.innerHTML = data.today.currentTemp;
  currentCondition.innerHTML = data.today.currentCondition;
  tomorrowDayName.innerHTML = data.tomorrow.tomorrow;
  tomorrowMAx.innerHTML = data.tomorrow.tomorrowMaxTemp;
  tomorrowMin.innerHTML = data.tomorrow.tomorrowMinTemp;
  tomorrowCondition.innerHTML = data.tomorrow.tomorrowCondition;
  AfterTomorrowDayName.innerHTML = data.AfterTomorrow.AfterTomorrow;
  AfterTomorrowMAx.innerHTML = data.AfterTomorrow.AfterTomorrowMaxTemp;
  AfterTomorrowMin.innerHTML = data.AfterTomorrow.AfterTomorrowMinTemp;
  AfterTomorrowCondition.innerHTML = data.AfterTomorrow.AfterTomorrowCondition;
}
getLocation();
