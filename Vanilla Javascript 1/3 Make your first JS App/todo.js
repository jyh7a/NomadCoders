const toDoform = document.querySelector(".js-toDoForm"),
   toDoInput = toDoform.querySelector("input"),
   toDOList = document.querySelector(".js-toDoList"),
   js_toDoForm_arrow = document.querySelector(".js-toDoForm .fomr-arrow-02"),
   allRest = document.querySelector(".allRest");

const TODOS_LS = "toDos";

let js_toDoList_li = null;

let toDos = [];
const randomImoge = ["😸", "🙊", "🐶", "🦝", "🐹", "🦄", "🐲"];

function deleteToDO(event) {
   const btn = event.target;
   const li = btn.parentNode;
   toDOList.removeChild(li);
   const cleanToDos = toDos.filter(function(toDo) {
      return toDo.id !== parseInt(li.id, 10);
   });
   toDos = cleanToDos;
   saveToDos();
}

function saveToDos() {
   localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text, id) {
   // debugger
   if (checkListCount() >= 6) {
      alert("This list is limited to six 😭");
      return;
   }
   const li = document.createElement("li");
   const delBtn = document.createElement("button");
   const span = document.createElement("span");
   let newId = null;
   newId = id ? (newId = id) : (newId = new Date().valueOf());
   const toDoObj = {
      text: text,
      id: newId
   };

   toDos.push(toDoObj);
   saveToDos();

   delBtn.innerText = "❌";
   delBtn.addEventListener("click", deleteToDO);

   const randomIndex = Math.floor(Math.random() * 7);
   span.innerText = randomImoge[randomIndex] + " " + text;
   li.appendChild(span);
   li.appendChild(delBtn);
   li.id = newId;
   li.classList.add("ellipsis2");
   toDOList.appendChild(li);
   // debugger;
}

function handleSubmit(event) {
   event.preventDefault();
   const currentValue = toDoInput.value;
   if (!currentValue) {
      alert("You must write to do list 😫");
      bgSetTimerReset();
      return;
   }
   paintToDo(currentValue);
   toDoInput.value = "";
}

function checkListCount() {
   js_toDoList_li = document.querySelectorAll(".js-toDoList li");
   if (js_toDoList_li) {
      // console.log("li", js_toDoList_li.length);
      return js_toDoList_li.length;
   }
}

function loadToDos() {
   const loadedToDos = localStorage.getItem(TODOS_LS);

   if (loadedToDos !== null) {
      const parseToDos = JSON.parse(loadedToDos);

      parseToDos.forEach(function(toDo) {
         paintToDo(toDo.text, toDo.id);
      });
   }
}

function init() {
   loadToDos();
   toDoform.addEventListener("submit", handleSubmit);
   js_toDoForm_arrow.addEventListener("click", handleSubmit);
}

init();
