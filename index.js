
  const mainTodoElem=document.querySelector(".Todo-list-element");
  const inputValue=document.getElementById("inputValue");

      const getTodoListFromLocal=()=>{
         return JSON.parse(localStorage.getItem("TodolistItem"));
       };

      // Save Todos to LocalStorage
      const addTodoListLocalStorage=(LocalTodoList)=>{
          return localStorage.setItem("TodolistItem",JSON.stringify(LocalTodoList));
      };

    let LocalTodoList=getTodoListFromLocal()||[];

      // Add a Dynamic Todo Element to the DOM
       const addTodoDynamicElement=(curEle)=>{
      const divElement=document.createElement('div');
      divElement.classList.add("main-todo-div");
      divElement.innerHTML=`<li class="taskName ">${curEle}</li> <button type="button" class="btn btn-danger py-3 fs-3 rounded">Delete</button>`;
      mainTodoElem.append(divElement);
       }

       const addTodoList=(e)=>{
         e.preventDefault();
      const TodoListValue=inputValue.value.trim();

// Check if value is not empty and not already in the list
if (TodoListValue !== "" && !LocalTodoList.includes(TodoListValue)) {
  LocalTodoList.push(TodoListValue);
  LocalTodoList = [...new Set(LocalTodoList)];
  localStorage.setItem("TodolistItem", JSON.stringify(LocalTodoList));

  addTodoDynamicElement(TodoListValue); 
  inputValue.value = "";
} else {
  alert("Todo cannot be empty or a duplicate!");

}
};
// Display All Todos on Page Load
  const showTodoList=()=>{
      console.log(LocalTodoList);
      LocalTodoList.forEach((curEle)=> {
        addTodoDynamicElement(curEle);
          
      });
  };
  showTodoList();

  const removeTodoElem=(e)=>{
      const todoToRemove=e.target;
      let TodoListContent=todoToRemove.previousElementSibling.innerText;
      let parentElem=todoToRemove.parentElement;
      console.log(TodoListContent);

      LocalTodoList = LocalTodoList.filter((curTodo)=>{
          console.log(curTodo);
          return curTodo !== TodoListContent;
      });

      addTodoListLocalStorage(LocalTodoList);
       parentElem.remove();

      console.log(LocalTodoList);
  };
   // Event Listener for Removing a Todo
  mainTodoElem.addEventListener('click',(e)=>{
      e.preventDefault();
      console.log(e.target);
      if(e.target.classList.contains("btn")){
      removeTodoElem(e);
      }
  });
  // Event Listener for Adding a New Todo
  document.querySelector(".btn").addEventListener('click',(e)=>{
      addTodoList(e);
      
  }); 