import todoList, { saveTodo } from ".."
import listProjects from "./listProjects"

export default function newProject(projectTitle) {
    const projList = listProjects()
    if (projList.includes(projectTitle)) {
        return false
    } else {
        const projectObj = {}
        projectObj[projectTitle] = [] 
        todoList.push(projectObj)
        saveTodo()
        return true
    }
}