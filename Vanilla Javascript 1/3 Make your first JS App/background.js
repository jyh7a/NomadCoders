const body = document.querySelector("body");

const IMG_NUMBER = 6;

function handleImageLoad() {
   console.log("Load Start");
}

function handleImageLoadEnd() {
   console.log("Load End");
}

function paintImage(imgNumber) {
   const image = new Image();
   image.src = `/img/${imgNumber + 1}.jpg`;
   image.classList.add("bgImage");
   body.appendChild(image);
   // image.addEventListener("load", handleImageLoad);
   // image.addEventListener("loadend", handleImageLoadEnd);
}

function genRandom() {
   const number = Math.floor(Math.random() * IMG_NUMBER);
   return number;
}

function init() {
   const randomNumber = genRandom();
   paintImage(randomNumber);
}

init();
