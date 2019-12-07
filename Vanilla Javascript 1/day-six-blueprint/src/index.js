// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
// debugger;
const select = document.querySelector(".js-select");
const options = select.querySelectorAll("option");
const mapViewer = document.querySelector(".mapViewer");

const USER_COUNTRY = "userCountry";

function saveUserCountry(country) {
   localStorage.setItem(USER_COUNTRY, country);
}

function renderViewer() {
   let userCountry = localStorage.getItem(USER_COUNTRY);

   if (userCountry) {
      switch (userCountry) {
         case "Choose":
            mapViewer.className = "default";
            mapViewer.classList.add("mapViewer");
            break;
         case "Korea":
            mapViewer.className = "korea";
            mapViewer.classList.add("mapViewer");
            break;
         case "Greece":
            mapViewer.className = "greece";
            mapViewer.classList.add("mapViewer");
            break;
         case "Turkey":
            mapViewer.className = "turkey";
            mapViewer.classList.add("mapViewer");
            break;
         case "Finland":
            mapViewer.className = "finland";
            mapViewer.classList.add("mapViewer");
            break;
      }

      options.forEach(function(item, index) {
         if (userCountry === item.value) {
            item.selected = true;
         }
      });
   } else {
   }
}

function handlerSelect() {
   if (this.value) {
      saveUserCountry(this.value);
      renderViewer();
   }
}

function init() {
   renderViewer();
   select.addEventListener("change", handlerSelect);
}

init();
