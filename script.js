   // Selectors
   const todoInput = document.getElementById("todo-input");
   const addBtn = document.getElementById("add-btn");
   const todoList = document.getElementById("todo-list");

   // Event Listeners
   addBtn.addEventListener("click", addTodo);

   // Add To-Do Function
   function addTodo() {
     const taskText = todoInput.value.trim();

     if (taskText === "") {
       alert("Please enter a task.");
       return;
     }

     // Create To-Do Item
     const listItem = document.createElement("li");
     listItem.className = "flex flex-col sm:flex-row justify-between items-center bg-gray-100 px-4 py-3 rounded-md shadow";

     const taskSpan = document.createElement("span");
     taskSpan.textContent = taskText;
     taskSpan.className = "task-text flex-1 mb-2 sm:mb-0";
     listItem.appendChild(taskSpan);

     // Button Container
     const buttonContainer = document.createElement("div");
     buttonContainer.className = "flex gap-2";

     // Edit Button
     const editBtn = document.createElement("button");
     editBtn.textContent = "Edit";
     editBtn.className = "text-blue-500 hover:underline edit-btn";
     editBtn.addEventListener("click", () => editTask(taskSpan, editBtn));
     buttonContainer.appendChild(editBtn);

     // Delete Button
     const deleteBtn = document.createElement("button");
     deleteBtn.textContent = "Delete";
     deleteBtn.className = "text-red-500 hover:underline delete-btn";
     deleteBtn.addEventListener("click", () => listItem.remove());
     buttonContainer.appendChild(deleteBtn);

     listItem.appendChild(buttonContainer);

     // Append To List
     todoList.appendChild(listItem);

     // Clear Input Field
     todoInput.value = "";
   }

   // Edit Task Function
   function editTask(taskSpan, editBtn) {
     if (editBtn.textContent === "Edit") {
       // Replace task text with input field
       const inputField = document.createElement("input");
       inputField.type = "text";
       inputField.value = taskSpan.textContent;
       inputField.className = "border rounded-md px-2 py-1 w-full focus:outline-none focus:ring focus:ring-blue-300";
       taskSpan.replaceWith(inputField);
       editBtn.textContent = "Save";

       // Save task when pressing Enter
       inputField.addEventListener("keydown", (e) => {
         if (e.key === "Enter") saveTask(inputField, editBtn);
       });
     } else {
       // Save the updated task
       const inputField = editBtn.previousSibling;
       saveTask(inputField, editBtn);
     }
   }

   // Save Task Function
   function saveTask(inputField, editBtn) {
     const updatedTask = inputField.value.trim();

     if (updatedTask === "") {
       alert("Task cannot be empty.");
       return;
     }

     const taskSpan = document.createElement("span");
     taskSpan.textContent = updatedTask;
     taskSpan.className = "task-text flex-1";
     inputField.replaceWith(taskSpan);
     editBtn.textContent = "Edit";
   }