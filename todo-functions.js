// Fetching exisiting todos from localStorage
const getSavedTodos = function () {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

// Save the todos to localStorage
const saveTodos = function (todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove a todo from the list

const removeTodo = function (id) {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Render application todos based on filters
const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.completed;
  });

  const summary = generateSummaryDOM(incompleteTodos);
  document.querySelector("#todos").innerHTML = "";
  document.querySelector("#todos").appendChild(summary);

  filteredTodos.forEach(function (todo) {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

// Get the DOM elements for an individual todo
const generateTodoDOM = function (todo) {
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
  removeButton.addEventListener("click", function () {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
