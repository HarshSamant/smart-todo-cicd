const API = "http://localhost:5067/todos";

async function loadTasks() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="deleteTask(${index})">X</button>`;
    list.appendChild(li);
  });
}

async function addTask() {
  const task = document.getElementById("task").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });

  loadTasks();
}

async function deleteTask(index) {
  await fetch(`${API}/${index}`, { method: "DELETE" });
  loadTasks();
}

loadTasks();
