import todoList from "..";
import getTodo from "./getTodo";

export default function rearrangeTodo(projectName,todoId, oldLoc,newLoc) {
    const todoObj = getTodo(projectName,todoId)
    todoList[newLoc[0]][projectName].splice(oldLoc[1],1)
    todoList[newLoc[0]][projectName].splice(newLoc[1],0,todoObj)
}