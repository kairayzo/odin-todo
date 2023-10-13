import Todo from ".";
import todoList, { saveTodo } from "..";
import getProjectIdx from "../project/getProjectIdx";

export default function newTodo(projectName, title, desc='', dueDate='', priority='') {
    const newTodo = new Todo(title, desc, dueDate, priority)
    const projIdx = getProjectIdx(projectName)
    todoList[projIdx][projectName].push(newTodo)
    saveTodo()
}