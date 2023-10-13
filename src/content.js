import {generateElement, formatDate} from "./helper";
import todoList from './index'
import {red, orange, blue, green} from './theme.js'
import newTodo from "./todo/newTodo";
import editTodo from "./todo/editTodo";
import deleteTodo from "./todo/deleteTodo";
import getTodo from "./todo/getTodo";
import getProjectIdx from "./project/getProjectIdx";
import Form from "./form";
import { createSegment, selectProject } from "./sidebar";
import { closeTodoForm } from "./form";
import getTodoLoc from "./todo/getTodoLoc";
import listTodos from "./todo/listTodos";
import rearrangeTodo from "./todo/rearrangeTodo";

export default function Content() {
    const content = generateElement('div','','content')
    
    return content
}

function loadContent(project='') {

    const contentElem = document.querySelector('#content')
    contentElem.innerHTML = ''
    let projectIdx
    if (project) {
        projectIdx = getProjectIdx(project)
    } else {
        const selectedProject = document.querySelector('#sidebar-projects').querySelector('.selected')
        if (selectedProject) {
            projectIdx = getProjectIdx(selectedProject.id)
        } else {
            projectIdx = 0
        }
    }
    const projectObj = todoList[projectIdx]
    const projectName = Object.keys(projectObj)[0]
    const projectTodos = projectObj[projectName] 
    const projectElem = createProject(projectName)
    for (const todoIdx in projectTodos) {
        const todoSegment = createSegment()
        const todoItem = projectTodos[todoIdx]
        const todoElem = createTodo(todoItem.title,todoItem.desc,formatDate(todoItem.dueDate),todoItem.priority, todoItem.id)
        projectElem.querySelector('.project-todo-container').append(todoSegment,todoElem)
    }
    const todoSegment = createSegment()
    projectElem.querySelector('.project-todo-container').append(todoSegment)
    contentElem.append(projectElem)
    selectProject(projectName)
}

function createTodo(title, desc='', dueDate='', priority='4', id) {    
    const todoContainer = generateElement('div','todo-container',id)
    const controller = new AbortController();
    todoContainer.addEventListener('click',(e)=>showTodoEditForm(e,controller),{signal: controller.signal})
    const todoTitleContainer = generateElement('div','todo-title-container')
    const todoCheckbox = generateElement('button','todo-checkbox')
    todoCheckbox.addEventListener('click', (e) => completeTodo(e))
    const todoTitle = generateElement('div','todo-title','',title)
    const todoInfoContainer = generateElement('div','todo-info-container')
    
    if (dueDate) {
        const todoDuedate = generateElement('div','todo-duedate','','📅 '+dueDate)
        todoInfoContainer.append(todoDuedate)
    }

    const todoPriorityContainer = generateElement('div','todo-priority-container')
    const todoPriorityIcon = generateElement('div','todo-priority-icon')
    todoPriorityIcon.innerHTML = '<i class="fa-solid fa-flag"></i>'
    todoPriorityIcon.style.color = setPriorityColor(priority)
    todoCheckbox.style.borderColor = setPriorityColor(priority)
    const todoPriority =  generateElement('div', 'todo-priority','',priority)
    todoPriorityContainer.append(todoPriorityIcon, todoPriority)
    todoInfoContainer.append(todoPriorityContainer)

    todoTitleContainer.append(todoCheckbox,todoTitle,todoInfoContainer)

    if (desc) {
        const todoDesc = generateElement('div','todo-desc','',desc)
        todoContainer.append(todoTitleContainer,todoDesc)
    } else {
        todoContainer.append(todoTitleContainer)
    }

    todoContainer.draggable = true
    todoContainer.addEventListener('dragstart',(e)=>handleTodoDrag(e))
    todoContainer.addEventListener('dragover',(e)=>e.preventDefault())
    todoContainer.addEventListener('dragend',(e)=>handleTodoDrop(e))

    return todoContainer
}



