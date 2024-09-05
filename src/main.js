import "../style.css";

// get necessary DOM elements
const todoListElement = document.getElementById("todo-list");
const inputNewTodo = document.getElementById("new-todo");
const todoNav = document.getElementById("todo-nav");

// adding tasks, defining id property as unique identifier
const todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
  { id: 3, text: "Buy jam", completed: true },
];

let nextTodoId = 4;

let filter = "all"; // starting with "all" -- other options are completed and active

// function to render the todos based on the current filter
function renderTodos() {
  // start with clean slate each time rendering todos
  todoListElement.innerHTML = "";

  // filter todos based on the current filter setting
  let filteredTodos = [];
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (filter === "all") {
      filteredTodos.push(todo);
    } else if (filter === "completed" && todo.completed === true) {
      filteredTodos.push(todo);
    } else if (filter === "active" && todo.completed === false) {
      filteredTodos.push(todo);
    }
  }

  // look through todos and create a new div element for each todo
  for (let i = 0; i < filteredTodos.length; i++) {
    const todo = filteredTodos[i];

    const todoItem = document.createElement("div");
    todoItem.classList.add("p-4", "todo-item");

    const todoText = document.createElement("div");
    todoText.id = `todo-text-${todo.id}`;
    todoText.classList.add("todo-text");
    if (todo.completed) {
      todoText.classList.add("line-through");
    }
    todoText.innerText = todo.text;
    todoItem.appendChild(todoText);

    const todoEdit = document.createElement("input");
    todoEdit.classList.add("hidden", "todo-edit");
    todoEdit.value = todo.text;
    todoItem.appendChild(todoEdit);

    todoListElement.appendChild(todoItem);
  }
}

// function to handle adding a new todo
function handleKeyDownToCreateNewTodo(event) { // event object passed by browser when event listener triggers
  const newTodoInput = event.target;
  const todoText = newTodoInput.value.trim(); // don't add todos that are just empty spaces
  // listens for keydown event on the input field
  if (event.key === "Enter" && todoText !== "") { // only adds new todo when user entered some text and pressed enter key
    todos.push({ id: nextTodoId++, text: todoText, completed: false }); // adding new todo
    newTodoInput.value = ""; // clear the input
    renderTodos();
  }
}

// function to handle marking a todo as completed
function handleClickOnNavbar(event) {
  // if the clicked element is an anchor tag <a>
  if (event.target.tagName === "A") {
    const hrefValue = event.target.href; // extracting filter action
    const action = hrefValue.split("/").pop();
    filter = action === "" ? "all" : action;

    // render the app UI
    renderTodoNavBar(hrefValue);
    renderTodos();
  }
}

// function to update the navbar anchor elements
function renderTodoNavBar(href) {
  const elements = todoNav.children;
  for (let i = 0; i < elements.length; i++) { // applies underline style based on href value
    const element = elements[i];
    if (element.href === href) {
      element.classList.add(
        "underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
      );
    } else {
      element.classList.remove(
        "underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
      );
    }
  }
}

// function to toggle the completed status of a todo
function handleClickOnTodoList(event) {
  let todo = null;
  if (event.target.id !== null && event.target.id.includes("todo-text")) {
    todo = event.target;
  } // identifying the clicked todo

  let todoIdNumber = -1;
  if (todo) {
    const todoId = event.target.id.split("-").pop();
    todoIdNumber = Number(todoId);
  } // extracting the todo id

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoIdNumber) {
      todos[i].completed = !todos[i].completed;
    }
  } // toggling completed status

  // re-rendering the app UI
  renderTodos();
}

// event listeners
todoListElement.addEventListener("click", handleClickOnTodoList);
inputNewTodo.addEventListener("keydown", handleKeyDownToCreateNewTodo);
todoNav.addEventListener("click", handleClickOnNavbar);
document.addEventListener("DOMContentLoaded", renderTodos); // event listener to initialize app after the DOM content is fully loaded