const weather = document.querySelector(".js-weather");
const weather_icon = document.querySelector(".js-weather-icon img");
const select = document.querySelector(".selectForced select");

const API_KEY = "2797529841a9251af59515d13adc0377";
const COORDS = "coords";
let iconAPI = "http://openweathermap.org/img/wn/10dx.png";

// clear, clouds, rain, thunderstorm, snow, mist
let currentIconString = null;
const ICON_STRING_DETER = [
   "Thunderstorm",
   "Drizzle",
   "Rain",
   "Snow",
   "Mist",
   "Smoke",
   "Haze",
   "Dust",
   "Fog",
   "Sand",
   "Ash",
   "Squall",
   "Tornado",
   "Clear",
   "Clouds"
];

function genRandom() {
   const number = Math.floor(Math.random() * IMG_NUMBER);
   return number;
}

// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
// https://openweathermap.org/weather-conditions
// https://source.unsplash.com/
// 날씨에 따라서 눈이나, 비 효과 추가

function getWeather(lat, lon) {
   fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
   )
      .then(function(response) {
         // console.log(response);
         // console.log(response.json());
         return response.json();
      })
      .then(function(json) {
         console.log(json);
         const temperature = json.main.temp;
         const place = json.name;
         let icon = json.weather[0].icon;
         currentIconString = json.weather[0].main;
         // currentIconString = "Tornado";
         console.log("currentIconString", currentIconString);
         icon = icon.slice(0, icon.length - 1);
         icon = icon.concat("d");
         weather.innerText = `${temperature}℃ @ ${place}`;
         weather_icon.src = `http://openweathermap.org/img/wn/${icon}.png`;
      })
      .then(function() {
         // alert(currentIconString);
         // alert(1);
         // const randomNumber = genRandom();
         paintImage();
      });
}

function saveCoords(coordsObj) {
   localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   const coordsObj = {
      latitude,
      longitude
   };
   saveCoords(coordsObj);
   getWeather(latitude, longitude);
}

function handleGeoError() {
   console.log("Cant access geo location");
}

function askForCoords() {
   navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
   const loadedCoords = localStorage.getItem(COORDS);
   if (loadedCoords === null || loadedCoords === "null") {
      askForCoords();
   } else {
      // getWeather
      const parseCoords = JSON.parse(loadedCoords);
      getWeather(parseCoords.latitude, parseCoords.longitude);
   }
}

function allRestF() {
   const isTrue = confirm(
      "All list and geolocation data and UserData will be deleted.🤩"
   );
   // console.log(isTrue);
   if (isTrue) {
      console.log("toDos", toDos);
      toDos = [];
      localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
      localStorage.setItem("currentUser", null);
      greetings.innerHTML = "";
      greetings.classList.remove("showing");
      form.classList.add("showing");
      form.querySelector("input").value = "";
      console.log("toDos", toDos);
      toDOList.innerHTML = "";
      const coordsObj = null;
      localStorage.setItem(COORDS, JSON.stringify(coordsObj));

      bgSetTimerReset();
   }
}

function handlerSelect(){
   const effect = this.value;
}


function init() {
   loadCoords();
   allRest.addEventListener("click", allRestF);
   select.addEventListener('change', handlerSelect);
}

init();
