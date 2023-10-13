import todoList, { saveTodo } from ".."
import deleteTodo from "./deleteTodo"
import getTodoLoc from "./getTodoLoc"
import newTodo from "./newTodo"

export default function editTodo(newProject, oldProject, title, desc='', dueDate='', priority, id) {
    if (newProject == oldProject) {
        const todoLoc = getTodoLoc(newProject,id)
        if (todoLoc) {
            const todo = todoList[todoLoc[0]][newProject][todoLoc[1]]
            todo.title = title
            if (desc) {
                todo.desc = desc
            }
            if (dueDate) {
                todo.dueDate = dueDate
            }
            todo.priority = priority
            saveTodo()
        }
    } else {
        const todoLoc = getTodoLoc(oldProject,id)
        if (todoLoc) {
            deleteTodo(oldProject,id)
            newTodo(newProject,title,desc,dueDate,priority)
        }
    }
}