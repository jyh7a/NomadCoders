const weather = document.querySelector(".js-weather");

const API_KEY = "2797529841a9251af59515d13adc0377";
const COORDS = "coords";
let iconAPI = "http://openweathermap.org/img/wn/10d@2x.png";

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
         weather.innerText = `${temperature} @ ${place}`;
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
   if (loadedCoords === null) {
      askForCoords();
   } else {
      // getWeather
      const parseCoords = JSON.parse(loadedCoords);
      getWeather(parseCoords.latitude, parseCoords.longitude);
   }
}

function init() {
   loadCoords();
}

init();
