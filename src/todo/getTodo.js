import todoList from "..";
import getTodoLoc from "./getTodoLoc";

export default function getTodo(projectName,id) {
    const todoLoc = getTodoLoc(projectName, id)
    return todoList[todoLoc[0]][projectName][todoLoc[1]]
}