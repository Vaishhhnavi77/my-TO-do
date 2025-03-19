// 🌟 Get elements
const form = document.querySelector(".todo-form");
const input = document.querySelector(".inputselect");
const todoList = document.querySelector(".todo-list");
const progressFill = document.querySelector("#progress-fill");
const clearCompletedBtn = document.querySelector(".clear-btn");
const toast = document.querySelector(".toast");
const emptyState = document.querySelector(".empty-state");

// 🌟 Load existing todos
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 🌟 Render Todos
function renderTodos() {
    todoList.innerHTML = "";
    if (todos.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }
    todos.forEach(todo => createTodoElement(todo));
    updateProgress();
}

// 🌟 Create Todo Element
function createTodoElement(todo) {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item");
    if (todo.completed) listItem.classList.add("done");
    listItem.setAttribute("data-id", todo.id);

    listItem.innerHTML = `
        <input type="checkbox" ${todo.completed ? "checked" : ""} onclick="toggleTodo(${todo.id})">
        <span>${todo.text}</span>
        <button class="delete-todo" onclick="deleteTodo(${todo.id})">
            🗑
        </button>
    `;

    todoList.appendChild(listItem);
}

// 🌟 Add New Todo
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text) {
        const newTodo = { id: Date.now(), text, completed: false };
        todos.push(newTodo);
        saveAndRender();
        showToast("✅ Todo Added!");
        input.value = "";
    }
});

// 🌟 Toggle Todo Completion
function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveAndRender();
    }
}

// 🌟 Delete Todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveAndRender();
    showToast("🗑 Todo Deleted!");
}

// 🌟 Clear Completed Todos
clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);
    saveAndRender();
    showToast("🧹 Cleared Completed Todos!");
});

// 🌟 Save to Local Storage & Render
function saveAndRender() {
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

// 🌟 Update Progress Bar
function updateProgress() {
    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;
    const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;
    progressFill.style.width = `${progress}%`;

    clearCompletedBtn.style.display = completedCount > 0 ? "block" : "none";
}

// 🌟 Show Toast Notification
function showToast(message) {
    toast.innerText = message;
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 2000);
}

// 🌟 Load Todos on Page Load
document.addEventListener("DOMContentLoaded", renderTodos);

// 🌙 Theme Toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
toggleSwitch.addEventListener("change", switchTheme);

function switchTheme(e) {
    document.documentElement.setAttribute("data-theme", e.target.checked ? "dark" : "light");
    localStorage.setItem("theme", e.target.checked ? "dark" : "light");
}

// 🌟 Apply saved theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    toggleSwitch.checked = currentTheme === "dark";
}
