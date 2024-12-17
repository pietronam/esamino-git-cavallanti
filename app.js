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