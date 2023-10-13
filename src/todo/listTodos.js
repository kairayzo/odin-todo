import todoList from "..";
import getProjectIdx from "../project/getProjectIdx";

export default function listTodos(projectName) {
    const projIdx = getProjectIdx(projectName)
    const projTodoList = todoList[projIdx][projectName]
    const arr = []
    for (const idx in projTodoList) {
        arr.push(projTodoList[idx].title)
    } 
    return arr
}