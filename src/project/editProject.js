import todoList, { saveTodo } from ".."
import getProjectIdx from "./getProjectIdx"
import listProjects from "./listProjects"

export default function editProject(oldProject, newProject) {
    if (oldProject == newProject) {
        return
    } else if (listProjects().includes(newProject)) {
        return false
    } else {
        const oldProjectIdx = getProjectIdx(oldProject)
        const newProjectObj = {}
        newProjectObj[newProject] = todoList[oldProjectIdx][oldProject]
        todoList[oldProjectIdx] = newProjectObj
        saveTodo()
        return true
    }
    
}