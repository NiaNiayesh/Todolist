"use strict";

const input = document.querySelector(".yourInput");
const newInput = document.querySelector(".newInput");
const addBtn = document.querySelector(".addBtn");
const saveBtn = document.querySelector(".saveBtn");
const todosList = document.querySelector(".todos-list");
const deleteAll = document.querySelector(".deleteAll");
const modal = document.querySelector(".modal");

let todosArray = [];
let currentEditId = null;

//Add todos
function addNewTodo(input) {
  let todo = {
    id: todosArray.length + 1,
    text: input.value,
  };
  todosArray.push(todo);
}
addBtn.addEventListener("click", () => {
  if (input.value === "") {
    alert("Please enter your todo");
  } else {
    addNewTodo(input);
    showTodos();
    input.value = "";
    console.log(todosArray);
  }
});

//Show todos
function showTodos() {
  todosList.innerHTML = "";
  todosArray.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todos-item");

    const text = document.createElement("input");
    text.classList.add("textInput");
    text.value = todo.text;
    li.append(text);

    const div = document.createElement("div");
    div.classList.add("icons");
    li.append(div);

    const editButton = document.createElement("button");
    editButton.innerHTML =
      '<span class="material-symbols-outlined edit">edit</span>';
    editButton.addEventListener("click", () => editTodo(todo.id));
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML =
      '<span class="material-symbols-outlined delete">delete</span>';
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    div.append(editButton);
    div.append(deleteButton);

    todosList.append(li);
  });
}

// Keypress to addTodo
window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (input.value === "") {
      alert("Please enter your todo");
    } else {
      addNewTodo(input);
      showTodos();
      input.value = "";
      console.log(todosArray);
    }
  }
});

//Delete todo
//When use remove method to delete todo
// Array.prototype.remove = function (index) {
//   if (index >= 0 && index < this.length) {
//     this.splice(index, 1);
//   }
// };
function deleteTodo(id) {
  todosArray = todosArray.filter((todo) => todo.id !== id);
  showTodos();

  // const index = todosArray.findIndex((todo) => todo.id === id);
  // if (index !== -1) {
  //   todosArray.remove(index);
  //   showTodos();
  // }
}

//Edit todo
function editTodo(id) {

  //Get newTitle with prompt
  //   let todo = todosArray.find(todo => todo.id === id)
  //   const newTodoText = prompt('Enter the new todo text:')
  //   if(newTodoText === ''){
  //     alert('Please enter your todo')
  //     editTodo(id)

  //   }
  //   else if (newTodoText === null) {
  //     return
  //   }
  //   else{
  //     todo.text = newTodoText
  //     showTodos()
  // }

  ///////////////////////////////////

  const todo = todosArray.find((todo) => todo.id === id);
  if (todo) {
    modal.style.display = "block";
    newInput.focus()
    newInput.value = todo.text;
    currentEditId = id;
  }

  saveBtn.addEventListener("click", () => {
    const todo = todosArray.find((todo) => todo.id === currentEditId);
    if (todo) {
      todo.text = newInput.value;
      showTodos();
      modal.style.display = "none";
      newInput.value = "";
      currentEditId = null;
    }
  });
}

//Delete all todo
deleteAll.addEventListener("click", () => {
  if (todosArray.length > 0) {
    todosArray = [];
    showTodos();
  } else {
    alert("No to todos to delete");
  }
});
