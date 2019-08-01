// GLOBAL VAR 
var searchInput = document.querySelector(".search-input");
var titleInput = document.querySelector(".title-input");
var itemInput = document.querySelector(".item-input");
var createItem = document.querySelector(".add-item");
var clearItems = document.querySelector(".clear-btn");
var createTaskCard = document.querySelector(".make-btn");
var listedItems = document.querySelector(".aside-tasks-container");
var todoSection = document.querySelector(".all-tasks");
var newToDos = JSON.parse(localStorage.getItem('todos')) || [];

// EVENT LISTENERS
itemInput.addEventListener('keyup', enableItemBtn)
createItem.addEventListener('click', addItemToList);
listedItems.addEventListener('click', removeItem);
createTaskCard.addEventListener('click', addToDo);

// FUNCTIONALITY 
function enableItemBtn(e) {
  if (itemInput.value !== "") {
    createItem.disabled = false;
  } else {
    createItem.disabled = true;
  }
}

function addItemToList(e) {
  e.preventDefault();
  listedItems.innerHTML += `<li class="new-item-listed" data-id=${Date.now()}">${itemInput.value}</li>`
  itemInput.value = ""; 
  enableItemBtn();
}

function removeItem(e) {
  e.target.remove()
}

function addTaskToArray() {
  var tasks = [];
}

function populateCard(newObject) {
  var card = `
  <section class="task-container" data-id=${newObject.id}>
      <h2 class="task-title" contenteditable="true" maxlength="20">${newObject.title}</h2>
      <ul>
        <li class="card-tasks">${newObject.tasks}</li>
      </ul>
      <article class="task-card-footer">
        <button class="urgent-icon ${newObject.urgent} " alt="Urgent status of todo list"></button>
        <button class="trash-icon"></button>
      </article>
    </section>
    `;
    todoSection.insertAdjacentHTML('afterbegin', card);
}

function addToDo(e) {
  var toDoArr = [];
  e.preventDefault();
  if (titleInput.value !== "") {
    var newToDo = new ToDoList(Date.now(), titleInput.value, toDoArr, false)
    toDoArr.push(newToDo);
    populateCard(newToDo);
  }
}














