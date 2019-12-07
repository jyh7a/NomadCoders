const clockContainer = document.querySelector(".js-clock"),
   clockTitle = clockContainer.querySelector("h1");

function getTime() {
   const date = new Date();
   const hours = date.getHours();
   const mins = date.getMinutes();
   const seconds = date.getSeconds();

   clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} ${
      mins < 10 ? `0${mins}` : mins
   } ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
   getTime();
   setInterval(getTime, 1000);
}

init();
