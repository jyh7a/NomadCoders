const clockContainer = document.querySelector(".js-clock"),
   clockTitle = clockContainer.querySelector("h1"),
   body = document.querySelector("body");

let timeCount = 30;
let Stimer1 = null;
let Stimer2 = null;

function bgSetTimerReset() {
   timeCount = 30;

   clearInterval(Stimer1);
   clearInterval(Stimer2);

   Stimer1 = setInterval(function() {
      paintImage();
   }, 30000);
   Stimer2 = setInterval(function() {
      // console.log(timeCount--);
      // console.log(timeCount--);
      remainTime.innerText = `${timeCount--} seconds left until the background changes🕒`;
      if (timeCount == 0) timeCount = 30;
   }, 1000);
}

function getTime() {
   const date = new Date();
   const hours = date.getHours();
   const mins = date.getMinutes();
   const seconds = date.getSeconds();

   clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
      mins < 10 ? `0${mins}` : mins
   }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
   getTime();
   setInterval(getTime, 1000);
}

init();
