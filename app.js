let todos = [];

function addTodo(title, category) {
    const newTodo = {
        id: Date.now(),
        title: title,
        category: category,
        completed: false
    };
    todos.push(newTodo);
    console.log("Todo aggiunto:", newTodo);
    return newTodo;
}

function deleteTodo(id) {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        const deleted = todos.splice(index, 1)[0];
        console.log("Todo eliminato:", deleted);
        return deleted;
    } else {
        console.log("Todo con ID", id, "non trovato.");
        return null;
    }
}