function createProject(title) {
    const projectContainer = generateElement('div','project-container',title)
    const projectTitleContainer = generateElement('div','project-title-container')
    const projectTitle = generateElement('div','project-title','',title)
    const projectTodoContainer = generateElement('div','project-todo-container')
    const projectAddTodoBtn = generateElement('div','project-add-todo-btn',title)
    const projectAddTodoIcon = generateElement('div','project-add-todo-icon')
    projectAddTodoIcon.innerHTML = '<i class="fa-solid fa-plus"></i>'
    const projectAddTodoText = generateElement('div','project-add-todo-text','','Add New Task')
    
    projectAddTodoBtn.append(projectAddTodoIcon,projectAddTodoText)
    projectAddTodoBtn.addEventListener('click',(e) => showTodoForm(e))

    projectTitleContainer.append(projectTitle)
    projectContainer.append(projectTitleContainer,projectTodoContainer,projectAddTodoBtn)

    return projectContainer
}

function handleTodoDrag(e) {
    if (e.target) {
        const todoElem = e.target.closest('.todo-container')
        todoElem.classList.add('dragging')
    }
}

function handleTodoDrop(e) {
    const segmentElem = document.querySelector('.hovering')
    if (e.target && segmentElem) {
        const todoDraggingElem = e.target.closest('.todo-container')
        const todoId = todoDraggingElem.id
        const projectName = todoDraggingElem.closest('.project-container').id
        const oldLoc = getTodoLoc(projectName,todoId)
        const todoDroppingElem = segmentElem.nextSibling
        let newLoc
        if (todoDroppingElem) {
            const todoDroppingLoc = getTodoLoc(projectName,todoDroppingElem)
            if (oldLoc[1] < todoDroppingLoc[1]) {
                newLoc = [oldLoc[0],todoDroppingLoc[1]-1]
            } else {
                newLoc = [oldLoc[0],todoDroppingLoc[1]]
            }
        } else {
            newLoc = [oldLoc[0], listTodos(projectName).length]
        }
        rearrangeTodo(projectName, todoId, oldLoc, newLoc)
        todoDraggingElem.classList.remove('dragging')
        loadContent()
    }
}

function showTodoForm(e) {
    if (e.target) {
        const contentElem = document.querySelector('#content')
        const projectElem = e.target.closest('.project-container')
        const projectTitle = projectElem.id
        const projectAddTodoBtn = e.target.closest('.project-add-todo-btn')
        const form = Form(projectTitle)
        contentElem.append(form)
        contentElem.classList.add('with-form')
        const formTitle = document.querySelector('#form-title')
        formTitle.focus()
        projectAddTodoBtn.style.display = 'none'
    }
}

function showTodoEditForm(e,controller) {
    if (e.target) {
        if (e.target.classList == 'todo-checkbox') {
            controller.abort()
        } else {
            if (document.querySelector('#form')) {
                closeTodoForm(e)
            }
            const bodyElem = document.body
            const projectAddTodoBtn = document.querySelector('.project-add-todo-btn')
            const projectName = e.target.closest('.project-container').id
            const todoElem = e.target.closest('.todo-container')
            const todoId = todoElem.id
            const todo = getTodo(projectName, todoId)
            if (todo) {
                const editForm = Form(projectName,todo.title,todo.desc,todo.dueDate,todo.priority,todo.id)
                bodyElem.append(editForm)
                bodyElem.style.gridTemplateColumns = '16rem 1fr 24rem'
                bodyElem.style.gridTemplateAreas = '"sidebar header form" "sidebar content form"'

                const formTitle = document.querySelector('#form-title')
                formTitle.focus()
                projectAddTodoBtn.style.display = 'none'
            }
        }
    }
}

function submitTodoForm(e, id='') {
    const keyPressed = e.key
    if (keyPressed && keyPressed == 'Enter' || !keyPressed && e.target) {
        e.preventDefault()
        const form  = document.querySelector('#todo-form')
        const title =form['todo-form-title'].value
        const desc = form['todo-form-desc'].value
        const dueDate = form['todo-form-duedate'].value
        const priority = form['todo-form-priority'].value
        const projectTitle = form.closest('.project-container').id
        if (id) {
            editTodo(projectTitle,title,desc,dueDate,priority,id)
        } else {
            newTodo(projectTitle,title,desc,dueDate,priority)
        }
        loadContent()
    }
}

function setPriorityColor(priority) {
    switch (priority) {
        case '1':
            return red
        case '2':
            return orange
        case '3':
            return blue
        case '4':
            return green
    }
}

function completeTodo(e) {
    if (e.target) {
        const todoElem = e.target.closest('.todo-container')
        const id = todoElem.id
        const projectName = e.target.closest('.project-container').id
        deleteTodo(projectName, id)
        loadContent()
    }
}

export {loadContent, createTodo, createProject}