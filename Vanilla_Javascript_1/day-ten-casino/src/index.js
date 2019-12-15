// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

// Refer to

// Rage Sliders
// https://www.w3schools.com/howto/howto_js_rangeslider.asp
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range

// YouTube
// https://stackoverflow.com/questions/25684693/where-to-pass-arguments-of-postmessage-command-to-youtube-iframe

// global
const slider = document.getElementById("myRange");
const rangeValue = document.getElementById("rangeValue");
const cardSharpChose = document.querySelector(".card-sharp-chose span");
const playerInput_form = document.querySelector(".playerInput-form");
const playerInput = playerInput_form.querySelector(".playerInput");
const contents_img = document.querySelector(".contents-img");
const contents_video = document.querySelector(".contents_video");
const contents_video_iframe = contents_video.querySelector("iframe");
const contents_video_winVideo = contents_video.querySelector(".winVidoe");
const contents_video_loseVideo = contents_video.querySelector(".loseVidoe");

let g_randomNumber = null;

const loseVidoeSrcArry = [
   "https://www.youtube.com/embed/SQJknkRiZRk?start=0&enablejsapi=1&loop=1&autoplay=1&playlist=SQJknkRiZRk",
   "https://www.youtube.com/embed/x-YnH-u_DE8?start=0&enablejsapi=1&loop=1&autoplay=1&playlist=x-YnH-u_DE8",
   "https://www.youtube.com/embed/XtqIpsPf5Mg?start=0&enablejsapi=1&loop=1&autoplay=1&playlist=XtqIpsPf5Mg",
   "https://www.youtube.com/embed/n1jEDms_n6w?start=0&enablejsapi=1&loop=1&autoplay=1&playlist=n1jEDms_n6w",
   "https://www.youtube.com/embed/p0vipc65p9k?start=7&enablejsapi=1&loop=1&autoplay=1&playlist=p0vipc65p9k"
];

const winVidoeSrcArry = [
   "https://www.youtube.com/embed/5aqgSp816IA?start=53&enablejsapi=1&loop=1&autoplay=1&playlist=5aqgSp816IA",
   "https://www.youtube.com/embed/-DIivZITQzo?start=41&enablejsapi=1&loop=1&autoplay=1&playlist=-DIivZITQzo",
   "https://www.youtube.com/embed/Q9oat_q3UqQ?start=738&enablejsapi=1&loop=1&autoplay=1&playlist=Q9oat_q3UqQ",
   "https://www.youtube.com/embed/g16mjNRXVY4?start=33&enablejsapi=1&loop=1&autoplay=1&playlist=-DIivZITQzo",
   "https://www.youtube.com/embed/z7r0DIjRGd4?start=82&enablejsapi=1&loop=1&autoplay=1&playlist=-DIivZITQzo"
];

//  slider
slider.addEventListener("input", function() {
   printRangeValue();
   printCardSharpChose();
});

function printRangeValue() {
   rangeValue.innerHTML = slider.value;
}

function printCardSharpChose() {
   g_randomNumber = randomNumberGenerate(slider.value);
   cardSharpChose.innerText = g_randomNumber;
}

// player
// 손목걸기
function handlerPlayerInputform(e) {
   e.preventDefault();
   const number = parseInt(playerInput.value, 10);
   const sliderNumber = parseInt(slider.value, 10);

   if (number < 0 || number > sliderNumber) {
      contents_video.classList.add("dp-none");
      contents_video_iframe.contentWindow.postMessage(
         '{"event":"command","func":"stopVideo","args":""}',
         "*"
      );
      contents_video_winVideo.contentWindow.postMessage(
         '{"event":"command","func":"stopVideo","args":""}',
         "*"
      );
      contents_video_loseVideo.contentWindow.postMessage(
         '{"event":"command","func":"stopVideo","args":""}',
         "*"
      );
      contents_img.className = "contents-img wrongValue dp-block";
      return;
   }

   if (!isNaN(number)) {
      const correctBool = compareCorrect();
      printCardSharpChose();
      contents_img.classList.remove("noValue", "dp-block");
      if (correctBool) {
         // debugger;
         // let data1 = { event: "command", func: "seekTo", args: [53, true] };
         // let message1 = JSON.stringify(data1);
         // contents_video_winVideo.contentWindow.postMessage(
         //    '{"event":"command","func":"stopVideo","args":""}',
         //    "*"
         // );
         contents_video.className = "contents_video win";

         contents_video_iframe.className = "dp-none";
         contents_video_loseVideo.className = "loseVidoe dp-none";
         contents_video_winVideo.className = "winVidoe dp-block";
         contents_video_iframe.contentWindow.postMessage(
            '{"event":"command","func":"stopVideo","args":""}',
            "*"
         );
         contents_video_loseVideo.contentWindow.postMessage(
            '{"event":"command","func":"stopVideo","args":""}',
            "*"
         );

         // contents_video_winVideo.contentWindow.postMessage(message1, "*");
         const rNumber = randomNumberGenerate(4);
         contents_video_winVideo.setAttribute("src", winVidoeSrcArry[rNumber]);
      } else {
         // let data = { event: "command", func: "seekTo", args: [0, true] };
         // let message = JSON.stringify(data);
         contents_video.className = "contents_video lose";

         contents_video_iframe.className = "dp-none";
         contents_video_winVideo.className = "winVidoe dp-none";
         contents_video_loseVideo.className = "loseVideo db-block";
         contents_video_iframe.contentWindow.postMessage(
            '{"event":"command","func":"stopVideo","args":""}',
            "*"
         );
         contents_video_winVideo.contentWindow.postMessage(
            '{"event":"command","func":"stopVideo","args":""}',
            "*"
         );

         // contents_video_loseVideo.contentWindow.postMessage(message, "*");
         // contents_video_loseVideo.contentWindow.postMessage(
         //    '{"event":"command","func":"playVideo","args":""}',
         //    "*"
         // );
         const rNumber = randomNumberGenerate(4);
         contents_video_loseVideo.setAttribute(
            "src",
            loseVidoeSrcArry[rNumber]
         );
      }
   } else {
      contents_video_iframe.contentWindow.postMessage(
         '{"event":"command","func":"stopVideo","args":""}',
         "*"
      );
      contents_video_winVideo.contentWindow.postMessage(
         '{"event":"command","func":"stopVideo","args":""}',
         "*"
      );
      contents_video_loseVideo.contentWindow.postMessage(
         '{"event":"command","func":"stopVideo","args":""}',
         "*"
      );
      contents_video.classList.add("dp-none");
      // contents_img.classList.add("noValue", "dp-block");
      contents_img.className = "contents-img dp-block noValue";
   }
}

// common

// compare CardSharp and player Value
function compareCorrect() {
   const playerValue = parseInt(playerInput.value, 10);
   if (playerValue === g_randomNumber) {
      return true;
   } else {
      return false;
   }
}

// randomNumberGenerate
function randomNumberGenerate(p_number) {
   const number = parseInt(p_number);
   return Math.round(Math.random() * number);
}

// init
function init() {
   printRangeValue();
   printCardSharpChose();
   playerInput_form.addEventListener("submit", handlerPlayerInputform);
}

init();
