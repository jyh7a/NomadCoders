const form = document.querySelector(".js-form-greeting"),
   input = form.querySelector("input"),
   greetings = document.querySelector(".js-greetings"),
   fomr_arrow_01 = document.querySelector(".fomr-arrow-01");

const USER_LS = "currentUser",
   SHOWING_CN = "showing";

function saveName(text) {
   localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
   event.preventDefault();
   const currentValue = input.value;
   if (!currentValue) {
      alert("You must write your name 😫");
      bgSetTimerReset();
      return;
   }
   paintGreeting(currentValue);
   saveName(currentValue);
}

function askForName() {
   form.classList.add(SHOWING_CN);
   form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
   form.classList.remove(SHOWING_CN);
   greetings.classList.add(SHOWING_CN);
   greetings.innerHTML = `Welecome🤗 <span>${text}</span>`;
}

function loadName() {
   const currentUser = localStorage.getItem(USER_LS);
   if (currentUser === null || currentUser === "null") {
      // she is not
      askForName();
   } else {
      // she is
      paintGreeting(currentUser);
   }
}

function init() {
   loadName();
   fomr_arrow_01.addEventListener("click", handleSubmit);
}

init();
