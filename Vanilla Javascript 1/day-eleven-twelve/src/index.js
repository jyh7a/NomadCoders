// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

// Refer to

// white space
// https://www.codingfactory.net/10597

// ellipsis
// https://jos39.tistory.com/211

// g-value
const nowResult = document.querySelector(".nowResult");
const pad = document.querySelectorAll(".pad");

// function

// inputFunction
function inputF(e) {
  console.log(e.currentTarget.innerText);
}

// handlerBind
pad.forEach(function(pad) {
   pad.addEventListener("click", inputF);
});

// init
function init() {}

init();
