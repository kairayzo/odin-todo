import { generateElement } from "./helper"
import listProjects from "./project/listProjects"
import {red, orange, blue, green} from './theme.js'
import { clearSelected } from "./helper"
import editTodo from "./todo/editTodo"
import newTodo from "./todo/newTodo"
import { loadContent } from "./content"
import deleteTodo from "./todo/deleteTodo"

export default function Form(project,title='',desc='',dueDate='',priority='4',id='') {

    function setPriorityColor(priority) {
        const formPriorityLabel1 = document.querySelector('#form-priority-container-1 .form-priority-label')
        const formPriorityLabel2 = document.querySelector('#form-priority-container-2 .form-priority-label')
        const formPriorityLabel3 = document.querySelector('#form-priority-container-3 .form-priority-label')
        const formPriorityLabel4 = document.querySelector('#form-priority-container-4 .form-priority-label')
        const labels = [formPriorityLabel1,formPriorityLabel2,formPriorityLabel3,formPriorityLabel4]
        
        if (formPriorityLabel1 && formPriorityLabel2 && formPriorityLabel3 && formPriorityLabel4) {
            clearSelected(labels)
            switch (priority) {
                case '1':
                    formPriorityLabel1.classList.add('selected')
                    break
                case '2':
                    formPriorityLabel2.classList.add('selected')
                    break
                case '3':
                    formPriorityLabel3.classList.add('selected')
                    break
                case '4':
                    formPriorityLabel4.classList.add('selected')
                    break
            }
        }
    }

    function submitTodoForm(e, id='') {
        const keyPressed = e.key
        if (keyPressed && keyPressed == 'Enter' || !keyPressed && e.target) {
            e.preventDefault()
            const form  = document.querySelector('#form')
            const title =form['form-title'].value
            const newProject = form['form-project'].value
            const desc = form['form-desc'].value
            const dueDate = form['form-duedate'].value
            const priority = form['form-priority'].value
            if (id) {
                editTodo(newProject,project,title,desc,dueDate,priority,id)
            } else {
                newTodo(newProject,title,desc,dueDate,priority)
            }
            closeTodoForm(e)
        }
    }

    function removeTodo(e,project,id='') {
        if (id) {
            deleteTodo(project,id)
        }
        closeTodoForm(e)
    }

    const form = generateElement('form','','form')

    const formTitleContainer = generateElement('div','','form-title-container')
    const formTitle = generateElement('input','text','form-title','Task')
    formTitle.required = true
    if (title) {
        formTitle.value = title
    }
    const formCloseBtn = generateElement('div','','form-close-btn')
    formCloseBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    formCloseBtn.addEventListener('click',(e)=>closeTodoForm(e))
    formTitleContainer.append(formTitle, formCloseBtn)

    const formDescContainer = generateElement('div','','form-desc-container')
    const formDesc = generateElement('textarea','','form-desc')
    formDesc.placeholder = 'Description'
    formDesc.style.resize = 'none'
    formDesc.rows = '5'
    if (desc) {
        formDesc.value = desc
    }
    formDescContainer.append(formDesc)

    const formProjectContainer = generateElement('div','','form-project-container')
    const formProjectText = generateElement('div','','form-project-text','Add to: ')
    const formProject = generateElement('select','','form-project','form-project')
    const projList = listProjects()
    for (const idx in projList) {
        const formProjectOption = generateElement('option','','',projList[idx])
        if (projList[idx] == project) {
            formProjectOption.selected = 'selected'
        }
        formProject.append(formProjectOption)
    }
    formProjectContainer.append(formProjectText,formProject)
    

    const formDuedateContainer = generateElement('div','','form-duedate-container')
    const formDuedateText = generateElement('div','','form-duedate-text','Due date: ')
    const formDuedate = generateElement('input','date','form-duedate')
    if (dueDate) {
        formDuedate.value = dueDate
    }
    formDuedateContainer.append(formDuedateText, formDuedate)

    const formPriorityContainer = generateElement('div','','form-priority-container')
    const formPriorityText = generateElement('div','','form-priority-text','Priority: ')
    const formPriorityContainer1 = generateElement('div','','form-priority-container-1')
    const formPriority1 = generateElement('input','radio','form-priority-1','form-priority')
    const formPriorityLabel1 = generateElement('label','form-priority-label','form-priority-1')
    formPriorityLabel1.innerHTML = `<i class="fa-solid fa-flag" style="color: ${red}"></i>`
    formPriorityLabel1.addEventListener('click',()=>setPriorityColor('1'))
    formPriorityContainer1.append(formPriorityLabel1,formPriority1)

    const formPriorityContainer2 = generateElement('div','','form-priority-container-2')
    const formPriority2 = generateElement('input','radio','form-priority-2','form-priority')
    const formPriorityLabel2 = generateElement('label','form-priority-label','form-priority-2')
    formPriorityLabel2.innerHTML = `<i class="fa-solid fa-flag" style="color: ${orange}"></i>`
    formPriorityLabel2.addEventListener('click',()=>setPriorityColor('2'))
    formPriorityContainer2.append(formPriorityLabel2,formPriority2)

    const formPriorityContainer3 = generateElement('div','','form-priority-container-3')
    const formPriority3 = generateElement('input','radio','form-priority-3','form-priority')
    const formPriorityLabel3 = generateElement('label','form-priority-label','form-priority-3')
    formPriorityLabel3.innerHTML = `<i class="fa-solid fa-flag" style="color: ${blue}"></i>`
    formPriorityLabel3.addEventListener('click',()=>setPriorityColor('3'))
    formPriorityContainer3.append(formPriorityLabel3,formPriority3)

    const formPriorityContainer4 = generateElement('div','','form-priority-container-4')
    const formPriority4 = generateElement('input','radio','form-priority-4','form-priority')
    const formPriorityLabel4 = generateElement('label','form-priority-label','form-priority-4')
    formPriorityLabel4.innerHTML = `<i class="fa-solid fa-flag" style="color: ${green}"></i>`
    formPriorityLabel4.addEventListener('click',()=>setPriorityColor('4'))
    formPriorityContainer4.append(formPriorityLabel4,formPriority4)
    
    formPriorityContainer.append(formPriorityText,formPriorityContainer1,formPriorityContainer2,formPriorityContainer3,formPriorityContainer4)
    
    switch (priority) {
        case '1':
            formPriority1.checked = true
            formPriorityLabel1.classList.add('selected')
            break
        case '2':
            formPriority2.checked = true
            formPriorityLabel2.classList.add('selected')
            break
        case '3':
            formPriority3.checked = true
            formPriorityLabel3.classList.add('selected')
            break
        case '4':
            formPriority4.checked = true
            formPriorityLabel4.classList.add('selected')
            break
    }
    
    const formDeleteBtn = generateElement('button','','form-delete-btn','Delete Task')
    const formSaveBtn = generateElement('button','','form-save-btn','Save Changes')
    formDeleteBtn.addEventListener('click',(e)=>removeTodo(e,project,id))
    formSaveBtn.type = 'submit'
    form.addEventListener('submit',(e)=>submitTodoForm(e,id))

    const formActionsContainer = generateElement('div','','form-actions-container')
    formActionsContainer.append(formDeleteBtn,formSaveBtn)
    
    form.append(formTitleContainer,formDescContainer,formProjectContainer,formDuedateContainer,formPriorityContainer,formActionsContainer)

    return form
}

function closeTodoForm(e) {
    if (e.target) {
        e.preventDefault()
        const contentElem = document.querySelector('#content')
        const form = document.querySelector('#form')
        const projectAddTodoBtn = document.querySelector('.project-add-todo-btn')
        const projectName = projectAddTodoBtn.id
        form.remove()
        projectAddTodoBtn.style.display = 'flex'
        contentElem.classList.remove('with-form')
        loadContent(projectName)
    }
}

function reloadProjectOptions() {
    const formProject = document.querySelector('#form-project')
    if (formProject) {
        formProject.innerHTML = ''
        const projList = listProjects()
        for (const idx in projList) {
            const formProjectOption = generateElement('option','','',projList[idx])
            formProject.append(formProjectOption)
        }
    }
}

export { closeTodoForm, reloadProjectOptions }