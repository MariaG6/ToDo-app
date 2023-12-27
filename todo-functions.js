'use strict';

// Fetching exisiting todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save the todos to localStorage
const saveTodos = (todos) =>
  localStorage.setItem("todos", JSON.stringify(todos));

// Remove a todo from the list
const removeTodo = function (id) {
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle the completed value for a given todo
const toggleTodo = function (id) {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }
};

// Render application todos based on filters
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter((todo) => {
    return !todo.completed;
  });

  const summary = generateSummaryDOM(incompleteTodos);
  document.querySelector("#todos").innerHTML = "";
  document.querySelector("#todos").appendChild(summary);

  filteredTodos.forEach((todo) =>
    document.querySelector("#todos").appendChild(generateTodoDOM(todo))
  );
};

// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("div");
  const boxEl = document.createElement("input");
  const textEl = document.createElement("span");
  const removeButton = document.createElement("button");

  // Setup todo checkbox
  boxEl.setAttribute("type", "checkbox");
  todoEl.appendChild(boxEl);

  // Setup todo title
  textEl.textContent = todo.text;
  todoEl.appendChild(textEl);

  // Setup todo button
  removeButton.textContent = "Delete";
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
