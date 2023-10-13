import {generateElement, clearSelected} from "./helper";
import todoList from ".";
import { createProject, loadContent } from "./content";
import newProject from "./project/newProject";
import editProject from "./project/editProject";
import deleteProject from "./project/deleteProject";
import { reloadProjectOptions } from "./form";
import getProjectIdx from "./project/getProjectIdx";
import rearrangeProject from "./project/rearrangeProject";
import listProjects from "./project/listProjects";


export default function Sidebar() {
    const sidebar = generateElement('div','','sidebar')
    // const userContainer = generateElement('div','','user-container')
    // const userIcon = generateElement('img','user-icon','../dist/images/logo.png','User Profile Icon')
    // const userName = generateElement('div','','user-name','kairayzo')
    const sidebarTitleContainer = generateElement('div','','sidebar-title-container')
    const sidebarTitle = generateElement('div','','sidebar-title','Projects')
    const hideSidebarBtn = generateElement('div','','hide-sidebar-btn')
    hideSidebarBtn.innerHTML = '<i class="fa-solid fa-bars"></i>'
    hideSidebarBtn.addEventListener('click',(e)=>hideSidebar(e))
    sidebarTitleContainer.append(sidebarTitle,hideSidebarBtn)

    const sidebarAddProjectBtn = generateElement('div','','sidebar-add-project-btn')
    const sidebarAddProjectIcon = generateElement('div','','sidebar-add-project-icon')
    sidebarAddProjectIcon.innerHTML = '<i class="fa-solid fa-plus"></i>'
    const sidebarProjectAddText = generateElement('div','','sidebar-project-add-text','Add New Project')
    sidebarAddProjectBtn.append(sidebarAddProjectIcon,sidebarProjectAddText)
    // const sidebarProjectsHideBtn = generateElement('div','','sidebar-projects-hide-btn')
    // sidebarProjectsHideBtn.innerHTML = '<i class="fa-solid fa-angles-left"></i>'
    
    const sidebarProjects = generateElement('div','','sidebar-projects')
    
    sidebarAddProjectBtn.addEventListener('click',(e) => showProjectForm(e))
    // userContainer.append(userIcon,userName,hideBtn)
    sidebarTitleContainer.append(sidebarTitle)
    sidebar.append(sidebarTitleContainer,sidebarProjects, sidebarAddProjectBtn)

    return sidebar
}

function hideSidebar(e) {
    if (e.target) {
        const sidebar = document.querySelector('#sidebar')
        const hideSidebarBtn = document.querySelector('#hide-sidebar-btn')
        const showSidebarBtn = document.querySelector('#show-sidebar-btn')
        sidebar.style.display = 'none'
        hideSidebarBtn.style.display = 'none'
        document.body.style = 'grid-template-areas:"header" "content";grid-template-columns: 1fr'
        showSidebarBtn.style.display = 'flex'
    }
}

function loadProjects() {
    const sidebarProjects = document.querySelector('#sidebar-projects')
    sidebarProjects.innerHTML = ''
    for (const projIdx in todoList) {
        const project = todoList[projIdx]
        const projectName = Object.keys(project)[0]
        const sidebarSegment = createSegment()
        const sidebarProject = createSidebarProject(projectName)
        sidebarProjects.append(sidebarSegment,sidebarProject)
    }
    const sidebarSegment = createSegment()
    sidebarProjects.append(sidebarSegment)
    reloadProjectOptions()
}

function createSidebarProject(project) {
    const sidebarProject = generateElement('div','sidebar-project',project)
    const sidebarProjectName = generateElement('div','sidebar-project-name','', project)
    sidebarProject.append(sidebarProjectName)

    if (!['Upcoming','Today'].includes(project)) {
        const sidebarEditBtn = generateElement('div','sidebar-edit-btn')
        sidebarEditBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
        const sidebarDeleteBtn = generateElement('div','sidebar-delete-btn')
        sidebarDeleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
        sidebarEditBtn.addEventListener('click',(e)=>showProjectEditForm(e))
        sidebarDeleteBtn.addEventListener('click',(e)=>removeProject(e))
    
        sidebarProject.append(sidebarEditBtn,sidebarDeleteBtn)
    }
    sidebarProject.draggable = true
    const controller = new AbortController();
    sidebarProject.addEventListener('click',(e)=>handleProjectSelect(e,controller),{signal: controller.signal})
    sidebarProject.addEventListener('dragstart',(e)=>handleProjectDrag(e))
    sidebarProject.addEventListener('dragover',(e)=>e.preventDefault())
    sidebarProject.addEventListener('dragend',(e)=>handleProjectDrop(e))
    return sidebarProject
}

function createSegment() {
    const segment = generateElement('div','segment')
    segment.addEventListener('dragover',(e)=>handleSegmentDragover(e))
    segment.addEventListener('dragleave',(e)=>handleSegmentDragleave(e))
    return segment
}

