window.onload = function() {
    renderTodos();
}

// Funzione per aggiungere un Todo
function addTodo(title, category) {
    const todos = loadTodos();

    const newTodo = {
        id: Date.now(),
        title: title,
        category: category,
        completed: false
    };

    todos.push(newTodo);
    saveTodos(todos)
    renderTodos();
}

// Funzione per eliminare un Todo
function deleteTodo(id) {
    let todos = loadTodos();
    todos = todos.filter(todo => todo.id !== id);
    saveTodos(todos)
    renderTodos();
}

// Funzione per segnare un Todo come completato/non completato
function toggleComplete(id) {
    const todos = loadTodos();
    
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        renderTodos();
    }
}

// Gestisce l'aggiunta di un Todo tramite l'interfaccia
function handleAddTodo() {
    const titleInput = document.getElementById('todoTitle');
    const categoryInput = document.getElementById('todoCategory');

    const title = titleInput.value.trim();
    const category = categoryInput.value.trim();

    if (title === '' || category === '') {
        alert('Please fill out both fields!');
        return;
    }

    addTodo(title, category);

    titleInput.value = '';
    categoryInput.value = '';
}

// Rende visibile la lista dei Todo (può accettare un array filtrato)
function renderTodos(filteredTodos = null) {
    const todos = filteredTodos || loadTodos();

    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; // Resetta il contenuto precedente

    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.className = `todo ${todo.completed ? 'completed' : ''}`;
        todoDiv.id = `todo-${todo.id}`;

        const todoText = document.createElement('span');
        todoText.textContent = `${todo.title} [${todo.category}]`;

        const completeButton = document.createElement('button');
        completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
        completeButton.setAttribute('onclick', `toggleComplete(${todo.id}); renderTodos()`);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('onclick', `deleteTodo(${todo.id}); renderTodos()`);

        todoDiv.appendChild(todoText);
        todoDiv.appendChild(completeButton);
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    });
}

function filterCompleteTodos() {
    const todos = loadTodos();
    const filteredTodos = todos.filter(todo => todo.completed); 
    renderTodos(filteredTodos);
}

function filterIncompleteTodos() {
    const todos = loadTodos();
    const filteredTodos = todos.filter(todo => !todo.completed);
    renderTodos(filteredTodos); 
}

function filterTodosByCategory() {
    const filterCategoryInput = document.getElementById('filterCategory');
    const filterCategory = filterCategoryInput.value.trim();

    if (filterCategory === '') {
        alert('Please enter a category!');
        return;
    }

    filterCategoryInput.value = '';

    const todos = loadTodos();
    const filteredTodos = todos.filter(todo => todo.category.toLowerCase() === filterCategory.toLowerCase());
    renderTodos(filteredTodos);
}

// Per salvare i todo in localStorage
function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
    //Oh no! un errore di categorie in localStorage!
}

// Per recuperare i todo da localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    return todos ? todos : [];
}

