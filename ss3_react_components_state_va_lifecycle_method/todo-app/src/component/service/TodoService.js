const listTodo = [{id: 1, item: "Học Java"}, {id: 2, item: "Thực hành C++"},
    {id: 3, item: "Thực hành Spring Boot"}];

export function getAllTodo(){
    return listTodo;
}

export function addTodo(todo){
    listTodo.push(todo);
}
