const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    // bullet pointer
    const bullet = document.createElement("span");
    bullet.textContent = "•";
    bullet.className = "bullet";

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveAndRender();
    });

    // task ka text
    const text = document.createElement("span");
    text.textContent = task.text;
    text.className = "task-text";

    // delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveAndRender();
    });

    li.appendChild(bullet);
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const value = taskInput.value.trim();
  if (value === "") return;

  tasks.push({ text: value, done: false });
  taskInput.value = "";
  saveAndRender();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();
