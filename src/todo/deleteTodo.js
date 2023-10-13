import todoList from "..";
import getTodoLoc from "./getTodoLoc";
import { saveTodo } from "..";

export default function deleteTodo(projectName, id) {
    const todoLoc = getTodoLoc(projectName,id)
    todoList[todoLoc[0]][projectName].splice(todoLoc[1],1)
    saveTodo()
}