function projectForm(projectTitle='') {

    const projectFormElem = generateElement('form','','project-form')
    if (projectTitle) {
        const projectFormTitle = generateElement('input','text','project-form-title')
        projectFormTitle.defaultValue = projectTitle
        const projectFormAddBtn = generateElement('div','','project-form-add-btn')
        projectFormAddBtn.innerHTML = '<i class="fa-solid fa-check fa-xl"></i>'
        const projectFormCloseBtn = generateElement('div','','project-form-close-btn')
        projectFormCloseBtn.innerHTML = '<i class="fa-solid fa-x fa-lg"></i>'

        projectFormCloseBtn.addEventListener('click',(e)=>closeProjectEditForm(e))
        projectFormAddBtn.addEventListener('click', (e) => editProjectElem(e, projectTitle))
        projectFormElem.addEventListener('submit',(e)=>editProjectElem(e, projectTitle))
        projectFormElem.addEventListener('keydown',(e)=>editProjectElem(e, projectTitle))
        projectFormElem.append(projectFormTitle,projectFormCloseBtn,projectFormAddBtn)
    } else {
        const projectFormTitle = generateElement('input','text','project-form-title','Project Name')
        const projectFormCloseBtn = generateElement('div','','project-form-close-btn')
        projectFormCloseBtn.innerHTML = '<i class="fa-solid fa-x fa-lg"></i>'
        const projectFormAddBtn = generateElement('div','','project-form-add-btn')
        projectFormAddBtn.innerHTML = '<i class="fa-solid fa-circle-plus fa-lg"></i>'
        
        projectFormCloseBtn.addEventListener('click',(e)=>closeProjectForm(e))
        projectFormAddBtn.addEventListener('click', (e) => addProject(e))
        projectFormElem.addEventListener('submit',(e)=>addProject(e))
        projectFormElem.addEventListener('keydown',(e)=>addProject(e))
        projectFormElem.append(projectFormTitle,projectFormCloseBtn,projectFormAddBtn)
    }


    return projectFormElem
}

function selectProject(projectName) {
    const sidebarProjects = document.querySelectorAll('.sidebar-project')
    clearSelected(sidebarProjects)
    const sidebarProject = document.querySelector('#sidebar-projects').querySelector(`[id='${projectName}']`)
    sidebarProject.classList.add('selected')
}

function handleProjectSelect(e,controller) {
    if (e.target) {
        if (Array(e.target.classList[0]).includes('fa-solid')){
            controller.abort()
        } else {
            const projectName = e.target.closest('.sidebar-project').id
            selectProject(projectName)
            loadContent(projectName)
        }
    }
}

function handleProjectDrag(e) {
    if (e.target) {
        const projectElem = e.target.closest('.sidebar-project')
        projectElem.classList.add('dragging')
    }
}

function handleSegmentDragover(e) {
    if (e.target) {
        e.preventDefault()
        const segmentElem = e.target
        const draggingElem = document.querySelector('.dragging')
        if (segmentElem.parentElement == draggingElem.parentElement && segmentElem != draggingElem.nextSibling && segmentElem != draggingElem.previousSibling){
            segmentElem.classList.add('hovering')
        }
    }
}

function handleSegmentDragleave(e) {
    if (e.target) {
        const segmentElem = e.target
        segmentElem.classList.remove('hovering')
    }
}

function handleProjectDrop(e) {
    const segmentElem = document.querySelector('.hovering')
    if (e.target && segmentElem) {
        const projectDraggingElem = e.target.closest('.sidebar-project')
        const projectName = projectDraggingElem.id
        const oldIdx = getProjectIdx(projectName)
        const projectDroppingElem = segmentElem.nextSibling
        let newIdx
        if (projectDroppingElem) {
            const projectDroppingIdx = getProjectIdx(projectDroppingElem.id)
            if (oldIdx < projectDroppingIdx) {
                newIdx = projectDroppingIdx - 1
            } else {
                newIdx = projectDroppingIdx
            }
        } else {
            newIdx = listProjects().length
        }
        rearrangeProject(oldIdx, newIdx)
        projectDraggingElem.classList.remove('dragging')
        loadProjects()
    }
}

function showProjectForm(e) {
    if (e.target) {
        const sidebarProjects = document.querySelector('#sidebar-projects')
        const projectFormElem = projectForm()
        sidebarProjects.append(projectFormElem)
        const projectFormTitle = document.querySelector('#project-form-title')
        const sidebarAddProjectBtn = document.querySelector('#sidebar-add-project-btn')
        projectFormTitle.focus()
        sidebarAddProjectBtn.style.display = 'none'

        const sidebarEditBtns = document.querySelectorAll('.sidebar-edit-btn')
        const sidebarDeleteBtns = document.querySelectorAll('.sidebar-delete-btn')
        const combined = [...sidebarEditBtns, ...sidebarDeleteBtns]
        combined.forEach(elem => {
            elem.style.display = 'none'
        })
    }

}

