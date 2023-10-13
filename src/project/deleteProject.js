import todoList, { saveTodo } from ".."
import getProjectIdx from "./getProjectIdx"

export default function deleteProject(projectName) {
    const projIdx = getProjectIdx(projectName)
    todoList.splice(projIdx,1)
    saveTodo()    
}
