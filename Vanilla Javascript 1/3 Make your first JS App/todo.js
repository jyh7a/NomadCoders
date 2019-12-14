const toDoform = document.querySelector(".js-toDoForm"),
   toDoInput = toDoform.querySelector("input"),
   toDOList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

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
   span.innerText = text;
   li.appendChild(span);
   li.appendChild(delBtn);
   li.id = newId;
   toDOList.appendChild(li);
}

function handleSubmit(event) {
   event.preventDefault();
   const currentValue = toDoInput.value;
   paintToDo(currentValue);
   toDoInput.value = "";
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
}

init();
