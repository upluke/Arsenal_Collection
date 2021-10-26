// solution:
// document.addEventListener("DOMContentLoaded", function() {
//     let todoForm = document.getElementById("newTodoForm");
//     let todoList = document.getElementById("todoList");
  
//     todoForm.addEventListener("submit", function(event) {
//       event.preventDefault();
  
//       let removeButton = document.createElement("button");
//       removeButton.innerText = "X";
  
//       let newTodo = document.createElement("li");
//       newTodo.innerText = document.getElementById("task").value;
  
//       todoList.appendChild(newTodo);
//       newTodo.appendChild(removeButton);
  
//       todoForm.reset();
//     });
  
//     todoList.addEventListener("click", function(event) {
//       const targetTagToLowerCase = event.target.tagName.toLowerCase();
//       if (targetTagToLowerCase === "li") {
//         event.target.style.textDecoration = "line-through";
//       } else if (targetTagToLowerCase === "button") {
//         event.target.parentNode.remove();
//       }
//     });
//   });
  
//init:
const todoForm=document.querySelector('#add-todo')
const input=document.querySelector('#todo') 
const todoList=document.querySelector('#todo-list')
 
todoList.addEventListener('click', function(e){
    if(e.target.tagName==='BUTTON'){
        e.target.parentElement.remove()
    }else if(e.target.tagName==='LI'){
        console.log(e.target)
        e.target.classList.toggle('strike')
    }
    
})

todoForm.addEventListener('submit', function(e){
    e.preventDefault()
    const deleteButton=document.createElement('button')
    deleteButton.innerText="delete"
    const newTodo=document.createElement('li')
    newTodo.innerText=input.value
    newTodo.appendChild(deleteButton)
    todoList.appendChild(newTodo)
    input.value=''
})

