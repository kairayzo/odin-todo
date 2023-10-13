import todoList from "..";
import getProjectIdx from "../project/getProjectIdx";

export default function getTodoLoc(projectName, todoId) {
    const projIdx = getProjectIdx(projectName)
    const projTodoList = todoList[projIdx][projectName]
    for (const idx in projTodoList) {
        if (projTodoList[idx].id == todoId) {
            return [projIdx, idx]
        }
    } 
    return false
}