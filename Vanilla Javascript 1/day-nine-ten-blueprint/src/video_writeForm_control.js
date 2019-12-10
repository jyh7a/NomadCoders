const modal = document.querySelector(".modal");
const modalCloseBtn = modal.querySelector(".close");
const modalVideo = modal.querySelector(".modalViewer-video");
const player1 = document.querySelector("#player1");
const writeBtn = document.querySelector(".write");
const modal_form = modal.querySelector(".modal-form");
let modal_input = modal_form.querySelector(".modal-input");
const pending = document.querySelector(".pending");
const finished = document.querySelector(".finished");
const movieViewerH2 = document.querySelector(".movieViewer h2");
const movieViewer_default = document.querySelector(".movieViewer-default");
const movieViewer_video = document.querySelector(".movieViewer-video");

const TO_DO_LIST = "toDoList";
const FINISHED_LIST = "finishedList";
let TO_DO_LIST_ARRAY = [];
let FINISHED_LIST_ARRAY = [];

let pendingCount = 1;
let finishedCount = 1;

let addFlag = false;
let finisgedFlag = false;

const VIDOE_SRC_ARRAY = [
   "https://www.youtube.com/embed/5-sfG8BV8wU?autoplay=1&loop=1&playlist=5-sfG8BV8wU",
   "https://www.youtube.com/embed/QruaJ8cNNds?autoplay=1&loop=1enablejsapi=1&playlist=QruaJ8cNNds",
   "https://www.youtube.com/embed/QruaJ8cNNds?mute=1&loop=1&enablejsapi=1&playlist=QruaJ8cNNds"
];

const HanndlerMovieViewerH2 = function() {
   setTimeout(function() {
      const pendingLi = document.querySelectorAll(".pending li");
      const finishedLi = document.querySelectorAll(".finished li");
      const pendingLi_Leng = pendingLi.length;
      const finishedLi_Leng = finishedLi.length;
      if (pendingLi_Leng || finishedLi_Leng) {
         const tempSrc = player1.getAttribute("src");
         if(tempSrc !== VIDOE_SRC_ARRAY[1]){
            player1.setAttribute("src", VIDOE_SRC_ARRAY[1]);
         }
         movieViewerH2.innerText = `You have ${pendingLi_Leng} list and ${finishedLi_Leng} finished list.`;
         movieViewer_video.classList.add("dp-block");
         movieViewer_default.classList.remove("dp-block");
      } else {
         player1.setAttribute("src", VIDOE_SRC_ARRAY[2]);
         movieViewerH2.innerText = `Add Do it list.`;
         movieViewer_default.classList.add("dp-block");
         movieViewer_video.classList.remove("dp-block");
      }
   }, 0);
};

const addList = function(obj) {
   const li = document.createElement("li");
   const xBtn = document.createElement("span");
   const fBtn = document.createElement("span");
   const { text, id } = obj;

   if (addFlag) {
   } else {
      TO_DO_LIST_ARRAY.push(obj);
      addFlag = false;
   }

   xBtn.innerText = "❌";
   fBtn.innerText = "✔";
   li.id = id;
   li.className = "pending-li";
   xBtn.className = "cursor x-btn";
   fBtn.className = "cursor f-btn";
   li.innerText = `${pendingCount}. ${text}`;
   li.appendChild(xBtn);
   li.appendChild(fBtn);
   pending.appendChild(li);

   pendingCount++;

   modal_input.value = "";

   xBtn.addEventListener("click", deletePending);
   fBtn.addEventListener("click", moveToFinished);
};

const handlerModalClose = function() {
   setTimeout(function(){
      HanndlerMovieViewerH2();
      modalVideo.setAttribute("src", "");
      modal.className = "dp-none";
      movieViewer_video.contentWindow.postMessage(
         '{"event":"command","func":"playVideo","args":""}',
         "*"
      );
   },0)
};

const handlerWriteBtn = function() {
   modalVideo.setAttribute("src", VIDOE_SRC_ARRAY[0]);
   modal.className = "modal";
   movieViewer_video.contentWindow.postMessage(
      '{"event":"command","func":"stopVideo","args":""}',
      "*"
   );
};

const handlerModal_form = function(e) {
   e.preventDefault();

   const todo = modal_input.value;
   const TO_DO_LIST_OBJ = getLocalStorage();
   if (TO_DO_LIST_OBJ) {
      const TO_DO_LIST_OBJ_LEN = TO_DO_LIST_OBJ.length;
   }

   if (todo) {
      setLocalStorageOne(todo);
      let lastObj = getLocalStorage();
      lastObj = lastObj[lastObj.length - 1];
      addFlag = true;
      addList(lastObj);

      handlerModalClose();
   } else {
      alert("You must write to do list!");
   }
};

const setLocalStorageOne = function(text) {
   const listID = new Date().valueOf();
   let getObj = getLocalStorage();

   getObj ? (TO_DO_LIST_ARRAY = [...getObj]) : TO_DO_LIST_ARRAY;
   TO_DO_LIST_ARRAY.push({ id: listID, text: text });
   localStorage.setItem(TO_DO_LIST, JSON.stringify(TO_DO_LIST_ARRAY));
};

// const setLocalStorage = function(text) {
//    const listID = new Date().valueOf();
//    TO_DO_LIST_ARRAY.push({ id: listID, text: text });
//    localStorage.setItem(TO_DO_LIST, JSON.stringify(TO_DO_LIST_ARRAY));
// };

