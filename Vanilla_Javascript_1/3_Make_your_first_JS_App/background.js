const remainTime = document.querySelector(".remainTime");
const IMG_NUMBER = 6;
let paintFlag = true;

function handleImageLoad() {
   console.log("Load Start");
}

function handleImageLoadEnd() {
   console.log("Load End");
}

function paintImage() {
   const el = document.querySelector(".bgImage");

   body.className = currentIconString;
   console.log(currentIconString);
   console.log(paintFlag);
   const image = new Image();
   // alert(currentIconString);
   // https://source.unsplash.com/random/?city,night
   // image.src = `https://source.unsplash.com/1600x900/?${currentIconString},nature`;
   if (paintFlag) {
      image.src = `https://source.unsplash.com/random/1600x900/?${currentIconString},nature`;
      paintFlag = false;
   } else {
      image.src = `https://source.unsplash.com/random/1600x900/?${currentIconString},sky`;
      paintFlag = true;
   }
   // image.src = `https://source.unsplash.com/random/?${currentIconString},nature`;
   image.classList.add("bgImage");
   body.appendChild(image);
   setTimeout(function() {
      if (el) el.remove();
   }, 5000);
   // image.addEventListener("load", handleImageLoad);
   // image.addEventListener("loadend", handleImageLoadEnd);
}

function paintImagePeriodically() {
   console.log(1);
   const image = new Image();
   // alert(currentIconString);
   image.src = `https://source.unsplash.com/1600x900/?${currentIconString},nature`;
   image.classList.add("bgImage");
   body.appendChild(image);
}

function init() {
   // const randomNumber = genRandom();
   Stimer1 = setInterval(function() {
      paintImage();
   }, 30000);
   Stimer2 = setInterval(function() {
      // console.log(timeCount--);
      // console.log(timeCount--);
      remainTime.innerText = `${timeCount--} seconds left until the background changes🕒`;
      if (timeCount == 0) timeCount = 30;
   }, 1000);
   // setInterval(paintImagePeriodically, 10000);
}

init();