function closeProjectForm(e) {
    if (e.target) {
        e.preventDefault()
        const projectForm = document.querySelector('#project-form')
        const sidebarAddProjectBtn = document.querySelector('#sidebar-add-project-btn')
        projectForm.remove()
        sidebarAddProjectBtn.style.display = 'flex'

        const sidebarEditBtns = document.querySelectorAll('.sidebar-edit-btn')
        const sidebarDeleteBtns = document.querySelectorAll('.sidebar-delete-btn')
        const combined = [...sidebarEditBtns, ...sidebarDeleteBtns]
        combined.forEach(elem => {
            elem.style.display = 'flex'
        })
    }
}

function showProjectEditForm(e) {
    if (e.target) {
        const sidebarProject = e.target.closest('.sidebar-project')
        const projectTitle = sidebarProject.id
        const projectFormElem = projectForm(projectTitle)
        sidebarProject.replaceWith(projectFormElem)
        focusProjectTitle()
        const sidebarAddProjectBtn = document.querySelector('#sidebar-add-project-btn')
        sidebarAddProjectBtn.style.display = 'none'
        const sidebarEditBtns = document.querySelectorAll('.sidebar-edit-btn')
        const sidebarDeleteBtns = document.querySelectorAll('.sidebar-delete-btn')
        const combined = [...sidebarEditBtns, ...sidebarDeleteBtns]
        combined.forEach(elem => {
            elem.style.display = 'none'
        })
    }
}

function closeProjectEditForm(e) {
    if (e.target) {
        e.preventDefault()
        const sidebarAddProjectBtn = document.querySelector('#sidebar-add-project-btn')
        sidebarAddProjectBtn.style.display = 'flex'
        loadProjects()
    }
}

function focusProjectTitle() {
    const projectFormTitle = document.querySelector('#project-form-title')
    if (projectFormTitle.value) {
        const cursorPos = projectFormTitle.value.length
        projectFormTitle.selectionStart = projectFormTitle.selectionEnd = cursorPos
    }
    projectFormTitle.focus()
}

function addProject(e) {
    const keyPressed = e.key
    if (keyPressed && keyPressed == 'Enter' || !keyPressed && e.target) {
        e.preventDefault()
        const projectForm = document.querySelector('#project-form')
        const projectTitle = projectForm['project-form-title'].value
        const sidebarAddProjectBtn = document.querySelector('#sidebar-add-project-btn')
        if (projectTitle) {
            if (newProject(projectTitle)) {
                loadContent()
                loadProjects()
                projectForm.remove()
                sidebarAddProjectBtn.style.display = 'flex'
                const sidebarEditBtns = document.querySelectorAll('.sidebar-edit-btn')
                const sidebarDeleteBtns = document.querySelectorAll('.sidebar-delete-btn')
                const combined = [...sidebarEditBtns, ...sidebarDeleteBtns]
                combined.forEach(elem => {
                    elem.style.display = 'flex'
            })
            } else {
                window.alert('Project Title already in use!')
                focusProjectTitle()
            }
        } else {
            window.alert('Project Title cannot be empty!')
            projectFormTitle.value = oldProjectTitle
            focusProjectTitle()
        }
    }
}

function editProjectElem(e, oldProjectTitle) {
    const keyPressed = e.key

    if (keyPressed && keyPressed == 'Enter' || !keyPressed && e.target) {
        e.preventDefault()
        const projectForm = document.querySelector('#project-form')
        const projectFormTitle = document.querySelector('#project-form-title')
        const newProjectTitle = projectForm['project-form-title'].value

        if (newProjectTitle) {
            const sidebarAddProjectBtn = document.querySelector('#sidebar-add-project-btn')
            const res = editProject(oldProjectTitle, newProjectTitle)
            if(res == undefined) {
                sidebarAddProjectBtn.style.display = 'flex'
                loadProjects()
            } else if (res == false) {
                window.alert('Project Title already in use!')
                projectFormTitle.value = oldProjectTitle
                focusProjectTitle()
            } else if (res == true) {
                sidebarAddProjectBtn.style.display = 'flex'
                loadProjects()
                loadContent()
            }
        } else {
            window.alert('Project Title cannot be empty!')
            projectFormTitle.value = oldProjectTitle
            focusProjectTitle()
        }
        
    }
    
}

function removeProject(e) {
    if (e.target) {
        const projectName = e.target.closest('.sidebar-project').id
        deleteProject(projectName)
        loadProjects()
        loadContent()
    }
}

export { loadProjects, selectProject, createSegment, handleSegmentDragover, handleSegmentDragleave }