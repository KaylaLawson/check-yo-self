class ToDoList {
  constructor (id, title, tasks, urgent) {
    this.id = id;
    this.title = title;
    this.tasks = tasks || [];
    this.urgent = urgent;
  }

  saveToStorage(newStickies) {
    localStorage.setItem('stickyNotes', JSON.stringify(newStickies));
  }

  deleteFromStorage(oldToDos) {
    return oldToDos.filter(toDo => toDo.id != this.id);
  }
    
  updateToDo() {
    this.urgent = !this.urgent
  }

  updateTask(taskID) {
    this.tasks = this.tasks.map(task => {
      if (task.id == taskID) {
        task.complete = !task.complete
      }
      return task
    })
  }
}