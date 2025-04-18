const titleInput = document.getElementById("title");
const descInput = document.getElementById("desc");
const dueInput = document.getElementById("due");
const priorityInput = document.getElementById("priority");
const addBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const toggleDark = document.getElementById("toggleDark");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "p-4 rounded-lg shadow bg-gray-50 dark:bg-gray-700";

    li.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-bold text-lg">${task.title} 
            <span class="text-sm font-normal ml-2 ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}">
              [${task.priority}]
            </span>
          </h3>
          <p class="text-sm">${task.description}</p>
          <p class="text-xs text-gray-500 mt-1">Due: ${task.dueDate || 'Not Set'}</p>
        </div>
        <div class="space-x-2">
          <button onclick="toggleComplete(${index})" class="text-sm px-2 py-1 rounded border ${task.completed ? 'bg-green-500 text-white' : ''}">
            ${task.completed ? '✔️ Done' : '✅ Mark'}
          </button>
          <button onclick="deleteTask(${index})" class="text-sm px-2 py-1 bg-red-500 text-white rounded">❌</button>
        </div>
      </div>
    `;

    if (task.completed) {
      li.classList.add("opacity-60", "line-through");
    }

    taskList.appendChild(li);
  });
}

function addTask() {
  const newTask = {
    title: titleInput.value.trim(),
    description: descInput.value.trim(),
    dueDate: dueInput.value,
    priority: priorityInput.value,
    completed: false,
  };

  if (!newTask.title) return alert("Title is required!");

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();

  // Clear input
  titleInput.value = "";
  descInput.value = "";
  dueInput.value = "";
  priorityInput.value = "Low";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addBtn.addEventListener("click", addTask);
toggleDark.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// Render on page load
renderTasks();
