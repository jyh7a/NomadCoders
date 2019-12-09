const toDoform = document.querySelector(".js-toDoForm"),
   toDoInput = toDoform.querySelector("input"),
   toDOList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = [];

function saveToDos() {
   localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
   const li = document.createElement("li");
   const delBtn = document.createElement("button");
   const span = document.createElement("span");
   const newId = toDos.length + 1;
   const toDoObj = {
      text: text,
      id: newId
   };

   toDos.push(toDoObj);
   saveToDos();

   delBtn.innerText = "❌";
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
         paintToDo(toDo.text);
      });
   }
}

function init() {
   loadToDos();
   toDoform.addEventListener("submit", handleSubmit);
}

init();
