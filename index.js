import {
  getTasks,
  saveTask,
  onTasksChange,
  deleteTask,
  getTask,
  updateTask,
} from "./firebase.js";

const tasksContainer = document.getElementById("tasks-container");
const taskForm = document.getElementById("task-form");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async () => {
  onTasksChange((querySnapshot) => {
    tasksContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      tasksContainer.innerHTML += `
        <div class="card card-body mb-2 border-primary">
          <h3 class="h5">${task.title}</h3>
          <p>${task.description}</p>
          <div>
            <button class='btn btn-success btn-edit' data-id="${doc.id}">Edit</button>
            <button class='btn btn-danger btn-delete' data-id="${doc.id}">Delete</button>
          </div>
        </div>
        `;
    });
    const btnsDelete = tasksContainer
      .querySelectorAll(".btn-delete")
      .forEach((btn) => {
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          deleteTask(dataset.id);
        });
      });
    const btnsEdit = tasksContainer
      .querySelectorAll(".btn-edit")
      .forEach((btn) => {
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          const doc = await getTask(dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-save"].innerText = "Update";
        });
      });
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];
  if (!editStatus) {
    saveTask(title.value, description.value);
  } else {
    updateTask(id, title.value, description.value);
    editStatus = false;
  }
  taskForm.reset();
});
