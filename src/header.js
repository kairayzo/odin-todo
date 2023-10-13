import {generateElement} from "./helper";

export default function Header() {

    function showSideBar(e) {
        if (e.target) {
            const sidebar = document.querySelector('#sidebar')
            const showSidebarBtn = document.querySelector('#show-sidebar-btn')
            const hideSidebarBtn = document.querySelector('#hide-sidebar-btn')
            sidebar.style.display = 'flex'
            document.body.style = 'grid-template-areas:"sidebar header" "sidebar content";grid-template-columns: 16rem 1fr'
            showSidebarBtn.style.display = 'none'
            hideSidebarBtn.style.display = 'flex'
        }
    }
    
    const header = generateElement('div','','header')
    
    const showSidebarBtn = generateElement('div','','show-sidebar-btn')
    showSidebarBtn.innerHTML = '<i class="fa-solid fa-bars"></i>'
    showSidebarBtn.style.display = 'none'
    showSidebarBtn.addEventListener('click',(e)=>showSideBar(e))
    

    const iconContainer = generateElement('div','logo-container')
    const icon = generateElement('img','logo','./images/logo.png','Todo App icon')
    const title = generateElement('div','logo-title','','My Todo')
    
    const userContainer = generateElement('div','','user-container')
    const userIcon = generateElement('div','user-icon')
    userIcon.innerHTML = '<i class="fa-solid fa-user fa-xl"></i>'

    iconContainer.append(icon, title)
    userContainer.append(userIcon)
    header.append(showSidebarBtn, iconContainer, userContainer)

    return header
}