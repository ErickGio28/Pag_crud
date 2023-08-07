document.addEventListener("DOMContentLoaded", function () {
    displayTasks();
  });
  
  function addTask() {
    const taskInput = document.getElementById("task");
    const descriptionInput = document.getElementById("description");
    const task = taskInput.value.trim();
    const description = descriptionInput.value.trim();
  
    if (!task) return;
  
    const newTask = {
      id: Date.now(),
      task,
      description,
    };
  
    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);
  
    taskInput.value = "";
    descriptionInput.value = "";
  
    displayTasks();
  }
  
  function displayTasks() {
    const tasks = getTasks();
    const tasksList = document.getElementById("tasksList");
    tasksList.innerHTML = "";
  
    tasks.forEach(task => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
  
      taskItem.innerHTML = `
        <strong>${task.task}</strong> - ${task.description}
        <button onclick="editTask(${task.id})">Editar</button>
        <button onclick="deleteTask(${task.id})">Eliminar</button>
      `;
  
      tasksList.appendChild(taskItem);
    });
  }
  
  function editTask(id) {
    const tasks = getTasks();
    const taskToUpdate = tasks.find(task => task.id === id);
  
    if (!taskToUpdate) return;
  
    const updatedTask = prompt("Editar tarea:", taskToUpdate.task);
    if (updatedTask === null) return;
  
    const updatedDescription = prompt("Editar descripción:", taskToUpdate.description);
  
    taskToUpdate.task = updatedTask.trim();
    taskToUpdate.description = updatedDescription.trim();
  
    saveTasks(tasks);
    displayTasks();
  }
  
  function deleteTask(id) {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasks(updatedTasks);
    displayTasks();
  }
  
  function getTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks;
  }
  
  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  