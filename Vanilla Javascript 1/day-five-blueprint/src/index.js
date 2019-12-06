import "./styles.css";

// You're gonna need this
const NINE_HOURS_MILLISECONDS = 32400000;

function getTime() {
   // debugger;
   // Don't delete this.
   const cday = new Date();
   // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
   const xmasDay = new Date("2019-12-24:00:00:00+0900");
   const currentDay = new Date();
   let d_year = xmasDay.getFullYear() - currentDay.getFullYear();
   let d_month = xmasDay.getMonth() - currentDay.getMonth();
   let d_day = xmasDay.getDate() - currentDay.getDate() - 1;
   const d_hour = 24 - currentDay.getHours();
   const d_min = 60 - currentDay.getMinutes();
   const d_second = 60 - currentDay.getSeconds();
   if (d_year < 0) d_year = false;
   if (d_month < 0) d_month = false;
   if (d_day < 0) d_day = false;

   return {
      d_year: d_year,
      d_month: d_month,
      d_day: d_day,
      d_hour: d_hour,
      d_min: d_min,
      d_second: d_second
   };
}

let $h1 = null;
let $day = null;
let $hour = null;
let $min = null;
let $second = null;

function init() {
   $h1 = document.querySelector("h1");
   $day = document.querySelector(".day");
   $hour = document.querySelector(".hour");
   $min = document.querySelector(".min");
   $second = document.querySelector(".second");
}
init();

setInterval(function() {
   let chrismasObj = getTime();
   const { d_year, d_month, d_day, d_hour, d_min, d_second } = chrismasObj;
   if (d_year === false || d_month === false || d_day === false) {
      $h1.innerText = "Christmas was end 😋";
   }else{
      $day.innerText = d_day + 'd';
      $hour.innerText = d_hour + 'h';
      $min.innerText = d_min + 'm';
      $second.innerText = d_second + 's';
   }
}, 1000);
