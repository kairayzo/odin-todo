import './style.css'
import Header from "./header"
import Sidebar, { loadProjects } from './sidebar'
import Content from './content'
import { loadContent } from './content'

// localStorage.removeItem('todoList')
if (localStorage.getItem('todoList')) {

} else {
    localStorage.setItem('todoList',JSON.stringify([{Upcoming:[]},{Today:[]}]))
}
const todoList = JSON.parse(localStorage.getItem('todoList'))
export default todoList

function saveTodo() {
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

const header = Header()
const sidebar = Sidebar()
const content = Content()

document.body.append(sidebar, header, content)

loadProjects()
loadContent()

export { saveTodo }