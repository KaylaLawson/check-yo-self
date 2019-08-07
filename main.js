// GLOBAL VAR 
var searchInput = document.querySelector(".search-input");
var titleInput = document.querySelector(".title-input");
var itemInput = document.querySelector(".item-input");
var createItem = document.querySelector(".add-item");
var clearItems = document.querySelector(".clear-btn");
var createTaskCard = document.querySelector(".make-btn");
var listedItems = document.querySelector(".aside-tasks-container");
var toDoSection = document.querySelector(".all-tasks");
var tasks = [];
var toDos= JSON.parse(localStorage.getItem('stickyNotes')) || [];
var filterBtn = document.querySelector(".filter-btn");



// EVENT LISTENERS
window.addEventListener('load', onLoad(toDos));
itemInput.addEventListener('keyup', enableItemBtn)
createItem.addEventListener('click', addItemToList);
listedItems.addEventListener('click', removeItem);
createTaskCard.addEventListener('click', addToDo);
toDoSection.addEventListener('click', checkClick);
filterBtn.addEventListener('click', filterUrgent);
searchInput.addEventListener('keyup', search);

// FUNCTIONALITY PRE-CARD
function enableItemBtn(e) {
  createItem.disabled = itemInput.value && titleInput.value != "" ? false : true;
}

function addItemToList(e) {
  e.preventDefault();
  var newTask = {
    task: itemInput.value.trim(),
    complete: false,
    id: Date.now()
  }
  tasks.push(newTask);
  itemInput.value = ""; 
  renderTasks();
  enableItemBtn();
}

function removeItem(e) {
  var itemToRemove = e.target.innerText;
  var newTasks = tasks.filter(elem => {
    if (elem.task != itemToRemove){
      return elem
    }
  })
  tasks = newTasks;
  renderTasks();
}

function renderTasks() {
  clearTasks();
  tasks.forEach(elem => {
    listedItems.innerHTML += `<li class="new-item-listed" data-id=${Date.now()}>${elem.task}</li>` 
  })   
}

function clearTasks() {
  listedItems.innerHTML = "";
}

// FUNCTIONALITY CARD CREATED
function populateCard(newObject) {
  var card = `
    <section class="task-container" data-id=${newObject.id}>
      <h2 class="task-title" contenteditable="true" maxlength="20">${newObject.title}</h2>
      <ul class="items-listed">
        ${stickyTasks(newObject.tasks)}
      </ul>
      <article class="task-card-footer">
        <button class="urgent-icon ${newObject.urgent}" alt="Urgent status of todo list"></button>
        <button class="trash-icon"></button>
      </article>
      <div class="p-elems">
        <p>URGENT</p>
        <p>DELETE</p>
      </div>
    </section>
    `;
  toDoSection.insertAdjacentHTML('afterbegin', card);
}

function addToDo(e) {
  e.preventDefault();
  if (titleInput.value != "" && tasks.length != 0) {
    var newToDo = new ToDoList(Date.now(), titleInput.value, tasks, false)
    toDos.push(newToDo);
    newToDo.saveToStorage(toDos);
    renderCards(toDos);
    clearTasks();
    tasks = [];
    titleInput.value = "";
    itemInput.value = "";
  } 
}

function stickyTasks(tasks) {
  var tasksToRender = "";
  tasks.forEach(elem => {
  tasksToRender += `<li class="card-list-item ${elem.complete ? 'complete' : ' ' }" id=${elem.id}>${elem.task}</li>`
  })
  return tasksToRender
}

function renderCards(toRender) { 
  clearToDos();
  if (toRender.length === 0){
    toDoSection.innerHTML = `<h3>No ToDos</h3>`
  }
  toRender.forEach(toDo => {
    populateCard(toDo)
  })
}

function clearToDos() {
  toDoSection.innerHTML = "";
}

function checkClick(e) {
  var cardInQuestion = grabUID(e)
  if (e.target.classList.contains("card-list-item")) {
    var taskID = e.target.id
    cardInQuestion.updateTask(taskID)
    cardInQuestion.saveToStorage(toDos)
    renderCards(toDos);
  } else if (e.target.classList.contains("urgent-icon")) {
    cardInQuestion.updateToDo();
    cardInQuestion.saveToStorage(toDos);
    renderCards(toDos);
  } else if (e.target.className === "trash-icon") {
    var newToDos = cardInQuestion.deleteFromStorage(toDos);
    toDos = newToDos
    cardInQuestion.saveToStorage(toDos);
    renderCards(toDos);
  }
}

function grabUID(e){
  var cardID = e.target.closest("section").dataset.id
  return toDos.find(toDo => toDo.id == cardID)
}

function onLoad(oldToDos) {
  toDos = [];
  oldToDos.forEach(toDo => {
    var newToDo = new ToDoList(toDo.id, toDo.title, toDo.tasks, toDo.urgent)
    toDos.push(newToDo)
  }) 
  renderCards(toDos);
}

function filterUrgent(e) {
  e.preventDefault()
  var toRender = toDos
  if (e.target.innerText == 'Filter By Urgency') {
    toRender = toDos.filter(toDo => toDo.urgent === true)
    filterBtn.innerText = 'Display All'
  } else {
    filterBtn.innerText = 'Filter By Urgency'
  }
  renderCards(toRender)
}

function search () {
  var searchCurrentText = searchInput.value.toLowerCase();
  var searchedCards = toDos.filter(toDo => {
    return toDo.title.toLowerCase().includes(searchCurrentText);
  });
  renderCards(searchedCards);
}













