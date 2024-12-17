// Array per memorizzare i Todo
let todos = [];

// Funzione per aggiungere un Todo
function addTodo(title, category) {
    const newTodo = {
        id: Date.now(),
        title: title,
        category: category,
        completed: false
    };
    todos.push(newTodo);
    renderTodos();
}

// Funzione per eliminare un Todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Funzione per segnare un Todo come completato/non completato
function toggleComplete(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
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

// Rende visibile la lista dei Todo
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.className = `todo ${todo.completed ? 'completed' : ''}`;
        todoDiv.id = `todo-${todo.id}`;

        const todoText = document.createElement('span');
        todoText.textContent = `${todo.title} [${todo.category}]`;

        const completeButton = document.createElement('button');
        completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
        completeButton.onclick = () => toggleComplete(todo.id);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(todo.id);

        todoDiv.appendChild(todoText);
        todoDiv.appendChild(completeButton);
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    });
}
