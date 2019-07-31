// GLOBAL VAR 
var searchInput = document.querySelector(".search-input");
var titleInput = document.querySelector(".title-input");
var itemInput = document.querySelector(".item-input");
var createItem = document.querySelector(".add-item");
var clearItems = document.querySelector(".clear-btn");
var createTaskCard = document.querySelector(".make-btn");
var listedItems = document.querySelector(".aside-tasks-container")


// EVENT LISTENERS

itemInput.addEventListener('keyup', enableItemBtn)
createItem.addEventListener('click', addItem);
listedItems.addEventListener('click', removeItem);


// FUNCTIONALITY 

function enableItemBtn(e) {
  if (itemInput.value !== "") {
    createItem.disabled = false;
  } else {
    createItem.disabled = true;
  }
}

function addItem(e) {
  e.preventDefault();
  listedItems.innerHTML += `<ul>
  <li class="del-icon">${itemInput.value}</li></ul>`
  itemInput.value = ""; 
  enableItemBtn();
}

function removeItem() {
  e.target.remove()
}