const getLocalStorage = function() {
   const resultObj = localStorage.getItem(TO_DO_LIST);
   return JSON.parse(resultObj);
};

function loadToDos() {
   const loadedToDos = localStorage.getItem(TO_DO_LIST);
   const loadedFinished = localStorage.getItem(FINISHED_LIST);

   if (loadedToDos !== null) {
      const parseToDos = JSON.parse(loadedToDos);

      parseToDos.forEach(function(toDo) {
         addList(toDo);
      });
   }

   if (loadedFinished !== null) {
      const parseToDos = JSON.parse(loadedFinished);

      parseToDos.forEach(function(toDo) {
         paintFinised(toDo);
      });
   }
}

function paintFinised(obj) {
   const li = document.createElement("li");
   const f_xBtn = document.createElement("span");
   const f_fBtn = document.createElement("span");
   const { text, id } = obj;

   if (finisgedFlag) {
   } else {
      FINISHED_LIST_ARRAY.push(obj);
      finisgedFlag = false;
   }

   f_xBtn.innerText = "❌";
   f_fBtn.innerText = "⏏";
   li.id = id;
   li.className = "pending-li";
   f_xBtn.className = "cursor x-btn";
   f_fBtn.className = "cursor f-btn";
   li.innerText = `${finishedCount}. ${text}`;
   li.appendChild(f_xBtn);
   li.appendChild(f_fBtn);
   finished.appendChild(li);

   finishedCount++;

   modal_input.value = "";

   f_xBtn.addEventListener("click", deleteFinished);
   f_fBtn.addEventListener("click", moveToPending);
}

function moveToFinished(e) {
   addFinished(e);
   resetFinishedLi();
   FINISHED_LIST_ARRAY.forEach(function(item) {
      finisgedFlag = true;
      paintFinised(item);
   });
   // FINISHED_LIST_ARRAY.push();
}

function moveToPending(e) {
   addPending(e);
   resetPendingLi();
   TO_DO_LIST_ARRAY.forEach(function(item) {
      addFlag = true;
      addList(item);
   });
   // FINISHED_LIST_ARRAY.push();
}

function addPending(e) {
   const btn = e.target;
   const li = btn.parentNode;
   // pending.removeChild(li);

   const addPendingdDos = FINISHED_LIST_ARRAY.filter(function(toDo) {
      return toDo.id === parseInt(li.id);
   });
   TO_DO_LIST_ARRAY = TO_DO_LIST_ARRAY.concat(addPendingdDos);
   saveToDos();
   const clenToFinished = FINISHED_LIST_ARRAY.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
   });
   FINISHED_LIST_ARRAY = clenToFinished;

   saveFinished();
   // saveFinished();
   // pendingCount--;

   resetFinishedLi();
   FINISHED_LIST_ARRAY.forEach(function(toDo) {
      finisgedFlag = true;
      paintFinised(toDo);
   });
   HanndlerMovieViewerH2();
}

function saveFinished() {
   localStorage.setItem(FINISHED_LIST, JSON.stringify(FINISHED_LIST_ARRAY));
}

function saveToDos() {
   localStorage.setItem(TO_DO_LIST, JSON.stringify(TO_DO_LIST_ARRAY));
}

function addFinished(e) {
   const btn = e.target;
   const li = btn.parentNode;
   // pending.removeChild(li);

   const addFinishedDos = TO_DO_LIST_ARRAY.filter(function(toDo) {
      return toDo.id === parseInt(li.id);
   });
   FINISHED_LIST_ARRAY = FINISHED_LIST_ARRAY.concat(addFinishedDos);
   saveFinished();
   const clenToDos = TO_DO_LIST_ARRAY.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
   });
   TO_DO_LIST_ARRAY = clenToDos;

   saveToDos();
   // saveFinished();
   // pendingCount--;

   resetPendingLi();
   TO_DO_LIST_ARRAY.forEach(function(toDo) {
      addFlag = true;
      addList(toDo);
   });
   HanndlerMovieViewerH2();
}

function resetPendingLi() {
   // const pending_li = document.quey
   while (pending.childElementCount) {
      pending.removeChild(pending.lastChild);
   }
   pendingCount = 1;
}

function resetFinishedLi() {
   while (finished.childElementCount) {
      finished.removeChild(finished.lastChild);
   }
   finishedCount = 1;
}

function deletePending(e) {
   const btn = e.target;
   const li = btn.parentNode;
   // pending.removeChild(li);
   const clenToDos = TO_DO_LIST_ARRAY.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
   });

   TO_DO_LIST_ARRAY = clenToDos;
   saveToDos();
   // pendingCount--;
   resetPendingLi();
   TO_DO_LIST_ARRAY.forEach(function(item) {
      addFlag = true;
      addList(item);
   });

   HanndlerMovieViewerH2();
}

function deleteFinished(e) {
   const btn = e.target;
   const li = btn.parentNode;
   // finished.removeChild(li);
   const clenFinished = FINISHED_LIST_ARRAY.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
   });

   FINISHED_LIST_ARRAY = clenFinished;
   saveFinished();
   // finishedCount--;
   resetFinishedLi();
   FINISHED_LIST_ARRAY.forEach(function(item) {
      finisgedFlag = true;
      paintFinised(item);
   });

   HanndlerMovieViewerH2();
}

const init = function() {
   loadToDos();
   modalCloseBtn.addEventListener("click", handlerModalClose);
   writeBtn.addEventListener("click", handlerWriteBtn);
   modal_form.addEventListener("submit", handlerModal_form);
};

init();
