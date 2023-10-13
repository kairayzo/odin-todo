import format from "date-fns/format"

function generateElement(tag, cls='', id='', innerHTML='') {
    const elem = document.createElement(tag)

    if (tag == 'input') {
        elem.type = cls
        if (cls == 'text') {
            elem.id = id
            elem.name = id
            elem.placeholder = innerHTML
            return elem
        } else if (cls == 'radio') {
            elem.id = id
            elem.value = id.slice(-1)
            elem.name = innerHTML
            return elem
        }
    }

    if (cls) {
        if (cls.includes(' ')) {
            const clsList = cls.split(' ')
            for (const c in clsList) {
                elem.classList.add(clsList[c])
            }
        } else {
            elem.classList.add(cls)
        }
    }

    if (tag == 'select') {
        elem.name = innerHTML
        elem.id = id
    }

    if (tag == 'option') {
        elem.id = id
        elem.value = innerHTML
        elem.innerHTML = innerHTML
    }

    if (tag =='textarea') {
        elem.id = id
        elem.name = id
        elem.innerHTML = innerHTML
    }

    if (tag == 'label') {
        elem.htmlFor = id
        elem.innerHTML = innerHTML
        return elem
    }

    if (tag == 'img') {
        elem.src = id
        elem.alt = innerHTML
        return elem
    }

    if (tag == 'a') {
        elem.href = id
        elem.innerHTML = innerHTML
        return elem
    }

    if (tag == 'form') {
        elem.id = id
        return elem
    }

    if (id) {
        elem.id = id 
    }

    if (innerHTML) {
        elem.innerHTML = innerHTML
    }
    
    return elem
}

function formatDate(date) {
    if (date) {
        return format(new Date(date),'dd/MM/yy')
    } else {
        return ''
    }
}

function clearSelected(elemList) {
    elemList.forEach(elem=>{
        elem.classList.remove('selected')
    })
}

export {generateElement, formatDate, clearSelected}